var stage;
var circle;
var i = 0;
window.requestAniFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

function init() {
    //创建一个舞台，得到一个参考的画布
    stage = new createjs.Stage("maincanvas");
    //创建一个形状的显示对象
    circle = new createjs.Shape();
    circle.graphics.s("#aa0").f("#000").dc(15, 15, 30);
    //形状实例的设置位置
    circle.x = circle.y = 50;

    //Shadow(color, offsetX, offsetY, blur)
    circle.shadow = new createjs.Shadow("#ffffff", 0, 0, 15);
    circle.addEventListener("click", handleClick);

    //添加形状实例到舞台显示列表
    stage.addChild(circle);

    //更新舞台将呈现下一帧
    createjs.Ticker.addEventListener("tick", handleTick);
    //drawShape();
}

//ColorMatrixFilter
function drawShape() {
    let shape = new createjs.Shape().set({
        x: 100,
        y: 100
    });
    shape.graphics.beginFill("#ff0000").drawCircle(0, 0, 50);

    let matrix = new createjs.ColorMatrix().adjustHue(180).adjustSaturation(100);
    shape.filters = [
        new createjs.ColorMatrixFilter(matrix)
    ];

    shape.cache(-50, -50, 100, 100);
    stage.addChild(shape);
}

let r = 3;
let g = 0;

function handleClick(event) {
    r += 10;
    g += 9;
    if (r >= 255 || g >= 153) {
        r = 3;
        g = 0;
    }
    console.log(r + ' ' + g);
    let color = colorToHex(`rgb(${r}, ${g}, 0)`); //204,153,0 == c90
    console.log(color);
    circle.graphics.c().s("#aa0").f(color).dc(15, 15, 30);
}

//If we register the callback animate, but the TWEEN.update(time) returns false, 
//cancel/unregister the handler
function animate(time) {
    var id = requestAnimationFrame(animate);

    var result = TWEEN.update(time);
    if (!result) cancelAnimationFrame(id);
}

function handleTick() {
    //圆圈向右边移动10个单位。
    circle.x += 1;
    //将导致圈转回到开始位置
    if (circle.x > stage.canvas.width) {
        circle.x = 0;
    }
    stage.update();
}
