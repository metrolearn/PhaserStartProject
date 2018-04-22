class Controller {
    constructor() {
        eventDispatcher.add(this.gotEvent, this);
    }
    gotEvent(call, params) {
        //console.log("call=" + call);
        switch (call) {
            case G.UP_SCORE:
                model.upScore(params);
                break;
            case G.TOGGLE_SOUND:
                model.soundOn = params;
                break;
            case G.TOGGLE_MUSIC:
                model.musicOn = params;
                break;
            case G.START_GAME:
                game.state.start("StateMain");
                break;
            case G.END_GAME:
                game.state.start("StateOver");
                break;
        }
    }
}