var game;
var model;
var controller;
var eventDispatcher;
var mediaManager;
var levelManager;
//
//
var useLandscape = true;
window.onload = function() {
    isMobile = navigator.userAgent.indexOf("Mobile");
    isMobile = (isMobile != -1) ? true : false;
    if (isMobile == false) {
        if (useLandscape == true) {
            game = new Phaser.Game(640, 480, Phaser.AUTO, "ph_game");
        } else {
            game = new Phaser.Game(480, 640, Phaser.AUTO, "ph_game");
        }
    } else {
        game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "ph_game");
        if (useLandscape == true) {
            wrongTag = "wrongWayLandscape";
        } else {
            wrongTag = "wrongWayPortrait";
        }
    }
    G = new GameConstants();
    eventDispatcher = new Phaser.Signal();
    model = new Model();
    controller = new Controller();
    mediaManager = new MediaManager();
    model.devMode = false;
    //
    //
    //
    game.state.add("StateInit", StateInit);
    game.state.add("StateLoad", StateLoad);
    game.state.add("StateMain", StateMain);
    game.state.add("StateTitle", StateTitle);
    game.state.add("StateOver", StateOver);
    game.state.start("StateInit");
}