function levelTwo()
{
	maxX = 5000;
	midScreen = maxX/2;
	sceneryObjs = {rocks:{amount:1250,obj:[]},
					stars:{amount:2050,obj:[]},
					mountains:{amount:30,obj:[]},
					trees:{amount:20,obj:[]},
					clouds:{amount:45,obj:[]},
					platforms:{location:[{x:750,y:floorPosY - 95,length:120},
										{x:1720,y:floorPosY - 95,length:120},
										{x:2400,y:floorPosY - 95,length:120},
										{x:2470,y:floorPosY - 190,length:120},
										{x:2540,y:floorPosY - 285,length:120},
										{x:3100,y:floorPosY - 95,length:120},
										{x:3170,y:floorPosY - 190,length:120}],
							obj:[]},
					collectables:{location:[{x:800,y:floorPosY - 118},
											{x:(midScreen - maxX/6),y:410},
											{x:(1820),y:floorPosY - 118},
											{x:(midScreen + maxX/3),y:410},
											{x:(maxX - 300),y:410},
											{x:2490,y:floorPosY - 210},
											{x:2556,y:floorPosY - 308},
											{x:2660,y:floorPosY - 308},
											{x:3090,y:412},
											{x:3140,y:floorPosY - 240},],
							obj:[]},
					canyons:{location:[{x:(midScreen - maxX/3)},
										{x:(midScreen - maxX/10)},
										{x:(midScreen + maxX/4)}],
							obj:[]},
					enemies:{location:[{x:680, y:floorPosY - 10, range:120},
										{x:1700, y:floorPosY - 10, range:200},
										{x:2556, y:floorPosY - 10, range:300},
										{x:(midScreen + maxX/3 -30), y:floorPosY - 10, range:300}],
							obj:[]},
					flagpoles:{obj:[]}
				};
	backgroundSetUp();
}