function SimCraftHud() {
    this.initialize.apply(this, arguments);
}
 
SimCraftHud.prototype = Object.create(Window_Base.prototype);
SimCraftHud.prototype.constructor = SimCraftHud;
 
 
SimCraftHud.prototype.initialize = function(x, y) {
    Window_Base.prototype.initialize.call(this, x, y, 900, 800);
	this.initializeParametre();
	this.actif = this.actif || this.defautactif;
    this.refresh();
};
SimCraftHud.prototype.standardPadding = function() {
    return 0;
};
/*--------------------------------------------------------------

######   #######  #######  ######    #######    ######  ##   ##
#######  #######  #######  #######   #######   #######  ##   ##
##   ##  ##       ##       ##   ##   ##       ##        ##   ##
######   #####    #####    ######    #####    #######   #######
######   #####    #####    ######    #####     #######  #######
##  ##   ##       ##       ##   ##   ##             ##  ##   ##
##   ##  #######  ##       ##    ##  #######  #######   ##   ##
##   ##  #######  ##       ##    ##  #######  ######    ##   ##

-------------------------------------------------------------------*/
SimCraftHud.prototype.refresh = function() {
	// initialise
	this.refreshSouffle();
	this.contents.clear();
	this.contents.fontSize = 12;																	
	this.contents.fontFace = 'parchment_MF.ttf';													
	this.changeTextColor(this.powerUpColor());
	//Setting
	this.contents.fontSize = 12;
	//Set visibility
	if(this.actif){
		//Refresh the hud
		this.updateHud();
    } else {
		this.actif = false;
	};
};
SimCraftHud.prototype.updateHud = function(){
	
	//HUD DISPLAY
	if(this.face_visible){
		this.hudFace($gameParty.leader()._actorId,0,0);
	};
	if(this.level_visible){
		this.hudLvl();
	};
	if(this.sante_visible){
		this.hudSante($gameParty.leader()._actorId,this.modeSante_reduit,0,0);
	};
	if(this.PS_visible){
		this.hudPs();
	};

	//TEAM
	if(this.team_visible){
		this.hudTeam();
		if(this.santeNpc_visible){
			this.hudSanteNpc();
		};
	};
	
	//DIALOGUE
	if(this.relation_active){
		if(this.dialogueFace_visible){
			this.hudFace(this.interlocuteur,600,0);
		};
		if(this.charisme_visible){
			this.hudCharisma($gameParty.leader()._actorId);
			this.textOk = this.textOk || "Choissisez de quelle manière vous souhaitez influencer la realation entre";
			this.textOk1= this.textOk1 ||$gameParty.leader()._name;
			this.textOk2= this.textOk2 || 'et ' + $gameActors.actor(this.interlocuteur)._name;
			
			this.drawText(this.textOk, 100,100);
			this.drawText(this.textOk1, 150,124);
			this.drawText(this.textOk2, 150,148);
		};
		if(this.relation_visible){
			this.hudRelation();
		};
		
		if(this.message_visible){
			this.hudMessage(this.communiquant);
		};
	}
	
	//TEMPS
	if(this.temps_visible){
		this.hudTime();
	};
};
SimCraftHud.prototype.initializeParametre = function(){
	this.face_visible = this.face_visible || true;
	this.PS_visible = this.PS_visible || true;
	this.sante_visible = this.sante_visible || true;
	this.level_visible = this.level_visible || true;
	this.temps_visible = this.temps_visible || true;
	this.essoufflement_actif = this.essoufflement_actif || true;
}
SimCraftHud.prototype.defautactif = function(){
	return true;
}
SimCraftHud.prototype.aleatoire = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
SimCraftHud.prototype.minimiseHud = function(){
	this.modeSante_reduit = true;
	this.modePs_reduit = true;
	this.modeHorloge_reduit = true;
	this.PS_visible = false;
	
};
SimCraftHud.prototype.maximiseHud = function(){
	this.modeHudSante_reduit = false;
	this.modePs_Reduit = false;
	this.modeHorloge_reduit = false;
};
SimCraftHud.prototype.openDialogue = function(actorId){
	console.log('appel de la conversation');
	this.interlocuteur = actorId;
	this.initializeDiscution();
	this.dialogueFace_visible = true;
	this.relation_active = true;
	this.charisme_visible = true;
	SoundManager.playOk();
	this.minimiseHud();
	this.relation_visible = true;
	this.statutRelation_active = true;
	this.indexCharisme = 0;
	this.charisme_visible = true;
	this.curseurCharisme_active = true;
	this.indexRelationX=0;
	this.indexRelationY=2;
	this.relation_active = true;
};
SimCraftHud.prototype.choixCharisme = function(){
	console.log('appel choix');
	this.indexCharisme = this.indexCharisme || 0;
	if(this.indexCharisme == 5){
		console.log('choix effectué');
		var atttt = 10500;
		while(atttt>0){
			console.log('attente'+atttt);
			atttt--;
		}
		this.curseurCharisme_active = false;
		this.charisme_visible = false;
		this.indexCharisme = 6;
		this.interaction_active =true;
	}else{
		this.curseurCharisme_active = true		
		this.processInputCharisme();
	};
};
SimCraftHud.prototype.processInputCharisme = function() {
	console.log('process Input Index = '+this.indexCharisme);
	if (Input.isPressed('down') || Input.isPressed('right') || Input.isPressed('pageup')) {
		console.log('curseur +');
		SoundManager.playCursor();
		if (this.indexCharisme<=1){
			this.indexCharisme+=1;
		}else{
			this.indexCharisme=0;
		}
		return;
	};
	if (Input.isPressed('up') || Input.isPressed('left') || Input.isPressed('pagedown')) {
		console.log('curseur -');
		SoundManager.playCursor();
		if (this.indexCharisme>=1){
			this.indexCharisme-=1;
		}else{
			this.indexCharisme=2;
		}
		return;
	};
	if (Input.isPressed('ok')) {
		console.log('curseur OK');
		this.processOkCharisme();
	}
	return;
	if (Input.isPressed('cancel')) {
		console.log('curseur cancel');
		this.processCancelCharisme();
	}
	return;
};
SimCraftHud.prototype.processCancelCharisme = function(){
	this.indexCharisme = 5;
}
SimCraftHud.prototype.processOkCharisme = function(){
	var actorId = $gameParty.leader()._actorId;
	var _actor = $gameActors.actor(actorId);
	var _interlocuteur = $gameActors.actor(this.interlocuteur);
	
	if(this.indexCharisme == 0){//convivialité
		this.textOk = "Les points de Convivialité sont distribués aléatoirement à";
		if(_actor.charisme.convivialite >0){
			SoundManager.playOk();
			this.textOk1 = "la jauge d'amitié";
			this.textOk2 = "la jauge de collaboration";
			var alea = Math.random();
			if(alea == 1){
				_interlocuteur.interactions[_actor._actorId].collab++;
			}else{
				_interlocuteur.interactions[_actor._actorId].amitie++;
			};
			this.indexCharisme = 5;
		}else{
			SoundManager.playBuzzer();
			this.drawText(textNon, 10,100);
		}
	}else if(this.indexCharisme == 1){//noblesse
		this.textOk = "Les points de Noblesse sont distribués aléatoirement à";
		if(_actor.charisme.noblesse >0){
			SoundManager.playOk();
			this.textOk1 = "la jauge de respect";
			this.textOk2 = "la jauge de collaboration";
			var alea = Math.random();
			if(alea == 1){
				_interlocuteur.interactions[_actor._actorId].collab++;
			}else{
				_interlocuteur.interactions[_actor._actorId].respect++;
			};
			this.indexCharisme = 5;
		}else{
			SoundManager.playBuzzer();
			this.drawText(textNon, 10,100);
		}
	}else if(this.indexCharisme == 2){//bravoure
		this.textOk = "Les points de Bravoure sont distribués aléatoirement à";
		if(_actor.charisme.noblesse >0){
			SoundManager.playOk();
			this.textOk1 = "la jauge de respect";
			this.textOk2 = "la jauge d'amitié";
			
			var alea = Math.random();
			if(alea == 1){
				_interlocuteur.interactions[_actor._actorId].respect++;
			}else{
				_interlocuteur.interactions[_actor._actorId].amitie++;
			};
			this.indexCharisme = 5;
		}else{
			SoundManager.playBuzzer();
			this.textOk = "Les points de charisme de cette catégorie sont insuffisants!";
			this.textOk1  ="";
			this.textOk2 = "";
		}
	};
	
}

SimCraftHud.prototype.initializeDiscution = function(){
	var _actor = $gameActors.actor($gameParty.leader()._actorId);
	var _interlocuteur = $gameActors.actor(this.interlocuteur);
	
	if(_actor.hp> this.minHp*_actor.hp/100 || !this.forme_active){
		this.rencontre();
		this.initializeCharisme($gameParty.leader()._actorId);
	}else{
		this.resultatDiscussion([1,0]);
	}
}
SimCraftHud.prototype.rencontre = function(){
	var _actor = $gameActors.actor($gameParty.leader()._actorId);
	var _interlocuteur = $gameActors.actor(this.interlocuteur);
	_interlocuteur.interactions = _interlocuteur.interactions || [];
	_interlocuteur.interactions[_actor._actorId] = _interlocuteur.interactions[_actor._actorId] || {};
	if(_interlocuteur.interactions[_actor._actorId].nbrRencontres === undefined ){
		_interlocuteur.interactions[_actor._actorId]={};
		_interlocuteur.interactions[_actor._actorId].amour = 0;
		_interlocuteur.interactions[_actor._actorId].colere = 0;
		_interlocuteur.interactions[_actor._actorId].amitie = 3;
		_interlocuteur.interactions[_actor._actorId].respect = 0;
		_interlocuteur.interactions[_actor._actorId].collab = 0;
		_interlocuteur.interactions[_actor._actorId].amourAction = 0;
		_interlocuteur.interactions[_actor._actorId].colereAction = 0;
		_interlocuteur.interactions[_actor._actorId].amitieAction = 0;
		_interlocuteur.interactions[_actor._actorId].respectAction = 0;
		_interlocuteur.interactions[_actor._actorId].collabAction = 0;
		_interlocuteur.interactions[_actor._actorId].nbrRencontres = 1;
		_interlocuteur.interactions[_actor._actorId].statutRelation = 0;
	}else {
		_interlocuteur.interactions[_actor._actorId].nbrRencontres++;
	};
	
};

//
SimCraftHud.prototype.initializeCharisme = function(actorId){
	var _actor = $gameActors.actor(actorId);
	_actor.charisme = _actor.charisme || {};
	_actor.charisme.noblesse = _actor.charisme.noblesse || 4;
	_actor.charisme.bravoure = _actor.charisme.bravoure || 4;
	_actor.charisme.convivialite = _actor.charisme.convivialite || 4;
};
/*-----------------------------------------------------------------------------

      ##  ##  ##  #####  #####  #####   #####   ###     ####   #####
      ##  ### ##   ##    ##     ##  ##  ##     ## ##   ##  ##  ##
      ##  ## ###   ##    ####   #####   ####   ######  ##      ####
      ##  ##  ##   ##    ##     ##  ##  ##    ##   ##  ##  ##  ##
      ##  ##  ##   ##    #####  ##  ##  ##    ##   ##   ####   #####

 ------------------------------------------------------------------------------*/
 
//######################################################################
// PLAYER FACE
//######################################################################
SimCraftHud.prototype.hudFace = function(actorId,decalX,decalY){
	//set actor
	var actor = $dataActors[actorId];
	//positionnement
	var xFace = 5+decalX;
	var yFace = 5+decalY;
	//settings
    var actor_face = actor.faceName;
	var actor_nom = actor.name;
	var faceIndex = actor.faceIndex;
	actor.tribuId = actor.tribuId || 0;
	var tribu = actor.tribuId;
	actor.rangNoblesse = actor.rangNoblesse || 0;
	var rangNobesse = actor.rangNoblesse;
	
	//draw
	this.drawFace('fond', tribu, xFace+7, yFace+7,56,56);
	this.drawFace(actor_face, faceIndex, xFace+4, yFace+4,50,50);
	this.changeTextColor(this.textColor(6));
	this.contents.fontSize = 20;
	this.drawText(actor_nom, xFace+5,  yFace-19,50,'center');
		
	//Noblesse
	if(this.noblesse_active){
		this.drawTitreNoblesse(rangNobesse,xFace, yFace+32);
		this.changeTextColor(this.textColor(1));
		this.drawText(rangNobesse, xFace,  yFace+40,50,'left');
	};
};
SimCraftHud.prototype.drawTitreNoblesse = function(filename, x, y){
	var bitmap = ImageManager.loadBitmap('img/hud/relation/',filename,0, true);
	this.contents.blt(bitmap, 0, 0, bitmap._canvas.width, bitmap._canvas.height, x, y);
};
//######################################################################
// HUD LVL
//######################################################################
SimCraftHud.prototype.hudLvl = function(){
	this.drawIcon(416, 2, 2);
	this.drawText(String($gameParty.leader()._level),4, 2, 15, 'center');
	if(this.modifExp_visible){
		this.drawExpModif(85,55,$gameParty.leader())
	}
};
SimCraftHud.prototype.drawExpModif = function(x, y, actor) {
	
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = actor.currentExp();
    var value2 = actor.nextRequiredExp();
    if (actor.isMaxLevel()) {
        value1 = 'max';
        value2 = 'max';
    }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, y, 50);
    this.drawText(expNext, x, y + 20, 80);
    this.resetTextColor();
    this.drawText(value1, x, y, 100, 'right');
    this.drawText(value2, x, y+20, 100, 'right');
};
//######################################################################
// HUD SANTE
//######################################################################
SimCraftHud.prototype.hudSante = function(actorId, reduit,decalX,decalY){
	//global settings
	var actor = $gameActors.actor(actorId);
	this.contents.fontSize = 12;
	//JAUGES
	//positionnement
	var _xJauge = 132;
	var _yJauge = 19;
	var _yFill = _yJauge + 9;
	var _xFill = _xJauge +29;
	var _yValeur = _yJauge - 21;
	
	//data
	actor.hygiene = actor.hygiene || 100;
	actor.hygieneMax = actor.hygieneMax || 100;
	actor.hygieneMax = actor.hygieneMax || 100;
	actor.essoufflement = actor.essoufflement || 0;
	var staminaIndex = Math.floor(actor.hp *100 / actor.mhp);
	var dietIndex = Math.floor(actor.mp * 100 /actor.mmp);
	var hygieneIndex = Math.floor(actor.hygiene * 100 /actor.hygieneMax);
	var _staminaIndexSimple = this.indexIconSante(0,staminaIndex);
	var _dietIndexSimple = this.indexIconSante(3,dietIndex);
	var _hygieneIndexSimple = this.indexIconSante(6,hygieneIndex);
	actor.staminaResidual = actor.hp - Math.floor(actor.essoufflement*actor.mhp/100);
	var dietActu = actor.mp;
	var hygieneActu = actor.hygiene;
	
	if(reduit){//MODE REDUIT
		//draw
		this.drawIconSante(_staminaIndexSimple,_xJauge-60,_yJauge-10);
		this.drawIconSante(_dietIndexSimple,_xJauge-60,_yJauge+10);
		this.drawIconSante(_hygieneIndexSimple,_xJauge-60,_yJauge+30);
		
	}else{//MODE NORMAL
	
		//BG
		var bitmap = ImageManager.loadBitmap('img/hud/sante/','BGsante',0,true);
		this.contents.blt(bitmap, 0, 0, bitmap._canvas.width, bitmap._canvas.height, _xJauge, _yJauge);
		
		//FORME
		//fill Stamina
		this.contents.gradientFillRect(_xFill, _yFill, staminaIndex, 4, this.jaugeColor(staminaIndex), this.textColor(3));
		//text Stamina
		this.changeTextColor(this.textColor(3));
		this.drawText('Forme', _xFill + 5, _yValeur, 100);
		this.drawText(actor.staminaResidual, _xJauge + 106, _yValeur, 100);
		
		//DIET
		//fill Diet
		this.contents.gradientFillRect(_xFill+134, _yFill, dietIndex, 4, this.jaugeColor(dietIndex), this.textColor(5));
		// setting text Diet
		this.changeTextColor(this.textColor(5));
		// text Diet
		this.drawText('Diétetique', _xFill + 139, _yValeur, 100);
		this.drawText(actor.mp, _xJauge + 240, _yValeur, 100);
		//fill hyg
		this.contents.gradientFillRect(_xFill+268, _yFill, hygieneIndex, 4, this.jaugeColor(hygieneIndex), this.textColor(4));
		//tewt hyg
		this.changeTextColor(this.textColor(4));
		this.drawText('Hygiène', _xFill + 274, _yValeur, 100);
		this.drawText(hygieneActu, _xJauge + 374, _yValeur, 100);
		
		//ESSOUFFLEMENT
		if(this.essoufflement_actif){
			//positionnement
			var _xJauge2 = _xFill  + staminaIndex - actor.essoufflement;
			this.contents.gradientFillRect(_xJauge2, _yFill, actor.essoufflement, 4, this.textColor(2), this.textColor(10));
		};
	};
};
//elements
SimCraftHud.prototype.jaugeColor = function(value){
    if (value<30) {
        return this.deathColor();
    } else if (value<50) {
        return this.crisisColor();
    } else {
        return this.normalColor();
    };
};
SimCraftHud.prototype.drawIconSante = function(index,x,y){
	width = 29;
	height = 23;
	var bitmap = ImageManager.loadBitmap( 'img/hud/sante/','santeSimple',0,true);
	var pw = width;
	var ph = height;
	var sw = Math.min(width, pw);
	var sh = Math.min(height, ph);
	var dx = Math.floor(x + Math.max(width - pw, 0) / 3);
	var dy = Math.floor(y + Math.max(height - ph, 0) / 3);
	var sx = index % 3 * pw + (pw - sw) / 3;
	var sy = Math.floor(index / 3) * ph + (ph - sh) / 3;
	this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
};
//System
SimCraftHud.prototype.refreshSouffle = function(){
	var actor = $gameParty.leader();
	if(actor.essoufflement > 0){
		this.souffleToHp(actor);
		if(actor.essoufflement >= 80){
			
			
			
			$gameSystem.setPose(actor._actorId, "souffle");
			while(actor.essoufflement>= maxHp){
				this.souffleToHp(actor);
			};
		};
	};
};
SimCraftHud.prototype.souffleToHp = function(actor){
	actor.essoufflement --;
	var alea = this.aleatoire(0,3);
	if(alea >=1){
		actor.gainHp(-1);
	};
};
SimCraftHud.prototype.setFatigue = function(actorId, valeur){
	var hpRate = Math.floor(actor.hp*100/actor.mhp);
	var hpRateRestant =  this.hpRate(actorId) - actor.essoufflement;
	if(hpRateRestant > valeur){
		actor.essoufflement += valeur;
	}else if(hpRateRestant == valeur){
		actor.essoufflement += valeur-1;
	}else{
		actor.essoufflement += hpRateRestant-1;
	};
};
//Managers
AudioManager.playSeEssouffle = function(){
	var _sonJoue = {};
	_sonJoue.name = "essoufflement";
	_sonJoue.pitch = 100;
	_sonJoue.volume = 100;
	_sonJoue.pan = 0;
	AudioManager.playSe(_sonJoue);
}
//######################################################################
// HUD PS
//######################################################################
SimCraftHud.prototype.hudPs = function(){
	//setting
	var actor = $gameParty.leader();
	var rateHp = actor.staminaResidual* 40/actor.mhp;
	var rateMp = actor.mp * 40/actor.mmp;
	var rateHygiene = actor.hygiene * 20/actor.hygieneMax;
	actor.pSkill = Math.floor((rateHp+rateMp+rateHygiene)/7)+2;
	
	var psResidualAtk = Math.floor(actor.atk * actor.pSkill/10);
	var psResidualDef = Math.floor(actor.def * actor.pSkill/10);
	//draw
	if(this.modePs_Reduit){
		this.drawPsHud(actor.pSkill,false);
	}else{
		this.drawPsHud(0, true);
		this.drawPsHud(actor.pSkill,false);
		this.drawPsHud(1, false);
		this.drawText(psResidualAtk, 102, 8, 18, 'center');
		this.drawText(psResidualDef, 102, 20, 18, 'center');
	};
	if(this.degatVisible && actor.requiredDegat > 0){
		var character = $gamePlayer;
		this.drawDegats(character, actor.requiredDegat);
	};
};
//elements
SimCraftHud.prototype.drawDegats = function(character, rate){
	//settings
	var _x = character._realX - 24;
	var _y = character._realY;
	this.changeTextColor(this.deathColor());
	this.contents.fontSize = 48;
	this.drawText(actor.requiredDegat, _x, _y, 100, 'center');
	this.contents.fontSize = 12;
}
SimCraftHud.prototype.drawPsHud = function(index, displayNull) {
	if(index == 0 && !displayNull){
		return;
	}else{
		width = 65;
		height = 46;
		var bitmap = ImageManager.loadBitmap( 'img/hud/ps/','HudTP',0,true);
		var pw = width;
		var ph = height;
		var sw = Math.min(width, pw);
		var sh = Math.min(height, ph);
		var dx = Math.floor(67 + Math.max(width - pw, 0) / 4);
		var dy = Math.floor(19 + Math.max(height - ph, 0) / 4);
		var sx = index % 4 * pw + (pw - sw) / 4;
		var sy = Math.floor(index / 4) * ph + (ph - sh) / 4;
		this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
	}; 
};
//######################################################################
// HUD SANTE NPC
//######################################################################
SimCraftHud.prototype.hudSanteNpc = function(){
	if($gameParty.size() > 2){
		for (npc=2; npc>$gameParty.size()-1; npc++){
			//settings
			var actor = $gameParty.members()[npc];
			var hpRate = actor.hp * 100 /actor.mhp;
			var mpRate = actor.mp * 100 /actor.mmp;
			var hygRate = actor.hygiene * 100/ actor.hygieneMax;
			//positionnement
			var _x = npc * 50 - 45;
			var _yBase = 530;
			//ICONES
			for(var index = 0; index<7; index +=3){
				//settings
				var _iconSante = this.indexIconSante(index,hpRate);
				var _y = _yBase + index * 30;
				//draw
				this.drawIconSante(_iconSante,_x,_y);
			};
		};
	};	
};
//elements
SimCraftHud.prototype.indexIconSante = function(index, rate){
	var _result = 0;
	if( rate > 50){
		var _result = 0;
	}else if( rate > 25){
		var _result = 1;
	}else{
		var _result = 2;
	};
	_result += index;
	return _result;	
};
//######################################################################
// HUD TEAM
//######################################################################
SimCraftHud.prototype.hudTeam = function(){
	if($gameParty.size() >= 2){
		for (var npc=2; npc < $gameParty.size()-1; npc++){
			//settings
			var actor = $gameParty.members()[npc];
			var xFace = npc * 50 - 45;
			var yFace = 560;
			var actor_name = actor._name;
			var faceIndex = this.animFaceIndex();
			//draw
			this.drawFace('fond', actor.tribu, xFace, yFace);
			this.drawFace(actor_name, faceIndex, xFace, yFace);
			this.changeTextColor(this.textColor(0));
			this.drawText(actor_name, xFace-5,  yFace,50,'center');
			
			//Noblesse
			if(this.noblesse_active){
				var _npc = actor.titreNoblesse;
				this.drawRelationPicture(_npc,xFace+50, yFace);
				this.changeTextColor(this.textColor(1));
				this.drawText(_npc, xFace,  yFace+40,50,'center');
			};
		};
	};
};
//######################################################################
// Dialogue FACE RELATION
//######################################################################
SimCraftHud.prototype.hudDialogueFace = function(actor){
	//settings
	var xFace = 730;
	var yFace = 5;
    var face_nm = actor._faceName;
	var faceIndex = actor._faceIndex;
	var tribuNpc = actor.tribu;

	//draw
	this.drawFace('fond', tribuNpc, xFace, yFace);
	this.drawFace(face_nm, faceIndex, xFace, yFace);
	this.changeTextColor(this.textColor(6));
	this.drawText($gameActors.actor(actor._actorId).name(), xFace+5,  yFace-19,50,'center');
	
	if(this.statutRelation_active){
		var _actor = $gameActors.actor($gameParty.leader()._actorId);
		var _interlocuteur = $gameActors.actor(this.interlocuteur);
		// defini le text du status.
		switch (_interlocuteur.interactions[_actor._actorId].statutRelation){
			case 0:
			var statusText ='Neutre';
			break;
			case 1:
			var statusText ='Epouse';
			break;
			case 2:
			var statusText ='Rival';
			break;
			case 3:
			var statusText ='Allier';
			break;
			case 4:
			var statusText ='Vassal';
			break;
			case 5:
			var statusText ='Employe';
			break;
			case 6:
			var statusText ='Suzerain';
			break;
			case 7:
			var statusText ='Patron';
			break;
			case 8:
			var statusText ='Victime';
			break;
			default :
			var statusText ='Neutre';
			break;
		};
		//settings
		var xStatusText = xFace + 50;
		var yStatusText = yFace + 5;
		this.changeTextColor(this.textColor(0));
		//draw
		this.drawText(statusText, xStatusText,  yStatusText,150,'left');
		this.changeTextColor(this.powerUpColor());
	};	

	//Noblesse
	if(this.noblesse_active){
		var rangNpc = actor.titreNoblesse;
		this.drawRelationPicture(rangNpc,xFace, yFace+32);
		this.changeTextColor(this.textColor(11));
		this.drawText(rangNpc, xFace,  yFace+40,50,'center');
	};
};
//######################################################################
// HUD MESSAGE
//######################################################################
SimCraftHud.prototype.hudMessage = function(actor){
	var message = this.dialogueText;
	var bgMessage = String(this.dialogueBgType + message.lenght);
	this.contents.fontSize = 18;
	var _ylineSize = this.paddingMsg() + this.contents.fontSize;
	var _ytop = actor._realY - message.lenght * _ylineSize;
	var _xtop = actor._realX - 100;
	this.drawMessageBg(bgMessage, _xtop, _ytop);
	for(var i = 1; i<message.lenght+1; i++){
		var _x = _xtop + this.paddingMsg();
		var _y = _ytop + _ylineSize * i - _ylineSize;
		this.drawTextEx(message[i-1], _x, _y);
	}
};
SimCraftHud.prototype.paddingMsg = function(){
	return 10;
}
SimCraftHud.prototype.drawMessageBg = function(filename, x, y) {
	var bitmap = ImageManager.loadBitmap('img/hud/message/',filename,0,true);
	this.contents.blt(bitmap, 0, 0, bitmap._canvas.width, bitmap._canvas.height, x, y);
};
//######################################################################
// HUD RELATION
//######################################################################
SimCraftHud.prototype.hudRelation = function(){
	
	var actor = $gameActors.actor($gameParty.leader()._actorId);
	var interlocuteur = $gameActors.actor(this.interlocuteur);
	
	//Limit gauge
	this.limiteJaugeRelation();
	//definition des noms des jauges
	var nomJaugesActive = 	nomJaugesActive ||
							['Amour'+interlocuteur.interactions[actor._actorId].amour,
							'Colere'+ interlocuteur.interactions[actor._actorId].colere,
							'Entente'+ interlocuteur.interactions[actor._actorId].amitie,
							'Respect'+ interlocuteur.interactions[actor._actorId].respect,
							'Confiance'+ interlocuteur.interactions[actor._actorId].collab];
	// definition des sentiments actif
	var nomSentimentActif = nomSentimentActif ||
							['Amour',
							'Colère',
							'Amitié',
							'Respect',
							'Confiance'];
	// definition du nom de l'imageIcon actif
	var iconInteractActif = iconInteractActif ||
							['Iconamour'+interlocuteur.interactions[actor._actorId].amourAction,
							'Iconcolere'+ interlocuteur.interactions[actor._actorId].colereAction,
							'Iconamitie'+ interlocuteur.interactions[actor._actorId].amitieAction,
							'Iconrespect'+ interlocuteur.interactions[actor._actorId].respectAction,
							'Iconcollab'+ interlocuteur.interactions[actor._actorId].collabAction];
	
	//Recadrer Index
	if(this.indexRelationY < 0 ){	
		this.indexRelationY = 4;
	}else if(this.indexRelationY > 4){
		this.indexRelationY = 0;
	};
	
	//settings
	var xJauge = xJauge || 605;
	var yJaugeBase = yJaugeBase || 100;
	
	//JAUGES
	for(var i = 0; i < 5; i++ ){
		//positionnement
		var yJauge = yJaugeBase + 24 * i;
		if(this.indexRelationY > i && this.interaction_active){
			yJauge -= 24;
		};
		//draw
		this.drawRelationPicture(nomJaugesActive[i],xJauge,yJauge);
	};
	
	//INTERACTIONS
	if(this.interaction_active){
		//ICONES
		//positionnement
		var xIcon = xIcon || xJauge + 27;
		var yIcon = yJaugeBase + 24 * this.indexRelationY - 24;
		//draw
		this.drawRelationPicture(iconInteractActif[this.indexRelationY], xIcon, yIcon);
		
		//CURSEUR
		//positionnement
		var xCursor = xIcon + this.indexRelationX * 30 - 1 ;
		var yCursor =  yIcon -1;
		//draw
		this.drawRelationPicture('cursor', xCursor, yCursor);

		//TEXTE
		//positionnement
		var xTextAction = 615;
		var textInteract = this.nomInteractionActive(interlocuteur.interactions[actor._actorId].statutRelation)[this.indexRelationY][this.indexRelationX];
		this.changeTextColor(this.colorInteraction(this.indexRelationY));
		this.drawText(textInteract, xJauge-40,  yCursor,150,'left');
	};
};
SimCraftHud.prototype.colorInteraction = function(index){
	var color = [this.textColor(6),this.textColor(6),,this.textColor(6),,this.textColor(6),,this.textColor(6)];
	return color[index];
}
SimCraftHud.prototype.drawPopupRelation = function(index, indexSentiment, valeur){
	
	var xPopup = xPopup || 598;
	var yPopup = index * 24 + 100;
	if(this.index >= indexSentiment && this.interaction_active){
		yPopup += 24;
	};
	if(valeur>0){
		this.drawRelationPicture('PlusRelation',xPopup,yPopup);
	}else if(valeur<0){
		this.drawRelationPicture('MoinsRelation',xPopup,yPopup);
	};
};
SimCraftHud.prototype.limiteJaugeRelation =function(){
	
	var interlocuteur = $gameActors.actor(this.interlocuteur);
	var actor = $gameActors.actor($gameParty.leader()._actorId);
	
	if(interlocuteur.interactions[actor._actorId].amour > 24){
		interlocuteur.interactions[actor._actorId].amour = 24;
	};
	if(interlocuteur.interactions[actor._actorId].amour < 0){
		interlocuteur.interactions[actor._actorId].amour = 0;
	};
	if(interlocuteur.interactions[actor._actorId].colere > 24){
		interlocuteur.interactions[actor._actorId].colere = 24;
	};
	if(interlocuteur.interactions[actor._actorId].colere < 0){
		interlocuteur.interactions[actor._actorId].colere = 0;
	};
	if(interlocuteur.interactions[actor._actorId].amitie > 24){
		interlocuteur.interactions[actor._actorId].amitie = 24;
	};
	if(interlocuteur.interactions[actor._actorId].amitie < 0){
		interlocuteur.interactions[actor._actorId].amitie =0 ;
	};
	if(interlocuteur.interactions[actor._actorId].respect > 24){
		interlocuteur.interactions[actor._actorId].respect = 24 ;
	};
	if(interlocuteur.interactions[actor._actorId].respect < 0){
		interlocuteur.interactions[actor._actorId].respect = 0;
	};
	if(interlocuteur.interactions[actor._actorId].collab > 24){
		interlocuteur.interactions[actor._actorId].collab = 24;
	};
	if(interlocuteur.interactions[actor._actorId].collab < 0){
		interlocuteur.interactions[actor._actorId].collab = 0;
	};
	
}
SimCraftHud.prototype.drawRelationPicture = function(filename, x, y){
	var bitmap = ImageManager.loadBitmap('img/hud/relation/',filename,0, true);
	this.contents.blt(bitmap, 0, 0, bitmap._canvas.width, bitmap._canvas.height, x, y);
};
SimCraftHud.prototype.nomInteractionActive =function(id){
	var nomInteraction = [];
	switch(id){
		case 0://Neutre
			nomInteraction = 
							[["Charmer", "Embrasser", "Câliner", "Epouser"],
							["Critiquer", "Engueuler", "Voler", "Frapper"],
							["Discuter", "Plaisanter", "Jouer", "S'allier"],
							this.actionNoblesseNeutre(),
							["Marchander", "Commercer", "Travail", "Recruter"]];
		break;
		case 1://Epouse
			nomInteraction = 
							[["Charmer", "Embrasser", "Choyer", "Câliner"],
							["Critiquer", "Insulter", "Voler", "Rompre"],
							["Discuter", "Sympatiser", "Amener", "Jouer"],
							["Ordonner", "Révérer", "Primer", "Régenter"],
							["Marchander", "Commercer", "Enrôler", "Collaborer"]];		
		break;
		case 2://Rival
			nomInteraction = 
							[["Séduire", "Embrasser", "Etreindre", "Câliner"],
							["Critiquer", "Insulter", "Detrousser", "Attaquer"],
							["Discuter", "Sympatiser", "S'Excuser", "Rabibocher"],
							["Soumettre", "Dédaigner", "Rançonner", "Régenter"],
							["Marchander", "Commercer", "Enrôler", "Collaborer"]];
		break;
		case 3://Allier
			nomInteraction = 
							[["Charmer", "Embrasser", "Etreindre", "Câliner"],
							["Critiquer", "Insulter", "Voler", "Se brouiller"],
							["Discuter", "Plaisanter", "Amener", "Jouer"],
							["Ordonner", "Révérer", "Tributer", "Régenter"],
							["Marchander", "Commercer", "Enrôler", "Collaborer"]];
		break;
		case 4://Vassal
			nomInteraction = 
							[["Charmer", "Embrasser", "Etreindre", "Câliner"],
							["Critiquer", "Insulter", "Dépouiller", "Bannir"],
							["Discuter", "Plaisanter", "Amener", "Jouer"],
							["Ordonner", "Féliciter", "Taxer", "Régenter"],
							["Diriger", "Collecter", "Assigner", "Equiper"]];
		break;
		case 5://Employe
			nomInteraction = 
							[["Charmer", "Embrasser", "Etreindre", "Câliner"],
							["Critiquer", "Insulter", "Voler", "Congédier"],
							["Discuter", "Plaisanter", "Amener", "Jouer"],
							["Ordonner", "Révérer", "Payer", "Régenter"],
							["Diriger", "Collecter", "Assigner", "Equiper"]];
		break;
		case 6://Suzerain
			nomInteraction = 
							[["Charmer", "Embrasser", "Etreindre", "Câliner"],
							["Rouspeter", "Critiquer", "S'emanciper", "Parjurer"],
							["Discuter", "Amuser", "Sympatiser", "Divertir"],
							["Servir", "Révérer", "S'Aquitter", "Revendiquer"],
							["Négocier", "Commercer", "Contribuer", "Tributer"]];
		break;
		case 7://Patron
			nomInteraction = 
							[["Charmer", "Embrasser", "Etreindre", "Câliner"],
							["Rouspeter", "Critiquer", "Voler", "Démissionner"],
							["Discuter", "Plaisanter", "Sympatiser", "Divertir"],
							["Servir", "Remercier", "Augmentation", "Carrière"],
							["Négocier", "Livrer", "Demander tâche", "S'Equiper"]];
		break;
		case 8://Victime
			nomInteraction = 
							[["Charmer", "Embrasser", "Etreindre", "Câliner"],
							["Rabaîsser", "Insulter", "Racketter", "Frapper"],
							["Discuter", "Se moquer", "Consoler", "Jouer"],
							["Soumettre", "Humilier", "Taxer", "Manipuler"],
							["Arnaquer", "Commercer", "Manipuler", "Equiper"]];
		break;
		default ://Neutre
			nomInteraction = 
							[["Charmer", "Embrasser", "Câliner", "Epouser"],
							["Critiquer", "Engueuler", "Voler", "Frapper"],
							["Discuter", "Plaisanter", "Jouer", "S'allier"],
							this.actionNoblesseNeutre(),
							["Marchander", "Commercer", "Travail", "Recruter"]];
		break;
	}
	return nomInteraction;
};
SimCraftHud.prototype.actionNoblesseNeutre = function(){
	var interact = [];
	var actor = $gameParty.leader();
	var interlocuteur = this.interlocuteur;
	if(actor.tribu == interlocuteur.tribu){
		if(actor.titreNoblesse == interlocuteur.titreNoblesse+1){
			interact = ["Ordonner", "Féliciter", "Taxer", "Régenter"];
		}else if(actor.titreNoblesse == interlocuteur.titreNoblesse){
			interact = ["Honnir", "Révérer", "Tributer", "Intriguer"];
		}else if(actor.titreNoblesse == interlocuteur.titreNoblesse-1){
			interact = ["Rouspeter", "Critiquer", "S'emanciper", "Parjurer"];
		}else if(actor.titreNoblesse < interlocuteur.titreNoblesse){
			interact = ["Parjurer", "Prêter allégeance", "Quemander", "Revendiquer"];
		}else if(actor.titreNoblesse > interlocuteur.titreNoblesse){
			interact = ["Ordonner", "Féliciter", "Donner", "Régenter"];
		};
	}else{
		if(actor.titreNoblesse <= interlocuteur.titreNoblesse){
			interact = ["Rejoindre", "Prêter allégeance", "Capturer", "Embrigader"];
		}else{
			interact = ["Soumettre", "Inviter", "Intriguer", "Embrigader"];
		};
	};
	return interact;
};

//######################################################################
// HUD TIME
//######################################################################
SimCraftHud.prototype.hudTime = function(){
	//settings
	if($gameSystem.hour()>=12){
		var heureHorloge = $gameSystem.hour()-12;
	}else{
		var heureHorloge = $gameSystem.hour();
	};
	//positionnement
	var yHorloge = 550;
	var xHorloge =725;
	//mode complet
	if(!this.modeHorloge_reduit){
		//horloge repositionnement
		yHorloge -= 70;
		xHorloge -= 15;
		//HUD DATE
		//settings
		var textDate = this.getDateText(1);
		var textDate2 = this.getDateText(2);
		var textDate3 = this.getDateText(3);
		this.contents.fontSize = 16;
		//draw
		this.drawTimeHud(0, 495, 540);
		this.changeTextColor(this.textColor(6));
		this.drawText(textDate, 532, 542, 240, 'center');
		this.drawText(textDate2, 532, 556, 240, 'center');
		this.changeTextColor(this.textColor(7));
		this.drawText(textDate3, 532, 570, 240, 'center');
	};
	this.drawHorloge(heureHorloge, xHorloge, yHorloge);
};
SimCraftHud.prototype.drawHorloge = function(fileIndex, x, y) {
	var name = 'Horloge2'
    width = 64;
    height = 64;
    var bitmap = ImageManager.loadBitmap('img/hud/time/','Horloge',0,true);
    var pw = 64;
    var ph = 64;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(x + Math.max(width - pw, 0) / 4);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 4);
    var sx = fileIndex % 4 * pw + (pw - sw) / 4;
    var sy = Math.floor(fileIndex / 4) * ph + (ph - sh) / 4;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
};
SimCraftHud.prototype.drawTimeHud = function(fileIndex, x, y) {
	var name = 'HudDate';
    width = 284;
    height = 64;
    var bitmap = ImageManager.loadBitmap('img/hud/time/',name, 0,true);
    var pw = 284;
    var ph = 64;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(x + Math.max(width - pw, 0) / 4);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 4);
    var sx = fileIndex % 4 * pw + (pw - sw) / 4;
    var sy = Math.floor(fileIndex / 4) * ph + (ph - sh) / 4;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
};
SimCraftHud.prototype.getDateText = function (ligne) {
	// Recuperation des infos
	//set
	if (ligne == 1){
		return $gameSystem.day_week_name()+" "+$gameSystem.day()+" "+$gameSystem.month_name()+" "+$gameSystem.year();
	} else if (ligne == 2){
		return "C'est la saison "+$gameSystem.month_name();
	}else {
		return "Il est "+$gameSystem.hour()+"heure"+$gameSystem.minute()+"min";
	};
};
//######################################################################
// HUD CHARISME
//######################################################################
SimCraftHud.prototype.hudCharisma = function(actorId){
	var actor = $gameActors.actor(actorId);
	this.drawCharisma(0,0,true);
	this.drawCharisma(actor.charisme.convivialite,0,false);
	this.drawCharisma(actor.charisme.noblesse, 8,false);
	this.drawCharisma(actor.charisme.bravoure, 4,false);
	if(this.curseurCharisme_active){
		this.indexCharisme = this.indexCharisme || 0;
		this.drawCharisma(this.indexCharisme, 13,true);
	};
};
//elements
SimCraftHud.prototype.drawCharisma = function(index, ecart, displayNull){
	if(index == 0 && !displayNull){
		return;
	}else{
		indexModif = index + ecart;
		width = 79;
		height = 61;
		var bitmap = ImageManager.loadBitmap('img/hud/charisme/','Hudcharisme',0,true);
		var pw = 79;
		var ph = 61;
		var sw = Math.min(width, pw);
		var sh = Math.min(height, ph);
		var dx = Math.floor(5 + Math.max(width - pw, 0) / 4);
		var dy = Math.floor(75 + Math.max(height - ph, 0) / 4);
		var sx = indexModif % 4 * pw + (pw - sw) / 4;
		var sy = Math.floor(indexModif / 4) * ph + (ph - sh) / 4;
		this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
	};
};



/*-----------------------------------------------------------------------------

         ####     ####    ######   ##  ##   ######
        ##	##   ##  ##   ##       ##  ##   ##
         ##      ##       ##       ### ##   ##
          ###    ##       #####    ## ###   #####
            ##   ##       ##       ##  ##   ##
        ##  ##   ##  ##   ##       ##  ##   ##
         ####     ####    ######   ##  ##   ######
 
 ------------------------------------------------------------------------------*/
var clone_map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    clone_map_start.call(this);
	//this.calculVariableSim();
	this.createSimCraftHud();
};
Scene_Map.prototype.createSimCraftHud = function() {
    this._SimCraftHud = new SimCraftHud();
    this._SimCraftHud.opacity = 0;
    this.addWindow(this._SimCraftHud);
};



var clone_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    clone_map_update.call(this);
	if(this._SimCraftHud.visible == false){
		this.activeSimCraftHud();
	}else{
		if(this.compteurOk(1,30)){
			this._SimCraftHud.refresh();
		};
	};
};

var clone_map_updatechild = Scene_Map.prototype.updateScene;
Scene_Map.prototype.updateScene = function() {
    clone_map_updatechild.call(this);
	if(this.compteurOk(1,30)){
		this._SimCraftHud.refresh();
	};
};
Scene_Map.prototype.compteurOk = function(id,duree){
	this.compteur = this.compteur || [];
	this.compteur[id] = this.compteur[id] || 0;
	if(this.compteur[id] >= duree){
		this.compteur[id] = 0;
		return true;
	}else{
		this.compteur[id]++;
	};
};
Scene_Map.prototype.activeSimCraftHud=function(){
	this._SimCraftHud.face_visible = true;
	this._SimCraftHud.visible = true;
}
/*-----------------------------------------------------------------------------

      ####     ##    ##      ####   ##  ##  ##
     ##  ##   ####   ##     ##  ##  ##  ##  ##      
     ##      ##  ##  ##     ##      ##  ##  ##     
     ##  ##  ######  ##     ##  ##  ##  ##  ##        
      ####   ##  ##  #####   ####    ####   ###### 
 
 ------------------------------------------------------------------------------*/
