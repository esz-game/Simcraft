//=============================================================================
// 
//=============================================================================
"use strict";

PluginManager.register("EszSimcraft_stockage", "1.0.1", {
	"email": "contact@esz-game.org",
	"website": "Esz-Game.org",
	"name": "Esziaprez"
}, "2016-11-24")
/*:
* @plugindesc  Modifié et traduit par Esz.
* @author Mr. Trivel & Esz-Game
*
* @param Limite par defaut
* @desc Limite par defaut de l'inventaire
* Default: 100
* @default 100
*
* @param Poids par defaut
* @desc Poids des objets par defaut
* Default: 1
* @default 1
*
*
* @param Lexique Poids
* @desc Mot utilisé "pour Poids". Ex : "encombrement", "stock", "transport"
* Default: Poids
* @default Poids:
* 
* @help
* ============================================================================
* Introduction FR
* ============================================================================
* --------------------------------------------------------------------------------
* Terms of Use
* --------------------------------------------------------------------------------
* Don't remove the header or claim that you wrote this plugin.
* Credit Mr. Trivel if using this plugin in your project.
* Free for commercial and non-commercial projects.
* --------------------------------------------------------------------------------
* Version 1.0(.1 added by Esz)
* --------------------------------------------------------------------------------
* Item Tags
* --------------------------------------------------------------------------------
* <Poids: [VALEUR]>
* Utilisez ceci dans les commentaire des items/weapons/armors pour déterminer
* le poids(Ou encombrement) de l'élément.
*
* Example:
* <Poids: 5>
* --------------------------------------------------------------------------------
*
* --------------------------------------------------------------------------------
* Equipment Tags
* --------------------------------------------------------------------------------
* <InvLimitChange: [VALEUR]>
* Modifie la limite d'inventaire par [VALEUR] lorsque l'élément est équipé.
* Fonctionne dans les deux sens.
*
* <InvLimitChange: -5>
* <InvLimitChange: 10>
* --------------------------------------------------------------------------------
*
* --------------------------------------------------------------------------------
* Plugin Commands
* --------------------------------------------------------------------------------
* CapaciteStock Bonus [VALEUR] - augmenter la capacité de stockage.
* CapaciteStock Malus [VALEUR] - diminuer la capacité de stockage.
* CapaciteStock Ignorer - Ignorer la limit en ajoutant un objet.
* CapaciteStock StopIgnorer - Arreter d'gnorer la limit en ajoutant un objet
*
* Exemples:
* CapaciteStock Bonus 10
* CapaciteStock Malus Sub 5
* CapaciteStock Ignorer Ignore
* CapaciteStock StopIgnorer
* --------------------------------------------------------------------------------
*
* --------------------------------------------------------------------------------
* Script Calls
* --------------------------------------------------------------------------------
* $gameParty.getStockageRestant() - retourne la capacité de stockage restante
* $gameParty.getTotalCapaciteStockage() - retourne la capacité totale de stockage
* $gameParty.getStockageUtilise() - retourne la capacité de stockage utilisée
* --------------------------------------------------------------------------------
*
* --------------------------------------------------------------------------------
* Version History
* --------------------------------------------------------------------------------
* 1.0 - Release
* 1.0.1 Esz fonction and translation by Esz
* --------------------------------------------------------------------------------
*
* ----■■■■■■■------■■■■■■----■■■■■■■■■■
* ---■■■■■■■■---■■■■■■■■---■■■■■■■■■
* --■■■■-------- -■■■■----■■■■--■■■■
* -■■■■----------■■■■------■■■■--■■■■
* -■■■■-----------■■■■-----■■■■---■■■■                
* -■■■■--------------■■■■--------------■■■■             
* -■■■■■■■■■--------■■■■-----------■■■■
* -■■■■■■■■■------------■■■■--------■■■■ 
* -■■■■------------------------■■■■-------■■■■              
* -■■■■-------------------------■■■■-------■■■■                                                       
* -■■■■-------------■■■■-----■■■■-------■■■■
* --■■■■------------■■■■----■■■■---------■■■■
* ---■■■■■■■■----■■■■■■■■■---■■■■■■■■
* ----■■■■■■■--------■■■■■■-----■■■■■■■■■
*
* -------- ▼ EszSimcraft_stockage.js ▼--------
* Contact : contact[at]esz-game.org
* THE SIMCRAFT SYSTEM => STOCKAGE (inventory) Based on MrTS_LimitedInventory plugin
* Script commented in French by Esz and addon by Esz. Enjoy!
* MrTS license
* Credit MrTS, Esz for addon, Kadokawa
*-------------------------------------------------------------------------------------
*/
var Importer = Importer || {};
Importer.EszSimcraft_stockage = {};
Importer.EszSimcraft_stockage.version = "1.0.1";
Importer.EszSimcraft_stockage.contact = "contact@esz-game.org";
Importer.EszSimcraft_stockage.website ="Esz-Game.org";
Importer.EszSimcraft_stockage.autor ="Esziaprez based on SnOwCrack gathering";
Importer.EszSimcraft_stockage.since ="2016-11-22";
Importer.EszSimcraft_stockage.ok = "ok";

var ESZ = ESZ || {};
ESZ.Stockage = ESZ.Stockage || {};
ESZ.Stockage.Windows = ESZ.Stockage.Windows || {};
ESZ.Stockage.Scenes = ESZ.Stockage.Scenes || {};
ESZ.Stockage.Parameters = PluginManager.parameters("EszSimcraft_stockage");
ESZ.Stockage.PopEvents = false;
ESZ.Stockage.limiteParDefaut = Number(ESZ.Stockage.Parameters['Limite par defaut']) || 30;
ESZ.Stockage.PoidsParDefaut = Number(ESZ.Stockage.Parameters['Poids par defaut']) || 1;
ESZ.Stockage.PoidsMot = String(ESZ.Stockage.Parameters['Lexique Poids']) || "Encombrement";
//--------------------------------------------------------------------------
// Game_Party
var _Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
	_Game_Party_initialize.call(this);
	this._capaciteStockage = ESZ.Stockage.limiteParDefaut;
	this._modifCapaciteStockage = 0;
	this._ignoreInvLimit = false;
};

Game_Party.prototype.augmenterEspaceStockage = function(poidsSup) {
	this._modifCapaciteStockage += poidsSup;
};

Game_Party.prototype.diminuerEspaceStockage = function(poidsMoins) {
	this.augmenterEspaceStockage(-poidsMoins);
};

Game_Party.prototype.getTotalCapaciteStockage = function() {
	var base = this._capaciteStockage;
	var modif = this._modifCapaciteStockage;
	
	var contenant = 0;
	//Pour chaque membre de l'équipe
	for (var i = 0; i < this.members().length; i++) {
		contenant += this.members()[i].getModifCapaciteStockage();
	}
	return Math.max(0, (base+modif+contenant));
};

Game_Party.prototype.getStockageUtilise = function() {
	var poidsTotal = 0;
	//Pour chaque objet de l'inventaire
	for (var i = 0; i < this.allItems().length; i++) {
		var poids = 0;
		//Si la balise poids est présente on recupere la valeur de la balise
		if(this.allItems()[i].meta.Poids){
			poids = Number(this.allItems()[i].meta.Poids)
		}else{
			poids = ESZ.Stockage.PoidsParDefaut;
		};
		// on multiplie le poids par le nombre d'objets possédés
		poidsTotal += this.numItems(this.allItems()[i]) * poids;
	};
	return poidsTotal;
};

Game_Party.prototype.getStockageRestant = function() {
	return this.getTotalCapaciteStockage() - this.getStockageUtilise();
};

Game_Party.prototype.getPoidsObjet = function(item) {
	var _poids = item.poids;
	return _poids;
};

var _Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(objet, quantite, includeEquip) {
	if (quantite < 0 || this._ignoreInvLimit){
		_Game_Party_gainItem.call(this, objet, quantite, includeEquip);
	}else{
		
		var _poids = this.getPoidsObjet(objet);
		var _poidsTotal = _poids * quantite;
		var _poidsDispo = this.getStockageRestant();
		
		if ((_poidsDispo - _poidsTotal) >= 0){
			_Game_Party_gainItem.call(this, objet, quantite, includeEquip);
		}else{
			var quantiteTolere = Math.floor(_poidsDispo/_poids);
			if (quantiteTolere > 0){
				_Game_Party_gainItem.call(this, objet, quantiteTolere, includeEquip);
			};	
		};
	};
};

Game_Actor.prototype.getModifCapaciteStockage = function() {
	var bonus = 0;
	for (var i = 0; i < this.equips().length; i++) {
		if (!this.equips()[i]) continue;
		if (this.equips()[i].meta.StockSup){
			bonus += Number(this.equips()[i].meta.StockSup);
		}
	}
	return bonus;
};

//--------------------------------------------------------------------------
// Window_InventoryLimit
//
// Shows how much is left.

function Window_InventoryLimit() {
	this.initialize.apply(this, arguments);	
};

Window_InventoryLimit.prototype = Object.create(Window_Base.prototype);
Window_InventoryLimit.prototype.constructor = Window_InventoryLimit;

Window_InventoryLimit.prototype.initialize = function(x, y, w, h) {
	Window_Base.prototype.initialize.call(this, x, y, w, h);
	this.refresh();
};

Window_InventoryLimit.prototype.refresh = function() {
	this.contents.clear();
	var u = $gameParty.getStockageUtilise();
	var t = $gameParty.getTotalCapaciteStockage();
	this.drawIcon(368, 0,0);
	this.drawText("Encombrement " + u + "/" + t, 38, 0);
};

//--------------------------------------------------------------------------
// Scene_Item
// 

var _Scene_Item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
	_Scene_Item_create.call(this);
	this.createLimitWindow();
};

Scene_Item.prototype.createLimitWindow = function() {
	var wx = this._itemWindow.x;
	var ww = this._itemWindow.width;
	var wh = this._itemWindow.fittingHeight(1);
	this._itemWindow.height = this._itemWindow.height - wh;
	this._itemWindow.refresh();
	var wy = this._itemWindow.y + this._itemWindow.height;
	this._invLimitWindow = new Window_InventoryLimit(wx, wy, ww, wh);
	this.addWindow(this._invLimitWindow);
};

var _Scene_Item_useItem = Scene_Item.prototype.useItem;
Scene_Item.prototype.useItem = function() {
	_Scene_Item_useItem.call(this);
	if (this._invLimitWindow) this._invLimitWindow.refresh();
};
	//--------------------------------------------------------------------------
// Game_Interpreter
// 

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Game_Interpreter_pluginCommand.call(this, command, args);
	if (command.toLowerCase() === "capacitestock") {
		switch (args[0].toUpperCase())
		{
			case 'BONUS':
			{
				$gameParty.augmenterEspaceStockage(Number(args[1]));
			} break;
			case 'MALUS':
			{
				$gameParty.diminuerEspaceStockage(Number(args[1]));
			} break;
			case 'IGNORER':
			{
				$gameParty._ignoreInvLimit = true;
			} break;
			case 'STOPIGNORER':
			{
				$gameParty._ignoreInvLimit = false;
			} break;				
		}
	}
};
