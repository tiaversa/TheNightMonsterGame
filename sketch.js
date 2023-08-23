/* Project Part 6 
Student: Timna Aversa 
Class: Introduction to Programming */


let floorPos_y = 432;
let max_x = 3000;
let cameraPosX;
let is_game_started = false;
let is_explained = false;
let start_playing_button;

let collectables;

let char_info;
let game_score;
let flagpole;

let game_lock;
let jumpSound;
let coinSound;
let winSound;
let backgound_musicbox;
let background_crickets;

function preload(){
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
	//music bo sound https://freesound.org/people/DRFX/sounds/338986/
	backgound_musicbox = loadSound('assets/music_box.mp3');
    backgound_musicbox.setVolume(0.2);
	//https://freesound.org/people/justiiiiin/sounds/365075/
	background_crickets = loadSound('assets/crickets_night.wav');
    background_crickets.setVolume(0.1);
	//https://freesound.org/people/robbeman/sounds/495642/
	coinSound = loadSound('assets/coin.wav');
    coinSound.setVolume(0.1);
	//https://freesound.org/people/LittleRobotSoundFactory/sounds/274181/
	winSound = loadSound('assets/win.wav');
    winSound.setVolume(0.2);
}
//character set up
class characterClass {
	constructor(){
		this.gameChar_x = 200;
		this.gameChar_y = floorPos_y;
		this.char_size = 10;
		this.isLeft = false;
		this.isRight = false;
		this.isFalling = false;
		this.isPlummeting = false;
		this.lives = 3;
		this.hair = function(){
			fill(210, 83, 128);
			ellipse(this.gameChar_x - 0.18 * this.char_size,
					this.gameChar_y- 4.6 * this.char_size,
					0.45 * this.char_size,0.45 * this.char_size);
			ellipse(this.gameChar_x - 0.4 * this.char_size,
					this.gameChar_y- 4.3 * this.char_size,
					0.4 * this.char_size,0.4 * this.char_size);
			ellipse(this.gameChar_x,
					this.gameChar_y- 4.3 * this.char_size,
					0.5 * this.char_size,0.4 * this.char_size);
			ellipse(this.gameChar_x + 0.18 * this.char_size,
					this.gameChar_y- 4.6 * this.char_size,
					0.45 * this.char_size,0.45 * this.char_size);
			ellipse(this.gameChar_x + 0.4 * this.char_size,
					this.gameChar_y- 4.3 * this.char_size,
					0.4 * this.char_size,0.4 * this.char_size);
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
			ellipse(this.gameChar_x + dirNum ,
					this.gameChar_y -3.1 * this.char_size,
					2.3 * this.char_size,2.3 * this.char_size);
			fill(0);
			ellipse(this.gameChar_x + dirNum * 2.4,
					this.gameChar_y - 3.1 * this.char_size+ dirNum * 0.2,
					1.4 * this.char_size,1.4 * this.char_size);
			fill(255);
			ellipse(this.gameChar_x + dirNum * 3.2,
					this.gameChar_y - 3.25 * this.char_size,
					0.7 * this.char_size,0.7 * this.char_size);
			ellipse(this.gameChar_x - 2 + dirNum,
					this.gameChar_y - 2.7 * this.char_size,
					0.3 * this.char_size,0.3 * this.char_size);
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
			triangle(this.gameChar_x - 0.8 * this.char_size + dirNum, 
				this.gameChar_y - 1.3  * this.char_size,
				this.gameChar_x - 0.6 * this.char_size +dirNum, 
				this.gameChar_y - 1.6 * this.char_size, 
				this.gameChar_x - 0.4 * this.char_size+dirNum, 
				this.gameChar_y - 1.3 * this.char_size);
			triangle(this.gameChar_x + 0.8 * this.char_size + dirNum, 
				this.gameChar_y - 1.3 * this.char_size,
				this.gameChar_x + 0.6 * this.char_size + dirNum, 
				this.gameChar_y - 1.6 * this.char_size, 
				this.gameChar_x + 0.4 * this.char_size + dirNum, 
				this.gameChar_y - 1.3 * this.char_size);
			stroke(147, 118, 224);
			line(this.gameChar_x - 0.8 * this.char_size + dirNum, 
				this.gameChar_y - 1.3 * this.char_size,
				this.gameChar_x + 0.8 * this.char_size + dirNum, 
				this.gameChar_y - 1.3 * this.char_size);
		};
		this.headBackground = function (){
			this.horns(this.gameChar_x,
						this.gameChar_y,
						this.char_size);
			fill(255,116,177);
			ellipse(this.gameChar_x,
					this.gameChar_y-2.4 * this.char_size,
					4 * this.char_size,4 * this.char_size);
			noStroke();
			fill(128, 70, 116, 60);
			arc(this.gameChar_x,
				this.gameChar_y-2.4 * this.char_size,
				4 * this.char_size,4 * this.char_size,4.6,1.2,24);
			fill(255,116,177);
			ellipse(this.gameChar_x,
					this.gameChar_y-2.4 * this.char_size,
					3.4 * this.char_size,4 * this.char_size);
		};
		this.stand = function (side){
			beginShape();
			vertex(this.gameChar_x + 0.3 * this.char_size * side, this.gameChar_y);
			vertex(this.gameChar_x + 0.35 * this.char_size * side, this.gameChar_y - 0.5 * this.char_size);
			vertex(this.gameChar_x + 0.8 * this.char_size * side, this.gameChar_y - 0.7 * this.char_size);
			vertex(this.gameChar_x + 1 * this.char_size * side, this.gameChar_y);
			endShape(CLOSE);
		};
		this.walk = function (side,direction){
			beginShape();
			vertex(this.gameChar_x + 0.6 * this.char_size * side + direction, this.gameChar_y);
			vertex(this.gameChar_x + 0.35 * this.char_size * side + direction, this.gameChar_y - 0.2 * this.char_size);
			vertex(this.gameChar_x + 0.4 * this.char_size * side + direction, this.gameChar_y - 0.5 * this.char_size);
			vertex(this.gameChar_x + 0.9 * this.char_size * side + direction, this.gameChar_y - 0.6 * this.char_size);
			vertex(this.gameChar_x + 1 * this.char_size * side + direction, this.gameChar_y - 0.4 * this.char_size);
			vertex(this.gameChar_x + 1.4 * this.char_size * side + direction, this.gameChar_y- 0.2 * this.char_size);
			endShape(CLOSE);
		};
		this.jump = function (side,direction){
			beginShape();
			stroke(128, 70, 116, 60);
			vertex(this.gameChar_x + 0.9 * this.char_size * side + direction, this.gameChar_y - 0.2 * this.char_size + direction);
			vertex(this.gameChar_x + 0.8 * this.char_size * side + direction, this.gameChar_y - 0.55 * this.char_size + direction);
			vertex(this.gameChar_x + 1.3 * this.char_size * side + direction, this.gameChar_y - 1 * this.char_size + direction);
			vertex(this.gameChar_x + 2 * this.char_size * side + direction, this.gameChar_y - 0.7 * this.char_size + direction);
			endShape(CLOSE);
			noStroke();
		};
		this.horns = function (){
			fill(255);
			arc(this.gameChar_x + 0.15 * this.char_size,this.gameChar_y-3.8 * this.char_size,3 * this.char_size,3 * this.char_size,6, 3, PI);
			arc(this.gameChar_x - 0.15 * this.char_size,this.gameChar_y-3.8 * this.char_size,3 * this.char_size,3 * this.char_size,0,3.5, PI);
		};
		this.characterMove = function (direction){
			this.headBackground();
			this.hair();
			this.eye(direction);
			this.mouth(direction);
			fill(255,116,177);
		};
		this.character_draw = function (){
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
		};
	}
}
//game view
//Random generation of numbers function for simplification of code
function randNumb(maxNumber) 
{
	return Math.floor(Math.random() * maxNumber);
}
function tree(tree_obj)
{
	noStroke();
	tree_obj.y=432-tree_obj.size*6;
	fill(60, 35, 23);
	rect(tree_obj.x-tree_obj.size,tree_obj.y-tree_obj.size*2,
			tree_obj.size*2,tree_obj.size*8);
	fill(46, 79, 79);
	stroke(44, 51, 51);
	triangle(tree_obj.x+tree_obj.size*10,
				tree_obj.y,tree_obj.x,
				tree_obj.y- tree_obj.size*26,
				tree_obj.x-tree_obj.size*10,
				tree_obj.y);
	noStroke();
	fill(44, 51, 51);
	beginShape();
	vertex(tree_obj.x+tree_obj.size*8, tree_obj.y-tree_obj.size*5);
	vertex(tree_obj.x, tree_obj.y-tree_obj.size*13);
	vertex(tree_obj.x-tree_obj.size*8, tree_obj.y-tree_obj.size*5);
	vertex(tree_obj.x,tree_obj.y- tree_obj.size*11);
	endShape();
}
function mountain(mount_obj)
{
	mount_obj.y=432;
	fill(212, 173, 252);
	triangle(mount_obj.x,mount_obj.y,mount_obj.x,mount_obj.y- mount_obj.size*26,
				mount_obj.x+mount_obj.size*10,mount_obj.y);
	fill(92, 70, 156);
	triangle(mount_obj.x,mount_obj.y,mount_obj.x,mount_obj.y- mount_obj.size*26,
				mount_obj.x-mount_obj.size*10,mount_obj.y);
	fill(255);
	beginShape();
	vertex(mount_obj.x, mount_obj.y-mount_obj.size*18);
	vertex(mount_obj.x, mount_obj.y-mount_obj.size*26);
	vertex(mount_obj.x+mount_obj.size*3, mount_obj.y- mount_obj.size*18);
	vertex(mount_obj.x+mount_obj.size/2,mount_obj.y- mount_obj.size*20);
	endShape();
	fill(210);
	beginShape();
	vertex(mount_obj.x, mount_obj.y-mount_obj.size*18);
	vertex(mount_obj.x, mount_obj.y-mount_obj.size*26);
	vertex(mount_obj.x-mount_obj.size*3, mount_obj.y- mount_obj.size*18);
	vertex(mount_obj.x-mount_obj.size/2,mount_obj.y- mount_obj.size*20);
	endShape();
}
function star(star_obj)
{
	i = randNumb(5)
	if (i==0){fill(255, 95, 158);}
	else if (i==1){fill(233, 0, 100);}
	else if (i==2){fill(249, 217, 73);}
	else if (i==3){fill(240, 240, 240);}
	else if (i==4){fill(58, 180, 242);}
	else{fill(39, 225, 193);}
	ellipse(star_obj.x,star_obj.y,1,1);
}
function rock(rock_obj)
{
	size = rock_obj.size + 2;
	i = size % 3
	if (i==0){fill(65, 53, 67,50);}
	else if (i==1){fill(240, 235, 141,50);}
	else{fill(143, 67, 238, 50);}
	ellipse(rock_obj.x,floorPos_y + 25 + rock_obj.y,size,size-3);
}
function cloud(cloud_obj)
{
	noStroke();
	fill(255);
	rect(cloud_obj.x + cloud_obj.size * 4, cloud_obj.y + cloud_obj.size/2 * 10, 
			cloud_obj.size * 13, cloud_obj.size * 3, cloud_obj.size*2);
	rect(cloud_obj.x + cloud_obj.size * 10, cloud_obj.y + cloud_obj.size/2 *5, 
			cloud_obj.size * 5, cloud_obj.size * 4, cloud_obj.size*2);
	rect(cloud_obj.x + cloud_obj.size * 7, cloud_obj.y + cloud_obj.size, 
			cloud_obj.size * 4.5, cloud_obj.size * 6, cloud_obj.size*2);
}
function canyonDraw(canyon)
{
	noStroke();
	fill(169, 113, 85);
	rect(canyon.x,floorPos_y,canyon.width,200);
}
//initiating classes of random objects positioning
class positionClass 
{
	constructor(maxX,maxY,maxSize) {
		this.x = randNumb(maxX);
		this.y = randNumb(maxY);
		this.size = randNumb(maxSize);
	}
}
class collectableClass
{
	constructor(x) {
		this.x = x;
		this.y = 410;
		this.size = 7;
		this.isFound = false;
		this.token_draw = function ()
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
				this.token_draw();
				if (dist(cameraPosX + char_info.gameChar_x,char_info.gameChar_y,this.x, 
							this.y) < 25)
				{
					this.isFound = true;
					game_score += 1;
					coinSound.play();
				}
			}
		};
	}
}
class canyonClass
{
	constructor(x,size)
	{
		this.x = x;
		this.size = size;
		this.width = 70 * this.size;
		this.checkCanyon = function()
		{
			if((this.x + this.width > cameraPosX + char_info.gameChar_x) && (cameraPosX + char_info.gameChar_x > this.x) && char_info.gameChar_y >= floorPos_y)
			{
				char_info.isPlummeting = true;
			}
		};
	}
}
class flagpoleClass
{
	constructor()
	{
		this.isReached= false;
		this.x_pos= max_x - 250;
		this.sound_played = false;
		this.renderFladgpole = function(){
			strokeWeight(5);
			stroke(255);
			line(this.x_pos,floorPos_y,this.x_pos,floorPos_y - 250);
			fill(135,206,250);
			if (this.isReached)
			{
				if(this.sound_played == false)
				{
					winSound.play();
					this.sound_played = true;
				}
				let fetced_all = true;
				for (let i = 0 ; i < collectables.length; i++)
				{
					if(collectables[i].isFound == false){fetced_all = false}
				}
				rect(this.x_pos,this - 250,80,20);
				let message = ''
				if(fetced_all){
					message = `              You Win! 
Press space to play again.`;
					message_board(message,450,140);
				} else {
					message = `           Level complete.
But you didn't get all coins. 
  Press space to play again.`;
					message_board(message,450,180);
				}
				game_lock = true;
				runConfetties();
			}
			else{
				rect(this.x_pos,floorPos_y - 20,80,20);
			}
		}
		this.checkFlagpole = function(){
			let finish_dist = abs(dist(this.x_pos, 
									floorPos_y, 
									char_info.gameChar_x + cameraPosX, 
									char_info.gameChar_y
								)
							)
			if (finish_dist <= 15)
			{
				this.isReached = true;
			}
		}
	}
}
// object to control the random generated objects
let sceneryObjs = {rocks:{'rand':850,'x':max_x,'y':120,'size':8,'obj':[]},
					stars:{'rand':1050,'x':max_x,'y':425,'size':8,'obj':[]},
					mountains:{'rand':20,'x':max_x,'y':300,'size':8,'obj':[]},
					trees:{'rand':10,'x':max_x,'y':0,'size':6,'obj':[]},
					clouds:{'rand':15,'x':max_x,'y':100,'size':8,'obj':[]}
				};
function drawObjectsInArray(array_obj, obj_type)
{
	for (let i = 0; i < array_obj.length; i++) 
	{
		switch (obj_type) {
			case 'trees':
				tree(array_obj[i]);
				break;
			case 'rocks':
				rock(array_obj[i]);
				break;
			case 'stars':
				star(array_obj[i]);
				break;
			case 'clouds':
				cloud(array_obj[i]);
				break;
			case 'mountains':
				mountain(array_obj[i]);
				break;
			case 'canyons':
				canyonDraw(array_obj[i]);
			default:
		}

	}
}

function heart(x_inp,y_inp, r)
{
	noStroke();
	fill(255);
	beginShape();
	for (let a = 0; a < TWO_PI; a += 0.1) {
		const x = x_inp + r * 16 * pow(sin(a), 3);
		const y = y_inp + -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));

		vertex(x, y);
	}
	endShape();
}
function char_and_camera_cordination(char_info,cameraPosX,floorPos_y)
{
	if (char_info.isPlummeting == true)
	{
		char_info.gameChar_y += 8;
	}
	else if (char_info.isLeft == true)
	{
		if ((cameraPosX < max_x - width) && (char_info.gameChar_x > 200))
		{
			char_info.gameChar_x -= 5;
		}
		else if (cameraPosX < 0)
		{
			if (char_info.gameChar_x > 0)
			{
				char_info.gameChar_x -= 5;
			}
		}
		else
		{
			cameraPosX -= 5;
		}
	}
	else if (char_info.isRight == true)
	{
		if ((cameraPosX <= 0) && (char_info.gameChar_x < 200))
		{
			char_info.gameChar_x += 5;
		}
		else if (cameraPosX > max_x - width)
		{
			if (char_info.gameChar_x <= width - 100)
			{
				char_info.gameChar_x += 5;
			}
		}
		else
		{
			cameraPosX += 5;
		}
	}

	if (char_info.gameChar_y < floorPos_y)
	{
		char_info.gameChar_y += 4;
		char_info.isFalling = true;
	}
	else 
	{
		char_info.isFalling = false;
	}
	return char_info, cameraPosX
}

function reset()
{
	char_info.gameChar_x = 200;
			char_info.gameChar_y = floorPos_y;
			char_info.isLeft = false;
			char_info.isRight = false;
			char_info.isFalling = false;
			char_info.isPlummeting = false;
			char_info.lives -= 1;
			cameraPosX = 0;
			Object.entries(collectables).forEach(([key, collectable]) => {
				collectable.isFound = false
			});
			game_score = 0;
			flagpole.isReached = false;
			flagpole.sound_played = false;
}
function checkPlayerDie()
{
	if ((char_info.isPlummeting) && (char_info.gameChar_y > height))
	{
		if (char_info.lives > 1)
		{
			reset();
		}
		else{
			message = `         Game over. 
Press space to continue.`;
			message_board(message,500,150);
			game_lock = true;
		}
	}
}
function startGame()
{
	cameraPosX = 0;
	game_score = 0;
	char_info = new characterClass();
	flagpole = new flagpoleClass();
	//generate objects in the arrays
	Object.entries(sceneryObjs).forEach(([key, value]) => {
		for (let j = 0; j < value.rand; j++) 
		{
			sceneryObjs[key].obj.push(new positionClass(value.x,value.y,value.size));
		}
	});
	mid_screen = max_x/2;
	collectables = [new collectableClass(mid_screen - max_x/2.5),
					new collectableClass(mid_screen - max_x/6),
					new collectableClass(mid_screen + max_x/6),
					new collectableClass(mid_screen + max_x/3),
					new collectableClass(max_x - 300)
				]
	canyons = [new canyonClass(mid_screen - max_x/3, 1),
				new canyonClass(mid_screen - max_x/10, 1),
				new canyonClass(mid_screen + max_x/4, 2)]
	sceneryObjs['canyons'] = {obj:canyons}
	setupConfetti();
	start_playing_button = {x:width/2 - 90,
							y:height/2+40,
							width: 200,
							height: 80,
							is_pressed:false
						}
}
function button_draw(message){
	if ((mouseX > start_playing_button.x) && 
		(mouseX < start_playing_button.x+start_playing_button.width) && 
		(mouseY > start_playing_button.y) && 
		(mouseY < start_playing_button.y+start_playing_button.height))
	{
		fill(212, 173, 252);
		rect(start_playing_button.x,start_playing_button.y,
			start_playing_button.width,start_playing_button.height,20);
	
		fill(255);
		text(message, start_playing_button.x + 10,start_playing_button.y + 50);
	}
	else{
		fill(255);
		rect(start_playing_button.x,start_playing_button.y,
			start_playing_button.width,start_playing_button.height,20);
		fill(0);
		text(message, start_playing_button.x + 10,start_playing_button.y + 50);
	}
	noStroke();
	noFill();
}
function start_game_button()
{
	is_game_started = true;
}
function drawBoard()
{
	noStroke();
	fill(212, 173, 252);
	polygon(100,0,100,8);
	fill(92, 70, 156);
	polygon(100,0,97,8);
	fill(255);
	textFont('Georgia',24);
	text('Lives: ',37,25);
	for( let i = 0; i < char_info.lives; i++)
	{
		heart(120 + i * 25,18,0.7);
	}
	fill(255);
	text('Score: ' + game_score, 37,60);
}
//type is to control the deslocation where necessary
function message_board(message,message_width,message_heigth)
{
	fill(212, 173, 252);
	rect(cameraPosX + width/2 - message_width/ 2, height/2 - message_heigth/2 -10,message_width, message_heigth -10);
	fill(92, 70, 156);
	rect(cameraPosX + width/2 - message_width/ 2 + 10, height/2 - message_heigth/2,message_width -20, message_heigth-30);
	noStroke();
	fill(255);
	textFont('Georgia',36 - message.length/30);
	text(message,cameraPosX + width/2 - message_width/ 2 + 30, height/2 - message_heigth/2 +40);
}

// Not my code, credit too: https://editor.p5js.org/slow_izzm/sketches/H1fhGJSaX
let nouvelle,
  ancienne,
  pression;

let themeCouleur = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
  '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722'
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
// from p5js documentation
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
//back to my code


//game main
function setup()
{
	createCanvas(1024, 576);
	startGame();
	game_lock = false;
	backgound_musicbox.loop();
	background_crickets.loop();
}

function draw()
{
	background(6, 0, 71);
	if (is_game_started && is_explained){
		noStroke();
		fill(26, 95, 122);
		rect(0, 432, 1024, 20);
		fill(5, 45, 72);
		rect(0,452,1024, 120);
		push();
		translate(-cameraPosX, 0);
		// drawing each object in the arrays
		Object.entries(sceneryObjs).forEach(([key, value]) => {
			drawObjectsInArray(sceneryObjs[key].obj,key);
		});
		
		// controlling token drawing and interaction with character
		Object.entries(collectables).forEach(([key, collectable]) => {
			collectable.checkCollectable(collectables, 
				cameraPosX, 
				char_info,
				canyons,
				floorPos_y)});
		Object.entries(canyons).forEach(([key, canyon]) => {
			canyon.checkCanyon()});
					
					// return collectables
		//flagpole
		flagpole.renderFladgpole();
		pop();
		if (game_lock == false)
		{
			//character and camera position control
			char_info, cameraPosX = char_and_camera_cordination(char_info,
																cameraPosX,
																floorPos_y)

			//character design
			strokeWeight(1);
			char_info.character_draw();
		}
		
		//print character score
		drawBoard();
		
		if(flagpole.isReached == false)
		{
			flagpole.checkFlagpole();
		}
		checkPlayerDie();
	} else if (is_game_started == false) {
		fill(212, 173, 252);
		polygon(width/2,height/2,230,10);
		fill(92, 70, 156);
		polygon(width/2,height/2,210,10);
		fill(255);
		textFont('Georgia',36);
		text('Welcome to',width/2-90,height/2- 60);
		text('Night Monster',width/2-110,height/2- 10);
		button_draw('Start Game');
	} else {
		message = `Welcome Dear Player to the Night Monster,

In this game, our little night monster called Sparkaboo, is competing
to get free Ice Cream for a year!
To win this important competition Sparkaboo has to have the highest
number of Ice Cream coins in town, by collecting them throughtout 
the forest.
Come and join us in this adventure!

How to Play:
Press the side arrow buttons to move towards each side.
Press space to jump.

Press space to start!
`
		message_board(message,700,500);
	}

}
// user actions control
function keyPressed()
{
	if (keyCode == 37)
	{
		char_info.isLeft = true;
	}
	else if (keyCode == 39)
	{
		char_info.isRight = true;
	}
	else if (keyCode == 32)
	{
		if (is_explained == false)
		{
			is_explained = true;
		}
		else if (game_lock == true)
		{
			game_lock = false;
			reset();
			char_info.lives = 3;
		}
		else{
			jumpSound.play();
			char_info.gameChar_y -= 100;
			if (char_info.gameChar_y <= 300)
			{
				char_info.gameChar_y = 300;
			}
		}
	}
	else
	{
		console.log(key)
	}
}
function keyReleased()
{
	if (keyCode == 37)
	{
		char_info.isLeft = false;
	}
	else if (keyCode == 39)
	{
		char_info.isRight = false;
	}
}
function mousePressed() {
	if ((mouseX > start_playing_button.x) && 
		(mouseX < start_playing_button.x+start_playing_button.width) && 
		(mouseY > start_playing_button.y) && 
		(mouseY < start_playing_button.y+start_playing_button.height))
	{
		is_game_started = true;
		start_playing_button.is_pressed = true;
	}
}
