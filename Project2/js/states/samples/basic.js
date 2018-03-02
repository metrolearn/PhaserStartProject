var StateMain = {
    preload: function() {},
    create: function() {
        //keep this line
        //to tell the game what state we are in!
        model.state = "main";

        
       
        eventDispatcher.add(this.gotEvent, this);
        var testButton = new TextButton("HELLO", 1, 1, "test");
    },
    //listen for events
    gotEvent(call, params) {
        if (call == "test") {
            //your code here
        }
    },
    update: function() {}
}