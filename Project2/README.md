# phaser_template
This is an empty Phaser template. You can download the original at: 
https://phasergames.com/downloads/ultimate-casual-game-parts-template-free-version/

It has lots of pre-written code so that your game will have things like a title screen and sound controls right from 
the start. 
Most of the code you add will go into js/states/stateMain.js.

## Tools

Make graphics with Piskel: https://www.piskelapp.com

Make sound effects with BFXR: https://www.bfxr.net

Make music with Beepbox: https://www.beepbox.co

## Endless Runner Tutorial

View the original tutorial at:
https://phasergames.com/creating-endless-runner-game-phaser-part-1/

OR

Follow the steps below to build an endless runner game.

#### === SECTION 1: LOADING IMAGE FILES ===

1. Create four images and export them as .png files:
	
    - "hero.png", 32x32. (Leave a 1px space at the top.)
    - "ground.png", 640x32
    - "powerbar.png", 32x32
    - "block.png", 64x64

    Drop your images in the images/main directory. If there are already images there that have the same name, you can overwrite them.
    
2. Got to js/main.js and set the variable useLandscape to true. 
```
var useLandscape = true;
```

3. Go to js/states/stateMain.js and preload your image files in the preload function. When we add code to a function
it always goes between the brackets {}. Your preload function should look like this:
```
preload: function() {
    game.load.image("ground", "images/main/ground.png");
    game.load.image("hero", "images/main/hero.png");
    game.load.image("bar", "images/main/powerbar.png");
    game.load.image("block", "images/main/block.png");
}
```

4. Load your images into some sprites and put the sprites on the stage using the create function. Change your background color
to blue.
```
create: function() {
    // Keep this line
    // To tell the game what state we are in!
    model.state = "main";
    
    // Your new code goes here
    this.pheight = 32; // This is the height of the player (hero) image.
    this.pwidth = 32;  // This is the width of the player image.
    
    this.ground = game.add.sprite(0, game.height - 32, "ground");
    this.hero = game.add.sprite(game.width * .2, this.ground.y - this.pheight, "hero");
    this.powerBar = game.add.sprite(this.hero.x, this.hero.y-32, "bar");
    
    game.stage.backgroundColor="#00ffff"; 

}

```

Test your game.


#### === SECTION 2: LISTENERS AND INPUT ===

1. Power meter (Jump Power)
The power meter is just a small image that we can add in and change the width as the power changes. 
The player will change the power by holding the mouse (or finger) down and then jumping when the mouseUp event is called. 
The longer the mouse is down the higher the jump will be. 
First, we need a variable to change. Place this in the create function, near the top.


	this.power = 0;
	this.maxpower = 25;
	

2. In the create function, add a listener for mouse down input. The second argument (this) is the context in which your function should be called. Our context is StateMain.
```
game.input.onDown.add(this.mouseDown, this);
```
    
	

3. Now create the mouseDown function

```
mouseDown: function() {

    // Now that we're here, stop listening for mouse down for now
    game.input.onDown.remove(this.mouseDown, this);
    
    // This timer runs 1000 times a second. This will give us a smooth power bar effect.
    this.timer = game.time.events.loop(Phaser.Timer.SECOND / 1000, this.increasePower, this);

    // Start listening for mouse up.
    game.input.onUp.add(this.mouseUp, this);
    
},
```

4. Add the increasePower function
``` 
increasePower: function() {
    this.power++;
    this.powerBar.width = 128 *  (this.power/this.maxPower);
    if (this.power > this.maxPower) {
        this.power = this.maxPower;
    }
},
```   
    
5. And the mouseUp function
```
mouseUp:function()
{

    // Stop listening for mouse up for now.
    game.input.onUp.remove(this.mouseUp, this);
    
    // Destroy the timer
    game.time.events.remove(this.timer);
    
    // Reset power
    this.power = 0;
    this.powerBar.width = 0;
    
    // Start listening for mouse down again.
    game.input.onDown.add(this.mouseDown, this);
   
},
```

6. Test your game.

####=== SECTION 3: PHYSICS AND COLLISIONS ===
 
--- Add physics so we can move objects.
--- Physics engine replicates the way things move around in the real world.
It's possible to move things in your game without using a physics engine, but physics
can simplify it a bit. You just start something moving and it will continue moving 
in that direction, colliding and bouncing off anything else that has physics enabled.

1. in stateMain.js:create

```
// Start the physics engine
game.physics.startSystem(Phaser.Physics.ARCADE);

// Enable the physics on the hero.
game.physics.enable(this.hero, Phaser.Physics.ARCADE);
```

2. Create a new doJump function

```
doJump: function() {
	// We only want to the y velocity and we want to set it to a negative number to make it go upwards.
	this.hero.body.velocity.y = -this.power * 16;
},
```

3. Add your doJump method to the mouseUp method)
		
```
// Call our jump function
this.doJump();
```
		
4. Test game. Hero will probably continue rising, so we should make him collide with the edges of the game. 
in stateMain.js:create add the following:

```
// Add physics to the ground
game.physics.enable(this.ground, Phaser.Physics.ARCADE);

// Add gravity. See https://phaser.io/docs/2.6.2/Phaser.Physics.Arcade.Body.html			
this.hero.body.gravity.y = 200;

// Set up some physics rules for these objects	
this.hero.body.collideWorldBounds = true;
this.ground.body.immovable = true;

```
		
5. Add the following to stateMain.js:update
	
```
// Allow collisions between hero and ground
game.physics.arcade.collide(this.hero, this.ground);
```

####=== SECTION 4: OBSTACLES AND GROUPS ====

1. Add this in stateMain.js:create
```
this.blocks = game.add.group();
this.makeBlocks();
```
2. Now write the makeBlocks function.
```
makeBlocks: function() {
    var bStartX=game.width, bStartY=game.height-32-64;

    var wallHeight=game.rnd.integerInRange(2, 6);
    for (var i = 0; i < wallHeight; i++) {
        var block = game.add.sprite(bStartX, bStartY - ( i * 64 ), "block");
        this.blocks.add(block);
    }
    
    // Loop through the blocks and apply physics to each.
    this.blocks.forEach(function(block) {
        //enable physics
        game.physics.enable(block, Phaser.Physics.ARCADE);
        block.body.velocity.x = -150;

    });
},
```
3. Make your hero collide with the blocks. Add this to the update function. See https://phaser.io/docs/2.4.4/Phaser.Physics.Arcade.html#collide
```
game.physics.arcade.collide(this.hero, this.blocks, this.delayOver, null, this);
```
4. Make a delayOver function. It can be empty for now.

```
delayOver: function() {
// This is an empty function. It does nothing!
},
```

5. Have the blocks reset if they reach the other side of the stage. Add this to the update function.
```
var fchild = this.blocks.getChildAt(0);
// If off the screen reset the blocks.
if (fchild.x + 64 < 0) {
    this.makeBlocks();
}
```

6. Add this to the makeBlocks function.
```
// Remove all the blocks from the group before you create more. You don't want to fill up memory.
this.blocks.removeAll();
```

7. Prevent double-jump. Add this to the create step to record the hero's start position.
```
this.startY = this.hero.y;
```

8. Now add this to the start of the mouseDown function.
```
if (this.hero.y != this.startY) {
    return;
}
```

####=== SECTION 5: GAME OVER ===

1. Add to create function
```
// Use this to prevent clicking when game is over.
this.clickLock = false;
```


2. Add this to mouseDown, at the very begining.
```
if (this.clickLock) {
    return;
}
```

3. Fill in the delayOver function and create a new gameOver function that sets the game state to StateOver
```
delayOver: function() {
    this.clickLock = true;
    game.time.events.add(Phaser.Timer.SECOND, this.gameOver, this);
},
gameOver: function() {
    game.state.start("StateOver");
},
```

####=== SECTION 6: Animation ===

1. Create your animation at 32x32 pixels. Leave some space at the top of each frame. Export it as a .png sprite sheet with columns and rows. Name it "hero_anim.png". Place the new image in your images/main folder.

2. In preload, replace the "hero" load line with the following code. This will load your sprite sheet and slice it into individual frames of 32x32 pixels.
```
game.load.spritesheet("hero", 'images/main/hero_anim.png', 32, 32);
```

3. In the create function, add some animations to your hero. The function expects these arguments: animation.add(animation name, frames (an array), framerate, should it loop?).
```
this.hero.animations.add('run',[0,1,2,3,4,5,6,7,8,9],12,true);
this.hero.animations.play('run');
```
4. It's a pain to list all those frames when adding animations. Let's make a function to create an array for us.
```
makeArray:function(start,end)
{
    var myArray=[];
    for (var i = start; i < end; i++) {
        myArray.push(i);
    }
    return myArray;
},
```
5. Add more animations
```
this.hero.animations.add('run',this.makeArray(0,9),12,true);
this.hero.animations.add('jump',[0],12,false);
this.hero.animations.add('die',this.makeArray(10,16),12,false);
```


6. Overwrite the old hero/ground collision you have in the update function. Now, when the hero hits the ground we'll run a new function called "onGround"
```
game.physics.arcade.collide(this.hero, this.ground, this.onGround, null, this);
```

7. Add the onGround function
```
onGround()
{
    if (this.hero)
    {
        this.hero.animations.play('run');
    }        
}
```

####=== SECTION 7: SOUND EFFECTS ===
1. Create a jump sound effect, a landing sound effect and a death sound effect. You can use https://www.bfxr.net/
    
2. Save your sounds as .wav files and move them to your audio/sfx directory. Name them jump.wav, land.wav and die.wav.

3. In stateMain.js, preload
 ```
game.load.audio("jump", "audio/sfx/jump.wav");
game.load.audio("land", "audio/sfx/land.wav");
game.load.audio("die", "audio/sfx/die.wav");
```

4. In stateMain.js, create
```
this.jumpSound = game.add.audio('jump');
this.landSound = game.add.audio('land');
this.dieSound = game.add.audio('die');
```

		
5. Add this to the doJump() function.
```
this.jumpSound.play();
```

6. Add this to delayOver()
```
this.dieSound.play();
```

7. Add this to onGround()
```
this.landSound.play();
```

8. Test your game. That sounds terrible! What is that buzzing? The landed sound plays every frame the hero is on the ground. Make a variable to keep track of when it has just landed. Add this to the create function.
```
// Keep track of if the player is on the ground so we only play the landing sound once
this.landed=true;
```

9. Add this to doJump()
```
		this.landed=false;
```
10. Add this to onGround()
```
if(!this.landed){
    this.landed=true;
    this.landSound.play();
}
```
11. Test your game.

12. CHALLENGE: Try to play a sound every time the player hits a block. Play a charge up sound for the jump bar.


####===  SECTION 8: MUSIC ===
1. Create a song. you can use https://beepbox.co/

2. Export your song as .wav. You could use an mp3, but Beepbox does not export in that format.

3. We're going to work in a new file now, not stateMain, but stateLoad. In stateLoad.js, preload
```
game.load.audio("backgroundMusic", "audio/background/endlessrun_song.wav");
```

4. In stateLoad.js, create
```
//pass the key for background music to the media manager
mediaManager.setBackgroundMusic("backgroundMusic");
```

5. In main.js, change devMode to false. The template we're using has a "dev" mode you can use when working on your game. The assumption must have been that you would not want to listen to your music non-stop. 
If we deactivate devMode, we can hear the music.
```
model.devMode = false; // Now we will hear music and see the main menu.
```

6. Sound effects may seem too loud compared to the music. Alter them like this. The second parameter is the volume.
```
this.jumpSound = game.add.audio('jump',.25);
this.landSound = game.add.audio('land',.25);
this.dieSound = game.add.audio('die',.25);
```

7. Test your game.

####=== SECTION 9: PARALAX BACKGROUND ===

1. Example: https://commons.wikimedia.org/wiki/File:Parallax_scroll.gif

	https://www.joshmorony.com/how-to-create-a-parallax-background-in-phaser/
	What is a paralax background? As you drive down the highway, the grass will appear to move past me very quickly because it is so close, 
	the trees will appear to move a little slower than the grass, and the hills in the distance will barely appear to be moving. This is a paralax effect.
	
2. Create 3 images at 640x480 pixels. Make a foreground, a midground and a background image. Export them as .png files.

3. Preload the images in your preload function.
```
game.load.image("bg0", "images/main/bg0.png");
game.load.image("bg1", "images/main/bg1.png");
game.load.image("bg2", "images/main/bg2.png");
```      
    	
4. Create backgrounds in the create function. Add your backgrounds before any other images! Images appear in the order you added them, back to front.    	

```
// Create a tilesprite (x, y, width, height, key)
this.bg0 = this.game.add.tileSprite(0,
    game.height - this.game.cache.getImage('bg0').height,
    game.width,
    game.cache.getImage('bg0').height,
    'bg0'
);


this.bg1 = this.game.add.tileSprite(0,
    game.height - this.game.cache.getImage('bg1').height,
    game.width,
    game.cache.getImage('bg1').height,
    'bg1'
);

this.bg2 = this.game.add.tileSprite(0,
    game.height - this.game.cache.getImage('bg2').height,
    game.width,
    game.cache.getImage('bg2').height,
    'bg2'
);
```

5. Move the backgrounds in the update function.
```
this.bg0.tilePosition.x -= 0.05;
this.bg1.tilePosition.x -= 0.3;
this.bg2.tilePosition.x -= 0.75;
```