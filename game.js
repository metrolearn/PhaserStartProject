window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    var score = 0;
    var scoreText;
    var witches;
    var lastWitch = new Date();

    function preload() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.image('witch', 'assets/witch.png');
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');

        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        platforms = game.add.group();
        platforms.enableBody = true;

        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        // The player and its settings
        player = game.add.sprite(32, game.world.height - 150, 'dude');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        cursors = game.input.keyboard.createCursorKeys();

        stars = game.add.group();
        stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 70, 0, 'star');

            //  Let gravity do its thing
            star.body.gravity.y = 6;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        witches = game.add.group();
        witches.enableBody = true;
        jumping = false;
        hit = false;
    }

    function update() {
        //  Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);

        //  Reset the players velocity (movement)
        if (!cursors.left.isDown || !cursors.right.isDown || !jumping)
        {
            player.body.velocity.x = player.body.velocity.x * 0.8;
        }

        if (cursors.left.isDown)
        {
            //  Move to the left
            if (player.body.velocity.x != -150)
            {
                player.body.velocity.x += -25;
            }
            else{
                player.body.velocity.x += -10;
            }

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right

            if (player.body.velocity.x != 150)
            {
                player.body.velocity.x += 25;
            }
            else{
                player.body.velocity.x += 10;
            }

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();
            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown)
        {
            if (player.body.touching.down && hitPlatform)
            {
                jumpspeed = 30;
                jumping = true;
                player.body.velocity.y = -150;
            }
            if (player.body.velocity.y  > -300 && jumping)
            {
                player.body.velocity.y -= jumpspeed;
                jumpspeed = jumpspeed * 0.99;
                if (player.body.velocity.y < -300)
                {
                    jumping = false;
                }
            }
        }

        if (!cursors.up.isDown)
        {
            jumping = false
        }

        game.physics.arcade.collide(stars, platforms);

        game.physics.arcade.overlap(player, stars, collectStar, null, this);

        // make a witch if the last witch disappeared 5 seconds ago
        var now = new Date();
        if ((now.getTime() - 5000) > lastWitch.getTime()) {
            makeWitch();
            lastWitch = now;
        }
        game.physics.arcade.overlap(player, witches, endGame, null, this);
    }

    function collectStar (player, star) {

        // Removes the star from the screen
        star.kill();

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;

    }

    function makeWitch() {

        // choose a random height for the witch
        var ypos = (Math.floor((Math.random() * 4))  * 160);

        // decide if the witch starts on the left or right and which direction she moves
        var side = Math.floor(Math.random() * 2);
        var xpos = 0;
        var velocity = 200;
        if (side == 1) {
            xpos = 800;
            velocity = -200;
        }


        console.log(ypos, side);

        // add the witch
        witch = witches.create(xpos, ypos, 'witch');

        // get the witch moving
        witch.body.velocity.x = velocity;

        witch.checkWorldBounds = true;
        witch.outOfBoundsKill = true;
    }

    function endGame() {
        while (1 == 1)
        {
            player.y += 1;
        }
        game.lockRender = true;
    }

}
