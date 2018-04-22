class GButton extends Phaser.Group {
    constructor(text = 'button', event = null, params = null, w = 100, backColor = 0xE9B515, size = 22, textColor = '#000000') {
        super(game);
        this.event = event;
        this.params = params;
        //
        //
        //
        this.buttonBack = game.add.graphics();
        this.buttonBack.beginFill(backColor, 1);
        this.buttonBack.drawRoundedRect(0, 0, w, 50, 8);
        this.buttonBack.endFill();
        //
        //
        this.textField = game.add.text(0, 0, text);
        this.textField.anchor.set(0.5, 0.5);
        this.textField.fontSize = size + "px";
        this.textField.x = this.buttonBack.width / 2;
        this.textField.y = this.buttonBack.height / 2;
        this.textField.fill = textColor;

        if (model.buttonFont != "none") {
            this.textField.font = model.buttonFont;
        }
            
        this.add(this.buttonBack);
        this.add(this.textField);
        this.buttonBack.inputEnabled = true;
        this.buttonBack.events.onInputUp.add(this.onPressed, this);
        this.buttonBack.events.onInputDown.add(this.onDown, this);
    }
    getBack() {
        return this.buttonBack;
    }
    onPressed() {
        this.buttonBack.y = 0;
        if (this.event) {
            eventDispatcher.dispatch(this.event, this.params);
        }
    }
    onDown() {
        this.buttonBack.y = -5;
    }
    setCallBack(callback) {
        this.callback = callback;
    }
    setTextSize(size) {
        this.textField.fontSize = size + "px";
    }
    setTextPos(xx, yy) {
        this.textField.x = xx;
        this.textField.y = yy;
    }
    setTextColor(textColor) {
        this.textField.fill = textColor;
    }
    getTextField() {
        return this.textField;
    }
    getText() {
        return this.textField.text;
    }
}