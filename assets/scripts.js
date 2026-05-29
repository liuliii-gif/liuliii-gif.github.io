// 打字机效果
class TypingEffect {
  constructor() {
    this.element = document.getElementById('typing-name');
    this.text = 'liutlini-gif';
    this.index = 0;
    this.speed = 120;
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

// 动态状态切换
class StatusRotator {
  constructor() {
    this.statusElement = document.getElementById('status-text');
    this.statuses = [
      "🚀 Currently building open-source tools",
      "💻 Open to opportunities",
      "📚 Learning Rust and WebAssembly",
      "👨‍💻 Contributing to open source"
    ];
    this.currentIndex = 0;
    this.interval = 3000;
    this.init();
  }

  init() {
    this.rotateStatus();
    setInterval(() => this.rotateStatus(), this.interval);
  }

  rotateStatus() {
    this.statusElement.style.opacity = 0;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.statuses.length;
      this.statusElement.textContent = this.statuses[this.currentIndex];
      this.statusElement.style.opacity = 1;
    }, 500);
  }
}

// 数字滚动动画
class NumberCounter {
  constructor() {
    this.counters = document.querySelectorAll('.stat-number');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 1500;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(target * easeOut);
      
      if (target >= 1000) {
        element.textContent = (currentCount / 1000).toFixed(1) + 'k';
      } else {
        element.textContent = currentCount;
      }
      
      if (frame === totalFrames) {
        clearInterval(counter);
        element.textContent = target >= 1000 ? (target / 1000).toFixed(1) + 'k' : target;
      }
    }, frameDuration);
  }
}

// 技能进度条动画
class SkillProgressAnimator {
  constructor() {
    this.progressBars = document.querySelectorAll('.progress-fill');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const percentage = entry.target.getAttribute('data-percentage');
            entry.target.style.setProperty('--progress-width', percentage + '%');
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    this.progressBars.forEach(bar => {
      observer.observe(bar);
    });
  }
}

// GitHub Stats卡片加载
class GitHubStatsLoader {
  constructor() {
    this.skeleton = document.querySelector('.stats-skeleton');
    this.content = document.querySelector('.stats-content');
    this.images = document.querySelectorAll('.github-stats-img');
    this.loadedCount = 0;
    this.init();
  }

  init() {
    this.images.forEach(img => {
      img.onload = () => {
        this.loadedCount++;
        if (this.loadedCount === this.images.length) {
          this.showContent();
        }
      };
      
      img.onerror = () => {
        this.loadedCount++;
        if (this.loadedCount === this.images.length) {
          this.showContent();
        }
      };
    });
  }

  showContent() {
    if (this.skeleton) {
      this.skeleton.style.display = 'none';
    }
    if (this.content) {
      this.content.style.display = 'flex';
      setTimeout(() => {
        this.content.style.opacity = '1';
      }, 50);
    }
  }
}

// 表单提交处理
class ContactFormHandler {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.toast = document.getElementById('copy-toast');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.showToast();
        this.form.reset();
      });
    }
  }

  showToast() {
    if (this.toast) {
      this.toast.textContent = 'Message sent! ✅';
      this.toast.classList.add('show');
      
      setTimeout(() => {
        this.toast.classList.remove('show');
      }, 3000);
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

// IntersectionObserver 滚动淡入动画
class SectionAnimator {
  constructor() {
    this.sections = document.querySelectorAll('section');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.sections.forEach((section) => {
      observer.observe(section);
    });
  }
}

// 回到顶部按钮
class BackToTop {
  constructor() {
    this.button = document.getElementById('back-to-top');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        this.button.classList.add('show');
      } else {
        this.button.classList.remove('show');
      }
    });

    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// 页面加载完成后初始化所有效果
document.addEventListener('DOMContentLoaded', () => {
  new TypingEffect();
  new StatusRotator();
  new NumberCounter();
  new SkillProgressAnimator();
  new GitHubStatsLoader();
  new ContactFormHandler();
  new MouseGlow();
  new SectionAnimator();
  new BackToTop();
});
