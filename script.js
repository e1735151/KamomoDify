document.addEventListener('DOMContentLoaded', () => {

    const faqContainer = document.getElementById('faq-container');
    // クリックイベントのリスナー
    faqContainer.addEventListener('click', (e) => {
        const questionButton = e.target.closest('.faq-question');
        if (questionButton) {
            const currentItem = questionButton.parentElement;
            
            // クリックされた項目以外の開いている項目を閉じる
            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                if (openItem !== currentItem) {
                    openItem.classList.remove('open');
                }
            });

            // クリックされた項目の開閉を切り替える
            currentItem.classList.toggle('open');
        }
    });

    // --- カスタムカーソル (PC向け) ---
    // @mediaクエリで表示/非表示が制御されるため、ここでは動作のみ定義
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });

        const interactiveElements = document.querySelectorAll('a, button, summary');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
            });
        });

        document.body.addEventListener('mouseleave', () => {
            cursorDot.classList.add('is-hidden');
            cursorOutline.classList.add('is-hidden');
        });

        document.body.addEventListener('mouseenter', () => {
            cursorDot.classList.remove('is-hidden');
            cursorOutline.classList.remove('is-hidden');
        });
    }


    // --- ページ上部プログレスバー ---
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            // ゼロ除算を避ける
            const scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            progressBar.style.width = `${scrollProgress}%`;
        });
    }

    // --- モバイルメニュー開閉 ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        // メニュー項目クリックでメニューを閉じる
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        });
    }

    // --- ヒーローセクションのタイピングアニメーション ---
    const subtitleElement = document.getElementById('hero-subtitle');
    if (subtitleElement) {
        const textToType = subtitleElement.dataset.text;
        let index = 0;

        function type() {
            if (index < textToType.length) {
                subtitleElement.textContent += textToType.charAt(index);
                index++;
                setTimeout(type, 50); // タイピング速度
            }
        }
        // 少し遅れてタイピング開始
        setTimeout(type, 500);
    }


    // --- スクロールに合わせた要素の表示アニメーション ---
    const animatedElements = document.querySelectorAll('.scroll-reveal, .slide-in-from-left, .slide-in-from-right, .scroll-reveal-child');
    if (animatedElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // 一度表示されたら監視を解除
                }
            });
        }, {
            threshold: 0.05 // 要素が5%見えたら発火
        });

        animatedElements.forEach(el => revealObserver.observe(el));
    }
});
