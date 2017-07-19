var svgContainer = document.getElementById('svg-container');
svgContainer.style.width="800"
svgContainer.style.height="800"

function Point(x,y){
  this.x = x;
  this.y = y;
}

Point.prototype.setTarget = function (point) {
  this.target = point;
}

Point.prototype.updatePosition = function () {
  this.x = this.getNewXPos(this.x, this.target.x);
  this.y = this.getNewYPos(this.y, this.target.y);
}

Point.prototype.getNewXPos = function (x1, x2) {
  return x1 +(x2-x1)/3
}

Point.prototype.getNewYPos = function (y1, y2) {
  return y1 +(y2-y1)/3
}

function getPoint(x,y){
  console.log("Get Point!")
  return new Point(x,y)
}

var pathShape = {
  p1: new Point(100,100),
  p2: new Point(200,100),
  p3: new Point(200,200),
  p4: new Point(100,200)
}

var shape1 = {
  p1: new Point(100,100),
  p2: new Point(200,100),
  p3: new Point(200,200),
  p4: new Point(100,200)
}

var shape2 = {
  p1: new Point(70,80),
  p2: new Point(220,33),
  p3: new Point(177,271),
  p4: new Point(121,220)
}

function setTargets (a, b) {
  console.log(b.p1)
  a.p1.setTarget(b.p1);
  a.p2.setTarget(b.p2);
  a.p3.setTarget(b.p3);
  a.p4.setTarget(b.p4);
}


const { p1, p2, p3, p4 } = pathShape;

setTargets(pathShape, shape2);

function updatePath () {
  pathShape.p1.updatePosition();
  pathShape.p3.updatePosition();
  pathShape.p2.updatePosition();
  pathShape.p4.updatePosition();
  path.setAttribute("d", `M ${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y} ${p4.x} ${p4.y} Z`);
}

var path = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create
// path.setAttribute("d","M 100 100 200 100 200 200 100 200Z"); //Set path's data
path.setAttribute("d", `M ${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y} ${p4.x} ${p4.y} Z`); //Set path's data
path.style.stroke = "#000"; //Set stroke colour
path.style.strokeWidth = "5px"; //Set stroke width
path.style.fill = "red"
path.style.stroke = "none"
svgContainer.append(path)

var controller = new ScrollMagic.Controller();

var fromTween = new TweenMax.from('#tween-item', 1, {
  x: 500,
  // opacity: 0.0,
  // scale: 0.0,
  // ease: Elastic.easeOut
})

var fadeInTween = new TweenMax.from('#pin-item', 2.5, {
  opacity: 0.0
})

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

let dir = 'DOWN';

var shapeScene = new ScrollMagic.Scene({
  triggerElement: '#shapes'
})
.addTo(controller);

let offset = shapeScene.scrollOffset();

shapeScene.on("shift", function (event) {
  if (this.scrollOffset() > offset) {
    setTargets(pathShape, shape2)
  } else {
    setTargets(pathShape, shape1)
  }
  offset = this.scrollOffset()
  // update point coordinates and then re-render the path
  updatePath();
})


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

/**
 * setClassToggle ([element on which to attach class], [classes])
 * You could toggle classes on the body or on the trigger element.
 */
var classedScene = new ScrollMagic.Scene({
  triggerElement: '.snowflake',
  // reverse: false,
})
.setClassToggle('.snowflake__target', 'special-snowflake')
.addTo(controller)
