//============================================================================
// Title Simcraft
// Version: 0.01
// Last Update: March -, 2016
//============================================================================
// Author : Esziaprez (Hernandez Pierre André)
// ** Terms of Use
// http://esz-game.org
//============================================================================
//============================================================================

/*:
 * @plugindesc Creates the Simcraft Game title
 *
 * @author Hudell
 *
* @param ParticuleImg
* @desc Name of the picture in your repertory parallaxes without the extension. More Info in the Help
* @default Particules
* 
* @param BackgroundImg
* @desc Name of the 2nd picture in your repertory title without the extension. More Info in the Help
* @default arriereplan
* 
* @param LayerImg
* @desc Name of the picture in your repertory title without the extension. More Info in the Help
* @default premierplan
* 
* @param Fontface
* @desc Name of the picture in your repertory title without the extension. More Info in the Help
* @default premierplan
* 
* @help
*
*============================================================================
* Windows Simcraft
* Version: 0.01
* Last Update: March -, 2016
*============================================================================
* ** Terms of Use
* http://esz-game.org
*============================================================================
*
*============================================================================
* 
*/
var params = PluginManager.parameters('EszGameTitle');
var picture_name = String(params['ParticuleImg'] || 'Particules');
var picture_name2 = String(params['LayerImg'] || 'premierplan');
var picture_name3 = String(params['BackgroundImg'] || 'arriereplan');
var font_face = String(params['Fontface'] || 'GameFont');


Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
    this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
    this.addWindow(this._commandWindow);
};

Window_TitleCommand.prototype.makeCommandList = function() {
    this.addCommand('',   'newGame');
    this.addCommand('', 'continue', this.isContinueEnabled());
};

Window_TitleCommand.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width);
    this.y = Graphics.boxHeight - this.height;
		this.opacity = 0
};

Window_TitleCommand.prototype.windowWidth = function() {
    return 170;
};

var alias_st_update = Scene_Title.prototype.update;

Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.create_arrierePlan();
    this.createBackground();
	this.create_particule();
    this.createForeground();
    this.createWindowLayer();
    this.createCommandWindow();
	this.create_premierPlan();
};
 
Scene_Title.prototype.create_particule = function() {
	this._esz = new TilingSprite();
	this._esz.bitmap = ImageManager.loadParallax(picture_name);
	this._esz.opacity = 60; 
	this._esz.move(0, 0, Graphics.width, Graphics.height);
	this.addChild(this._esz); //
}

Scene_Title.prototype.create_premierPlan = function() {
	this._esz2 = new TilingSprite();
	this._esz2.bitmap = ImageManager.loadParallax(picture_name2);
	this._esz2.opacity = 40; 
	this._esz2.move(0, 0, Graphics.width, Graphics.height);
	this.addChild(this._esz2); //
}

Scene_Title.prototype.create_arrierePlan = function() {
	this._esz3 = new TilingSprite();
	this._esz3.bitmap = ImageManager.loadParallax(picture_name3);
	this._esz3.opacity = 255; 
	this._esz3.move(0, 0, Graphics.width, Graphics.height);
	this.addChild(this._esz3); //
}
	
Scene_Title.prototype.update = function() {
    alias_st_update.call(this);
    this._esz.origin.y += 1;
	this._esz3.origin.x += 1;
	this._esz2.origin.y += 2;

};
    //Overwrite the Scene_Title's Continue command//
    
    Scene_Title.prototype.commandContinue = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Load)
    };