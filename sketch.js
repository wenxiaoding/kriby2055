
let mountain;
let mySound;
let textPic;
var fft;
var amp;

//index for rotating boxes
 let angle = 0;
let index = 0;

//index for random ellipses
let ax 
  let ay
  let axPos
  let ayPos
  
  let bx
  let by
  let bxPos
  let byPos
  let spacePressed = false;


//preload image and audio
function preload(){
  mountain = loadImage('kalove.gif');
	soundFormats('mp3','ogg');
  mySound = loadSound('06.mp3');
  textPic = loadImage('Kirby.png');
}

function keyPressed(){
  if(key === ' ') { 
   spacePressed = true;
  }
}

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
	//to analyse the volume and frequency of music
  fft = new p5.FFT();
  amp = new p5.Amplitude();
  
  
}



function draw() {

  
  
  if(spacePressed &&! mySound.isPlaying()){
    console.log('play')
    mySound.play();
	mySound.loop();
    spacePressed = false;
  }
  //sky color change with mouseX
  let sky = mouseX;
  let skyRed=map(sky,-300,300,0,130);
  let skyGreen=map(sky,-300,300,30,100);
  background(skyRed, skyGreen,180);
	//add ambient light to make all 3d shapes visible
    ambientLight(250);
   let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;
	//add point light according to the mouse position
  pointLight(skyRed, 255, 255, locX, locY, 100);
   rotateBox(15);
  

  
  function rotateBox(num){
    push()
    rotateY(angle*0.3) //rotate together
		//three layers boxes with different moving speed
    for (let i=0; i<num;i++){
      rotateY(PI*2/num);
      push()
  translate(0,-100,130 + cos(index+ mouseX/400)*180)
      rotateY(angle*0.5);
      rotateX(angle*0.2);
      rotateZ(angle*0.4);
  box(2,2,60);
      pop()
  }
    
      for (let i=0; i<num;i++){
    
      rotateY(PI*2/num);
      push()
  translate(0,-50,300-sin(index*0.8+ mouseX/500)*200)
      rotateY(angle*0.9);
      rotateX(angle*0.2);
      rotateZ(angle*0.4);
  box(2,2,80);
      pop()
  }
        for (let i=0; i<num;i++){
    
      rotateY(PI*2/num);
      
      push()
  translate(0,-60,180 - mouseX/2)
      rotateY(angle*0.3);
      rotateX(angle*0.3);
      rotateZ(angle*0.4);
  box(5);
      pop()
  }
    
    pop()
  }
  angle += 0.05;
  index += 0.01;//use index to make the movement in a loop

	
  ambientMaterial(250)
  drawEllipse(ax,ay,axPos,ayPos,-10);
  ambientMaterial(skyRed,skyGreen,180);
  drawEllipse(bx,by,bxPos,byPos,100);
  function drawEllipse(xNumMax,yNumMax,xPos,yPos,zPos){
  push()
    translate(xPos,yPos,zPos)
 for(let x = 0; x< xNumMax; x++){
   for(let y = 0; y<yNumMax; y++){
     ellipse(x*30,y*30,20);
   }
  }
    pop()
  }
 
	//ge t the value of frequency and volume 
  let spectrum = fft.analyze();
  var vol = map(amp.getLevel(),0,0.35,0,255);
  
  push()
  translate(-200,10,100)
  fill(150,200,vol)
  for (let q = 0; q < 60; q++){
    let x = floor(map(q, 0, spectrum.length, 0, width));
    let h = - map(spectrum[q+40], 0, 255, height/4, 0)
  ellipse(q*10,h,8)
  }
  pop()

  //mountain
  texture(mountain)
  push()
  translate(0,50,0)
  plane(200,200);
  pop()
  
	//text
    texture(textPic)
  push()
  translate(0,-330,0)
  plane(200,100);
  pop()

  translate(0,-100,-10);
  noStroke();
  let lightColor = map(mouseX,-300,300,250,0);
  ambientMaterial(230,lightColor,0);
  sphere(38)
  
  textSize(32);
text('word', 10, 30);
fill(0, 102, 153);
  
}