# 视频文件使用说明

## 📹 如何添加您的案例视频

网站已经预留了3个视频槽位，您只需要按以下步骤操作：

### 1️⃣ 准备视频文件

**建议格式：**
- 格式：MP4（H.264编码）
- 分辨率：1920x1080 或 1280x720
- 文件大小：每个视频建议不超过50MB
- 时长：1-3分钟

**文件命名：**
```
case-video-1.mp4  （案例1）
case-video-2.mp4  （案例2）
case-video-3.mp4  （案例3）
```

### 2️⃣ 创建视频文件夹

在网站根目录创建 `videos` 文件夹：
```
yokodojin-website/
├── index.html
├── styles.css
├── script.js
├── README.md
└── videos/              ← 新建此文件夹
    ├── case-video-1.mp4
    ├── case-video-2.mp4
    └── case-video-3.mp4
```

### 3️⃣ 添加视频缩略图（可选但推荐）

为每个视频准备一张封面图片（视频第一帧或精选画面）：

**文件命名：**
```
video1-thumbnail.jpg
video2-thumbnail.jpg
video3-thumbnail.jpg
```

**建议尺寸：**
- 分辨率：1920x1080
- 格式：JPG
- 文件大小：< 500KB

将缩略图也放入 `videos` 文件夹：
```
videos/
├── case-video-1.mp4
├── case-video-2.mp4
├── case-video-3.mp4
├── video1-thumbnail.jpg
├── video2-thumbnail.jpg
└── video3-thumbnail.jpg
```

### 4️⃣ 修改视频标题和描述（可选）

如果您想修改案例的标题、类别、描述，编辑 `index.html` 文件：

找到对应的案例卡片（第237-330行左右），修改以下内容：

```html
<!-- 案例1 -->
<div class="case-category">製造業</div>  <!-- 修改行业类别 -->
<h3 class="case-title">精密機器メーカーの企業紹介動画</h3>  <!-- 修改标题 -->
<p class="case-description">高精度技術と品質管理体制を...</p>  <!-- 修改描述 -->
<div class="case-meta">
    <span class="case-meta-item">📹 2分30秒</span>  <!-- 修改时长 -->
    <span class="case-meta-item">🌍 日英2言語</span>  <!-- 修改特点 -->
    <span class="case-meta-item">⏱️ 10日納品</span>  <!-- 修改交付天数 -->
</div>
```

### 5️⃣ 完成！

上传修改后的网站到服务器，视频就会自动显示在案例展示区域。

---

## 🎬 视频优化建议

### 压缩视频（减小文件大小）

**方法1：使用HandBrake（免费软件）**
1. 下载 HandBrake: https://handbrake.fr/
2. 打开视频文件
3. 选择 "Web" 预设
4. 点击 "Start Encode"

**方法2：使用在线工具**
- https://www.freeconvert.com/video-compressor
- https://www.youcompress.com/

**目标文件大小：**
- 1分钟视频：约 10-15MB
- 2分钟视频：约 20-30MB
- 3分钟视频：约 30-45MB

### 生成缩略图

**方法1：从视频提取（Mac/Windows）**
- Mac：使用QuickTime Player打开视频 → 截图 → 保存
- Windows：使用VLC播放器 → 暂停在关键帧 → 视频 → 截取快照

**方法2：使用Photoshop/Figma**
创建1920x1080画布，添加视频元素和文字

---

## 🔧 技术说明

### HTML视频标签属性

```html
<video 
    class="case-video-player" 
    controls                    <!-- 显示播放控制条 -->
    poster="..."                <!-- 封面图片 -->
    preload="metadata"          <!-- 预加载视频信息但不加载整个视频 -->
>
```

**其他可用属性：**
- `autoplay` - 自动播放（不建议使用）
- `muted` - 静音
- `loop` - 循环播放
- `width` / `height` - 指定尺寸

### 浏览器兼容性

MP4格式支持所有现代浏览器：
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ 移动端浏览器

---

## ❓ 常见问题

**Q: 视频不显示怎么办？**
A: 检查文件路径是否正确，确保视频文件在 `videos/` 文件夹中

**Q: 视频文件太大，加载慢怎么办？**
A: 使用HandBrake等工具压缩视频，目标是2分钟视频约20-30MB

**Q: 可以用YouTube链接吗？**
A: 可以，但需要修改HTML代码为iframe嵌入方式

**Q: 想要3个以上的案例怎么办？**
A: 复制一个 `<div class="case-card">...</div>` 块，修改视频路径和内容即可

**Q: 视频自动播放吗？**
A: 默认不自动播放，用户点击播放按钮后播放。如需自动播放，添加 `autoplay muted` 属性

---

## 📞 技术支持

如果遇到问题，可以：
1. 检查浏览器控制台（F12）查看错误信息
2. 确认文件路径和命名正确
3. 测试视频文件是否能在本地播放

**最后更新：** 2024年12月
