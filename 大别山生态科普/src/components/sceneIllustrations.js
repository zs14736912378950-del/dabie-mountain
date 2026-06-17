// 危机场景的SVG插图生成器
// 每个场景一个独特的SVG画面

export function getSceneSVG(sceneId) {
  const scenes = {
    pest: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="sc-pest-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c9a96e"/><stop offset="100%" stop-color="#e8d5b7"/></linearGradient></defs>
      <rect width="400" height="220" fill="url(#sc-pest-sky)"/>
      <text x="200" y="40" text-anchor="middle" font-size="14" fill="#5d4037" font-weight="bold">🐛 虫害侵袭的森林</text>
      <!-- 枯黄的树 -->
      <rect x="80" y="80" width="10" height="100" fill="#8d6e63" rx="3"/>
      <ellipse cx="85" cy="75" rx="35" ry="30" fill="#c8a84e" opacity="0.8"/>
      <rect x="200" y="60" width="12" height="120" fill="#8d6e63" rx="3"/>
      <ellipse cx="206" cy="55" rx="40" ry="35" fill="#b8963e" opacity="0.8"/>
      <rect x="310" y="90" width="10" height="90" fill="#8d6e63" rx="3"/>
      <ellipse cx="315" cy="85" rx="30" ry="25" fill="#c8a84e" opacity="0.8"/>
      <!-- 毛毛虫 -->
      <ellipse cx="85" cy="100" rx="8" ry="4" fill="#6d4c41"/>
      <ellipse cx="206" cy="80" rx="10" ry="5" fill="#5d4037"/>
      <ellipse cx="315" cy="105" rx="7" ry="3.5" fill="#6d4c41"/>
      <!-- 地面 -->
      <rect x="0" y="180" width="400" height="40" fill="#a0825a" opacity="0.6"/>
    </svg>`,
    
    recovery: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="recsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#87CEEB"/><stop offset="100%" stop-color="#c8e6c9"/></linearGradient></defs>
      <rect width="400" height="220" fill="url(#recsky)"/>
      <text x="200" y="35" text-anchor="middle" font-size="14" fill="#2d5a27" font-weight="bold">🌱 森林正在恢复</text>
      <circle cx="330" cy="50" r="25" fill="#fff176" opacity="0.6"/>
      <!-- 恢复中的树 -->
      <rect x="70" y="80" width="10" height="100" fill="#6d4c41" rx="3"/>
      <ellipse cx="75" cy="75" rx="35" ry="30" fill="#66bb6a" opacity="0.8"/>
      <ellipse cx="75" cy="70" rx="20" ry="18" fill="#81c784" opacity="0.7"/>
      <rect x="190" y="60" width="12" height="120" fill="#5d4037" rx="3"/>
      <ellipse cx="196" cy="55" rx="42" ry="36" fill="#4caf50" opacity="0.8"/>
      <ellipse cx="196" cy="50" rx="25" ry="22" fill="#81c784" opacity="0.7"/>
      <rect x="310" y="85" width="10" height="95" fill="#6d4c41" rx="3"/>
      <ellipse cx="315" cy="80" rx="32" ry="28" fill="#66bb6a" opacity="0.8"/>
      <!-- 小鸟 -->
      <path d="M140,60 Q145,52 150,60" stroke="#5d4037" stroke-width="2" fill="none"/>
      <path d="M260,45 Q265,38 270,45" stroke="#5d4037" stroke-width="2" fill="none"/>
      <rect x="0" y="175" width="400" height="45" fill="#4caf50" opacity="0.4"/>
    </svg>`,
    
    deadforest: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="deadsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#9e9e9e"/><stop offset="100%" stop-color="#bdbdbd"/></linearGradient></defs>
      <rect width="400" height="220" fill="url(#deadsky)"/>
      <text x="200" y="35" text-anchor="middle" font-size="14" fill="#616161" font-weight="bold">💀 死寂的森林</text>
      <!-- 枯死的树 -->
      <rect x="60" y="70" width="8" height="110" fill="#616161" rx="2"/>
      <line x1="60" y1="80" x2="30" y2="65" stroke="#757575" stroke-width="3"/>
      <line x1="68" y1="85" x2="95" y2="70" stroke="#757575" stroke-width="3"/>
      <rect x="180" y="60" width="10" height="120" fill="#616161" rx="2"/>
      <line x1="180" y1="70" x2="150" y2="55" stroke="#757575" stroke-width="3"/>
      <line x1="190" y1="75" x2="220" y2="58" stroke="#757575" stroke-width="3"/>
      <rect x="310" y="80" width="8" height="100" fill="#616161" rx="2"/>
      <line x1="310" y1="90" x2="285" y2="72" stroke="#757575" stroke-width="3"/>
      <!-- 污染的水 -->
      <ellipse cx="200" cy="175" rx="60" ry="15" fill="#8d8d5a" opacity="0.6"/>
      <ellipse cx="200" cy="178" rx="40" ry="8" fill="#7a7a4a" opacity="0.5"/>
      <rect x="0" y="190" width="400" height="30" fill="#8d8d5a" opacity="0.4"/>
    </svg>`,
    
    pangolin_hurt: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="huSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#a5d6a7"/><stop offset="100%" stop-color="#c8e6c9"/></linearGradient></defs>
      <rect width="400" height="220" fill="url(#huSky)"/>
      <text x="200" y="35" text-anchor="middle" font-size="14" fill="#4e342e" font-weight="bold">🦔 受伤的穿山甲</text>
      <!-- 树 -->
      <rect x="50" y="60" width="12" height="120" fill="#5d4037" rx="4"/>
      <ellipse cx="56" cy="55" rx="40" ry="35" fill="#4caf50" opacity="0.7"/>
      <rect x="320" y="70" width="10" height="110" fill="#5d4037" rx="3"/>
      <ellipse cx="325" cy="65" rx="35" ry="30" fill="#66bb6a" opacity="0.7"/>
      <!-- 穿山甲 -->
      <g transform="translate(190, 140)">
        <ellipse cx="0" cy="0" rx="28" ry="18" fill="#a1887f"/>
        <path d="M-20,-5 Q-15,-15 -5,-8" stroke="#795548" stroke-width="2.5" fill="none"/>
        <path d="M-10,-3 Q-5,-12 5,-6" stroke="#795548" stroke-width="2.5" fill="none"/>
        <path d="M0,-2 Q5,-10 15,-5" stroke="#795548" stroke-width="2.5" fill="none"/>
        <circle cx="-18" cy="-2" r="5" fill="#8d6e63"/>
        <circle cx="-20" cy="-3" r="2" fill="#333"/>
        <!-- 伤口的红色标记 -->
        <circle cx="10" cy="5" r="5" fill="#ef5350" opacity="0.6"/>
      </g>
      <rect x="0" y="175" width="400" height="45" fill="#795548" opacity="0.3"/>
    </svg>`,
    
    pangolin_healed: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="heSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#81d4fa"/><stop offset="100%" stop-color="#a5d6a7"/></linearGradient></defs>
      <rect width="400" height="220" fill="url(#heSky)"/>
      <text x="200" y="35" text-anchor="middle" font-size="14" fill="#2e7d32" font-weight="bold">🤲 重获新生的穿山甲</text>
      <circle cx="60" cy="50" r="30" fill="#fff9c4" opacity="0.5"/>
      <rect x="50" y="70" width="12" height="110" fill="#5d4037" rx="4"/>
      <ellipse cx="56" cy="65" rx="42" ry="36" fill="#43a047" opacity="0.7"/>
      <rect x="320" y="75" width="10" height="105" fill="#5d4037" rx="3"/>
      <ellipse cx="325" cy="70" rx="38" ry="32" fill="#66bb6a" opacity="0.7"/>
      <!-- 健康的穿山甲 -->
      <g transform="translate(190, 135)">
        <ellipse cx="0" cy="0" rx="28" ry="18" fill="#8d6e63"/>
        <path d="M-20,-5 Q-15,-15 -5,-8" stroke="#5d4037" stroke-width="2.5" fill="none"/>
        <path d="M-10,-3 Q-5,-12 5,-6" stroke="#5d4037" stroke-width="2.5" fill="none"/>
        <path d="M0,-2 Q5,-10 15,-5" stroke="#5d4037" stroke-width="2.5" fill="none"/>
        <circle cx="-18" cy="-2" r="5" fill="#a1887f"/>
        <circle cx="-20" cy="-3" r="2" fill="#333"/>
      </g>
      <rect x="0" y="175" width="400" height="45" fill="#66bb6a" opacity="0.3"/>
    </svg>`,
    
    deforest: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="dfSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#90caf9"/><stop offset="100%" stop-color="#c8e6c9"/></linearGradient></defs>
      <rect width="400" height="220" fill="url(#dfSky)"/>
      <text x="200" y="35" text-anchor="middle" font-size="14" fill="#4e342e" font-weight="bold">🪓 砍伐与开发</text>
      <!-- 左侧：完好的森林 -->
      <rect x="40" y="70" width="8" height="110" fill="#5d4037" rx="3"/>
      <ellipse cx="44" cy="65" rx="30" ry="28" fill="#4caf50" opacity="0.8"/>
      <rect x="110" y="80" width="8" height="100" fill="#5d4037" rx="3"/>
      <ellipse cx="114" cy="75" rx="25" ry="24" fill="#66bb6a" opacity="0.8"/>
      <!-- 右侧：被砍伐 -->
      <rect x="250" y="130" width="10" height="50" fill="#795548" rx="2"/>
      <text x="255" y="125" font-size="10" fill="#ef5350">✂</text>
      <rect x="300" y="135" width="8" height="45" fill="#795548" rx="2"/>
      <text x="304" y="130" font-size="10" fill="#ef5350">✂</text>
      <!-- 推土机 -->
      <rect x="280" y="140" width="50" height="25" fill="#f5a623" rx="3"/>
      <rect x="275" y="145" width="8" height="20" fill="#333"/>
      <circle cx="295" cy="170" r="8" fill="#333"/>
      <circle cx="320" cy="170" r="8" fill="#333"/>
      <rect x="0" y="180" width="400" height="40" fill="#795548" opacity="0.3"/>
    </svg>`,
    
    trash: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="trSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#b0bec5"/><stop offset="100%" stop-color="#d7ccc8"/></linearGradient></defs>
      <rect width="400" height="220" fill="url(#trSky)"/>
      <text x="200" y="35" text-anchor="middle" font-size="14" fill="#795548" font-weight="bold">🗑️ 山间垃圾</text>
      <rect x="50" y="80" width="8" height="100" fill="#5d4037" rx="3"/>
      <ellipse cx="54" cy="75" rx="28" ry="25" fill="#81c784" opacity="0.7"/>
      <rect x="320" y="85" width="8" height="95" fill="#5d4037" rx="3"/>
      <ellipse cx="324" cy="80" rx="25" ry="23" fill="#a5d6a7" opacity="0.7"/>
      <!-- 垃圾 -->
      <rect x="140" y="130" width="20" height="28" fill="#ef5350" opacity="0.8" rx="2"/>
      <rect x="165" y="140" width="15" height="20" fill="#2196f3" opacity="0.7" rx="2"/>
      <rect x="220" y="135" width="12" height="24" fill="#ff9800" opacity="0.75" rx="2"/>
      <ellipse cx="250" cy="155" rx="15" ry="8" fill="#9e9e9e" opacity="0.6"/>
      <rect x="0" y="175" width="400" height="45" fill="#a0825a" opacity="0.35"/>
    </svg>`,
    
    clean: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="clSky-clean" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#81d4fa"/><stop offset="100%" stop-color="#c8e6c9"/></linearGradient></defs>
      <rect width="400" height="220" fill="url(#clSky-clean)"/>
      <text x="200" y="35" text-anchor="middle" font-size="14" fill="#2d5a27" font-weight="bold">✨ 山间重现美丽</text>
      <circle cx="320" cy="60" r="28" fill="#fff176" opacity="0.5"/>
      <rect x="50" y="75" width="8" height="105" fill="#5d4037" rx="3"/>
      <ellipse cx="54" cy="70" rx="30" ry="28" fill="#4caf50" opacity="0.8"/>
      <!-- 杜鹃花 -->
      <circle cx="40" cy="65" r="8" fill="#f48fb1"/>
      <circle cx="48" cy="58" r="7" fill="#ec407a"/>
      <circle cx="62" cy="62" r="8" fill="#f06292"/>
      <circle cx="60" cy="52" r="6" fill="#e91e63"/>
      <circle cx="35" cy="52" r="6" fill="#f48fb1"/>
      <rect x="320" y="80" width="8" height="100" fill="#5d4037" rx="3"/>
      <ellipse cx="324" cy="75" rx="28" ry="25" fill="#66bb6a" opacity="0.8"/>
      <!-- 蝴蝶 -->
      <path d="M175,100 Q165,90 170,100 Q165,110 175,100" fill="#ff9800" opacity="0.8"/>
      <path d="M175,100 Q185,90 180,100 Q185,110 175,100" fill="#ff9800" opacity="0.8"/>
      <rect x="0" y="178" width="400" height="42" fill="#4caf50" opacity="0.35"/>
    </svg>`,
    
    ecotourism: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="ecoSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#64b5f6"/><stop offset="100%" stop-color="#a5d6a7"/></linearGradient></defs>
      <rect width="400" height="220" fill="url(#ecoSky)"/>
      <text x="200" y="35" text-anchor="middle" font-size="14" fill="#1b5e20" font-weight="bold">🤝 和谐共处</text>
      <circle cx="70" cy="55" r="25" fill="#fff9c4" opacity="0.5"/>
      <rect x="60" y="70" width="10" height="110" fill="#5d4037" rx="3"/>
      <ellipse cx="65" cy="65" rx="35" ry="30" fill="#43a047" opacity="0.8"/>
      <rect x="310" y="75" width="10" height="105" fill="#5d4037" rx="3"/>
      <ellipse cx="315" cy="70" rx="33" ry="28" fill="#66bb6a" opacity="0.8"/>
      <!-- 木栈道和观鸟屋 -->
      <rect x="140" y="150" width="120" height="6" fill="#8d6e63" rx="2"/>
      <rect x="200" y="120" width="40" height="35" fill="#a0825a" rx="4"/>
      <rect x="205" y="128" width="30" height="22" fill="#5d4037" rx="2" opacity="0.4"/>
      <rect x="220" y="118" width="5" height="5" fill="#ef5350"/>
      <!-- 小鸟 -->
      <path d="M180,90 Q187,82 194,90" stroke="#5d4037" stroke-width="2" fill="none"/>
      <rect x="0" y="180" width="400" height="40" fill="#66bb6a" opacity="0.3"/>
    </svg>`,
    
    resort: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="rtSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#b0bec5"/><stop offset="100%" stop-color="#cfd8dc"/></linearGradient></defs>
      <rect width="400" height="220" fill="url(#rtSky)"/>
      <text x="200" y="35" text-anchor="middle" font-size="14" fill="#616161" font-weight="bold">🏢 消失的家园</text>
      <!-- 酒店建筑 -->
      <rect x="160" y="60" width="80" height="120" fill="#bdbdbd" rx="3"/>
      <rect x="170" y="70" width="15" height="12" fill="#fff9c4"/>
      <rect x="195" y="70" width="15" height="12" fill="#fff9c4"/>
      <rect x="220" y="70" width="15" height="12" fill="#fff9c4"/>
      <rect x="170" y="92" width="15" height="12" fill="#fff9c4"/>
      <rect x="195" y="92" width="15" height="12" fill="#fff9c4"/>
      <rect x="220" y="92" width="15" height="12" fill="#fff9c4"/>
      <!-- 停车场 -->
      <rect x="260" y="120" width="100" height="55" fill="#9e9e9e" rx="2"/>
      <rect x="270" y="140" width="18" height="12" fill="#757575"/>
      <rect x="295" y="140" width="18" height="12" fill="#757575"/>
      <rect x="320" y="140" width="18" height="12" fill="#757575"/>
      <!-- 被砍的树桩 -->
      <ellipse cx="80" cy="168" rx="10" ry="6" fill="#795548"/>
      <ellipse cx="130" cy="170" rx="8" ry="5" fill="#795548"/>
      <rect x="0" y="180" width="400" height="40" fill="#9e9e9e" opacity="0.4"/>
    </svg>`,
    
    trash_worse: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="twSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#90a4ae"/><stop offset="100%" stop-color="#bcaaa4"/></linearGradient></defs>
      <rect width="400" height="220" fill="url(#twSky)"/>
      <text x="200" y="35" text-anchor="middle" font-size="14" fill="#616161" font-weight="bold">😞 被忽视的伤害</text>
      <rect x="50" y="75" width="8" height="105" fill="#795548" rx="3"/>
      <ellipse cx="54" cy="70" rx="22" ry="18" fill="#a5a55a" opacity="0.6"/>
      <!-- 更多垃圾 -->
      <rect x="120" y="120" width="25" height="32" fill="#ef5350" opacity="0.8" rx="2"/>
      <rect x="150" y="135" width="18" height="22" fill="#ff9800" opacity="0.75" rx="2"/>
      <rect x="200" y="125" width="20" height="28" fill="#2196f3" opacity="0.7" rx="2"/>
      <rect x="230" y="140" width="15" height="18" fill="#9e9e9e" opacity="0.7" rx="2"/>
      <!-- 缠住松鼠的塑料袋 -->
      <g transform="translate(280, 130)">
        <ellipse cx="0" cy="0" rx="10" ry="8" fill="#ef5350" opacity="0.4"/>
        <!-- 松鼠剪影 -->
        <ellipse cx="0" cy="-14" rx="6" ry="5" fill="#8d6e63"/>
        <ellipse cx="3" cy="-14" rx="4" ry="3" fill="#a1887f"/>
      </g>
      <!-- 污染的水 -->
      <ellipse cx="180" cy="178" rx="50" ry="10" fill="#a0a080" opacity="0.5"/>
      <rect x="0" y="185" width="400" height="35" fill="#8d8d5a" opacity="0.3"/>
    </svg>`,
    fire: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="fSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#616161"/><stop offset="30%" stop-color="#ff6f00"/><stop offset="100%" stop-color="#bf360c"/></linearGradient></defs><rect width="400" height="220" fill="url(#fSky)"/><text x="200" y="30" text-anchor="middle" font-size="14" fill="#fff" font-weight="bold">森林火灾</text><circle cx="330" cy="90" r="20" fill="#ff8f00" opacity="0.8"/><circle cx="340" cy="85" r="12" fill="#ffab00" opacity="0.6"/><rect x="60" y="80" width="10" height="100" fill="#4e342e" rx="3"/><ellipse cx="65" cy="70" rx="35" ry="30" fill="#d84315" opacity="0.7"/><ellipse cx="65" cy="75" rx="20" ry="15" fill="#ff6f00" opacity="0.6"/><rect x="310" y="90" width="10" height="90" fill="#4e342e" rx="3"/><ellipse cx="315" cy="80" rx="30" ry="25" fill="#d84315" opacity="0.7"/><rect x="180" y="100" width="8" height="80" fill="#4e342e" rx="2"/><ellipse cx="184" cy="90" rx="25" ry="20" fill="#ff6f00" opacity="0.7"/><path d="M100,160 Q130,140 160,160" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.3"/><rect x="0" y="185" width="400" height="35" fill="#3e2723" opacity="0.7"/></svg>`,
    firefighting: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ffSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#78909c"/><stop offset="100%" stop-color="#a5d6a7"/></linearGradient></defs><rect width="400" height="220" fill="url(#ffSky)"/><text x="200" y="30" text-anchor="middle" font-size="14" fill="#2e7d32" font-weight="bold">火势得到控制</text><circle cx="310" cy="55" r="22" fill="#fff9c4" opacity="0.7"/><rect x="60" y="80" width="10" height="100" fill="#5d4037" rx="3"/><ellipse cx="65" cy="75" rx="35" ry="28" fill="#66bb6a" opacity="0.7"/><rect x="310" y="85" width="10" height="95" fill="#5d4037" rx="3"/><ellipse cx="315" cy="80" rx="30" ry="25" fill="#4caf50" opacity="0.6"/><line x1="180" y1="160" x2="250" y2="160" stroke="#ef5350" stroke-width="3"/><text x="215" y="155" text-anchor="middle" font-size="12" fill="#ef5350">隔离带</text><rect x="0" y="180" width="400" height="40" fill="#66bb6a" opacity="0.3"/></svg>`,
    burned: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#757575"/><stop offset="100%" stop-color="#9e9e9e"/></linearGradient></defs><rect width="400" height="220" fill="url(#bSky)"/><text x="200" y="30" text-anchor="middle" font-size="14" fill="#424242" font-weight="bold">火势失控</text><rect x="50" y="80" width="8" height="100" fill="#212121" rx="2"/><line x1="50" y1="90" x2="25" y2="70" stroke="#424242" stroke-width="2"/><line x1="58" y1="95" x2="80" y2="80" stroke="#424242" stroke-width="2"/><rect x="180" y="70" width="10" height="110" fill="#212121" rx="2"/><line x1="180" y1="80" x2="155" y2="62" stroke="#424242" stroke-width="2"/><line x1="190" y1="85" x2="215" y2="68" stroke="#424242" stroke-width="2"/><rect x="320" y="85" width="8" height="95" fill="#212121" rx="2"/><rect x="0" y="185" width="400" height="35" fill="#212121" opacity="0.6"/></svg>`,
    poaching: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="poSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8d9b6a"/><stop offset="100%" stop-color="#a5a55a"/></linearGradient></defs><rect width="400" height="220" fill="url(#poSky)"/><text x="200" y="30" text-anchor="middle" font-size="14" fill="#5d4037" font-weight="bold">盗猎陷阱</text><rect x="60" y="70" width="10" height="110" fill="#5d4037" rx="3"/><ellipse cx="65" cy="65" rx="38" ry="32" fill="#6d8b3a" opacity="0.7"/><rect x="320" y="80" width="10" height="100" fill="#5d4037" rx="3"/><ellipse cx="325" cy="75" rx="35" ry="28" fill="#6d8b3a" opacity="0.7"/><circle cx="200" cy="140" r="15" fill="none" stroke="#b71c1c" stroke-width="2.5" stroke-dasharray="5,3"/><text x="200" y="143" text-anchor="middle" font-size="8" fill="#b71c1c">⚠</text><line x1="120" y1="160" x2="160" y2="120" stroke="#616161" stroke-width="1" opacity="0.5"/><line x1="160" y1="120" x2="170" y2="170" stroke="#616161" stroke-width="1" opacity="0.5"/><rect x="0" y="180" width="400" height="40" fill="#5d4037" opacity="0.3"/></svg>`,
    poacher_caught: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#81d4fa"/><stop offset="100%" stop-color="#c8e6c9"/></linearGradient></defs><rect width="400" height="220" fill="url(#pcSky)"/><text x="200" y="30" text-anchor="middle" font-size="14" fill="#1b5e20" font-weight="bold">盗猎者落网</text><circle cx="330" cy="50" r="25" fill="#fff9c4" opacity="0.6"/><rect x="60" y="75" width="10" height="105" fill="#5d4037" rx="3"/><ellipse cx="65" cy="70" rx="40" ry="34" fill="#43a047" opacity="0.7"/><rect x="310" y="80" width="10" height="100" fill="#5d4037" rx="3"/><ellipse cx="315" cy="75" rx="35" ry="30" fill="#66bb6a" opacity="0.7"/><path d="M170,100 Q178,90 186,100" stroke="#5d4037" stroke-width="2" fill="none"/><path d="M220,110 Q228,100 236,110" stroke="#5d4037" stroke-width="2" fill="none"/><rect x="0" y="180" width="400" height="40" fill="#66bb6a" opacity="0.3"/></svg>`,
    empty_trap: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="etSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#90a4ae"/><stop offset="100%" stop-color="#bcaaa4"/></linearGradient></defs><rect width="400" height="220" fill="url(#etSky)"/><text x="200" y="30" text-anchor="middle" font-size="14" fill="#616161" font-weight="bold">错失的机会</text><rect x="60" y="75" width="10" height="105" fill="#795548" rx="3"/><ellipse cx="65" cy="70" rx="32" ry="26" fill="#8d8d5a" opacity="0.6"/><circle cx="200" cy="140" r="15" fill="none" stroke="#b71c1c" stroke-width="2" stroke-dasharray="4,2"/><circle cx="200" cy="140" r="5" fill="#b71c1c" opacity="0.4"/><text x="200" y="136" text-anchor="middle" font-size="8" fill="#b71c1c">!</text><rect x="0" y="180" width="400" height="40" fill="#8d6e63" opacity="0.3"/></svg>`,
    invasive: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ivSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#aed581"/><stop offset="100%" stop-color="#8bc34a"/></linearGradient></defs><rect width="400" height="220" fill="url(#ivSky)"/><text x="200" y="30" text-anchor="middle" font-size="14" fill="#33691e" font-weight="bold">外来入侵</text><rect x="50" y="80" width="8" height="100" fill="#5d4037" rx="2"/><ellipse cx="54" cy="75" rx="15" ry="12" fill="#7cb342" opacity="0.5"/><rect x="320" y="85" width="8" height="95" fill="#5d4037" rx="2"/><ellipse cx="324" cy="80" rx="14" ry="10" fill="#7cb342" opacity="0.5"/><path d="M120,180 Q140,100 200,120 Q260,140 300,100 Q320,80 350,110" stroke="#558b2f" stroke-width="6" fill="none" opacity="0.8"/><path d="M140,180 Q160,130 190,140 Q230,150 270,120 Q290,105 320,120" stroke="#689f38" stroke-width="5" fill="none" opacity="0.7"/><rect x="0" y="180" width="400" height="40" fill="#558b2f" opacity="0.3"/></svg>`,
    native_restored: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="nrSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#81d4fa"/><stop offset="100%" stop-color="#a5d6a7"/></linearGradient></defs><rect width="400" height="220" fill="url(#nrSky)"/><text x="200" y="30" text-anchor="middle" font-size="14" fill="#2e7d32" font-weight="bold">本土植物回归</text><circle cx="60" cy="45" r="28" fill="#fff9c4" opacity="0.5"/><rect x="50" y="75" width="10" height="105" fill="#5d4037" rx="3"/><ellipse cx="55" cy="70" rx="38" ry="32" fill="#43a047" opacity="0.7"/><rect x="320" y="80" width="10" height="100" fill="#5d4037" rx="3"/><ellipse cx="325" cy="75" rx="35" ry="28" fill="#66bb6a" opacity="0.7"/><circle cx="130" cy="85" r="7" fill="#f48fb1"/><circle cx="145" cy="78" r="6" fill="#ec407a"/><circle cx="122" cy="78" r="5" fill="#f06292"/><circle cx="155" cy="82" r="5" fill="#f48fb1"/><path d="M200,95 Q190,82 195,95 Q190,108 200,95" fill="#ff9800" opacity="0.7"/><path d="M200,95 Q210,82 205,95 Q210,108 200,95" fill="#ff9800" opacity="0.7"/><rect x="0" y="180" width="400" height="40" fill="#4caf50" opacity="0.3"/></svg>`,
    invasive_spread: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="isSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#aed581"/><stop offset="100%" stop-color="#8bc34a"/></linearGradient></defs><rect width="400" height="220" fill="url(#isSky)"/><text x="200" y="30" text-anchor="middle" font-size="14" fill="#33691e" font-weight="bold">绿色沙漠</text><path d="M0,140 Q80,100 200,110 Q320,120 400,90" stroke="#558b2f" stroke-width="8" fill="none" opacity="0.7"/><path d="M0,160 Q100,130 200,140 Q300,150 400,120" stroke="#689f38" stroke-width="6" fill="none" opacity="0.6"/><path d="M0,170 Q120,150 250,160 Q350,170 400,150" stroke="#7cb342" stroke-width="5" fill="none" opacity="0.5"/><rect x="60" y="100" width="6" height="80" fill="#795548" rx="2"/><rect x="320" y="110" width="6" height="70" fill="#795548" rx="2"/></svg>`,
    water: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="wSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#90a4ae"/><stop offset="100%" stop-color="#b0bec5"/></linearGradient></defs><rect width="400" height="220" fill="url(#wSky)"/><text x="200" y="28" text-anchor="middle" font-size="14" fill="#4e342e" font-weight="bold">溪流污染</text><rect x="250" y="60" width="60" height="35" fill="#757575" rx="3"/><rect x="260" y="50" width="15" height="15" fill="#616161"/><rect x="280" y="55" width="10" height="10" fill="#424242"/><path d="M0,170 Q100,155 200,170 Q300,185 400,165" stroke="#8d8d5a" stroke-width="20" fill="none" opacity="0.6"/><ellipse cx="120" cy="170" rx="15" ry="5" fill="#fff" opacity="0.3"/><ellipse cx="280" cy="168" rx="12" ry="4" fill="#fff" opacity="0.25"/><rect x="0" y="190" width="400" height="30" fill="#616161" opacity="0.3"/></svg>`,
    clean_stream: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="csSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#81d4fa"/><stop offset="100%" stop-color="#a5d6a7"/></linearGradient></defs><rect width="400" height="220" fill="url(#csSky)"/><text x="200" y="28" text-anchor="middle" font-size="14" fill="#1b5e20" font-weight="bold">清流重现</text><circle cx="330" cy="50" r="25" fill="#fff9c4" opacity="0.5"/><rect x="50" y="70" width="10" height="110" fill="#5d4037" rx="3"/><ellipse cx="55" cy="65" rx="35" ry="30" fill="#43a047" opacity="0.7"/><rect x="310" y="75" width="10" height="105" fill="#5d4037" rx="3"/><ellipse cx="315" cy="70" rx="32" ry="28" fill="#66bb6a" opacity="0.7"/><path d="M0,175 Q150,160 400,170" stroke="#4fc3f7" stroke-width="18" fill="none" opacity="0.6"/><path d="M0,178 Q200,165 400,175" stroke="#29b6f6" stroke-width="8" fill="none" opacity="0.4"/><ellipse cx="200" cy="168" rx="8" ry="4" fill="#5d4037" opacity="0.5"/><rect x="0" y="190" width="400" height="30" fill="#43a047" opacity="0.2"/></svg>`,
    dead_stream: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="dsSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#757575"/><stop offset="100%" stop-color="#9e9e9e"/></linearGradient></defs><rect width="400" height="220" fill="url(#dsSky)"/><text x="200" y="28" text-anchor="middle" font-size="14" fill="#424242" font-weight="bold">死去的溪流</text><rect x="50" y="80" width="8" height="100" fill="#616161" rx="2"/><ellipse cx="54" cy="75" rx="22" ry="18" fill="#8d8d5a" opacity="0.5"/><path d="M0,170 Q120,140 250,170 Q350,200 400,160" stroke="#6d6d3a" stroke-width="22" fill="none" opacity="0.6"/><ellipse cx="160" cy="160" rx="10" ry="5" fill="#e0e0e0" opacity="0.4"/><ellipse cx="280" cy="172" rx="12" ry="6" fill="#e0e0e0" opacity="0.3"/><rect x="0" y="190" width="400" height="30" fill="#616161" opacity="0.4"/></svg>`,






  };
  
  return scenes[sceneId] || scenes.pest;
}
