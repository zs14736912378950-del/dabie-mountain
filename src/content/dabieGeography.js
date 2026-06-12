// 大别山地理科普数据

export const dabieGeography = {
  name: "大别山",
  location: "中国中部，横跨安徽、湖北、河南三省",
  coordinates: "北纬30°10'—32°30'，东经113°00'—116°40'",

  // 地理概况
  overview: "大别山是长江与淮河的分水岭，也是中国南北气候的过渡地带。这里独特的地理位置造就了丰富的生物多样性，是全球34个生物多样性热点地区之一。",

  // 地形数据
  terrain: {
    area: "约24000平方公里",
    highestPeak: "白马尖（安徽霍山县），海拔1777米",
    averageElevation: "500-1000米",
    features: "中山、低山、丘陵、盆地相间分布"
  },

  // 气候特点
  climate: {
    type: "亚热带季风气候",
    temperature: "年均气温15-16°C",
    rainfall: "年降水量1200-1600毫米",
    features: "四季分明，雨量充沛，光照充足"
  },

  // 生态地位
  ecologicalStatus: [
    "中国南北气候过渡带",
    "长江中下游重要水源涵养区",
    "全球生物多样性热点地区",
    "中国32个生物多样性保护优先区域之一",
    "安徽省最大的天然林区"
  ],

  // 保护区
  protectedAreas: [
    { name: "天马国家级自然保护区", area: "28914公顷", year: 2003 },
    { name: "鹞落坪国家级自然保护区", area: "12300公顷", year: 1991 },
    { name: "佛子岭省级自然保护区", area: "25000公顷", year: 2000 },
    { name: "万佛山省级森林公园", area: "20000公顷", year: 2001 }
  ],

  // 生物多样性数据
  biodiversity: {
    plants: "3000+种",
    birds: "400+种",
    mammals: "100+种",
    amphibians: "40+种",
    insects: "3000+种",
    nationalProtected: "60+种"
  },

  // 历史文化
  history: [
    "大别山是红军时期的重要革命根据地",
    "鄂豫皖苏区首府位于大别山腹地",
    "大别山精神是中国革命精神的重要组成部分"
  ],

  // 保护意义
  conservationImportance: [
    "维护长江中下游生态安全",
    "保护珍稀濒危物种栖息地",
    "涵养水源，防止水土流失",
    "调节区域气候，净化空气",
    "提供生态旅游和科研价值"
  ]
};

// 大别山四季变化
export const seasons = [
  {
    name: "春季",
    emoji: "🌸",
    months: "3-5月",
    features: "杜鹃花盛开，万物复苏",
    species: "杜鹃花、画眉、猕猴活跃",
    color: "#FFB7C5"
  },
  {
    name: "夏季",
    emoji: "🌿",
    months: "6-8月",
    features: "绿树成荫，溪水潺潺",
    species: "大鲵、穿山甲、蝴蝶活跃",
    color: "#81C784"
  },
  {
    name: "秋季",
    emoji: "🍂",
    months: "9-11月",
    features: "层林尽染，果实累累",
    species: "红腹锦鸡、白冠长尾雉觅食",
    color: "#FFB74D"
  },
  {
    name: "冬季",
    emoji: "❄️",
    months: "12-2月",
    features: "银装素裹，宁静安详",
    species: "原麝、红角鸮、赤链蛇冬眠",
    color: "#B0BEC5"
  }
];
