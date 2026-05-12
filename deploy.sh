#!/bin/bash

# 与光同尘 - GitHub Pages 快速部署脚本

echo "🚀 与光同尘网站 - GitHub Pages 部署工具"
echo "=========================================="
echo ""

# 检查是否已经初始化 Git
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git branch -M main
fi

# 检查是否已配置远程仓库
if ! git remote | grep -q "origin"; then
    echo ""
    echo "⚠️  还没有配置 GitHub 远程仓库"
    echo "请先在 GitHub 创建仓库，然后输入你的 GitHub 用户名："
    read -p "GitHub 用户名: " github_username
    
    if [ -z "$github_username" ]; then
        echo "❌ 用户名不能为空"
        exit 1
    fi
    
    git remote add origin "https://github.com/$github_username/yokodojin-website.git"
    echo "✅ 已添加远程仓库: https://github.com/$github_username/yokodojin-website.git"
fi

# 显示当前状态
echo ""
echo "📋 当前文件状态："
git status --short

# 添加所有文件
echo ""
echo "📦 添加所有文件到暂存区..."
git add .

# 询问提交信息
echo ""
read -p "💬 输入提交信息（直接回车使用默认信息）: " commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update website - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# 提交
echo ""
echo "💾 提交更改..."
git commit -m "$commit_message"

# 推送到 GitHub
echo ""
echo "🚀 推送到 GitHub..."
git push -u origin main

# 显示结果
echo ""
echo "=========================================="
echo "✅ 部署完成！"
echo ""
echo "你的网站将在 1-2 分钟内更新："

# 尝试获取远程仓库 URL
remote_url=$(git remote get-url origin)
if [[ $remote_url =~ github\.com[/:]([^/]+)/([^/\.]+) ]]; then
    username="${BASH_REMATCH[1]}"
    repo="${BASH_REMATCH[2]}"
    echo "🌐 网址: https://$username.github.io/$repo/"
    echo "📊 仓库: https://github.com/$username/$repo"
fi

echo ""
echo "💡 提示："
echo "   - 如果是首次部署，请去 GitHub 仓库 Settings → Pages 启用 GitHub Pages"
echo "   - 等待 1-2 分钟后访问网站"
echo "   - 检查表单功能是否正常（确保已配置 EmailJS）"
echo ""
echo "=========================================="
