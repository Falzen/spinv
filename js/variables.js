










/***
 *    ███████╗███████╗████████╗████████╗██╗███╗   ██╗ ██████╗ ███████╗                     
 *    ██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗  ██║██╔════╝ ██╔════╝                     
 *    ███████╗█████╗     ██║      ██║   ██║██╔██╗ ██║██║  ███╗███████╗                     
 *    ╚════██║██╔══╝     ██║      ██║   ██║██║╚██╗██║██║   ██║╚════██║                     
 *    ███████║███████╗   ██║      ██║   ██║██║ ╚████║╚██████╔╝███████║                     
 *    ╚══════╝╚══════╝   ╚═╝      ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝      
 */
 // DOM stuff
 var canvas;
var settings = {
	canvasWidth: 450,
	canvasHeight: 800,
	backgroundSpeeds: {
		y: 4, // default, should be function of enemies number
		x: 0 // going sideways (no)
	},
	score: 200
}

var statistics = {
	killCount: 0,
	shootCount: 0,
	hitCount: 0,
	currentLevel: 1
}
// engine mechanics
var updateLoop;
var friction = 0.89;
var bgRelativeSpeedY = 0;

// spawnEnemies
var isEnemiesSpawning = false;
var enemySpawningTimer = 800;

// spawn items
var isItemsSpawning = false;
var itemsSpawningTimer = { // 
	min: 1000, 
	max: 1500
};
let spawnItemsCpt = 0; // used to create a frame delay between different items in spawnItems()

var Entity_Template = function(settings) {
	this.x = settings.x;
	this.y = settings.y;
	this.w = settings.w;
	this.h = settings.h;
	this.sx = settings.sx; // speed x
	this.sy = settings.sy; // speed y
	this.ms = settings.ms; // MAX speed

	this.hp = settings.hp;
	this.mHp = settings.mHp;
	this.shield = settings.shield;
	this.mshield = settings.mshield;

	this.c = settings.c; // color
}
var isOnHomeMenu = true;

// init in initLateVariables(), called after canvas exists
var homeMenuChoices = [];






/***
 *    ██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗                                     
 *    ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗                                    
 *    ██████╔╝██║     ███████║ ╚████╔╝ █████╗  ██████╔╝                                    
 *    ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗                                    
 *    ██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║                                    
 *    ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝              
 */
var pl;
// TODO better health system : currently health is based on div#healthBar's pixel width (max = 200px). wtf.
var fullHealthWidth =  1*(getComputedStyle(document.getElementById('healthBar')).width.split('px')[0]);
var fullRageWidth =  1*(getComputedStyle(document.getElementById('rageBar')).width.split('px')[0]);
var domRageAmount = document.getElementById('rageAmount');

var playerSettings = {
	x: settings.canvasWidth/3,
	y: settings.canvasHeight - 48,
	w: 32, // hitboxMargin*2
	h: 42, // hitboxMargin*2
	hitboxMargin: 4,
	ms: 5, // MAX speed
	sx: 0, // speed x 
	sy: 0, // speed y

	hp: 100,
	mHp: 100,
	shield: 50,
	mshield: 50,
	dmg: 1,
	isSpeedingUp: false,
	wasSpeedingUp: false,
	isRageAvailable: false,
	isInvincible: false,
	effectWhenShotAt: '',
	effectWhenTouched: '',

	img: {
		src: "img/spaceshipsprites.gif",
		startX: 39,
		startY: 39,
		spriteWidth: 39,
		spriteHeight: 39
	},

}
var Player_Entity = function(settings) {
  	Entity_Template.call(this, settings);
  	this.dmg = settings.dmg;

	this.isSpeedingUp = settings.isSpeedingUp;
	this.wasSpeedingUp = settings.wasSpeedingUp;
	this.isRageAvailable = settings.isRageAvailable;
	this.isInvincible = settings.isInvincible;
	this.effectWhenShotAt = settings.effectWhenShotAt;
	this.effectWhenTouched = settings.effectWhenTouched;

	this.img = new Image();
	this.img.src = settings.img.src;
	this.img.startX = settings.img.startX;
	this.img.startY = settings.img.startY;
	this.img.spriteWidth = settings.img.spriteWidth;
	this.img.spriteHeight = settings.img.spriteHeight;
	
}
// let myNewPlayer = new Player_Entity(playerSettings);








/***
 *    ██████╗ ██╗██████╗ ███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗           
 *    ██╔══██╗██║██╔══██╗██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝           
 *    ██║  ██║██║██████╔╝█████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗           
 *    ██║  ██║██║██╔══██╗██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║           
 *    ██████╔╝██║██║  ██║███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║           
 *    ╚═════╝ ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝                                                            
 */
 var dirs = {
	left: false,
	up: false,
	down: false,
	right: false,
	arrowUp: false,
	arrowLeft: false,
	arrowDown: false,
	arrowRight: false
};










/***
 *     █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗                              
 *    ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝                              
 *    ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗                              
 *    ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║                              
 *    ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║                              
 *    ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝                                             
 */
 var btns = {
	space: false,
	shift: false,
	action0: false,
	action1: false,
	action2: false,
	action3: false,
	pause: false
}










/***
 *    ███████╗███╗   ██╗████████╗██╗████████╗██╗███████╗███████╗                           
 *    ██╔════╝████╗  ██║╚══██╔══╝██║╚══██╔══╝██║██╔════╝██╔════╝                           
 *    █████╗  ██╔██╗ ██║   ██║   ██║   ██║   ██║█████╗  ███████╗                           
 *    ██╔══╝  ██║╚██╗██║   ██║   ██║   ██║   ██║██╔══╝  ╚════██║                           
 *    ███████╗██║ ╚████║   ██║   ██║   ██║   ██║███████╗███████║                           
 *    ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝    
 */

var missiles = [];
var enemies = [];
var bonuses = [];
var items = [];
var playerFiringInterval;









/***
 *    ███████╗██╗██████╗ ██╗███╗   ██╗ ██████╗                                             
 *    ██╔════╝██║██╔══██╗██║████╗  ██║██╔════╝                                             
 *    █████╗  ██║██████╔╝██║██╔██╗ ██║██║  ███╗                                            
 *    ██╔══╝  ██║██╔══██╗██║██║╚██╗██║██║   ██║                                            
 *    ██║     ██║██║  ██║██║██║ ╚████║╚██████╔╝                                            
 *    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝  
 */
 var firingRate = 100;
var isFiring; 
var wasFiring; 
var firingTimeout = null;










/***
 *    ███████╗███╗   ██╗███████╗███╗   ███╗██╗███████╗███████╗                             
 *    ██╔════╝████╗  ██║██╔════╝████╗ ████║██║██╔════╝██╔════╝                             
 *    █████╗  ██╔██╗ ██║█████╗  ██╔████╔██║██║█████╗  ███████╗                             
 *    ██╔══╝  ██║╚██╗██║██╔══╝  ██║╚██╔╝██║██║██╔══╝  ╚════██║                             
 *    ███████╗██║ ╚████║███████╗██║ ╚═╝ ██║██║███████╗███████║                             
 *    ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝╚═╝╚══════╝╚══════╝                  
 */
// standardEnemyStats
var standardEnemyStats = {
	type: 'standardEnemy',
	x: 5,
	ox: 5,
	y: -72,
	oy: -72,
	w: 24,
	h: 48,

	sx: 0,
	sy: {
		min: 1,
		max: 1
	},
	c: 'tomato',

	hp: 1,
	mHp: 2,
	dmg: 1,
	pts: 5,
	effectWhenShotAt: 'getHit',
	effectWhenTouched: 'getHit;doDamage',

	explosionSprite: {
		src: "img/explosion_sprite.png",
		startX: 0, // where the animation begins in the spritesheet
		startY: 0,
		spriteWidth: 64, // on sprite dimensions
		spriteHeight: 64,
		offsets: { // for storing the animation steps
			x: 0,
			y: 0
		},
		nbFramesCount: 0, // store sprite number to determine the end of the animation
		nbFramesTotal: 40,
		nbFramesPerRow: 8, // to evaluate when to increment offsets.y and reset offsets.x
		frameDelay: 5,
		frameDelayCpt: 0,
	}

};

var Enemy_Entity = function(settings) {
	Entity_Template.call(this, settings);
	this.type = settings.type;
  	this.ox = settings.ox;
	this.oy = settings.oy;
	// overwrite speex Y with random from settings
	this.sy = getRandomInt(settings.sy.min, settings.sy.max);

	this.dmg = settings.dmg;
	this.pts = settings.pts;
	this.effectWhenShotAt = settings.effectWhenShotAt;
	this.effectWhenTouched = settings.effectWhenTouched;
	
	this.isExploding = false;
	this.explosionSprite = new Image();
	this.explosionSprite.src = settings.explosionSprite.src;
	this.explosionSprite.startX = settings.explosionSprite.startX;
	this.explosionSprite.startY = settings.explosionSprite.startY;
	this.explosionSprite.offsets = JSON.parse(JSON.stringify(settings.explosionSprite.offsets));
	this.explosionSprite.spriteWidth = settings.explosionSprite.spriteWidth;
	this.explosionSprite.spriteHeight = settings.explosionSprite.spriteHeight;
	this.explosionSprite.nbFramesCount = settings.explosionSprite.nbFramesCount;
	this.explosionSprite.nbFramesTotal = settings.explosionSprite.nbFramesTotal;
	this.explosionSprite.nbFramesPerRow = settings.explosionSprite.nbFramesPerRow;
	this.explosionSprite.frameDelay = settings.explosionSprite.frameDelay;
	this.explosionSprite.frameDelayCpt = settings.explosionSprite.frameDelayCpt;
}
// let myNewStandardEnemy = new Enemy_Entity(ses);

/*
EXAMPLE :
var settings = {name:'toto', currentXP:13};
var Character_Template = function(settings) {
  this.name = settings.name;
  blabla...
}
var Player = function(settings) {
  Character_Template.call(this, settings);
  this.currentXP = 0;
}
var heros = new Player(stats);
*/







/***
 *    ██████╗  █████╗  ██████╗██╗  ██╗ ██████╗ ██████╗  ██████╗ ██╗   ██╗███╗   ██╗██████╗ 
 *    ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝ ██╔══██╗██╔═══██╗██║   ██║████╗  ██║██╔══██╗
 *    ██████╔╝███████║██║     █████╔╝ ██║  ███╗██████╔╝██║   ██║██║   ██║██╔██╗ ██║██║  ██║
 *    ██╔══██╗██╔══██║██║     ██╔═██╗ ██║   ██║██╔══██╗██║   ██║██║   ██║██║╚██╗██║██║  ██║
 *    ██████╔╝██║  ██║╚██████╗██║  ██╗╚██████╔╝██║  ██║╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝
 *    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ 
 */
 var bgs = {
	t: null, // top
	l: null, // left
	d: null, // down
	r: null // right
}
var bgPositions = {
	t: {
		x: 0,
		y: (-1*settings.canvasHeight)
	},
	d: {
		x: 0,
		y: 0
	}
}

var background;
var backgroundBis;










/***
 *    ███╗   ███╗██╗███████╗███████╗██╗██╗     ███████╗███████╗                            
 *    ████╗ ████║██║██╔════╝██╔════╝██║██║     ██╔════╝██╔════╝                            
 *    ██╔████╔██║██║███████╗███████╗██║██║     █████╗  ███████╗                            
 *    ██║╚██╔╝██║██║╚════██║╚════██║██║██║     ██╔══╝  ╚════██║                            
 *    ██║ ╚═╝ ██║██║███████║███████║██║███████╗███████╗███████║                            
 *    ╚═╝     ╚═╝╚═╝╚══════╝╚══════╝╚═╝╚══════╝╚══════╝╚══════╝   
 */


var carpetBombingData = {
	type: 'carpetbombing',
    x: 0,
    y: settings.canvasHeight*1.2,
    oy: settings.canvasHeight*1.2,// original Y position
    xd: 0,
    w: 52,
    h: 52, // used to be 22
    sx: 12,
    sy: 8,
    dmg: 10,
	c: 'blue',
	
	
	shotsSprites: [
		{
			src: "img/carpet_sprite.png",
			startX: 0, // where the animation begins in the spritesheet
			startY: 0,
			spriteWidth: 134, // on sprite dimensions
			spriteHeight: 134,
			offsets: { // for storing the animation steps
				x: 0,
				y: 0
			},
			nbFramesCount: 0, // store sprite number to determine the end of the animation
			nbFramesTotal: 24,
			nbFramesPerRow: 6, // to evaluate when to increment offsets.y and reset offsets.x
			frameDelay: 5,
			frameDelayCpt: 0
		},
		// {
		// 	src: "img/carpetbombing_sprite.png",
		// 	startX: 0, // where the animation begins in the spritesheet
		// 	startY: 0,
		// 	spriteWidth: 113, // on sprite dimensions
		// 	spriteHeight: 128,
		// 	offsets: { // for storing the animation steps
		// 		x: 0,
		// 		y: 0
		// 	},
		// 	nbFramesCount: 0, // store sprite number to determine the end of the animation
		// 	nbFramesTotal: 16,
		// 	nbFramesPerRow: 4, // to evaluate when to increment offsets.y and reset offsets.x
		// 	frameDelay: 5,
		// 	frameDelayCpt: 0
		// }
	],
}

// missiles stats
var mstats = {
	type: 'playerMissile',
	x: null,
	y: null,
	xd: 0, // x direction
	w: 22,
	h: 52,
	sx: 0, // speed X axis
	sy: 14, // speed Y axis
 	dmg: 1,
	c: 'green',
	
	shotsSprites: [
		{
			src: "img/shots_sprite.png",
			startX: 0, // where the animation begins in the spritesheet
			startY: 0,
			spriteWidth: 22, // on sprite dimensions
			spriteHeight: 52,
			offsets: { // for storing the animation steps
				x: 0,
				y: 0
			},
			nbFramesCount: 0, // store sprite number to determine the end of the animation
			nbFramesTotal: 5,
			nbFramesPerRow: 5, // to evaluate when to increment offsets.y and reset offsets.x
			frameDelay: 5,
			frameDelayCpt: 0,
		}
	],
}

var Missile_Entity = function(settings) {
  	Entity_Template.call(this, settings);
	this.type = settings.type;
 	this.dmg = settings.dmg;
	this.xd = settings.xd; // x direction, 0 by default means NO side deviations

	this.shotsSprites = [];
	for(let i=0; i<settings.shotsSprites.length; i++) {
		let shotAnim = new Image();
		shotAnim.src = settings.shotsSprites[i].src;
		shotAnim.startX = settings.shotsSprites[i].startX;
		shotAnim.startY = settings.shotsSprites[i].startY;
		shotAnim.offsets = JSON.parse(JSON.stringify(settings.shotsSprites[i].offsets));
		shotAnim.spriteWidth = settings.shotsSprites[i].spriteWidth;
		shotAnim.spriteHeight = settings.shotsSprites[i].spriteHeight;
		shotAnim.nbFramesCount = settings.shotsSprites[i].nbFramesCount;
		shotAnim.nbFramesTotal = settings.shotsSprites[i].nbFramesTotal;
		shotAnim.nbFramesPerRow = settings.shotsSprites[i].nbFramesPerRow;
		shotAnim.frameDelay = settings.shotsSprites[i].frameDelay;
		shotAnim.frameDelayCpt = settings.shotsSprites[i].frameDelayCpt;
		this.shotsSprites.push(shotAnim);
	}
}
// let myNewMissile = new Missile_Entity(mstats);








/***
 *    ██████╗  ██████╗ ███╗   ██╗██╗   ██╗███████╗███████╗███████╗                         
 *    ██╔══██╗██╔═══██╗████╗  ██║██║   ██║██╔════╝██╔════╝██╔════╝                         
 *    ██████╔╝██║   ██║██╔██╗ ██║██║   ██║███████╗█████╗  ███████╗                         
 *    ██╔══██╗██║   ██║██║╚██╗██║██║   ██║╚════██║██╔══╝  ╚════██║                         
 *    ██████╔╝╚██████╔╝██║ ╚████║╚██████╔╝███████║███████╗███████║                         
 *    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝  
 */
// bonuses stats
var bonusesMap = new Map();
bonusesMap.set(
	'civilians',
	{
		x: null,
		y: null,
		w: 16,
		h: 16,
		sx: [1,4],
		sy: [1,4],
		dirMod: 1, // direction modifier : 1 or -1
		type: 'civilians',
		color: 'lightgreen',
		effectWhenShotAt: 'getHit',
		effectWhenTouched: 'getHit;doDamage'
	}
);





/***
 *    ██╗    ████████╗    ███████╗    ███╗   ███╗    ███████╗
 *    ██║    ╚══██╔══╝    ██╔════╝    ████╗ ████║    ██╔════╝
 *    ██║       ██║       █████╗      ██╔████╔██║    ███████╗
 *    ██║       ██║       ██╔══╝      ██║╚██╔╝██║    ╚════██║
 *    ██║       ██║       ███████╗    ██║ ╚═╝ ██║    ███████║
 *    ╚═╝       ╚═╝       ╚══════╝    ╚═╝     ╚═╝    ╚══════╝
 *                                                           
 */
 // items stats
var itemsMap = new Map();
itemsMap.set(
	'shield',
	{
		x: null,
		y: null,
		w: 15,
		h: 25,
		sx: [2,5],
		sy: [3,4],
		dirMod: 1, // used to bounce off the sides
		type: 'shield',
		c: 'lightblue',
		effectWhenShotAt: 'getHit',
		effectWhenTouched: 'getHit;doDamage',
		delay: 3,
		delayCpt: 0
	}
);
itemsMap.set(
	'asteroid',
	{
		x: null,
		y: null,
		w: 22,
		h: 22,
		sx: [1,6],
		sy: [3,4],
		dirMod: 1, // used to bounce off the sides
		type: 'asteroid',
		c: 'deeppink',
		effectWhenShotAt: 'blockShot',
		effectWhenTouched: 'doDamage',
		delay: 0,
		delayCpt: 0
	}
);

var Item_Entity = function(settings) {
  	Entity_Template.call(this, settings);
	this.dirMod = settings.dirMod;
	this.type = settings.type;
	this.effectWhenShotAt = settings.effectWhenShotAt;
	this.effectWhenTouched = settings.effectWhenTouched;
	this.delay = settings.delay;
	this.delayCpt = settings.delayCpt;
}


// let myNewAsteroid = new Item_Entity(itemsMap.get('asteroid'));
// let myNewCivilians = new Item_Entity(itemsMap.get('civilians'));

