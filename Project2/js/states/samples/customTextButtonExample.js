var StateMain = {
    preload: function() {},
    create: function() {
        //keep this line
        //to tell the game what state we are in!
        model.state = "main";
        //default settings
        var button = new CustomTextButton();
        //set text
        var button2 = new CustomTextButton("Hello");
        //set text, background key, event, button size
        var button3 = new CustomTextButton("I am a big button", "defaultButton", "doAlert", 5);
        //
        //
        //line up
        var line = new ItemLine();
        line.add(button);
        line.add(button2);
        line.add(button3);
        line.lineUpV();
        Align.centerVGroup(line);
        eventDispatcher.add(this.gotEvent, this);
    },
    //listen for events
    gotEvent(call, params) {
        if (call == "doAlert") {
            //your code here
            alert("I am a big button");
        }
    },
    update: function() {}
}