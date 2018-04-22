var StateMain = {
    preload: function() {

        game.load.spritesheet("hero", 'images/main/hero_anim.png', 32, 32);

        // Preload your sprite images.
        game.load.image("ground", "images/main/ground.png");
        game.load.image("bar", "images/main/powerbar.png");
        game.load.image("block", "images/main/block.png");

        // Preload some sound effect files.
        game.load.audio("jump", "audio/sfx/jump.wav");
        game.load.audio("land", "audio/sfx/land.wav");
        game.load.audio("die", "audio/sfx/die.wav");

        // Preload some images for the background.
        game.load.image("bg0", "images/main/bg0.png");
        game.load.image("bg1", "images/main/bg1.png");
        game.load.image("bg2", "images/main/bg2.png");

    },
    create: function() {
        // Keep this line to tell the game what state we are in!
        model.state = "main";

        // Make the backgrounds. Create a tilesprite (x, y, width, height, key)
        this.bg0 = this.game.add.tileSprite(0,
            game.height - this.game.cache.getImage('bg0').height + 64,
            game.width,
            game.cache.getImage('bg0').height,
            'bg0'
        );


        this.bg1 = this.game.add.tileSprite(0,
            game.height - this.game.cache.getImage('bg1').height + 96,
            game.width,
            game.cache.getImage('bg1').height,
            'bg1'
        );

        this.bg2 = this.game.add.tileSprite(0,
            game.height - this.game.cache.getImage('bg2').height + 96 + 32,
            game.width,
            game.cache.getImage('bg2').height,
            'bg2'
        );


        this.pheight =  32; // This is the height of the player (hero) image.
        this.pwidth =  32;  // This is the width of the player image.


        this.bheight = game.cache.getImage("block").height; // This is the height of the block image.
        this.bwidth = game.cache.getImage("block").width;  // This is the width of the block image.

        this.barheight = game.cache.getImage("bar").height; // This is the height of the bar image.
        this.barwidth = game.cache.getImage("bar").width;  // This is the width of the bar image.

        this.gheight = game.cache.getImage("ground").height; // This is the height of the ground image.
        this.gwidth = game.cache.getImage("ground").width;  // This is the width of the ground image.

        // Add your sprites. Ground, hero and powerBar
        this.ground = game.add.sprite(0, game.height - this.gheight, "ground");
        this.hero = game.add.sprite(game.width * .2, this.ground.y - this.pheight, "hero");
        this.powerBar = game.add.sprite(this.hero.x, this.hero.y- this.barheight - 8, "bar");

        // Set some animations for the hero.
        this.hero.animations.add('run',[0,1,2,3,4,6,7,8,9],12,true);
        this.hero.animations.add('jump',[15],12,false);
        this.hero.animations.add('die',this.makeArray(11,14),12,false);
        this.hero.animations.play('run');

        // The sky is blue
        game.stage.backgroundColor="#00ffff";

        // Some variables to control jump power.
        this.power = 0;
        this.maxPower = 25;

        // Do something when the user clicks the left mouse button. In this case, we'll run the mouseDown function.
        game.input.onDown.add(this.mouseDown, this);

        // Set the powerbar width to zero. We won't be able to see it, but it's there!
        this.powerBar.width = 0;

        // Start the physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Enable the physics on the hero.
        game.physics.enable(this.hero, Phaser.Physics.ARCADE);

        // Add physics to the ground
        game.physics.enable(this.ground, Phaser.Physics.ARCADE);

        // Add gravity to the hero. See https://phaser.io/docs/2.6.2/Phaser.Physics.Arcade.Body.html
        this.hero.body.gravity.y = 200;

        // Set up some physics rules for the hero and the ground.
        this.hero.body.collideWorldBounds = true;
        this.ground.body.immovable = true;

        this.blocks = game.add.group();
        this.makeBlocks();


        this.startY = this.hero.y;

        // Use this to prevent clicking when game is over.
        this.clickLock = false;

        this.jumpSound = game.add.audio('jump',.25);
        this.landSound = game.add.audio('land',.25);
        this.dieSound = game.add.audio('die',.25);

        this.landed=true;

        this.blockTimer = game.time.events.loop(Phaser.Timer.SECOND * 5, this.makeBlocks, this);

        this.helpText = game.add.text(16, game.height-24, "Hold Left Mouse to jump", { fontSize: '16px', fill: '#FFFFFF' });


    },
    mouseDown: function() {

        if (this.clickLock) {
            return;
        }

        if (!this.landed) {
            return;
        }


        // Now that we're here, stop listening for mouse down for now
        game.input.onDown.remove(this.mouseDown, this);

        // This timer runs 1000 times a second. This will give us a smooth power bar effect.
        this.timer = game.time.events.loop(Phaser.Timer.SECOND / 1000, this.increasePower, this);

        // Start listening for mouse up.
        game.input.onUp.add(this.mouseUp, this);

    },
    increasePower: function() {
        this.power++;
        this.powerBar.width = 128 *  (this.power/this.maxPower);
        if (this.power > this.maxPower) {
            this.power = this.maxPower;
        }
    },
    mouseUp:function()
    {

        // Stop listening for mouse up for now.
        game.input.onUp.remove(this.mouseUp, this);

        // Destroy the timer
        game.time.events.remove(this.timer);


        this.doJump();

        // Reset power
        this.power = 0;
        this.powerBar.width = 0;

        // Start listening for mouse down again.
        game.input.onDown.add(this.mouseDown, this);

    },
    doJump: function() {
        // We only want to the y velocity and we want to set it to a negative number to make it go upwards.
        this.hero.body.velocity.y = -this.power * 16;
        this.hero.animations.play('jump');
        this.landed=false;

        this.jumpSound.play();


    },
    makeBlocks: function() {

        var bStartX=game.width, bStartY=game.height-32-64;
        var rndPos, offset;

        // Always make a block at the top of the screen.
        offset = game.rnd.integerInRange(0,4);
        this.makeBlock(bStartX + (offset * this.bwidth), bStartY - ( 6 * this.bheight ));

        // Always make a block on the ground.
        offset = game.rnd.integerInRange(0,4);
        this.makeBlock( bStartX + (offset * 64), bStartY );

        // Fill in a random number of blocks in between.
        var wallHeight=game.rnd.integerInRange(2, 6);
        for (var i = 0; i < wallHeight; i++) {
            rndPos = game.rnd.integerInRange(0,6);
            offset = game.rnd.integerInRange(0,6);
            this.makeBlock( bStartX + (offset * this.bwidth), bStartY - ( rndPos * this.bheight ) );
        }

        // The offset variable moves the spawn point for the block a little further back from the normal start point.
        // It's a random number. Try playing with the integerInRange values to pick a number from, say, 0 through 5 or 1 through 10.

    },
    makeBlock: function(x,y){

        var block = game.add.sprite(x, y, "block");

        game.physics.enable(block, Phaser.Physics.ARCADE);
        block.body.allowRotation=false;
        block.body.immovable = true;
        block.body.friction.x=0;
        block.body.velocity.x = -128;
        this.blocks.add(block);

    },
    delayOver: function() {
        this.clickLock = true;
        game.time.events.add(Phaser.Timer.SECOND, this.gameOver, this);
        this.dieSound.play();

    },
    gameOver: function() {
        game.state.start("StateOver");
    },
    makeArray:function(start,end)
    {
        var myArray=[];
        for (var i = start; i < end; i++) {
            myArray.push(i);
        }
        return myArray;
    },
    onGround: function() {

        if (this.hero)
        {
            this.hero.animations.play('run');
        }

        if(!this.landed){

            this.landed=true;
            this.landSound.play();
        }


    },
    collisionHandlerBlock: function(hero,block) {

        // If the hero has collided with the front of the block, end the game.
        if(hero.x + hero.width <= block.x){
            // Standard block. Only die if you hit the front of it.
            this.delayOver();
        }else{
            this.onGround();
        }
        return true;
    },
    update: function() {

        // Allow collisions between hero and ground
        game.physics.arcade.collide(this.hero, this.ground, this.onGround, null, this);


        // Check collisions between hero and blocks. If there is a collision, run a special function called collisionHandlerBlock.
        game.physics.arcade.collide(this.hero, this.blocks, function(obj1,obj2){ this.collisionHandlerBlock(obj1,obj2); }, null, this);


        for(var i=0; i<this.blocks.children.length;i++){
            var fchild = this.blocks.children[i];
            // The block is part of a group, so the x value is relative the to group x value. I placed the group at 0,0 so this should be irrelevant now.
            if (fchild.x < 0 - fchild.width || fchild.y>game.height) {
                fchild.destroy();
                this.blocks.remove(fchild);
            }
        }

        // Move the backgrounds
        this.bg0.tilePosition.x -= 0.15;
        this.bg1.tilePosition.x -= 0.30;
        this.bg2.tilePosition.x -= 0.60;

        this.powerBar.y = this.hero.y -20;
        this.powerBar.x = this.hero.x -20;

    }
}