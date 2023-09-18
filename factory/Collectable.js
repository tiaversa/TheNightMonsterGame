function Collectable(x, y = 410)
{
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