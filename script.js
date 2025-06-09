document.addEventListener('DOMContentLoaded', () => {

    // --- FAQデータ ---
    const faqData = [
        {
            question: "DifyはChatGPT以外にどのようなLLMをサポートしていますか？",
            answer: "<p>OpenAIのGPTシリーズに加え、Anthropic (Claudeシリーズ), Google (Gemini), Llama2 (オープンソース), Azure OpenAI, Hugging Face Hubなど、非常に幅広い主要LLMをサポートしています。これにより、コスト、パフォーマンス、特定のタスクへの適性など、様々な要件に応じて最適なモデルを柔軟に選択・切り替えできます。</p>"
        },
        {
            question: "より複雑な業務フローを自動化できますか？",
            answer: "<p>はい、もちろんです。Difyの<strong>ビジュアルワークフロービルダー</strong>を使えば、コーディングなしで複雑な業務プロセスを自動化できます。例えば、「顧客からの問い合わせ内容を判断」→「内容が緊急の場合、担当者に通知」→「それ以外の場合、ナレッジを参照して回答」といった条件分岐を含むフローを、ブロックを繋ぎ合わせるだけで構築できます。</p><img src='https://storage.googleapis.com/zenn-user-upload/4c79cd6016ab-20240625.png' alt='Difyのビジュアルワークフロービルダーの画面イラスト' class='generated-image'>"
        },
        {
            question: "エージェントが間違った答えをした場合の対策は？",
            answer: "<p>これはAI開発における重要な課題です。Difyは複数の仕組みでこれに対応します。</p><ol><li><strong>プロンプトエンジニアリング:</strong> 「指示」を明確にし、役割、制約、禁止事項を厳密に定義することが第一の防御線です。</li><li><strong>RAGによる接地:</strong> エージェントの知識源を検証済みの内部文書に限定することで、事実に基づかない発言（ハルシネーション）を大幅に抑制します。</li><li><strong>ロギングと監視:</strong> 全ての対話ログを確認し、エージェントがなぜそのように応答したかを分析できます。ユーザーからのフィードバックを収集し、改善点を発見できます。</li></ol>"
        }
    ];

    // --- FAQアコーディオン機能 (★★★ 更新部分 ★★★) ---
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer) {
        // FAQ項目をHTMLに挿入
        faqData.forEach(item => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item'; // 新しいクラス構造
            faqItem.innerHTML = `
                <button class="faq-question">
                    <span>${item.question}</span>
                    <svg class="faq-arrow w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div class="faq-answer">
                    <div class="faq-answer-content">
                        ${item.answer}
                    </div>
                </div>
            `;
            faqContainer.appendChild(faqItem);
        });

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
    }
    
    // --- モバイルメニューのトグル ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- ナビゲーションリンクのアクティブ状態管理 ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.getElementById('header').offsetHeight;

    const navObserver = new IntersectionObserver((entries) => {
        let currentActive = '';
        entries.forEach(entry => {
            if (entry.isIntersecting) {
               currentActive = entry.target.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActive}`) {
                link.classList.add('active');
            }
        });
    }, { rootMargin: `-${headerHeight}px 0px -40% 0px`, threshold: 0 });
    sections.forEach(section => navObserver.observe(section));

    // --- スクロールに合わせた要素の表示アニメーション ---
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-reveal, .slide-in-from-left, .slide-in-from-right, .scroll-reveal-child').forEach(el => revealObserver.observe(el));

    // --- ヒーローセクションのタイピングエフェクト ---
    const subtitleElement = document.getElementById('hero-subtitle');
    const textToType = "あらゆるビジネスを加速する、インテリジェントなAIアシスタント構築入門";
    let index = 0;
    function type() {
        if (index < textToType.length) {
            subtitleElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(type, 60); // 文字間のタイピング速度
        }
    }
    if (subtitleElement) {
        setTimeout(type, 1000); // ページロード後1秒で開始
    }

    // --- スクロールプログレスバー ---
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        if(progressBar) {
            progressBar.style.width = `${scrollProgress}%`;
        }
    });

    // --- カスタムカーソル ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        if(cursorDot) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
        }
        
        if(cursorOutline) {
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        }
    });

});
