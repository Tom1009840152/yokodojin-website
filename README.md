# 与光同尘 - 日本市场网站

製造業向けAI動画制作サービスのランディングページ

## 📁 文件结构

```
yokodojin-website/
├── index.html          # 主HTML文件
├── styles.css          # CSS样式文件
├── script.js           # JavaScript交互功能
└── README.md           # 说明文档（本文件）
```

## 🚀 快速开始

### 本地预览

1. 直接用浏览器打开 `index.html` 即可预览
2. 或使用本地服务器（推荐）：

```bash
# 使用Python（如果已安装）
python -m http.server 8000

# 使用Node.js http-server（需要先安装）
npx http-server

# 使用VS Code Live Server插件
# 右键点击index.html → Open with Live Server
```

然后访问 `http://localhost:8000`

## 🌐 部署到线上

### 方案1：传统服务器部署

**购买域名（推荐）：**
- yokodojin.jp（最正规）
- yokodojin.co.jp（需要日本法人）

**租用日本服务器：**
- Sakura Internet（月500円起）
- ConoHa VPS（月700円起）
- AWS Tokyo Region

**上传步骤：**
1. 通过FTP/SFTP上传所有文件到服务器
2. 配置域名解析（A记录指向服务器IP）
3. 设置HTTPS证书（可用Let's Encrypt免费证书）

### 方案2：免费托管平台（快速上线）

**GitHub Pages（推荐）：**
```bash
# 1. 创建GitHub仓库
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yokodojin.git
git push -u origin main

# 2. 在GitHub仓库设置中启用GitHub Pages
# Settings → Pages → Source: main branch
```

访问地址：`https://yourusername.github.io/yokodojin/`

**Netlify（推荐）：**
1. 访问 netlify.com
2. 拖拽文件夹上传或连接GitHub仓库
3. 自动部署完成

**Vercel：**
类似Netlify，支持自动部署

### 方案3：日本本地化部署

使用日本CDN加速（如Cloudflare日本节点）

## 📝 需要修改的内容

### 1. 联系方式（重要！）

在 `index.html` 中修改：

**邮箱地址**（第414行附近）：
```html
<div class="method-value">info@yokodojin.jp</div>
```
改为你的真实邮箱

**电话号码**：
添加日本手机号或050号码

**LINE二维码**：
- 注册LINE官方账号
- 生成二维码图片
- 替换"QRコードで友だち追加"部分

### 2. 公司信息

在"会社概要"部分（第307-335行）修改：
- 日本窓口地址
- 设立年份
- 代表者姓名

### 3. 价格和套餐

根据实际定价调整"サービス・料金プラン"部分（第144-252行）

### 4. 嵌入真实视频

替换视频占位符（3个位置）：

**Hero区域的主视频**（第47-52行）：
```html
<!-- 替换为YouTube嵌入代码 -->
<iframe 
    width="100%" 
    height="100%" 
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
    frameborder="0" 
    allowfullscreen
></iframe>
```

**案例视频**（第262-340行）：
同样替换为实际视频链接

### 5. Google Analytics追踪（可选）

在 `</head>` 前添加：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔧 功能说明

### 已实现功能：
- ✅ 响应式设计（手机、平板、电脑自适应）
- ✅ 平滑滚动导航
- ✅ 滚动动画效果
- ✅ 联系表单验证
- ✅ 成功/错误消息提示
- ✅ 视频占位符点击效果

### 需要后续开发：
- ⏳ 表单提交API对接
- ⏳ 真实视频嵌入
- ⏳ 移动端菜单
- ⏳ 多语言切换（日英）
- ⏳ SEO优化

## 📧 表单提交设置

**方案1：使用Formspree（最简单）**

1. 访问 formspree.io
2. 创建免费账号
3. 在 `index.html` 的form标签中添加：
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**方案2：使用Google Forms**

创建Google表单，然后使用第三方服务转发

**方案3：自建后端API**

修改 `script.js` 中的 `simulateFormSubmission` 函数，调用你的API

## 🎨 设计定制

### 修改配色方案

在 `styles.css` 的 `:root` 部分（第9-26行）修改CSS变量：

```css
:root {
    --primary-color: #1e40af;      /* 主色 */
    --accent-color: #f59e0b;       /* 强调色 */
    --text-primary: #1f2937;       /* 文字主色 */
    /* ... */
}
```

### 修改字体

在 `index.html` 的 `<head>` 中修改Google Fonts链接

## 📱 移动端优化

网站已经是响应式设计，但移动端导航菜单需要额外开发：

**添加汉堡菜单**（可选）：
```html
<!-- 在header中添加 -->
<button class="mobile-menu-toggle">☰</button>
```

然后用JavaScript控制显示/隐藏

## ⚡ 性能优化建议

1. **图片优化**：
   - 使用WebP格式
   - 压缩图片大小
   - 添加懒加载

2. **代码压缩**：
   ```bash
   # 使用在线工具或命令行工具压缩CSS/JS
   npx minify styles.css > styles.min.css
   ```

3. **CDN加速**：
   - 使用Cloudflare
   - 启用缓存

## 🔒 安全检查清单

- [ ] 添加HTTPS证书
- [ ] 设置CSP（内容安全策略）
- [ ] 表单添加CSRF保护
- [ ] 添加reCAPTCHA防止垃圾提交
- [ ] 定期备份网站文件

## 📊 SEO优化建议

1. **已完成的SEO基础**：
   - ✅ Meta description
   - ✅ Meta keywords
   - ✅ 语义化HTML标签
   - ✅ 图片alt属性（需要添加）

2. **需要添加**：
   - robots.txt
   - sitemap.xml
   - OpenGraph标签（社交分享）
   - Schema.org结构化数据

## 🌍 多语言支持（未来扩展）

如需添加英文版：
1. 复制 `index.html` 为 `index-en.html`
2. 翻译所有日语文本
3. 在页面顶部添加语言切换按钮

## 📞 技术支持

如有问题，请联系开发团队或参考以下资源：

- HTML/CSS基础：MDN Web Docs
- JavaScript教程：javascript.info
- 日本网站设计参考：SANKOU!

## 📄 许可证

内部使用，版权归与光同尘(杭州)文化科技有限公司所有

---

**最后更新**：2024年12月
**版本**：1.0.0
