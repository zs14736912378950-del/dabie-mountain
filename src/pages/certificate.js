// 第四章：守护者证书 — 精美SVG版
import gsap from "gsap";
import { navigateTo } from "../utils/navigation.js";
import { playClick, playCelebration, playCertificateBGM, stopAmbience } from "../utils/audio.js";
import { showGuide, hideGuide } from "../components/guideBoy.js";
import { scenarios } from "../data/scenarios.js";

// 评分标准：满分基于场景数量（每个场景约10分）
const TOTAL_SCENARIOS = scenarios.length;
const MAX_SCORE = TOTAL_SCENARIOS * 10;

export function init(container) {
  let ecoScore = 0;
  let choicesMade = [];
  try {
    ecoScore = parseInt(sessionStorage.getItem("dabie-ecoScore")) || 0;
    choicesMade = JSON.parse(sessionStorage.getItem("dabie-choices")) || [];
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
          <div style="margin-top:12px;display:flex;gap:8px;justify-content:center;">
            <button class="btn btn-primary btn-small" id="cert-restart" aria-label="重新探索大别山生态">🔄 再来一次</button>
            <button class="btn btn-outline btn-small" id="cert-share" aria-label="分享我的生态守护者证书">📤 分享证书</button>
          </div>
        </div>
      </div>
    </div>
  `;

  playCelebration();
  playCertificateBGM();

  const card = container.querySelector("#certificate-card");
  gsap.from(card, { y: 100, rotationX: 15, opacity: 0, duration: 1, ease: "back.out(1.2)" });

  spawnParticles(container);

  // 小男孩引导
  showGuide("certificate", container, {
    share: function() {
      playClick();
      var shareData = {
        title: "大别山生态密码",
        text: "我获得了「" + grade + "」称号！生态值得分 " + ecoScore + " 分。来挑战一下吧！",
        url: window.location.href.split("#")[0]
      };
      if (navigator.share) {
        navigator.share(shareData).catch(function() {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.text + " " + shareData.url).then(function() {
          showToast(container, "📋 已复制分享内容到剪贴板");
        });
      }
    },
    restart: function() {
      playClick();
      hideGuide();
      try {
        sessionStorage.removeItem("dabie-ecoScore");
        sessionStorage.removeItem("dabie-choices");
        sessionStorage.removeItem("dabie-unlocked");
        sessionStorage.removeItem("dabie-crisisScenario");
        sessionStorage.removeItem("dabie-scenarioCount");
      } catch (e) {}
      location.reload();
    }
  });

  container.querySelector("#cert-restart").addEventListener("click", () => {
    playClick();
    hideGuide();
    // 重置所有进度
    try {
      sessionStorage.removeItem("dabie-ecoScore");
      sessionStorage.removeItem("dabie-choices");
      sessionStorage.removeItem("dabie-unlocked");
      sessionStorage.removeItem("dabie-crisisScenario");
      sessionStorage.removeItem("dabie-scenarioCount");
    } catch (e) {}
    // 重置导航模块的解锁状态
    location.reload();
  });

  // 分享按钮
  container.querySelector("#cert-share").addEventListener("click", () => {
    playClick();
    var shareData = {
      title: "大别山生态密码",
      text: "我获得了「" + grade + "」称号！生态值得分 " + ecoScore + " 分。来挑战一下吧！",
      url: window.location.href.split("#")[0]
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else if (navigator.clipboard) {
      var text = shareData.text + " " + shareData.url;
      navigator.clipboard.writeText(text).then(() => {
        showToast(container, "📋 已复制分享内容到剪贴板");
      }).catch(() => {
        showToast(container, "📋 分享内容：" + shareData.text);
      });
    } else {
      showToast(container, "📋 分享内容：" + shareData.text);
    }
  });
}

function showToast(container, message) {
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
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
