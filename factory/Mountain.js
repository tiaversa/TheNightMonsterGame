function Mountain()
{
	this.x = random(-300,maxX + 300);
	this.y = random(300);
	this.size = random(1,8);
	this.draw = function()
	{
		this.y=432;
		fill(212, 173, 252);
		triangle(this.x,this.y,this.x,this.y- this.size*26,
					this.x+this.size*10,this.y);
		fill(92, 70, 156);
		triangle(this.x,this.y,this.x,this.y- this.size*26,
					this.x-this.size*10,this.y);
		fill(255);
		beginShape();
		vertex(this.x, this.y-this.size*18);
		vertex(this.x, this.y-this.size*26);
		vertex(this.x+this.size*3, this.y- this.size*18);
		vertex(this.x+this.size/2,this.y- this.size*20);
		endShape();
		fill(210);
		beginShape();
		vertex(this.x, this.y-this.size*18);
		vertex(this.x, this.y-this.size*26);
		vertex(this.x-this.size*3, this.y- this.size*18);
		vertex(this.x-this.size/2,this.y- this.size*20);
		endShape();
	};
}