
/**
 *
 * Very basic panels based on demos:
 * http://scrollmagic.io/examples/basic/section_wipes_natural.html
 *
 */

var controller = new ScrollMagic.Controller({
  // globalSceneOptions: {
  //   triggerHook: 'onLeave'
  // }
});

// get all panels
var slides = document.querySelectorAll(".panel");

// create scene for every slide
for (var i=0; i<slides.length; i++) {
  new ScrollMagic.Scene({
      triggerElement: slides[i],
      triggerHook: 'onLeave'
    })
    .setPin(slides[i])
    .addIndicators() // add indicators (requires plugin)
    .addTo(controller);
}

// build tween
var tween = TweenMax.to("#target", 1, {rotation: 180, ease: Linear.easeNone});

// build scene
var scene = new ScrollMagic.Scene({
  triggerElement: "#target",
  duration: 300
})
  .setTween(tween)
  .setPin("#target", {pushFollowers: false})
  .addIndicators() // add indicators (requires plugin)
  .addTo(controller);
