// 首页引导 — 电影级开场 + 骨架屏 + 星星彩蛋
import gsap from "gsap";
import { navigateTo } from "../utils/navigation.js";
import { initAudio, playClick } from "../utils/audio.js";
import { showGuide, hideGuide } from "../components/guideBoy.js";

let _particleInterval = null;
let _titleClickCount = 0;
let _titleClickTimer = null;

export function init(container) {
  const bgImgUrl = "/images/home-bg.jpeg";

  container.innerHTML = `
    <div class="home-page">
      <!-- 黑色遮罩：开场时覆盖 -->
      <div id="intro-mask" style="position:fixed;inset:0;z-index:999;background:#000;pointer-events:auto;"></div>

      <!-- 背景 -->
      <div class="home-bg" id="home-bg" style="background:radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255,248,225,0.25) 0%, transparent 60%),linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.45) 100%);background-color:#2d5a27;">
        <div class="home-bg-skeleton" id="home-bg-skeleton"></div>
        <img id="home-bg-img" src="${bgImgUrl}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;">
      </div>

      <!-- 云层漂散粒子 -->
      <div id="cloud-particles" style="position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden;"></div>

      <!-- 飘落粒子 -->
      <div class="home-particles" id="home-particles"></div>

      <!-- 内容层 -->
      <div class="home-content" id="home-content">
        <div class="home-logo" id="home-logo">🌲</div>
        <h1 class="home-title" id="home-title">大别山生态密码</h1>
        <p class="home-subtitle">潜入安徽大别山的原始森林，探索奇妙物种，解开食物链谜题，成为真正的生态守护者</p>
        <button class="home-start-btn" id="home-start" aria-label="开始探索大别山生态">开始探索</button>
        <button class="home-geo-btn" id="home-geo-btn">🏔️ 了解大别山</button>
      </div>
    </div>
  `;

  const mask = container.querySelector("#intro-mask");
  const bgImg = container.querySelector("#home-bg-img");
  const skeleton = container.querySelector("#home-bg-skeleton");
  const cloudBox = container.querySelector("#cloud-particles");
  const contentEl = container.querySelector("#home-content");

  // === 预加载背景图 ===
  const imgPreload = new Image();
  imgPreload.onload = function() {
    bgImg.style.opacity = "1";
    if (skeleton) skeleton.style.display = "none";
  };
  imgPreload.src = bgImgUrl;

  // 简单开场：遮罩淡出
  gsap.to(mask, { opacity: 0, duration: 0.8, ease: "power2.out" });
  setTimeout(function() {
    mask.style.pointerEvents = "none";
    mask.style.display = "none";
  }, 800);

  // 背景缓慢漂移（intro 结束后）
  gsap.to(container.querySelector(".home-bg"), {
    backgroundPosition: "0% 6%",
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 3.5
  });

  // 飘落粒子延迟启动
  setTimeout(function() { startParticles(container); }, 3500);

  // === 标题彩蛋：连点 3 次触发星星雨 ===
  const titleEl = container.querySelector("#home-title");
  if (titleEl) {
    titleEl.style.cursor = "pointer";
    titleEl.addEventListener("click", function() {
      _titleClickCount++;
      clearTimeout(_titleClickTimer);
      _titleClickTimer = setTimeout(function() { _titleClickCount = 0; }, 1500);
      if (_titleClickCount >= 3) {
        _titleClickCount = 0;
        spawnStarRain(container);
      }
    });
  }

  // 小男孩引导
  showGuide("home", container, {
    start: function() {
      initAudio();
      playClick();
      stopParticles();
      hideGuide();
      gsap.to(contentEl, {
        opacity: 0, scale: 0.95, y: -10,
        duration: 0.35, ease: "power2.in",
        onComplete: function() { navigateTo("explore"); }
      });
    }
  });

  // 开始按钮
  const startBtn = container.querySelector("#home-start");
  if (startBtn) {
    startBtn.addEventListener("click", function() {
      initAudio();
      playClick();
      stopParticles();
      hideGuide();
      gsap.to(contentEl, {
        opacity: 0, scale: 0.95, y: -10,
        duration: 0.35, ease: "power2.in",
        onComplete: function() { navigateTo("explore"); }
      });
    });
  }

  // 地理知识按钮
  const geoBtn = container.querySelector("#home-geo-btn");
  if (geoBtn) {
    geoBtn.addEventListener("click", function() {
      playClick();
      stopParticles();
      hideGuide();
      navigateTo("geography");
    });
  }
}

// 星星雨彩蛋
function spawnStarRain(container) {
  const emojis = ["⭐", "✨", "🌟", "💫", "⚡"];
  for (let i = 0; i < 20; i++) {
    setTimeout(function() {
      const el = document.createElement("div");
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = "position:fixed;top:-30px;left:" + (10 + Math.random() * 80)
        + "vw;font-size:" + (16 + Math.random() * 20)
        + "px;pointer-events:none;z-index:1000;";
      document.body.appendChild(el);
      gsap.to(el, {
        y: window.innerHeight + 60,
        x: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: 2 + Math.random() * 2,
        ease: "power1.in",
        onComplete: function() { el.remove(); }
      });
    }, i * 80);
  }
}

function startParticles(container) {
  var pool = ["🍃", "✨", "🌿", "💚", "⭐"];
  var particleBox = container.querySelector("#home-particles");
  if (!particleBox) return;

  function spawn() {
    var el = document.createElement("span");
    el.textContent = pool[Math.floor(Math.random() * pool.length)];
    el.style.cssText = "position:absolute;font-size:" + (12 + Math.random() * 14)
      + "px;left:" + Math.random() * 100 + "%;top:-20px;pointer-events:none;opacity:0.7;";
    particleBox.appendChild(el);
    gsap.to(el, {
      y: window.innerHeight + 40,
      x: (Math.random() - 0.5) * 80,
      rotation: Math.random() * 360,
      opacity: 0,
      duration: 4 + Math.random() * 4,
      ease: "none",
      onComplete: function() { el.remove(); }
    });
  }

  for (var i = 0; i < 8; i++) setTimeout(spawn, i * 300);
  _particleInterval = setInterval(spawn, 800);
}

function stopParticles() {
  if (_particleInterval) { clearInterval(_particleInterval); _particleInterval = null; }
}

export function destroy() {
  stopParticles();
  hideGuide();
  clearTimeout(_titleClickTimer);
  gsap.killTweensOf("#home-content");
  gsap.killTweensOf("#home-bg");
  gsap.killTweensOf("#home-particles span");
  document.querySelectorAll("#cloud-particles div").forEach(el => el.remove());
}
