
/**
 * One of possibly many scenes
 * @param {element} triggerElement,
      the optional DOM element that triggers animation
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

 var controller = new ScrollMagic.Controller();

var fromTween = new TweenMax.from('#tween-item', 1, {
  x: 500
})

var fadeInTween = new TweenMax.from('#pin-item', 2.5, {
  opacity: 0.0
})

var tweenScene = new ScrollMagic.Scene({
  triggerElement: '#tween-item',
  duration: 800,
  offset: 0,
  reverse: true,
  triggerHook: 0.85,
})
.setTween(fromTween)
.addIndicators()
.addTo(controller)


var fadingScene = new ScrollMagic.Scene({
  triggerElement: '#pin-item',
  triggerHook: 0.5,
})
.setTween(fadeInTween)
.addTo(controller)

var pinnedScene = new ScrollMagic.Scene({
  triggerElement: '#pin-item',
  offset: 0,
  duration: 600,
  reverse: true,
  triggerHook: 0.1,
})
.setPin('#pin-item')
.addIndicators()
.addTo(controller)



