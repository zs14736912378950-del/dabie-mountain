// 图片占位与加载工具
// 图片加载成功则显示真实图片，失败则显示 CSS 渐变色块占位

// 在线免费图片服务配置
const ONLINE_IMAGE_SERVICES = {
  // Unsplash Source - 免费高质量图片
  unsplash: (keyword, width = 400, height = 400) =>
    `https://source.unsplash.com/featured/${width}x${height}/?${keyword}`,
  // Lorem Picsum - 随机图片
  picsum: (width = 400, height = 400) =>
    `https://picsum.photos/${width}/${height}`,
  // Lorem Picsum 指定ID
  picsumById: (id, width = 400, height = 400) =>
    `https://picsum.photos/id/${id}/${width}/${height}`
};

// 物种对应的关键词映射
const SPECIES_KEYWORDS = {
  '黄山松': 'pine,tree,mountain',
  '大别山杜鹃': 'rhododendron,flower,pink',
  '银杏': 'ginkgo,autumn,yellow',
  '白冠长尾雉': 'pheasant,bird,wildlife',
  '金雕': 'golden,eagle,bird',
  '大别山原麝': 'deer,forest,wildlife',
  '中华穿山甲': 'pangolin,scales,animal',
  '中华虎凤蝶': 'butterfly,wings,insect',
  '森林': 'forest,trees,green',
  '山脉': 'mountains,landscape',
  '河流': 'river,water,stream'
};

/**
 * 根据关键词获取在线图片URL
 * @param {string} keyword - 搜索关键词
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @returns {string} 图片URL
 */
export function getOnlineImage(keyword, width = 400, height = 400) {
  const searchKeyword = SPECIES_KEYWORDS[keyword] || keyword;
  return ONLINE_IMAGE_SERVICES.unsplash(searchKeyword, width, height);
}

/**
 * 尝试加载图片，成功返回 URL，失败返回 null
 */
export function getImage(path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(path);
    img.onerror = () => resolve(null);
    img.src = path;
  });
}

/**
 * 创建一个占位 DOM 元素（色块 + 物种名）
 * @param {string} name - 物种名/标签
 * @param {string} emoji - emoji图标
 * @param {number} width - 宽度（px）
 * @param {number} height - 高度（px）
 * @returns {HTMLElement}
 */
export function createPlaceholder(name, emoji = "", width = 200, height = 200) {
  const el = document.createElement("div");
  el.className = "image-placeholder";
  el.style.width = typeof width === "number" ? width + "px" : width;
  el.style.height = typeof height === "number" ? height + "px" : height;

  // 渐变色块：用 name 的 hash 生成颜色
  const hue = hashCode(name) % 360;
  el.style.background = `linear-gradient(135deg, hsl(${hue}, 40%, 70%), hsl(${hue + 30}, 50%, 50%))`;

  if (emoji) {
    const span = document.createElement("span");
    span.className = "placeholder-emoji";
    span.textContent = emoji;
    el.appendChild(span);
  }

  const label = document.createElement("span");
  label.className = "placeholder-label";
  label.textContent = name;
  el.appendChild(label);

  return el;
}

/**
 * 为容器设置图片背景，带占位回退
 * @param {HTMLElement} container - 容器元素
 * @param {string} imagePath - 图片路径
 * @param {string} fallbackGradient - CSS 渐变回退
 */
export async function setBgWithFallback(container, imagePath, fallbackGradient) {
  container.style.background = fallbackGradient;
  const loaded = await getImage(imagePath);
  if (loaded) {
    container.style.backgroundImage = `url(${loaded})`;
    container.style.backgroundSize = "cover";
    container.style.backgroundPosition = "center";
  }
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
