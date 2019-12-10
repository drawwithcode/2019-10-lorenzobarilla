//global variables
var faceMask;
var locX;
var locY;

var lightsAmount = 0;

//arrays
var rArray = [];
var gArray = [];
var bArray = [];

var posXArray = [];
var posYArray = [];
var posZArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //load 3d model
  deer = loadModel("assets/deer.obj", true); // If true, scale the model to a standardized size when loading (normalization)
  angleMode(DEGREES);
}

function draw() {
  background(0);
  noStroke();

  //mouse position
  locX = mouseX - width / 2;
  locY = mouseY - height / 2;

  //lights
  ambientLight(0, 0, 50);
  directionalLight(255, 20, 0, 0, 1, 0);
  pointLight(0, 255, 255, locX, locY, 0);

  console.log(lightsAmount);

  for (var i = 0; i < lightsAmount; i++) {
    let newLight = new Light(i);
    newLight.display();
  }

  //3D object material
  ambientMaterial(255);

  //3D object transformations
  rotateZ(180); // in this case, the reference system was different than the one in the sketch, so we had to rotate everything.
  // rotateX(frameCount * 0.5);
  rotateY(frameCount * -0.5);
  //display 3d model
  model(deer);

  //text
  push();
  fill(255);
  noStroke();
  // textFont('Source Code Pro');
  text("click to add or remove a light source", 50, 50);
  pop();
}

function addRemoveLight() {
  //the click will create or remove a light source according to a random value
  var addRemove = round(random(0, 1));

  if (addRemove == 0 && lightsAmount < 6) {
    lightsAmount++;
    //generate random r,g,b values
    var r = round(random(0, 255));
    var g = round(random(0, 255));
    var b = round(random(0, 255));
    //store color values in arrays
    rArray.push(r);
    gArray.push(g);
    bArray.push(b);

    //generate random position values
    var posX = random(-1, 1);
    var posY = random(-1, 1);
    var posZ = random(-1, 1);
    //store position values in arrays
    posXArray.push(posX);
    posYArray.push(posY);
    posZArray.push(posZ);
  } else if (addRemove == 1 && lightsAmount > 0) {
    lightsAmount--;

    //delete last value from color arrays
    rArray.pop();
    gArray.pop();
    bArray.pop();
    //delete last value from position arrays
    posXArray.pop();
    posYArray.pop();
    posZArray.pop();
  }
}

function mouseClicked() {
  //callback
  addRemoveLight();
}

//light object, created when mouseClicked
function Light(_i) {
  //number of this light
  this.number = _i;

  //random light color (values generated at mouseClicked)
  this.r = rArray[this.number];
  this.g = gArray[this.number];
  this.b = bArray[this.number];

  //random light position (values generated at mouseClicked)
  this.posX = posXArray[this.number];
  this.posY = posYArray[this.number];
  this.posZ = posZArray[this.number];

  //display light object
  this.display = function() {
    directionalLight(this.r, this.g, this.b, this.posX, this.posY, this.posZ);
  }
}
