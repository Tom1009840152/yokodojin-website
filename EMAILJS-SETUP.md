# EmailJS 配置指南

## 1️⃣ 注册 EmailJS 账号

访问：https://www.emailjs.com/
点击 "Sign Up" 注册免费账号（推荐用 Google 账号快速登录）

---

## 2️⃣ 添加邮件服务（Email Service）

1. 登录后，点击左侧菜单 **"Email Services"**
2. 点击 **"Add New Service"**
3. 选择邮件服务商：
   - **推荐：Gmail**（如果你用 Gmail）
   - 或选择 **"Other"** 手动配置 163 邮箱（需要 SMTP 设置）
4. 按照提示连接你的邮箱：`li_zhichao2022@163.com`
5. 连接成功后，会生成一个 **Service ID**（形如 `service_abc123`）
6. ✅ **复制并保存这个 Service ID**

---

## 3️⃣ 创建邮件模板（Email Template）

1. 点击左侧菜单 **"Email Templates"**
2. 点击 **"Create New Template"**
3. 设置模板内容：

### 模板配置：

**Subject（邮件主题）：**
```
【与光同尘】新的お問い合わせ - {{company}}
```

**Content（邮件内容）：**
```
━━━━━━━━━━━━━━━━━━━━━━
📋 お問い合わせ内容
━━━━━━━━━━━━━━━━━━━━━━

会社名：{{company}}
担当者名：{{name}}
メールアドレス：{{email}}
電話番号：{{phone}}
興味のあるサービス：{{interest}}

━━━━━━━━━━━━━━━━━━━━━━
📝 相談内容
━━━━━━━━━━━━━━━━━━━━━━

{{message}}

━━━━━━━━━━━━━━━━━━━━━━
このメールは与光同尘ウェブサイトのお問い合わせフォームから自動送信されました。
```

4. 点击 **"Save"**
5. 保存后会生成一个 **Template ID**（形如 `template_xyz789`）
6. ✅ **复制并保存这个 Template ID**

---

## 4️⃣ 获取 Public Key

1. 点击左侧菜单 **"Account"**（账户设置）
2. 在 **"General"** 标签页找到 **"Public Key"**
3. 如果没有，点击 **"Generate"** 生成
4. ✅ **复制并保存这个 Public Key**（形如 `user_abcdef123456`）

---

## 5️⃣ 配置到网站代码

打开 `script.js` 文件，找到第 6-10 行：

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY',      // 替换为你的 Public Key
    SERVICE_ID: 'YOUR_SERVICE_ID',      // 替换为你的 Service ID
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID'     // 替换为你的 Template ID
};
```

**替换为你获取到的三个值：**

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'user_abc123xyz',           // 从 Account 页面获取
    SERVICE_ID: 'service_gmail123',         // 从 Email Services 获取
    TEMPLATE_ID: 'template_contact456'      // 从 Email Templates 获取
};
```

---

## 6️⃣ 测试

1. 保存 `script.js` 文件
2. 在浏览器打开 `index.html`
3. 填写表单并提交
4. 检查：
   - ✅ 浏览器控制台显示 "Email sent successfully!"
   - ✅ 你的邮箱收到测试邮件

---

## 🎉 完成！

配置成功后：
- 每次有人提交表单，你都会收到邮件通知
- 免费版每月 200 封邮件额度（对个人网站完全够用）
- 邮件会发送到你连接的邮箱地址

---

## 📌 注意事项

### 如果使用 163 邮箱（需要 SMTP 配置）：

1. 去 163 邮箱开启 **SMTP 服务**
2. 获取 **授权码**（不是邮箱密码）
3. 在 EmailJS 添加 "Other" 服务时填写：
   - SMTP Server: `smtp.163.com`
   - Port: `465` (SSL) 或 `25` (非加密)
   - Username: `li_zhichao2022@163.com`
   - Password: 你的授权码（不是邮箱密码）

### 推荐用 Gmail 的原因：
- 配置简单，一键连接
- EmailJS 官方最佳支持
- 稳定性高，不容易被拦截

---

## 🆘 遇到问题？

### 控制台报错 "EmailJS is not defined"
- 检查 `index.html` 是否正确引入 EmailJS SDK
- 确保在 `<head>` 标签中有这一行：
  ```html
  <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
  ```

### 邮件发送失败
- 检查三个配置是否正确填写（没有多余空格）
- 在 EmailJS 后台检查服务状态是否正常
- 查看浏览器控制台的详细错误信息

### 邮件收不到
- 检查垃圾邮件文件夹
- 在 EmailJS 后台查看发送历史记录
- 确认邮箱服务连接正常

---

## 📚 更多资源

- EmailJS 官方文档：https://www.emailjs.com/docs/
- 视频教程：https://www.youtube.com/results?search_query=emailjs+tutorial
