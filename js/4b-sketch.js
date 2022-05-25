let UNLOCKED = false;

let CURRENT_PAGE = 0;

let CURRENT_EVENT_NAME;
let CURRENT_EVENT_START;
let CURRENT_EVENT_END;
let CURRENT_EVENT_LOCATION;
let CURRENT_EVENT_NOTES;

let FONT_BIG, FONT_NORMAL;

function preload() {
  FONT_BIG = loadFont("assets/Anton-Regular.ttf")
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  updatecurrent();
  getNewColor();

  rectMode(CENTER);

  let allowed = getItem("jr27.slider.becca.unlocked");
  if (allowed == "allow") {
    UNLOCKED = true;
  }

}

function draw() {
  if (!UNLOCKED) {
    return;
  }
  background(COLOR);

  let CX = width / 2;
  let CY = height / 2;

  let X_1_4 = 1 * width / 4;
  let X_C =   1 * width / 2;
  let X_3_4 = 3 * width / 4;
  let Y_1_4 = 1 * height / 4;
  let Y_C =   1 * height / 2;
  let Y_3_5 = 3 * height / 5;
  let Y_3_4 = 3 * height / 4;
  let Y_13_16 = 13 * height / 16;
  let Y_7_8 = 7 * height / 8;

  let smallest_dim = width < height ? width : height;

  const TEXT_MEDIUM = map(smallest_dim, 200, 1000, 20, 40, true);
  const TEXT_LARGE = TEXT_MEDIUM * 1.5;
  const TEXT_SMALL = TEXT_MEDIUM * 0.5;
  const TM_1_2 = TEXT_MEDIUM * 0.5;

  textAlign(CENTER);
  textFont(FONT_BIG);

  textSize(TEXT_MEDIUM);
  if (CURRENT_PAGE > 0) {
    text(`${CURRENT_PAGE}/${EVENTS.count}`, CX, TEXT_LARGE);
  }

  textSize(TEXT_LARGE);
  text(CURRENT_EVENT_NAME, CX, Y_1_4, X_3_4);
  if (CURRENT_EVENT_NAME == "J    B" || CURRENT_EVENT_NAME == "B    J") {
    drawArrow(X_C-TEXT_SMALL/4, Y_1_4, TEXT_SMALL, true);
  }
  
  textSize(TEXT_MEDIUM);
  textAlign(RIGHT);
  text(CURRENT_EVENT_START, X_C-TEXT_MEDIUM*2 , Y_C);
  strokeWeight(4);
  
  drawArrow(X_C, Y_C, TEXT_MEDIUM);
  textAlign(LEFT);
  text(CURRENT_EVENT_END, X_C+TEXT_MEDIUM*2 , Y_C);


  textSize(TEXT_SMALL);
  textAlign(CENTER);
  text(CURRENT_EVENT_LOCATION, CX , Y_3_5, X_3_4);
  if (CURRENT_EVENT_NOTES != "none") {
    text(CURRENT_EVENT_NOTES, CX , Y_13_16, X_3_4);
  }
}

function touchStarted() {
  // if (touches[0].x < width / 2) {
  //   prevPage();
  // }
  // if (touches[0].x > width / 2) {
  //   nextPage();
  // }
  processInput(touches[0].x);
}

function mouseClicked() {
  processInput(mouseX);
}

function processInput(x) {
  if (x < width / 2) {
    prevPage();
  }
  if (x > width / 2) {
    nextPage();
  }
}

function nextPage() {
  CURRENT_PAGE++;
  if (CURRENT_PAGE > EVENTS.count) {
    CURRENT_PAGE = EVENTS.count;
  } else {
    getNewColor();
  }
  updatecurrent();
  
}

function prevPage() {
  CURRENT_PAGE--;
  if (CURRENT_PAGE < 0) {
    CURRENT_PAGE = 0;
  } else {
    getPreColor();
  }
  updatecurrent();
  
}


function updatecurrent() {
  CURRENT_EVENT_NAME = EVENTS.events[CURRENT_PAGE].name;
  CURRENT_EVENT_START = EVENTS.events[CURRENT_PAGE].start;
  CURRENT_EVENT_END = EVENTS.events[CURRENT_PAGE].end;
  CURRENT_EVENT_LOCATION = EVENTS.events[CURRENT_PAGE].location;
  CURRENT_EVENT_NOTES = EVENTS.events[CURRENT_PAGE].notes;
}

function drawArrow(x, y, size, small) {
  let ypos = 0;
  if (small) {ypos = size * 0.75};
  strokeWeight(4);
  line(x-size, y-ypos-size/2, x+size, y-ypos-size/2)
  line(x+size/2, y-ypos-size, x+size, y-ypos-size/2)
  line(x+size/2, y-ypos, x+size, y-ypos-size/2)
}

function windowResized() {
  location.reload();
}

