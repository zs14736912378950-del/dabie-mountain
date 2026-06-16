// 第四章：守护者证书 — 精美SVG版
// 修复版：证书图片生成(#2)、保护故事(#3)、行动号召(#13)
import gsap from "gsap";
import { navigateTo } from "../utils/navigation.js";
import { playClick, playCelebration, playCertificateBGM, stopAmbience } from "../utils/audio.js";
import { showGuide, hideGuide } from "../components/guideBoy.js";
import { scenarios } from "../data/scenarios.js";
import { conservationStories } from "../content/index.js";

// 评分标准：满分基于场景数量（每个场景约10分）
const TOTAL_SCENARIOS = scenarios.length;
const MAX_SCORE = TOTAL_SCENARIOS * 10;

export function init(container) {
  let ecoScore = 0;
  let choicesMade = [];
  let discoveredSpeciesSize = 0;
  let puzzleCorrect = 0;
  try {
    ecoScore = parseInt(sessionStorage.getItem("dabie-ecoScore")) || 0;
    choicesMade = JSON.parse(sessionStorage.getItem("dabie-choices")) || [];
    discoveredSpeciesSize = parseInt(sessionStorage.getItem("dabie-discoveredSpecies")) || 0;
    puzzleCorrect = parseInt(sessionStorage.getItem("dabie-puzzleCorrect")) || 0;
  } catch (e) {}

  // 计算正确率
  const positiveCount = choicesMade.filter(c => c.score > 0).length;
  const accuracy = Math.round((positiveCount / TOTAL_SCENARIOS) * 100);

  // 评级标准（基于满分80分）
  let grade, gradeClass, gradeEmoji, gradeDesc;
  if (ecoScore >= 70) {
    grade = "钻石守护者"; gradeClass = "grade-diamond"; gradeEmoji = "💎";
    gradeDesc = "你是真正的生态英雄！每一个选择都体现了对自然的深刻理解和尊重。大别山的万物生灵因你而安心。";
  } else if (ecoScore >= 50) {
    grade = "黄金守护者"; gradeClass = "grade-gold"; gradeEmoji = "🥇";
    gradeDesc = "你是一位优秀的生态守护者！大部分选择都很正确，继续学习生态知识，你会变得更强大。";
  } else if (ecoScore >= 30) {
    grade = "白银守护者"; gradeClass = "grade-silver"; gradeEmoji = "🥈";
    gradeDesc = "你已经走上了生态守护之路！有些选择还可以更好，多了解大别山的生态知识，下次一定能做得更好。";
  } else {
    grade = "青铜守护者"; gradeClass = "grade-bronze"; gradeEmoji = "🥉";
    gradeDesc = "生态守护之路才刚刚开始！每个错误的选择都是一次学习机会，相信下次你会做出更好的判断。";
  }

  // 随机选择2个保护故事展示
  const shuffledStories = [...conservationStories].sort(() => Math.random() - 0.5);
  const displayStories = shuffledStories.slice(0, 2);

  const wreathSVG = `<svg viewBox="0 0 300 60" width="300" height="60" xmlns="http://www.w3.org/2000/svg">
    <path d="M20,50 Q10,20 30,10" stroke="#4caf50" stroke-width="2.5" fill="none"/>
    <path d="M40,50 Q30,22 50,12" stroke="#66bb6a" stroke-width="2" fill="none"/>
    <ellipse cx="25" cy="15" rx="8" ry="5" fill="#81c784" opacity="0.6"/>
    <ellipse cx="42" cy="18" rx="7" ry="4" fill="#a5d6a7" opacity="0.5"/>
    <path d="M280,50 Q290,20 270,10" stroke="#4caf50" stroke-width="2.5" fill="none"/>
    <path d="M260,50 Q270,22 250,12" stroke="#66bb6a" stroke-width="2" fill="none"/>
    <ellipse cx="275" cy="15" rx="8" ry="5" fill="#81c784" opacity="0.6"/>
    <ellipse cx="258" cy="18" rx="7" ry="4" fill="#a5d6a7" opacity="0.5"/>
    <circle cx="150" cy="20" r="14" fill="#ffcc02" opacity="0.4"/>
    <circle cx="150" cy="20" r="9" fill="#fff176"/>
    <circle cx="150" cy="20" r="5" fill="#f57f17"/>
    <text x="110" y="18" font-size="12" fill="#ffcc02">✦</text>
    <text x="182" y="15" font-size="10" fill="#ffcc02">✧</text>
    <text x="130" y="12" font-size="8" fill="#ffcc02">✧</text>
    <text x="165" y="10" font-size="9" fill="#ffcc02">✦</text>
  </svg>`;

  container.innerHTML = `
    <div class="page page-scrollable">
      <div class="certificate-page" id="certificate-page">
        <div class="certificate-card" id="certificate-card">
          <!-- 顶部装饰 -->
          <div style="font-size:32px;line-height:1;">🌲 ${gradeEmoji} 🦅</div>
          <h1 class="certificate-title" style="font-size:24px;margin:6px 0 4px;">生态守护者</h1>
          <div class="certificate-subtitle" style="font-size:13px;">大别山生态密码</div>
          <div class="certificate-grade ${gradeClass}" style="margin:8px 0;padding:8px 20px;font-size:14px;">${gradeEmoji} ${grade}</div>

          <!-- 三栏数据 -->
          <div style="display:flex;justify-content:center;gap:16px;margin:10px 0;">
            <div style="text-align:center;">
              <div style="font-size:22px;font-weight:800;color:var(--color-primary);">${ecoScore}</div>
              <div style="font-size:11px;color:var(--color-text-muted);">生态值</div>
            </div>
            <div style="width:1px;background:rgba(0,0,0,0.08);"></div>
            <div style="text-align:center;">
              <div style="font-size:22px;font-weight:800;color:var(--color-primary);">${accuracy}%</div>
              <div style="font-size:11px;color:var(--color-text-muted);">正确率</div>
            </div>
            <div style="width:1px;background:rgba(0,0,0,0.08);"></div>
            <div style="text-align:center;">
              <div style="font-size:22px;font-weight:800;color:var(--color-primary);">${positiveCount}/${TOTAL_SCENARIOS}</div>
              <div style="font-size:11px;color:var(--color-text-muted);">正确选择</div>
            </div>
          </div>

          <p style="color:var(--color-text-secondary);font-size:13px;line-height:1.6;text-align:center;margin:6px 0;padding:0 12px;">
            ${gradeDesc}
          </p>

          <!-- 满分彩蛋 -->
          ${ecoScore >= MAX_SCORE ? '<p style="color:#D97706;font-size:13px;text-align:center;font-weight:700;margin:4px 0;">🏅 传说级生态守护者</p>' : ''}

          <!-- 生态素养雷达图 -->
          <div class="radar-section" style="max-width:320px;margin:8px auto;">
            <div style="font-size:14px;font-weight:700;color:#064E3B;text-align:center;margin-bottom:10px;">📊 你的生态素养</div>
            <div class="radar-bars">
              ${[
                { label: "物种知识", value: Math.round((discoveredSpeciesSize / 12) * 100), color: "#059669" },
                { label: "危机应对", value: Math.round((positiveCount / TOTAL_SCENARIOS) * 100), color: "#F59E0B" },
                { label: "生态平衡", value: Math.round((puzzleCorrect / 7) * 100), color: "#3B82F6" },
                { label: "保护意识", value: Math.round((ecoScore / MAX_SCORE) * 100), color: "#8B5CF6" }
              ].map(d => `
                <div class="radar-bar-row">
                  <span class="radar-bar-label">${d.label}</span>
                  <div class="radar-bar-track">
                    <div class="radar-bar-fill" style="width:0%;background:${d.color};" data-width="${Math.min(100, d.value)}%"></div>
                  </div>
                  <span class="radar-bar-value">${Math.min(100, d.value)}%</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- 选择回顾（紧凑版） -->
          <div class="certificate-summary" style="max-height:140px;overflow-y:auto;">
            <h4 style="font-size:13px;margin-bottom:6px;">📋 选择回顾</h4>
            ${choicesMade.map((ch, i) => `
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;padding:5px 8px;background:rgba(255,255,255,0.5);border-radius:8px;font-size:12px;">
                <span style="font-weight:700;color:var(--color-accent);min-width:16px;">${i + 1}.</span>
                <span style="flex:1;color:var(--color-text);font-weight:500;">${ch.scenario.split(" ")[0]}</span>
                <span style="font-weight:700;color:${ch.score >= 0 ? 'var(--color-success)' : 'var(--color-danger)'};">
                  ${ch.score >= 0 ? '+' : ''}${ch.score}
                </span>
              </div>
            `).join("")}
          </div>

          <!-- 按钮 -->
          <div style="margin-top:12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
            <button class="btn btn-primary btn-small" id="cert-restart" aria-label="重新探索大别山生态">🔄 再来一次</button>
            <button class="btn btn-outline btn-small" id="cert-save-img" aria-label="保存证书图片">📷 保存证书</button>
            <button class="btn btn-outline btn-small" id="cert-share" aria-label="分享我的生态守护者证书">📤 分享证书</button>
          </div>
        </div>

        <!-- 真实保护故事 (#3) -->
        <div class="geo-section" style="margin-top:20px;max-width:380px;width:100%;">
          <h3 class="geo-section-title">💚 真实保护故事</h3>
          ${displayStories.map(story => `
            <div class="story-card">
              <div class="story-card-header">
                <div class="story-card-emoji">${story.emoji}</div>
                <div class="story-card-meta">
                  <div class="story-card-title">${story.title}</div>
                  <div class="story-card-year">${story.year} · ${story.location}</div>
                </div>
              </div>
              <div class="story-card-body">${story.story}</div>
              <div class="story-card-impact">🌟 ${story.impact}</div>
              <div class="story-card-lesson">💡 ${story.lesson}</div>
            </div>
          `).join("")}
        </div>

        <!-- 行动号召 (#13) -->
        <div class="action-section" style="max-width:380px;width:100%;">
          <div class="action-section-title">🌱 你可以做的事</div>
          <div class="action-list">
            <div class="action-item">
              <div class="action-item-emoji">📚</div>
              <div class="action-item-text">
                <strong>学习生态知识</strong>
                了解更多关于大别山和本地生态的知识，知识是保护的第一步。
              </div>
            </div>
            <div class="action-item">
              <div class="action-item-emoji">🚶</div>
              <div class="action-item-text">
                <strong>参与净山行动</strong>
                加入志愿者团队，清理山间垃圾，保护自然环境。
              </div>
            </div>
            <div class="action-item">
              <div class="action-item-emoji">📢</div>
              <div class="action-item-text">
                <strong>传播保护理念</strong>
                向家人朋友分享你学到的生态知识，影响更多人。
              </div>
            </div>
            <div class="action-item">
              <div class="action-item-emoji">🔍</div>
              <div class="action-item-text">
                <strong>举报违法行为</strong>
                发现盗猎、非法砍伐等行为，立即拨打110或12369环保热线。
              </div>
            </div>
          </div>
        </div>

        <!-- 底部间距 -->
        <div style="height:20px;"></div>
      </div>
    </div>
  `;

  playCelebration();
  playCertificateBGM();

  const card = container.querySelector("#certificate-card");
  gsap.from(card, { y: 100, rotationX: 15, opacity: 0, duration: 1, ease: "back.out(1.2)" });

  spawnParticles(container);

  // 雷达图条形动画
  setTimeout(() => {
    document.querySelectorAll(".radar-bar-fill").forEach(bar => {
      const targetWidth = bar.dataset.width;
      gsap.to(bar, { width: targetWidth, duration: 0.8, ease: "power2.out", delay: 0.5 });
    });
  }, 300);

  // 小男孩引导
  showGuide("certificate", container, {
    share: function() {
      playClick();
      shareCertificate(grade, ecoScore);
    },
    restart: function() {
      playClick();
      hideGuide();
      restartApp();
    }
  });

  // 保存证书图片按钮 (#2)
  container.querySelector("#cert-save-img").addEventListener("click", () => {
    playClick();
    saveCertificateAsImage(card, grade, ecoScore);
  });

  // 分享按钮
  container.querySelector("#cert-share").addEventListener("click", () => {
    playClick();
    shareCertificate(grade, ecoScore);
  });

  // 重新开始按钮
  container.querySelector("#cert-restart").addEventListener("click", () => {
    playClick();
    hideGuide();
    restartApp();
  });
}

// 保存证书为图片 (#2)
function saveCertificateAsImage(card, grade, score) {
  // 使用 Canvas API 生成证书图片（兼容性最好）
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 2;
    const width = 380;
    const height = 500;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 背景
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#fffef8");
    gradient.addColorStop(0.5, "#fdf6e8");
    gradient.addColorStop(1, "#faf3e0");
    ctx.fillStyle = gradient;
    ctx.roundRect(0, 0, width, height, 20);
    ctx.fill();

    // 边框
    ctx.strokeStyle = "#FDE68A";
    ctx.lineWidth = 3;
    ctx.roundRect(0, 0, width, height, 20);
    ctx.stroke();

    // 内边框
    ctx.strokeStyle = "rgba(196,155,63,0.2)";
    ctx.lineWidth = 1;
    ctx.roundRect(8, 8, width - 16, height - 16, 16);
    ctx.stroke();

    // 顶部图标
    ctx.font = "32px serif";
    ctx.textAlign = "center";
    ctx.fillText("🌲 " + gradeEmoji(grade) + " 🦅", width / 2, 50);

    // 标题
    ctx.font = "bold 22px 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillStyle = "#D97706";
    ctx.fillText("生态守护者", width / 2, 80);

    ctx.font = "13px 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillStyle = "#059669";
    ctx.fillText("大别山生态密码", width / 2, 100);

    // 等级
    const gradeColors = {
      "diamond": ["#8b5cf6", "#6366f1"],
      "gold": ["#f59e0b", "#dc2626"],
      "silver": ["#94a3b8", "#64748b"],
      "bronze": ["#d97706", "#92400e"]
    };
    const gradeKey = grade.includes("钻石") ? "diamond" : grade.includes("黄金") ? "gold" : grade.includes("白银") ? "silver" : "bronze";
    const gColors = gradeColors[gradeKey];

    ctx.fillStyle = gColors[0];
    ctx.roundRect(width / 2 - 80, 115, 160, 32, 16);
    ctx.fill();
    ctx.font = "bold 14px 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText(gradeEmoji(grade) + " " + grade, width / 2, 137);

    // 数据
    ctx.textAlign = "center";
    const dataY = 180;
    ctx.font = "bold 22px 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillStyle = "#059669";
    ctx.fillText(score, width / 6, dataY);
    ctx.fillText(Math.round(score / (scenarios.length * 10) * 100) + "%", width / 2, dataY);
    ctx.fillText(score > 0 ? Math.round(score / 10) + "/" + scenarios.length : "0/" + scenarios.length, width * 5 / 6, dataY);

    ctx.font = "11px 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillStyle = "#6B7280";
    ctx.fillText("生态值", width / 6, dataY + 16);
    ctx.fillText("正确率", width / 2, dataY + 16);
    ctx.fillText("正确选择", width * 5 / 6, dataY + 16);

    // 底部文字
    ctx.font = "12px 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillStyle = "#9CA3AF";
    ctx.fillText("大别山生态密码 — 互动科普H5", width / 2, height - 20);

    // 下载图片
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "大别山生态守护者证书_" + grade + ".png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("📷 证书已保存！");
    }, "image/png");
  } catch (err) {
    console.error("Save certificate failed:", err);
    showToast("📋 长按证书卡片可截图保存");
  }
}

function gradeEmoji(grade) {
  if (grade.includes("钻石")) return "💎";
  if (grade.includes("黄金")) return "🥇";
  if (grade.includes("白银")) return "🥈";
  return "🥉";
}

// Canvas 绘制分享海报
function generateSharePoster(grade, score) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 2;
  const W = 750, H = 1000;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.scale(dpr, dpr);

  // 背景渐变
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#ECFDF5");
  bg.addColorStop(0.5, "#D1FAE5");
  bg.addColorStop(1, "#A7F3D0");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // 顶部装饰条
  ctx.fillStyle = "#059669";
  ctx.fillRect(0, 0, W, 8);

  // 标题
  ctx.textAlign = "center";
  ctx.font = "bold 36px 'PingFang SC', 'Microsoft YaHei', sans-serif";
  ctx.fillStyle = "#064E3B";
  ctx.fillText("🌲 大别山生态密码 🌲", W / 2, 80);

  ctx.font = "18px 'PingFang SC', 'Microsoft YaHei', sans-serif";
  ctx.fillStyle = "#047857";
  ctx.fillText("互动科普 H5 · 生态守护者证书", W / 2, 115);

  // 等级标签
  const gradeColors = {
    "钻石守护者": ["#8b5cf6", "#6366f1"],
    "黄金守护者": ["#f59e0b", "#dc2626"],
    "白银守护者": ["#94a3b8", "#64748b"],
    "青铜守护者": ["#d97706", "#92400e"]
  };
  const gColors = gradeColors[grade] || ["#94a3b8", "#64748b"];
  const grd = ctx.createLinearGradient(W / 2 - 120, 0, W / 2 + 120, 0);
  grd.addColorStop(0, gColors[0]);
  grd.addColorStop(1, gColors[1]);
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.roundRect(W / 2 - 120, 145, 240, 50, 25);
  ctx.fill();
  ctx.font = "bold 22px 'PingFang SC', 'Microsoft YaHei', sans-serif";
  ctx.fillStyle = "#fff";
  ctx.fillText(gradeEmoji(grade) + " " + grade, W / 2, 177);

  // 数据区域
  const dataY = 260;
  const dataItems = [
    { label: "生态值", value: String(score), x: W / 4 },
    { label: "正确率", value: Math.round(score / (scenarios.length * 10) * 100) + "%", x: W / 2 },
    { label: "正确选择", value: (score > 0 ? Math.round(score / 10) : 0) + "/" + scenarios.length, x: W * 3 / 4 }
  ];
  dataItems.forEach(item => {
    ctx.font = "bold 32px 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillStyle = "#059669";
    ctx.fillText(item.value, item.x, dataY);
    ctx.font = "14px 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillStyle = "#6B7280";
    ctx.fillText(item.label, item.x, dataY + 24);
  });

  // 分隔线
  ctx.strokeStyle = "rgba(5,150,105,0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 310);
  ctx.lineTo(W - 60, 310);
  ctx.stroke();

  // 描述文字
  ctx.font = "16px 'PingFang SC', 'Microsoft YaHei', sans-serif";
  ctx.fillStyle = "#374151";
  ctx.textAlign = "center";
  const desc = "我在「大别山生态密码」中完成了生态守护挑战，";
  const desc2 = "获得了" + grade + "称号！";
  ctx.fillText(desc, W / 2, 350);
  ctx.fillText(desc2, W / 2, 375);

  // 底部大别山轮廓线（贝塞尔曲线）
  ctx.beginPath();
  ctx.moveTo(0, H - 120);
  ctx.bezierCurveTo(W * 0.15, H - 200, W * 0.25, H - 160, W * 0.35, H - 180);
  ctx.bezierCurveTo(W * 0.45, H - 200, W * 0.55, H - 150, W * 0.65, H - 170);
  ctx.bezierCurveTo(W * 0.75, H - 190, W * 0.85, H - 140, W, H - 160);
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fillStyle = "#059669";
  ctx.fill();

  // 山脉上的小树
  const treePositions = [
    [W * 0.2, H - 185], [W * 0.4, H - 175], [W * 0.6, H - 165], [W * 0.8, H - 170]
  ];
  treePositions.forEach(([tx, ty]) => {
    ctx.fillStyle = "#2d5a1e";
    ctx.beginPath();
    ctx.moveTo(tx, ty - 30);
    ctx.lineTo(tx - 12, ty);
    ctx.lineTo(tx + 12, ty);
    ctx.closePath();
    ctx.fill();
  });

  // 底部文字
  ctx.font = "13px 'PingFang SC', 'Microsoft YaHei', sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillText("大别山生态密码 · 互动科普H5", W / 2, H - 40);

  // 右下角二维码占位区
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.roundRect(W - 110, H - 110, 80, 80, 12);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.font = "11px 'PingFang SC', 'Microsoft YaHei', sans-serif";
  ctx.fillStyle = "#9CA3AF";
  ctx.textAlign = "center";
  ctx.fillText("扫码体验", W - 70, H - 75);

  return canvas;
}

// 分享证书
function shareCertificate(grade, score) {
  const canvas = generateSharePoster(grade, score);
  canvas.toBlob(function(blob) {
    if (navigator.share && navigator.canShare) {
      const file = new File([blob], "大别山生态守护者证书.png", { type: "image/png" });
      const shareData = {
        title: "大别山生态密码",
        text: "我获得了「" + grade + "」称号！生态值得分 " + score + " 分。来挑战一下吧！",
        files: [file]
      };
      if (navigator.canShare(shareData)) {
        navigator.share(shareData).catch(function() {
          downloadPoster(canvas, grade);
        });
      } else {
        downloadPoster(canvas, grade);
      }
    } else {
      downloadPoster(canvas, grade);
    }
  }, "image/png");
}

function downloadPoster(canvas, grade) {
  canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "大别山生态守护者证书_" + grade + ".png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("📷 证书海报已保存！");
  }, "image/png");
}

// 重新开始
function restartApp() {
  try {
    sessionStorage.removeItem("dabie-ecoScore");
    sessionStorage.removeItem("dabie-choices");
    sessionStorage.removeItem("dabie-unlocked");
    sessionStorage.removeItem("dabie-crisisScenario");
    sessionStorage.removeItem("dabie-scenarioCount");
  } catch (e) {}
  location.reload();
}

function showToast(message) {
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  gsap.fromTo(toast, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
  gsap.to(toast, { opacity: 0, y: -10, duration: 0.3, delay: 2.5, onComplete: function() { toast.remove(); } });
}

function spawnParticles(container) {
  const emojis = ["✨", "🌟", "🍃", "🦋", "💫", "🌸", "🌿", "⭐"];
  const page = container.querySelector("#certificate-page");
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = -20 + "px";
      particle.style.fontSize = (16 + Math.random() * 16) + "px";
      page.appendChild(particle);
      gsap.to(particle, {
        y: window.innerHeight + 50,
        x: (Math.random() - 0.5) * 120,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: 2.5 + Math.random() * 2.5,
        ease: "power1.in",
        onComplete: () => particle.remove()
      });
    }, i * 80);
  }
}

export function destroy() {
  stopAmbience();
  hideGuide();
  gsap.killTweensOf(".particle");
  document.querySelectorAll(".particle").forEach(function(p) { p.remove(); });
}
