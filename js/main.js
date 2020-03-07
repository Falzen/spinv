
var canvas;
var friction = 0.99

var settings = {
	canvasWidth: 450,
	canvasHeight: 800,
	score: 200
}

// player
var pl = {
	x: settings.canvasWidth/3,
	y: settings.canvasHeight - 48,
	w: 12,
	h: 24,
	ms: 4, // MAX speed
	sx: 0, // speed x
	sy: 0, // speed y
}

var dirs = {
	left: false,
	up: false,
	down: false,
	right: false
};
var btns = {
	space: false,
	shift: false,
	action0: false,
	action1: false,
	action2: false,
	action3: false
}

var missiles = [];
var enemies = [];
var playerFiringInterval;


// standardEnemyStats
var ses = {
	x: 5,
	y: 50,
	w: 24,
	h: 48,
	sx: 0,
	sy: 4,
	c: 'yellow',
	pts: 5
};

var bgs = {
	t: null, // top
	l: null, // left
	d: null, // down
	r: null // right
}
var background;
var backgroundBis;
	window.onload = function() {
	    canvas = document.createElement("canvas");
	    canvas.width = 450;
	    canvas.height = 800;
	    document.body.appendChild(canvas);
	    context = canvas.getContext("2d");

		bgs.d = new Image();
		bgs.d.src = "img/bg01.png";

		bgs.t = new Image();
		bgs.t.src = "img/bg01.png";



		bgs.d.onload = function(){
		    setInterval(update, 1000/60);
		}
    
    document.addEventListener('keydown',keyPush);
	document.addEventListener("keyup", keyLetGo);

	spawnEnemies();
}




var isSprinting = false;
function keyPush(evt) {
	console.log(evt.keyCode);
    switch(evt.keyCode) {

        // NUMPAD 0
        case 96: 
		    if(!btns.action0) {
        		btns.action0 = true;
        	}
            break;

        // NUMPAD 1
        case 97: 
		    if(!isFiring) {
		    	btns.action1 = true;	
        	}
            break;

		// z
        case 90: dirs.up = true; break;
        // q
        case 81: dirs.left = true; break;
        // s
        case 83: dirs.down = true; break;
        // d
        case 68: dirs.right = true; break;
    }
}

function writeScore() {
	context.font = '22px consolas';
	context.fillStyle = "white";
	context.fillText(('score: '+ settings.score), 50, 100);
}

function keyLetGo(evt) {
    switch(evt.keyCode) {

		// NUMPAD 0
        case 96: 
    		btns.action0 = false;
            break;
        
		// NUMPAD 1
        case 97: 
        	btns.action1 = false;
            break;

		// z
		case 90: dirs.up = false; break; 	
		// q
		case 81: dirs.left = false; break; 	
		// s
		case 83: dirs.down = false; break; 	
		// d
		case 68: dirs.right = false; break; 
	}
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

function drawScene() {
	bgPositions.d.y += 1;
	bgPositions.t.y += 1;

	
	if(bgPositions.d.y >= canvas.height) {
		bgPositions.d.y = 0;
		bgPositions.t.y = -canvas.height;
	}

    context.fillStyle="black";
    context.fillRect(0,0,canvas.width,canvas.height);
	context.drawImage(bgs.d, bgPositions.d.x, bgPositions.d.y, canvas.width, canvas.height);
	context.drawImage(bgs.t, bgPositions.t.x, bgPositions.t.y, canvas.width, canvas.height);

}

function drawAimSight() {
	let grd = context.createLinearGradient(pl.x, pl.y, pl.x, pl.y-500);
	grd.addColorStop(0,"blue");
	grd.addColorStop(1,"transparent");
    context.fillStyle=grd;
    context.fillRect(pl.x + (pl.w/2), 0, 1, pl.y);
}

function drawPlayer() {
    
    // set position if moving
    if(dirs != '') {
		
		if(dirs.up) {
			if(pl.sy > -pl.ms) {
				pl.sy--;
			}
		}
		if(dirs.down) {
			if(pl.sy < pl.ms) {
				pl.sy++;
			}
		}
		if(dirs.left) {
			if(pl.sx > -pl.ms) {
				pl.sx--;
			}
		}
		if(dirs.right) {
			if(pl.sx < pl.ms) {
				pl.sx++;
			}
		}
	    pl.sx *= friction;
	    pl.sy *= friction;
	    pl.x += pl.sx
	    pl.y += pl.sy
		checkEnemiesCollisionWithPlayer();
	    pl = adjustForBoundaries(pl);
    }  

    context.fillStyle="lime";
    context.fillRect(pl.x, pl.y, pl.w, pl.h);
    drawAimSight();
}

var firingRate = 110;
var firingDelay = firingRate*1;
var isFiring; 

function startFiring() {
		isFiring = true;
		createMissile();

		setTimeout(function() {
			createMissile();		
		}, firingRate);

		setTimeout(function() {
			createMissile();		
		}, firingRate*2);

	playerFiringInterval = setTimeout(function() {
		startFiring();
	}, firingDelay);
	isFiring = false;
}

function stopFiring() {
	clearInterval(playerFiringInterval);
}

function createMissile(dir) {
	if(!dir) {
		dir = 'c';
	}
	let missile = {
		x: (pl.x + (pl.w/2) - 3),
		y: (pl.y + (pl.h/2)),
		xd: 0, // x direction
		w: 6,
		h: 6,
		sy: 14
	};
	switch(dir) {
		case 'l': 
			missile.xd = -1;
		break;
		case 'c': 
			missile.xd = 0;
		break;
		case 'r': 
			missile.xd = 1;
		break;
	}

	missiles.push(missile);
	settings.score -= 1;
}

function animateMissile(m) {
	m.y -= m.sy;
}

function animateEnemy(en) {
	
	en.y += en.sy;
}

function checkMissileOutOfBounds(m, indx) {
	if((m.y+m.h) < 0) {
		missiles.splice(indx,1);
	}
}

function createEnemy() {
	let randX = getRandomInt(5, ((canvas.width-5)-ses.w));
	let enemy = {
		ox: randX,
		x: randX,
		oy: ses.y,
		y: ses.y,
		w: ses.w,
		h: ses.h,
		sx: ses.sx,
		sy: getRandomInt(ses.sy-2, ses.sy+2),
		c: ses.c,
		pts: ses.pts
	};
	enemies.push(enemy);

}

function drawMissiles() {
	context.fillStyle="tomato";
	for(let i=0; i<missiles.length; i++) {
	
		let m = missiles[i];
		checkMissileOutOfBounds(m,i);
		animateMissile(m,i);
	    context.fillRect(m.x, m.y, m.w, m.h);
    }
}
function checkEnemiesCollisionWithMissile(en, indw) {
	for(let j=0; j<missiles.length; j++) {
		let m = missiles[j];
		let mmid = (m.x+(m.w/2)); // missile middle
		if(
			(
				en.x < mmid
				&& (en.x+en.w) > mmid
			) 
			&& (
				(en.y+en.h) >= m.y
				&& en.y <= (m.y+m.h)
			)

		) {
			settings.score += en.pts;
			enemies.splice(indw,1);
			missiles.splice(j,1);
		}
	}
}
function checkEnemiesCollisionWithPlayer() {
	for(let j=0; j<enemies.length; j++) {
		let en = enemies[j];
		if(
			(
				en.x < (pl.x + pl.w) 
				&& (en.x + en.w) > pl.x
			) 
			&& 
			(
				en.y < (pl.y + pl.h) 
				&& (en.y + en.h) > pl.y
			) 

		) {
			
			enemies.splice(j,1);
		}
	}
}

function drawEnemies() {
	for(let i=0; i<enemies.length; i++) {
		let en = enemies[i];
		context.fillStyle = en.c;
		checkEnemyOutOfBounds(en,i);
		animateEnemy(en);
		
	    context.fillRect(en.x, en.y, en.w, en.h);

	    checkEnemiesCollisionWithMissile(en,i);
    }
}

function checkEnemyOutOfBounds(en, indx) {
	if(en.y > canvas.height) {
		enemies.splice(indx,1);
	}
}

function adjustForBoundaries(item) {
	let pos = {};
	if(item.x < 0) {
		item.x = 0;
	} 
	else if(item.x > (canvas.width - item.w)) {
		item.x = (canvas.width - item.w);
	}

	if(item.y < 0) {
		item.y = 0;
	} 
	else if(item.y > (canvas.height - item.h)) {
		item.y = (canvas.height - item.h);
	}
	return item;
}
function update() {

	drawScene();
	drawPlayer();

	drawMissiles();
	drawEnemies();

	writeScore();
}


// utils
function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

var enemySpawningTimer = 800;
var isEnemiesSpawning = true;
function spawnEnemies() {
	if(!isEnemiesSpawning) return;
	createEnemy();
	setTimeout(function() {
		spawnEnemies();
	}, enemySpawningTimer);
}