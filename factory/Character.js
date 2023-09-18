function Character()
{
	this.gameCharX = 200;
	this.gameCharY = floorPosY;
	this.charSize = 10;
	this.isLeft = false;
	this.isRight = false;
	this.isFalling = false;
	this.isPlummeting = false;
	this.lives = 3;
	this.hair = function()
	{
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
	this.eye = function(direction)
	{
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
	this.mouth = function(direction)
	{
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
	this.headBackground = function ()
	{
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
	this.stand = function (side)
	{
		beginShape();
		vertex(this.gameCharX + 0.3 * this.charSize * side, this.gameCharY);
		vertex(this.gameCharX + 0.35 * this.charSize * side, this.gameCharY - 0.5 * this.charSize);
		vertex(this.gameCharX + 0.8 * this.charSize * side, this.gameCharY - 0.7 * this.charSize);
		vertex(this.gameCharX + 1 * this.charSize * side, this.gameCharY);
		endShape(CLOSE);
	};
	this.walk = function (side,direction)
	{
		beginShape();
		vertex(this.gameCharX + 0.6 * this.charSize * side + direction, this.gameCharY);
		vertex(this.gameCharX + 0.35 * this.charSize * side + direction, this.gameCharY - 0.2 * this.charSize);
		vertex(this.gameCharX + 0.4 * this.charSize * side + direction, this.gameCharY - 0.5 * this.charSize);
		vertex(this.gameCharX + 0.9 * this.charSize * side + direction, this.gameCharY - 0.6 * this.charSize);
		vertex(this.gameCharX + 1 * this.charSize * side + direction, this.gameCharY - 0.4 * this.charSize);
		vertex(this.gameCharX + 1.4 * this.charSize * side + direction, this.gameCharY- 0.2 * this.charSize);
		endShape(CLOSE);
	};
	this.jump = function (side,direction)
	{
		beginShape();
		stroke(128, 70, 116, 60);
		vertex(this.gameCharX + 0.9 * this.charSize * side + direction, this.gameCharY - 0.2 * this.charSize + direction);
		vertex(this.gameCharX + 0.8 * this.charSize * side + direction, this.gameCharY - 0.55 * this.charSize + direction);
		vertex(this.gameCharX + 1.3 * this.charSize * side + direction, this.gameCharY - 1 * this.charSize + direction);
		vertex(this.gameCharX + 2 * this.charSize * side + direction, this.gameCharY - 0.7 * this.charSize + direction);
		endShape(CLOSE);
		noStroke();
	};
	this.horns = function ()
	{
		fill(255);
		arc(this.gameCharX + 0.15 * this.charSize,this.gameCharY-3.8 * this.charSize,3 * this.charSize,
			3 * this.charSize,6, 3, PI);
		arc(this.gameCharX - 0.15 * this.charSize,this.gameCharY-3.8 * this.charSize,3 * this.charSize,
			3 * this.charSize,0,3.5, PI);
	};
	this.characterMove = function (direction)
	{
		this.headBackground();
		this.hair();
		this.eye(direction);
		this.mouth(direction);
		fill(255,116,177);
	};
	this.characterDraw = function ()
	{
		strokeWeight(1);
		if (this.isLeft && this.isFalling)
		{
			if (this.isLeft){this.characterMove('left');}
			if (this.isRight){this.characterMove('right');}
			if (this.isPlummeting){this.characterMove('');}
			this.jump(-1,0);
			this.jump(1,0);
		}
		else if (this.isLeft)
		{
			this.characterMove('left');
			this.walk(1, -12);
			this.walk(1, 0);
		}
		else if (this.isRight)
		{
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
				messageBoard(message,420,150, 300);
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