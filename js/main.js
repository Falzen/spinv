

/*
asci titles:
http://patorjk.com/software/taag/#p=display&c=c&f=ANSI%20Shadow&t=TODO
*/

/** 
 *    ████████╗ ██████╗     ██████╗  ██████╗ 
 *    ╚══██╔══╝██╔═══██╗    ██╔══██╗██╔═══██╗
 *       ██║   ██║   ██║    ██║  ██║██║   ██║
 *       ██║   ██║   ██║    ██║  ██║██║   ██║
 *       ██║   ╚██████╔╝    ██████╔╝╚██████╔╝
 *       ╚═╝    ╚═════╝     ╚═════╝  ╚═════╝ 

invincibility after being hit should show
better health system (check variables.js on PLAYER)
better CARPET BOMBING (see createCustomMissile(), should use new Missile_Entity() )
implement Bonus_Entity as well (not done in variables.js, see Missile_Entity() in variables.js for reference)

________________________________________________________________________________
________________________________________________________________________________


  _    _             _         _                  _               
 | |  | |           | |       | |                | |              
 | |  | | _ __    __| |  __ _ | |_  ___  ___     | |  ___    __ _ 
 | |  | || '_ \  / _` | / _` || __|/ _ \/ __|    | | / _ \  / _` |
 | |__| || |_) || (_| || (_| || |_|  __/\__ \    | || (_) || (_| |
  \____/ | .__/  \__,_| \__,_| \__|\___||___/    |_| \___/  \__, |
         | |                                                 __/ |
         |_|                                                |___/ 

DONE 14/03 : adjustable damages (in missile entity)
DONE 13/03 : collision checks should return booleans
DONE 12/03: invincible 1s after being hit
DONE 12/03: better collision detection (wtf not hurt when collision from the side)

________________________________________________________________________________
________________________________________________________________________________









*/

/***
 *    ██╗  ██╗███████╗██╗   ██╗    ██████╗  ██████╗ ██╗    ██╗███╗   ██╗
 *    ██║ ██╔╝██╔════╝╚██╗ ██╔╝    ██╔══██╗██╔═══██╗██║    ██║████╗  ██║
 *    █████╔╝ █████╗   ╚████╔╝     ██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║
 *    ██╔═██╗ ██╔══╝    ╚██╔╝      ██║  ██║██║   ██║██║███╗██║██║╚██╗██║
 *    ██║  ██╗███████╗   ██║       ██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║
 *    ╚═╝  ╚═╝╚══════╝   ╚═╝       ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝
 * 
 */
 /*
 function keyPush(evt) {
	//console.log(evt.keyCode);
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
		// arrow up
		case 90: dirs.up = true; break; 	
		// arrow left
		case 81: dirs.left = true; break; 	
		// arrow down
		case 83: dirs.down = true; break; 	
		// arrow right
		case 68: dirs.right = true; break; 
		// z
		case 38: dirs.arrowUp = true; break;
		// q
		case 37: dirs.arrowLeft = true; break;
		// s
		case 40: dirs.arrowDown = true; break;
		// d
		case 39: dirs.arrowRight = true; break;
		// p - pause
		case 80: btns.pause = !btns.pause; break;
    }
}
*/









/***
 *    ██╗  ██╗███████╗██╗   ██╗    ██╗   ██╗██████╗ 
 *    ██║ ██╔╝██╔════╝╚██╗ ██╔╝    ██║   ██║██╔══██╗
 *    █████╔╝ █████╗   ╚████╔╝     ██║   ██║██████╔╝
 *    ██╔═██╗ ██╔══╝    ╚██╔╝      ██║   ██║██╔═══╝ 
 *    ██║  ██╗███████╗   ██║       ╚██████╔╝██║     
 *    ╚═╝  ╚═╝╚══════╝   ╚═╝        ╚═════╝ ╚═╝     
 *                                                  
 */
/*
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
		// arrow up
		case 90: dirs.up = false; break; 	
		// arrow left
		case 81: dirs.left = false; break; 	
		// arrow down
		case 83: dirs.down = false; break; 	
		// arrow right
		case 68: dirs.right = false; break; 
		// z
		case 38: dirs.arrowUp = false; break; 	
		// q
		case 37: dirs.arrowLeft = false; break; 	
		// s
		case 40: dirs.arrowDown = false; break; 	
		// d
		case 39: dirs.arrowRight = false; break; 
	}
}
*/

















/**
General Input manager (awesome)
add(key, down, up) : 
	creates a new keydown-keyup event listsner.
	@key: used to detect which key is live using event.keyCode
	@down: callback function to be executed when event is keydown
	@up: callback function to be executed when event is keyup

*/
Controller = {
    keyIsDown: [],

    // Add a new control. up is optional.
    // It avoids key repetitions
    add: function (key, down, up) {
        
        document.addEventListener('keydown', function(e) {
            if(e.keyCode === key && !Controller.keyIsDown[key]) {
                down();
                Controller.keyIsDown[key] = true;
            }
        })

        document.addEventListener('keyup', function(e) {
            if(e.keyCode === key) {
                if(up) {
                	up();
                }
                Controller.keyIsDown[key] = false;
                
            }
        })
    },
}


Controller.add(37,
    function () {
        dirs.arrowLeft = true;
	}, function() {
        dirs.arrowLeft = false;
});


Controller.add(38,
    function () {
        dirs.arrowUp = true;
	}, function() {
		dirs.arrowUp = false;
});

Controller.add(39,
    function () {
        dirs.arrowRight = true;
	}, function() {
		dirs.arrowRight = false;
});


Controller.add(40,
    function () {
        dirs.arrowDown = true;
	}, function() {
		dirs.arrowDown = false;
});

Controller.add(90,
    function () {
        dirs.up = true;
	}, function() {
		dirs.up = false;
});

Controller.add(81,
    function () {
        dirs.left = true;
	}, function() {
		dirs.left = false;
});

Controller.add(83,
    function () {
        dirs.down = true;
	}, function() {
		dirs.down = false;
});

Controller.add(68,
    function () {
        dirs.right = true;
	}, function() {
		dirs.right = false;
});

Controller.add(80,
    function () {
        btns.pause = !btns.pause;
	}, function() {
});




















































/***
 *     █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗    ███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗██████╗ 
 *    ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝    ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██╔══██╗
 *    ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗    ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██████╔╝
 *    ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║    ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██╗
 *    ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║    ██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║
 *    ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
 *                                                                                                                             
 */
 function actionsManager() {
	if(
		dirs.arrowUp
	) {
		startFiring();
    
	} else if(wasFiring == true) {
		stopFiring();
	}
	if(
		btns.action1
		|| dirs.arrowLeft
	) {
		speedUpPlayer();
	} else if(pl.wasSpeedingUp == true) {
		speedDownPlayer();
	}

	if(
		dirs.arrowDown
		&& pl.isRageAvailable == true
	) {
		canvas.classList.add('flash-all'); // removed at the end of carpetBombing();
        carpetBombing();
	}
	if(
		dirs.arrowRight
	) {

	}
}











    /***
     *     █████╗     ███╗   ██╗    ██╗    ███╗   ███╗     █████╗     ████████╗    ██╗     ██████╗     ███╗   ██╗    ███████╗
     *    ██╔══██╗    ████╗  ██║    ██║    ████╗ ████║    ██╔══██╗    ╚══██╔══╝    ██║    ██╔═══██╗    ████╗  ██║    ██╔════╝
     *    ███████║    ██╔██╗ ██║    ██║    ██╔████╔██║    ███████║       ██║       ██║    ██║   ██║    ██╔██╗ ██║    ███████╗
     *    ██╔══██║    ██║╚██╗██║    ██║    ██║╚██╔╝██║    ██╔══██║       ██║       ██║    ██║   ██║    ██║╚██╗██║    ╚════██║
     *    ██║  ██║    ██║ ╚████║    ██║    ██║ ╚═╝ ██║    ██║  ██║       ██║       ██║    ╚██████╔╝    ██║ ╚████║    ███████║
     *    ╚═╝  ╚═╝    ╚═╝  ╚═══╝    ╚═╝    ╚═╝     ╚═╝    ╚═╝  ╚═╝       ╚═╝       ╚═╝     ╚═════╝     ╚═╝  ╚═══╝    ╚══════╝
     *                                                                                                                       
     */
     function animateMissile(m) {
        m.y -= m.sy;
        m.x += m.sx;
    }
    function animateEnemy(en) {
    	en.y += en.sy;
    }
    function animateBonus(b,indx) {
    	if(b.type == 'asteroid') {
    		if(
    			(b.x+b.w)+b.sx > canvas.width
    			 || (b.dirMod == -1 && (b.x+b.sx) < 0) // no rebund off the left wall
			) {
    			b.dirMod *= -1;
    		}
    	}
    	b.y += b.sy;
		b.x += (b.sx*b.dirMod);

    }









    /***
     *     ██████╗    ██████╗     ███████╗     █████╗     ████████╗    ██╗     ██████╗     ███╗   ██╗    ███████╗
     *    ██╔════╝    ██╔══██╗    ██╔════╝    ██╔══██╗    ╚══██╔══╝    ██║    ██╔═══██╗    ████╗  ██║    ██╔════╝
     *    ██║         ██████╔╝    █████╗      ███████║       ██║       ██║    ██║   ██║    ██╔██╗ ██║    ███████╗
     *    ██║         ██╔══██╗    ██╔══╝      ██╔══██║       ██║       ██║    ██║   ██║    ██║╚██╗██║    ╚════██║
     *    ╚██████╗    ██║  ██║    ███████╗    ██║  ██║       ██║       ██║    ╚██████╔╝    ██║ ╚████║    ███████║
     *     ╚═════╝    ╚═╝  ╚═╝    ╚══════╝    ╚═╝  ╚═╝       ╚═╝       ╚═╝     ╚═════╝     ╚═╝  ╚═══╝    ╚══════╝
     *                                                                                                           
     */

     function createMissile() {
     	createMissile('c');
     }
     function createMissile(direction) {
    	let missile = new Missile_Entity(mstats);
    	missile.x = (pl.x + (pl.w/2) - 3);
    	missile.y = (pl.y + (pl.h/2));
    	switch(direction) {
    		case 'l':  // angle to the left
    			missile.xd = -1;
    		break;
    		case 'c': // no angle
    			missile.xd = 0;
    		break;
    		case 'r': // angle to the right
    			missile.xd = 1;
    		break;
    	}
    	missiles.push(missile);
    	settings.score -= 1;
    }

     function createCustomMissile(data) {
        let customMissile = {
            type: data.t,
            x: data.x,
            y: data.y,
            xd: data.xd, // -1 angles to left; 1 angles to the right; O does no angle
            w: data.w,
            h: data.h,
            sy: data.sy, // speed Y axis
            sx: data.sx, // speed Y axis
            c: data.c,
            dmg: data.dmg
        };

        missiles.push(customMissile);
     }

     // TODO better creation using Entities (see variables.js)
    function createBonus(name) {
    	let b = bonusesMap.get(name);
    	let randY = getRandomInt((-1*(canvas.height/3)), ((canvas.height/3)-b.h));
    	let randSpeedX = getRandomInt(b.sx[0], b.sx[1]);
    	let randSpeedY = getRandomInt(b.sy[0], b.sy[1]);
    	let bonus = {
    		x: b.w*2,
    		y: randY,
    		w: b.w,
    		h: b.h,
    		sx: randSpeedX,
    		sy: randSpeedY,
			dirMod: 1,
    		type: b.type,
            effectWhenShotAt: b.effectWhenShotAt,
            effectWhenTouched: b.effectWhenTouched
    	};

    	bonuses.push(bonus);
    }


    function createItem(name) {
    	let itemStats = itemsMap.get(name);
    	let goRight = Math.random() > 0.5; // the first direction
    	let randY = getRandomInt((-1*(canvas.height/3)), ((canvas.height/3)-itemStats.h));

    	// TODO : store these hard value somewhere ?
    	// changing spawning side depending on first direction
    	let randX = goRight 
    					? getRandomInt(canvas.width * -0.3, canvas.width * 0.3) 
						: getRandomInt(canvas.width * 0.6, canvas.width * 1.3);

    	let randSpeedX = getRandomInt(itemStats.sx[0], itemStats.sx[1]);
    	let randSpeedY = getRandomInt(itemStats.sy[0], itemStats.sy[1]);

    	let item = new Item_Entity(itemStats);
    	item.x = randX;
    	item.y = randY;
    	item.sx = randSpeedX;
    	item.sy = randSpeedY;
    	item.dirMod = goRight ? 1 : -1;
    	items.push(item);
    }
    function createEnemy() {
        let randX = getRandomInt(5, ((canvas.width-5)-standardEnemyStats.w-15));
        let randYspeed = getRandomInt(standardEnemyStats.sy[0], standardEnemyStats.sy[1]);
        let enemy = new Enemy_Entity(standardEnemyStats);
        enemy.ox = randX;
        enemy.x = randX;
        enemy.sy = randYspeed;
        enemies.push(enemy);
    }
    // used for debugging purposes only
    // static enemy near right bottom corner
    function createEnemytest() {
        var enemy = new Enemy_Entity(standardEnemyStats);
        enemy.ox = canvas.width*0.75;
        enemy.x = canvas.width*0.75;
        enemy.oy = canvas.height*0.75;
        enemy.y = canvas.height*0.75;
        enemy.w = standardEnemyStats.w;
        enemy.h = standardEnemyStats.h;
        enemy.sx = 0;
        enemy.sy = 0;
        enemies.push(enemy);
    }












    /***
     *    ██████╗     ███████╗    ████████╗    ███████╗     ██████╗    ████████╗    ██╗     ██████╗     ███╗   ██╗    ███████╗
     *    ██╔══██╗    ██╔════╝    ╚══██╔══╝    ██╔════╝    ██╔════╝    ╚══██╔══╝    ██║    ██╔═══██╗    ████╗  ██║    ██╔════╝
     *    ██║  ██║    █████╗         ██║       █████╗      ██║            ██║       ██║    ██║   ██║    ██╔██╗ ██║    ███████╗
     *    ██║  ██║    ██╔══╝         ██║       ██╔══╝      ██║            ██║       ██║    ██║   ██║    ██║╚██╗██║    ╚════██║
     *    ██████╔╝    ███████╗       ██║       ███████╗    ╚██████╗       ██║       ██║    ╚██████╔╝    ██║ ╚████║    ███████║
     *    ╚═════╝     ╚══════╝       ╚═╝       ╚══════╝     ╚═════╝       ╚═╝       ╚═╝     ╚═════╝     ╚═╝  ╚═══╝    ╚══════╝
     *                                                                                                                        
     */
     function checkMissileOutOfBounds(m, indx) {
    	if((m.y+m.h) < 0) {
    		missiles.splice(indx,1);
    	}
    }
    function checkEntityCollisionWithMissiles_getMissileIndex(entity) {
    	for(let mIndex = 0; mIndex < missiles.length; mIndex++) {
    		let m = missiles[mIndex];
    		
    		if(
    			(
    				entity.x < (m.x+m.w)
    				&& (entity.x+entity.w) > m.x
    			) 
    			&& (
    				(entity.y+entity.h) >= m.y
    				&& entity.y <= (m.y+m.h)
    			)
    		) {
    			return mIndex;
    		}
    	}
		return -1;
    }
    function checkEntitiesCollisionWithPlayer(entities) {
    	for(let j=0; j<entities.length; j++) {
    		let entity = entities[j];
    		if(
    			(
    				entity.x < (pl.x + pl.w) 
    				&& (entity.x + entity.w) > pl.x
    			) 
    			&& 
    			(
    				entity.y < (pl.y + pl.h) 
    				&& (entity.y + entity.h) > pl.y
    			) 
    		) {
    			entities.splice(j,1);
    		}
    	}
    }
    function checkEntityCollisionWithPlayer(entity) {
		if(
			(
				entity.x < (pl.x + pl.w) 
				&& (entity.x + entity.w) > pl.x
			) 
			&&
			(
				entity.y < (pl.y + pl.h) 
				&& (entity.y + entity.h) > pl.y
			) 
		) {
			return true;
		}
	
		return false;
    }
    function checkEnemyOutOfBounds(en, indx) {
    	if(en.y > canvas.height) {
    		enemies.splice(indx,1);
    	}
    }
    function checkBonusOutOfBounds(b, indx) {
    	if(
    		b.y > canvas.height
    		// || b.x > canvas.width // bouncing against walls
    	) {
    		bonuses.splice(indx,1);
    	}
    }
    function adjustForBoundaries(item) {
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















/***
 *    ██████╗     ██████╗      █████╗     ██╗    ██╗    ██╗    ███╗   ██╗     ██████╗     ███████╗
 *    ██╔══██╗    ██╔══██╗    ██╔══██╗    ██║    ██║    ██║    ████╗  ██║    ██╔════╝     ██╔════╝
 *    ██║  ██║    ██████╔╝    ███████║    ██║ █╗ ██║    ██║    ██╔██╗ ██║    ██║  ███╗    ███████╗
 *    ██║  ██║    ██╔══██╗    ██╔══██║    ██║███╗██║    ██║    ██║╚██╗██║    ██║   ██║    ╚════██║
 *    ██████╔╝    ██║  ██║    ██║  ██║    ╚███╔███╔╝    ██║    ██║ ╚████║    ╚██████╔╝    ███████║
 *    ╚═════╝     ╚═╝  ╚═╝    ╚═╝  ╚═╝     ╚══╝╚══╝     ╚═╝    ╚═╝  ╚═══╝     ╚═════╝     ╚══════╝
 *                                                                                                
 */
var relativeSpeedY = 0;
 function getPlayerPosY_inPercents() {
 	return (pl.y * 100) / canvas.height;
 }
 function drawScene() {
 	relativeSpeedY = 1+(1-(settings.score/1000));
 	
	bgPositions.d.y += settings.backgroundSpeeds.y*relativeSpeedY;
	bgPositions.t.y += settings.backgroundSpeeds.y*relativeSpeedY;

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
	let grd = context.createLinearGradient(pl.w/2, 0, pl.w/2, 500);
	grd.addColorStop(0,"blue");
	grd.addColorStop(1,"transparent");
    context.fillStyle=grd;
    context.fillRect(0 + (pl.w/2), 0, 1, pl.y);
}
function drawBonuses() {
	context.fillStyle="red";
	for(let i=0; i<bonuses.length; i++) {
		let b = bonuses[i];
		checkBonusOutOfBounds(b,i);
		animateBonus(b,i);
	    context.fillRect(b.x, b.y, b.w, b.h);
		
		// punish if shooting a bonus ?
	    /*
	    missileIndex = checkEntityCollisionWithMissiles_getMissileIndex(b);
	    if(missileIndex != -1) {
	    }
	    */

	    // picking it up
	    if(checkEntityCollisionWithPlayer(b)) {

	    }
    }
}
function drawItems() {
	context.fillStyle="deeppink";
	for(let i=0; i<items.length; i++) {
		let it = items[i];
		checkBonusOutOfBounds(it,i);
		animateBonus(it,i);
	    context.fillRect(it.x, it.y, it.w, it.h);
	    
	    let missileIndex = checkEntityCollisionWithMissiles_getMissileIndex(it);
	    if(missileIndex != -1) {
			if(it.effectWhenShotAt.indexOf('getHit') != -1) {
				addRage(50);
				settings.score += it.pts;
				items.splice(i,1);
				missiles.splice(missileIndex,1);
			}
			if(it.effectWhenShotAt.indexOf('blockShot') != -1) {
				missiles.splice(missileIndex,1);
			}
	    }
	    if(checkEntityCollisionWithPlayer(it)) {
			if(it.effectWhenTouched.indexOf('doDamage') != -1) {
				addHealth(-20);
			}
			if(it.effectWhenTouched.indexOf('getHit') != -1) {
				items.splice(i,1);
			}
	    }
    }
}
function drawMissiles() {
	for(let i=0; i<missiles.length; i++) {

		let m = missiles[i];
		context.fillStyle = m.c;
		checkMissileOutOfBounds(m,i);
		animateMissile(m);
	    context.fillRect(m.x, m.y, m.w, m.h);
    }
}
function drawEnemies() {
	for(let i=0; i<enemies.length; i++) {
		let en = enemies[i];
		context.fillStyle = en.c;
		checkEnemyOutOfBounds(en,i);
		animateEnemy(en);

	    context.fillRect(en.x, en.y, en.w, en.h);

	    // shooting checks
	    let missileIndex = checkEntityCollisionWithMissiles_getMissileIndex(en);
	    if(missileIndex != -1) {
			if(en.effectWhenShotAt.indexOf('getHit') != -1) {
				addRage(50);
				settings.score += en.pts;
				en.hp -= missiles[missileIndex].dmg;
				if(en.hp <= 0) {
					en.hp = 0;
					enemies.splice(i,1);
				}
				missiles.splice(missileIndex,1);
				
			}
			if(en.effectWhenShotAt.indexOf('blockMissile') != -1) {
				missiles.splice(missileIndex,1);
			}
	    }

	    // direct collision checks
	    if(checkEntityCollisionWithPlayer(en)) {
			if(en.effectWhenTouched.indexOf('getHit') != -1) {
				addRage(50);
				settings.score += 1;
				// TODO should use "en.hp -= pl.dmgOnDirectHit" or something
				enemies.splice(i,1);
			}
			if(en.effectWhenTouched.indexOf('doDamage') != -1) {
				addHealth(-40);
			}
	    }

	    
    }
}

function drawPlayer() {
    context.save();
	pl.img.startX = pl.img.spriteWidth;
	pl.img.startY = 0;
	// set position if moving
	var isOneKeyPressed = false;
	if(dirs != '') {

		if(dirs.up) {
			if(pl.sy > -pl.ms) {
				pl.sy--;
			}
			
			if(!isOneKeyPressed && pl.img.startY == (pl.img.spriteHeight*2)) {
				pl.img.startY -= pl.img.spriteHeight;
			} else if (!isOneKeyPressed) {
				pl.img.startY += pl.img.spriteHeight;
			}
			isOneKeyPressed = true;
		}
		if(dirs.down) {
			if(pl.sy < pl.ms) {
				pl.sy++;
			}

			if(!isOneKeyPressed && pl.img.startY == (pl.img.spriteHeight*2)) {
				pl.img.startY -= pl.img.spriteHeight;
			} else if (!isOneKeyPressed) {
				pl.img.startY += pl.img.spriteHeight;
			}
			isOneKeyPressed = true;
		}
		if(dirs.left) {
			if(pl.sx > -pl.ms) {
				pl.sx--;
			}

			if(!isOneKeyPressed && pl.img.startY == (pl.img.spriteHeight*2)) {
				pl.img.startY -= pl.img.spriteHeight;
			} else if (!isOneKeyPressed) {
				pl.img.startY += pl.img.spriteHeight;
			}
			isOneKeyPressed = true;
			
			pl.img.startX -= pl.img.spriteWidth;
		}
		if(dirs.right) {
			if(pl.sx < pl.ms) {
				pl.sx++;
			}

			if(!isOneKeyPressed && pl.img.startY == (pl.img.spriteHeight*2)) {
				pl.img.startY -= pl.img.spriteHeight;
			} else if (!isOneKeyPressed) {
				pl.img.startY += pl.img.spriteHeight;
			}
			isOneKeyPressed = true;
			
			pl.img.startX += pl.img.spriteWidth;
		}
		pl.sx *= friction;
		pl.sy *= friction;
		pl.x += pl.sx
		pl.y += pl.sy
		//checkEntitiesCollisionWithPlayer(enemies);
		pl = adjustForBoundaries(pl);
	}  

	context.fillStyle="lime";
	let radians = getFacingMouseRotation_inRadians();
	context.save();
    context.translate(pl.x, pl.y+pl.h);
	context.rotate(-radians);
	context.drawImage(
		pl.img, 
		pl.img.startX, pl.img.startY,
		pl.img.spriteWidth, pl.img.spriteHeight, 
		0, 0, // because canvas "pencil" is translated due to rotation
		pl.w, pl.h
	);

	drawAimSight();
    context.restore(); // restore default transform;;

    // hitbox
	context.fillStyle="rgba(20,255,20,0.5)";
    context.fillRect(pl.x, pl.y, pl.w, pl.h);
}


/**
	@ mouseevent : standard JS mouseevent
	return : {xpos: int, ypos: int};
*/
function findMouseCoords(mouseEvent) {
	var obj = document.getElementById("canvas");
	var obj_left = obj.offsetParent.offsetLeft;
	var obj_top = obj.offsetParent.offsetTop;
	var xpos;
	var ypos;


	if (mouseEvent) { //FireFox
		xpos = mouseEvent.pageX;
		ypos = mouseEvent.pageY;
	} else { //IE
		xpos = window.event.x + document.body.scrollLeft - 2;
		ypos = window.event.y + document.body.scrollTop - 2;
	}
	mousePos.x = xpos - obj_left;
	mousePos.y = ypos - obj_top;
	console.log(mousePos.x);
}

function setMousePos(mouseEvent) {
	let rect = canvas.getBoundingClientRect();
	let mouseX = mouseEvent.clientX - rect.left;
	let mouseY = mouseEvent.clientY - rect.top;
	mousePos.x = mouseX;
	mousePos.y = mouseY;
}
function getFacingMouseRotation_inRadians(){
    let center_x = pl.x + (pl.w/2);
    let center_y = (pl.y) + (pl.h/2);
    let radians = Math.atan2(mousePos.x - center_x, mousePos.y - center_y);
    //var degree = (radians * (180 / Math.PI) * -1) + 180; 
    return radians;
}













    /***
     *    ███████╗    ██╗    ██████╗     ██╗    ███╗   ██╗     ██████╗ 
     *    ██╔════╝    ██║    ██╔══██╗    ██║    ████╗  ██║    ██╔════╝ 
     *    █████╗      ██║    ██████╔╝    ██║    ██╔██╗ ██║    ██║  ███╗
     *    ██╔══╝      ██║    ██╔══██╗    ██║    ██║╚██╗██║    ██║   ██║
     *    ██║         ██║    ██║  ██║    ██║    ██║ ╚████║    ╚██████╔╝
     *    ╚═╝         ╚═╝    ╚═╝  ╚═╝    ╚═╝    ╚═╝  ╚═══╝     ╚═════╝ 
     *                                                                 
     */
     function startFiring() {
    	if(!isFiring) {
    		firingRate *= 1.1;
    		firingRate = firingRate > 500 ? 500 : firingRate;
    		isFiring = true;
    		wasFiring = true;
    		createMissile();
    		firingTimeout = setTimeout(function() {
    			isFiring = false;
    		}, firingRate);
    	}

    }
    function stopFiring() {
    	firingRate = 100;
    }


    function carpetBombing() {

        pl.isRageAvailable = false;
            if(!isFiring) {
                carpetBombingData.y -= carpetBombingData.h*3;
                isFiring = true;
                wasFiring = true;
                createCustomMissile(carpetBombingData)
                //createMissile();
                carpetbombingTimeout = setTimeout(function() {
                    isFiring = false;
                    carpetBombing();
                    if(carpetBombingData.y <= 0) {
                    	isFiring = false;
                    	carpetBombingData.y = carpetBombingData.oy;
        				resetRage();
        				canvas.classList.remove('flash-all');
                        clearInterval(carpetbombingTimeout);
                    }
                }, firingRate);
            }
        
    }
















/***
 *    ███╗   ███╗     ██████╗     ██╗   ██╗    ███████╗    ███╗   ███╗    ███████╗    ███╗   ██╗    ████████╗    ███████╗
 *    ████╗ ████║    ██╔═══██╗    ██║   ██║    ██╔════╝    ████╗ ████║    ██╔════╝    ████╗  ██║    ╚══██╔══╝    ██╔════╝
 *    ██╔████╔██║    ██║   ██║    ██║   ██║    █████╗      ██╔████╔██║    █████╗      ██╔██╗ ██║       ██║       ███████╗
 *    ██║╚██╔╝██║    ██║   ██║    ╚██╗ ██╔╝    ██╔══╝      ██║╚██╔╝██║    ██╔══╝      ██║╚██╗██║       ██║       ╚════██║
 *    ██║ ╚═╝ ██║    ╚██████╔╝     ╚████╔╝     ███████╗    ██║ ╚═╝ ██║    ███████╗    ██║ ╚████║       ██║       ███████║
 *    ╚═╝     ╚═╝     ╚═════╝       ╚═══╝      ╚══════╝    ╚═╝     ╚═╝    ╚══════╝    ╚═╝  ╚═══╝       ╚═╝       ╚══════╝
 *                                                                                                                       
 */
 function speedUpPlayer() {
	if(!pl.isSpeedingUp) {
		pl.isSpeedingUp = true;
		pl.wasSpeedingUp = true;
		pl.ms *= 2;
	}
}
function speedDownPlayer() {
	pl.isSpeedingUp = false;
	pl.wasSpeedingUp = false;
	pl.ms /= 2;
}














    /***
     *    ███████╗    ██████╗      █████╗     ██╗    ██╗    ███╗   ██╗            ██╗          ██████╗      ██████╗     ██████╗     ███████╗
     *    ██╔════╝    ██╔══██╗    ██╔══██╗    ██║    ██║    ████╗  ██║            ██║         ██╔═══██╗    ██╔═══██╗    ██╔══██╗    ██╔════╝
     *    ███████╗    ██████╔╝    ███████║    ██║ █╗ ██║    ██╔██╗ ██║            ██║         ██║   ██║    ██║   ██║    ██████╔╝    ███████╗
     *    ╚════██║    ██╔═══╝     ██╔══██║    ██║███╗██║    ██║╚██╗██║            ██║         ██║   ██║    ██║   ██║    ██╔═══╝     ╚════██║
     *    ███████║    ██║         ██║  ██║    ╚███╔███╔╝    ██║ ╚████║            ███████╗    ╚██████╔╝    ╚██████╔╝    ██║         ███████║
     *    ╚══════╝    ╚═╝         ╚═╝  ╚═╝     ╚══╝╚══╝     ╚═╝  ╚═══╝            ╚══════╝     ╚═════╝      ╚═════╝     ╚═╝         ╚══════╝
     *                                                                                                                                      
     */
     function spawnEnemies() {
    	if(!isEnemiesSpawning) return;
    	if(!btns.pause) {
    		createEnemy();
		}
    	setTimeout(function() {
    		spawnEnemies();

    	}, enemySpawningTimer);
    }
    function spawnBonuses() {
    	if(!isBonusesSpawning) return;
    	if(!btns.pause) {
    		//createBonus();
		}
    	setTimeout(function() {
    		spawnBonuses();

    	}, bonusSpawningTimer);
    }
    function spawnItems() {
    	let tempTimer = getRandomInt(itemsSpawningTimer/2, itemsSpawningTimer*2);
    	if(!isItemsSpawning) return;
    	if(!btns.pause) {

    		createItem('asteroid');
		}
    	setTimeout(function() {
    		spawnItems();
    	}, tempTimer);
    }








/***
 *    ███████╗    ████████╗     █████╗     ████████╗    ███████╗
 *    ██╔════╝    ╚══██╔══╝    ██╔══██╗    ╚══██╔══╝    ██╔════╝
 *    ███████╗       ██║       ███████║       ██║       ███████╗
 *    ╚════██║       ██║       ██╔══██║       ██║       ╚════██║
 *    ███████║       ██║       ██║  ██║       ██║       ███████║
 *    ╚══════╝       ╚═╝       ╚═╝  ╚═╝       ╚═╝       ╚══════╝
 *                                                              
 */
    

    function addRage(amount) {
        if(!amount) amount = 35;
        let currentRageWidth = 1*(getComputedStyle(document.getElementById('rageAmount')).width.split('px')[0]);
        currentRageWidth += amount;
        if(currentRageWidth >= fullRageWidth) {
            currentRageWidth = fullRageWidth;
            pl.isRageAvailable = true;
        }
        document.getElementById('rageAmount').style.width = currentRageWidth + 'px';
    }
    function resetRage() {
        document.getElementById('rageAmount').style.width = '0px';
    }


    function addHealth(amount) { // total : 200
        if(!amount) amount = 60;
        if(pl.isInvincible) amount = 0;
        let currentHealthWidth = 1*(getComputedStyle(document.getElementById('healthAmount')).width.split('px')[0]);
        currentHealthWidth += amount;
        if(currentHealthWidth >= fullHealthWidth) {
            currentHealthWidth = fullHealthWidth;
        }


        // if damages, invicible for a second
        if(amount < 0) {
            pl.isInvincible = true;
            setTimeout(function() {
                pl.isInvincible = false;
            }, 1000);
        }


        if(currentHealthWidth <= 0) {
            currentHealthWidth = 0;
            btns.pause = true;
            setTimeout(function() {
            	alert('You dead.');
            }, 200);
        }
        document.getElementById('healthAmount').style.width = currentHealthWidth + 'px';
    }















































































    /***
     *    ██╗   ██╗    ████████╗    ██╗    ██╗         ███████╗
     *    ██║   ██║    ╚══██╔══╝    ██║    ██║         ██╔════╝
     *    ██║   ██║       ██║       ██║    ██║         ███████╗
     *    ██║   ██║       ██║       ██║    ██║         ╚════██║
     *    ╚██████╔╝       ██║       ██║    ███████╗    ███████║
     *     ╚═════╝        ╚═╝       ╚═╝    ╚══════╝    ╚══════╝
     *                                                         
     */
     // utils
     function getRandomInt(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
    function writeScore() {
    	context.font = '22px consolas';
    	context.fillStyle = "white";
    	context.fillText(('score: '+ settings.score), 50, 100);
    }

    function writeDebug() {
    	context.font = '44px consolas';
    	context.fillStyle = "white";
    	context.fillText(('debug: '+ debug), 10, 200);
    }











    /***
     *    ███╗   ███╗     █████╗     ██╗    ███╗   ██╗            ██╗          ██████╗      ██████╗     ██████╗     
     *    ████╗ ████║    ██╔══██╗    ██║    ████╗  ██║            ██║         ██╔═══██╗    ██╔═══██╗    ██╔══██╗    
     *    ██╔████╔██║    ███████║    ██║    ██╔██╗ ██║            ██║         ██║   ██║    ██║   ██║    ██████╔╝    
     *    ██║╚██╔╝██║    ██╔══██║    ██║    ██║╚██╗██║            ██║         ██║   ██║    ██║   ██║    ██╔═══╝     
     *    ██║ ╚═╝ ██║    ██║  ██║    ██║    ██║ ╚████║            ███████╗    ╚██████╔╝    ╚██████╔╝    ██║         
     *    ╚═╝     ╚═╝    ╚═╝  ╚═╝    ╚═╝    ╚═╝  ╚═══╝            ╚══════╝     ╚═════╝      ╚═════╝     ╚═╝         
     *                                                                                                              
     */
     function update() {
     	if(!btns.pause) {
	    	drawScene();
	    	drawPlayer();
	    	actionsManager();

	    	drawMissiles();
	    	drawEnemies();
	    	drawBonuses();
	    	drawItems();
	    	writeScore();

		    setTimeout(function() {
				update()
		    }, 1000/settings.fps);
	    }
    }








    /***
     *    ██╗    ███╗   ██╗    ██╗    ████████╗
     *    ██║    ████╗  ██║    ██║    ╚══██╔══╝
     *    ██║    ██╔██╗ ██║    ██║       ██║   
     *    ██║    ██║╚██╗██║    ██║       ██║   
     *    ██║    ██║ ╚████║    ██║       ██║   
     *    ╚═╝    ╚═╝  ╚═══╝    ╚═╝       ╚═╝   
     *                                         
     */
     window.onload = function() {
    	// injecting DOM
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "canvas");
        canvas.width = 450;
        canvas.height = 800;
        document.getElementById('game').appendChild(canvas);
        context = canvas.getContext("2d");
        // background init for panning loop
    	bgs.d = new Image(); // down
    	bgs.d.src = "img/bg01.png";
    	bgs.t = new Image(); // top
    	bgs.t.src = "img/bg01.png";

    	pl = new Player_Entity(playerSettings);
    	// game loop starts when background ready
    	bgs.d.onload = function(){
    	    //updateLoop = setInterval(update, 1000/settings.fps);
    	    update();
    	}

        // init event listeners
	    document.addEventListener('mousemove', setMousePos);
    	
        /*
        // replaced by var Controller
        document.addEventListener('keydown',keyPush);
    	document.addEventListener("keyup", keyLetGo);
    	*/


    	// init creation loops
    	
        spawnEnemies();
        // createEnemytest();
    	
        //spawnBonuses();
    	spawnItems();
    }
