
var canvas;
var friction = 0.99

// player
var pl = {
	x:100,
	y:100,
	w:12,
	h:24,
	ms: 10, // MAX speed
	sx:0, // speed x
	sy:0, // speed y
}

var dirs = {
	left: false,
	up: false,
	down: false,
	right: false
};
var btns = {
	space: false
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
	c: 'yellow'
};

window.onload = function() {
    canvas=document.createElement("canvas");
    canvas.width = 460;
    canvas.height = 800;
    document.body.appendChild(canvas);
    context=canvas.getContext("2d");
    setInterval(update,1000/60);
    //setInterval(spawn,2000);
    document.addEventListener('keydown',keyPush);
	document.addEventListener("keyup", keyLetGo);

spawnEnemies();

}





function keyPush(evt) {
    switch(evt.keyCode) {
        case 32: // space

		    if(!btns.space && !isFiring) {
		    	startFiring();
        	}
        	btns.space = true;
            break;
        case 37:// left
      		dirs.left = true;
            break;
        case 38:// up
      		dirs.up = true;
            break;
        case 39:// down
      		dirs.down = true;
            break;
        case 40:// right
      		dirs.right = true;
            break;
    }
}

function keyLetGo(evt) {
    switch(evt.keyCode) {
        case 32: // space
	        if(btns.space) {
	        	stopFiring();
	        }
        	btns.space = false;
            break;
        case 37:// left
      		dirs.left = false;
            break;
        case 38:// up
      		dirs.up = false;
            break;
        case 39:// down
      		dirs.down = false;
            break;
        case 40:// right
      		dirs.right = false;
            break;
    }
}

function drawScene() {
    context.fillStyle="black";
    context.fillRect(0,0,canvas.width,canvas.height);
}

function drawPlayer() {
    
    // set position if moving
    if(dirs != '') {
		if(dirs.left) {
			if(pl.sx > -pl.ms) {
				pl.sx--;
			}
		}
		if(dirs.up) {
			if(pl.sy > -pl.ms) {
				pl.sy--;
			}
		}
		if(dirs.down) {
			if(pl.sx < pl.ms) {
				pl.sx++;
			}
		}
		if(dirs.right) {
			if(pl.sy < pl.ms) {
				pl.sy++;
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
		startFiring()
	}, firingDelay);
			isFiring = false;
}

function stopFiring() {
	clearInterval(playerFiringInterval);
}

function createMissile() {
	let missile = {
		x: (pl.x + (pl.w/2) - 3),
		y: (pl.y + (pl.h/2)),
		w: 6,
		h: 6,
		sy: 14
	};
	missiles.push(missile);
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
	let enemy = {
		x: getRandomInt(5, ((canvas.width-5)-ses.w)),
		y: ses.y,
		w: ses.w,
		h: ses.h,
		sx: ses.sx,
		sy: getRandomInt(ses.sy-2, ses.sy+2),
		c: ses.c
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
		checkEnemiesCollisionWithMissile(en,i);
	    context.fillRect(en.x, en.y, en.w, en.h);
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
}


createMissile
// utils
function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}


var isEnemiesSpawning = true;
function spawnEnemies() {
	if(!isEnemiesSpawning) return;
	createEnemy();
	setTimeout(function() {
		spawnEnemies();
	}, 800);
}