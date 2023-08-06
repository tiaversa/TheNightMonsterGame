/* Project Part 6 
Student: Timna Aversa 
Class: Introduction to Programming */


var floorPos_y = 432;
var max_x = 3000;
var cameraPosX;

var canyon;
var collectables;
var mountain;
var cloud;

var char_info;
var game_score;
var flagpole;

var game_lock;

//character set up
class characterClass 
{
	constructor() 
	{
		this.gameChar_x = 200;
		this.gameChar_y = floorPos_y;
		this.isLeft = false;
		this.isRight = false;
		this.isFalling = false;
		this.isPlummeting = false;
		this.lives = 3;
	}
}
function hair(gameChar_x,gameChar_y,size)
{
	fill(210, 83, 128);
	ellipse(gameChar_x - 0.18 * size,gameChar_y- 4.6 * size,0.45 * size,0.45 * size);
	ellipse(gameChar_x - 0.4 * size,gameChar_y- 4.3 * size,0.4 * size,0.4 * size);
	ellipse(gameChar_x,gameChar_y- 4.3 * size,0.5 * size,0.4 * size);
	ellipse(gameChar_x + 0.18 * size,gameChar_y- 4.6 * size,0.45 * size,0.45 * size);
	ellipse(gameChar_x + 0.4 * size,gameChar_y- 4.3 * size,0.4 * size,0.4 * size);

}
function eye(gameChar_x,gameChar_y,size,direction)
{
	dirNum = 0;
	if (direction === "left")
	{
		dirNum = -3;
	}
	if (direction === "right")
	{
		dirNum = 3;
	}
	fill(255);
	ellipse(gameChar_x + dirNum ,gameChar_y -3.1 * size,2.3 * size,2.3 * size);
	fill(0);
	ellipse(gameChar_x + dirNum * 2.4,gameChar_y - 3.1 * size+ dirNum * 0.2,
			1.4 * size,1.4 * size);
	fill(255);
	ellipse(gameChar_x + dirNum * 3.2,gameChar_y - 3.25 * size,0.7 * size,0.7 * size);
	ellipse(gameChar_x - 2 + dirNum,gameChar_y - 2.7 * size,0.3 * size,0.3 * size);
}
function mouth(gameChar_x,gameChar_y,size,direction)
{
	dirNum = 0;
	if (direction === "left")
	{
		dirNum = -4.2;
	}
	if (direction === "right")
	{
		dirNum = 4.2;
	}
	triangle(gameChar_x - 0.8 * size + dirNum, 
			gameChar_y - 1.3  * size,
			gameChar_x - 0.6 * size +dirNum, 
			gameChar_y - 1.6 * size, 
			gameChar_x - 0.4 * size+dirNum, 
			gameChar_y - 1.3 * size);
	triangle(gameChar_x + 0.8 * size + dirNum, 
			gameChar_y - 1.3 * size,
			gameChar_x + 0.6 * size + dirNum, 
			gameChar_y - 1.6 * size, 
			gameChar_x + 0.4 * size + dirNum, 
			gameChar_y - 1.3 * size);
	stroke(147, 118, 224);
	line(gameChar_x - 0.8 * size + dirNum, 
		gameChar_y - 1.3 * size,
		gameChar_x + 0.8 * size + dirNum, 
		gameChar_y - 1.3 * size);
}
function headBackground(gameChar_x,gameChar_y,size)
{
	horns(gameChar_x,gameChar_y,size);
	fill(255,116,177);
	ellipse(gameChar_x,gameChar_y-2.4 * size,4 * size,4 * size);
	noStroke();
	fill(128, 70, 116, 60);
	arc(gameChar_x,gameChar_y-2.4 * size,4 * size,4 * size,4.6,1.2,24);
	fill(255,116,177);
	ellipse(gameChar_x,gameChar_y-2.4 * size,3.4 * size,4 * size);
}
function stand(gameChar_x,gameChar_y,size,side)
{
	beginShape();
	vertex(gameChar_x + 0.3 * size * side, gameChar_y);
	vertex(gameChar_x + 0.35 * size * side, gameChar_y - 0.5 * size);
	vertex(gameChar_x + 0.8 * size * side, gameChar_y - 0.7 * size);
	vertex(gameChar_x + 1 * size * side, gameChar_y);
	endShape(CLOSE);
}
function legs(gameChar_x,gameChar_y,size,action,direction)
{
	fill(255,116,177);
	noStroke();
	dirNum = 0;
	if (action === "stand")
	{
		stand(gameChar_x,gameChar_y,size,-1);
		stand(gameChar_x,gameChar_y,size,1);
	}
	if (action === "jump")
	{
		jump(gameChar_x,gameChar_y,size,-1,0);
		jump(gameChar_x,gameChar_y,size,1,0);
	}
	if (action === "walk" & direction === "left")
	{
		walk(gameChar_x,gameChar_y,size,1, -12);
		walk(gameChar_x,gameChar_y,size,1, 0);
	}
	if (action === "walk" & direction === "right")
	{
		walk(gameChar_x,gameChar_y,size,-1, +12);
		walk(gameChar_x,gameChar_y,size,-1, 0);
	}
}
function walk(gameChar_x,gameChar_y,size,side,direction)
{
	beginShape();
	vertex(gameChar_x + 0.6 * size * side + direction, gameChar_y);
	vertex(gameChar_x + 0.35 * size * side + direction, gameChar_y - 0.2 * size);
	vertex(gameChar_x + 0.4 * size * side + direction, gameChar_y - 0.5 * size);
	vertex(gameChar_x + 0.9 * size * side + direction, gameChar_y - 0.6 * size);
	vertex(gameChar_x + 1 * size * side + direction, gameChar_y - 0.4 * size);
	vertex(gameChar_x + 1.4 * size * side + direction, gameChar_y- 0.2 * size);
	endShape(CLOSE);
}
function jump(gameChar_x,gameChar_y,size,side,direction)
{
	beginShape();
	stroke(128, 70, 116, 60);
	vertex(gameChar_x + 0.9 * size * side + direction, gameChar_y - 0.2 * size + direction);
	vertex(gameChar_x + 0.8 * size * side + direction, gameChar_y - 0.55 * size + direction);
	vertex(gameChar_x + 1.3 * size * side + direction, gameChar_y - 1 * size + direction);
	vertex(gameChar_x + 2 * size * side + direction, gameChar_y - 0.7 * size + direction);
	endShape(CLOSE);
	noStroke();
}
function horns(gameChar_x,gameChar_y,size)
{
	fill(255);
	arc(gameChar_x + 0.15 * size,gameChar_y-3.8 * size,3 * size,3 * size,6,2, PI);
	arc(gameChar_x - 0.15 * size,gameChar_y-3.8 * size,3 * size,3 * size,45,3.5, PI);
}
function characterMove(gameChar_x,gameChar_y,size,move,direction)
{
	legs(gameChar_x,gameChar_y,size,move,direction);
	headBackground(gameChar_x,gameChar_y,size);
	hair(gameChar_x,gameChar_y,size);
	eye(gameChar_x,gameChar_y,size, direction);
	mouth(gameChar_x,gameChar_y,size, direction);
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
function token(toke_obj)
{
	noStroke();
	fill(255, 211, 163);
	triangle(toke_obj.x - toke_obj.size,
				toke_obj.y,
				toke_obj.x,
				toke_obj.y + 2.5 * toke_obj.size,
				toke_obj.x + toke_obj.size,
				toke_obj.y);
	fill(225, 18, 153);
	arc(toke_obj.x, toke_obj.y-1, 2.3 * toke_obj.size, 3.3  * toke_obj.size, PI, 0 , CHORD);
}
function checkCollectable(collectables, cameraPosX, char_info, canyons,floorPos_y)
{
	Object.entries(collectables).forEach(([key, t_collectable]) => {
		if (t_collectable.isFound == false)
		{
			token(t_collectable);
			if (dist(cameraPosX + char_info.gameChar_x,char_info.gameChar_y,t_collectable.x, 
						t_collectable.y) < 25)
			{
				t_collectable.isFound = true;
				game_score += 1;
			}
		}
		Object.entries(canyons).forEach(([key, t_canyon]) => {
			if((t_canyon.x + t_canyon.width > cameraPosX + char_info.gameChar_x) && (cameraPosX + char_info.gameChar_x > t_canyon.x) && char_info.gameChar_y >= floorPos_y)
			{
				char_info.isPlummeting = true;
			}
		});
	});
	return collectables

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
	}
}
class canyonClass
{
	constructor(x,size)
	{
		this.x = x;
		this.size = size;
		this.width = 70 * this.size;
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
function character_draw(char_info)
{
	if (char_info.isLeft && char_info.isFalling)
	{
		characterMove(char_info.gameChar_x,char_info.gameChar_y,10,'jump','left');
	}
	else if (char_info.isRight && char_info.isFalling)
	{
		characterMove(char_info.gameChar_x,char_info.gameChar_y,10,'jump','right');
	}
	else if (char_info.isLeft)
	{
		characterMove(char_info.gameChar_x,char_info.gameChar_y,10,'walk','left');
	}
	else if (char_info.isRight)
	{
		characterMove(char_info.gameChar_x,char_info.gameChar_y,10,'walk','right');
	}
	else if (char_info.isFalling || char_info.isPlummeting)
	{
		characterMove(char_info.gameChar_x,char_info.gameChar_y,10,'jump','');
	}
	else
	{
		characterMove(char_info.gameChar_x,char_info.gameChar_y,10,'stand','');
	}
}
function heart(x_inp,y_inp, r)
{
	noStroke();
	fill(150, 0, 100);
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
function renderFladgpole()
{
	strokeWeight(5);
	stroke(255);
	line(flagpole.x_pos,floorPos_y,flagpole.x_pos,floorPos_y - 250);
	fill(135,206,250);
	if (flagpole.isReached)
	{
		rect(flagpole.x_pos,floorPos_y - 250,80,20);
		message = "Level complete. Press space to continue."
		message_board(message,1);
		game_lock = true;
	}
	else{
		rect(flagpole.x_pos,floorPos_y - 20,80,20);
	}
}
function checkFlagpole()
{
	finish_dist = abs(dist(flagpole.x_pos, 
							floorPos_y, 
							char_info.gameChar_x + cameraPosX, 
							char_info.gameChar_y
						)
					)
	if (finish_dist <= 15)
	{
		flagpole.isReached = true;
	}
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
			message = 'Game over. Press space to continue.';
			message_board(message,0);
			game_lock = true;
		}
	}
}
function startGame()
{
	cameraPosX = 0;
	game_score = 0;
	char_info = new characterClass()
	flagpole = {
		isReached: false,
		x_pos: max_x - 250
	}
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
}
function drawBoard()
{
	noStroke();
	fill(255,255,255,50);
	rect(10,5,120,40);
	fill(255);
	text('Lives: ',20,20);
	for( var i = 0; i < char_info.lives; i++)
	{
		heart(75 + i * 20,15,0.5);
	}
	fill(255);
	text('Score: ' + game_score, 20,40);
}
//type is to control the deslocation where necessary
function message_board(message,type)
{
	noStroke();
	fill(255,255,255,40);
	rect(cameraPosX * type+200, 180, 600, 200);
	fill(255);
	textFont('Georgia',16);
	text(message,cameraPosX * type+ width/2 - message.length * 4,height/2);
}


//game main
function setup()
{
	createCanvas(1024, 576);
	startGame();
	game_lock = false;
}

function draw()
{
	background(6, 0, 71);
	
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
	collectables = checkCollectable(
					collectables, 
					cameraPosX, 
					char_info,
					canyons,
					floorPos_y
					)
	//flagpole
	renderFladgpole();
	
	pop();
	if (game_lock == false)
	{
		//character and camera position control
		char_info, cameraPosX = char_and_camera_cordination(char_info,
															cameraPosX,
															floorPos_y)

		//character design
		strokeWeight(1);
		character_draw(char_info);
	}
	
	//print character score
	drawBoard();
	
	if(flagpole.isReached == false)
	{
		checkFlagpole();
	}
	checkPlayerDie();
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
		if (game_lock == true)
		{
			game_lock = false;
			reset();
			char_info.lives = 3;
		}
		else{
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
