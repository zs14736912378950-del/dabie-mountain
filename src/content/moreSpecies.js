// 更多大别山物种数据（新增 15 个物种）
// 图片使用本地素材或 SVG 插图

export const moreSpecies = [
  // ===== 植物 =====
  {
    id: "tianinv", name: "天女花",
    image: "images/species/tianinv.jpg", scientific: "Magnolia sieboldii",
    category: "植物", role: "生产者", trophic: 1,
    emoji: "🌺",
    description: "天女花是大别山珍稀的落叶乔木，花朵洁白如玉，芳香四溢。每年五六月开花时，满树白花如天女散花般飘落，因此得名。它是第四纪冰川遗留下来的古老物种，被誉为'植物界的活化石'。",
    funFact: "天女花的花朵在夜间会闭合，清晨重新绽放，仿佛在睡觉！这种现象叫'睡眠运动'。",
    protection: "国家二级保护植物"
  },
  {
    id: "maozhu", name: "毛竹", scientific: "Phyllostachys edulis",
    category: "植物", role: "生产者", trophic: 1,
    emoji: "🎋",
    description: "毛竹是大别山最常见的竹类，生长速度极快，最快一天能长近1米！竹林是许多动物的家园，大熊猫的食物来源之一就是竹子。毛竹的根系发达，能有效防止水土流失。",
    funFact: "毛竹的竹笋从破土到长成成竹只需45天，是世界上生长最快的植物之一！",
    protection: "常见物种"
  },
  {
    id: "lingzhi", name: "灵芝",
    image: "images/species/lingzhi.jpg", scientific: "Ganoderma lucidum",
    category: "真菌", role: "分解者", trophic: 5,
    emoji: "🍄",
    description: "灵芝是大别山森林中的珍贵真菌，寄生在枯死的树木上，帮助分解有机物，将养分回归土壤。在中国传统文化中，灵芝被视为'仙草'，有延年益寿的传说。",
    funFact: "灵芝孢子粉的直径只有5-8微米，比头发丝还细20倍！一个灵芝能释放数十亿个孢子。",
    protection: "药用真菌"
  },
  {
    id: "shuijia", name: "中华水韭", scientific: "Isoetes sinensis",
    category: "植物", role: "生产者", trophic: 1,
    emoji: "🌾",
    description: "中华水韭是极其珍稀的水生蕨类植物，被称为'植物界的大熊猫'。它只生长在清澈的浅水湿地中，对水质要求极高，是水质的'指示物种'——有水韭的地方，说明水质非常好。",
    funFact: "中华水韭已经在地球上生存了3亿多年，比恐龙还要古老！它是真正的'活化石'。",
    protection: "国家一级保护植物"
  },

  // ===== 鸟类 =====
  {
    id: "huamei", name: "画眉",
    image: "images/species/huamei.jpg", scientific: "Garrulax canorus",
    category: "鸟类", role: "初级消费者", trophic: 2,
    emoji: "🦜",
    description: "画眉是大别山最常见的鸣禽之一，歌声婉转动听，被誉为'林中歌手'。雄画眉的歌声可以持续数分钟不重复，清晨和傍晚是它们最活跃的歌唱时间。",
    funFact: "画眉鸟眼睛周围有一圈白色的羽毛，像画了眉毛一样，因此得名'画眉'。",
    protection: "安徽省重点保护鸟类"
  },
  {
    id: "bailu", name: "白鹭",
    image: "images/species/bailu.jpg", scientific: "Egretta garzetta",
    category: "鸟类", role: "次级消费者", trophic: 3,
    emoji: "🦆",
    description: "白鹭是大别山溪流和湿地的常客，全身雪白，体态优雅。它们用长长的嘴在浅水中捕鱼，动作敏捷而优美。白鹭对水质要求很高，是生态环境良好的指示物种。",
    funFact: "白鹭的羽毛在繁殖季节会长出细长的饰羽，像穿着婚纱一样美丽！",
    protection: "国家二级保护鸟类"
  },
  {
    id: "hongjue", name: "红角鸮", scientific: "Otus sunia",
    category: "鸟类", role: "次级消费者", trophic: 3,
    emoji: "🦉",
    description: "红角鸮是大别山的夜行性猛禽，白天躲在树洞中休息，夜晚出来捕食昆虫和小型鼠类。它们的叫声像'咕咕'声，在寂静的夜晚格外清晰。",
    funFact: "猫头鹰可以转头270度！因为它们的眼睛不能转动，只能靠转头来观察周围。",
    protection: "国家二级保护鸟类"
  },
  {
    id: "baset", name: "八色鸫", scientific: "Pitta nympha",
    category: "鸟类", role: "初级消费者", trophic: 2,
    emoji: "🐦",
    description: "八色鸫是大别山最美丽的鸟类之一，羽毛有八种颜色，被称为'鸟中彩虹'。它们性格隐秘，喜欢在地面落叶中翻找昆虫，很难被发现。",
    funFact: "八色鸫虽然色彩艳丽，但因为生活在密林底层，很少有人能亲眼看到它！",
    protection: "国家二级保护鸟类"
  },

  // ===== 兽类 =====
  {
    id: "shebao", name: "豺", scientific: "Cuon alpinus",
    category: "哺乳类", role: "顶级消费者", trophic: 4,
    emoji: "🦊",
    description: "豺是大别山曾经的顶级捕食者，群体协作捕猎能力极强。它们体型比狼小，但团队配合默契，能捕获比自己大数倍的猎物。近年来由于栖息地减少，野生豺已极为罕见。",
    funFact: "豺的团队捕猎成功率高达60%以上，远超狮子和老虎的单打独斗！",
    protection: "国家二级保护动物"
  },
  {
    id: "mihou", name: "猕猴",
    image: "images/species/mihou.jpg", scientific: "Macaca mulatta",
    category: "哺乳类", role: "杂食者", trophic: 2,
    emoji: "🐒",
    description: "猕猴是大别山最常见的灵长类动物，聪明活泼，社会性强。它们以果实、嫩叶、昆虫为食，有时也会到农田'偷吃'庄稼，与人类有一定的冲突。",
    funFact: "猕猴有复杂的社群等级，猴王拥有优先选择食物和配偶的权利！",
    protection: "国家二级保护动物"
  },
  {
    id: "huanaohu", name: "华南虎", scientific: "Panthera tigris amoyensis",
    category: "哺乳类", role: "顶级消费者", trophic: 4,
    emoji: "🐆",
    description: "华南虎曾是大别山的顶级掠食者，但现在已经野外灭绝。大别山是华南虎的历史分布区，20世纪中期还有目击记录。如今只能在动物园中看到它们的身影。",
    funFact: "华南虎是中国特有的虎亚种，也被称为'中国虎'，是所有老虎的祖先类型！",
    protection: "国家一级保护动物（野外灭绝）"
  },

  // ===== 昆虫 =====
  {
    id: "buqia", name: "步甲", scientific: "Carabus spp.",
    category: "昆虫", role: "次级消费者", trophic: 3,
    emoji: "🪲",
    description: "步甲是大别山地表最常见的捕食性昆虫，专门捕食蜗牛、鼻涕虫和其他小虫子。它们是天然的'害虫克星'，在控制农业害虫方面功不可没。",
    funFact: "步甲的奔跑速度相对于体型是昆虫中最快的之一，相当于人类以每小时300公里的速度奔跑！",
    protection: "益虫"
  },
  {
    id: "fangzhi", name: "纺织娘", scientific: "Mecopoda elongata",
    category: "昆虫", role: "初级消费者", trophic: 2,
    emoji: "🦗",
    description: "纺织娘是大别山夏秋季节最常见的鸣虫，叫声像织布机的声音，因此得名。雄性纺织娘通过摩擦翅膀发出响亮的鸣叫来吸引雌性。",
    funFact: "纺织娘的叫声可以达到70分贝，相当于一台吸音器的音量！",
    protection: "常见昆虫"
  },
  {
    id: "zhonghua_mifeng", name: "中华蜜蜂",
    image: "images/species/zhonghua_mifeng.jpg", scientific: "Apis cerana",
    category: "昆虫", role: "传粉者", trophic: 2,
    emoji: "🐝",
    description: "中华蜜蜂是中国本土的蜜蜂品种，适应能力强，善于利用零星蜜源。它们是大别山植物传粉的重要媒介，没有蜜蜂，很多植物将无法结果。",
    funFact: "中华蜜蜂能采集温度低至3°C的花蜜，比意大利蜜蜂更耐寒！",
    protection: "国家二级保护动物"
  },

  // ===== 爬行类 =====
  {
    id: "chilianshe", name: "赤链蛇",
    image: "images/species/chilianshe.jpg", scientific: "Lycodon rufozonatus",
    category: "爬行类", role: "次级消费者", trophic: 3,
    emoji: "🐍",
    description: "赤链蛇是大别山常见的蛇类之一，身体上有红色的环状花纹。它们主要在夜间活动，捕食蛙类、蜥蜴和小型哺乳动物，是生态系统中重要的捕食者。",
    funFact: "赤链蛇属于后沟牙毒蛇，毒性较弱，对人一般不构成严重威胁。红色花纹是一种'警告色'，让天敌不敢靠近。",
    protection: "常见物种"
  },
  {
    id: "wupi_bihu", name: "无蹼壁虎", scientific: "Gekko swinhonis",
    category: "爬行类", role: "次级消费者", trophic: 3,
    emoji: "🦎",
    description: "无蹼壁虎是大别山最常见的爬行动物，经常出现在房屋墙壁上捕食蚊虫。它们的脚趾上有微小的吸盘，能在光滑的墙面上自由行走。",
    funFact: "壁虎的脚趾上有数百万根纳米级的刚毛，利用分子间的范德华力吸附在墙面上！",
    protection: "常见物种"
  }
];

// 探索页使用的额外物种（可选添加）
export const extraHotspotSpecies = moreSpecies.filter(s =>
  ["tianinv", "lingzhi", "huamei", "bailu", "mihou", "zhonghua_mifeng", "chilianshe"].includes(s.id)
);
