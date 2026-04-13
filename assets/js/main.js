/**
 * iPortfolio - Refactored JavaScript
 * Modular Architecture with improved structure
 */

(function() {
  'use strict';

  const App = {
    elements: {},
    state: {
      isMobileNavActive: false,
      scrollPosition: 0
    },

    init() {
      this.cacheElements();
      this.bindEvents();
      this.initAnimations();
      this.initParallax();
      this.initScrollReveal();
      this.initContactForm();
      this.markPageLoaded();
    },

    cacheElements() {
      this.elements = {
        body: document.body,
        header: document.getElementById('header'),
        hero: document.getElementById('hero'),
        navbar: document.getElementById('navbar'),
        main: document.getElementById('main'),
        backToTop: document.querySelector('.back-to-top'),
        mobileNavToggle: document.querySelector('.mobile-nav-toggle'),
        navLinks: document.querySelectorAll('.nav-link'),
        typed: document.querySelector('.typed'),
        skillsContent: document.querySelector('.skills-content'),
        sections: document.querySelectorAll('section')
      };
    },

    bindEvents() {
      window.addEventListener('load', () => this.onPageLoad());
      window.addEventListener('scroll', () => this.onScroll(), { passive: true });
      document.addEventListener('click', (e) => this.handleClick(e));
    },

    onPageLoad() {
      this.handleHashNavigation();
      this.initTyped();
      this.initSkillsAnimation();
      this.initAOS();
      this.updateBackToTop();
    },

    handleHashNavigation() {
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          setTimeout(() => this.scrollTo(target), 100);
        }
      }
    },

    handleClick(e) {
      const target = e.target;
      
      if (target.closest('.mobile-nav-toggle')) {
        this.toggleMobileNav();
      }
      
      if (target.closest('.scrollto')) {
        e.preventDefault();
        const link = target.closest('.scrollto');
        const hash = link.getAttribute('href');
        
        if (hash && document.querySelector(hash)) {
          if (this.state.isMobileNavActive) {
            this.toggleMobileNav();
          }
          this.scrollTo(document.querySelector(hash));
        }
      }
    },

    toggleMobileNav() {
      this.state.isMobileNavActive = !this.state.isMobileNavActive;
      this.elements.body.classList.toggle('mobile-nav-active', this.state.isMobileNavActive);
      
      if (this.mobileNavToggle) {
        this.mobileNavToggle.classList.toggle('bi-list', !this.state.isMobileNavActive);
        this.mobileNavToggle.classList.toggle('bi-x', this.state.isMobileNavActive);
      }
    },

    scrollTo(element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    },

    onScroll() {
      this.updateActiveNavLink();
      this.updateBackToTop();
      this.updateParallax();
    },

    updateActiveNavLink() {
      const position = window.scrollY + 200;
      const navLinks = document.querySelectorAll('.nav-link');

      navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (!section) return;

        const isInView = position >= section.offsetTop && 
                         position <= section.offsetTop + section.offsetHeight;
        
        link.classList.toggle('active', isInView);
      });
    },

    updateBackToTop() {
      const { backToTop } = this.elements;
      if (backToTop) {
        backToTop.classList.toggle('active', window.scrollY > 100);
      }
    },

    initTyped() {
      const { typed } = this.elements;
      if (!typed) return;

      const strings = typed.dataset.typedItems.split(',');

      new Typed('.typed', {
        strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    },

    initSkillsAnimation() {
      const skillCards = document.querySelectorAll('.skill-card');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) {
              const width = progressBar.dataset.width;
              setTimeout(() => {
                progressBar.style.width = width + '%';
                progressBar.classList.add('animated');
              }, 100);
            }
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      skillCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(card);
      });
    },

    initAOS() {
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 800,
          easing: 'ease-out-cubic',
          once: true,
          mirror: false,
          offset: 50,
          anchorPlacement: 'top-bottom'
        });
      }
    },

    initParallax() {
      if (!this.elements.hero) return;
      
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        this.elements.hero.style.backgroundPositionY = `calc(50% + ${rate}px)`;
      }, { passive: true });
    },

    updateParallax() {},

    initScrollReveal() {
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        section.classList.add('animate-on-scroll');
      });

      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      };

      const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

      sections.forEach(section => {
        revealObserver.observe(section);
      });
    },

    initContactForm() {
      const form = document.querySelector('.contact-form');
      if (!form) return;

      const formStatus = document.createElement('div');
      formStatus.className = 'form-status';
      form.appendChild(formStatus);

      const submitBtn = form.querySelector('.btn-submit');
      const originalBtnHTML = submitBtn.innerHTML;

      const inputs = form.querySelectorAll('input, textarea');

      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          formStatus.innerHTML = '';
          formStatus.className = 'form-status';
        });
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        formStatus.innerHTML = '<div class="loading"><span class="spinner"></span> Sending...</div>';
        formStatus.className = 'form-status';

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span><i class="bx bx-loader-alt bx-spin"></i>';

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            formStatus.innerHTML = '<div class="success"><i class="bx bx-check-circle"></i> Message sent successfully! I\'ll get back to you soon.</div>';
            formStatus.className = 'form-status success';
            form.reset();
            
            inputs.forEach(input => input.classList.remove('has-value'));

            setTimeout(() => {
              formStatus.innerHTML = '';
              formStatus.className = 'form-status';
            }, 5000);
          } else {
            formStatus.innerHTML = '<div class="error"><i class="bx bx-error-circle"></i> Something went wrong. Please try again.</div>';
            formStatus.className = 'form-status error';
          }
        } catch (error) {
          formStatus.innerHTML = '<div class="error"><i class="bx bx-error-circle"></i> Something went wrong. Please try again.</div>';
          formStatus.className = 'form-status error';
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      });
    },

    markPageLoaded() {
      document.body.classList.remove('fade-out');
      document.body.classList.add('fade-in');
    }
  };

  document.addEventListener('DOMContentLoaded', () => App.init());
})();
