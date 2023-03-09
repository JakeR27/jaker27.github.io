let kart;
let wavePosition = 0;
let waveSpeed = 2.5;
let waveWidth = 12;
let waveHeight = 3;

function preload() {
  kart = loadImage('kart_green.png');
}

function setup() {
  createCanvas(600, 100);
}

function draw() {
  background("#016237");
  let rainbowHeight = height / 5;
  let rainbowHeightOffset = (height/2) - (rainbowHeight /2);
  drawRainbow(0, rainbowHeightOffset, 600, rainbowHeight);
  
  let waveHeightOffset = rainbowHeightOffset-waveHeight
  drawRainbow(wavePosition, waveHeightOffset+2, waveWidth+10, rainbowHeight);
  drawRainbow(wavePosition+3, waveHeightOffset+1, waveWidth+4, rainbowHeight);
  
  let wavePos2 = (wavePosition + 100) % width;
  drawRainbow(wavePos2, waveHeightOffset+2, waveWidth+10, rainbowHeight);
  drawRainbow(wavePos2 +3, waveHeightOffset+1, waveWidth+4, rainbowHeight);
  
  wavePosition += waveSpeed;
  if (wavePosition > width) wavePosition = 0;
  
  drawKart(wavePosition + 35, rainbowHeightOffset-20);
  
  fill(0);
  drawLogo(30+1, 1+rainbowHeightOffset/2, rainbowHeight*2, rainbowHeight*3);
  fill(255);
  drawLogo(30, rainbowHeightOffset/2, rainbowHeight*2, rainbowHeight*3);
}

function drawKart(x, y) {
  image(kart, x, y);
}

function drawRainbow(x, y, width, height) {
  noStroke();
  let colorHeight = height / 6;
  fill("#EA093E");
  rect(x, y+colorHeight*0, width, colorHeight);
  fill("#F37A37");
  rect(x, y+colorHeight*1, width, colorHeight);
  fill("#F9C444");
  rect(x, y+colorHeight*2, width, colorHeight);
  fill("#1CAC56");
  rect(x, y+colorHeight*3, width, colorHeight);
  fill("#158DB8");
  rect(x, y+colorHeight*4, width, colorHeight);
  fill("#7C3686");
  rect(x, y+colorHeight*5, width, colorHeight);
}

function drawLogo(x, y, width, height) {
  drawLogoQuad(x, y, width/3, height/3);
  drawLogoQuad(x+(2*width/3), y, width/3, height/3);
  drawLogoQuad(x-3+width/3, y+height/3, width/3, height/3);
  drawLogoQuad(x-6, y+(2*height/3), width/3, height/3);
  
  textSize(height/3);
  text("LEEDS", x+(2*width/3), textSize()+y+height/3)
  text("MOTORSPORT", x+(1*width/3)-2, textSize()-2+y+(2*height/3))
}

function drawLogoQuad(x, y, width, height) {
  let skew = 3;
  
  quad(x+skew,       y, 
       x+width+skew, y, 
       x+width, y+height,
       x,  y+height
       
      );
}