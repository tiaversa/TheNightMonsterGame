function Tree()
{
	this.x = random(-300,maxX + 300);
	this.size = random(1,6);
	this.y = 432-this.size*6;
	this.draw = function()
	{
		noStroke();
		fill(60, 35, 23);
		rect(this.x-this.size,this.y-this.size*2,
				this.size*2,this.size*8);
		fill(46, 79, 79);
		stroke(44, 51, 51);
		triangle(this.x+this.size*10,
					this.y,this.x,
					this.y- this.size*26,
					this.x-this.size*10,
					this.y);
		noStroke();
		fill(44, 51, 51);
		beginShape();
		vertex(this.x+this.size*8, this.y-this.size*5);
		vertex(this.x, this.y-this.size*13);
		vertex(this.x-this.size*8, this.y-this.size*5);
		vertex(this.x,this.y- this.size*11);
		endShape();
	};
}