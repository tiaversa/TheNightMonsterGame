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
function preload()
{
    soundFormats('mp3','wav');
    gameSounds.jumpSound = loadSound('assets/jump.wav');
    gameSounds.jumpSound.setVolume(0.1);
	//https://freesound.org/people/DRFX/sounds/338986/
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

//actions for a finished phase
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
	let phrase;
	if(fetcedAll)
	{
		if (gameMetadata.gameLevel == 1)
		{
			phrase = `      Level ${gameMetadata.gameLevel} Completed! 
       Press space to play 
         the next level.`;
		}
		else
		{
			phrase = `              You Win! 
Press space to play again.`;
		}
		gameMetadata.changeLevel = true;
		runConfetties();
		messageWin(phrase);
	} 
	else 
	{
		phrase = `           Level finished.
But you didn't get all coins. 
  Press space to try again.`;
	}
	messageBoard(phrase,450,180);
	gameMetadata.gameLock = true;
	return soundPlayed
}
//draw lifes heart
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
//cordination of the character
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
//for the game button of the start
function buttonDraw(message)
{
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
//top game board
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
//draw each object of the background
function drawObjectsInArray(arrayObj)
{
	arrayObj.forEach(i => {i.draw();});
}
//messages if the character fail
function messageBoard(message,messageWidth,messageHeigth)
{
	push();
	translate(cameraPos.x + width/2 - messageWidth/ 2, 0);
	fill(212, 173, 252);
	rect(0, height/2 - messageHeigth/2 -10,messageWidth, messageHeigth -10);
	fill(92, 70, 156);
	rect(10, height/2 - messageHeigth/2,messageWidth -20, messageHeigth-30);
	noStroke();
	fill(255);
	textFont('Georgia',36 - message.length/30);
	text(message,30, height/2 - messageHeigth/2 +40);
	pop();
}
//messages if the charactor succeeds
function messageWin(message,messageWidth = 450,messageHeigth = 180)
{
	push();
	fill(212, 173, 252);
	rect(width/2 - messageWidth/2, height/2 - messageHeigth/2 -10,messageWidth, messageHeigth -10);
	fill(92, 70, 156);
	rect(width/2 - messageWidth/2 + 10, height/2 - messageHeigth/2,messageWidth -20, messageHeigth-30);
	noStroke();
	fill(255);
	textFont('Georgia',36 - message.length/30);
	text(message,width/2 - messageWidth/2 + 30, height/2 - messageHeigth/2 +40);
	pop();
}

//for the control board
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
//welcome message
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
//introduction message
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
	messageBoard(message,700,500);
}
// key press to user actions control
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
	if (gameMetadata.isGameStarted && gameMetadata.isExplained)
	{
		push();
		const newCameraPosX = charInfo.gameCharX - width / 2;
		const newCameraPosY = charInfo.gameCharY - floorPosY + 20;
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
			//character position control
			charInfo = charCordination(charInfo)
		}
		//character design
		charInfo.characterDraw();
		pop();
		//print character score
		drawBoard();
	} else if (gameMetadata.isGameStarted == false) {
		gameWelcome();
	} else {
		gameIntroduction();
	}
}
