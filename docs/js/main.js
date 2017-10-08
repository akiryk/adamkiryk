'use strict';

var app = {
  scrollController: null,

  init: function init() {
    document.getElementById('primaryLogo').classList.add('ready');
    this.initTweens();
    // this.initLogoAnimation();
    this.initScrollMagic();
    this.initNav();
  },
  initLogoAnimation: function initLogoAnimation() {
    var _this = this;

    this.container = document.getElementById('primaryLogo');
    var animData = {
      container: this.container,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'dataFranconia.json'
    };

    var startAnimation = function startAnimation() {
      _this.container.classList.add('ready');
      _this.anim.play();
    };

    this.anim = bodymovin.loadAnimation(animData);
    this.anim.addEventListener('DOMLoaded', startAnimation);
  },
  getLogoOffsetX: function getLogoOffsetX() {
    var width = window.innerWidth;
    switch (true) {
      case width > 1400:
        return -600;

      case width > 1100:
        return -550;

      case width > 800:
        return -550;

      default:
        return 0;
    }
  },
  initTweens: function initTweens() {
    // const offsetX = this.getLogoOffsetX();
    // TweenLite.to(primaryLogo, .6, {x: offsetX, delay: 1, ease:Sine.easeInOut})
    TweenLite.from(primaryLogo, 1, { opacity: '0', x: 400, scale: 0.5, delay: 0.2 });
    TweenLite.from(introHeading, 2, { opacity: '0', delay: 1 });
    TweenLite.from(introBody, 1, { opacity: '0', delay: 1.5 });
  },
  initIntroNav: function initIntroNav() {
    var nav = document.querySelectorAll('.intro-nav__menu-link'),
        navList = Array.apply(null, nav);

    navList.forEach(function (linkElement) {
      var anchor = linkElement.getAttribute('href');
      linkElement.addEventListener('click', function (e) {
        e.preventDefault();
        TweenMax.to(window, 1, {
          scrollTo: {
            y: anchor
          },
          ease: Power3.easeOut
        });
      });
    });
  },
  initNav: function initNav() {
    var nav = document.querySelectorAll('.navbar__menu-link'),
        navList = Array.apply(null, nav);
    // navHeight = document.getElementById('primaryNav').offsetHeight;
    navList.forEach(function (linkElement) {
      var anchor = linkElement.getAttribute('href');
      linkElement.addEventListener('click', function (e) {
        console.log();
        e.preventDefault();
        TweenMax.to(window, 1, {
          scrollTo: {
            y: anchor,
            offsetY: window.innerHeight / 2.5
          },
          ease: Power3.easeOut
        });
      });
    });
  },
  playLogoIn: function playLogoIn() {
    bodymovin.setDirection(1);
    this.anim.play();
    // TweenMax.to('#primaryLogo', 0.3, {
    //   opacity: 1.0,
    // })
  },
  playLogoOut: function playLogoOut() {
    bodymovin.setDirection(-1);
    this.anim.play();
    // this.anim.playSegments([24,60], true);
    // TweenMax.to('#primaryLogo', 0.2, {
    //   opacity: 0.0,
    // })
  },
  initScrollMagic: function initScrollMagic() {
    var _this2 = this;

    this.scrollController = new ScrollMagic.Controller();

    var introContent = document.getElementById('introContent');
    var introFadeOut = TweenMax.to(introContent, 0.7, {
      opacity: 0.0,
      ease: Linear.easeNone
    });
    var introScene = new ScrollMagic.Scene({
      triggerElement: '#introBody',
      offset: 500
    }).setTween(introFadeOut).addIndicators().addTo(this.scrollController);

    // const logo = document.getElementById('primaryLogo');

    // const logoScene = new ScrollMagic.Scene({
    //   triggerElement: '#primaryLogo',
    //   duration: window.innerHeight,
    // })
    //   .setPin(logo, { pushFollowers: false })
    //   .addTo(this.scrollController)
    // .on("end", (e) => {
    //   e.scrollDirection === 'FORWARD' && this.playLogoOut()
    //   e.scrollDirection === 'REVERSE' && this.playLogoIn()
    // })


    var works = document.getElementById('work'),
        workExamples = Array.apply(null, works.querySelectorAll('.works__item'));

    workExamples.forEach(function (workItem) {
      var tween = TweenMax.from(workItem, 0.3, {
        autoAlpha: 0,
        scale: 0.5,
        y: '+=30',
        x: '+=200',
        ease: Linear.easeNone
      });
      var scene = new ScrollMagic.Scene({
        triggerElement: workItem,
        triggerHook: .9
      }).setTween(tween).addTo(_this2.scrollController);
    });

    /**
     * Arguments for ScrollMagic Scene
     *
     * @param {element} triggerElement,
          the optional DOM element that triggers animation
          defines the start of the scene.
     * @param {Number} duration,
          the distance in pixels between start and end of animation or pinning.
          If used, this number overrides whatever duration is passed to the Tween.
     * @param {Number} offset,
          distance from the trigger element (or top of page if no trigger element is specified) and start of animation
     * @param {Boolean} reverse,
          reverse the animation on scroll up or not
     * @param {Number} triggerHook,
          0-1 percentage from top of page to bottom for where the start is placed once triggerElement enters page. 0=top of page; 1=bottom.
     */
  }
};

app.init();
//# sourceMappingURL=main.js.map
