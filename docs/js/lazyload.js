'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (w) {
  var videos = [].concat(_toConsumableArray(document.querySelectorAll('video[data-src]')));

  function supportsVideoType(type) {
    var video = void 0;

    // Allow user to create shortcuts, i.e. just "webm"
    var formats = {
      ogg: 'video/ogg; codecs="theora"',
      h264: 'video/mp4; codecs="avc1.42E01E"',
      webm: 'video/webm; codecs="vp8, vorbis"',
      vp9: 'video/webm; codecs="vp9"',
      hls: 'application/x-mpegURL; codecs="avc1.42E01E"'
    };

    if (!video) {
      video = document.createElement('video');
    }

    return video.canPlayType(formats[type] || type);
  }

  if (supportsVideoType('h264') === "probably") {
    videos.forEach(function (video) {
      video.classList.add('lazy-load');
      video.setAttribute('src', video.getAttribute('data-src'));
      video.load();
      video.classList.add('loaded');
      video.play();
      // video.oncanplaythrough = function() {
      //   video.classList.add('loaded');
      //   video.play();
      // }
    });
  } else {
    // Video won't play, so unhide and show the fallback image

  }
})(typeof global !== "undefined" ? global : undefined);
//# sourceMappingURL=lazyload.js.map
