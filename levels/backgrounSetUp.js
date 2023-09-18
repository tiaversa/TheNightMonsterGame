function backgroundSetUp()
{
	for(let i = 0; i < sceneryObjs.trees.amount; i++)
	{
		sceneryObjs.trees.obj.push(new Tree());
	}
	for(let i = 0; i < sceneryObjs.rocks.amount; i++)
	{
		sceneryObjs.rocks.obj.push(new Rock());
	}
	for(let i = 0; i < sceneryObjs.stars.amount; i++)
	{
		sceneryObjs.stars.obj.push(new Star());
	}
	for(let i = 0; i < sceneryObjs.mountains.amount; i++)
	{
		sceneryObjs.mountains.obj.push(new Mountain());
	}
	for(let i = 0; i < sceneryObjs.clouds.amount; i++)
	{
		sceneryObjs.clouds.obj.push(new Cloud());
	}
	sceneryObjs.canyons.location.forEach(c => {sceneryObjs.canyons.obj.push(new Canyon(c.x));});
	sceneryObjs.collectables.location.forEach(c => {sceneryObjs.collectables.obj.push(new Collectable(c.x,c.y));});
	sceneryObjs.platforms.location.forEach(p => {sceneryObjs.platforms.obj.push(new Platform(p.x,p.y,p.length));});
	sceneryObjs.enemies.location.forEach(e => {sceneryObjs.enemies.obj.push(new Enemy(e.x,e.y,e.range));});
	sceneryObjs.flagpoles.obj.push(new Flagpole());
}