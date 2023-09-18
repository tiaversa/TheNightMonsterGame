function Canyon(x,size = 1)
{
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