// 大别山 11 个代表物种数据
// 图片使用本地素材（双百素材），科普真实物种照片
export const species = [
  {
    id: "pinus", name: "黄山松", scientific: "Pinus taiwanensis",
    image: "images/species/pinus.jpg",
    category: "植物", role: "生产者", trophic: 1,
    description: "黄山松是大别山的标志性树种，它们的根系能牢牢抓住岩石薄土，在悬崖峭壁上也能顽强生长。每一棵黄山松都是森林生态系统的基石，通过光合作用把阳光变成生命的能量。",
    funFact: "黄山松的松果需要两年才能成熟，而且高温（如森林火灾）反而能帮助松果开裂释放种子！",
    protection: "安徽省重点保护树种",
    emoji: "🌲"
  },
  {
    id: "rhododendron", name: "大别山杜鹃", scientific: "Rhododendron anhuiense",
    image: "images/species/rhododendron.jpg",
    category: "植物", role: "生产者", trophic: 1,
    description: "每年四五月，大别山的山坡会被杜鹃花染成粉色海洋。大别山杜鹃是当地特有物种，只生长在海拔800米以上的山区，是春天山里最美的风景线。",
    funFact: "杜鹃花虽然美丽，但它的花蜜对很多昆虫来说是有毒的——这是它保护自己的独特策略！",
    protection: "安徽省重点保护植物",
    emoji: "🌸"
  },
  {
    id: "ginkgo", name: "银杏", scientific: "Ginkgo biloba",
    image: "images/species/ginkgo.jpg",
    category: "植物", role: "生产者", trophic: 1,
    description: "银杏被称为植物界的'活化石'，已经在地球上生存了2亿多年。大别山区有大量野生银杏群落，秋天满山金黄的银杏叶是大别山最动人的秋色。",
    funFact: "银杏树分'男生'和'女生'！只有雌树才会结银杏果，而且一棵银杏可以活上千年。大别山深处就有树龄超千年的古银杏！",
    protection: "国家一级保护植物",
    emoji: "🍂"
  },
  {
    id: "dendrobium", name: "霍山石斛", scientific: "Dendrobium huoshanense",
    image: "images/species/dendrobium.jpg",
    category: "植物", role: "生产者", trophic: 1,
    description: "霍山石斛是大别山最珍贵的药用植物之一，被誉为'中华仙草'。它主要分布在霍山及周边大别山区海拔300-900米的阴湿岩石上，对生长环境要求极为苛刻，野生资源极其稀少。",
    funFact: "霍山石斛被称为'软黄金'——顶级的野生霍山石斛每克价格比黄金还贵！古人说它能'延年益寿'，现代科学证明它确实含有多种增强免疫力的活性成分。",
    protection: "国家一级保护植物",
    emoji: "🌿"
  },
  {
    id: "goldenpheasant", name: "红腹锦鸡", scientific: "Chrysolophus pictus",
    image: "images/species/goldenpheasant.jpg",
    category: "鸟类", role: "初级消费者", trophic: 2,
    description: "红腹锦鸡是中国特有鸟类，被誉为'林中凤凰'。雄鸟全身羽色绚烂——金色冠羽、红色腹部、翠绿背部，在阳光下如同流动的宝石。大别山是它们的重要栖息地之一。",
    funFact: "红腹锦鸡是中国的'候选国鸟'之一！它的形象曾多次出现在中国传统绘画和刺绣中，象征富贵和吉祥。",
    protection: "国家二级保护动物",
    emoji: "🐔"
  },
  {
    id: "salamander", name: "大鲵（娃娃鱼）", scientific: "Andrias davidianus",
    image: "images/species/salamander.jpg",
    category: "两栖类", role: "次级消费者", trophic: 3,
    description: "大鲵是世界上现存最大的两栖动物，体长可达1.8米，叫声像婴儿啼哭，因此得名'娃娃鱼'。大别山的清澈溪流是它们理想的栖息地，白天躲在石缝中，夜晚出来捕食鱼虾。",
    funFact: "大鲵是真正的'活化石'——大鲵属的化石记录可追溯到约1.7亿年前的侏罗纪晚期，比恐龙还要早！",
    protection: "国家一级保护动物",
    emoji: "🐸"
  },
  {
    id: "pheasant", name: "白冠长尾雉", scientific: "Syrmaticus reevesii",
    image: "images/species/pheasant.jpg",
    category: "鸟类", role: "初级消费者", trophic: 2,
    description: "白冠长尾雉是中国的特有鸟种，雄鸟拖着长达1.5米的华丽尾羽在林中穿行，宛如森林里的贵族。它们主要以植物的种子、嫩芽和昆虫为食。",
    funFact: "白冠长尾雉的尾羽在京剧中被用作武将头盔上的'雉鸡翎'，是勇气和威严的象征！",
    protection: "国家一级保护动物",
    emoji: "🐦"
  },
  {
    id: "eagle", name: "金雕", scientific: "Aquila chrysaetos",
    image: "images/species/eagle.webp",
    category: "鸟类", role: "顶级消费者", trophic: 4,
    description: "金雕是大别山天空的霸主，翼展可达两米以上。它们锐利的眼睛能从高空锁定地面上的野兔和松鼠，然后以每小时200公里的速度俯冲捕猎。",
    funFact: "金雕的视力是人类的8倍！如果金雕会读书，它可以看清一个足球场另一端报纸上的小字。",
    protection: "国家一级保护动物",
    emoji: "🦅"
  },
  {
    id: "muskdeer", name: "大别山原麝", scientific: "Moschus anhuiensis",
    image: "images/species/muskdeer.jpg",
    category: "哺乳类", role: "初级消费者", trophic: 2,
    description: "大别山原麝是一种小型森林麝，体型只有山羊的一半大。雄麝长有突出的獠牙状犬齿，看起来有点'吸血鬼'风格，但其实它们只吃树叶和青苔，非常温和。",
    funFact: "大别山原麝是中国特有物种，仅分布在大别山区，野生数量可能不到1000只，比大熊猫还稀有！",
    protection: "国家一级保护动物",
    emoji: "🦌"
  },
  {
    id: "pangolin", name: "中华穿山甲", scientific: "Manis pentadactyla",
    image: "images/species/pangolin.webp",
    category: "哺乳类", role: "次级消费者", trophic: 3,
    description: "穿山甲全身覆盖着坚硬的角质鳞片，遇到危险时会蜷缩成一个'松果球'。它们是森林的'害虫克星'，一只穿山甲一天能吃掉约7万只白蚁，一年能守护大片森林的健康。",
    funFact: "穿山甲的舌头比身体还长！当它伸进蚁穴时，粘稠的唾液会把蚂蚁和白蚁全部粘住。",
    protection: "国家一级保护动物",
    emoji: "🦔"
  },
  {
    id: "butterfly", name: "中华虎凤蝶", scientific: "Luehdorfia chinensis",
    image: "images/species/butterfly.webp",
    category: "昆虫", role: "初级消费者", trophic: 2,
    description: "中华虎凤蝶是中国独有的蝴蝶品种，翅膀上有黄色底色配黑色虎纹斑点，后翅还有亮蓝色装饰。每年早春，它们是大别山最早出现的蝴蝶之一。",
    funFact: "中华虎凤蝶的幼虫主要取食细辛属植物和杜衡等马兜铃科植物，食性非常专一——如果这些植物消失了，蝴蝶也会跟着消失！",
    protection: "国家二级保护动物",
    emoji: "🦋"
  }
];

// 探索页使用的 11 个热点物种
export const hotspotSpecies = species.filter(s =>
  ["pinus","rhododendron","ginkgo","dendrobium","goldenpheasant","salamander","pheasant","eagle","muskdeer","pangolin","butterfly"].includes(s.id)
);
