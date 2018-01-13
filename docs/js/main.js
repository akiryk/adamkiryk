'use strict';

/**
 * Use aos.js and gsap for scrolling and fade animations
 *
 * https://github.com/michalsnik/aos
 * https://github.com/greensock/GreenSock-JS
 */

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var app = {
  scrollController: null,

  init: function init() {
    document.documentElement.classList.replace('no-scroll-js', 'yes-scroll-js');
    AOS.init();
    this.animatePrimaryLogo();
    this.initSmoothScrolling();
  },
  animatePrimaryLogo: function animatePrimaryLogo() {
    var kTpMask = document.getElementById("mask1"),
        kBmMask = document.getElementById("mask2"),
        aLtMask = document.getElementById("mask3"),
        aRtMask = document.getElementById("mask4"),
        tl = new TimelineLite();

    // Reset all masks so that logo is completely hidden
    tl.set(aLtMask, { x: -230, y: 230 }).set(aRtMask, { y: -300 }).set(kBmMask, { x: 115, y: 115 }).set(kTpMask, { x: -170 });

    // Animate masks to reveal logo
    tl.to(aLtMask, 0.5, { x: 0, y: 0, ease: Power3.easeOut, delay: .5 }).to(aRtMask, 1.0, { y: 0, ease: Power3.easeOut }, "-=.25").to(kBmMask, 0.5, { x: 0, y: 0, ease: Power3.easeOut }, "-=.75").to(kTpMask, 0.5, { x: 0, ease: Power3.easeOut }, "-=.6");
  },


  /**
   * Smooth scrolling
   *
   */
  initSmoothScrolling: function initSmoothScrolling() {
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

app.init();
//# sourceMappingURL=main.js.map
