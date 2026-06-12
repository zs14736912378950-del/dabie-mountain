// 大别山生态密码 — 主入口
import "./style.css";
import { registerPage, navigateTo, createProgressBar } from "./utils/navigation.js";
import { initAudio } from "./utils/audio.js";
import * as home from "./pages/home.js";
import * as explore from "./pages/explore.js";
import * as puzzle from "./pages/puzzle.js";
import * as crisis from "./pages/crisis.js";
import * as certificate from "./pages/certificate.js";
import * as geography from "./pages/geography.js";

// 注册所有页面
registerPage("home", home);
registerPage("explore", explore);
registerPage("puzzle", puzzle);
registerPage("crisis", crisis);
registerPage("certificate", certificate);
registerPage("geography", geography);

// 创建底部进度条
document.body.appendChild(createProgressBar());

// 解析 URL hash 决定初始页面
const hash = window.location.hash.replace("#", "");
const validPages = ["home", "explore", "puzzle", "crisis", "certificate", "geography"];
const initialPage = validPages.includes(hash) ? hash : "home";

// 启动应用
navigateTo(initialPage, true);

// 全局点击初始化音频
document.addEventListener("click", () => initAudio(), { once: true });
document.addEventListener("touchstart", () => initAudio(), { once: true });
