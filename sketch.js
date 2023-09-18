/* Final Project
Student: Timna Aversa 
Class: Introduction to Programming */


const floorPosY = 432;
const ceiling = -250;
let maxX;
let midScreen;
let cameraPos = {x:0, y:0};
let startPlayingButton;

let charInfo;
let gameScore;

let gameSounds = {};
let sceneryObjs;

let gameMetadata = {isGameStarted: false,
	isExplained: false,
	gameLock: false,
	changeLevel: false,
	gameLevel:1
};
// object to control the random generated objects
function levelOne()
{
	maxX = 3000;
	midScreen = maxX/2;
	sceneryObjs = {rocks:{amount:850,obj:[]},
					stars:{amount:1550,obj:[]},
					mountains:{amount:15,obj:[]},
					trees:{amount:8,obj:[]},
					clouds:{amount:35,obj:[]},
					platforms:{location:[{x:750,y:floorPosY - 100,length:120},
										{x:1720,y:floorPosY - 100,length:120},
										{x:2400,y:floorPosY - 100,length:120},
										{x:2470,y:floorPosY - 200,length:120}
								],
							obj:[]},
					collectables:{location:[{x:(midScreen - maxX/2.5),y:410},
											{x:(midScreen - maxX/6),y:410},
											{x:(1820),y:floorPosY - 118},
											{x:(midScreen + maxX/3),y:410},
											{x:(maxX - 300),y:410},
											{x:(2570),y:floorPosY - 218}
										],
							obj:[]},
					canyons:{location:[{x:(midScreen - maxX/3)},
										{x:(midScreen - maxX/10)},
										{x:(midScreen + maxX/4)}
									],
							obj:[]},
					enemies:{location:[{x:740, y:floorPosY - 10, range:150},
										{x:1700, y:floorPosY - 10, range:200}
									],
							obj:[]},
					flagpoles:{obj:[]}
				};
	backgroundSetUp();
}
function levelTwo()
{
	maxX = 5000;
	midScreen = maxX/2;
	sceneryObjs = {rocks:{amount:1250,obj:[]},
					stars:{amount:2050,obj:[]},
					mountains:{amount:30,obj:[]},
					trees:{amount:20,obj:[]},
					clouds:{amount:45,obj:[]},
					platforms:{location:[{x:750,y:floorPosY - 95,length:120},
										{x:1720,y:floorPosY - 95,length:120},
										{x:2400,y:floorPosY - 95,length:120},
										{x:2470,y:floorPosY - 190,length:120},
										{x:2540,y:floorPosY - 285,length:120},
										{x:3100,y:floorPosY - 95,length:120},
										{x:3170,y:floorPosY - 190,length:120}],
							obj:[]},
					collectables:{location:[{x:800,y:floorPosY - 118},
											{x:(midScreen - maxX/6),y:410},
											{x:(1820),y:floorPosY - 118},
											{x:(midScreen + maxX/3),y:410},
											{x:(maxX - 300),y:410},
											{x:2490,y:floorPosY - 210},
											{x:2556,y:floorPosY - 308},
											{x:2660,y:floorPosY - 308},
											{x:3090,y:412},
											{x:3140,y:floorPosY - 240},],
							obj:[]},
					canyons:{location:[{x:(midScreen - maxX/3)},
										{x:(midScreen - maxX/10)},
										{x:(midScreen + maxX/4)}],
							obj:[]},
					enemies:{location:[{x:680, y:floorPosY - 10, range:120},
										{x:1700, y:floorPosY - 10, range:200},
										{x:2556, y:floorPosY - 10, range:300},
										{x:(midScreen + maxX/3 -30), y:floorPosY - 10, range:300}],
							obj:[]},
					flagpoles:{obj:[]}
				};
	backgroundSetUp();
}
function preload(){
    soundFormats('mp3','wav');
    
    //load your sounds here
    gameSounds.jumpSound = loadSound('assets/jump.wav');
    gameSounds.jumpSound.setVolume(0.1);
	//music bo sound https://freesound.org/people/DRFX/sounds/338986/
	gameSounds.backgoundMusicbox = loadSound('assets/Winds_Of_Stories.mp3');
    gameSounds.backgoundMusicbox.setVolume(0.3);
	//https://opengameart.org/content/winds-of-stories
	gameSounds.backgroundCrickets = loadSound('assets/crickets_night.wav');
    gameSounds.backgroundCrickets.setVolume(0.1);
	//https://freesound.org/people/robbeman/sounds/495642/
	gameSounds.coinSound = loadSound('assets/coin.wav');
    gameSounds.coinSound.setVolume(0.5);
	//https://freesound.org/people/LittleRobotSoundFactory/sounds/274181/
	gameSounds.winSound = loadSound('assets/win.wav');
    gameSounds.winSound.setVolume(0.2);
	gameSounds.cheer = loadSound('assets/applause.wav');
	gameSounds.cheer.setVolume(0.4);
	//https://opengameart.org/content/applause
}
//character set up
function Character(){
	this.gameCharX = 200;
	this.gameCharY = floorPosY;
	this.charSize = 10;
	this.isLeft = false;
	this.isRight = false;
	this.isFalling = false;
	this.isPlummeting = false;
	this.lives = 3;
	this.hair = function(){
		fill(210, 83, 128);
		ellipse(this.gameCharX - 0.18 * this.charSize,
				this.gameCharY- 4.6 * this.charSize,
				0.45 * this.charSize,0.45 * this.charSize);
		ellipse(this.gameCharX - 0.4 * this.charSize,
				this.gameCharY- 4.3 * this.charSize,
				0.4 * this.charSize,0.4 * this.charSize);
		ellipse(this.gameCharX,
				this.gameCharY- 4.3 * this.charSize,
				0.5 * this.charSize,0.4 * this.charSize);
		ellipse(this.gameCharX + 0.18 * this.charSize,
				this.gameCharY- 4.6 * this.charSize,
				0.45 * this.charSize,0.45 * this.charSize);
		ellipse(this.gameCharX + 0.4 * this.charSize,
				this.gameCharY- 4.3 * this.charSize,
				0.4 * this.charSize,0.4 * this.charSize);
	};
	this.eye = function(direction){
		let dirNum = 0;
		if (direction === "left")
		{
			dirNum = -3;
		}
		if (direction === "right")
		{
			dirNum = 3;
		}
		fill(255);
		ellipse(this.gameCharX + dirNum ,
				this.gameCharY -3.1 * this.charSize,
				2.3 * this.charSize,2.3 * this.charSize);
		fill(0);
		ellipse(this.gameCharX + dirNum * 2.4,
				this.gameCharY - 3.1 * this.charSize+ dirNum * 0.2,
				1.4 * this.charSize,1.4 * this.charSize);
		fill(255);
		ellipse(this.gameCharX + dirNum * 3.2,
				this.gameCharY - 3.25 * this.charSize,
				0.7 * this.charSize,0.7 * this.charSize);
		ellipse(this.gameCharX - 2 + dirNum,
				this.gameCharY - 2.7 * this.charSize,
				0.3 * this.charSize,0.3 * this.charSize);
	};
	this.mouth = function(direction){
		let dirNum = 0;
		if (direction === "left")
		{
			dirNum = -4.2;
		}
		if (direction === "right")
		{
			dirNum = 4.2;
		}
		triangle(this.gameCharX - 0.8 * this.charSize + dirNum, 
			this.gameCharY - 1.3  * this.charSize,
			this.gameCharX - 0.6 * this.charSize +dirNum, 
			this.gameCharY - 1.6 * this.charSize, 
			this.gameCharX - 0.4 * this.charSize+dirNum, 
			this.gameCharY - 1.3 * this.charSize);
		triangle(this.gameCharX + 0.8 * this.charSize + dirNum, 
			this.gameCharY - 1.3 * this.charSize,
			this.gameCharX + 0.6 * this.charSize + dirNum, 
			this.gameCharY - 1.6 * this.charSize, 
			this.gameCharX + 0.4 * this.charSize + dirNum, 
			this.gameCharY - 1.3 * this.charSize);
		stroke(147, 118, 224);
		line(this.gameCharX - 0.8 * this.charSize + dirNum, 
			this.gameCharY - 1.3 * this.charSize,
			this.gameCharX + 0.8 * this.charSize + dirNum, 
			this.gameCharY - 1.3 * this.charSize);
	};
	this.headBackground = function (){
		noStroke();
		this.horns(this.gameCharX,
					this.gameCharY,
					this.charSize);
		fill(255,116,177);
		ellipse(this.gameCharX,
				this.gameCharY-2.4 * this.charSize,
				4 * this.charSize,4 * this.charSize);
		noStroke();
		fill(128, 70, 116, 60);
		arc(this.gameCharX,
			this.gameCharY-2.4 * this.charSize,
			4 * this.charSize,4 * this.charSize,4.6,1.2,24);
		fill(255,116,177);
		ellipse(this.gameCharX,
				this.gameCharY-2.4 * this.charSize,
				3.4 * this.charSize,4 * this.charSize);
	};
	this.stand = function (side){
		beginShape();
		vertex(this.gameCharX + 0.3 * this.charSize * side, this.gameCharY);
		vertex(this.gameCharX + 0.35 * this.charSize * side, this.gameCharY - 0.5 * this.charSize);
		vertex(this.gameCharX + 0.8 * this.charSize * side, this.gameCharY - 0.7 * this.charSize);
		vertex(this.gameCharX + 1 * this.charSize * side, this.gameCharY);
		endShape(CLOSE);
	};
	this.walk = function (side,direction){
		beginShape();
		vertex(this.gameCharX + 0.6 * this.charSize * side + direction, this.gameCharY);
		vertex(this.gameCharX + 0.35 * this.charSize * side + direction, this.gameCharY - 0.2 * this.charSize);
		vertex(this.gameCharX + 0.4 * this.charSize * side + direction, this.gameCharY - 0.5 * this.charSize);
		vertex(this.gameCharX + 0.9 * this.charSize * side + direction, this.gameCharY - 0.6 * this.charSize);
		vertex(this.gameCharX + 1 * this.charSize * side + direction, this.gameCharY - 0.4 * this.charSize);
		vertex(this.gameCharX + 1.4 * this.charSize * side + direction, this.gameCharY- 0.2 * this.charSize);
		endShape(CLOSE);
	};
	this.jump = function (side,direction){
		beginShape();
		stroke(128, 70, 116, 60);
		vertex(this.gameCharX + 0.9 * this.charSize * side + direction, this.gameCharY - 0.2 * this.charSize + direction);
		vertex(this.gameCharX + 0.8 * this.charSize * side + direction, this.gameCharY - 0.55 * this.charSize + direction);
		vertex(this.gameCharX + 1.3 * this.charSize * side + direction, this.gameCharY - 1 * this.charSize + direction);
		vertex(this.gameCharX + 2 * this.charSize * side + direction, this.gameCharY - 0.7 * this.charSize + direction);
		endShape(CLOSE);
		noStroke();
	};
	this.horns = function (){
		fill(255);
		arc(this.gameCharX + 0.15 * this.charSize,this.gameCharY-3.8 * this.charSize,3 * this.charSize,3 * this.charSize,6, 3, PI);
		arc(this.gameCharX - 0.15 * this.charSize,this.gameCharY-3.8 * this.charSize,3 * this.charSize,3 * this.charSize,0,3.5, PI);
	};
	this.characterMove = function (direction){
		this.headBackground();
		this.hair();
		this.eye(direction);
		this.mouth(direction);
		fill(255,116,177);
	};
	this.characterDraw = function (){
		if (this.isLeft && this.isFalling){
			if (this.isLeft){this.characterMove('left');}
			if (this.isRight){this.characterMove('right');}
			if (this.isPlummeting){this.characterMove('');}
			this.jump(-1,0);
			this.jump(1,0);
		}
		else if (this.isLeft){
			this.characterMove('left');
			this.walk(1, -12);
			this.walk(1, 0);
		}
		else if (this.isRight){
			this.characterMove('right');
			this.walk(-1, +12);
			this.walk(-1, 0);
		}
		else{
			this.characterMove('');
			this.stand(-1);
			this.stand(1);
		}
		this.checkPlayerDie();
	};
	this.checkPlayerDie = function ()
	{
		if ((this.isPlummeting) && (this.gameCharY > height))
		{
			if (this.lives > 1)
			{
				reset();
			}
			else{
				message = `         Game over. 
Press space to continue.`;
				if (this.lives > 0) {this.lives = 0;}
				messageBoard(message,420,150, 300,0);
				gameMetadata.gameLock = true;
			}
		}
	};
	this.reset = function ()
	{
		this.gameCharX = 200;
		this.gameCharY = floorPosY;
		this.isLeft = false;
		this.isRight = false;
		this.isFalling = false;
		this.isPlummeting = false;
		this.lives -= 1;
		cameraPos.x = 0;
	}
}
//game view
function Tree(){
	this.x = random(-300,maxX + 300);
	this.size = random(1,6);
	this.y = 432-this.size*6;
	this.draw = function()
	{
		noStroke();
		fill(60, 35, 23);
		rect(this.x-this.size,this.y-this.size*2,
				this.size*2,this.size*8);
		fill(46, 79, 79);
		stroke(44, 51, 51);
		triangle(this.x+this.size*10,
					this.y,this.x,
					this.y- this.size*26,
					this.x-this.size*10,
					this.y);
		noStroke();
		fill(44, 51, 51);
		beginShape();
		vertex(this.x+this.size*8, this.y-this.size*5);
		vertex(this.x, this.y-this.size*13);
		vertex(this.x-this.size*8, this.y-this.size*5);
		vertex(this.x,this.y- this.size*11);
		endShape();
	};
}
function Mountain(){
	this.x = random(-300,maxX + 300);
	this.y = random(300);
	this.size = random(1,8);
	this.draw = function()
	{
		this.y=432;
		fill(212, 173, 252);
		triangle(this.x,this.y,this.x,this.y- this.size*26,
					this.x+this.size*10,this.y);
		fill(92, 70, 156);
		triangle(this.x,this.y,this.x,this.y- this.size*26,
					this.x-this.size*10,this.y);
		fill(255);
		beginShape();
		vertex(this.x, this.y-this.size*18);
		vertex(this.x, this.y-this.size*26);
		vertex(this.x+this.size*3, this.y- this.size*18);
		vertex(this.x+this.size/2,this.y- this.size*20);
		endShape();
		fill(210);
		beginShape();
		vertex(this.x, this.y-this.size*18);
		vertex(this.x, this.y-this.size*26);
		vertex(this.x-this.size*3, this.y- this.size*18);
		vertex(this.x-this.size/2,this.y- this.size*20);
		endShape();
	};
}
function Star(){
	this.x = random(-300,maxX + 300);
	this.y = random(ceiling,425);
	this.draw = function()
	{
		let i = floor(random(5));
		if (i==0){fill(255, 95, 158);}
		else if (i==1){fill(233, 0, 100);}
		else if (i==2){fill(249, 217, 73);}
		else if (i==3){fill(240, 240, 240);}
		else if (i==4){fill(58, 180, 242);}
		else{fill(39, 225, 193);}
		ellipse(this.x,this.y,1,1);
	};
}
function Rock()
{
	this.x = random(-300,maxX + 300);
	this.y = random(220);
	this.size = random(8) + 2;
	this.draw = function()
	{
		let i = this.size % 3
		if (i==0){fill(65, 53, 67,50);}
		else if (i==1){fill(240, 235, 141,50);}
		else{fill(143, 67, 238, 50);}
		ellipse(this.x,floorPosY + 25 + this.y,this.size,this.size-3);
	}
}
function Cloud(){
	this.x = random(-300,maxX + 300);
	this.y = random(ceiling,250);
	this.size = random(1,8);
	this.draw = function()
	{
		noStroke();
		fill(255);
		rect(this.x + this.size * 4, this.y + this.size/2 * 10, 
				this.size * 13, this.size * 3, this.size*2);
		rect(this.x + this.size * 10, this.y + this.size/2 *5, 
				this.size * 5, this.size * 4, this.size*2);
		rect(this.x + this.size * 7, this.y + this.size, 
				this.size * 4.5, this.size * 6, this.size*2);
	};
}
function Collectable(x, y = 410){
	this.x = x;
	this.y = y;
	this.size = 7;
	this.isFound = false;
	this.tokenDraw = function ()
	{
		noStroke();
		fill(255,215,0,90);
		ellipse(this.x,this.y, 50);
		fill(255, 211, 163);
		triangle(this.x - this.size,
			this.y,
			this.x,
			this.y + 2.5 * this.size,
			this.x + this.size,
			this.y);
		fill(225, 18, 153);
		arc(this.x, this.y-1, 2.3 * this.size, 3.3  * this.size, PI, 0 , CHORD);
	};
	this.checkCollectable = function ()
	{
		if (this.isFound == false)
		{
			this.tokenDraw();
			if (dist(charInfo.gameCharX,charInfo.gameCharY,this.x, 
						this.y) < 25)
			{
				this.isFound = true;
				gameScore += 1;
				gameSounds.coinSound.play();
			}
		}
	},
	this.draw = function ()
	{
		this.checkCollectable();
	}
	;
}
function Canyon(x,size = 1){
	this.x = x;
	this.size = size;
	this.width = 70 * this.size;
	this.checkCanyon = function()
	{
		if((this.x + this.width > charInfo.gameCharX) && (charInfo.gameCharX > this.x) && charInfo.gameCharY >= floorPosY)
		{
			charInfo.isPlummeting = true;
		}
	};
	this.draw = function()
	{
		noStroke();
		fill(169, 113, 85);
		rect(this.x,floorPosY,this.width,200);
		this.checkCanyon();
	};
}
function Flagpole(x = maxX - 250){
	this.isReached= false;
	this.xPos= x;
	this.soundPlayed = false;
	this.renderFladgpole = function(){
		strokeWeight(5);
		stroke(255);
		line(this.xPos,floorPosY,this.xPos,floorPosY - 250);
		fill(135,206,250);
		if (this.isReached)
		{
			rect(this.xPos,floorPosY - 240,80,20);
			this.soundPlayed = phaseFinished(this.soundPlayed);
		}
		else{
			rect(this.xPos,floorPosY - 20,80,20);
		}
	};
	this.checkFlagpole = function(){
		if (charInfo.gameCharX >= this.xPos)
		{
			this.isReached = true;
		}
	};
	this.draw = function()
	{
		this.renderFladgpole();
		if(this.isReached == false)
		{
			this.checkFlagpole();
		}
	}
	this.reset = function ()
	{
		this.isReached = false;
		this.soundPlayed = false;
	}
}
function phaseFinished(soundPlayed)
{
	if(soundPlayed == false)
	{
		gameSounds.winSound.play();
		if (gameMetadata.gameLevel == 2)
		{
			gameSounds.cheer.play();
		}
		sceneryObjs.collectables.obj[0].soundPlayed = true;
		soundPlayed = true;
	}
	let fetcedAll = true;
	sceneryObjs.collectables.obj.forEach(i => {if(i.isFound == false){fetcedAll = false}});
	let message = {width: 450,
					height: 180,
					boxPosX:0}
	if(fetcedAll)
	{
		if (gameMetadata.gameLevel == 1)
		{
			message.phrase = `      Level ${gameMetadata.gameLevel} Completed! 
       Press space to play 
         the next level.`;
		}
		else
		{
			message.phrase = `              You Win! 
Press space to play again.`;
			message.height = 140;
		}
		gameMetadata.changeLevel = true;
		runConfetties();
	} 
	else 
	{
		message.phrase = `           Level finished.
But you didn't get all coins. 
  Press space to try again.`;
        message.boxPosX = cameraPos.x;
	}
	messageBoard(message.phrase,message.width,message.height,message.boxPosX);
	gameMetadata.gameLock = true;
	return soundPlayed
}
function Platform(x,y,length,range = 20){
	this.x = x;
	this.y = y;
	this.inc =0.2;
	this.range = range;
	this.currentX = x + floor(random(range - 1));
	this.length = length;
	this.draw = function()
	{
		this.update();
		fill(255,0,255);
		rect(this.currentX,this.y,length,20,30);
	}
	this.checkContact = function(){
		if((charInfo.gameCharX > this.x) && (charInfo.gameCharX < this.x + this.length))
		{
			let d = this.y - charInfo.gameCharY;
			if(d >= 0 && d < 5)
			{
				return true;
			}
			
		}
		return false;
	};
	this.update = function()
	{
		this.currentX += this.inc;
		if (this.checkContact())
		{
			charInfo.gameCharX += this.inc;
			charInfo.isFalling = false;
		}
		if((this.currentX >= this.x + this.range) || (this.currentX < this.x))
		{
			this.inc *= -1
		}
	}
}
function Enemy(x,y,range)
{
	this.x = x;
	this.y = y;
	this.range = range;
	this.currentX = x + floor(random(range - 1));
	this.inc =1;
	this.update = function()
	{
		this.currentX += this.inc;
		if(this.currentX >= this.x + this.range)
		{
			this.inc = -1
		}
		else if (this.currentX < this.x)
		{
			this.inc = 1;
		}
	}
	this.draw = function()
	{
		this.update();
		fill(255);
		ellipse(this.currentX - 3, this.y -20, 6,32);
		ellipse(this.currentX + 3, this.y-20, 6,32);
		fill(1,32,20);
		ellipse(this.currentX - 3, this.y -20, 5,30);
		ellipse(this.currentX + 3, this.y-20, 5,30);
		fill(0,255,0);
		ellipse(this.currentX, this.y, 30);
		
		if (this.inc)
		{
			//mouth
			fill(255);
			ellipse(this.currentX + 4 * this.inc, this.y + 4, 15);
			//eyes
			fill(0);
			ellipse(this.currentX + 7 * this.inc, this.y -6,7);
			ellipse(this.currentX, this.y -6,7);
		}
		let isContact = this.checkContact();
		if (isContact)
		{
			charInfo.isPlummeting = true
		}
	}
	this.checkContact = function()
	{
		var d = dist(charInfo.gameCharX, charInfo.gameCharY, this.currentX, this.y)
		if (d < 20){return true;}
		return false
	}
}
function drawObjectsInArray(arrayObj)
{
	arrayObj.forEach(i => {i.draw();});
}
function heart(x,y, r)
{
	noStroke();
	fill(255);
	beginShape();
	for (let a = 0; a < TWO_PI; a += 0.1) {
		let xPos = x + r * 16 * pow(sin(a), 3);
		let yPos = y + -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));

		vertex(xPos, yPos);
	}
	endShape();
}
function charCordination(charInfo)
{
	if (charInfo.isPlummeting == true)
	{
		charInfo.gameCharY += 8;
	}
	else if (charInfo.isLeft == true)
	{
		if (charInfo.gameCharX <= 5)
		{
			charInfo.gameCharX = 0;
		}
		else 
		{
			charInfo.gameCharX -=5;
		}
	}
	else if (charInfo.isRight == true)
	{
		if (charInfo.gameCharX >= maxX - 5)
		{
			charInfo.gameCharX = maxX;
		}
		else 
		{
			charInfo.gameCharX +=5;
		}
	}

	if (charInfo.gameCharY < floorPosY)
	{
		let isContact = false;
		sceneryObjs.platforms.obj.forEach(i => {
			if (i.checkContact())
			{
				isContact = true;
				charInfo.gameCharY = i.y;
			}
		});
		if (isContact == false)
		{
			charInfo.gameCharY += 4;
			charInfo.isFalling = true;
		}
	}
	else 
	{
		charInfo.isFalling = false;
	}
	return charInfo
}
function reset()
{
	charInfo.reset();
	sceneryObjs.collectables.obj.forEach(c => {c.isFound = false;});
	gameScore = 0;
	sceneryObjs.flagpoles.obj[0].reset();
}
function backgroundSetUp()
{
	for(let i = 0; i < sceneryObjs.trees.amount; i++)
	{
		sceneryObjs.trees.obj.push(new Tree());
	}
	for(let i = 0; i < sceneryObjs.rocks.amount; i++)
	{
		sceneryObjs.rocks.obj.push(new Rock());
	}
	for(let i = 0; i < sceneryObjs.stars.amount; i++)
	{
		sceneryObjs.stars.obj.push(new Star());
	}
	for(let i = 0; i < sceneryObjs.mountains.amount; i++)
	{
		sceneryObjs.mountains.obj.push(new Mountain());
	}
	for(let i = 0; i < sceneryObjs.clouds.amount; i++)
	{
		sceneryObjs.clouds.obj.push(new Cloud());
	}
	sceneryObjs.canyons.location.forEach(c => {sceneryObjs.canyons.obj.push(new Canyon(c.x));});
	sceneryObjs.collectables.location.forEach(c => {sceneryObjs.collectables.obj.push(new Collectable(c.x,c.y));});
	sceneryObjs.platforms.location.forEach(p => {sceneryObjs.platforms.obj.push(new Platform(p.x,p.y,p.length));});
	sceneryObjs.enemies.location.forEach(e => {sceneryObjs.enemies.obj.push(new Enemy(e.x,e.y,e.range));});
	sceneryObjs.flagpoles.obj.push(new Flagpole());
}
function startGame()
{
	gameScore = 0;
	charInfo = new Character();
	levelOne();
	setupConfetti();
	startPlayingButton = {x:width/2 - 90,
							y:height/2+40,
							width: 200,
							height: 80,
							isPressed:false
						}
}
function buttonDraw(message){
	if ((mouseX > startPlayingButton.x) && 
		(mouseX < startPlayingButton.x+startPlayingButton.width) && 
		(mouseY > startPlayingButton.y) && 
		(mouseY < startPlayingButton.y+startPlayingButton.height))
	{
		fill(212, 173, 252);
		rect(startPlayingButton.x,startPlayingButton.y,
			startPlayingButton.width,startPlayingButton.height,20);
	
		fill(255);
		text(message, startPlayingButton.x + 10,startPlayingButton.y + 50);
	}
	else{
		fill(255);
		rect(startPlayingButton.x,startPlayingButton.y,
			startPlayingButton.width,startPlayingButton.height,20);
		fill(0);
		text(message, startPlayingButton.x + 10,startPlayingButton.y + 50);
	}
	noStroke();
	noFill();
}
function drawBoard()
{
	noStroke();
	fill(212, 173, 252);
	polygon(100,10,100,8);
	fill(92, 70, 156);
	polygon(100,10,97,8);
	fill(255);
	textFont('Georgia',24);
	text(`Level ${gameMetadata.gameLevel}`, 66, 21)
	text('Lives: ',35,48);
	for( let i = 0; i < charInfo.lives; i++)
	{
		heart(115 + i * 25,40,0.7);
	}
	fill(255);
	text('Score: ' + gameScore, 35,73);
}
//type is to control the deslocation where necessary
function messageBoard(message,messageWidth,messageHeigth, boxPosX)
{
	boxPosX += width/2 - messageWidth/ 2;
	fill(212, 173, 252);
	rect(boxPosX, height/2 - messageHeigth/2 -10,messageWidth, messageHeigth -10);
	fill(92, 70, 156);
	rect(boxPosX + 10, height/2 - messageHeigth/2,messageWidth -20, messageHeigth-30);
	noStroke();
	fill(255);
	textFont('Georgia',36 - message.length/30);
	text(message,boxPosX + 30, height/2 - messageHeigth/2 +40);
}

// Not my code, credit too: https://editor.p5js.org/slow_izzm/sketches/H1fhGJSaX
let nouvelle,
  ancienne,
  pression;

let themeCouleur = [
  '#ECEE81','#8DDFCB','#82A0D8','#EDB7ED'
];
class Particule {
  constructor(parent) {
    this.parent = parent;
    this.gravite = parent.gravite;
    this.reinit();
    this.forme = round(random(0, 1));
    this.etape = 0;
    this.prise = 0;
    this.priseFacteur = random(-0.02, 0.02);
    this.multFacteur = random(0.01, 0.08);
    this.priseAngle = 0;
    this.priseVitesse = 0.05;
  }
  reinit() {

    this.position = this.parent.position.copy();
    this.position.y = random(-20, -100);
    this.position.x = random(0, width);
    this.velocite = createVector(random(-6, 6), random(-10, 2));
    this.friction = random(0.995, 0.98);
    this.taille = round(random(5, 15));
    this.moitie = this.taille / 2;
    this.couleur = color(random(themeCouleur));

  }
  dessiner() {

    this.etape = 0.5 + Math.sin(this.velocite.y * 20) * 0.5;

    this.prise = this.priseFacteur + Math.cos(this.priseAngle) * this.multFacteur;
    this.priseAngle += this.priseVitesse;
    translate(this.position.x, this.position.y);
    rotate(this.velocite.x * 2);
    scale(1, this.etape);
    noStroke();
    fill(this.couleur);

    if (this.forme === 0) {
      rect(-this.moitie, -this.moitie, this.taille, this.taille);
    } else {
      ellipse(0, 0, this.taille, this.taille);
    }

    resetMatrix();
  }
  integration() {
    this.velocite.add(this.gravite);
    this.velocite.x += this.prise;
    this.velocite.mult(this.friction);
    this.position.add(this.velocite);
    if (this.position.y > height) {
      this.reinit();
    }

    if (this.position.x < 0) {
      this.reinit();
    }
    if (this.position.x > width + 10) {
      this.reinit();
    }
  }
  rendu() {
    this.integration();
    this.dessiner();

  }
}
class SystemeDeParticules {
  constructor(nombreMax, position, gravite) {
    this.position = position.copy();
    this.nombreMax = nombreMax;
    this.gravite = createVector(0, 0.1);
    this.friction = 0.98;
    // le tableau 
    this.particules = [];
    for (let i = 0; i < this.nombreMax; i++) {
      this.particules.push(new Particule(this));
    }
  }
  rendu() {
    if (pression) {
      let force = p5.Vector.sub(nouvelle, ancienne);
      this.gravite.x = force.x / 20;
      this.gravite.y = force.y / 20;
    }

    this.particules.forEach(particules => particules.rendu());
  }
}
let confettis;

function setupConfetti() {
  createCanvas(width, height);
  frameRate(60);
  ancienne = createVector(0, 0);
  nouvelle = createVector(0, 0);
  confettis = new SystemeDeParticules(500, createVector(width / 2, -20));
}

function windowResized() {
  resizeCanvas(width, height);
  confettis.position = createVector(width / 2, -40);
}

function runConfetties(){
	// background(color("#111"));
	nouvelle.x = mouseX;
	nouvelle.y = mouseY;
	confettis.rendu();
	ancienne.x = nouvelle.x;
	ancienne.y = nouvelle.y;
}

//back to my code
function polygon(x, y, radius, npoints) {
	let angle = TWO_PI / npoints;
	beginShape();
	for (let a = 0; a < TWO_PI; a += angle) {
	  let sx = x + cos(a) * radius;
	  let sy = y + sin(a) * radius;
	  vertex(sx, sy);
	}
	endShape(CLOSE);
  }
function gameWelcome()
{
	fill(212, 173, 252);
	polygon(width/2,height/2,230,10);
	fill(92, 70, 156);
	polygon(width/2,height/2,210,10);
	fill(255);
	textFont('Georgia',36);
	text('Welcome to',width/2-90,height/2- 60);
	text('Night Monster',width/2-110,height/2- 10);
	buttonDraw('Start Game');
}
function gameIntroduction()
{
	message = `Welcome to the Night Monster,

In this game, our little night monster called Sparkaboo, is 
competing to get free Ice Cream for a year!
To win this important competition Sparkaboo has to have the 
highest number of Ice Cream coins by collecting them throughtout 
the forest.
Come and join us in this adventure!

How to Play:
Press the side arrow buttons to move towards each side.
Press space to jump.

Press space to start!
`
	messageBoard(message,700,500,0);
}
// user actions control
function keyPressed()
{
	if (keyCode == 37)
	{
		charInfo.isLeft = true;
	}
	else if (keyCode == 39)
	{
		charInfo.isRight = true;
	}
	else if (keyCode == 32)
	{
		if (gameMetadata.isExplained == false)
		{
			gameMetadata.isExplained = true;
		}
		else if (gameMetadata.gameLock == true)
		{
			newLevelCheck();
			gameMetadata.gameLock = false;
			reset();
			charInfo.lives = 3;
		}
		else{
			console.log(charInfo.isFalling);
			if (charInfo.isFalling == false)
			{
				gameSounds.jumpSound.play();
				charInfo.gameCharY -= 120;
			}
			if (charInfo.gameCharY <= 100)
			{
				charInfo.gameCharY = 100;
			}
		}
	}
	else
	{
		console.log(key)
	}
}
function newLevelCheck()
{
	if (gameMetadata.changeLevel)
	{
		if (gameMetadata.gameLevel == 1)
		{
			gameMetadata.gameLevel = 2;
			levelTwo();
		}
		else
		{
			gameMetadata.gameLevel = 1;
			levelOne();
		}
	}
	gameMetadata.changeLevel = false;
}
function keyReleased()
{
	if (keyCode == 37)
	{
		charInfo.isLeft = false;
	}
	else if (keyCode == 39)
	{
		charInfo.isRight = false;
	}
}
function mousePressed() {
	if ((mouseX > startPlayingButton.x) && 
		(mouseX < startPlayingButton.x+startPlayingButton.width) && 
		(mouseY > startPlayingButton.y) && 
		(mouseY < startPlayingButton.y+startPlayingButton.height))
	{
		gameSounds.backgoundMusicbox.play();
		gameMetadata.isGameStarted = true;
		startPlayingButton.isPressed = true;
	}
}



//game main
function setup()
{
	createCanvas(1024, 576);
	startGame();
	gameSounds.backgroundCrickets.loop();
}

function draw()
{
	background(6, 0, 71);
	if (gameMetadata.isGameStarted && gameMetadata.isExplained){
		push();
		const newCameraPosX = charInfo.gameCharX - width / 2;
		const newCameraPosY = charInfo.gameCharY - floorPosY + 20;
		console.log(newCameraPosX,charInfo.gameCharX)
		if ((charInfo.gameCharX > width / 2) && (charInfo.gameCharX < maxX - width / 2))
		{
			cameraPos.x = cameraPos.x *0.85 + newCameraPosX * 0.15;
		}
		if (charInfo.isPlummeting == false)
		{
			cameraPos.y = cameraPos.y *0.945 + newCameraPosY * 0.055;
		}
		translate(-cameraPos.x, -cameraPos.y);

		noStroke();
		fill(26, 95, 122);
		rect(0, 432, maxX, 20);
		fill(5, 45, 72);
		rect(0,452,maxX, 250);
		// drawing each object in the arrays
		Object.entries(sceneryObjs).forEach(([key, value]) => {
			drawObjectsInArray(sceneryObjs[key].obj,key);
		});
		if (gameMetadata.gameLock == false)
		{
			//character and camera position control
			charInfo = charCordination(charInfo)
			//character design
			strokeWeight(1);
			charInfo.characterDraw();
		}
		pop();
		//print character score
		drawBoard();
	} else if (gameMetadata.isGameStarted == false) {
		gameWelcome();
	} else {
		gameIntroduction();
	}
}
