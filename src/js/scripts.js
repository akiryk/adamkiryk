
/**
 *
 * Arguments for ScrollMagic Scene
 *
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

var scene = new ScrollMagic.Scene({
  triggerElement: '#myScene',
  duration: window.innerHeight,
})
.addTo(controller)

var arr = ['bird', 'parrot', 'turkey'];
var [...cloned] = arr;


// get the current duration value
// var duration = scene.duration();

// // set a new duration
// scene.duration(300);

// // use a function to automatically adjust the duration to the window height.
// var durationValueCache;
// function getDuration () {
//   return durationValueCache;
// }
// function updateDuration (e) {
//   durationValueCache = window.innerHeight;
// }
// $(window).on("resize", updateDuration); // update the duration when the window size changes
// $(window).triggerHandler("resize"); // set to initial value
// scene.duration(getDuration); // supply duration method