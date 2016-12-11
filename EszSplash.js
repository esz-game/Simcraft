//-----------------------------------------------------------------------------
// Scene_Splash
//
// The scene class of the game over screen.

function Scene_Splash() {
    this.initialize.apply(this, arguments);
}

Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Splash);
        Window_TitleCommand.initCommandPosition();
    }
    this.updateDocumentTitle();
};

Scene_Splash.prototype = Object.create(Scene_Base.prototype);
Scene_Splash.prototype.constructor = Scene_Splash;

Scene_Splash.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Splash.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
	this.createLayer();
	this.create_particule();
	this.create_premierPlan();
};

Scene_Splash.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
	SceneManager.clearStack();
    this.startFadeIn(this.slowFadeSpeed(), false);
	BattleManager.playBattleBgm();
};

Scene_Splash.prototype.update = function() {
    if (this.isActive() && !this.isBusy() && this.isTriggered()) {
		SceneManager.goto(Scene_Title);
    }
		this._esz.origin.y += 1;
		this._esz2.origin.y += 2;
    Scene_Base.prototype.update.call(this);

};

Scene_Splash.prototype.stop = function() {
    Scene_Base.prototype.stop.call(this);
    this.fadeOutAll();
};

Scene_Splash.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    AudioManager.stopAll();
};

Scene_Splash.prototype.createBackground = function() {
    this._backSprite = new Sprite();
    this._backSprite.bitmap = ImageManager.loadTitle1('Civ1');
	this._backSprite.move(0, 0, Graphics.width, Graphics.height);
    this.addChild(this._backSprite);
};

Scene_Splash.prototype.createLayer = function() {
    this._layerSprite = new Sprite();
    this._layerSprite.bitmap = ImageManager.loadTitle1('Civ2');
		this._layerSprite.move(0, 0, Graphics.width, Graphics.height);
    this.addChild(this._backSprite);
};

Scene_Splash.prototype.create_particule = function() {
	this._esz = new TilingSprite();
	this._esz.bitmap = ImageManager.loadParallax('Particules');
	this._esz.opacity = 60; 
	this._esz.move(0, 0, Graphics.width, Graphics.height);
	this.addChild(this._esz); //
}

Scene_Splash.prototype.create_premierPlan = function() {
	this._esz2 = new TilingSprite();
	this._esz2.bitmap = ImageManager.loadParallax('premierplan');
	this._esz2.opacity = 40; 
	this._esz2.move(0, 0, Graphics.width, Graphics.height);
	this.addChild(this._esz2); //
}

Scene_Splash.prototype.isTriggered = function() {
    return Input.isTriggered('ok') || TouchInput.isTriggered();
};

Scene_Splash.prototype.playSplashMusic = function() {
    AudioManager.playBgm($dataSystem.titleBgm);
    AudioManager.stopBgs();
    AudioManager.stopMe();
};
