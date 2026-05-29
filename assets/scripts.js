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

// 页面加载完成后初始化所有效果
document.addEventListener('DOMContentLoaded', () => {
  new TypingEffect();
  new MouseGlow();
  new SectionAnimator();
  new BackToTop();
});