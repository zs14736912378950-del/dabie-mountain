// 大别山生态知识页面 v4 (修复版)
// 新增：保护故事(#3)、数据可视化(#11)、时间线(#15)
import gsap from "gsap";
import { navigateTo, unlockChapter } from "../utils/navigation.js";
import { playClick } from "../utils/audio.js";
import { dabieGeography, seasons } from "../content/index.js";
import { conservationStories } from "../content/index.js";

export function init(container) {
  const geo = dabieGeography;

  container.innerHTML = `
    <div class="page page-scrollable">
      <div class="top-nav">
        <button class="top-nav-back" id="geo-back" aria-label="返回首页">🏠</button>
        <span class="top-nav-title">🏔️ 大别山生态知识</span>
        <div style="width:34px;"></div>
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

        <!-- 数据可视化 (#11) — 生物多样性图表 -->
        <div class="geo-section">
          <h3 class="geo-section-title">📊 生物多样性</h3>
          <div class="chart-container" style="overflow:hidden;">
            <div class="chart-title">大别山物种组成</div>
            <div style="display:flex;justify-content:center;">
              <canvas id="biodiversity-chart" style="display:block;max-width:100%;"></canvas>
            </div>
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

        <!-- 保护时间线 (#15) -->
        <div class="geo-section">
          <h3 class="geo-section-title">📅 保护历程</h3>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-year">1991年</div>
              <div class="timeline-title">鹞落坪国家级自然保护区成立</div>
              <div class="timeline-desc">保护大别山核心区域的原始森林和珍稀物种</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2003年</div>
              <div class="timeline-title">天马国家级自然保护区成立</div>
              <div class="timeline-desc">面积28914公顷，成为大别山最大的自然保护区</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2010年</div>
              <div class="timeline-title">霍山石斛人工繁育成功</div>
              <div class="timeline-desc">科学家攻克濒危物种繁育技术，实现保护与利用双赢</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2021年</div>
              <div class="timeline-title">大别山反盗猎行动</div>
              <div class="timeline-desc">森林公安破获特大盗猎案件，区域盗猎案件下降70%</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2023年</div>
              <div class="timeline-title">村民自发成立穿山甲保护志愿队</div>
              <div class="timeline-desc">民间保护力量壮大，监测区域穿山甲目击率提升5倍</div>
            </div>
          </div>
        </div>

        <!-- 真实保护故事 (#3) -->
        <div class="geo-section">
          <h3 class="geo-section-title">💚 真实保护故事</h3>
          ${conservationStories.slice(0, 3).map(story => `
            <div class="story-card">
              <div class="story-card-header">
                <div class="story-card-emoji">${story.emoji}</div>
                <div class="story-card-meta">
                  <div class="story-card-title">${story.title}</div>
                  <div class="story-card-year">${story.year} · ${story.location}</div>
                </div>
              </div>
              <div class="story-card-body">${story.summary}</div>
              <div class="story-card-impact">🌟 ${story.impact}</div>
            </div>
          `).join("")}
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

        <!-- 数据来源 -->
        <p style="font-size:11px;color:#9CA3AF;text-align:center;margin-top:16px;">
          数据参考：《安徽大别山自然保护区综合科学考察报告》· 中国生物多样性红色名录
        </p>

        <!-- 按钮区 -->
        <div class="geo-actions">
          <button class="btn btn-primary" id="geo-next-btn">👉 下一章</button>
        </div>
      </div>
    </div>
  `;

  // 绘制生物多样性图表 (#11)
  drawBiodiversityChart();

  // 入场动画
  gsap.from(".geo-hero", { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" });
  gsap.from(".geo-stats-card", { opacity: 0, y: 15, duration: 0.4, delay: 0.1, ease: "power2.out" });
  gsap.from(".geo-section", { opacity: 0, y: 15, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" });

  // 返回首页按钮 (#6)
  container.querySelector("#geo-back").addEventListener("click", function() {
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

// 绘制生物多样性柱状图 (#11) — 使用柱状图避免标签重叠
function drawBiodiversityChart() {
  const canvas = document.getElementById("biodiversity-chart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 2;
  const width = 320;
  const height = 200;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.scale(dpr, dpr);

  // 数据
  const data = [
    { label: "植物", value: 3000, color: "#059669" },
    { label: "昆虫", value: 3000, color: "#3B82F6" },
    { label: "鸟类", value: 400, color: "#FBBF24" },
    { label: "兽类", value: 100, color: "#8B5CF6" },
    { label: "两栖类", value: 40, color: "#EC4899" }
  ];

  const total = data.reduce((s, d) => s + d.value, 0);
  const maxValue = 3200;

  // 图表区域
  var chartLeft = 45;
  var chartRight = width - 15;
  var chartTop = 25;
  var chartBottom = height - 35;
  var chartWidth = chartRight - chartLeft;
  var chartHeight = chartBottom - chartTop;

  // 绘制Y轴刻度线
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;
  var ySteps = [0, 1000, 2000, 3000];
  for (var si = 0; si < ySteps.length; si++) {
    var val = ySteps[si];
    var y = chartBottom - (val / maxValue) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(chartLeft, y);
    ctx.lineTo(chartRight, y);
    ctx.stroke();
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#9CA3AF";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(val.toString(), chartLeft - 6, y);
  }

  // 绘制柱状图
  var barGap = 10;
  var barWidth = (chartWidth - barGap * (data.length + 1)) / data.length;

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var x = chartLeft + barGap + i * (barWidth + barGap);
    var barHeight = (item.value / maxValue) * chartHeight;
    var yBar = chartBottom - barHeight;

    // 柱子（用矩形+圆角模拟）
    ctx.fillStyle = item.color;
    ctx.beginPath();
    var r = 3;
    ctx.moveTo(x + r, yBar);
    ctx.lineTo(x + barWidth - r, yBar);
    ctx.quadraticCurveTo(x + barWidth, yBar, x + barWidth, yBar + r);
    ctx.lineTo(x + barWidth, chartBottom);
    ctx.lineTo(x, chartBottom);
    ctx.lineTo(x, yBar + r);
    ctx.quadraticCurveTo(x, yBar, x + r, yBar);
    ctx.closePath();
    ctx.fill();

    // 数值标签
    ctx.font = "bold 10px sans-serif";
    ctx.fillStyle = item.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(item.value.toString(), x + barWidth / 2, yBar - 3);

    // X轴标签
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#374151";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(item.label, x + barWidth / 2, chartBottom + 6);

    // 占比标签（柱子内部）
    var pct = Math.round((item.value / total) * 100);
    if (barHeight > 20) {
      ctx.font = "9px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(pct + "%", x + barWidth / 2, yBar + barHeight / 2);
    }
  }

  // 总数标签
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.font = "bold 11px sans-serif";
  ctx.fillStyle = "#064E3B";
  ctx.fillText("总计 " + total.toLocaleString() + " 种", width / 2, height - 5);
}

export function destroy() {}
