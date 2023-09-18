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