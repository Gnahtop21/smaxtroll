document.addEventListener('DOMContentLoaded', function () {
    // Lấy các phần tử
    const openGiftBtn = document.getElementById('open-gift-btn');
    const backBtn = document.getElementById('back-btn');
    const introPage = document.getElementById('intro-page');
    const mainPage = document.getElementById('main-page');
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const musicBtn = document.getElementById('music-btn');
    const christmasMusic = document.getElementById('christmas-music');

    // Biến kiểm soát trạng thái nhạc
    let isMusicPlaying = false;

    // Xử lý nút mở quà
    openGiftBtn.addEventListener('click', function () {
        // Hiệu ứng chuyển trang
        introPage.classList.remove('active');
        introPage.style.display = 'none';
        mainPage.classList.add('active');
        mainPage.style.display = 'block';

        // Phát nhạc tự động khi vào trang chính
        if (!isMusicPlaying) {
            christmasMusic.play().then(() => {
                isMusicPlaying = true;
                musicBtn.innerHTML = '<i class="fas fa-pause"></i> Tạm dừng nhạc';
            }).catch(error => {
                console.log("Tự động phát nhạc bị chặn: ", error);
            });
        }
    });

    // Xử lý nút quay lại
    backBtn.addEventListener('click', function () {
        mainPage.classList.remove('active');
        mainPage.style.display = 'none';
        introPage.classList.add('active');
        introPage.style.display = 'block';
    });

    // Xử lý phong bì
    envelope.addEventListener('click', function () {
        // Ẩn phong bì
        envelope.style.display = 'none';

        // Hiển thị lá thư với hiệu ứng
        letter.style.display = 'block';
        letter.style.animation = 'fadeIn 1s ease';
    });

    // Xử lý lật trang thư
    letter.addEventListener('click', function () {
        letter.classList.toggle('flipped');
    });

    // Xử lý nút nhạc
    musicBtn.addEventListener('click', function () {
        if (isMusicPlaying) {
            christmasMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i> Phát nhạc Giáng Sinh';
            isMusicPlaying = false;
        } else {
            christmasMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-pause"></i> Tạm dừng nhạc';
            isMusicPlaying = true;
        }
    });

    // Thêm CSS động cho hiệu ứng
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Hiệu ứng cho cây thông
    const tree = document.querySelector('.tree');
    setInterval(() => {
        // Tạo đèn nhấp nháy trên cây thông
        const lights = ['🔴', '🟡', '🟢', '🔵', '🟣'];
        const randomLight = lights[Math.floor(Math.random() * lights.length)];

        // Tạo phần tử đèn
        const light = document.createElement('div');
        light.textContent = randomLight;
        light.style.position = 'absolute';
        light.style.fontSize = '1.2rem';

        // Vị trí ngẫu nhiên trên cây
        const left = Math.random() * 100;
        const top = 30 + Math.random() * 140;

        light.style.left = `${left}%`;
        light.style.top = `${top}px`;
        light.style.zIndex = '5';
        light.style.animation = 'twinkle 1.5s infinite alternate';

        tree.appendChild(light);

        // Xóa đèn sau 1.5 giây
        setTimeout(() => {
            if (light.parentNode) {
                light.parentNode.removeChild(light);
            }
        }, 1500);
    }, 800);

    // Thêm CSS cho hiệu ứng đèn nhấp nháy
    const twinkleStyle = document.createElement('style');
    twinkleStyle.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1.2); }
        }
    `;
    document.head.appendChild(twinkleStyle);

    // Hiệu ứng cho nút bấm
    openGiftBtn.addEventListener('mousedown', function () {
        this.style.transform = 'scale(0.95)';
    });

    openGiftBtn.addEventListener('mouseup', function () {
        this.style.transform = 'scale(1)';
    });

    // Tạo hiệu ứng confetti khi mở quà
    function createConfetti() {
        const confettiCount = 50;
        const colors = ['#ff4d4d', '#ffcc00', '#4CAF50', '#2196F3', '#9C27B0'];

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = '-10px';
            confetti.style.zIndex = '9999';
            confetti.style.opacity = '0.9';

            document.body.appendChild(confetti);

            // Animation
            const animation = confetti.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 2000 + Math.random() * 3000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });

            animation.onfinish = () => {
                confetti.remove();
            };
        }
    }

    // Kích hoạt confetti khi mở quà
    openGiftBtn.addEventListener('click', createConfetti);
});