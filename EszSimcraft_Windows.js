/*:	 
*@help 
*-------------------------------------------------------------------------------------
*
*        ##################   ###########    ###########################
*       #################  #################  #########################
*      #######            ######       ######  #######
*     #######            #######        ######  #######
*    #######              ########       ######   ######                
*    ######                  ########              #######             
*   ##########################  ########  ######### #######  ##########
*   ###########################  #########  ########  ######  #########  
*  ########                         #########          #######              
*   #######              #######      ########           #######                                                       
*    #######              #######      #######             ######
*     #######              #######     #######              #######
*      ###################  #################  ###################### 
*       ###################  ##############  #########################
*        ###################    #########  ############################
*
*    ##########     ########       ######  ######      #########
*  ##              ##      ##     ##     ####   ##    ##       ##   WWW.ESZ-GAME.ORG
*  ##     #####   ############   ##      ##      ##    ####        #########
*  ##        ##  ##          ##  ##      ##      ##   ##       ##  ######### 
*     ########   ##          ##  ##              ##    #########
 
*-------------------------------------------------------------------------------------
*Hi!
*Sorry for my broken english but I'm french.
*That my first plugin and my first code ever in javascript. I'm a beginner.
*
*There is two way to use this script.
*
*1-ACTION MODE
*That is make for my own game project and it use the action variable.
*If you wont to use this system set false in Action_Mode plugin parameter
*It work only when this value of the action Variable is different to 0. 
*In this mode you have 25 actions with different settings and different automatic sequences.
*
*If you
* 
@title SimCraft Part 1 - Sim
@author Esziaprez --> EGS (http://www.esz-game.org)
@version 0.4
@date April 11, 2016
@filename Esz_Simcraft_Sim.js
@url not ready!
Free for all usage please say to me when you use.

I'm the futur of myself...Sexy and I know it!

*You have many way to contact me if you want something or if you are a sexy lady :

* Main Website: http://esz-game.org
* Facebook: https://www.facebook.com/egstudio/
* Twitter: https://twitter.com/neotori
* Youtube: exist but no interest
* Tumblr: Coming soon... maybe
* Mail: contact@esz-game.org
*
*@plugindesc v0.4 - Allow the first part of the SimCraftSystem : allow the simlife aspect.
* See the help to know more about!
*
* @param ---------------SWITCHES-------------------
* @desc
* @default 
*
* @param Activation_Ps_Hud_Switch_ID
* @desc 
* @default 1
*
* @param Activation_Face_Hud_Switch_ID
* @desc 
* @default 2
*
* @param Activation_Health_Hud_Switch_ID
* @desc 
* @default 3
*
* @param Activation_Equip_Hud_Switch_ID
* @desc 
* @default 4
*
* @param Activation_Lvl_Hud_Switch_ID
* @desc 
* @default 5
*
* @param Activation_Speaker_Face_Switch_ID
* @desc 
* @default 6
*
* @param Activation_Message_Switch_ID
* @desc 
* @default 7
*
* @param Activation_Charisma_Hud_Switch_ID
* @desc 
* @default 8
*
* @param Activation_Relation_Hud_Switch_ID
* @desc 
* @default 9
*
* @param Activation_Timer_Switch_ID
* @desc 
* @default 10
*
* @param Activation_Bag_Hud_Switch_ID
* @desc 
* @default 11
*
* @param Activation_Nobility_Switch_ID
* @desc 
* @default 12
*
* @param Activation_Team_Hud_Switch_ID
* @desc
* @default 13
*
* @param Breathless_Switch_ID
* @desc 
* @default 14
*
* @param Simple_Display_Mode_Switch_ID
* @desc 
* @default 15
*
* @param Activation_Charisma_Cursor_Switch_ID
* @desc
* @default 16
*
* @param Activation_Love_Gauge_Switch_ID
* @desc 
* @default 17
*
* @param Activation_Relation_Cursor_Switch_ID
* @desc
* @default 18
*
* @param Activation_Dater_Switch_ID
* @desc
* @default 19
*
* @param Hour_Sequence_Switch_ID
* @desc 
* @default 20
*
* @param Sequence_Switch_ID
* @desc 
* @default 21
*
* @param Visibility_Switch_ID
* @desc 
* @default 22
*
* @param ---------------VARIABLES-------------------
* @desc
* @default Secret Skill set on!!!
*
* @param Action_Variable_ID
* @desc
* @default 1
*
* @param Breathless_Variable_ID
* @desc
* @default 2
*
* @param Actual_Hygiene_Variable_ID
* @desc
* @default 3
*
* @param Max_Hygiene_Variable_ID
* @desc
* @default 4
*
* @param Speaker_Variable_ID
* @desc
* @default 5
*
* @param CursorX_Variable_ID
* @desc
* @default 6
*
* @param CursorY_Variable_ID
* @desc 
* @default 7
*
* @param Calendar_Variable_ID
* @desc 
* @default 8 
*
* @param Conviviality_Variable_ID
* @desc
* @default 9
*
* @param Bravery_Variable_ID
* @desc 
* @default 10
*
* @param Nobility_Variable_ID
* @desc 
* @default 11
*
* @param BG_Time_Hud_Variable_ID
* @desc 
* @default 12
*
* @param BG_Message_Variable_ID
* @desc
* @default 13
*
* @param Contains_Message_Variable_ID
* @desc 
* @default 14
*
* @param Hour_Lenght_Variable_ID
* @desc 
* @default 15
*
*/
var parameters = PluginManager.parameters('Esz_SimCraft_Hud');
var hudPsSwitch = Number(parameters['Activation_Ps_Hud_Switch_ID'] || '1');
var faceSwitch = Number(parameters['Activation_Face_Hud_Switch_ID'] || '2');
var santeSwitch = Number(parameters['Activation_Health_Hud_Switch_ID'] || '3');
var equipSwitch = Number(parameters['Activation_Equip_Hud_Switch_ID'] || '4');
var levelSwitch = Number(parameters['Activation_Lvl_Hud_Switch_ID'] || '5');
var npcFaceSwitch = Number(parameters['Activation_Speaker_Face_Switch_ID'] || '6');
var messageSwitch = Number(parameters['Activation_Message_Switch_ID'] || '7');
var hudCharismaSwitch = Number(parameters['Activation_Charisma_Hud_Switch_ID'] || '8');
var relationSwitch = Number(parameters['Activation_Relation_Hud_Switch_ID'] || '9');
var timerSwitch = Number(parameters['Activation_Timer_Switch_ID'] || '10');
var bagSwitch = Number(parameters['Activation_Bag_Hud_Switch_ID'] || '11');
var nobilitySwitch = Number(parameters['Activation_Nobility_Switch_ID'] || '12');
var hudTeamSwitch = Number(parameters['Activation_Team_Hud_Switch_ID'] || '13');
var breathlessSwitch = Number(parameters['Breathless_Switch_ID'] || '14');
var simpleSwitch = Number(parameters['Simple_Display_Mode_Switch_ID'] || '15');
var charismaCursorSwitch = Number(parameters['Activation_Charisma_Cursor_Switch_ID'] || '16');
var sexeOpposeSwitch = Number(parameters['Activation_Love_Gauge_Switch_ID'] || '17');
var relationCursorSwitch = Number(parameters['Activation_Relation_Cursor_Switch_ID'] || '18');
var daterSwitch = Number(parameters['Activation_Dater_Switch_ID'] || '19');
var actionVariable = Number(parameters['Action_Variable_ID'] || '1');
var breathlessVariable = Number(parameters['Breathless_Variable_ID'] || '2');
var hygieneActuVariable = Number(parameters['Actual_Hygiene_Variable_ID'] || '3');
var hygieneMaxVariable = Number(parameters['Max_Hygiene_Variable_ID'] || '4');
var speakerVariable = Number(parameters['Speaker_Variable_ID'] || '5');
var cursorYVariable = Number(parameters['CursorX_Variable_ID'] || '6');
var cursorXVariable = Number(parameters['CursorY_Variable_ID'] || '7');
var calendrierVariable = Number(parameters['Calendar_Variable_ID'] || '8');
var convivialiteVariable = Number(parameters['Conviviality_Variable_ID'] || '9');
var bravoureVariable = Number(parameters['Bravery_Variable_ID'] || '10');
var noblesseVariable = Number(parameters['Nobility_Variable_ID'] || '11');
var framePasseSwitch = Number(parameters['Sequence_Switch_ID'] || '20');
var heurePasseSwitch = Number(parameters['Hour_Sequence_Switch_ID'] || '21');
var fondTimeVariable = Number(parameters['BG_Time_Hud_Variable_ID'] || '12');
var bgMessageVariable = Number(parameters['BG_Message_Variable_ID'] || '13');
var messageVariable = Number(parameters['Contains_Message_Variable_ID'] || '14');
var timeSpeedVariable = Number(parameters['Hour_Lenght_Variable_ID'] || '15');
var visibilitySwitch = Number(parameters['Visibility_Switch_ID'] || '22');
var chronoFaceVariable = Number(parameters['Ecounter_Face_Variable_ID'] || '22');

var visibilityHud = $gameSwitches.value(visibilitySwitch);
var hudPsActive = $gameSwitches.value(hudPsSwitch);
var hudFaceActive = $gameSwitches.value(faceSwitch);
var hudSanteActive = $gameSwitches.value(santeSwitch);
var hudEquipActive = $gameSwitches.value(equipSwitch);
var hudLvlActive = $gameSwitches.value(levelSwitch);
var hudNpcFaceActive = $gameSwitches.value(npcFaceSwitch);
var hudMessageActive = $gameSwitches.value(messageSwitch);
var hudCharismaActive = $gameSwitches.value(hudCharismaSwitch);
var hudRelationActive = $gameSwitches.value(relationSwitch);
var hudTimeActive = $gameSwitches.value(timerSwitch);
var hudBagActive = $gameSwitches.value(bagSwitch);
var nobilityActive = $gameSwitches.value(nobilitySwitch);
var hudTeamActive = $gameSwitches.value(hudTeamSwitch);
var breathHudActive = $gameSwitches.value(breathlessSwitch);
var affichageSimpleActive = $gameSwitches.value(simpleSwitch);
var charismaCursorActive = $gameSwitches.value(charismaCursorSwitch);
var sexeOppose = $gameSwitches.value(sexeOpposeSwitch);
var relationCursorActive = $gameSwitches.value(relationCursorSwitch);
var heurePasseSwitch = $gameVariables.value(heurePasseSwitch);
var framePasseSwitch = $gameVariables.value(framePasseSwitch);


//SYSTEM VARIABLES
var actionId = $gameVariables.value(actionVariable);
var tribu = gameActors.actor(0).nickname();
var staminaActu = gameActors.actor(0).hp;
var staminaMax = gameActors.actor(0).mhp;
var staminaIndex = Math.Floor(staminaActu * 100 / staminaMax);
var staminaResidual = gameActors.actor(0).hp - breathlessness;
var dietActu = gameActors.actor(0).mp;
var dietMax = gameActors.actor(0).mmp;
var dietIndex = Math.Floor(dietActu * 100 / dietMax);
var breathlessness = $gameVariables.value(breathlessVariable);
var hygieneActu = $gameVariables.value(hygieneActuVariable);
var hygieneMax = $gameVariables.value(hygieneMaxVariable);
var hygieneIndex = hygieneActu * 100 / hygieneMax;
var psActu = (staminaActu + dietActu) / 18;
var psMax = (staminaMax + dietMax) / 18;
var indexPs = Math.floor(psActu * 10 / psMax) + 2;
var psResidualAtk = ((staminaResidual + dietActu) / 18) + gameActors.actor(0).param(2);
var psResidualDef = ((staminaResidual + dietActu) / 18) + gameActors.actor(0).param(3);
var speaker = $gameVariables.value(speakerVariable);
var indexCursorY = $gameVariables.value(cursorYVariable);
var indexCursorX = $gameVariables.value(cursorXVariable);
var amourValue = this.get_self_variable("amour", speaker, 1)|| 0;
var colereValue = this.get_self_variable("colere", speaker, 1)|| 0;
var ententeValue = this.get_self_variable("entente", speaker, 1)||0;
var respectValue = this.get_self_variable("respect", speaker, 1)|| 0;
var confianceValue = this.get_self_variable("confiance", speaker, 1) || 0;
var calendrier = $gameVariables.value(calendrierVariable);
var convivialite = $gameVariables.value(convivialiteVariable);
var bravoure = $gameVariables.value(bravoureVariable);
var noblesse = $gameVariables.value(noblesseVariable);
var fondTime = $gameVariables.value(fondTimeVariable);
var backgroundMessage = $gameVariables.value(bgMessageVariable);
var textMessage = $gameVariables.value(messageVariable);
var timerParHeure = $gameVariables.value(timeSpeedVariable);
 /*-----------------------------------------------------------------------------

      ##  ##  ##  #####  #####  #####   #####   ###     ####   #####
      ##  ### ##   ##    ##     ##  ##  ##     ## ##   ##  ##  ##
      ##  ## ###   ##    ####   #####   ####   ######  ##      ####
      ##  ##  ##   ##    ##     ##  ##  ##    ##   ##  ##  ##  ##
      ##  ##  ##   ##    #####  ##  ##  ##    ##   ##   ####   #####

 ------------------------------------------------------------------------------*/
function SimCraftHud(){
    this.initialize.apply(this, arguments);
}
SimCraftHud.prototype = Object.create(Window_Base.prototype);
SimCraftHud.prototype.constructor = SimCraftHud;
SimCraftHud.prototype.initialize = function(x, y) {
    Window_Base.prototype.initialize.call(this, x, y, 900, 800);
	if(this.timerParHeure == 0){
		$gameVariables.setValue(timeSpeedVariable, 120);
	};
    this.refresh();
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
	this.contents.clear();
	//Setting
	this.contents.fontSize = 12;																	// FontSize
	this.contents.fontFace = 'parchment_MF.ttf';													// FontFace
	this.changeTextColor(this.powerUpColor());														// Font color
	//Set visibility
	if(visibilityHud){																		// Switch visible				S-1
		this.visible = true;
		this.refreshTheHud();
    } else {
		this.visible = false;
	};
	//Refresh the hud
};
SimCraftHud.prototype.refreshTheHud = function(){
	//HUD DISPLAY
	if(hudFaceActive){
		this.hudFace();
	};
	if(hudTeamActive){
		this.hudTeam();
	};
	if(hudPsActive){
		this.hudPs();
	};
	if(hudSanteActive){
		this.hudSante();
	};
	if(hudSanteNpcActive){
		this.hudSanteNpc();
	}
	if(hudEquipActive){
		this.hudEquip();
	};
	if(hudLvlActive){
		this.hudLvl();
	};
	if(hudNpcFaceActive){
		this.hudNpcFace();
	};
	if(hudMessageActive){
		this.hudMessage(backgroundMessage, textMessage);
	};
	if(hudCharismaActive){
		this.hudCharisma();
	};
	if(hudRelationActive){
		this.hudRelation();
	};
	if(hudTimeActive){
		this.hudTime();
	};
	if(hudBagActive){
		this.hudBag();
	};
};

//######################################################################
// PLAYER FACE
//######################################################################
SimCraftHud.prototype.hudFace = function(){
	//settings
	var xFace = 5;
	var yFace = 5;
    var sari_nom = 'Sari' + actionId;
	var faceIndex = this.getIndexFace(0);

	//draw
	this.drawFace('fond', faceIndex, xFace, yFace);
	this.drawFace(sari_nom, faceIndex, xFace, yFace);
	this.changeTextColor(this.textColor(0));
	this.drawText(this.partyMemberName(1), xFace+60,  yFace,50,'center');
		
	//NOBILITY
	if($gameSwitches.value(14)){
		this.drawRelationPicture(actorCible[0].currentClass(),xFace, yFace+32);
		this.changeTextColor(this.textColor(1));
		this.drawText(actorCible[0].currentClass(), xFace,  yFace+40,50,'left');
	};
};
SimCraftHud.prototype.drawFace = function(fileName, faceIndex, x, y){
	width = 46;
    height = 50;
    var bitmap = this.loadBitmap('img/system/relation/face/',fileName, hue,true);
    var pw = width;
    var ph = height;
    var sw = 46;
    var sh = 50;
    var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var sx = faceIndex % 4 * pw + (pw - sw) / 2;
    var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
    this.contents.blt(bitmap, sx, sy, 46, 50, dx, dy);
};
SimCraftHud.prototype.drawRelationPicture = function(filename, x, y){
	var bitmap = this.loadBitmap('img/system/relation/jauge/',filename,hue, true);
	this.contents.blt(bitmap, 0, 0, bitmap._canvas.width, bitmap._canvas.height, x, y);
};
SimCraftHud.prototype.getIndexFace = function(npc){
	if(this.encounterHudFace(npc)){
		if(this._indexFace[npc] > 7){
			this._indexFace[npc] = 0;
		}else{
			this._indexFace[npc]++;
		};
	};
	return this._indexFace[npc];
};
SimCraftHud.prototype.encounterHudFace = function(npc){
	var hudEncounterFace = $gameVariables.value(chronoFaceVariable)
	if(hudEncounterFace[npc] == 0){
		hudEncounterFace[npc] = 20
		$gameVariables.setValue(chronoFaceVariable,hudEncounterFace) ;
		return true;
	}else{
		this._hudEncounterFace[npc]--;
		$gameVariables.setValue(chronoFaceVariable,hudEncounterFace) ;
		return false;
	};
};
//######################################################################
// HUD TEAM
//######################################################################
SimCraftHud.prototype.hudTeam = function(){
	if(affichageSimpleActive){
		return;
	}else{
		for (npc=1; npc>$gameParty.size(); npc++){
			var xFace = npc * 50 - 45;
			var yFace = 560;
			var face_name = this.partyMemberNickname(npc+1);
			var faceIndex = this.getIndexFace(npc);
			//draw
			this.drawFace('fond', tribu, xFace, yFace);
			this.drawFace(face_name, faceIndex, xFace, yFace);
			this.changeTextColor(this.textColor(0));
			this.drawText(this.partyMemberName(npc+1), xFace-5,  yFace,50,'center');
			
			//NOBILITY
			if(nobilityActive){
				var _npc = $gameParty.members()[npc].currentClass();
				this.drawRelationPicture(_npc,5, 48);
				this.changeTextColor(this.textColor(1));
				this.drawText(_npc, xFace,  yFace+40,50,'left');
			};
		
		};
	};
};
//######################################################################
// GAUGE SANTE
//######################################################################
SimCraftHud.prototype.hudSante = function(){
	var _xJauge = 132;
	var _yJauge = 19;
	var _yFill = _yJauge + 9;
	var _xFill = _xJauge +29;
	var _yValeur = yJauge - 3;
	var _xJauge2 = _xFill  + staminaIndex - breathlessness;
	
	if(affichageSimpleActive){
		if(staminaIndex>50){
			var _staminaIndexSimple = 0;
		}else if(staminaIndex>25){
			var _staminaIndexSimple = 1;
		}else{
			var _staminaIndexSimple = 2;
		};
		if(dietIndex>50){
			var _dietIndexSimple = 3;
		}else if(dietIndex>25){
			var _dietIndexSimple = 4;
		}else{
			var _dietIndexSimple = 5;
		};
		if(hygieneIndex>50){
			var _hygieneIndexSimple = 6;
		}else if(hygieneIndex>25){
			var _hygieneIndexSimple = 7;
		}else{
			var _hygieneIndexSimple = 8;
		};
		this.drawIconSante(_staminaIndexSimple,_xJauge,_yJauge);
		this.drawIconSante(_dietIndexSimple,_xJauge,_yJauge+30);
		this.drawIconSante(_hygieneIndexSimple,_xJauge,_yJauge+60);
	}else{
		var bitmap = this.loadBitmap('img/system/sim/','BGsante',hue,true);
		this.contents.blt(bitmap, 0, 0, bitmap._canvas.width, bitmap._canvas.height, _xJauge, _yJauge);
		this.contents.gradientFillRect(_xFill, _yFill, staminaIndex, 3, this.hpColor(actor), this.textColor(3));
		this.drawText('Stamina', _xFill + 15, _yValeur, 100);
		this.drawText(staminaResidual, _xJauge + 80, _yValeur, 100);
		this.contents.gradientFillRect(_xFill+131, _yFill, dietIndex, 3, this.hpColor(actor), this.textColor(4));
		this.drawText('Diet', _xFill + 146, _yValeur, 100);
		this.drawText(dietActu, _xJauge + 240, _yValeur, 100);
		this.contents.gradientFillRect(_xFill+291, _yFill, hygieneIndex, 3, this.hpColor(actor), this.textColor(5));
		this.drawText('Hygiene', _xFill + 371, _yValeur, 100);
		this.drawText(hygieneActu, _xJauge + 240, _yValeur, 100);
	};
	if(breathHudActive){
		this.contents.gradientFillRect(_xJauge2, _yFill, breathlessness, 3, this.textColor(6), this.textColor(7));
	};
};
SimCraftHud.prototype.drawIconSante = function(index,x,y){
	width = 29;
	height = 23;
	var bitmap = this.loadBitmap( 'img/system/sim/','santeSimple',hue,true);
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
//######################################################################
// HUD PS
//######################################################################
SimCraftHud.prototype.hudPS = function(){
	if(affichageSimpleActive){
		this.drawPsHud(indexPS,false);
	}else{
		var _psText = psResidualAtk + '/' + psResidualDef;
		this.drawPsHud(indexPS,false);
		this.drawPsHud(1, false);
		this.drawText(_psText, 90, 19, 20, 'center');
	}
	this.drawPsHud(indexPS,false); 
}
SimCraftHud.prototype.drawPsHud = function(index, displayNull) {
	if(index == 0 && !displayNull){
		return;
	}else{
		width = 65;
		height = 46;
		var bitmap = this.loadBitmap( 'img/system/sim/','HudTP',hue,true);
		var pw = width;
		var ph = height;
		var sw = Math.min(width, pw);
		var sh = Math.min(height, ph);
		var dx = Math.floor(53 + Math.max(width - pw, 0) / 4);
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
	if(affichageSimpleActive){
		
	}else{
		if($gameParty.lenght() > 1){
			for (npc=1; npc>$gameParty.lenght(); npc++){
				var _npc = $gameParty.members()[npc];
				var _xJaugeNpc = npc * 50 - 45;
				var yJaugeNpc = 538;
				if(_npc.hp > 50){
					var _staminaIndexNpc = 0;
				}else if(_npc.hp > 25){
					var _staminaIndexNpc = 1;
				}else{
					var _staminaIndexNpc = 2;
				};
				if(_npc.mp > 50){
					var _dietIndexNpc = 3;
				}else if(_npc.mp > 25){
					var _dietIndexNpc = 4;
				}else{
					var _dietIndexNpc = 5;
				};
				if(hygieneIndexNpc[npc] > 50){
					var _hygieneNpc = 6;
				}else if(hygieneNpc[npc] > 25){
					var _hygieneIndexNpc = 7;
				}else{
					var _hygieneIndexNpc = 8;
				};
				this.drawIconSante(_staminaIndexNpc,_xJaugeNpc,_yJaugeNpc);
				this.drawIconSante(_dietIndexNpc,_xJaugeNpc+30,_yJaugeNpc);
				this.drawIconSante(_hygieneIndexNpc,_xJaugeNpc+60,_yJaugeNpc);
			};
		};
	};
};
//######################################################################
// HUD EQUIPS
//######################################################################
SimCraftHud.prototype.hudEquip = function(){
	if(affichageSimpleActive){
		
	}else{
		this.drawEquipHud(0,5,70);
		this.drawIcon(actorCible.equips()[0].iconIndex, 35,71);
		this.drawIcon(actorCible.equips()[1].iconIndex, 35,102);
		if(hudEquipCursorActive){
			this.hudEquipCursor();
		};
	};
};
SimCraftHud.prototype.drawEquipHud = function(index,x,y){
	width = 70;
	height = 66;
	var bitmap = this.loadBitmap( 'img/system/sim/','HudEquip',hue,true);
	var pw = width;
	var ph = height;
	var sw = Math.min(width, pw);
	var sh = Math.min(height, ph);
	var dx = Math.floor(x + Math.max(width - pw, 0) / 4);
	var dy = height;
	var sx = index % 4 * pw + (pw - sw) / 4;
	var sy = 0;
	this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
};
SimCraftHud.prototype.hudEquipCursor = function(){
	var xCursor = 35 * indexCursorX +35;
	var yCursor = 33 * indexCursorY + 71;
	this.drawRelationPicture('cursor', xCursor, yCursor);
};
//######################################################################
// HUD LVL
//######################################################################
SimCraftHud.prototype.hudLvl = function(){
	this.drawIcon(155, 38, 32);
	this.drawText(actorCible.level, 42, 35, 12, 'center');
};
//######################################################################
// NPC FACE RELATION
//######################################################################
SimCraftHud.prototype.hudNpcFace = function(){
	//settings
	var xFace = 725;
	var yFace = 5;
    var face_nm = $gameActor()[speaker]._name;
	var faceIndex = this.get_self_variable("humeur",npc,1)||0;
	var tribuNpc = $gameActor()[speaker]._nickname;

	//draw
	this.drawFace('fond', tribuNpc, xFace, yFace);
	this.drawFace(face_nm, faceIndex, xFace, yFace);
	this.changeTextColor(this.textColor(0));
	this.drawText($gameActor()[speaker].name, xFace-5,  yFace-5,50,'center');
		
	//NOBILITY
	if(nobilityActive){
		this.drawRelationPicture($gameActor()[speaker].currentClass(),xFace, yFace+32);
		this.changeTextColor(this.textColor(11));
		this.drawText($gameActor()[speaker].currentClass(), xFace,  yFace+40,50,'left');
	};
};
//######################################################################
// HUD MESSAGE
//######################################################################
SimCraftHud.prototype.hudMessage = function(bgId, message){
	_hLVL = hudLvlActive;
	_hTM = hudTeamActive;
	_hSA = hudSanteActive;
	_EQP = hudEquipActive;
	_hSNPC = hudSanteNpcActive;
	hudLvlActive = false;
	hudTeamActive = false;
	hudSanteActive = false;
	hudEquipActive = false;
	hudSanteNpcActive = false;
	hudNpcFace = true;
	this.drawMessage(bgId, 37, 8);
	this.drawTextEx(message, 98, 15);
	this.countMessage = 30;
	while(!endMessage){
		if(this.waitCountMessage() && this.isTriggered()){
			hudMessageActive = false;
			hudNpcFace = false;
			hudLvlActive = _hLVL;
			hudTeamActive = _hTM;
			hudSanteActive = _hSA;
			hudEquipActive = _EQP
			hudSanteNpcActive = _hSNPC;
		}
	}
};
SimCraftHud.prototype.waitCountMessage = function() {
    if (this._waitCount > 0) {
        this._waitCount--;
        return false;
    } else {
        return true;
    }
}
SimCraftHud.prototype.isTriggered = function() {
    return (Input.isRepeated('ok') || Input.isRepeated('cancel') ||
            TouchInput.isRepeated());
};
//######################################################################
// HUD CHARISME
//######################################################################
SimCraftHud.prototype.hudCharisma = function(){
	this.drawCharisma(0,true);
	this.drawCharisma(convivialité,false);
	this.drawCharisma(bravoure + 4,false);
	this.drawCharisma(noblesse + 8,false);
	if(charismaCursorActive){
		this.drawCharisma(indexCursorCharisma + 13,false);
	};
};
SimCraftHud.prototype.drawCharisma = function(index, displayNull){
	if(index == 0 && !displayNull){
		return;
	}else{
		width = 79;
		height = 61;
		var bitmap = this.loadBitmap('img/system/relation/jauge/','Hudcharisme',hue,true);
		var pw = 79;
		var ph = 61;
		var sw = Math.min(width, pw);
		var sh = Math.min(height, ph);
		var dx = Math.floor(5 + Math.max(width - pw, 0) / 4);
		var dy = Math.floor(75 + Math.max(height - ph, 0) / 4);
		var sx = index % 4 * pw + (pw - sw) / 4;
		var sy = Math.floor(index / 4) * ph + (ph - sh) / 4;
		this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
	};
};
//######################################################################
// HUD RELATION
//######################################################################
SimCraftHud.prototype.hudRelation = function(){
	//positionnement
	var xJaugeRelation = 605;
	var yJaugeRelation = 100;
	var ycase1 = yJaugeRelation;
	var ycase2 = ycase1 +24;
	var ycase3 = ycase2 +24;
	var ycase4 = ycase3 +24;
	var ycase5 = ycase4 +24;
	var ycase6 = ycase5 +24;
	var xIconInteraction = xJaugeRelation + 27;
	var xCursor = this.indexRelationCursorX * 30 - 1 + xIconInteraction;
	if(relationCursorActive && sexeOpposee){
		this.indexRelationCursorX = this.indexRelationCursorX || 0;
		this.indexRelationCursorY = this.indexRelationCursorY || 0;
		var yCursor = this.indexRelationCursorY *24 + yJaugeRelation;
		var yIconInteraction = yCursor + 1;
		if(this.indexRelationCursorY ==0){
			var yAmour = ycase2;
		}else{
			var yAmour = ycase1;
		};
		if(this.indexRelationCursorY <= 1){
			var yColere = ycase3;
		}else{
			var yColere = ycase2;
		};
		if(this.indexRelationCursorY <= 2){
			var yEntente = ycase4;
		}else{
			var yEntente = ycase3;
		};
		if(this.indexRelationCursorY <= 3){
			var yRespect = ycase5;
		}else{
			var yRespect = ycase4;
		};
		var yConfiance = ycase6;
	}else if(relationCursorActive){
		this.indexRelationCursorX = this.indexRelationCursorX || 0;
		this.indexRelationCursorY = this.indexRelationCursorY || 1;
		var yCursor = (this.indexRelationCursorY-1) *24 + yJaugeRelation;
		var yIconInteraction = yCursor + 1;
		if(this.indexRelationCursorY <= 1){
			var yColere = ycase2;
		}else{
			var yColere = ycase1;
		};
		if(this.indexRelationCursorY <= 2){
			var yEntente = ycase3;
		}else{
			var yEntente = ycase2;
		};
		if(this.indexRelationCursorY <= 3){
			var yRespect = ycase4;
		}else{
			var yRespect = ycase3;
		};
		var yConfiance = ycase5
	}else if(sexeOppose){
		this.indexRelationCursorX = this.indexRelationCursorX || 0;
		this.indexRelationCursorY = this.indexRelationCursorY || 0;
		var yCursor = this.indexRelationCursorY *24 + yJaugeRelation;
		var yIconInteraction = yCursor + 1;
		var yAmour = ycase1;
		var yColere = ycase2;
		var yEntente = ycase3;
		var yRespect = ycase4;
		var yConfiance = ycase5;
	}else{
		this.indexRelationCursorX = this.indexRelationCursorX || 0;
		this.indexRelationCursorY = this.indexRelationCursorY || 1;
		var yCursor = (this.indexRelationCursorY-1) *24 + yJaugeRelation;
		var yIconInteraction = yCursor + 1;
		var yColere = ycase1;
		var yEntente = ycase2;
		var yRespect = ycase3;
		var yConfiance = ycase4;
	}
	//display
	if (sexeOppose){
		this.drawRelationGauge(amourValue,xJaugeRelation,yAmour);
	};
	this.drawRelationGauge(colereValue,xJaugeRelation,yColere);
	this.drawRelationGauge(ententeValue,xJaugeRelation,yEntente);
	this.drawRelationGauge(respectValue,xJaugeRelation,yRespect);
	this.drawRelationGauge(confianceValue,xJaugeRelation,yConfiance);
	if(relationCursorActive){
		this.drawRelationPicture('cursor',xCursor, yCursor);
	}
};
//######################################################################
// HUD TIME
//######################################################################
SimCraftHud.prototype.hudTime = function(){
	if($gameSwitches.value(daterSwitch) && !affichageSimpleActive){
		this.drawTimeHud('HudDate', fondTime, 495, 540, 233, 34);
		var textDate = this.getDateText(1);
		var textDate2 = this.getDateText(2);
		var textDate3 = this.getDateText(3);
		this.drawText(textDate, 532, 542, 240, 'center');
		this.drawText(textDate2, 532, 556, 240, 'center');
		this.drawText(textDate3, 532, 570, 240, 'center');
		var yHorloge = 480;
	}else{
		var yHorloge = 610;
	}
	var horlogeTime = calendrier[0] || 9;
	if(horlogeTime > 11){
		horlogeTime -=12
	}
	this.drawHorloge(fondTime, 710, yHorloge);
	this.drawHorloge(horlogeTime, 710, yHorloge);	
};
SimCraftHud.prototype.drawHorloge = function(fileIndex, x, y) {
	var name = 'Horloge'
    width = 64;
    height = 64;
    var bitmap = this.loadBitmap('Horloge','img/system/sim/',hue,true);
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
SimCraftHud.prototype.drawTimeHud = function(name, fileIndex, x, y, width, height) {
    width = 284;
    height = 64;
    var bitmap = this.loadBitmap('img/system/sim/',name, hue,true);
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
SimCraftHud.prototype.getFormeDate = function(number){
	if (number == 1){
		return 'st';
	} else if(number == 2){
		return 'nd';
	} else if(number == 3){
		return 'rd';
	} else {
		return 'th';
	};
}
SimCraftHud.prototype.getMonthName = function(mois){
	if (mois == 1){
		return 'Yuye';
	} else if (mois == 2){
		return 'Thut';
	} else if (mois == 3){
		return 'Setemba';
	} else if (mois == 4){
		return 'Otemba';
	} else if (mois == 5){
		return 'Novemba';
	} else if (mois == 6){
		return 'Desamba';
	} else if (mois == 7){
		return 'Yavye';
	} else if (mois == 8){
		return 'Farye';
	} else if (mois == 9){
		return 'Machi';
	} else if (mois == 10){
		return 'Apili';
	} if (mois == 11){
		return 'Mei';
	} else{
		return 'Juni';
	};
};
SimCraftHud.prototype.getSaisonName = function (saison){
	if (saison == 1){
		return 'Mvua (rainy ';
	} else if(saison = 2){
		return 'Kati (wet ';
	} else {
		return 'Ukame (dry ';
	};
}
SimCraftHud.prototype.getDateText = function (ligne) {
	//calendrier = [heure,jour,decade,moisSaison,saison,annee,moisAnnee]
	if(calendrier == 0){
		calendrier = [1,1,1,1,1,1,1];
	};
	
	// Recuperation du jour
	var heureactu = calendrier[0];
	var jour = calendrier[1];
	var formeJour = this.getFormeDate(jour);
	var decade = calendrier[2];
	var formeJour = this.getFormeDate(decade);
	var moisSaison = calendrier[3];
	var formeMois = this.getFormeDate(moisSaison);
	var mois = calendrier[6];
	var moisName = this.getMonthName(mois);
	var saison = calendrier[4];
	var saisonName = this.getSaisonName(saison);

	
	var heureactu = $gameVariables.value(52);
	
	if (ligne == 1){
		var _dateText = ('Today is the ' + jour + formeJour + ' day of the ' + decade + formeDecade + ' decade of ' + moisName + ' month,' );
	} else if (ligne == 2){
		var _dateText = ('the ' + moisSaison + formeMois + ' month of ' + saison + ' saison)' );
	}else {
		var _dateText = ('It is ' + heureactu + ' o\'clock');
	}
	return _dateText;
	
}

/*-----------------------------------------------------------------------------

      ####     ##    ##      ####   ##  ##  ##
     ##  ##   ####   ##     ##  ##  ##  ##  ##      
     ##      ##  ##  ##     ##      ##  ##  ##     
     ##  ##  ######  ##     ##  ##  ##  ##  ##        
      ####   ##  ##  #####   ####    ####   ###### 
 
 ------------------------------------------------------------------------------*/
SimCraftHud.prototype.actionHeureImpact = function(){
	$gameSwitches.setValue(heurePasseSwitch, true);
	var _dateAct = $gameSwitches.value(daterSwitch);
	$gameSwitches.setValue(daterSwitch, true);
	this.encounterTimeDisplay = 140;
	if(this.endDisplayTime()){
		$gameSwitches.setValue(daterSwitch, _dateAct);
	};
};
SimCraftHud.prototype.endDisplayTime = function(){
	if(this.encounterTimeDisplay > 0){
		this.encounterTimeDisplay--;
		return false;
	}else{
		return true;
	};	
};
SimCraftHud.prototype.actionFrameImpact = function(){
	$gameSwitches.setValue(framePasseSwitch, true);
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
	this.createBasicHUD();
};

Scene_Map.prototype.createBasicHUD = function() {
    this._SimCraftHud = new SimCraftHud();
    this._SimCraftHud.opacity = 0;
    this.addWindow(this._SimCraftHud);
};
 
var clone_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    clone_map_update.call(this);
	this._SimCraftHud.refresh();


};

