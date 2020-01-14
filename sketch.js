//global variables
var deer;
var locX;
var locY;

var lightsAmount = 0;

var text1;
var text2;
var text3;

var globalLightOn = false;

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
  deer = loadModel("assets/deer.obj", true);
  angleMode(DEGREES);

  // instruction texts
  text1 = createDiv('Move the MOUSE to MOVE a light source <br> Press SPACEBAR to turn ON/OFF the global light <br> Press ARROW UP to ADD a new light source');
  text2 = createDiv('Move the MOUSE to MOVE a light source <br> Press SPACEBAR to turn ON/OFF the global light <br> Press ARROW UP to ADD a new light source <br> Press ARROW DOWN to REMOVE a light source');
  text3 = createDiv('Move the MOUSE to MOVE a light source <br> Press SPACEBAR to turn ON/OFF the global light <br> Press ARROW DOWN to REMOVE a light source');

  text1.class('text');
  text2.class('text');
  text3.class('text');

  text1.hide();
  text2.hide();
  text3.hide();
}

function draw() {
  background(0);
  noStroke();

  //mouse position
  locX = mouseX - width / 2;
  locY = mouseY - height / 2;

  //lights
  //diffused lights
  if (globalLightOn == true) {
    ambientLight(0, 0, 50);
    directionalLight(255, 20, 0, 0, 1, 0);
  }
  //point light source, controlled using the mouse
  pointLight(0, 255, 255, locX, locY, 0);

  // the number of lights depends on the user interaction
  for (var i = 0; i < lightsAmount; i++) {
    let newLight = new Light(i);
    newLight.display();
  }

  //3D object material
  ambientMaterial(255);

  //3D object transformations
  rotateZ(180); // in this case, the reference system was different than the one in the sketch, so it's necessary to rotate everything.
  // rotateX(frameCount * 0.5);
  rotateY(frameCount * -0.5);
  //display 3d model
  model(deer);

  // text instructions change according to the number of ligh sources
  var textContent;
  if (lightsAmount == 0) {
    text2.hide();
    text3.hide();
    text1.show();
  } else if (lightsAmount == 7) {
    text1.hide();
    text2.hide();
    text3.show();
  } else {
    text1.hide();
    text3.hide();
    text2.show();
  }
}

// increase the number of light sources creating a new light source with a random color and position
function addLight() {
  if (lightsAmount < 7) {
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
  }
}

// reduce the amount of light sources deleting the last one
function removeLight() {
  if (lightsAmount > 0) {
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

//user interaction
function keyPressed() {
  if (keyCode === UP_ARROW) {
    addLight();
    return false;
  } else if (keyCode === DOWN_ARROW) {
    removeLight();
    return false;
  } else if (keyCode === 32) {
    // spacebar turns on/off the global diffused lights
    globalLightOn = !globalLightOn;
    return false;
  }
}

//new light source, created when keyPressed
function Light(_i) {
  //id number of this light
  this.number = _i;

  //random light colors (values generated at keyPressed) are stored in arrays, with index == this.number
  this.r = rArray[this.number];
  this.g = gArray[this.number];
  this.b = bArray[this.number];

  //random light positions (values generated at keyPressed) are stored in arrays, with index == this.number
  this.posX = posXArray[this.number];
  this.posY = posYArray[this.number];
  this.posZ = posZArray[this.number];

  //display light object
  this.display = function() {
    directionalLight(this.r, this.g, this.b, this.posX, this.posY, this.posZ);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
