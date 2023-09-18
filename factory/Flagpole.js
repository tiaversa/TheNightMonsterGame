function Flagpole(x = maxX - 250)
{
	this.isReached= false;
	this.xPos= x;
	this.soundPlayed = false;
	this.renderFladgpole = function()
	{
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
	this.checkFlagpole = function()
	{
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