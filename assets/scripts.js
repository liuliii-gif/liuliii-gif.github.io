// 粒子背景效果
class ParticleBackground {
  constructor() {
    this.canvas = document.getElementById('particles');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resize();
    this.init();
    this.animate();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    this.particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((particle, index) => {
      // 更新位置
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // 边界检测
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // 绘制粒子
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 255, 245, ${particle.opacity})`;
      this.ctx.fill();
      
      // 绘制连接线
      this.particles.forEach((otherParticle, otherIndex) => {
        if (index !== otherIndex) {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            this.ctx.beginPath();
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.lineTo(otherParticle.x, otherParticle.y);
            this.ctx.strokeStyle = `rgba(0, 255, 245, ${0.1 * (1 - distance / 120)})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// 打字机效果
class TypingEffect {
  constructor() {
    this.element = document.getElementById('typing-name');
    this.text = 'liutlini-gif';
    this.index = 0;
    this.speed = 150;
    this.typing();
  }

  typing() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.typing(), this.speed);
    }
  }
}

// 鼠标跟随光晕效果
class MouseGlow {
  constructor() {
    this.glow = document.getElementById('mouse-glow');
    this.active = false;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      if (!this.active) {
        this.glow.classList.add('active');
        this.active = true;
      }
      this.glow.style.left = e.clientX + 'px';
      this.glow.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mouseleave', () => {
      this.glow.classList.remove('active');
      this.active = false;
    });
  }
}

// 3D卡片翻转效果
class CardFlip {
  constructor() {
    this.cards = document.querySelectorAll('.skill-card');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    });
  }
}

// 复制邮箱功能
function copyEmail() {
  const email = 'liutlini@example.com';
  
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById('copy-toast');
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }).catch(err => {
    console.error('复制失败:', err);
  });
}

// 动态时间显示
class Clock {
  constructor() {
    this.element = document.getElementById('current-time');
    this.update();
    setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    this.element.textContent = now.toLocaleString('zh-CN', options);
  }
}

// 页面加载完成后初始化所有效果
document.addEventListener('DOMContentLoaded', () => {
  new ParticleBackground();
  new TypingEffect();
  new MouseGlow();
  new CardFlip();
  new Clock();
});