// 生态危机情境数据
// 8个情境，每个有2个选项，选择后影响生态得分
// 场景插图使用内联 SVG（sceneIllustrations.js），无需外部图片依赖

export const scenarios = [
  {
    id: "pest",
    title: "🌲 虫害危机",
    image: "images/crisis/pest.jpg",
    description: "大别山的一片松林最近遭受了松毛虫的侵袭，许多松树的针叶开始变黄枯萎。如果不采取措施，这片森林可能会在几个月内大面积死亡。作为森林守护者，你会怎么做？",
    choices: [
      {
        text: "🐦 引入天敌 — 释放赤眼蜂等松毛虫的天敌",
        score: 10,
        result: {
          title: "🌱 森林在恢复！",
          description: "你选择了生物防治，释放了松毛虫的天敌赤眼蜂。这些小小的寄生蜂在松毛虫的卵里产卵，有效控制了虫害。几周后，松树开始长出新绿的嫩芽，鸟儿也回来了。用自然的力量解决问题——这才是生态智慧！",
          image: "images/crisis/recovery.jpg"
        }
      },
      {
        text: "🧪 喷洒农药 — 用化学手段快速灭虫",
        score: -8,
        result: {
          title: "💀 一片死寂",
          description: "农药确实杀死了松毛虫，但也杀死了森林里的蜜蜂、蝴蝶和土壤中的有益微生物。溪水被污染，鱼虾死亡。鸟儿因为没有虫子吃也离开了。森林虽然还在，但变得异常寂静……生态系统一旦被破坏，需要很多年才能恢复。",
          image: "images/crisis/deadforest.jpg"
        }
      }
    ]
  },
  {
    id: "pangolin",
    title: "🦔 受伤的穿山甲",
    image: "images/crisis/pangolin_hurt.jpg",
    description: "你在森林巡护时，发现路边躺着一只中华穿山甲，它的鳞片有几处破损，看起来受了伤。穿山甲是国家一级保护动物，野生数量极为稀少。这时你该怎么办？",
    choices: [
      {
        text: "🏥 联系野生动物救助站 — 寻求专业帮助",
        score: 12,
        result: {
          title: "🤲 生命之光",
          description: "你立刻拨打了野生动物救助热线。专业人员赶到后，将穿山甲带回救助站治疗。三个月后，这只穿山甲恢复了健康，被放归大别山深处。你的一次善意举动，帮助了一个珍稀物种延续生命！",
          image: "images/crisis/pangolin_healed.jpg"
        }
      },
      {
        text: "🤷 不干预 — 让它自然恢复",
        score: -6,
        result: {
          title: "😔 错过的机会",
          description: "你选择了不干预，悄悄离开了。但受伤的穿山甲在野外很难独自恢复，它的伤口可能会感染，行动不便也难以觅食。对于数量已经极少的濒危物种，每一只个体的存亡都很重要。下次遇到受伤的野生动物，记得联系专业救助站哦！",
          image: "images/crisis/pangolin_hurt.jpg"
        }
      }
    ]
  },
  {
    id: "deforest",
    title: "🪓 开发还是保护？",
    image: "images/crisis/deforest.jpg",
    description: "大别山边缘的一片次生林被规划为旅游度假区，开发商计划砍伐部分树木建造酒店和停车场。这片林子虽然不算原始林，但也是许多小动物的家园。当地村民对此意见不一——有人想要发展经济，有人想要保护生态。你的选择是？",
    choices: [
      {
        text: "🌳 生态旅游 — 修建步道和观鸟屋，不砍树",
        score: 10,
        result: {
          title: "🤝 人与自然和谐共处",
          description: "你说服大家采用生态旅游方案！在林间修建架空木栈道和隐蔽的观鸟屋，游客可以近距离感受大自然而不破坏它。当地村民做起了导游和民宿生意，经济收入不降反升。这是一个双赢的选择！",
          image: "images/crisis/ecotourism.jpg"
        }
      },
      {
        text: "🏗️ 支持开发 — 发展经济优先",
        score: -10,
        result: {
          title: "🏢 消失的家园",
          description: "度假区建起来了，但原来住在这里的松鼠、白冠长尾雉和许多昆虫失去了栖息地。游客们或许玩得很开心，但他们永远不会知道，这片土地曾经是一个生机勃勃的生态系统。经济发展很重要，但失去了就很难再回来的自然，同样珍贵。",
          image: "images/crisis/deforest.jpg"
        }
      }
    ]
  },
  {
    id: "trash",
    title: "🗑️ 山间垃圾",
    image: "images/crisis/trash.jpg",
    description: "春天来了，大别山的杜鹃花开得正艳，吸引了大量游客。但周末过后，山间步道旁散落着许多塑料袋、饮料瓶和零食包装。这些垃圾不仅难看，还会危害野生动物——动物可能误食塑料或被包装绳缠绕。你会怎么做？",
    choices: [
      {
        text: "🧹 组织清理行动 — 和朋友们一起捡垃圾",
        score: 8,
        result: {
          title: "✨ 山间重现美丽",
          description: "你发起了一次净山行动，和十几位朋友一起沿着步道清理垃圾。你们的行动感染了其他游客，不少人主动加入。一天下来，收集了十几袋垃圾，杜鹃花丛恢复了本来的美丽。保护环境，从自己做起！",
          image: "images/crisis/clean.jpg"
        }
      },
      {
        text: "😐 视而不见 — 反正有人会打扫的",
        score: -6,
        result: {
          title: "😞 被忽视的伤害",
          description: "几周后你又来到这条步道，垃圾更多了。一只小松鼠的尾巴被塑料袋缠住，挣扎了许久才挣脱。山间的溪水里也漂浮着塑料瓶……大自然不会自己消化人类的垃圾，每一次视而不见都在累积伤害。",
          image: "images/crisis/trash.jpg"
        }
      }
    ]
  },
  {
    id: "fire",
    title: "🔥 森林火灾",
    image: "images/crisis/fire.jpg",
    description: "深秋的大别山，连日的干旱让森林变得异常干燥。一道闪电点燃了山腰的枯草，火势迅速蔓延！浓烟滚滚，动物们四处逃窜。作为巡护员，你必须立刻做出决定。",
    choices: [
      {
        text: "🚒 专业灭火 — 立即呼叫消防队并组织防火隔离带",
        score: 12,
        result: {
          title: "🧯 火势得到控制！",
          description: "你第一时间通知了森林消防队，并组织志愿者在火势下风方向清理出一条防火隔离带。消防直升机从空中洒水，地面队伍奋力扑救。虽然烧毁了一小片区域，但大部分森林保住了。来年春天，焦土上又冒出了嫩绿的新芽——大自然有惊人的恢复力！",
          image: "images/crisis/firefighting.jpg"
        }
      },
      {
        text: "🏃 独自扑救 — 拿树枝试图自己灭火",
        score: -10,
        result: {
          title: "🔥 火势失控",
          description: "你一个人冲进火场，但山火的力量远超想象。火借风势越烧越旺，不仅没能扑灭，你也被浓烟呛得连连后退。最终这场火烧毁了整片山坡，许多动物的家园化为灰烬。记住：面对森林火灾，第一时间求助专业人员才是最正确的选择！",
          image: "images/crisis/fire.jpg"
        }
      }
    ]
  },
  {
    id: "poaching",
    title: "🔫 盗猎陷阱",
    image: "images/crisis/poaching.avif",
    description: "你在密林深处巡护时，发现了几处隐蔽的捕兽夹和捕鸟网。这些是盗猎者设置的，专门用来捕捉白冠长尾雉和原麝等珍稀动物。地上还有一些动物的脚印和挣扎痕迹。你该怎么办？",
    choices: [
      {
        text: "📞 立即报警 — 联系森林公安并记录证据",
        score: 12,
        result: {
          title: "🚔 盗猎者落网！",
          description: "你悄悄拍下照片和位置，迅速联系了森林公安。警方根据线索蹲守，成功抓获了盗猎团伙，拆除了全部捕兽夹和捕鸟网。一个月后，红外相机拍到了白冠长尾雉带着雏鸟在附近觅食的画面——你的勇敢举报守护了一方生灵！",
          image: "images/crisis/poacher_caught.webp"
        }
      },
      {
        text: "😰 害怕报复 — 假装没看见，悄悄走开",
        score: -10,
        result: {
          title: "😔 又一只动物受伤了",
          description: "几天后你再次经过，捕兽夹上多了一撮带血的羽毛。盗猎者没有被制止，会有更多动物受害。作为热爱自然的人，沉默有时也是一种伤害。下次遇到类似情况，记得拨打110，森林公安会保护举报人的安全。",
          image: "images/crisis/poaching.avif"
        }
      }
    ]
  },
  {
    id: "invasive",
    title: "🌿 外来入侵物种",
    image: "images/crisis/invasive.jpg",
    description: "大别山的一条溪流边，你发现大片陌生的藤蔓植物正在疯狂生长，把本土植物的阳光和空间都抢走了。经辨认，这是外来入侵物种「加拿大一枝黄花」，繁殖力极强，会严重破坏本地生态系统。",
    choices: [
      {
        text: "🧤 组织清除 — 发动志愿者连根拔除入侵植物",
        score: 10,
        result: {
          title: "🌻 本土植物回来了！",
          description: "你发起了一场「守护本土植物」行动，和几十位志愿者一起仔细拔除加拿大一枝黄花。经过几次集中清理，入侵植物的数量大幅减少。来年春天，大别山杜鹃和野菊花重新绽放，蜜蜂和蝴蝶也回来了！",
          image: "images/crisis/native_restored.jpg"
        }
      },
      {
        text: "🤷 随它去吧 — 反正植物都一样",
        score: -8,
        result: {
          title: "🌪️ 绿色沙漠",
          description: "半年后你回到这里，加拿大一枝黄花已经占据了整片河岸，本土的野花野草几乎完全消失。依赖这些本土植物的昆虫也随之减少，整个食物链都受到了影响。外来入侵物种像「绿色癌症」，一旦失控就极难挽回。",
          image: "images/crisis/invasive.jpg"
        }
      }
    ]
  },
  {
    id: "water",
    title: "💧 溪流污染",
    image: "images/crisis/water.jpg",
    description: "大别山深处的一条清澈溪流突然变得浑浊，水面上漂浮着白色泡沫和油污，散发出刺鼻的气味。顺着溪流往上走，你发现上游有一个非法的小型采矿点，正在向溪水中排放废水。这条溪流是下游村庄的饮用水源，也是大鲵的栖息地。",
    choices: [
      {
        text: "⚖️ 举报污染 — 向环保部门举报并采集水样",
        score: 12,
        result: {
          title: "💎 清流重现",
          description: "环保部门接到你的举报后迅速介入，责令该采矿点停产整改，并处以罚款。采矿区建设了污水处理设施，溪水在几周后恢复了清澈。你看到一只大鲵重新出现在岩石缝隙中——水干净了，生命才能延续。",
          image: "images/crisis/clean_stream.jpg"
        }
      },
      {
        text: "😐 不关我事 — 反正不影响我",
        score: -8,
        result: {
          title: "☠️ 死去的溪流",
          description: "污染持续了几个月，溪流里的鱼虾几乎全部死亡，下游村民不得不从远处运水饮用。一只大鲵的尸体浮在水面上——这种在地球上生存了约1.7亿年的古老生物，在短短几个月内就失去了整条溪流的家园。",
          image: "images/crisis/water.jpg"
        }
      }
    ]
  },
];
