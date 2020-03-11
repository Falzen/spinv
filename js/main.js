
// TODOs
// invincible 1s after being hit
// better collision detection (wtf not hurt when collision from the side)
// collision checks should return booleans


/***
 *    ██╗  ██╗███████╗██╗   ██╗    ██████╗  ██████╗ ██╗    ██╗███╗   ██╗
 *    ██║ ██╔╝██╔════╝╚██╗ ██╔╝    ██╔══██╗██╔═══██╗██║    ██║████╗  ██║
 *    █████╔╝ █████╗   ╚████╔╝     ██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║
 *    ██╔═██╗ ██╔══╝    ╚██╔╝      ██║  ██║██║   ██║██║███╗██║██║╚██╗██║
 *    ██║  ██╗███████╗   ██║       ██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║
 *    ╚═╝  ╚═╝╚══════╝   ╚═╝       ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝
 *                                                                      
 */
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










/***
 *    ██╗  ██╗███████╗██╗   ██╗    ██╗   ██╗██████╗ 
 *    ██║ ██╔╝██╔════╝╚██╗ ██╔╝    ██║   ██║██╔══██╗
 *    █████╔╝ █████╗   ╚████╔╝     ██║   ██║██████╔╝
 *    ██╔═██╗ ██╔══╝    ╚██╔╝      ██║   ██║██╔═══╝ 
 *    ██║  ██╗███████╗   ██║       ╚██████╔╝██║     
 *    ╚═╝  ╚═╝╚══════╝   ╚═╝        ╚═════╝ ╚═╝     
 *                                                  
 */
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
        carpetBombing();
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
     function createMissile(dir) {
    	if(!dir) {
    		dir = 'c';
    	}
    	let missile = {
    		x: (pl.x + (pl.w/2) - 3),
    		y: (pl.y + (pl.h/2)),
    		xd: mstats.xd, // x direction
    		w: mstats.w,
    		h: mstats.h,
    		sy: mstats.sy, // speed Y axis
    		sx: mstats.sx // speed Y axis
    	};
    	switch(dir) {
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
            color: data.color
        };
        missiles.push(customMissile);
     }


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
    		type: b.type
    	};
    	bonuses.push(bonus);
    }
    function createItem(name) {
    	let it = itemsMap.get(name);
    	let goRight = Math.random() > 0.5;
    	let randY = getRandomInt((-1*(canvas.height/3)), ((canvas.height/3)-it.h));
    	let randx = goRight 
    					? getRandomInt(canvas.width * -0.3, canvas.width * 0.3) 
						: getRandomInt(canvas.width * 0.6, canvas.width * 1.3);

    	let randSpeedX = getRandomInt(it.sx[0], it.sx[1]);
    	let randSpeedY = getRandomInt(it.sy[0], it.sy[1]);
    	let bonus = {
    		x: randx,
    		y: randY,
    		w: it.w,
    		h: it.h,
    		sx: randSpeedX,
    		sy: randSpeedY,
			dirMod: goRight ? 1 : -1,
    		type: it.type
    	};
    	items.push(bonus);
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
    		pts: ses.pts,
    		collisionEffect: ses.collisionEffect
    	};
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
    function checkEntityCollisionWithMissiles(entity, entities, indw, effect) {
    	for(let j=0; j<missiles.length; j++) {
    		let m = missiles[j];
    		
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
    			// TODO should return TRUE or FALSE and management should be in parent's method
    			if(effect == 'hitEntity') {
    				addRage(50);
    				settings.score += entity.pts;
    				entities.splice(indw,1);
    				missiles.splice(j,1);
    			}
    			if(effect == 'blockMissile') {
    				missiles.splice(j,1);
    			}
    		}
    		// X axis check by missile's MIDDLE
    		// entity.x < mmid
    		// && (entity.x+entity.w) > mmid
    	}
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
 	relativeSpeedY = 1+(1-(getPlayerPosY_inPercents()/95)*1.9);
 	
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
	let grd = context.createLinearGradient(pl.x, pl.y, pl.x, pl.y-500);
	grd.addColorStop(0,"blue");
	grd.addColorStop(1,"transparent");
    context.fillStyle=grd;
    context.fillRect(pl.x + (pl.w/2), 0, 1, pl.y);
}
function drawBonuses() {
	context.fillStyle="red";
	for(let i=0; i<bonuses.length; i++) {
		let b = bonuses[i];
		checkBonusOutOfBounds(b,i);
		animateBonus(b,i);
	    context.fillRect(b.x, b.y, b.w, b.h);
	    let effect = '';
	   
	    checkEntityCollisionWithMissiles(b, bonuses, i, effect);
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
	    let effect = '';
	    switch(it.type) {
	    	case 'asteroid':
	    		effect = 'blockMissile'
	    	break;
	    }
	    checkEntityCollisionWithMissiles(it, items, i, effect);
	    if(checkEntityCollisionWithPlayer(it)) {
			addHealth(-20);
	    }
    }
}
function drawMissiles() {
	for(let i=0; i<missiles.length; i++) {

		let m = missiles[i];
		context.fillStyle='green';
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
	    checkEntityCollisionWithMissiles(en, enemies, i, 'hitEntity');
	    if(checkEntityCollisionWithPlayer(en)) {
			addHealth(-40);
	    }

	    
    }
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
		checkEntitiesCollisionWithPlayer(enemies);
	    pl = adjustForBoundaries(pl);
    }  

    context.fillStyle="lime";
    context.fillRect(pl.x, pl.y, pl.w, pl.h);
    drawAimSight();
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
        let currentHealthWidth = 1*(getComputedStyle(document.getElementById('healthAmount')).width.split('px')[0]);
        currentHealthWidth += amount;
        if(currentHealthWidth >= fullHealthWidth) {
            currentHealthWidth = fullHealthWidth;
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
        canvas.width = 450;
        canvas.height = 800;
        document.getElementById('game').appendChild(canvas);
        context = canvas.getContext("2d");
        // background init for panning loop
    	bgs.d = new Image(); // down
    	bgs.d.src = "img/bg01.png";
    	bgs.t = new Image(); // top
    	bgs.t.src = "img/bg01.png";
    	// game loop starts when background ready
    	bgs.d.onload = function(){
    	    updateLoop = setInterval(update, 1000/60);
    	}

        // init event listeners
        document.addEventListener('keydown',keyPush);
    	document.addEventListener("keyup", keyLetGo);
    	// init creation loops
    	spawnEnemies();
    	//spawnBonuses();
    	spawnItems();
    }
