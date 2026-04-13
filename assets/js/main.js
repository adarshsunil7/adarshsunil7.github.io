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
      const { skillsContent } = this.elements;
      if (!skillsContent) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
              bar.style.width = bar.getAttribute('aria-valuenow') + '%';
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.8 });

      observer.observe(skillsContent);
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

      this.elements.sections.forEach(section => {
        revealObserver.observe(section);
      });
    },

    markPageLoaded() {
      document.body.classList.remove('fade-out');
      document.body.classList.add('fade-in');
    }
  };

  document.addEventListener('DOMContentLoaded', () => App.init());
})();
