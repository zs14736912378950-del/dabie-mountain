// 第一章：森林探索 — 4层视差 + 12个热点物种 + 发现系统 + 生态知识
// 修复版：减少热点到12个(#7)，添加返回按钮(#6)
import gsap from "gsap";
import { navigateTo, unlockChapter } from "../utils/navigation.js";
import { hotspotSpecies } from "../data/species.js";
import { extraHotspotSpecies, ecologyCards } from "../content/index.js";
import { playClick, playSuccess, playCelebration, playForestAmbience, stopAmbience } from "../utils/audio.js";
import { showGuide, hideGuide } from "../components/guideBoy.js";

// 合并所有物种
const allSpecies = [...hotspotSpecies, ...extraHotspotSpecies];

const layers = [
  { id: "sky", speed: 0.15 },
  { id: "mountains", speed: 0.35 },
  { id: "forest", speed: 0.6 },
  { id: "foreground", speed: 1.0 }
];
const parallaxSpeeds = layers.map(l => l.speed);

// 12个核心热点 — 覆盖主要场景区域，分布更均匀(#7)
// anim: 物种专属 idle 动画类型
const hotspots = [
  { x: 5,  y: 55, speciesIndex: 0,  anim: "sway"     }, // 黄山松 — 摇摆
  { x: 15, y: 40, speciesIndex: 1,  anim: "sway"     }, // 大别山杜鹃 — 摇摆
  { x: 25, y: 60, speciesIndex: 2,  anim: "sway"     }, // 银杏 — 摇摆
  { x: 35, y: 48, speciesIndex: 3,  anim: "sway"     }, // 霍山石斛 — 摇摆
  { x: 45, y: 58, speciesIndex: 4,  anim: "waddle"   }, // 红腹锦鸡 — 摇摆走
  { x: 55, y: 45, speciesIndex: 5,  anim: "waddle"   }, // 大鲵 — 左右摇
  { x: 65, y: 55, speciesIndex: 6,  anim: "waddle"   }, // 白冠长尾雉 — 摇摆走
  { x: 75, y: 42, speciesIndex: 7,  anim: "fly"      }, // 金雕 — 飞行浮动
  { x: 85, y: 60, speciesIndex: 8,  anim: "breathe"  }, // 大别山原麝 — 呼吸
  { x: 95, y: 48, speciesIndex: 9,  anim: "breathe"  }, // 中华穿山甲 — 呼吸
  { x: 10, y: 35, speciesIndex: 10, anim: "flutter"  }, // 中华虎凤蝶 — 颤动
  { x: 50, y: 30, speciesIndex: 11, anim: "fly"      }, // 天女花 — 摇摆
];

let offsetX = 0, maxOffset = 0, dragging = false, startX = 0, startOffset = 0;
let _onDragStart, _onDragMove, _onDragEnd;
let _scene = null;
let _leafTimer = null;
let discoveredSpecies = new Set();
const totalSpecies = hotspots.length;

// ===== SVG 层（gradient ID 带层前缀避免冲突） =====
function renderSkyLayer(sw) {
  // 大朵云
  var bigClouds = [
    [300,80,160,45],[900,60,140,40],[1600,90,180,50],[2400,70,150,42],[3000,85,130,38]
  ];
  // 小朵云
  var smallClouds = [
    [150,130,60,18],[500,100,50,15],[750,140,70,20],[1100,110,55,16],
    [1350,135,65,19],[1800,95,55,17],[2100,125,60,18],[2600,105,50,15],
    [2900,120,65,18],[3200,90,45,14]
  ];

  var cloudSvg = bigClouds.map(function(p) {
    return '<g opacity="0.75">'
      + '<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="'+p[2]+'" ry="'+p[3]+'" fill="white"/>'
      + '<ellipse cx="'+(p[0]-p[2]*0.4)+'" cy="'+(p[1]+5)+'" rx="'+(p[2]*0.6)+'" ry="'+(p[3]*0.7)+'" fill="white"/>'
      + '<ellipse cx="'+(p[0]+p[2]*0.35)+'" cy="'+(p[1]+3)+'" rx="'+(p[2]*0.5)+'" ry="'+(p[3]*0.65)+'" fill="white"/>'
      + '</g>';
  }).join('');

  var smallCloudSvg = smallClouds.map(function(p) {
    return '<g opacity="0.5">'
      + '<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="'+p[2]+'" ry="'+p[3]+'" fill="white"/>'
      + '<ellipse cx="'+(p[0]+p[2]*0.3)+'" cy="'+(p[1]+2)+'" rx="'+(p[2]*0.5)+'" ry="'+(p[3]*0.6)+'" fill="white"/>'
      + '</g>';
  }).join('');

  // 太阳光线
  var sunRays = '';
  for (var r = 0; r < 8; r++) {
    var angle = r * 45;
    var x1 = sw * 0.78 + Math.cos(angle * Math.PI / 180) * 60;
    var y1 = 120 + Math.sin(angle * Math.PI / 180) * 60;
    var x2 = sw * 0.78 + Math.cos(angle * Math.PI / 180) * 200;
    var y2 = 120 + Math.sin(angle * Math.PI / 180) * 200;
    sunRays += '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="#fff8e1" stroke-width="2" opacity="0.15"/>';
  }

  // 远山雾气
  var haze = '<path d="M0,900 L0,380 Q150,200 300,350 Q450,280 550,380 Q700,220 850,360 Q950,300 1050,380 Q1200,240 1350,370 Q1500,260 1650,360 Q1800,200 1950,350 Q2100,280 2250,370 Q2400,240 2550,360 Q2700,200 2850,350 Q3000,260 3150,370 Q3250,300 '+sw+',380 L'+sw+',900 Z" fill="#8b9dc3"/>';

  return '<svg width="'+sw+'" height="100%" viewBox="0 0 '+sw+' 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">'
    + '<defs>'
    + '<linearGradient id="exp-skyG" x1="0" y1="0" x2="0" y2="1">'
    + '<stop offset="0%" stop-color="#4a90d9"/>'
    + '<stop offset="25%" stop-color="#6ab0e8"/>'
    + '<stop offset="50%" stop-color="#87CEEB"/>'
    + '<stop offset="75%" stop-color="#b8dff0"/>'
    + '<stop offset="100%" stop-color="#e8f0e3"/>'
    + '</linearGradient>'
    + '<radialGradient id="exp-sunG" cx="78%" cy="14%" r="20%">'
    + '<stop offset="0%" stop-color="#fffde7" stop-opacity="1"/>'
    + '<stop offset="30%" stop-color="#fff8e1" stop-opacity="0.7"/>'
    + '<stop offset="60%" stop-color="#ffe082" stop-opacity="0.3"/>'
    + '<stop offset="100%" stop-color="#ffcc02" stop-opacity="0"/>'
    + '</radialGradient>'
    + '<filter id="exp-cloudBlur"><feGaussianBlur stdDeviation="2"/></filter>'
    + '</defs>'
    + '<rect width="'+sw+'" height="900" fill="url(#exp-skyG)"/>'
    + '<rect width="'+sw+'" height="900" fill="url(#exp-sunG)"/>'
    + '<g>'+sunRays+'</g>'
    + '<g filter="url(#exp-cloudBlur)">'+smallCloudSvg+'</g>'
    + '<g>'+cloudSvg+'</g>'
    + '<g opacity="0.3">'+haze+'</g>'
    + '</svg>';
}

function renderMountainsLayer(sw) {
  var far = '<path d="M0,900 L0,500 Q100,380 250,440 Q400,320 550,420 Q700,360 850,430 Q1000,300 1150,410 Q1300,340 1450,420 Q1600,280 1750,400 Q1900,330 2050,410 Q2200,350 2350,420 Q2500,310 2650,400 Q2800,340 2950,410 Q3100,380 '+sw+',430 L'+sw+',900 Z" fill="url(#exp-m1)" opacity="0.6"/>';
  var mid = '<path d="M-50,900 L-50,560 Q150,400 350,500 Q500,380 650,490 Q800,420 950,500 Q1100,350 1250,480 Q1400,390 1550,490 Q1700,370 1850,470 Q2000,400 2150,480 Q2300,410 2450,490 Q2600,380 2750,470 Q2900,410 3050,480 Q3200,430 '+(sw+50)+',490 L'+(sw+50)+',900 Z" fill="url(#exp-m2)" opacity="0.8"/>';
  var near = '<path d="M0,900 L0,620 Q180,480 400,580 Q550,460 700,570 Q850,490 1000,580 Q1150,440 1300,560 Q1450,470 1600,550 Q1750,450 1900,530 Q2050,460 2200,550 Q2350,470 2500,540 Q2650,450 2800,530 Q2950,470 3100,520 Q3200,480 '+sw+',540 L'+sw+',900 Z" fill="url(#exp-m3)"/>';

  return '<svg width="'+sw+'" height="100%" viewBox="0 0 '+sw+' 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">'
    + '<defs>'
    + '<linearGradient id="exp-m1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7a9b6a"/><stop offset="100%" stop-color="#4a7a3a"/></linearGradient>'
    + '<linearGradient id="exp-m2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6b8b5a"/><stop offset="100%" stop-color="#3d6b3d"/></linearGradient>'
    + '<linearGradient id="exp-m3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8aad7a"/><stop offset="100%" stop-color="#5a8a3a"/></linearGradient>'
    + '</defs>'
    + far + mid + near
    + '</svg>';
}

function renderForestLayer(sw) {
  var treeTypes = [
    { h: 280, w: 60, c: "#2d5a1e" },
    { h: 240, w: 50, c: "#3a6b2a" },
    { h: 300, w: 65, c: "#1e4a12" },
    { h: 200, w: 45, c: "#4a7a35" },
    { h: 260, w: 55, c: "#335a22" }
  ];
  var trees = "";
  for (var x = 0; x < sw; x += 40) {
    var o = treeTypes[Math.floor((x / 40) % treeTypes.length)];
    var h = o.h + Math.sin(x * 0.05) * 30;
    trees += '<polygon points="'
      + x + ',900 '
      + x + ',' + (900 - h) + ' '
      + (x - o.w / 2) + ',' + (900 - h * 0.65) + ' '
      + x + ',' + (900 - h * 0.3) + ' '
      + (x + o.w / 2) + ',' + (900 - h * 0.65)
      + '" fill="' + o.c + '" opacity="0.9"/>';
  }

  return '<svg width="'+sw+'" height="100%" viewBox="0 0 '+sw+' 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">'
    + '<defs><linearGradient id="exp-forestG" x1="0" y1="0" x2="0" y2="1">'
    + '<stop offset="0%" stop-color="#3d6b3d"/><stop offset="30%" stop-color="#2d5a27"/><stop offset="100%" stop-color="#1a3a16"/>'
    + '</linearGradient></defs>'
    + '<rect x="0" y="600" width="'+sw+'" height="300" fill="url(#exp-forestG)"/>'
    + '<g opacity="0.9">'+trees+'</g>'
    + '</svg>';
}

function renderForegroundLayer(sw) {
  var bushes = "", flowers = "", trees = "";

  // 灌木丛
  for (var i = 0; i < 16; i++) {
    var bx = 100 + i * 200 + Math.sin(i * 1.5) * 60;
    bushes += '<ellipse cx="'+bx+'" cy="780" rx="45" ry="28" fill="#4a7a35"/>'
            + '<ellipse cx="'+(bx+25)+'" cy="770" rx="35" ry="22" fill="#5a8a3f"/>';
  }
  // 小花点缀
  for (var i = 0; i < 40; i++) {
    var fx = 50 + i * 80 + Math.sin(i * 2.3) * 40;
    flowers += '<circle cx="'+fx+'" cy="'+(810+Math.sin(i*4)*20)+'" r="4" fill="#c9a96e" opacity="0.7"/>';
  }

  // 卡通树木装饰
  var treeDefs = [
    { w: 120, h: 180, c: "#2d5a1e" },
    { w: 140, h: 160, c: "#3a6b2a" },
    { w: 110, h: 170, c: "#1e4a12" },
    { w: 130, h: 150, c: "#4a7a35" }
  ];
  for (var i = 0; i < 10; i++) {
    var tx = 150 + i * 320 + Math.sin(i * 2) * 50;
    var td = treeDefs[i % treeDefs.length];
    var baseY = 700 + Math.sin(i * 1.2) * 30;
    // 树干
    trees += '<rect x="'+(tx-8)+'" y="'+(baseY-40)+'" width="16" height="80" fill="#5d4037" rx="4"/>';
    if (i % 2 === 0) {
      // 三角形松树
      trees += '<polygon points="'+tx+','+(baseY-160)+' '+(tx-50)+','+(baseY-20)+' '+(tx+50)+','+(baseY-20)+'" fill="'+td.c+'"/>'
             + '<polygon points="'+tx+','+(baseY-130)+' '+(tx-45)+','+(baseY-40)+' '+(tx+45)+','+(baseY-40)+'" fill="'+td.c+'" opacity="0.8"/>';
    } else {
      // 圆形阔叶树
      trees += '<ellipse cx="'+tx+'" cy="'+(baseY-100)+'" rx="60" ry="70" fill="'+td.c+'"/>'
             + '<ellipse cx="'+(tx-25)+'" cy="'+(baseY-80)+'" rx="40" ry="50" fill="'+td.c+'" opacity="0.8"/>'
             + '<ellipse cx="'+(tx+25)+'" cy="'+(baseY-90)+'" rx="45" ry="55" fill="'+td.c+'" opacity="0.7"/>';
    }
  }

  // 前景大树
  var bigTree1 = '<g transform="translate(800,900)">'
    + '<rect x="-20" y="-350" width="40" height="350" fill="#3b2f1f" rx="8"/>'
    + '</g><g transform="translate(800,580)">'
    + '<ellipse cx="0" cy="-80" rx="140" ry="160" fill="#1e4a12" opacity="0.85"/>'
    + '<ellipse cx="-70" cy="-40" rx="100" ry="120" fill="#2d5a1e" opacity="0.8"/>'
    + '<ellipse cx="60" cy="-30" rx="95" ry="130" fill="#335a22" opacity="0.8"/>'
    + '</g>';
  var bigTree2 = '<g transform="translate(2200,900)">'
    + '<rect x="-16" y="-300" width="32" height="300" fill="#3b2f1f" rx="6"/>'
    + '</g><g transform="translate(2200,640)">'
    + '<ellipse cx="0" cy="-60" rx="110" ry="130" fill="#1e4a12" opacity="0.8"/>'
    + '<ellipse cx="-50" cy="-30" rx="80" ry="105" fill="#2d5a1e" opacity="0.75"/>'
    + '<ellipse cx="45" cy="-25" rx="80" ry="110" fill="#3a6b2a" opacity="0.75"/>'
    + '</g>';

  // 溪流（蜿蜒穿过前景）
  var stream = '<path d="M0,830 Q200,810 400,835 Q600,855 800,825 Q1000,800 1200,830 Q1400,850 1600,820 Q1800,800 2000,825 Q2200,845 2400,815 Q2600,795 2800,820 Q3000,840 '+sw+',810 L'+sw+',870 Q2800,860 2600,875 Q2400,890 2200,865 Q2000,845 1800,870 Q1600,890 1400,865 Q1200,840 1000,865 Q800,890 600,870 Q400,850 200,875 L0,880 Z" fill="#4fc3f7" opacity="0.6"/>'
    + '<path d="M0,840 Q200,825 400,845 Q600,860 800,835 Q1000,815 1200,840 Q1400,855 1600,830 Q1800,815 2000,835 Q2200,850 2400,825 Q2600,810 2800,830 Q3000,845 '+sw+',825 L'+sw+',855 Q2800,845 2600,855 Q2400,865 2200,850 Q2000,835 1800,855 Q1600,870 1400,850 Q1200,835 1000,855 Q800,870 600,855 Q400,840 200,860 L0,865 Z" fill="#81d4fa" opacity="0.4"/>'
    + '<path d="M0,848 Q200,838 400,852 Q600,862 800,842 Q1000,828 1200,848 Q1400,858 1600,838 Q1800,825 2000,842 Q2200,855 2400,835 Q2600,822 2800,840 Q3000,852 '+sw+',838 L'+sw+',858 Q2800,850 2600,858 Q2400,865 2200,855 Q2000,845 1800,858 Q1600,868 1400,852 Q1200,842 1000,858 Q800,868 600,858 Q400,848 200,862 L0,868 Z" fill="#b3e5fc" opacity="0.3"/>';

  // 溪边石头
  var rocks = '';
  for (var i = 0; i < 12; i++) {
    var rx = 100 + i * 280 + Math.sin(i * 3) * 40;
    var ry = 835 + Math.sin(i * 2) * 10;
    var rs = 8 + Math.random() * 8;
    rocks += '<ellipse cx="'+rx+'" cy="'+ry+'" rx="'+rs+'" ry="'+(rs*0.6)+'" fill="#9e9e9e" opacity="0.5"/>';
  }

  // 蘑菇
  var mushrooms = '';
  for (var i = 0; i < 8; i++) {
    var mx = 180 + i * 400 + Math.sin(i * 2.5) * 60;
    var my = 790 + Math.sin(i * 1.8) * 15;
    mushrooms += '<rect x="'+(mx-2)+'" y="'+(my-8)+'" width="4" height="10" fill="#8d6e63" rx="1"/>'
      + '<ellipse cx="'+mx+'" cy="'+(my-10)+'" rx="8" ry="6" fill="#e53935" opacity="0.8"/>'
      + '<circle cx="'+(mx-2)+'" cy="'+(my-12)+'" r="1.5" fill="white" opacity="0.7"/>'
      + '<circle cx="'+(mx+3)+'" cy="'+(my-9)+'" r="1" fill="white" opacity="0.6"/>';
  }

  // 地面落叶
  var leaves = '';
  for (var i = 0; i < 20; i++) {
    var lx = 50 + i * 160 + Math.sin(i * 3.7) * 50;
    var ly = 855 + Math.sin(i * 2.1) * 10;
    var lrot = Math.random() * 360;
    leaves += '<ellipse cx="'+lx+'" cy="'+ly+'" rx="6" ry="3" fill="#8bc34a" opacity="0.5" transform="rotate('+lrot+','+lx+','+ly+')"/>';
  }

  return '<svg width="'+sw+'" height="100%" viewBox="0 0 '+sw+' 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">'
    + '<defs><linearGradient id="exp-fgG" x1="0" y1="0" x2="0" y2="1">'
    + '<stop offset="0%" stop-color="#4a7c3f" stop-opacity="0.3"/>'
    + '<stop offset="40%" stop-color="#2d5a27" stop-opacity="0.7"/>'
    + '<stop offset="100%" stop-color="#1a3a16"/>'
    + '</linearGradient>'
    + '<linearGradient id="exp-streamG" x1="0" y1="0" x2="1" y2="0">'
    + '<stop offset="0%" stop-color="#4fc3f7" stop-opacity="0.3"/>'
    + '<stop offset="50%" stop-color="#81d4fa" stop-opacity="0.5"/>'
    + '<stop offset="100%" stop-color="#4fc3f7" stop-opacity="0.3"/>'
    + '</linearGradient>'
    + '</defs>'
    + '<rect x="0" y="550" width="'+sw+'" height="350" fill="url(#exp-fgG)"/>'
    + bigTree1 + bigTree2
    + '<g opacity="0.8">'+bushes+'</g>'
    + '<g opacity="0.8">'+trees+'</g>'
    + '<g opacity="0.6">'+flowers+'</g>'
    + '<g>'+stream+'</g>'
    + '<g>'+rocks+'</g>'
    + '<g>'+mushrooms+'</g>'
    + '<g>'+leaves+'</g>'
    + '</svg>';
}

// ===== SVG 物种插图 =====
function getSpeciesIllustration(id) {
  var s = {
    pinus: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#e8f5e9"/><rect x="40" y="50" width="20" height="45" fill="#5d4037" rx="4"/><polygon points="50,5 15,50 85,50" fill="#2e7d32"/><polygon points="50,20 20,45 80,45" fill="#388e3c"/><polygon points="50,35 25,55 75,55" fill="#43a047"/><circle cx="50" cy="12" r="3" fill="#ffcc02"/></svg>',
    rhododendron: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#fce4ec"/><rect x="45" y="55" width="10" height="40" fill="#5d4037" rx="3"/><circle cx="42" cy="38" r="12" fill="#f48fb1"/><circle cx="58" cy="42" r="11" fill="#ec407a"/><circle cx="50" cy="32" r="13" fill="#e91e63"/><circle cx="38" cy="50" r="9" fill="#f06292"/><circle cx="60" cy="52" r="10" fill="#f48fb1"/><ellipse cx="35" cy="65" rx="12" ry="6" fill="#4caf50"/><ellipse cx="62" cy="68" rx="10" ry="5" fill="#66bb6a"/></svg>',
    ginkgo: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#fff8e1"/><rect x="46" y="55" width="8" height="40" fill="#5d4037" rx="2"/><path d="M50,10 Q30,20 25,35 Q20,50 50,55 Q80,50 75,35 Q70,20 50,10 Z" fill="#ffc107"/><path d="M50,18 Q38,25 35,35 Q33,45 50,48 Q67,45 65,35 Q62,25 50,18 Z" fill="#ffeb3b"/><line x1="50" y1="18" x2="50" y2="48" stroke="#f9a825" stroke-width="1"/></svg>',
    dendrobium: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#e8f5e9"/><rect x="46" y="50" width="8" height="45" fill="#66bb6a" rx="3"/><circle cx="44" cy="38" r="7" fill="#fff9c4"/><circle cx="56" cy="35" r="6" fill="#fff9c4"/><circle cx="50" cy="30" r="8" fill="#fff176"/><ellipse cx="42" cy="48" rx="10" ry="5" fill="#81c784"/><ellipse cx="58" cy="45" rx="8" ry="5" fill="#a5d6a7"/><text x="50" y="28" text-anchor="middle" font-size="8" fill="#f9a825">\u2726</text></svg>',
    goldenpheasant: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#fff3e0"/><ellipse cx="45" cy="52" rx="16" ry="13" fill="#e53935"/><circle cx="38" cy="42" r="9" fill="#ffcc02"/><circle cx="42" cy="39" r="2.5" fill="#333"/><path d="M40,33 L38,18 L50,22 L52,18 L54,25 Z" fill="#ff9800"/><path d="M52,48 Q75,40 70,55 Q65,60 55,55" fill="#4caf50" opacity="0.7"/><path d="M50,50 Q72,45 68,58" stroke="#2e7d32" stroke-width="1" fill="none"/><rect x="28" y="62" width="35" height="3" fill="#bf360c" rx="1"/><rect x="32" y="65" width="28" height="3" fill="#d32f2f" rx="1"/></svg>',
    salamander: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#e0f2f1"/><ellipse cx="50" cy="55" rx="28" ry="10" fill="#546e7a"/><ellipse cx="30" cy="50" rx="10" ry="7" fill="#455a64"/><circle cx="25" cy="48" r="2.5" fill="#333"/><circle cx="35" cy="48" r="2.5" fill="#333"/><ellipse cx="70" cy="55" rx="10" ry="5" fill="#546e7a"/><rect x="16" y="56" width="6" height="4" fill="#37474f" rx="1"/><rect x="12" y="54" width="6" height="4" fill="#37474f" rx="1"/><rect x="78" y="58" width="6" height="4" fill="#37474f" rx="1"/><rect x="82" y="56" width="6" height="4" fill="#37474f" rx="1"/></svg>',
    pheasant: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#fff3e0"/><ellipse cx="45" cy="55" rx="18" ry="14" fill="#8d6e63"/><circle cx="38" cy="48" r="10" fill="#a1887f"/><circle cx="43" cy="45" r="3" fill="#333"/><polygon points="52,50 65,47 52,53" fill="#f57c00"/><path d="M55,55 L85,65 L90,85 L70,75 Z" fill="#5d4037" opacity="0.5"/><path d="M60,58 L95,70 L98,88 L75,78 Z" fill="#795548" opacity="0.3"/><rect x="25" y="65" width="40" height="4" fill="#5d4037" rx="2"/><rect x="30" y="69" width="30" height="4" fill="#8d6e63" rx="2"/><circle cx="48" cy="42" r="6" fill="white" opacity="0.9"/></svg>',
    eagle: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#e3f2fd"/><ellipse cx="50" cy="55" rx="25" ry="20" fill="#5d4037"/><circle cx="50" cy="42" r="14" fill="#6d4c41"/><circle cx="44" cy="39" r="3" fill="#ffcc02"/><circle cx="56" cy="39" r="3" fill="#ffcc02"/><polygon points="50,32 48,20 52,20" fill="#f57c00"/><path d="M25,55 Q10,30 5,45 Q15,55 25,55" fill="#4e342e"/><path d="M75,55 Q90,30 95,45 Q85,55 75,55" fill="#4e342e"/><rect x="40" y="64" width="20" height="3" fill="#3e2723" rx="2"/></svg>',
    muskdeer: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#efebe9"/><ellipse cx="50" cy="55" rx="20" ry="16" fill="#a1887f"/><circle cx="38" cy="42" r="10" fill="#8d6e63"/><circle cx="34" cy="40" r="2.5" fill="#333"/><ellipse cx="65" cy="65" rx="15" ry="4" fill="#8d6e63"/><rect x="30" y="55" width="8" height="2" fill="#4e342e"/><rect x="25" y="53" width="8" height="2" fill="#4e342e"/><path d="M44,48 L50,42 L52,48" stroke="#4e342e" stroke-width="1.5" fill="none"/></svg>',
    pangolin: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#efebe9"/><ellipse cx="50" cy="55" rx="22" ry="18" fill="#8d6e63"/>'+[0,1,2,3,4].map(function(i){return'<path d="M'+(30+i*10)+','+(45+i*3)+' Q'+(35+i*10)+','+(40+i*3)+' '+(40+i*10)+','+(45+i*3)+'" stroke="#5d4037" stroke-width="3" fill="none"/>';}).join("")+'<circle cx="40" cy="48" r="7" fill="#a1887f"/><circle cx="37" cy="46" r="2" fill="#333"/><path d="M43,52 L55,55 L58,58" stroke="#4e342e" stroke-width="1.5" fill="none"/><ellipse cx="50" cy="70" rx="15" ry="5" fill="#6d4c41" opacity="0.3"/></svg>',
    butterfly: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#fce4ec"/><ellipse cx="50" cy="60" rx="4" ry="12" fill="#5d4037"/><path d="M50,55 Q20,30 10,45 Q20,60 50,55" fill="#ffeb3b" stroke="#333" stroke-width="1"/><path d="M50,55 Q20,40 15,60 Q25,65 50,55" fill="#ff9800" stroke="#333" stroke-width="1"/><path d="M50,55 Q80,30 90,45 Q80,60 50,55" fill="#ffeb3b" stroke="#333" stroke-width="1"/><path d="M50,55 Q80,40 85,60 Q75,65 50,55" fill="#ff9800" stroke="#333" stroke-width="1"/><circle cx="30" cy="48" r="4" fill="#2196f3"/><circle cx="70" cy="48" r="4" fill="#2196f3"/><circle cx="50" cy="45" r="3" fill="#e91e63"/></svg>',
    tianinv: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#f3e5f5"/><circle cx="50" cy="35" r="18" fill="#fff"/><circle cx="50" cy="35" r="12" fill="#fce4ec"/><circle cx="50" cy="35" r="6" fill="#f8bbd0"/><rect x="47" y="50" width="6" height="35" fill="#5d4037" rx="2"/><ellipse cx="35" cy="65" rx="10" ry="5" fill="#81c784"/><ellipse cx="62" cy="68" rx="8" ry="4" fill="#a5d6a7"/></svg>',
    lingzhi: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#efebe9"/><ellipse cx="50" cy="45" rx="28" ry="18" fill="#8d6e63"/><ellipse cx="50" cy="42" rx="22" ry="12" fill="#a1887f"/><rect x="47" y="58" width="6" height="25" fill="#5d4037" rx="2"/><ellipse cx="50" cy="40" rx="12" ry="6" fill="#bcaaa4" opacity="0.5"/><circle cx="42" cy="38" r="3" fill="#d7ccc8" opacity="0.6"/><circle cx="58" cy="36" r="2" fill="#d7ccc8" opacity="0.5"/></svg>',
    huamei: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#fff8e1"/><ellipse cx="50" cy="52" rx="18" ry="14" fill="#8d6e63"/><circle cx="42" cy="42" r="10" fill="#a1887f"/><circle cx="38" cy="40" r="2.5" fill="#333"/><circle cx="50" cy="40" r="2.5" fill="#333"/><path d="M42,48 Q50,55 58,48" stroke="#5d4037" stroke-width="1.5" fill="none"/><ellipse cx="35" cy="42" rx="8" ry="3" fill="white" opacity="0.8"/><rect x="38" y="62" width="24" height="3" fill="#5d4037" rx="1"/></svg>',
    bailu: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#e3f2fd"/><ellipse cx="50" cy="55" rx="14" ry="18" fill="#fff"/><ellipse cx="50" cy="50" rx="10" ry="12" fill="#fafafa"/><circle cx="50" cy="35" r="8" fill="#fff"/><circle cx="47" cy="33" r="1.5" fill="#333"/><circle cx="53" cy="33" r="1.5" fill="#333"/><path d="M50,38 L50,44" stroke="#ff9800" stroke-width="2"/><rect x="48" y="68" width="4" height="15" fill="#ff9800" rx="1"/><rect x="44" y="70" width="12" height="3" fill="#ff9800" rx="1"/></svg>',
    mihou: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#fff3e0"/><ellipse cx="50" cy="55" rx="16" ry="18" fill="#a1887f"/><circle cx="50" cy="38" r="14" fill="#bcaaa4"/><circle cx="44" cy="35" r="4" fill="#fff"/><circle cx="56" cy="35" r="4" fill="#fff"/><circle cx="44" cy="35" r="2" fill="#333"/><circle cx="56" cy="35" r="2" fill="#333"/><ellipse cx="50" cy="42" rx="4" ry="2" fill="#8d6e63"/><path d="M46,46 Q50,50 54,46" stroke="#5d4037" stroke-width="1.5" fill="none"/></svg>',
    zhonghua_mifeng: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#fff8e1"/><ellipse cx="50" cy="55" rx="12" ry="16" fill="#ffc107"/><rect x="42" y="48" width="16" height="4" fill="#333"/><rect x="42" y="56" width="16" height="4" fill="#333"/><circle cx="50" cy="38" r="8" fill="#ffc107"/><circle cx="46" cy="36" r="2" fill="#333"/><circle cx="54" cy="36" r="2" fill="#333"/><ellipse cx="35" cy="50" rx="12" ry="6" fill="#e3f2fd" opacity="0.6"/><ellipse cx="65" cy="50" rx="12" ry="6" fill="#e3f2fd" opacity="0.6"/></svg>',
    chilianshe: '<svg width="80" height="80" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#e8f5e9"/><path d="M20,50 Q30,40 40,50 Q50,60 60,50 Q70,40 80,50" stroke="#e53935" stroke-width="6" fill="none"/><circle cx="20" cy="50" r="4" fill="#333"/><circle cx="18" cy="49" r="1" fill="#fff"/><rect x="15" y="52" width="3" height="2" fill="#333" rx="1"/><path d="M16,52 L12,55" stroke="#333" stroke-width="1.5"/></svg>'
  };
  return s[id] || '<div style="width:80px;height:80px;border-radius:12px;background:#e0e0e0;display:flex;align-items:center;justify-content:center;font-size:2em;">?</div>';
}

// ===== 主入口 =====
export function init(container) {
  var sceneWidth = 3400;
  discoveredSpecies = new Set();

  var html = '<div class="page" id="explore-page">';
  // \u9876\u90e8\u5bfc\u822a\u680f\uff1a\u5de6\u8fd4\u56de(#6) | \u6807\u9898\u5c45\u4e2d
  html += '<div class="top-nav">';
  html += '<span class="top-nav-title">\ud83c\udf32 \u7b2c\u4e00\u7ae0 \u00b7 \u68ee\u6797\u63a2\u7d22</span>';
  html += '<div style="width:34px;"></div>'; // \u5360\u4f4d
  html += '</div>';
  // \u53d1\u73b0\u8ba1\u6570\u5668\uff1a\u60ac\u6d6e\u5728\u53f3\u4e0a\u89d2\uff0c\u4e0d\u5360\u7528\u5bfc\u822a\u680f\u7a7a\u95f4
  html += '<div id="discovery-counter" class="explore-counter">\ud83d\udd0d <span id="disc-count">0</span>/' + totalSpecies + '</div>';
  html += '<div id="explore-guide" style="position:absolute;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.7);color:#fff;padding:8px 20px;border-radius:20px;font-size:13px;z-index:100;pointer-events:none;transition:opacity 0.5s;">\ud83d\udc46 \u5de6\u53f3\u6ed1\u52a8\u63a2\u7d22\u68ee\u6797\uff0c\u70b9\u51fb\u95ea\u70c1\u70ed\u70b9\u53d1\u73b0\u7269\u79cd\uff01</div>';
  // \u751f\u6001\u77e5\u8bc6\u6309\u94ae
  html += '<button id="ecology-btn" style="position:absolute;bottom:80px;left:16px;background:rgba(255,255,255,0.9);border:3px solid var(--color-primary);border-radius:20px;padding:8px 16px;font-size:13px;font-weight:600;color:var(--color-primary);cursor:pointer;z-index:100;box-shadow:0 4px 12px rgba(0,0,0,0.1);">\ud83d\udcda \u751f\u6001\u77e5\u8bc6</button>';
  
  html += '<div class="explore-scene" id="explore-scene" style="position:relative;flex:1;overflow:hidden;cursor:grab;background:#87CEEB;">';
  html += '<div class="explore-layers-wrapper" style="position:absolute;top:0;left:0;width:'+sceneWidth+'px;height:100%;">';
  
  var renderers = [renderSkyLayer, renderMountainsLayer, renderForestLayer, renderForegroundLayer];
  for(var i=0;i<4;i++) html += '<div class="explore-layer" data-layer="'+i+'" style="position:absolute;top:0;left:0;width:'+sceneWidth+'px;height:100%;pointer-events:none;z-index:'+i+';">'+renderers[i](sceneWidth)+'</div>';
  
  html += '<div class="explore-hotspots" id="explore-hotspots" style="position:absolute;top:0;left:0;width:'+sceneWidth+'px;height:100%;pointer-events:none;z-index:10;">';
  for(var j=0;j<hotspots.length;j++){
    var h=hotspots[j];
    var sp=allSpecies[h.speciesIndex];
    html += '<div class="hotspot anim-'+h.anim+'" data-species="'+h.speciesIndex+'" data-idx="'+j+'" style="left:'+h.x+'%;top:'+h.y+'%;transform:translate(-50%,-50%);" role="button" aria-label="发现'+sp.name+'" tabindex="0">'
      + '<span class="hotspot-inner">'+sp.emoji+'</span>'
      + '<span class="hotspot-label">'+sp.name+'</span>'
      + '</div>';
  }
  html += '</div>';

  // 飞鸟
  html += '<div class="explore-birds">';
  var birdEmojis = ['🐦','🕊️','🦅'];
  for(var b=0;b<5;b++){
    var birdY = 5 + Math.random() * 25;
    var birdDur = 15 + Math.random() * 20;
    var birdDelay = Math.random() * 20;
    html += '<div class="explore-bird" style="top:'+birdY+'%;animation-duration:'+birdDur+'s;animation-delay:-'+birdDelay+'s;">'+birdEmojis[b%3]+'</div>';
  }
  html += '</div>';

  // 溪流波光
  html += '<div class="explore-stream">';
  for(var s=0;s<15;s++){
    var sx = Math.random() * 100;
    var sDelay = Math.random() * 3;
    html += '<div class="stream-shimmer" style="left:'+sx+'%;animation-delay:-'+sDelay+'s;"></div>';
  }
  html += '</div>';

  html += '</div></div>';
  html += '<div id="knowledge-card-overlay" style="position:fixed;inset:0;z-index:899;display:none;pointer-events:auto;background:rgba(0,0,0,0);"></div>';
  html += '</div>';
  
  container.innerHTML = html;

  var scene = container.querySelector("#explore-scene");
  _scene = scene;
  var layerEls = scene.querySelectorAll(".explore-layer");
  var hotspotsEl = scene.querySelector("#explore-hotspots");
  var guideEl = container.querySelector("#explore-guide");

  unlockChapter(2);
  maxOffset = sceneWidth - window.innerWidth;

  // 播放森林环境音
  playForestAmbience();

  // 落叶动画
  var leafEmojis = ['🍃','🍂','🌿','☘️'];
  function spawnLeaf() {
    if (!scene || dragging) return;
    var leaf = document.createElement("div");
    leaf.className = "explore-leaf";
    leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
    leaf.style.left = (10 + Math.random() * 80) + "%";
    leaf.style.animationDuration = (4 + Math.random() * 4) + "s";
    leaf.style.animationDelay = "0s";
    scene.appendChild(leaf);
    setTimeout(function() { if (leaf.parentNode) leaf.remove(); }, 8000);
  }
  // 初始几片
  for (var lf = 0; lf < 5; lf++) setTimeout(spawnLeaf, lf * 800);
  // 持续生成
  _leafTimer = setInterval(spawnLeaf, 2000);

  _onDragStart = function(e) {
    if(dragging)return;
    if(e.target.closest(".hotspot")||e.target.closest(".knowledge-card"))return;
    if(e.type==="mousedown"&&e.button!==0)return;
    dragging=true;startX=e.touches?e.touches[0].clientX:e.clientX;startOffset=offsetX;
    scene.style.cursor="grabbing";
  };

  _onDragMove = function(e) {
    if(!dragging)return;
    var cx=e.touches?e.touches[0].clientX:e.clientX;
    offsetX=Math.max(-maxOffset,Math.min(0,startOffset+(cx-startX)));
    layerEls.forEach(function(el,i){el.style.transform="translateX("+(offsetX*parallaxSpeeds[i])+"px)";});
    if(hotspotsEl)hotspotsEl.style.transform="translateX("+(offsetX*parallaxSpeeds[3])+"px)";
  };

  _onDragEnd = function() {
    if(!dragging)return;
    dragging=false;scene.style.cursor="grab";
    if(guideEl&&guideEl.style.opacity!=="0.3")gsap.to(guideEl,{opacity:0.3,duration:1,delay:2});
  };

  scene.addEventListener("mousedown",_onDragStart);
  scene.addEventListener("touchstart",_onDragStart,{passive:false});
  window.addEventListener("mousemove",_onDragMove);
  window.addEventListener("touchmove",_onDragMove,{passive:false});
  window.addEventListener("mouseup",_onDragEnd);
  window.addEventListener("touchend",_onDragEnd);

  scene.querySelectorAll(".hotspot").forEach(function(hot){
    hot.addEventListener("pointerup",function(e){
      e.stopPropagation();e.preventDefault();
      var idx=parseInt(hot.dataset.species);
      if(!discoveredSpecies.has(idx)){
        discoveredSpecies.add(idx);
        playSuccess();
        updateCounter(container);
        // \u6807\u8bb0\u4e3a\u5df2\u53d1\u73b0
        hot.classList.add("discovered");
        // \u53d1\u73b0\u5f39\u8df3\u52a8\u753b
        gsap.fromTo(hot, {scale: 1.2}, {scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)"});
        showToast(container,"\ud83c\udf1f \u53d1\u73b0\u65b0\u7269\u79cd\uff01 "+discoveredSpecies.size+"/"+totalSpecies);
      }else{
        playClick();
        // \u5df2\u53d1\u73b0\u7684\u70b9\u51fb\u53cd\u9988
        gsap.fromTo(hot, {scale: 1.15}, {scale: 1, duration: 0.3, ease: "power2.out"});
      }
      showKnowledgeCard(container,allSpecies[idx], hot);
      if(discoveredSpecies.size>=totalSpecies){setTimeout(function(){playCelebration();showToast(container,"\ud83c\udf89 \u5168\u90e8\u7269\u79cd\u53d1\u73b0\u5b8c\u6210\uff01\u4f60\u662f\u68ee\u6797\u63a2\u7d22\u5bb6\uff01");spawnExploreParticles(container);},600);}
    });
  });

  // 返回首页按钮 (#6)
  container.querySelector("#explore-back").addEventListener("click", function() {
    playClick();
    stopParticles();
    hideGuide();
    navigateTo("home");
  });

  // 生态知识按钮
  container.querySelector("#ecology-btn").addEventListener("click",function(){
    playClick();
    showEcologyCard(container);
  });

  // 小男孩引导
  showGuide("explore", container, {
    dismiss: function() {}
  });
}

// 生态知识卡片
var _ecologyIdx = 0;
function showEcologyCard(container) {
  var card = ecologyCards[_ecologyIdx % ecologyCards.length];
  _ecologyIdx++;

  var overlay = document.createElement("div");
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;";
  overlay.innerHTML = '<div style="background:#fff;border-radius:24px;padding:28px;max-width:360px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative;">'
    + '<button onclick="this.closest(\'div[style*=fixed]\').remove()" style="position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;border:none;background:rgba(0,0,0,0.06);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>'
    + '<div style="font-size:48px;text-align:center;margin-bottom:12px;">' + card.icon + '</div>'
    + '<h3 style="font-size:18px;font-weight:700;color:#064E3B;margin-bottom:8px;text-align:center;">' + card.title + '</h3>'
    + '<p style="font-size:14px;color:#6B7280;text-align:center;margin-bottom:16px;line-height:1.6;">' + card.summary + '</p>'
    + '<div style="font-size:14px;color:#374151;line-height:1.8;margin-bottom:16px;">' + card.content + '</div>'
    + '<div style="background:linear-gradient(135deg,#FFFBEB,#FEF3C7);border-left:4px solid #F59E0B;padding:12px 16px;border-radius:0 12px 12px 0;font-size:13px;line-height:1.6;">'
    + '<strong style="color:#D97706;">💡 冷知识：</strong>' + card.funFact
    + '</div>'
    + '<button onclick="this.closest(\'div[style*=fixed]\').remove()" style="width:100%;margin-top:16px;padding:12px;border:3px solid #059669;border-radius:16px;background:#ECFDF5;color:#059669;font-size:14px;font-weight:600;cursor:pointer;">我知道了</button>'
    + '</div>';

  document.body.appendChild(overlay);
  overlay.addEventListener("click", function(e) { if (e.target === overlay) overlay.remove(); });
}

function updateCounter(container){var c=container.querySelector("#disc-count");if(c)c.textContent=discoveredSpecies.size;}

function showToast(container,message){
  var existing=container.querySelector(".explore-toast");if(existing)existing.remove();
  var toast=document.createElement("div");
  toast.className="explore-toast";
  toast.style.cssText="position:fixed;top:90px;left:50%;transform:translateX(-50%);background:rgba(44,36,22,0.9);color:#fff;padding:10px 22px;border-radius:20px;font-size:13px;font-weight:600;z-index:2000;pointer-events:none;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,0.2);";
  toast.textContent=message;container.appendChild(toast);
  gsap.fromTo(toast,{opacity:0,y:-8},{opacity:1,y:0,duration:0.25});
  gsap.to(toast,{opacity:0,y:-8,duration:0.25,delay:2.2,onComplete:function(){toast.remove();}});
}

function spawnExploreParticles(container){
  var emojis=["\ud83c\udf1f","\ud83c\udf43","\ud83e\udd8b","\ud83c\udf38","\u2728"];
  var scene=container.querySelector("#explore-scene");if(!scene)return;
  for(var i=0;i<22;i++){
    setTimeout(function(){
      var p=document.createElement("div");
      p.style.cssText="position:fixed;pointer-events:none;z-index:2000;font-size:18px;";
      p.textContent=emojis[Math.floor(Math.random()*emojis.length)];
      p.style.left=Math.random()*100+"%";p.style.top="60%";
      document.body.appendChild(p);
      gsap.to(p,{y:-300-Math.random()*200,x:(Math.random()-0.5)*150,rotation:Math.random()*360,opacity:0,duration:2+Math.random()*2,ease:"power1.out",onComplete:function(){p.remove();}});
    },i*60);
  }
}

function showKnowledgeCard(container,species){
  var overlay=container.querySelector("#knowledge-card-overlay");
  overlay.querySelectorAll(".knowledge-card").forEach(function(c){ c.remove(); });
  overlay.style.display="block";
  gsap.to(overlay,{backgroundColor:"rgba(0,0,0,0.35)",duration:0.3});

  var svgFallback = getSpeciesIllustration(species.id);

  // 图片区域：有真实照片就加载，否则直接用 SVG
  var imgHtml = '';
  if (species.image) {
    imgHtml = '<div class="knowledge-card-img-wrap" id="kw-img-wrap"><div class="kw-img-skeleton"></div></div>';
  } else {
    imgHtml = '<div class="knowledge-card-img-wrap">' + svgFallback + '</div>';
  }

  var card=document.createElement("div");
  card.className="knowledge-card";
  card.innerHTML = ''
    + '<button class="knowledge-card-close" aria-label="关闭">✕</button>'
    + '<div class="knowledge-card-header">'
    +   imgHtml
    +   '<div class="knowledge-card-meta">'
    +     '<div class="knowledge-card-name">' + species.name + '</div>'
    +     '<div class="knowledge-card-scientific">' + species.scientific + '</div>'
    +     '<div class="knowledge-card-tags">'
    +       '<span class="tag tag-category">' + species.category + '</span>'
    +       '<span class="tag tag-role">' + species.role + '</span>'
    +       '<span class="tag tag-protection">' + species.protection + '</span>'
    +     '</div>'
    +   '</div>'
    + '</div>'
    + '<div class="kc-section">'
    +   '<div class="kc-section-label">📖 物种介绍</div>'
    +   '<div class="knowledge-card-body">' + species.description + '</div>'
    + '</div>'
    + '<div class="knowledge-card-funfact">' + species.funFact + '</div>';

  overlay.appendChild(card);

  // 动画
  gsap.from(card, { y: "100%", duration: 0.45, ease: "power2.out" });
  card.querySelectorAll(".tag").forEach(function(tag, i) {
    gsap.from(tag, { opacity: 0, y: 8, duration: 0.25, delay: 0.2 + i * 0.08, ease: "power2.out" });
  });

  // 加载真实照片（Wikimedia Commons 直链）
  var imgWrap = card.querySelector("#kw-img-wrap");
  if (imgWrap && species.image) {
    var img = new Image();
    img.src = species.image;
    img.alt = species.name + " — " + species.scientific;
    img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:12px;display:block;";
    img.onload = function() {
      if (!imgWrap) return;
      imgWrap.innerHTML = "";
      imgWrap.appendChild(img);
      gsap.from(img, { opacity: 0, scale: 1.05, duration: 0.35, ease: "power2.out" });
    };
    img.onerror = function() {
      if (!imgWrap) return;
      imgWrap.innerHTML = svgFallback;
    };
  }

  var closeCard = function() {
    gsap.to(overlay, { backgroundColor: "rgba(0,0,0,0)", duration: 0.3 });
    gsap.to(card, { y: "100%", duration: 0.3, ease: "power2.in", onComplete: function() {
      card.remove();
      if (overlay.children.length === 0) overlay.style.display = "none";
    }});
  };
  card.querySelector(".knowledge-card-close").addEventListener("click", closeCard);
  overlay.onclick = function(e) { if (e.target === overlay) closeCard(); };
}

export function destroy(){
  stopAmbience();
  hideGuide();
  if(_leafTimer){clearInterval(_leafTimer);_leafTimer=null;}
  if(_scene){
    _scene.removeEventListener("mousedown",_onDragStart);
    _scene.removeEventListener("touchstart",_onDragStart);
    _scene.removeEventListener("touchmove",_onDragMove);
    _scene.removeEventListener("touchend",_onDragEnd);
  }
  if(_onDragMove)window.removeEventListener("mousemove",_onDragMove);
  if(_onDragMove)window.removeEventListener("touchmove",_onDragMove);
  if(_onDragEnd)window.removeEventListener("mouseup",_onDragEnd);
  if(_onDragEnd)window.removeEventListener("touchend",_onDragEnd);
  _onDragStart=null;_onDragMove=null;_onDragEnd=null;_scene=null;offsetX=0;dragging=false;discoveredSpecies=new Set();
}
