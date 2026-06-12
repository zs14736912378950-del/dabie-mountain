// 首页引导 — 沉浸式英雄页
import gsap from "gsap";
import { navigateTo } from "../utils/navigation.js";
import { initAudio, playClick } from "../utils/audio.js";
import { showGuide, hideGuide } from "../components/guideBoy.js";

let _particleInterval = null;

export function init(container) {
  container.innerHTML = `
    <div class="home-page">
      <div class="home-bg" style="background:radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255,248,225,0.25) 0%, transparent 60%),linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.45) 100%),url(images/home-bg.jpeg) center/cover no-repeat;"></div>
      <div class="home-particles" id="home-particles"></div>
      <div class="home-content">
        <div class="home-logo">🌲</div>
        <h1 class="home-title">大别山生态密码</h1>
        <p class="home-subtitle">潜入安徽大别山的原始森林，探索奇妙物种，解开食物链谜题，成为真正的生态守护者</p>
        <button class="home-start-btn" id="home-start" aria-label="开始探索大别山生态">开始探索</button>
        <button class="home-geo-btn" id="home-geo-btn">🏔️ 了解大别山</button>
      </div>
    </div>
  `;

  // 入场动画 — 元素依次淡入上浮
  gsap.from(".home-logo", { y: -40, opacity: 0, duration: 1, ease: "back.out(1.4)", delay: 0.3 });
  gsap.from(".home-title", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.6 });
  gsap.from(".home-subtitle", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.9 });
  gsap.from(".home-start-btn", { y: 20, opacity: 0, scale: 0.9, duration: 0.7, ease: "back.out(1.3)", delay: 1.2 });

  // 背景缓慢漂移
  gsap.to(".home-bg", {
    backgroundPosition: "0% 6%",
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // 背景飘落粒子（树叶/光点）
  startParticles(container);

  // 小男孩引导
  showGuide("home", container, {
    start: function() {
      initAudio();
      playClick();
      stopParticles();
      hideGuide();
      gsap.to(".home-content", {
        opacity: 0, scale: 0.95, y: -10,
        duration: 0.35, ease: "power2.in",
        onComplete: function() { navigateTo("explore"); }
      });
    }
  });

  // 开始按钮
  container.querySelector("#home-start").addEventListener("click", function() {
    initAudio();
    playClick();
    stopParticles();
    hideGuide();
    gsap.to(".home-content", {
      opacity: 0, scale: 0.95, y: -10,
      duration: 0.35, ease: "power2.in",
      onComplete: function() { navigateTo("explore"); }
    });
  });

  // 地理知识按钮
  container.querySelector("#home-geo-btn").addEventListener("click", function() {
    playClick();
    stopParticles();
    hideGuide();
    navigateTo("geography");
  });
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

  // 初始批量
  for (var i = 0; i < 8; i++) setTimeout(spawn, i * 300);
  _particleInterval = setInterval(spawn, 800);
}

function stopParticles() {
  if (_particleInterval) { clearInterval(_particleInterval); _particleInterval = null; }
}

export function destroy() {
  stopParticles();
  hideGuide();
  gsap.killTweensOf(".home-content");
  gsap.killTweensOf(".home-bg");
  gsap.killTweensOf("#home-particles span");
}
