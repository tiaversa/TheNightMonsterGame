function Star()
{
	this.x = random(-300,maxX + 300);
	this.y = random(ceiling,425);
	this.draw = function()
	{
		let i = floor(random(5));
		if (i==0){fill(255, 95, 158);}
		else if (i==1){fill(233, 0, 100);}
		else if (i==2){fill(249, 217, 73);}
		else if (i==3){fill(240, 240, 240);}
		else if (i==4){fill(58, 180, 242);}
		else{fill(39, 225, 193);}
		ellipse(this.x,this.y,1,1);
	};
}