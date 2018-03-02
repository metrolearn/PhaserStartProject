class ImageToggle extends Phaser.Group {
    constructor(onImage, offImage, event) {
        super(game);

        this.event=event;

        this.onSprite = game.add.image(0, 0, onImage);
        this.offSprite = game.add.image(0, 0, offImage);
        this.onSprite.anchor.set(0.5, 0.5);
        this.offSprite.anchor.set(0.5, 0.5);
        this.offSprite.visible = false;
        this.onSprite.inputEnabled=true;
        this.offSprite.inputEnabled=true;

        this.offSprite.events.onInputUp.add(this.turnOn, this);
        this.onSprite.events.onInputUp.add(this.turnOff, this);
        //
        //
        this.offSprite.events.onInputDown.add(this.onDown, this);
        this.onSprite.events.onInputDown.add(this.onDown, this);
        
        this.add(this.onSprite);
        this.add(this.offSprite);

    }
     onDown()
    {
        this.onSprite.y=-5;
        this.offSprite.y=-5;
    }
    onUp()
    {
        this.onSprite.y=0;
        this.offSprite.y=0;
    }
    turnOn()
    {
    	this.setTo(true);
        this.onUp();
    }
    turnOff()
    {
    	this.setTo(false);
        this.onUp();
    }
    setTo(val) {
    	this._val=val;
    	this.offSprite.visible=!val;
    	this.onSprite.visible=val;

    	 if (this.event) {
            eventDispatcher.dispatch(this.event, val);
        }
    }

    getVal()
    {
    	return _val;
    }
}