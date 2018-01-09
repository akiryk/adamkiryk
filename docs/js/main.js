'use strict';
/*
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var app = {
  scrollController: null,

  /**
   * Initialize the app
   *
   */
  init: function init() {
    document.documentElement.classList.remove('fade-in');
    this.animatePrimaryLogo();
    this.initSmoothScrolling();
    this.openingAnimations();
    this.introSection();
    this.skillsSection();
    this.caseStudiesSection();
    this.workSection();
  },


  /**
   * Opening animations
   *
   */
  openingAnimations: function openingAnimations() {
    TweenLite.from(primaryNav, 1.2, { opacity: '0', ease: Power2.easeIn, delay: 1 });
    TweenLite.from(primaryLogo, 1.2, { opacity: '0', ease: Power2.easeIn });
    TweenLite.from('#introHeading .site-heading', 1.2, { x: 150, opacity: '0', ease: Power2.easeOut });
    TweenLite.from('#introHeading .site-subheading', 1.2, { x: -100, opacity: '0', ease: Power2.easeOut, delay: .25 });
    TweenLite.from(introHeading, 1.25, { y: 75, ease: Power1.easeOut, delay: 1.25 });
    TweenLite.from(introBody, 1.25, { opacity: '0', y: 75, ease: Power1.easeOut, delay: 1.25 });
  },


  /**
   * Animate the logo
   *
   */
  animatePrimaryLogo: function animatePrimaryLogo() {
    var kTpMask = document.getElementById("mask1"),
        kBmMask = document.getElementById("mask2"),
        aLtMask = document.getElementById("mask3"),
        aRtMask = document.getElementById("mask4"),
        tl = new TimelineMax();

    // Reset all masks so that logo is completely hidden
    tl.set(aLtMask, { x: -230, y: 230 }).set(aRtMask, { y: -300 }).set(kBmMask, { x: 115, y: 115 }).set(kTpMask, { x: -170 });

    // Animate masks to reveal logo
    tl.to(aLtMask, 0.5, { x: 0, y: 0, ease: Power3.easeOut, delay: .5 }).to(aRtMask, 1.0, { y: 0, ease: Power3.easeOut }, "-=.25").to(kBmMask, 0.5, { x: 0, y: 0, ease: Power3.easeOut }, "-=.75").to(kTpMask, 0.5, { x: 0, ease: Power3.easeOut }, "-=.6");
  },


  /**
   * Intro section animations
   *
   */
  introSection: function introSection() {
    this.scrollController = new ScrollMagic.Controller();
    var introFadeOut = TweenLite.to(intro, .7, {
      opacity: 0.0,
      ease: Linear.easeNone
    });

    this.createScrollMagicScene({
      trigger: '#introTrigger',
      tween: introFadeOut,
      triggerHook: 0,
      duration: 200,
      offset: 300,
      indicators: true
    });
  },


  /**
   * Skills section animations
   *
   */
  skillsSection: function skillsSection() {
    var titleParams = { y: 100, opacity: 0, ease: Power1.easeOut },
        skillsParams = { y: 100, opacity: 0, ease: Power1.easeOut, delay: .25 };

    var titleTween = TweenLite.from('#skills .section-title', .5, titleParams),
        skillsTween = TweenLite.from("#skills .hp-skills", .5, skillsParams);
    // skillsTween = TweenMax.staggerFrom("#skills .hp-skills__skill", .5, skillsParams, .25);

    this.createScrollMagicScene({ trigger: '#skills', tween: titleTween });
    this.createScrollMagicScene({ trigger: '#skills', tween: skillsTween });
  },


  /**
   * Case studies section animations
   *
   */
  caseStudiesSection: function caseStudiesSection() {
    var _this = this;

    var titleParams = { y: 200, opacity: 0, ease: Power1.easeOut };
    var titleTween = TweenLite.from('#case-studies .section-title', 1, titleParams);

    var titleScene = new ScrollMagic.Scene({
      triggerElement: '#case-studies',
      triggerHook: .5
    }).setTween(titleTween).addIndicators().addTo(this.scrollController);

    var params = {
      number: { y: 200, opacity: 0, ease: Power1.easeOut },
      copy: { y: 300, opacity: 0, ease: Power1.easeOut, delay: .25 },
      image: { y: 400, opacity: 0, ease: Power1.easeOut, delay: .5 }
    };

    var createScenes = function createScenes(trigger, _ref) {
      var number = _ref.number,
          copy = _ref.copy,
          image = _ref.image;

      _this.createScrollMagicScene({ trigger: trigger, tween: copy, triggerHook: .75 });
      _this.createScrollMagicScene({ trigger: trigger, tween: number, triggerHook: .75 });
      _this.createScrollMagicScene({ trigger: trigger, tween: image, triggerHook: .75 });
    };

    var ceTweens = getTweens(params, '#case-study-ce');
    var cpTweens = getTweens(params, '#case-study-cp');
    var didjaTweens = getTweens(params, '#case-study-didja');

    createScenes('#case-study-ce', ceTweens);
    createScenes('#case-study-cp', cpTweens);
    createScenes('#case-study-didja', didjaTweens);

    function getTweens(params, el) {
      var numberTween = TweenLite.from(el + ' .hp-case-study__number', 1, params.number);
      var copyTween = TweenLite.from(el + ' .hp-case-study__copy', 1, params.copy);
      var imageTween = TweenLite.from(el + ' .hp-case-study__image', 1, params.image);

      return {
        number: numberTween,
        copy: copyTween,
        image: imageTween
      };
    }
  },


  /**
   * Work section animations
   *
   */
  workSection: function workSection() {
    var titleParams = { y: 100, opacity: 0, ease: Power1.easeOut },
        params = { y: 100, opacity: 0, ease: Power1.easeOut, delay: .25 };

    var titleTween = TweenLite.from('#work .section-title', .5, titleParams),
        workTween = TweenLite.from("#work .hp-work", .5, params);
    // skillsTween = TweenMax.staggerFrom("#skills .hp-skills__skill", .5, skillsParams, .25);

    this.createScrollMagicScene({ trigger: '#work', tween: titleTween });
    this.createScrollMagicScene({ trigger: '#work', tween: workTween });
  },


  /**
   *
   *
   */
  createScrollMagicScene: function createScrollMagicScene(_ref2) {
    var _ref2$tween = _ref2.tween,
        tween = _ref2$tween === undefined ? null : _ref2$tween,
        _ref2$trigger = _ref2.trigger,
        trigger = _ref2$trigger === undefined ? null : _ref2$trigger,
        _ref2$triggerHook = _ref2.triggerHook,
        triggerHook = _ref2$triggerHook === undefined ? 0.5 : _ref2$triggerHook,
        _ref2$duration = _ref2.duration,
        duration = _ref2$duration === undefined ? 0 : _ref2$duration,
        _ref2$offset = _ref2.offset,
        offset = _ref2$offset === undefined ? 0 : _ref2$offset,
        _ref2$reverse = _ref2.reverse,
        reverse = _ref2$reverse === undefined ? true : _ref2$reverse,
        _ref2$indicators = _ref2.indicators,
        indicators = _ref2$indicators === undefined ? false : _ref2$indicators;

    var scene = new ScrollMagic.Scene({
      triggerElement: trigger,
      triggerHook: triggerHook,
      duration: duration,
      offset: offset,
      reverse: reverse
    });
    scene.setTween(tween).addTo(this.scrollController);
    if (indicators) {
      scene.addIndicators();
    }
    return scene;
  },


  /**
   * Smooth scrolling
   *
   */
  initSmoothScrolling: function initSmoothScrolling() {
    // const navLinks = [...document.querySelectorAll('.navbar__menu-link')];
    var anchors = [].concat(_toConsumableArray(document.querySelectorAll('a'))).filter(function (anchor) {
      return anchor.getAttribute('href').match(/^#/);
    });
    anchors.forEach(function (anchor) {
      enableSmoothScrolling(anchor);
    });

    function enableSmoothScrolling(anchorLink) {
      var href = anchorLink.getAttribute('href');
      anchorLink.addEventListener('click', function (e) {
        e.preventDefault();
        setScrollWithFocusTween(href);
      });
    }

    //Set focus on the anchor once it's reached for better keyboard navigation.
    function setScrollWithFocusTween(href) {
      var dest = document.querySelector(href);
      dest.classList.add('smooth-scroll-to');
      dest.setAttribute('tabindex', '-1');
      TweenLite.to(window, 1, {
        scrollTo: { y: href },
        onComplete: function onComplete() {
          dest.focus();
        }
      });
    }
  }
};

TweenLite && app.init();
//# sourceMappingURL=main.js.map
