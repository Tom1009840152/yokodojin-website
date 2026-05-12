# GitHub Pages 部署指南

## 📋 前置要求

- ✅ GitHub 账号（没有的话去 https://github.com 注册）
- ✅ 已安装 Git（检查：在终端运行 `git --version`）

---

## 🚀 部署步骤

### 1️⃣ 在 GitHub 创建仓库

1. 登录 GitHub
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息：
   - **Repository name**: `yokodojin-website`
   - **Description**: `与光同尘 - AI動画制作サービス公式サイト`
   - **Public** 或 **Private**（都可以，免费版也支持 Private 仓库的 GitHub Pages）
   - **不要勾选** "Initialize this repository with a README"
4. 点击 **"Create repository"**

---

### 2️⃣ 在本地初始化 Git 并推送代码

打开终端（Terminal），在项目目录执行：

```bash
# 进入项目目录（如果还没在的话）
cd /mnt/d/yokodojin-website

# 初始化 Git 仓库
git init

# 添加所有文件到暂存区
git add .

# 提交代码
git commit -m "Initial commit: 与光同尘网站首次提交"

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/yokodojin-website.git

# 设置主分支名称
git branch -M main

# 推送代码到 GitHub
git push -u origin main
```

**⚠️ 注意：** 
- 把 `YOUR_USERNAME` 替换为你的 GitHub 用户名
- 如果是第一次用 Git，可能需要先配置用户信息：
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

---

### 3️⃣ 启用 GitHub Pages

#### 方法 1：在 GitHub 网站配置（推荐）

1. 在 GitHub 仓库页面，点击 **"Settings"**（设置）
2. 在左侧菜单找到 **"Pages"**
3. 在 **"Source"** 下拉菜单选择：
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. 点击 **"Save"**
5. 等待 1-2 分钟，页面会显示：
   ```
   Your site is live at https://YOUR_USERNAME.github.io/yokodojin-website/
   ```

#### 方法 2：使用 GitHub Actions（自动化部署）

如果上面的方法不生效，可以创建 GitHub Actions 配置文件：

```bash
# 创建 .github/workflows 目录
mkdir -p .github/workflows

# 创建部署配置文件
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF

# 提交并推送
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow"
git push
```

---

### 4️⃣ 访问你的网站

部署成功后，你的网站地址是：

```
https://YOUR_USERNAME.github.io/yokodojin-website/
```

**例如：** 如果你的 GitHub 用户名是 `lizhichao`，那么网址就是：
```
https://lizhichao.github.io/yokodojin-website/
```

---

## 🎨 后续更新网站

每次修改代码后，只需：

```bash
# 1. 添加修改的文件
git add .

# 2. 提交修改（描述你的改动）
git commit -m "更新联系表单样式"

# 3. 推送到 GitHub
git push
```

GitHub Pages 会自动检测到代码更新，并在 1-2 分钟内重新部署。

---

## 🌐 绑定自定义域名（可选）

### 如果你购买了域名（如 yokodojin.jp）：

#### 1. 在项目根目录创建 `CNAME` 文件

```bash
echo "yokodojin.jp" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

#### 2. 在域名服务商配置 DNS

添加以下 DNS 记录：

**方式 A：使用 A 记录（推荐）**
```
类型     主机记录    记录值
A        @          185.199.108.153
A        @          185.199.109.153
A        @          185.199.110.153
A        @          185.199.111.153
CNAME    www        YOUR_USERNAME.github.io
```

**方式 B：使用 CNAME 记录**
```
类型     主机记录    记录值
CNAME    @          YOUR_USERNAME.github.io
CNAME    www        YOUR_USERNAME.github.io
```

#### 3. 在 GitHub 仓库设置中验证域名

1. 回到 **Settings → Pages**
2. 在 **"Custom domain"** 输入你的域名：`yokodojin.jp`
3. 点击 **"Save"**
4. 勾选 **"Enforce HTTPS"**（强制 HTTPS，推荐）

等待 DNS 生效（最多 24 小时，通常 10 分钟内）。

---

## 🔍 常见问题

### ❓ 404 错误

**原因：** GitHub Pages 还没生效或路径不对

**解决：**
- 等待 2-3 分钟再访问
- 检查 Settings → Pages 是否显示 "Your site is live"
- 确认访问的 URL 是否正确

---

### ❓ CSS/JS 文件加载失败

**原因：** 相对路径问题

**解决：** 确保 `index.html` 中的资源路径是相对路径：
```html
✅ 正确：<link rel="stylesheet" href="styles.css">
✅ 正确：<script src="script.js"></script>
❌ 错误：<link rel="stylesheet" href="/styles.css">
```

---

### ❓ 更新代码后网站没变化

**原因：** 浏览器缓存

**解决：**
- 强制刷新：`Ctrl + F5`（Windows）或 `Cmd + Shift + R`（Mac）
- 或打开浏览器隐私/无痕模式访问

---

### ❓ GitHub Actions 构建失败

**解决：**
1. 在仓库页面点击 **"Actions"** 标签
2. 查看失败的工作流，点击查看详细日志
3. 根据错误信息修复（通常是权限问题）
4. 确保在 Settings → Actions → General 中：
   - **Workflow permissions** 设置为 **"Read and write permissions"**

---

## 📚 更多资源

- GitHub Pages 官方文档：https://docs.github.com/pages
- 自定义域名指南：https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

---

## ✅ 部署检查清单

- [ ] 创建 GitHub 仓库
- [ ] 推送代码到 GitHub
- [ ] 启用 GitHub Pages
- [ ] 测试网站访问正常
- [ ] 测试表单提交（EmailJS 配置后）
- [ ] （可选）绑定自定义域名
- [ ] （可选）启用 HTTPS

---

## 🎉 完成！

你的网站现在已经在线了！分享你的网址：

```
https://YOUR_USERNAME.github.io/yokodojin-website/
```

任何人都可以通过这个网址访问你的网站。
