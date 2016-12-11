/*
//      ##################   ###########    ###########################
//     #################  #################  #########################
//    #######            ######       ######  #######
//   #######            #######        ######  #######
//  #######              ########       ######   ######                   ##########     ########       ######  ######      #########
//  ######                  ########              #######               ##              ##      ##     ##     ####   ##    ##       ##
// ##########################  ########  ######### #######  ##########  ##     #####   ############   ##      ##      ##    ####        #########
// ###########################  #########  ########  ######  #########  ##        ##  ##          ##  ##      ##      ##   ##       ##  #########
//########                         #########          #######              ########   ##          ##  ##              ##    #########
// #######              #######      ########           #######                                                       
//  #######              #######      #######             ######
//   #######              #######     #######              #######
//    ###################  #################  ######################                            WWW.ESZ-GAME.ORG
//     ###################  ##############  #########################
//      ###################    #########  ############################
*/	  
/*:	  
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
*@plugindesc v0.4 - Allow the first part of the SimCraftSystem : allow the simlife aspect. See the help to know more about!
*
* @param Action_Variable
* @desc ID of the action game variable. It define the auto-actions in action mode. See the help .
* @default 1
*
* @param Stamina_Actu_Variable
* @desc It is the actual Stamina value variable ID.
* @default 2
*
* @param Stamina_Max_Variable
* @desc stamina max variable ID
* @default 3
*
* @param Breathlessness_Variable
* @desc Shortness of breath variable ID. See help for more information.
* @default 4
*
* @param Diet_Actu_Variable
* @desc Actual Diet variable ID
* @default 5
*
* @param Diet_Max_Variable
* @desc Diet max variable ID
* @default 6
*
* @param Hygiene_Actu_Variable
* @desc Actual hygiene variable ID
* @default 7
*
* @param Hygiene_Max_Variable
* @desc Hygiene max variable ID
* @default 8
*
* @param Physical_Skill
* @desc See help.
* @default 9
*
* @param PS_Init_Variable
* @desc See help.
* @default 9
*
* @param Bed_Comfort_Variable
* @desc ID of the game variable to set stamina increase speed before action in action mode. See help.
* @default 10
*
* @param Food_Value_Variable
* @desc ID of the game variable to set diet increase speed before action in action mode. See help.
* @default 11
*
* @param Washing_Value_Variable
* @desc ID of the game variable to set hygiene increase speed before action in action mode. See help.
* @default 12
*
* @param System_on_switch
* @desc Set the ID of a game switch to start the system. See help before.
* @default 1
*
* @param Visibility_hud_switch
* @desc Set the ID of a game switch to set visibility or not. Important for messages.
* @default 2
*
* @param Compatibility_Visual_equipement
* @desc To use with visual equipement plugin of Hime in the Action Mode. See help
* @default true
*
* @param Compatibility_Self_Variable
* @desc It still work with my next plugin with de NPC AI. It useless for the moment;
* @default false
*
* @param Npc
* @desc Don't use! It still buggy. It will work with my next plugin with de NPC AI. Set false.
* @default false
*
*@help 
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
*/

//ID des $gameVariables
var parameters = PluginManager.parameters('Esz_Simcraft_Sim');
var staminaActuVariable = Number(parameters['Stamina_Actu_Variable'] || '2');
var staminaMaxVariable = Number(parameters['Stamina_Max_Variable'] || '3');
var breathlessnessVariable = Number(parameters['Breathlessness_Variable'] || '4');
var dietActuVariable = Number(parameters['Diet_Actu_Variable'] || '5');
var dietMaxVariable = Number(parameters['Diet_Max_Variable'] || '6');
var hygieneActuVariable = Number(parameters['Hygiene_Actu_Variable'] || '7');
var hygieneMaxVariable = Number(parameters['Hygiene_Max_Variable'] || '8');
var psInitVariable = Number(parameters['PS_Init_Variable'] || '9');
var confortLitVariable = Number(parameters['Bed_Comfort_Variable'] || '10');
var nutritifVariable = Number(parameters['Food_Value_Variable'] || '11');
var nettoieVariable = Number(parameters['Washing_Value_Variable'] || '12');
var actionVariable = Number(parameters['Action_Variable'] || '1');
var systemOnSwitch = Number(parameters['System_on_switch'] || '1');
var visibilitySwitch = Number(parameters['Visibility_hud_switch'] || '2');
var npcSwitch = parameters['Npc'] || false;
var visualEquipementCompatibility = parameters['Compatibility_Visual_equipement'] || true;
var selfVariableCompatibility = parameters['Compatibility_Self_Variable'] || true;
var actionMode = parameters['Action_Mode'] || true;
var usePs = parameters['Physical_Skill'] || true;

 //inititialisations
function SimCraft() {
    this.initialize.apply(this, arguments);
}
Simcraft.prototype.initialize = function() {
    this.initSimCraftData();
};
Simcraft.prototype.initSimCraftData = function(){
	for(npc = 0; npc >this.getNombreNpc(),npc++){
		if($gameSwitches.value(systemOnSwitch) && npc == 0){
			this.setStamina(npc,1);
			this.setDiet(npc,1);
			this.setHygiene(npc,1);
			$gameVariables.setValue(staminaMaxVariable,1);
			$gameVariables.setValue(dietMaxVariable,1);
			$gameVariables.setValue(hygieneMaxVariable,1);
			this.setStamina(npc,this.getStaminaActu(npc));
			this.setDiet(npc,this.getDietActu(npc));
			this.setHygiene(npc,this.getHygieneActu(npc));
			this.setBreathlessness(npc,this.getBreathlessness(npc));
			this.psInit[npc]= this.psInit[npc]||1;
			this.setActionValue(npc,this.getActionValue);
		}else if($gameSwitches.value(systemOnSwitch)){
			this.staminaMax[npc] = this.staminaMax[npc]||1;
			this.dietMax[npc] = this.dietMax[npc]||1;
			this.hygieneMax[npc] = this.hygieneMax[npc]||1;
			this.setStamina(npc,this.getStaminaActu(npc));
			this.setDiet(npc,this.getDietActu(npc));
			this.setHygiene(npc,this.getHygieneActu(npc));
			this.setBreathlessness(npc,this.getBreathlessness(npc));
			this.psInit[npc]= this.psInit[npc]||1;
			this.setActionValue(npc,this.getActionValue);
		}

	};
	this.calendrier = [9,5,3,2,3,450];
	this.setAccelerationTempsVirtuel(false);
};


/*-----------------------------------------------------------------------------

      ####     ##    ##      ####   ##  ##  ##
     ##  ##   ####   ##     ##  ##  ##  ##  ##      
     ##      ##  ##  ##     ##      ##  ##  ##      
     ##  ##  ######  ##     ##  ##  ##  ##  ##        
      ####   ##  ##  #####   ####    ####   ###### 
 
 ------------------------------------------------------------------------------*/
//Recuperation System data
SimCraft.staminaMax = [$gameVariables.value(staminaMaxVariable),100];
SimCraft.hygieneMax = [$gameVariables.value(hygieneMaxVariable),100];
SimCraft.dietMax = [$gameVariables.value(dietMaxVariable),100];
SimCraft.PsInit = [$gameVariables.value(PsInitVariable),100];
SimCraft.prototype.getNombreNpc = function(){
	if($gameSwitches.value(npcSwitch)){
		return 23;
	}else{
		return 0;
	}
	
}
SimCraft.prototype.getDureeAction = function(IDarme){
	return 2;
};
SimCraft.prototype.getArmeID = function(npc){
	
}
//Recuperation SimStats
SimCraft.prototype.getStaminaActu = function(npc){
	if(npc == 0){
		return $gameVariables.value(staminaActuVariable);
	}else{
		return this.get_self_variable("staminaActu",npc,1) || this.staminaMax[npc];
	};
};
SimCraft.prototype.getIndexStamina = function(npc){
	return this.getStaminaActu(npc)*100/this.staminaMax[npc];
};
SimCraft.prototype.getDietActu = function(npc){
	if(npc == 0){
		return $gameVariables.value(dietActuVariable)
	}else{
		return this.get_self_variable("dietActu",npc,1) || this.dietMax[npc];
	};
};
SimCraft.prototype.getIndexDiet = function(npc){
	return this.getDietActu(npc)*100/this.dietMax[npc];
};
SimCraft.prototype.getHygieneActu = function(npc){
	if(npc == 0){
		return $gameVariables.value(hygieneActuVariable);
	}else{
		return this.get_self_variable("hygieneActu",npc,1) || this.hygieneMax[npc];
	};
};
SimCraft.prototype.getIndexHygiene = function(npc){
	return this.getHygieneActu(npc)*100/this.hygieneMax[npc];
};
SimCraft.prototype.getBreathlessness = function(npc){
	if(npc == 0){
		return $gameVariables.value(breathlessnessVariable);
	}else{
		return this.get_self_variable("breathlessness",npc,1) || 0;
	};
};
SimCraft.prototype.getStaminaResiduel = function(npc){
	return this.getStaminaActu(npc)-this.getBreathlessness(npc);
};
SimCraft.prototype.getPsActu = function(npc){
	var _actuPS = (this.getStaminaActu(npc) + this.getDietActu(npc))/18 + this.psInit[npc];
	return _actuPS;
};
SimCraft.prototype.getPsMax = function(npc){
	var _maxPS = (this.staminaMax[npc] + this.DietMax[npc])/18 + this.psInit[npc];
	return _maxPS;
};
SimCraft.prototype.getIndexPS = function(npc){
	return this.getPsActu(npc)*10/this.getPsMax(npc);
}
// Recuperations taux de modification
SimCraftraft.prototype.getTauxRecuperationSommeil = function(npc){
	if(npc == 0){
		return $gameVariables.value(confortLitVariable);
	}else{
		return 10;
	};
};
SimCraft.prototype.getTauxRecuperationAppetit = function(npc){
	if(npc == 0){
		return $gameVariables.value(nutritifVariable);
	}else{
		return 10;
	};
};
SimCraft.prototype.getTauxRecuperationHygiene = function(npc){
	if(npc == 0){
		return $gameVariables.value(nettoieVariable);
	}else{
		return 10;
	};
};
SimCraft.prototype.getRecuperationSouffle = function(npc){
	return this.getStaminaActu(npc)/40;
};
SimCraft.prototype.getPerteSouffle = function(npc){
	return 8 -(this.getStaminaActu(npc)/40);
};
// Recuperations etats et positions
SimCraft.prototype.estEssoufle =function(npc){
	if(this.getBreathlessness(npc)>= this.getIndexStamina(npc)){
		if(npc == 0){
			$gameVariables.setValue(actionVariable, 14);
		}else{
			this.get_self_variable("action",14,npc,1) 
		};
		return true;
	}else{
		return false;
	}
}
Simcraft.prototype.estMort = function(npc){
	if( this.getStaminaActu(npc) <= 0 && this.getDietActu(npc) <= 0){
		return true;
	}else{
		return false;
	}
}
SimCraft.prototype.getActionValue = function(npc){
	if(npc == 0){
		return $gameVariables.value(actionVariable);
	}else{
		this.get_self_variable("action",npc,1) || 0;
	};
}
//Modifications Relations Stats
SimCraft.prototype.setStamina(npc, value){
		if(npc == 0){
		$gameVariables.setValue(staminaActuVariable, value);
	}else{
		this.set_self_variable("staminaActu", value, npc,1);
	};
};
SimCraft.prototype.setDiet(npc, value){
		if(npc == 0){
		$gameVariables.setValue(dietActuVariable, value);
	}else{
		this.set_self_variable("dietActu", value, npc,1);
	};
};
SimCraft.prototype.setHygiene(npc, value){
		if(npc == 0){
		$gameVariables.setValue(hygieneActuVariable, value);
	}else{
		this.set_self_variable("hygieneActu", value, npc,1);
	};
};
SimCraft.prototype.setBreathlessness = function(npc,value){
	if(npc == 0){
		$gameVariables.setValue(breathlessnessVariable,value);
	}else{
		this.set_self_variable("breathlessness",value,npc,1);
	};
};
SimCraft.prototype.setActionValue = function(npc,value){
	if(npc == 0){
		return $gameVariables.setValue(actionVariable,value);
	}else{
		this.set_self_variable("action", value, npc,1);
	};
}
//Modifs de recuperation / perte
SimCraft.prototype.setRecuperationSommeil = function(npc){
	var _staminaNew = this.getStaminaActu(npc)+this.getTauxRecuperationSommeil(npc);
	if(_staminaNew < this.staminaMax[npc]){
		this.setStamina(npc,_staminaNew);
	}else{
		this.setStamina(npc,this.staminaMax[npc]);
		this.setActionValue(npc,15);
	};
};
SimCraft.prototype.setRecuperationHygiene = function(npc){
	var _hygieneNew = this.getHygieneActu(npc)+this.getTauxRecuperationHygiene(npc);
	if(_hygieneNew < this.hygieneMax[npc]){
		this.setHygiene(npc,_hygieneNew);
	}else{
		this.setHygiene(npc,this.staminaMax[npc]);
		this.setActionSimcraft(npc,0);
	};
};
SimCraft.prototype.setRecuperationFaim = function(npc){
	var _dietNew = this.getDietActu(npc)+this.getTauxRecuperationAppetit(npc);
	if(_dietNew < this.dietMax[npc]){
		this.setDiet(npc,_dietNew);
	}else{
		this.setDiet(npc,this.dietMax[npc]);
		this.setActionSimcraft(npc,0);
	};
};
SimCraft.prototype.setRecuperationSouffle = function(npc){
	if(this.getBreathlessness(npc) > 0){
		var _breathlessnessNew = this.getBreathlessness(npc) - this.getRecuperationSouffle(npc);
		if(_breathlessnessNew > 0){
			this.setBreathlessness(npc,_breathlessnessNew);
		}else{
			this.setBreathlessness(npc,0);
			this.setAction(npc,0);
		};
	};
};
SimCraft.prototype.setPerteSouffle = function(npc){
	var _essouflementNew = this.getBreathlessness(npc)+this.getPerteSouffle(npc);
	if(_breathlessnessNew<this.getStaminaIndex){
		this.setBreathlessness(npc,_breathlessnessNew);
	}else{
		this.setAction(npc,14);
	};
};
SimCraft.prototype.setFaim = function(npc){
	if(this.getDiet(npc) > 25){
		this.setDiet(npc, this.getDiet()-25);
	}
};
SimCraft.prototype.setFatigue = function(npc){
	
};
SimCraft.prototype.setSalete = function(npc){
	
};
// Elements graphiques
SimCraft.prototype.refreshPoseSimcraft = function(npc){
	if(visualEquipement){
		this.poseSimcraft[npc] = this.poseSimcraft[npc] || 'null';
		if(this.poseSimcraft[npc] != this.newPoseSimcraft[npc]){
			if (npc == 0){
				if(this.newPoseSimcraft == 'normal'){
					$gameSystem.setPose(npc+1);
				}else{
					$gameSystem.setPose(npc+1,this.newPoseSimcraft[npc]);
				};
			}else{
				this.set_self_variable("pose",this.newPoseSimcraft,npc,1);
			}
			this.newPoseSimcraft[npc] = this.poseSimcraft[npc];
		};
	};
};
SimCraft.prototype.drawPsHud = function(index, afficherZero){
	if(index > 0 || afficherZero){
		var name = 'HudTP'
		var width = 65;
		var height = 46;
		var y = 53;
		var x = 0;
		var bitmap = ImageManager.loadBitmap('img/sim/', name, hue, true);
		var pw = 65;
		var ph = 46;
		var sw = Math.min(width, pw);
		var sh = Math.min(height, ph);
		var dx = Math.floor(x + Math.max(width - pw, 0) / 4);
		var dy = Math.floor(y + Math.max(height - ph, 0) / 4);
		var sx = index % 4 * pw + (pw - sw) / 4;
		var sy = Math.floor(index / 4) * ph + (ph - sh) / 4;
		this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
	};
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
//Gestion du Chrono
SimCraft.prototype.framePasse = function(){
	this.chrono = this.chrono || 0;
	if (this._chrono > 0) {
        this._chrono--;
        return false;
    }else{
		this.chrono == 18;
		return true;
	}; 
};
//Gestion du timer
SimCraft.prototype.refreshSimcraft = function(){
	if(this.framePasse()){
		for(npc = 0, npc > this.nombreNpc, npc++){
			this.refreshActionValue(npc);
			this.oldAction[npc] = this.getActionValue(npc);
			this.refreshPoseSimcraft(npc);
		};
		this.timer = this.timer || 0;
		if(this.timer > this.timerParHeure){
			this.setHeurePasse();
			for(npc = 0, npc > this.nombreNpc, npc++){
				this.actionHeureImpact(npc);
			};
			
			this.timer = 0;
		}else{
			this.timer++;
		};
	};
};
//Gestion du temps virtuel
SimCraft.prototype.setAccelerationTempsVirtuel = function(value){
	if(value){
		this.timerParHeure = 10;
	}else{
		this.timerParHeure = 120;
	}
}
SimCraft.prototype.calendrier = function(npc){
	//this.calendrier = [heure,jour,decade,moisSaison,saison,annee,moisAnnee]
	this.calendrier[0]++;
	if(this.calendrier[0]>=24){
		this.calendrier[1]++;
		this.calendrier[0] = 0;
		if(this.calendrier[1]>=11){
			this.calendrier[2]++
			this.calendrier[1] = 1;
			if(this.calendrier[2]>=4){
				this.calendrier[3]++;
				this.calendrier[2] = 1;
				if(this.calendrier[3]>=5){
					this.calendrier[4]++;
					this.calendrier[3] = 1;
					if(this.calendrier[4]>=4){
						this.calendrier[5]++;
						this.calendrier[4] = 1;
					};
				};
			};
			this.calendrier[6] = (this.calendrier[4] - 1)*4 +this.calendrier[3];
		};
	};
};
//Refresh des valeurs
SimCraft.prototype.actionHeureImpact = function(npc){
	if(this.getActionValue(npc) == 2){//dors
		this.setFaim(npc);
		this.setSalete(npc);
		this.setRecuperationSommeil(npc);
	}else if(this.getActionValue(npc) == 3){//mange
		this.setFatigue(npc);
		this.setSalete(npc);
	}else if(this.getActionValue(npc) == 4){//se lave
		this.setFatigue(npc);
		this.setFaim(npc);
	}else if(this.getActionValue(npc) == 8){//relation
		return;
	}else if(this.getActionValue(npc) == 9){//peche
		this.setFatigueAction(npc);
		this.setFaim(npc);
		this.setSalete(npc)
	}else if(this.getActionValue(npc) == 11){//craft
		this.setFatigueAction(npc);
		this.setFaim(npc);
		this.setSalete(npc)
	}else if(this.getActionValue(npc) == 12){//gather
		this.setFatigueAction(npc);
		this.setFaim(npc);
		this.setSalete(npc)
	}else if(this.getActionValue(npc) == 25){//construction Mode
		return;
	}else{//autre
		this.setFatigue(npc);
		this.setFaim(npc);
		this.setSalete(npc)
	};
};
SimCraft.prototype.refreshActionValue = function(npc){
	this.timerAction[npc] = this.timerAction[npc]||0;
	if(this.timerAction[npc] <= 0){
		switch(this.getActionValue(npc)){
			//RIEN
			case 0:
			Scene-Map._waitCount = 0;
			this.newPoseSimcraft[npc] = 'normal';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc]=0;
			break;
			
			//COURS
			case 1:
			this.newPoseSimcraft[npc] = 'run';
			this.timerAction[npc]=0;
			this.setPerteSouffle(npc);
			break;
			
			//DORS
			case 2:
			this.newPoseSimcraft[npc] = 'sleep';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc]++;
			this.setBreathlessness(npc,0);
			break;
			
			//MANGE
			case 3:
			this.newPoseSimcraft[npc] = 'eating';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc]++;
			break;
			
			//SE LAVE
			case 4:
			this.newPoseSimcraft[npc] = 'washing';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc]++;
			break;
			
			//ATTAQUE
			case 5:
			this.newPoseSimcraft[npc] = 'slash';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc] = this.getDureeAction(this.getArmeID(npc));
			break;
			
			//superattaque
			case 6:
			this.newPoseSimcraft[npc] = 'superslash';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc] = this.getDureeAction(this.getArmeID(npc));
			break;
			
			//se defend
			case 7:
			this.newPoseSimcraft[npc] = 'defend';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc] = 0;
			break;
			
			//relation
			case 8:this.newPoseSimcraft[npc] = 'normal';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc]++;
			break;
			
			//Peche
			case 9:
			this.newPoseSimcraft[npc] = 'keep';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc]++;
			break;
			
			//tir
			case 10:
			this.newPoseSimcraft[npc] = 'slash';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc] = this.getDureeAction(this.getArmeID(npc));
			break;
			
			//craft
			case 11:
			this.newPoseSimcraft[npc] = 'keep';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc]++;
			break;
			
			//gather
			case 12:
			this.newPoseSimcraft[npc] = 'slash';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc]++;
			break;
			
			//est frappé
			case 13:
			this.newPoseSimcraft[npc] = 'heat';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc]++;
			break;
			
			// reprends son souffle
			case 14:
			this.newPoseSimcraft[npc] = 'breath';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc]++;
			break; 
			
			//se reveille
			case 15:
			this.newPoseSimcraft[npc] = 'keep';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc] = 1;
			break;
			
			//arrete de manger
			case 16:
			this.newPoseSimcraft[npc] = 'normal';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc] = 1;
			break;
			
			//arrete de se laver
			case 17:
			this.newPoseSimcraft[npc] = 'normal';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc]  = 1;
			break;
			
			//overload
			case 18:
			this.newPoseSimcraft[npc] = 'overload';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc]++;
			break;
			
			//arrete de pecher
			case 19:
			this.newPoseSimcraft[npc] = 'normal';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc]++;
			break;
			
			//arrete de craft
			case 20:
			this.newPoseSimcraft[npc] = 'normal';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc]++;
			break; 
			
			//arrete de gather
			case 21:
			this.newPoseSimcraft[npc] = 'normal';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc]++;
			break;
			
			//inventaire
			case 22:
			this.newPoseSimcraft[npc] = 'normal';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc]++;
			break;
			
			//quitte inventaire
			case 23:
			this.newPoseSimcraft[npc] = 'normal';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc]++;
			break;
			
			//rammasse
			case 24:
			this.newPoseSimcraft[npc] = 'keep';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc] = 1;
			break;
			
			//construction mode
			case 25:
			this.newPoseSimcraft[npc] = 'keep';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc]++;
			break;
			
			//quitte le construction mode
			case 26:
			this.newPoseSimcraft[npc] = 'normal';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc]++;
			break;
			
			//lance un sort
			case 27:
			this.newPoseSimcraft[npc] = 'overload';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc] = this.getTempsLancement(this.getSortID(npc));
			break;
			
			//est etourdit
			case 28:
			this.newPoseSimcraft[npc] = 'breath';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc]++;
			break;
			
			//termine l'attaque
			case 29:
			this.newPoseSimcraft[npc] = 'normal';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc] = this.getDureeRechargement(this.getArmeID(npc));
			break;
			
			//termine la super attaque
			case 30:
			this.newPoseSimcraft[npc] = 'slash';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc] = this.getDureeRechargement(this.getArmeID(npc));
			break;
			
			//mega Attaque
			case 31:
			this.newPoseSimcraft[npc] = 'superslash';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc] = this.getDureeAction(this.getArmeID(npc));
			break;
			
			//termine la mega Attaque
			case 31:
			this.newPoseSimcraft[npc] = 'overload';
			$gamePlayer.setStepAnime(true);
			this.timerAction[npc] = this.getDureeRechargement(this.getArmeID(npc));
			break;
			
			//termine relation
			case 32:
			this.newPoseSimcraft[npc] = 'normal';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc]++;
			break;
			
			//termine le tir
			case 33:
			this.newPoseSimcraft[npc] = 'normal';
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc] = this.getDureeRechargement(this.getArmeID(npc));
			break;
			
			//a faim
			case 34:
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc]++;
			break;
			
			//est sale
			case 35:
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc]++;
			break;
			
			//est fatigué
			case 36:
			$gamePlayer.setStepAnime(false);
			this.timerAction[npc]++;
			break;
			
			default:
			break;
		};
	}else{//REFRESH L'ACTION
		switch(this.getActionValue(npc)){
			//RIEN
			case 0:
			this.timerAction[npc]=0;
			break;
			
			//COURS
			case 1:
			this.timerAction[npc]=0;
			this.setPerteSouffle(npc);
			break;
			
			//DORS
			case 2:
			$gamePlayer.setStepAnime(true);
			Scene-Map._waitCount = 20;
			this.timerAction[npc]++;
			break;
			
			//MANGE
			case 3:
			this.timerAction[npc]++;
			Scene-Map._waitCount = 20;
			this.setRecuperationFaim(npc);
			break;
			
			//SE LAVE
			case 4:
			this.timerAction[npc]++;
			Scene-Map._waitCount = 20;
			this.setRecuperationHygiene(npc);
			break;
			
			//ATTAQUE
			case 5:
			Scene-Map._waitCount = 20;
			break;
			
			//superattaque
			case 6:
			Scene-Map._waitCount = 20;
			break;
			
			//se defend
			case 7:
			this.timerAction[npc]=0;
			Scene-Map._waitCount = 20;
			break;
			
			//relation
			case 8:
			this.timerAction[npc]++;
			Scene-Map._waitCount = 20;
			break;
			
			//Peche
			case 9:
			this.timerAction[npc]++;
			Scene-Map._waitCount = 20;
			break;
			
			//tir
			case 10:
			break;
			
			//craft
			case 11:
			this.timerAction[npc]++;
			Scene-Map._waitCount = 20;
			this.setPerteSouffle(npc);
			break;
			
			//gather
			case 12:
			this.timerAction[npc]++;
			Scene-Map._waitCount = 20;
			this.setPerteSouffle(npc);
			break;
			
			//est frappé
			case 13:
			this.setPerteSouffle(npc);
			Scene-Map._waitCount = 20;
			break;
			
			// reprends son souffle
			case 14:
			this.timerAction[npc]++;
			Scene-Map._waitCount = 20;
			this.setRecuperationSouffle(npc);
			break; 
			
			//se reveille
			case 15:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,0);
			break;
			
			//arrete de manger
			case 16:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,0);
			break;
			
			//arrete de se laver
			case 17:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,0);
			break;
			
			//overload
			case 18:
			Scene-Map._waitCount = 20;
			this.timerAction[npc]++;
			if (this.getBreathlessness(npc)<= 0){
				this.setOverload(npc);
			}else{
				this.setRecuperationSouffle(npc);
			};
			break;
			
			//arrete de pecher
			case 19:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,0);
			break;
			
			//arrete de craft
			case 20:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,0);
			break; 
			
			//arrete de gather
			case 21:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,0);
			break;
			
			//inventaire
			case 22:
			Scene-Map._waitCount = 20;
			this.timerAction[npc]++;
			break;
			
			//quitte inventaire
			case 23:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,0);
			break;
			
			//rammasse
			case 24:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,0);
			break;
			
			//construction mode
			case 25:
			Scene-Map._waitCount = 20;
			this.timerAction[npc]++;
			break;
			
			//quitte le construction mode
			case 26:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,0);
			break;
			
			//lance un sort
			case 27:
			Scene-Map._waitCount = 20;
			this.timerAction[npc]++;
			this.setLanceSort
			break;
			
			//est etourdit
			case 28:
			Scene-Map._waitCount = 20;
			break;
			
			//termine l'attaque
			case 29:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,0);
			break;
			
			//termine la super attaque
			case 30:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,5);
			break;
			
			//mega Attaque
			case 31:
			Scene-Map._waitCount = 20;
			break;
			
			//termine la mega Attaque
			case 31:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,6);
			break;
			
			//termine relation
			case 32:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,0);
			break;
			
			//termine le tir
			case 33:
			Scene-Map._waitCount = 20;
			this.setActionValue(npc,0);
			break;
			
			//a faim
			case 34:
			this.timerAction[npc]++;
			this.setDisplayFaim();
			break;
			
			//est sale
			case 35:
			this.timerAction[npc]++;
			this.setDisplaySale();
			break;
			
			//est fatigué
			case 36:
			this.timerAction[npc]++;
			this.setDisplayFaim();
			break;
			
			default:
			break;
		};
		this.timerAction[npc]--
		if(this.timerAction <= 0){//TERMINE L'ACTION
			switch(this.getActionValue(npc)){
				//RIEN
				case 0:
				break;
				
				//COURS
				case 1:
				break;
				
				//DORS
				case 2:
				break;
				
				//MANGE
				case 3:
				break;
				
				//SE LAVE
				case 4:
				break;
				
				//ATTAQUE
				case 5:
				this.setActionValue(npc,29);
				break;
				
				//superattaque
				case 6:
				this.setActionValue(npc,30);
				break;
				
				//se defend
				case 7:
				break;
				
				//relation
				case 8:
				break;
				
				//Peche
				case 9:
				break;
				
				//tir
				case 10:
				this.setActionValue(npc,33);
				break;
				
				//craft
				case 11:
				break;
				
				//gather
				case 12:
				break;
				
				//est frappé
				case 13:
				this.setActionValue(npc,0);
				break;
				
				// reprends son souffle
				case 14:
				break; 
				
				//se reveille
				case 15:
				this.setActionValue(npc,0);
				break;
				
				//arrete de manger
				case 16:
				this.setActionValue(npc,0);
				break;
				
				//arrete de se laver
				case 17:
				this.setActionValue(npc,0);
				break;
				
				//overload
				case 18:
				break;
				
				//arrete de pecher
				case 19:
				this.setActionValue(npc,0);
				break;
				
				//arrete de craft
				case 20:
				this.setActionValue(npc,0);
				break; 
				
				//arrete de gather
				case 21:
				this.setActionValue(npc,0);
				break;
				
				//inventaire
				case 22:
				break;
				
				//quitte inventaire
				case 23:
				this.setActionValue(npc,0);
				break;
				
				//rammasse
				case 24:
				break;
				
				//construction mode
				case 25:
				break;
				
				//quitte le construction mode
				case 26:
				this.setActionValue(npc,0);
				break;
				
				//lance un sort
				case 27:
				this.setActionValue(npc,0);
				break;
				
				//est etourdit
				case 28:
				this.setActionValue(npc,0);
				break;
				
				//termine l'attaque
				case 29:
				this.setActionValue(npc,0);
				break;
				
				//termine la super attaque
				case 30:
				this.setActionValue(npc,5);
				break;
				
				//mega Attaque
				case 31:
				this.setActionValue(npc,31);
				break;
				
				//termine la mega Attaque
				case 31:
				this.setActionValue(npc,6);
				break;
				
				//termine relation
				case 32:
				this.setActionValue(npc,0);
				break;
				
				//termine le tir
				case 33:
				this.setActionValue(npc,0);
				break;
				
				//a faim
				case 34:
				this.timerAction[npc] = 10;
				break;
				
				//est sale
				case 35:
				this.timerAction[npc] = 10;
				break;
				
				//est fatigué
				case 36:
				this.timerAction[npc] = 10;
				break;
			
				default:
				break;
			};

		}
	};
};

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
    Window_Base.prototype.initialize.call(this, x, y, 900, 100);
    this.refresh();
};
SimCraftHud.prototype.refresh = function() {
	// initialise
	this.contents.clear();
	//Setting
	this.contents.fontSize = 12;																	// FontSize
	this.contents.fontFace = 'parchment_MF.ttf';													// FontFace
	this.changeTextColor(this.powerUpColor());														// Font color
	//Set visibility
	if($gameSwitches.value(visibilitySwitch)){																		// Switch visible				S-1
		this.visible = true;
    } else {
		this.visible = false;
	};
	//Refresh the hud
	this.refreshTheHud();
};
SimCraftHud.prototype.refreshTheHud = function(){
	if($gameSwitches.value(hudPsSwitch)){
		this.hudPs(0);
		this.hudSante(0);
	}
}
//######################################################################
// HUD PS
//######################################################################
SimCraftHud.prototype.hudPs = function(npc){
	//defaut
	var npc = npc || 0;
	this.drawPsHud(0, true);
	this.drawPsHud($simCraft.getIndexPs(npc),false);
	this.drawPsHud(1, false);
	this.drawText($simCraft.getPsResiduel(npc), 90, 0, 12, 'center'); 
};
//######################################################################
// GAUGE SANTE
//######################################################################
SimCraft.prototype.hudSante = function(npc,index){
	//par defaut
	var npc = npc || 0;
	var index = index || 0;
	
	//positionnement
	var _xJauge = 132;
	var _yJauge = 19 +(20*index) ;
	var _yFill = _yJauge+9;
	var yValeur = yJauge -3;
	var _xJauge2 = xJauge + 29  + $simCraft.getIndexStamina(npc)-$simCraft.getBreathlessness(npc);
	
	//dessin BG
	var bitmap = ImageManager.loadBitmap('img/sim/', 'BGsante', hue, true);
	this.contents.blt(bitmap, 0, 0, bitmap._canvas.width, bitmap._canvas.height, _xJauge, _yJauge);
	
	//dessin Jauges
	this.contents.gradientFillRect(_xJauge+29, _yFill, Math.floor($simCraft.getIndexStamina(npc)), 3, this.textColor(16), this.textColor(17));
	this.contents.gradientFillRect(_xJauge+160, _yFill, Math.floor($simCraft.getIndexDiet(npc)), 3, this.textColor(18), this.textColor(19));
	this.contents.gradientFillRect(_xJauge+320, _yFill, Math.floor($simCraft.getIndexHygiene(npc)), 3, this.textColor(20), this.textColor(21));
	this.drawText('Stamina', xJauge + 44, yValeur, 100);
	this.drawText('Sasiété', xJauge + 175, yValeur, 100);
	this.drawText('Propreté', xJauge + 335, yValeur, 100);
	this.drawText(Math.floor($simCraft.getStaminaResiduel(npc)), xJauge + 80, yValeur, 100);
	this.drawText(Math.floor($simCraft.getDietActu(npc)), xJauge + 240, yValeur, 100);
	this.drawText(Math.floor($simCraft.getHygieneActu(npc)), xJauge + 400, yValeur, 100);
	this.contents.gradientFillRect(_xJauge2, _yFill, Math.floor($simCraft.getBreathlessness(npc)), 3, this.textColor(22), this.textColor(23))
	
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
 //DataManager
 var dataManagerCreateObjectClone = DataManager.createGameObjects;
 DataManager.createGameObjects = function() {
	dataManagerCreateObjectClone.call(this);
	$simCraft = new SimCraft();
};
var dataManagerSaveContentsClone = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	contents.simcraft	  = $simCraft
	dataManagerSaveContentsClone.call(this);
};
var dataManagerExtractSaveContentsClone = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	$simCraft		   = contents.simcraft
	dataManagerExtractSaveContentsClone.call(this);
};
 //SCENE_MAP
var clone_map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    clone_map_start.call(this);
	this.createSimCraftHud();
	$simCraft.createSimCraftSystem();
};
Scene_Map.prototype.createSimCraftHud = function() {
    this._SimCraftHud = new SimCraftHud();
    this._SimCraftHud.opacity = 0;
    this.addWindow(this._SimCraftHud);
};
var clone_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    clone_map_update.call(this);
	if($gameSwitches.value(systemOnSwitch)){
		if(this.isEventRunning){
			$simCraft.setActionValue(0,2);
		}else if($simCraft.getActionValue(0) == 2){
			$simCraft.setActionValue(0,0);
		};
		$simCraft.refreshSimCraft();
		this._SimCraftHud.refresh();
	};	
};



