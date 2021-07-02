//########//SETUP
var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;

document.documentElement.style.overflow = 'hidden';  // firefox, chrome
document.body.scroll = "no"; // ie only


//########//COLORS
//#//Standard colour scheme - Black, light blue & purple, dark blue & purple
var colA = ["#1c2133", /*"#2b6ea8", "#5d99bf", "#333968", "#000000"*/];
//
////"MutedTones" colour scheme - Gold, light gold, white, black
var colB = ["#c0b283", "#dcd0c0", /*"#f4f4f4",*/ "#373737"];
//
////"Neon" colour scheme - Vdark purple, pink, purple, white
var colC= ["#0e0b16", "#a239ca", "#4717f6", /*"#e7dfdd"*/];
//
////"Clean" colour scheme - light blue, light grey, light red, white
var colD = [/*"#caebf2", "#a9a9a9", */"#ff3b3f", /*"#efefef"*/];

//"Luxury" colour scheme - dark blue, gold, light red, white
//var colE = ["#0f1626", "#ab987a", "#ff533d", "#333968"];

var temp = [];
var coloursA = temp.concat(colA,colB,colC,colD/*,colE*/)

var backgroundColour = 0;

//#//Set backgroud colour to random
//var n = Math.floor(Math.random()*coloursA.length);
//document.body.style.backgroundColor = coloursA[n];


//########//VARIABLES
var numCircles = ((innerHeight * innerWidth) / 10000) * 100

var mouse = {
    x: undefined,
    y: undefined,
};

var key = {
    keyCode: undefined,
}

var circleArray = [];

//Set to 0 for growth near mouse, set to 1 for shrinkage near mouse
var growShrink = 0

//Grow distance for x
var gDxa = 50;
//Grow distance for y
var gDya = 50;

var growRate = 15;
var shrinkRate = 15;

var gMaxSize = -15;


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
    if (key.keyCode == 13) {
        switchGrow();        
    }
    if (key.keyCode == 109) {
        growthShrink();
    }
})


//########//FUNCTIONS
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.n = Math.floor(Math.random()*coloursA.length);
    this.fill = coloursA[this.n];
    this.minSize = 6 - Math.floor(Math.random() * 4);
    this.radius = this.minSize;
    this.maxSize = radius;
    this.shrinkRate = shrinkRate * Math.floor(Math.random() * 3);
    this.expandRate = growRate * Math.floor(Math.random() * 3);
    
    this.draw = function() {
        c.fillStyle = this.fill;
        c.strokeStyle = this.colour;
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2);
        c.fill();
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
        
        if (growShrink == 0) {
            if (Math.abs(this.x - mouse.x) < gDx) {
                if (Math.abs(this.y - mouse.y) < gDy) {
                    if (this.radius < this.maxSize) {
                        this.radius += 1 
                    }
                } else if (this.radius > this.minSize) {
                    this.radius -= 1
                } 
            } else if (this.radius > this.minSize) {
                this.radius -= 1
            } 
        } else if (growShrink == 1) {
            if (Math.abs(this.x - mouse.x) < gDx) {
                if (Math.abs(this.y - mouse.y) < gDy) {
                    if (this.radius > 0) {
                        this.radius -= 1  
                    }
                } else if (this.radius > this.minSize) {
                    this.radius += 1
                } 
            } else if (this.radius < this.minSize) {
                this.radius += 1
            }
        }
        
        //Draw the circle after all calculations have been made
        this.draw();
        
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

function switchBg() {
    if (backgroundColour == 0) {
        document.body.style.backgroundColor = "black"
        backgroundColour = 1
    } else if (backgroundColour == 1) {
        document.body.style.backgroundColor = "white"
        backgroundColour = 0
    }
}

function switchGrow() {
    if (gDx == gDxa) {
        gDx = 0;
        gDy = 0;
    } else if (gDx == 0) {
        gDx = gDxa;
        gDy = gDya;
    }
}

function growthShrink() {
    if (growShrink == 1) {
        growShrink = 0;
    } else if (growShrink == 0) {
        growShrink = 1;
    }
}

gDx = gDxa;
gDy = gDya;

//########//RUNNING CODE
for (var i = 0; i < numCircles; i++) {
    
    var radius = 30 + Math.floor(Math.random() * gMaxSize);
    var x = radius + (Math.random() * (innerWidth - (radius * 2)));
    var y = radius + (Math.random() * (innerHeight - (radius * 2)));

    var dx = (Math.random() * 3) - 1.5;
    var dy = (Math.random() * 3) - 1.5;

    dx *= 0.4;
    dy *= 0.4;

    circleArray[i] = new Circle(x, y, dx, dy, radius);
    
}

animate();