function Cloud()
{
	this.x = random(-300,maxX + 300);
	this.y = random(ceiling,250);
	this.size = random(1,8);
	this.draw = function()
	{
		noStroke();
		fill(255);
		rect(this.x + this.size * 4, this.y + this.size/2 * 10, 
				this.size * 13, this.size * 3, this.size*2);
		rect(this.x + this.size * 10, this.y + this.size/2 *5, 
				this.size * 5, this.size * 4, this.size*2);
		rect(this.x + this.size * 7, this.y + this.size, 
				this.size * 4.5, this.size * 6, this.size*2);
	};
}