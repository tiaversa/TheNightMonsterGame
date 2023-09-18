function Platform(x,y,length,range = 20)
{
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
	this.checkContact = function()
	{
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