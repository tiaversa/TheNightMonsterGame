function levelOne()
{
	maxX = 3000;
	midScreen = maxX/2;
	sceneryObjs = {rocks:{amount:850,obj:[]},
					stars:{amount:1550,obj:[]},
					mountains:{amount:15,obj:[]},
					trees:{amount:8,obj:[]},
					clouds:{amount:35,obj:[]},
					platforms:{location:[{x:750,y:floorPosY - 100,length:120},
										{x:1720,y:floorPosY - 100,length:120},
										{x:2400,y:floorPosY - 100,length:120},
										{x:2470,y:floorPosY - 200,length:120}
								],
							obj:[]},
					collectables:{location:[{x:(midScreen - maxX/2.5),y:410},
											{x:(midScreen - maxX/6),y:410},
											{x:(1820),y:floorPosY - 118},
											{x:(midScreen + maxX/3),y:410},
											{x:(maxX - 300),y:410},
											{x:(2570),y:floorPosY - 218}
										],
							obj:[]},
					canyons:{location:[{x:(midScreen - maxX/3)},
										{x:(midScreen - maxX/10)},
										{x:(midScreen + maxX/4)}
									],
							obj:[]},
					enemies:{location:[{x:740, y:floorPosY - 10, range:150},
										{x:1700, y:floorPosY - 10, range:200}
									],
							obj:[]},
					flagpoles:{obj:[]}
				};
	backgroundSetUp();
}