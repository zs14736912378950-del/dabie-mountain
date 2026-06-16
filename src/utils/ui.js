// UI 工具函数

import gsap from "gsap";

/**
 * 在页面顶部显示横幅式 toast
 * @param {string} message - 提示文案
 * @param {object} [opts] - 可选配置
 * @param {number} [opts.duration=3000] - 显示时长（ms）
 */
export function showBannerToast(message, opts = {}) {
  const { duration = 3000 } = opts;
  // 清理旧 banner
  document.querySelectorAll(".explore-toast").forEach(t => t.remove());

  const toast = document.createElement("div");
  toast.className = "explore-toast";
  toast.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:9999;pointer-events:none;";
  toast.innerHTML = `<div style="background:linear-gradient(135deg,#059669,#10B981);color:#fff;padding:14px 20px;font-size:15px;font-weight:700;text-align:center;box-shadow:0 4px 20px rgba(5,150,105,0.3);">${message}</div>`;
  document.body.appendChild(toast);
  gsap.fromTo(toast.querySelector("div"), { y: -60 }, { y: 0, duration: 0.4, ease: "back.out(1.2)" });
  gsap.to(toast.querySelector("div"), { y: -60, duration: 0.3, delay: duration / 1000, ease: "power2.in", onComplete: () => toast.remove() });
}
