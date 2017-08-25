'use strict';

const app = {
  scrollController: null,

  init() {
    this.initTweens();
    this.initScrollMagic();
  },

  initTweens() {
    TweenLite.from(intro1, 2, {opacity:"0", delay: 0.25});
    TweenLite.from(intro2, 1, {opacity:"0", delay: 1.25});

    const nav = document.querySelectorAll('#primaryNav a'),
          navList = Array.apply(null, nav),
          navHeight = document.getElementById('primaryNav').offsetHeight;

    navList.forEach((linkElement) => {
      const anchor = linkElement.getAttribute('href')
      linkElement.addEventListener('click', (e) => {
        e.preventDefault();
        TweenMax.to(window, 1, {
          scrollTo:{
            y: anchor,
            offsetY: navHeight
          },
          ease:Power3.easeOut
        });
      })
    })
  },

  initScrollMagic() {
    this.scrollController = new ScrollMagic.Controller();

    const skills = document.getElementById('pinSkills');
    const pinnedSkills = new ScrollMagic.Scene({
      triggerElement: '#skills',
      duration: 900,
      reverse: true,
      triggerHook: 0.4,
    })
    .setPin(skills, { pushFollowers: true })
    .addTo(this.scrollController)

    const works = document.getElementById('work'),
          workExamples = Array.apply(null, works.querySelectorAll('.works__item'));

    workExamples.forEach((workItem) => {
      const tween = TweenMax
        .from(workItem, 0.3, {
          autoAlpha: 0,
          scale: 0.5,
          y: '+=30',
          x: '+=200',
          ease: Linear.easeNone
        })
      const scene = new ScrollMagic.Scene({
        triggerElement: workItem,
        triggerHook: .9,
      })
        .setTween(tween)
        .addTo(this.scrollController);
    })


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
  },
}

app.init();
