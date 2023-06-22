let turn = 3; // when turn gets to 60 the next count is done
let shrink = 0.71; // 0.61
let swept = false;
let ang = 90;
//let ang;
// ang is local \
// tun is global
let count = 32;
let armback = false;

function setup() {
  //createCanvas(930, 800);
  createCanvas(windowWidth, windowHeight)
  angleMode(DEGREES);

  //frameRate(10)
  swept = false;
}

function draw() {
  background(0);

  doTree(width / 4, count, 2);
  doArm(width - width / 3.5, count, 2);
  if (!armback) {
    turn += 1;
  } else {
    turn -= 1;
  }
  //print(ang,turn)
  if (turn >= 60 && !armback) {
    armback = true;
    //turn= 1
  }
  if (turn < 0 && armback) {
    armback = false;

    count++;
  }

  if (count > 63) {
    count = 32;
  }
}

function doArm(p, n, base) {
  // this function only plots the arm of the binary number
  let instr = n.toString(base); // only the arm
  //print("arm",instr)

  turtle(instr, color(255, 255, 0), p);
}

function doTree(p, n, base) {
  // this function plots all the numbers up to and including the number so
  // it prints the whole tree
  //number = 80// 26, 80, 242, 728, 2186
  for (let i = 1; i <= n; i++) {
    // don't need to do zero
    let instr = i.toString(base); // change n to i to get the rest of the tree
    //print("tree",instr)
    turtle(instr, color(255, 255, 0), p);
  }
}

function turtle(inString, clr, p) {
  // print the binary instruction
  fill(0);
  stroke(clr);
  strokeWeight(1);
  rect(10, 70, 150, 50);
  textSize(30);
  fill(0, 255, 0);
  text(inString, 20, 100);
  noFill();

  let instrarr = inString.split(""); // split into an arry
  //print(instrarr)
  let sz = 150;
  let x = p;
  let y = height;
  // let  x1= x+sz*cos(ang)  // x1 = x + amount * cos (theta)
  //let y1 = y-sz*sin(ang)
  let x1 = x;
  let y1 = y - sz;
  strokeWeight(sz / 9);
  stroke(247,194,151);
  line(x, y, x1, y1);
  x = x1;
  y = y1;
  ang = 90;
  for (let i = 1; i < instrarr.length; i++) {
    // always skips the first one
    //print("Beep")
    if (instrarr[i] == "1") {
      // turn right

      ang -= turn;
      stroke(246,166,178);
    } else if (instrarr[i] == "0") {
      // turn left

      ang += turn;
      stroke(255,236,184);
    } else if (instrarr[i] == "2") {
      ang = ang * 2 - ang;
      stroke(0, 0, 255);
    }
    // move forward/
    sz = sz * shrink;
    x1 = x + sz * cos(ang); // x1 = x + amount * cos (theta)
    y1 = y - sz * sin(ang); // y1 =y + amount * sin (theta)
    strokeWeight(sz / 9);
    line(x, y, x1, y1);
    x = x1;
    y = y1;
  }
}
