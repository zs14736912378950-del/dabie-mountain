// 小男孩引导角色 — 每个页面左下角的交互引导
import gsap from "gsap";

// Q版小林 emoji 形象
const boySVG = `<div style="font-size:56px;line-height:1;">🧑‍🌾</div>`;

// 各页面的引导内容
const guideMessages = {
  home: {
    text: "嗨！我是小林，大别山生态守护者！\n准备好开始探险了吗？",
    buttons: [
      { text: "🌲 开始探索", action: "start" }
    ]
  },
  explore: {
    text: "拖动屏幕左右滑动，\n点击闪烁的热点发现物种吧！",
    buttons: [
      { text: "🔍 我知道了", action: "dismiss" }
    ]
  },
  puzzle: {
    text: "把正确的物种拖到对应营养级，\n拼出一条完整食物链！",
    buttons: [
      { text: "💡 提示：先找生产者", action: "hint" }
    ]
  },
  crisis: {
    text: "每个选择都会影响生态值，\n慎重考虑哦！",
    buttons: [
      { text: "🛡️ 我会守护生态！", action: "dismiss" }
    ]
  },
  crisis_congrats: {
    text: "你真的很懂这片森林！\n连续答对太厉害了！",
    buttons: [
      { text: "继续加油！", action: "dismiss" }
    ]
  },
  crisis_bronze: {
    text: "虽然有些选择不够理想，但每一个愿意了解生态的人，都是守护者。\n继续学习，下次一定会更好！",
    buttons: [
      { text: "🏆 查看我的证书", action: "continue" }
    ]
  },
  certificate: {
    text: "恭喜你完成探险！\n分享你的证书给朋友吧～",
    buttons: [
      { text: "📤 分享证书", action: "share" },
      { text: "🔄 再来一次", action: "restart" }
    ]
  },
  geography: {
    text: "这里是大别山的生态知识，\n了解这片神奇的土地！",
    buttons: [
      { text: "📖 我知道了", action: "dismiss" }
    ]
  },
  quiz: {
    text: "来测试一下你学到的生态知识吧！\n每道题10分，加油！",
    buttons: [
      { text: "💡 提示", action: "hint" },
      { text: "📝 开始答题", action: "dismiss" }
    ]
  }
};

let _guideEl = null;
let _bubbleEl = null;

export function showGuide(pageId, container, callbacks) {
  hideGuide();

  var msg = guideMessages[pageId];
  if (!msg) return;

  // 特殊处理：crisis_bronze 使用 crisis 的样式但自定义文本
  if (pageId === "crisis_bronze") {
    msg = guideMessages.crisis_bronze;
  }

  // 创建容器
  _guideEl = document.createElement("div");
  _guideEl.className = "guide-boy";
  _guideEl.innerHTML = ''
    + '<div class="guide-boy-avatar">' + boySVG + '</div>'
    + '<div class="guide-bubble">'
    +   '<div class="guide-bubble-arrow"></div>'
    +   '<div class="guide-bubble-text">' + msg.text.replace(/\n/g, '<br>') + '</div>'
    +   '<div class="guide-bubble-actions">'
    +     msg.buttons.map(function(btn) {
    return '<button class="guide-btn" data-action="' + btn.action + '">' + btn.text + '</button>';
    }).join('')
    +   '</div>'
    + '</div>';

  container.appendChild(_guideEl);
  _bubbleEl = _guideEl.querySelector(".guide-bubble");

  // 绑定按钮事件
  _guideEl.querySelectorAll(".guide-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var action = btn.dataset.action;
      if (callbacks && callbacks[action]) callbacks[action]();
      if (action === "dismiss" || action === "continue") hideGuide();
    });
  });

  // 入场动画
  gsap.from(_guideEl, { x: -80, opacity: 0, duration: 0.5, delay: 0.8, ease: "back.out(1.4)" });
  // 小男孩呼吸动画
  gsap.to(_guideEl.querySelector(".guide-boy-avatar"), {
    y: -3, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.3
  });
}

export function hideGuide() {
  if (_guideEl) {
    _guideEl.remove();
    _guideEl = null;
    _bubbleEl = null;
  }
}
