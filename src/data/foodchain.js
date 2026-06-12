// 食物链拼图卡片数据 — 扩展版（7格食物链）
// 完整链条：阳光 → 生产者 → 初级消费者 → 次级消费者 → 顶级消费者 → 分解者 → 土壤养分
// 企鹅、恐龙、鲨鱼为干扰项

export const foodChainCards = [
  // 能量来源
  { id: "sun", name: "阳光", trophic: 0, role: "能量来源", emoji: "☀️", isDistractor: false },

  // 生产者（植物）
  { id: "pine", name: "松针", trophic: 1, role: "生产者", emoji: "🌲", isDistractor: false },
  { id: "grass", name: "草本植物", trophic: 1, role: "生产者", emoji: "🌿", isDistractor: false },
  { id: "berry", name: "浆果", trophic: 1, role: "生产者", emoji: "🫐", isDistractor: false },
  { id: "flower", name: "杜鹃花", trophic: 1, role: "生产者", emoji: "🌸", isDistractor: false },

  // 初级消费者（植食动物）
  { id: "rabbit", name: "野兔", trophic: 2, role: "初级消费者", emoji: "🐰", isDistractor: false },
  { id: "squirrel", name: "松鼠", trophic: 2, role: "初级消费者", emoji: "🐿️", isDistractor: false },
  { id: "pheasant", name: "白冠长尾雉", trophic: 2, role: "初级消费者", emoji: "🐦", isDistractor: false },
  { id: "mouse", name: "田鼠", trophic: 2, role: "初级消费者", emoji: "🐭", isDistractor: false },
  { id: "butterfly", name: "中华虎凤蝶", trophic: 2, role: "初级消费者", emoji: "🦋", isDistractor: false },

  // 次级消费者（小型肉食动物）
  { id: "snake", name: "赤链蛇", trophic: 3, role: "次级消费者", emoji: "🐍", isDistractor: false },
  { id: "owl", name: "红角鸮", trophic: 3, role: "次级消费者", emoji: "🦉", isDistractor: false },
  { id: "pangolin", name: "中华穿山甲", trophic: 3, role: "次级消费者", emoji: "🦔", isDistractor: false },

  // 顶级消费者
  { id: "eagle", name: "金雕", trophic: 4, role: "顶级消费者", emoji: "🦅", isDistractor: false },
  { id: "goldencat", name: "亚洲金猫", trophic: 4, role: "顶级消费者", emoji: "🐱", isDistractor: false },

  // 分解者
  { id: "mushroom", name: "蘑菇", trophic: 5, role: "分解者", emoji: "🍄", isDistractor: false },

  // 土壤养分（循环）
  { id: "soil", name: "土壤养分", trophic: 6, role: "养分回归", emoji: "🪨", isDistractor: false },

  // 干扰项（不属于大别山生态系统）
  { id: "penguin", name: "企鹅", trophic: null, role: "干扰项", emoji: "🐧", isDistractor: true },
  { id: "dinosaur", name: "恐龙", trophic: null, role: "干扰项", emoji: "🦕", isDistractor: true },
  { id: "shark", name: "鲨鱼", trophic: null, role: "干扰项", emoji: "🦈", isDistractor: true }
];

// 正确食物链序列（验证用）
// 7格完整食物链：阳光 → 生产者 → 初级消费者 → 次级消费者 → 顶级消费者 → 分解者 → 土壤养分
export const correctChain = {
  0: ["sun"],                                          // 能量来源
  1: ["pine", "grass", "berry", "flower"],             // 生产者
  2: ["rabbit", "squirrel", "pheasant", "mouse", "butterfly"], // 初级消费者
  3: ["snake", "owl", "pangolin"],                     // 次级消费者
  4: ["eagle", "goldencat"],                           // 顶级消费者
  5: ["mushroom"],                                     // 分解者
  6: ["soil"]                                          // 养分回归
};

// 每个槽位的标签（用于显示）
export const slotLabels = [
  "☀️ 能量来源",
  "🌱 生产者",
  "🐰 初级消费者",
  "🐍 次级消费者",
  "🦅 顶级消费者",
  "🍄 分解者",
  "🪨 养分回归"
];
