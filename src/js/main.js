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

const app = {
  scrollController: null,

  init() {
    document.documentElement.classList.remove('fade-in');
    this.animatePrimaryLogo();
    this.initSmoothScrolling();
    this.openingAnimations();
    this.introSection();
    this.skillsSection();
    this.workExperienceTitle();
    this.projectsSection();
  },

  openingAnimations() {
    TweenMax.from(primaryNav, 1.2, {opacity: '0', ease: Power2.easeIn, delay: 1 });
    TweenMax.from(primaryLogo, 1.2, {opacity: '0', ease: Power2.easeIn });
    TweenMax.from('#introHeading .site-heading', 1.2, {left: 150, opacity: '0', ease: Power2.easeOut })
    TweenMax.from('#introHeading .site-subheading', 1.2, {left: -100, opacity: '0', ease: Power2.easeOut, delay: .25 })
    TweenMax.from(introHeading, 1.25, {top: 75, ease: Power1.easeOut, delay: 1.25});
    TweenMax.from(introBody, 1.25, {opacity:'0', top:75, ease: Power1.easeOut, delay: 1.25});
  },

  animatePrimaryLogo() {
   const kTpMask = document.getElementById("mask1"),
      kBmMask = document.getElementById("mask2"),
      aLtMask = document.getElementById("mask3"),
      aRtMask = document.getElementById("mask4"),
      tl = new TimelineMax();

    // Reset all masks so that logo is completely hidden
    tl.set(aLtMask, {x: -230, y: 230})
      .set(aRtMask, {y: -300})
      .set(kBmMask, {x: 115, y:115})
      .set(kTpMask, {x: -170});

    // Animate masks to reveal logo
    tl.to(aLtMask, 0.5, {x:0, y:0, ease: Power3.easeOut, delay: .5})
      .to(aRtMask, 1.0, {y:0, ease: Power3.easeOut}, "-=.25")
      .to(kBmMask, 0.5, {x: 0, y: 0, ease: Power3.easeOut}, "-=.75")
      .to(kTpMask, 0.5, {x: 0, ease: Power3.easeOut}, "-=.6")
  },

  /**
   * Intro section animations
   *
   */
  introSection() {
    this.scrollController = new ScrollMagic.Controller();
    const introFadeOut = TweenMax.to(intro, .7, {
          opacity: 0.0,
          ease: Linear.easeNone
        })

    this.createScrollMagicScene(
      {
        trigger: '#introTrigger',
        tween: introFadeOut,
        triggerHook: 0,
        duration: 200,
        offset: 300,
        indicators: false,
      }
    )
  },

  /**
   * Skills section animations
   *
   */
  skillsSection() {
    const titleParams = { top: 100, opacity: 0, ease:Power1.easeOut },
          skillsParams = { top: 200, opacity: 0, ease:Power1.easeOut, delay: .25 };

    const titleTween = TweenMax.from('#skills-title', .5, titleParams),
          skillsTween = TweenMax.from('#skills-list', .5, skillsParams);
          // skillsTween = TweenMax.staggerFrom("#skills .hp-skills__skill", .5, skillsParams, .25);

    this.createScrollMagicScene({ trigger: '#skills', tween: titleTween })
    this.createScrollMagicScene({ trigger: '#skills', tween: skillsTween })

  },

  /**
   * Animate the work experience title section
   */
  workExperienceTitle() {
    const titleParams = { top: 200, opacity: 0, ease:Power1.easeOut };
    const titleTween = TweenMax.from('#work-experience-title', 1, titleParams);
    this.createScrollMagicScene({trigger: '#work-experience', tween: titleTween});
  },

  /**
   * Handle animations for the project sections
   * There are several projects, and each one has three elements to animate.
   *
   */
  projectsSection() {
    const params = {
      // number: {transform: 'translateY(200px)', opacity: 0, ease:Power1.easeOut },
      // copy: { transform: 'translateY(300px)', opacity: 0, ease:Power1.easeOut, delay:.25 },
      // image: { transform: 'translateY(400px)', opacity: 0, ease:Power1.easeOut, delay: .5 }
      number: {top: 200, opacity: 0, ease:Power1.easeOut },
      copy: { top: 300, opacity: 0, ease:Power1.easeOut, delay:.25 },
      image: { top: 400, opacity: 0, ease:Power1.easeOut, delay: .5 }
    }

    const projectsArray = [...document.querySelectorAll('.hp-project')];

    projectsArray.forEach(project => {
      const id = '#' + project.getAttribute('id'),
            tweens = getTweens(params, id);
      createProjectScenes(id, tweens);
    });

    // Each project requires three distinct Scenes, one each for
    // the number, the copy, and the image.
    function createProjectScenes(trigger, {number, copy, image}){
      app.createScrollMagicScene({trigger: trigger, tween: copy, triggerHook: .75});
      app.createScrollMagicScene({trigger: trigger, tween: number, triggerHook: .75});
      app.createScrollMagicScene({trigger: trigger, tween: image, triggerHook: .75});
    }

    /**
     * Get tweens for the work sections
     * @param {object} params, the GSAP tween parameters for number, copy, and image
     * @param {DOM element} el, the containing div for the work project.
     * @return {object} an object containing three GSAP tweens for number, copy, and image
     */
    function getTweens(params, el){
      const numberTween = TweenMax.from(el + ' .hp-project__number', 1, params.number);
      const copyTween = TweenMax.from(el + ' .hp-project__copy', 1, params.copy);
      const imageTween = TweenMax.from(el + ' .hp-project__image', 1, params.image);

      return {
        number: numberTween,
        copy: copyTween,
        image: imageTween
      }
    }
  },

  createScrollMagicScene({
    tween = null,
    trigger = null,
    triggerHook = 0.5,
    duration = 0,
    offset = 0,
    reverse = true,
    indicators = false
  }) {
    const scene = new ScrollMagic.Scene({
      triggerElement: trigger,
      triggerHook: triggerHook,
      duration: duration,
      offset: offset,
      reverse: reverse
    });
    scene.setTween(tween)
         .addTo(this.scrollController);
    if (indicators) {
      scene.addIndicators();
    }
    return scene;
  },

  /**
   * Smooth scrolling
   *
   */
  initSmoothScrolling() {
    const anchors = [...document.querySelectorAll('a')]
                    .filter(anchor => anchor.getAttribute('href').match(/^#/));
    anchors.forEach(anchor => {enableSmoothScrolling(anchor)});

    function enableSmoothScrolling(anchorLink) {
      const href = anchorLink.getAttribute('href');
      anchorLink.addEventListener('click', function(e){
        e.preventDefault();
        setScrollWithFocusTween(href);
      })
    }

    //Set focus on the anchor once it's reached for better keyboard navigation.
    function setScrollWithFocusTween(href){
      const dest = document.querySelector(href);
      dest.classList.add('smooth-scroll-to');
      dest.setAttribute('tabindex', '-1');
      TweenMax.to(window, 1, {
        scrollTo:{ y:href },
        onComplete:function(){
          dest.focus();
        }
      })
    }
  }

}

TweenMax && app.init();
