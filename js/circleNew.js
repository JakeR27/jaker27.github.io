let canvas = document.getElementById("splash-canvas");
let ctx = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;

//########//COLORS
//#//Standard colour scheme - Black, light blue & purple, dark blue & purple
let colA = ["#1c2133", /*"#2b6ea8", "#5d99bf", "#333968", "#000000"*/];
//
////"MutedTones" colour scheme - Gold, light gold, white, black
let colB = ["#c0b283", "#dcd0c0", /*"#f4f4f4",*/ "#373737"];
//
////"Neon" colour scheme - Vdark purple, pink, purple, white
let colC= [/*"#0e0b16",*/ "#a239ca",/* "#4717f6",*/ /*"#e7dfdd"*/];
//
////"Clean" colour scheme - light blue, light grey, light red, white
let colD = [/*"#caebf2", "#a9a9a9", */"#ff3b3f", /*"#efefef"*/];

//"Luxury" colour scheme - dark blue, gold, light red, white
let colE = [/*"#0f1626", "#ab987a",*/ "#ff533d", "#333968"];

// 20% 40% 50% 60% 80%
let lime = ["#336600", "#66cc00", "#80ff00", "#99ff33", "#ccff99"];
let green = ["#006600", "#00c000", "#00ff00", "#33ff33", "#99ff99"];
let cyan = ["#006666", "#00cccc", "#00ffff", "#33ffff", "#99ffff"];
let blue = ["#000066", "#0000cc", "#0000ff", "#3333ff", "#9999ff"];
let yellow = ["#666600", "#cccc00", "#ffff00", "#ffff33", "#ffff99"];
let red = ["#660000", "#cc0000", "#ff0000", "#ff3333", "#ff9999"];
let pink = ["#660033", "#cc0066", "#ff0080", "#ff3399", "#ff99cc"];
let grey = ["#222222", "#666666", "#999999", "#cccccc", "#dddddd"];

// let best = ["#1c2133", "#c0b283", "#a239ca", "#ff3b3f", "#caebf2", "#2b6ea8", "#ab987a"]
let best = ["#1c2133", "#c0b283", "#a239ca", "#caebf2", "#2b6ea8", "#ab987a"]

lime.splice(0,4);
green.splice(0,4);
cyan.splice(0,3);
yellow.splice(0,3); yellow.splice(1,1);
red.splice(1, 3);
pink.splice(0,2);


let temp = [];
//let colours = temp.concat(lime,green,cyan,yellow,red,pink,grey);
let colours = best;

//########//VARIABLES
let mouse = {
    x: undefined,
    y: undefined
};

let center = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

let key = {
    keyCode: undefined
}

let backgroundColour = 0;

let circleArray = [];
let numCircles = ((innerHeight * innerWidth) / 10000) * 12
let growingMode = true;
let effectDistance = {
    x: 50,
    y: 50
}

let speed = {
    x: 0.5,
    y: 0.5
}

let growRate = 1;
let shrinkRate = 1;

let maxSize = 20;
let minSize = 2;

//########//EVENTS
window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("keypress", function(event) {
    key.keyCode = event.keyCode;
    if (key.keyCode == 32) {
        switchBg();
    }
    // if (key.keyCode == 13) {
    //     switchGrow();        
    // }
    if (key.keyCode == 109) {
        growthShrink();
    }
})

//########//OBJECTS
function Circle(x, y, dx, dy, minRadius, maxRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    this.radius = this.minRadius;
    this.fillColour = colours[Math.floor(Math.random() * colours.length)];
    

    this.draw = function() {
        ctx.fillStyle = this.fillColour;
        ctx.strokeStyle = this.fillColour;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill();
    }

    this.update = function() {
        //Bounce off the edges
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        //Move circle
        this.x += this.dx;
        this.y += this.dy;

        //decide to grow or shrink
        let m = -1;
        if (growingMode) m *= -1;

        this.xdist = dist(this.x, center.x);
        this.ydist = dist(this.y, center.y);

        this.xperc = (this.xdist / center.x);
        this.yperc = (this.ydist / center.y);

        let smallest = this.xperc > this.yperc ? this.xperc : this.yperc;
        let inv = (1 / smallest);

        if (dist(this.x, mouse.x) < effectDistance.x
             && dist(this.y, mouse.y) < effectDistance.y) 
             {
                this.radius += m * (growRate);
                //this.radius *= inv;
                this.radius = bound(this.radius, minRadius, maxRadius);
        } else {
                this.radius -= m * (shrinkRate);
                this.radius = bound(this.radius, minRadius, maxRadius);
            this.radius *= smallest;
        }

        //this.radius = bound(this.radius, minRadius, maxRadius);
        //this.radius *= smallest;



        //Draw the circle after all calculations have been made
        this.draw();

    }
}

//########//OBJECTS
function dist(p1, p2) {
    return Math.abs(p1 - p2);
}

function bound(x, min, max) {
    let t = (x > max ? max : x)
    return t < min ? min : t;
}

function interp(x, omin, omax, nmin, nmax) {
    let odiff = omax - omin;
    let ndiff = nmax - nmin;

    let ratio = x / odiff;

    return nmin + (ratio * ndiff);
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

function switchBg() {
    if (backgroundColour == 0) {
        document.body.style.backgroundColor = "#333333"
        backgroundColour = 1
    } else if (backgroundColour == 1) {
        document.body.style.backgroundColor = "#eee"
        backgroundColour = 0
    }
}

function setup() {

    for (var i = 0; i < numCircles; i++) {
    
        var minradius = minSize + Math.floor(Math.random() * (maxSize/4-minSize));
        var maxradius = minSize + Math.floor(Math.random() * (maxSize-minSize));

        let x = maxradius + (Math.random() * (innerWidth - (maxradius * 2)));
        let y = maxradius + (Math.random() * (innerHeight - (maxradius * 2)));
    
        //random num between -speed/2 and speed/2
        let dx = (Math.random() * speed.x) - (speed.x/2);
        let dy = (Math.random() * speed.y) - (speed.y/2);
    
        circleArray[i] = new Circle(x, y, dx, dy, minradius, maxradius);
        
    }
}

setup();
animate();