class TextButton extends Phaser.Group {
    constructor(text = 'button', set = -1, style = -1, event = null, params = null, size = 22, textColor = '#000000') {
        super(game);
        if (set == -1) {
            set = model.defButtonSet;
        }
        if (style == -1) {
            style = model.defButtonStyle;
        }
        this.x = game.width / 2;
        this.y = game.height / 2;
        var key = "buttons_" + set + "_" + style;
        //  console.log(key);
        this.key = key;
        //
        //
        //
        this.text = text;
        this.event = event;
        this.params = params;
        //
        //
        //
        //
        this.buttonBack = this.create(0, 0, this.key);
        this.buttonBack.anchor.set(0.5, 0.5);
        //
        //
        this.textField = game.add.text(0, 0, text);
        this.textField.anchor.set(0.5, 0.5);
        console.log("size="+size);
        
        this.textField.fontSize = size + "px";
        this.textField.fill = textColor;
        if (model.buttonFont != "none") {
            this.textField.font = model.buttonFont;
        }
        this.add(this.textField);
        this.buttonBack.inputEnabled = true;
        this.buttonBack.events.onInputUp.add(this.onReleased, this);
        this.buttonBack.events.onInputDown.add(this.onDown, this);
    }
    static preload(set, style) {
        var key = "buttons_" + set + "_" + style;
        var path = "images/ui/buttons/" + set + "/" + style + ".png";
        game.load.image(key, path);
    }
    static preloadAll() {
        var lenArray = [10, 8, 15, 14];
        for (var i = 1; i < 5; i++) {
            for (var j = 1; j < lenArray[i - 1] + 1; j++) {
                TextButton.preload(i, j);
            }
        }
    }
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
    getBack() {
        return this.buttonBack;
    }
    onDown() {
        this.buttonBack.y = -5;
    }
    onReleased() {
        this.buttonBack.y = 0;
        if (this.event) {
            console.log(this.event);
            console.log(this.params);
            if (this.params)
            {
                eventDispatcher.dispatch(this.event, this.params);
            }
            else
            {
                eventDispatcher.dispatch(this.event);
            }
            
        }
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