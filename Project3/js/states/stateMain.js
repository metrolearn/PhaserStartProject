var StateMain = {
    preload: function() {

        game.load.spritesheet("hero", 'images/main/hero_anim.png', 32, 32);


        game.load.image("ground", "images/main/ground.png");
        game.load.image("bar", "images/main/powerbar.png");
        game.load.image("block", "images/main/block.png");

        game.load.audio("jump", "audio/sfx/jump.wav");
        game.load.audio("land", "audio/sfx/land.wav");
        game.load.audio("die", "audio/sfx/die.wav");

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


    },
    mouseDown: function() {
        if (this.clickLock) {
            return;
        }

        if (this.hero.y != this.startY) {
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

        // Remove all the blocks from the group before you create more. You don't want to fill up memory.
        this.blocks.removeAll();


        var bStartX=game.width, bStartY = game.height- this.gheight - this.bheight;

        var wallHeight=game.rnd.integerInRange(2, 6);
        for (var i = 0; i < wallHeight; i++) {
            var block = game.add.sprite(bStartX, bStartY - ( i * this.bheight ), "block");
            this.blocks.add(block);
        }

        // Loop through the blocks and apply physics to each.
        this.blocks.forEach(function(block) {
            //enable physics
            game.physics.enable(block, Phaser.Physics.ARCADE);

            block.body.allowRotation=false;
            block.body.immovable = true;
            block.body.friction.x=0;
            block.body.velocity.x = -150;

        });
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
    update: function() {

        // Allow collisions between hero and ground
        game.physics.arcade.collide(this.hero, this.ground, this.onGround, null, this);



        game.physics.arcade.collide(this.hero, this.blocks, this.delayOver, null, this);


        var fchild = this.blocks.getChildAt(0);
        // If off the screen reset the blocks.
        if (fchild.x + this.bwidth < 0) {
            this.makeBlocks();
        }

        // Move the backgrounds
        this.bg0.tilePosition.x -= 0.15;
        this.bg1.tilePosition.x -= 0.30;
        this.bg2.tilePosition.x -= 0.60;



    }
}