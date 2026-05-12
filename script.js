// ===================================
// 与光同尘 - JavaScript 交互功能
// ===================================

// ========== EmailJS 配置 ==========
// ✅ EmailJS 已配置完成
const EMAILJS_CONFIG = {
    PUBLIC_KEY: '-1Zh6XVtgr6AxD1o9',    // ✅ 已配置
    SERVICE_ID: 'service_nj70ojs',      // ✅ 已配置
    TEMPLATE_ID: 'template_a99r4nw'     // ✅ 已配置
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化 EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('EmailJS initialized successfully');
    } else {
        console.error('EmailJS SDK not loaded. Please check your internet connection.');
    }
    
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initContactForm();
    initVideoPlaceholders();
});

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll(
        '.problem-card, .service-card, .case-card, .why-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// 头部滚动效果
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// 联系表单处理
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                company: document.getElementById('company').value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value
            };

            // 验证表单
            if (!validateForm(formData)) {
                return;
            }

            // 显示提交状态
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;

            // 模拟提交（实际使用时需要替换为真实的API调用）
            simulateFormSubmission(formData)
                .then(response => {
                    showSuccessMessage();
                    form.reset();
                })
                .catch(error => {
                    showErrorMessage();
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}

// 表单验证
function validateForm(data) {
    // 必填项检查
    if (!data.company || !data.name || !data.email) {
        alert('必須項目を入力してください。');
        return false;
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('正しいメールアドレスを入力してください。');
        return false;
    }

    return true;
}

// 使用 EmailJS 发送邮件（替换原来的模拟提交）
function simulateFormSubmission(data) {
    // 检查 EmailJS 是否已配置
    if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
        EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' || 
        EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
        
        console.warn('EmailJS not configured yet. Using demo mode.');
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Demo mode - Form data:', data);
                resolve({ success: true, mode: 'demo' });
            }, 1500);
        });
    }

    // 真实的 EmailJS 发送
    return emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
            company: data.company,
            name: data.name,
            email: data.email,
            phone: data.phone || '未入力',
            interest: data.interest || '未選択',
            message: data.message || '（内容なし）'
        }
    ).then(
        (response) => {
            console.log('Email sent successfully!', response.status, response.text);
            return { success: true, mode: 'real' };
        },
        (error) => {
            console.error('Email sending failed:', error);
            throw error;
        }
    );
}

// 显示成功消息
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: #10b981;
            color: white;
            padding: 1.5rem 2.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideDown 0.3s ease-out;
        ">
            <strong>送信完了</strong><br>
            お問い合わせありがとうございます。<br>
            担当者より2営業日以内にご連絡いたします。
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => message.remove(), 300);
    }, 4000);
}

// 显示错误消息
function showErrorMessage() {
    const message = document.createElement('div');
    message.className = 'error-message';
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: #ef4444;
            color: white;
            padding: 1.5rem 2.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideDown 0.3s ease-out;
        ">
            <strong>送信エラー</strong><br>
            申し訳ございません。送信に失敗しました。<br>
            しばらく時間をおいて再度お試しください。
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => message.remove(), 300);
    }, 4000);
}

// 视频占位符点击效果
function initVideoPlaceholders() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder, .video-placeholder-small');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            // 这里可以实现实际的视频播放功能
            alert('ここに実際の動画を埋め込むことができます。\nYouTube、Vimeo、または自社ホスティングの動画リンクを設定してください。');
            
            // 实际使用时，可以这样嵌入YouTube视频：
            /*
            const videoId = 'YOUR_YOUTUBE_VIDEO_ID';
            this.innerHTML = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                ></iframe>
            `;
            */
        });
    });
}

// 添加必要的CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
    }
`;
document.head.appendChild(style);

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 统计追踪（可选 - Google Analytics集成）
function trackEvent(category, action, label) {
    // 如果使用Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    console.log('Event tracked:', { category, action, label });
}

// 导出供其他脚本使用
window.yokodojin = {
    trackEvent: trackEvent
};

// ===== LINE QR & copy helpers =====
document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.getElementById('copyLineIdBtn');
    const lineIdEl = document.getElementById('lineId');
    const qrImage = document.getElementById('lineQrImage');

    if (copyBtn && lineIdEl) {
        copyBtn.addEventListener('click', function() {
            const idText = lineIdEl.textContent.trim();
            if (!navigator.clipboard) {
                // Fallback
                const tmp = document.createElement('textarea');
                tmp.value = idText;
                document.body.appendChild(tmp);
                tmp.select();
                try {
                    document.execCommand('copy');
                    showTemporaryToast('LINE ID をコピーしました');
                } catch (err) {
                    alert('コピーに失敗しました。手動でコピーしてください: ' + idText);
                }
                tmp.remove();
                return;
            }

            navigator.clipboard.writeText(idText).then(() => {
                showTemporaryToast('LINE ID をコピーしました');
            }).catch(() => {
                alert('コピーに失敗しました。手動でコピーしてください: ' + idText);
            });
        });
    }

    // QR modal preview
    if (qrImage) {
        const modal = createQrModal();
        qrImage.addEventListener('click', function() {
            openQrModal(qrImage.src, modal);
        });
    }
});

function createQrModal() {
    const modal = document.createElement('div');
    modal.className = 'qr-modal';
    modal.innerHTML = `
        <div class="qr-modal-content" role="dialog" aria-modal="true">
            <img src="" alt="LINE QR code large" id="qrModalImg">
        </div>
    `;
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeQrModal(modal);
        }
    });
    document.body.appendChild(modal);
    return modal;
}

function openQrModal(src, modal) {
    const img = modal.querySelector('#qrModalImg');
    img.src = src;
    modal.classList.add('open');
    // focus trap simple
    setTimeout(() => modal.focus && modal.focus(), 10);
}

function closeQrModal(modal) {
    modal.classList.remove('open');
}

function showTemporaryToast(text) {
    const t = document.createElement('div');
    t.className = 'temp-toast';
    t.textContent = text;
    Object.assign(t.style, {
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '0.6rem 1rem',
        borderRadius: '0.5rem',
        zIndex: 9999
    });
    document.body.appendChild(t);
    setTimeout(() => t.style.opacity = '0', 2500);
    setTimeout(() => t.remove(), 3000);
}
