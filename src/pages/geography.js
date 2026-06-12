// 大别山生态知识页面 — 匹配其他章节视觉风格
import gsap from "gsap";
import { navigateTo, unlockChapter } from "../utils/navigation.js";
import { playClick } from "../utils/audio.js";
import { dabieGeography, seasons } from "../content/index.js";

export function init(container) {
  const geo = dabieGeography;

  container.innerHTML = `
    <div class="page page-scrollable">
      <div class="top-nav">
        <span class="top-nav-title">🏔️ 大别山生态知识</span>
      </div>

      <div class="geo-page">
        <!-- 英雄区：大别山全景 -->
        <div class="geo-hero">
          <img src="images/species/dabie-mountain-peak.jpg" alt="大别山主峰" class="geo-hero-img" onerror="this.style.display='none'">
          <div class="geo-hero-overlay">
            <div class="geo-hero-title">🏔️ 大别山</div>
            <div class="geo-hero-sub">安徽·湖北·河南 三省交界</div>
          </div>
        </div>

        <!-- 核心数据卡片 -->
        <div class="geo-stats-card">
          <div class="geo-stat-item">
            <div class="geo-stat-emoji">🌿</div>
            <div class="geo-stat-num">3000+</div>
            <div class="geo-stat-label">植物种类</div>
          </div>
          <div class="geo-stat-item">
            <div class="geo-stat-emoji">🦜</div>
            <div class="geo-stat-num">400+</div>
            <div class="geo-stat-label">鸟类种类</div>
          </div>
          <div class="geo-stat-item">
            <div class="geo-stat-emoji">🦌</div>
            <div class="geo-stat-num">100+</div>
            <div class="geo-stat-label">兽类种类</div>
          </div>
          <div class="geo-stat-item">
            <div class="geo-stat-emoji">🛡️</div>
            <div class="geo-stat-num">60+</div>
            <div class="geo-stat-label">国家保护</div>
          </div>
        </div>

        <!-- 地理概况 -->
        <div class="geo-section">
          <h3 class="geo-section-title">📍 地理概况</h3>
          <p class="geo-section-desc">${geo.overview}</p>
          <div class="geo-info-row">
            <div class="geo-info-chip">📐 ${geo.terrain.area}</div>
            <div class="geo-info-chip">⛰️ 白马尖 1777m</div>
            <div class="geo-info-chip">🌡️ ${geo.climate.temperature}</div>
            <div class="geo-info-chip">🌧️ ${geo.climate.rainfall}</div>
          </div>
        </div>

        <!-- 四季变化 -->
        <div class="geo-section">
          <h3 class="geo-section-title">🍂 四季变化</h3>
          <div class="geo-seasons">
            ${seasons.map((s, i) => `
              <div class="geo-season-card" style="border-top:4px solid ${s.color};">
                <div class="geo-season-emoji">${s.emoji}</div>
                <div class="geo-season-name">${s.name}</div>
                <div class="geo-season-months">${s.months}</div>
                <div class="geo-season-desc">${s.features}</div>
                <div class="geo-season-species">🐾 ${s.species}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- 保护区 -->
        <div class="geo-section">
          <h3 class="geo-section-title">🛡️ 自然保护区</h3>
          <div class="geo-protected">
            ${geo.protectedAreas.map(p => `
              <div class="geo-protected-item">
                <div class="geo-protected-name">🌲 ${p.name}</div>
                <div class="geo-protected-meta">${p.area} · 建立于 ${p.year} 年</div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- 保护意义 -->
        <div class="geo-section">
          <h3 class="geo-section-title">💚 保护意义</h3>
          <div class="geo-importance">
            ${geo.conservationImportance.map(item => `
              <div class="geo-importance-item">✅ ${item}</div>
            `).join("")}
          </div>
        </div>

        <!-- 按钮区 -->
        <div class="geo-actions">
          <button class="btn btn-outline btn-small" id="geo-back-btn">🏠 返回首页</button>
          <button class="btn btn-primary" id="geo-next-btn">下一章 →</button>
        </div>
      </div>
    </div>
  `;

  // 入场动画
  gsap.from(".geo-hero", { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" });
  gsap.from(".geo-stats-card", { opacity: 0, y: 15, duration: 0.4, delay: 0.1, ease: "power2.out" });
  gsap.from(".geo-section", { opacity: 0, y: 15, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" });

  // 返回按钮
  container.querySelector("#geo-back-btn").addEventListener("click", function() {
    playClick();
    navigateTo("home");
  });

  // 下一章按钮
  container.querySelector("#geo-next-btn").addEventListener("click", function() {
    playClick();
    unlockChapter(2);
    navigateTo("explore");
  });
}

export function destroy() {}
