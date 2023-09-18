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