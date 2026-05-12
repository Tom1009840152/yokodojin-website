# 视频文件说明

## 文件列表

请将以下视频文件放置在此文件夹中：

### 首屏展示视频（Hero Section）
- `hero-demo.mp4` - 首页右侧展示的演示视频（推荐30-60秒）
- `hero-thumbnail.jpg` - 首屏视频的预览缩略图

### 案例视频（Case Studies）
- `case-video-1.mp4` - 制作事例视频1
- `case-video-2.mp4` - 制作事例视频2  
- `case-video-3.mp4` - 制作事例视频3

### 缩略图（可选）
- `video1-thumbnail.jpg` - 案例视频1的预览图
- `video2-thumbnail.jpg` - 案例视频2的预览图
- `video3-thumbnail.jpg` - 案例视频3的预览图

## 视频规格建议

### 文件大小
- 每个视频建议控制在 20-50MB 以内
- 如果文件过大，建议使用 CDN 托管

### 视频格式
- **格式**：MP4 (H.264 编码)
- **分辨率**：1920x1080 (Full HD) 或 1280x720 (HD)
- **帧率**：30fps
- **比特率**：2-5 Mbps

### 缩略图
- **格式**：JPG
- **分辨率**：1920x1080 或 1280x720
- **文件大小**：< 500KB

## 使用 CDN 的方案（推荐）

如果视频文件较大，建议使用 CDN 托管：

### 1. 上传到阿里云 OSS（推荐国内用户）
```html
<video src="https://your-bucket.oss-cn-hangzhou.aliyuncs.com/videos/case-video-1.mp4"></video>
```

### 2. 上传到腾讯云 COS
```html
<video src="https://your-bucket-1234567890.cos.ap-guangzhou.myqcloud.com/case-video-1.mp4"></video>
```

### 3. 使用 Cloudflare R2（国际用户）
```html
<video src="https://pub-xxxxx.r2.dev/case-video-1.mp4"></video>
```

## 修改 HTML 文件

上传视频后，在 `index.html` 中修改视频路径：

### 本地存储方式
```html
<source src="videos/case-video-1.mp4" type="video/mp4">
```

### CDN 托管方式
```html
<source src="https://your-cdn-url.com/case-video-1.mp4" type="video/mp4">
```

## 视频压缩工具

如需压缩视频，可使用以下工具：
- **HandBrake**（免费，跨平台）
- **FFmpeg**（命令行工具）
- **在线压缩**：https://www.freeconvert.com/video-compressor

### FFmpeg 压缩命令示例
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
```
