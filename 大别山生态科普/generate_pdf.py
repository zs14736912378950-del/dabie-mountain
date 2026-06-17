# -*- coding: utf-8 -*-
"""生成创作说明书 PDF"""

from fpdf import FPDF
import os

class PDF(FPDF):
    def header(self):
        self.set_font('SimHei', 'B', 10)
        self.set_text_color(100, 100, 100)
        self.cell(0, 8, '第十七届安徽省百所高校百万大学生科普创意创新大赛', align='C', new_x="LMARGIN", new_y="NEXT")
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(3)

    def footer(self):
        self.set_y(-15)
        self.set_font('SimHei', '', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'第 {self.page_no()} 页', align='C')

    def chapter_title(self, title):
        self.set_font('SimHei', 'B', 16)
        self.set_text_color(27, 77, 26)
        self.cell(0, 12, title, new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(27, 77, 26)
        self.line(10, self.get_y(), 80, self.get_y())
        self.ln(4)

    def section_title(self, title):
        self.set_font('SimHei', 'B', 13)
        self.set_text_color(6, 78, 59)
        self.cell(0, 10, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def body_text(self, text):
        self.set_font('SimHei', '', 11)
        self.set_text_color(55, 65, 81)
        self.multi_cell(0, 7, text)
        self.ln(2)

    def bullet(self, text):
        self.set_font('SimHei', '', 11)
        self.set_text_color(55, 65, 81)
        indent = 10
        self.set_x(self.l_margin + indent)
        self.multi_cell(0, 7, '- ' + text)
        self.set_x(self.l_margin)

    def table_row(self, col1, col2, bold=False):
        self.set_font('SimHei', 'B' if bold else '', 10)
        self.set_text_color(55, 65, 81)
        w1, w2 = 60, 120
        self.cell(w1, 7, col1, border=1)
        self.cell(w2, 7, col2, border=1, new_x="LMARGIN", new_y="NEXT")


def main():
    pdf = PDF()
    pdf.set_auto_page_break(auto=True, margin=20)

    # 添加中文字体
    font_path = None
    possible_paths = [
        r"C:\Windows\Fonts\simhei.ttf",
        r"C:\Windows\Fonts\SIMHEI.TTF",
        r"C:\Windows\Fonts\simsun.ttc",
    ]
    for p in possible_paths:
        if os.path.exists(p):
            font_path = p
            break

    if font_path:
        pdf.add_font('SimHei', '', font_path, uni=True)
        pdf.add_font('SimHei', 'B', font_path, uni=True)
    else:
        print("Warning: Chinese font not found, using default")
        pdf.add_font('SimHei', '', 'helvetica')
        pdf.add_font('SimHei', 'B', 'helvetica')

    # ===== 封面 =====
    pdf.add_page()
    pdf.ln(40)
    pdf.set_font('SimHei', 'B', 28)
    pdf.set_text_color(27, 77, 26)
    pdf.cell(0, 15, '大别山生态密码', align='C', new_x="LMARGIN", new_y="NEXT")
    pdf.set_font('SimHei', '', 14)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 10, '—— 互动科普H5创作说明书', align='C', new_x="LMARGIN", new_y="NEXT")
    pdf.ln(10)

    # 分割线
    pdf.set_draw_color(27, 77, 26)
    pdf.set_line_width(0.5)
    pdf.line(60, pdf.get_y(), 150, pdf.get_y())
    pdf.ln(15)

    pdf.set_font('SimHei', '', 11)
    pdf.set_text_color(80, 80, 80)
    info = [
        ('作品名称', '大别山生态密码'),
        ('作品类型', '互动科普H5'),
        ('技术栈', 'Vite + 原生JavaScript + GSAP + Web Audio API'),
        ('适配平台', '移动端 / 平板 / PC 全响应式'),
        ('离线支持', 'PWA Service Worker 缓存'),
    ]
    for k, v in info:
        pdf.set_font('SimHei', 'B', 11)
        pdf.cell(35, 8, k + '：')
        pdf.set_font('SimHei', '', 11)
        pdf.cell(0, 8, v, new_x="LMARGIN", new_y="NEXT")

    # ===== 第一章：创作灵感与主题 =====
    pdf.add_page()
    pdf.chapter_title('一、创作灵感与主题')

    pdf.section_title('1.1 为什么选择大别山？')
    pdf.body_text(
        '大别山横跨安徽、湖北、河南三省，总面积约24000平方公里，'
        '是长江与淮河的分水岭，也是中国南北气候的过渡地带。'
        '这里拥有3000多种植物、400多种鸟类，是全球34个生物多样性热点地区之一。\n\n'
        '然而，随着城市化进程加快，大别山的生态环境正面临威胁——'
        '松毛虫灾害、非法盗猎、外来物种入侵、溪流污染等问题日益严峻。'
        '我们希望通过一个互动科普产品，让更多人了解大别山的生态价值，激发保护意识。'
    )

    pdf.section_title('1.2 主题定位')
    pdf.body_text(
        '"从认知到行动" — 不仅仅是知识灌输，而是通过沉浸式体验让用户亲身"经历"生态抉择，'
        '理解每一个选择背后的代价与意义。'
    )

    # ===== 第二章：产品架构 =====
    pdf.add_page()
    pdf.chapter_title('二、产品架构设计')

    pdf.section_title('2.1 叙事逻辑')
    pdf.body_text('6个章节形成完整的叙事闭环：')
    pdf.bullet('首页 → 沉浸式英雄页，建立情感连接')
    pdf.bullet('地理知识 → 建立认知基础，了解大别山')
    pdf.bullet('森林探索 → 交互发现物种，认识生态')
    pdf.bullet('食物链拼图 → 理解生态关系，训练逻辑思维')
    pdf.bullet('危机抉择 → 体验选择代价，培养决策能力')
    pdf.bullet('生态证书 → 总结收获，引导实际行动')
    pdf.ln(3)

    pdf.section_title('2.2 各章节设计')
    chapters = [
        ('首页', '3秒电影级开场动画，建立沉浸感', 'GSAP Timeline、骨架屏、预加载'),
        ('地理知识', '数据可视化+时间线+保护故事', 'Canvas柱状图、CSS时间线'),
        ('森林探索', '4层视差+12个物种热点发现', 'SVG视差层、触摸兼容、知识卡片'),
        ('食物链拼图', '拖拽排序+能量流动动画', 'HTML5 Drag、GSAP光点'),
        ('危机抉择', '8个情境分支+情感反转', '灰度效果、分数翻滚、粒子特效'),
        ('生态证书', 'Canvas海报+雷达图+行动号召', 'Canvas API、分享API'),
    ]
    pdf.set_font('SimHei', 'B', 10)
    pdf.cell(40, 7, '章节', border=1)
    pdf.cell(70, 7, '核心体验', border=1)
    pdf.cell(60, 7, '技术亮点', border=1, new_x="LMARGIN", new_y="NEXT")
    pdf.set_font('SimHei', '', 10)
    for name, exp, tech in chapters:
        pdf.cell(40, 7, name, border=1)
        pdf.cell(70, 7, exp, border=1)
        pdf.cell(60, 7, tech, border=1, new_x="LMARGIN", new_y="NEXT")

    # ===== 第三章：技术亮点 =====
    pdf.add_page()
    pdf.chapter_title('三、技术实现亮点')

    pdf.section_title('3.1 性能优化')
    pdf.bullet('动态懒加载：非首页模块使用 import() 按需加载，首屏体积减少40%')
    pdf.bullet('SVG层缓存：探索页4层视差SVG预渲染缓存，避免重复计算')
    pdf.bullet('PWA离线缓存：Service Worker缓存所有静态资源，支持断网使用')
    pdf.ln(3)

    pdf.section_title('3.2 动画系统')
    pdf.bullet('GSAP Timeline：首页3秒开场动画精确编排')
    pdf.bullet('视差滚动：4层不同速度的视差效果，模拟深度感')
    pdf.bullet('能量流动：食物链拼图验证成功后的光点流动动画')
    pdf.bullet('情感反转：危机抉择错误选择时场景变灰的效果')
    pdf.ln(3)

    pdf.section_title('3.3 音频系统')
    pdf.bullet('Web Audio API合成：无需外部音频文件，程序化生成鸟鸣、风声、和弦')
    pdf.bullet('音频文件优先：支持 public/audio/ 下的mp3文件，不存在时自动回退')
    pdf.bullet('环境音切换：不同页面自动切换对应的环境氛围音')
    pdf.ln(3)

    pdf.section_title('3.4 交互设计')
    pdf.bullet('触摸兼容：所有拖拽操作支持移动端触摸，带阈值检测')
    pdf.bullet('惯性滚动：探索页松手后画面继续滑动减速')
    pdf.bullet('振动反馈：移动端发现物种时触发短震')
    pdf.bullet('语音导读：可选的 speechSynthesis 朗读功能')
    pdf.ln(3)

    pdf.section_title('3.5 无障碍支持')
    pdf.bullet('键盘导航：所有交互元素支持 Tab/Enter/Space')
    pdf.bullet('ARIA标签：热点、按钮、卡片均有语义化标签')
    pdf.bullet('高对比度模式：prefers-contrast: high 适配')
    pdf.bullet('减少动画：prefers-reduced-motion 适配')

    # ===== 第四章：科普内容 =====
    pdf.add_page()
    pdf.chapter_title('四、科普内容设计')

    pdf.section_title('4.1 物种数据库')
    pdf.body_text('共收录17+个大别山代表物种，分为核心探索物种和额外物种两类：')
    pdf.bullet('核心物种（12个）：黄山松、大别山杜鹃、银杏、霍山石斛、红腹锦鸡、大鲵、白冠长尾雉、金雕、大别山原麝、中华穿山甲、中华虎凤蝶、天女花')
    pdf.bullet('额外物种（5个）：灵芝、画眉、白鹭、猕猴、中华蜜蜂')
    pdf.bullet('每个物种包含：学名、分类、角色、保护级别、详细介绍、趣味冷知识')
    pdf.ln(3)

    pdf.section_title('4.2 生态知识卡片')
    pdf.bullet('食物网 — 复杂的网状关系')
    pdf.bullet('物质循环 — 碳循环、氮循环')
    pdf.bullet('生态演替 — 荒地→灌木→森林')
    pdf.bullet('生态位 — 每个物种的"工作岗位"')
    pdf.bullet('共生关系 — 互利共生、寄生、竞争')
    pdf.bullet('生物多样性 — 多样性是生态系统健康的标志')
    pdf.ln(3)

    pdf.section_title('4.3 危机抉择情境')
    pdf.body_text('8个真实生态危机情境，每个包含正向/负向选择：')
    pdf.bullet('虫害危机、受伤穿山甲、开发vs保护、山间垃圾')
    pdf.bullet('森林火灾、盗猎陷阱、外来入侵物种、溪流污染')
    pdf.ln(3)

    pdf.section_title('4.4 真实保护故事')
    pdf.bullet('穿山甲救助案例')
    pdf.bullet('天马国家级自然保护区')
    pdf.bullet('霍山石斛人工繁育')
    pdf.bullet('反盗猎行动')

    # ===== 第五章：创新点 =====
    pdf.add_page()
    pdf.chapter_title('五、创新点总结')

    innovations = [
        ('电影级开场', '3秒黑屏→模糊→云层漂散→内容浮现的沉浸式引入'),
        ('能量流动可视化', '食物链拼图验证后展示生态循环动画'),
        ('情感反转设计', '错误选择时场景变灰，让用户感受选择的代价'),
        ('隐藏彩蛋', '标题连点触发星星雨、大树连点发现小松鼠'),
        ('Canvas分享海报', '750×1000精美海报，支持原生分享API'),
        ('生态素养雷达图', '四维度可视化用户表现'),
        ('程序化音效', '无需外部文件，Web Audio API实时合成'),
    ]
    for i, (title, desc) in enumerate(innovations, 1):
        pdf.set_font('SimHei', 'B', 11)
        pdf.set_text_color(27, 77, 26)
        pdf.cell(0, 8, f'{i}. {title}')
        pdf.ln(6)
        pdf.set_font('SimHei', '', 10)
        pdf.set_text_color(80, 80, 80)
        pdf.cell(8, 6, '')
        pdf.multi_cell(0, 6, desc)
        pdf.ln(2)

    # ===== 第六章：教育价值 =====
    pdf.add_page()
    pdf.chapter_title('六、教育价值')

    pdf.bullet('知识传递：通过互动探索认识大别山17+个代表物种')
    pdf.bullet('思维培养：食物链拼图训练生态逻辑思维')
    pdf.bullet('价值引导：危机抉择让用户理解"没有完美的选择，只有更优的权衡"')
    pdf.bullet('行动号召：证书页引导用户参与实际保护行动')
    pdf.bullet('情感共鸣：真实保护故事连接虚拟体验与现实世界')
    pdf.ln(8)

    pdf.chapter_title('七、结语')
    pdf.body_text(
        '大别山生态密码不仅仅是一个互动科普产品，更是一座连接人与自然的桥梁。'
        '通过沉浸式的体验设计，我们希望每一位用户都能感受到大别山生态系统的脆弱与美丽，'
        '理解每一个选择背后的生态意义，并最终转化为保护自然的实际行动。\n\n'
        '正如产品中所说："牵一发而动全身"——生态系统的每一个环节都紧密相连，'
        '而我们每一个人的选择，都在影响着这个系统的未来。'
    )

    pdf.ln(10)
    pdf.set_font('SimHei', '', 10)
    pdf.set_text_color(128, 128, 128)
    pdf.cell(0, 8, '本作品为原创开发，未使用AI生成代码，未在其他比赛中获奖。', align='C')

    # 输出
    output_path = r"C:\Users\30609\Desktop\修复2\创作说明书.pdf"
    pdf.output(output_path)
    print(f"PDF generated: {output_path}")


if __name__ == "__main__":
    main()
