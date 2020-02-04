var game = new Phaser.Game('100%', '100%', Phaser.AUTO);

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function add_player(player, game) {
    player.animations.add('walking', [0, 1, 2, 1], 6, true);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.customParams = {};
    player.body.allowGravity = true;
    game.camera.follow(player);
}

function add_platform(platform, game, scale) {
    game.physics.enable(platform, Phaser.Physics.ARCADE);
    platform.body.allowGravity = false;
    platform.body.immovable = true;
    platform.scale.setTo(scale)
}

var platforms_collide_names = [];
var barrel_size;
var end_game_text_scale;

var GameState = {
    init: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 1000;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.game.world.setBounds(0, 0, this.game.width, 2000);

        this.RUNNING_SPEED = 180;
        this.JUMPING_SPEED = 700;
        game.stage.backgroundColor = "#4488AA";
[]
    },
    preload: function() {

        this.load.image('ground', 'static/img/bestground.png');
        this.load.image('platform', 'static/img/ground (1).png');
        this.load.spritesheet('goalori', 'static/img/gorilla3 (1).png', 28, 52, 5, 1, 1);
        this.load.spritesheet('goal', 'static/img/grasshopper.png', 56, 104, 5, 1, 1);
        this.load.spritesheet('goal1.5', 'static/img/grasshopper1.5.png', 42, 78, 5, 1, 1);
        this.load.image('arrowButton', 'static/img/arrowButton.png');
        this.load.image('actionButton', 'static/img/actionButton.png');
        this.load.image('barrel', 'static/img/barrel.png');
        this.load.image('eniac', 'static/img/eniac.png');

        // this.load.audio('click', ['/static/audio/click.ogg','/static/audio/click.mp3']);
        // this.load.image('eniac', 'static/img/eniac.png');

        this.load.spritesheet('player', 'static/img/player.png', 28, 30, 5, 1, 1);
        this.load.spritesheet('playerS1.5', 'static/img/playerS1.5.png', 42, 45, 5, 1, 1);
        this.load.spritesheet('playerS2', 'static/img/playerS2.png', 56, 60, 5, 1, 1);
        this.load.spritesheet('playerS1.2', 'static/img/playerS1.2.png', 56, 60, 5, 1, 1);
        // this.load.spritesheet('player375', 'static/img/player.png', 28, 30, 5, 1, 1);
        // this.load.spritesheet('player414', 'static/img/player.png', 28, 30, 5, 1, 1);
        this.load.image('barrel0.55', 'static/img/barrel0.55.png');
        this.load.image('barrel0.60', 'static/img/barrel0.60.png');
        this.load.image('barrel1.5', 'static/img/barrel1.5.png');
        this.load.image('barrel1.15', 'static/img/barrel1.15.png');


        this.load.spritesheet('fire', 'static/img/fire_spritesheet.png', 20, 21, 2, 1, 1);

        this.load.text('level', 'static/data/level.json');
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    },
    create: function() {

        this.ground = this.add.sprite(0, (2000 - 125), 'ground');
        // this.ground = this.add.sprite(0, game.height/2, 'ground');
        // this.ground.scale.setTo(5)
        game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;
        // this.ground.height = game.height / 7;
        // this.ground.width = game.width;
        // this.ground.height = game.height / 7;
        // this.ground.width = game.width;
        // console.log(game.height / 7)


        //parse the file

        this.levelData = JSON.parse(game.cache.getText('level'));
        // this.cache.addJSON('yourKey', null, levelData);
        // console.log(this.levelData);

        // this.platforms = this.add.group();
        // this.platforms.enableBody = true;

        // this.counter = 0;
        // this.platform_x = 0;
        // this.platform_y = 0;
        // // platformData.forEach(function(element) {
        // this.levelData.platformData.forEach(function(element) {
        //     this.platforms.create(this.platform_x, this.platform_y, 'platform');
        //     console.log(this.platform_x, this.platform_y)
        // }, this);



        var click = game.add.audio('click');

        // this.eniac = this.add.sprite(this.levelData.goal.x - 60, this.levelData.goal.y - 7, 'eniac')
        // this.eniac.scale.setTo(2)
        // this.goal = this.add.sprite(this.levelData.goal.x, this.levelData.goal.y, 'goal')
        // this.goal.animations.add('yeet', [1, 2, 3], 2, true);
        // this.goal.play('yeet')
        // this.game.physics.arcade.enable(this.goal);
        // this.goal.body.allowGravity = false;

        // this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player', 3);

        this.fires = this.add.group();
        this.fires.enableBody = true;

        var fire;

        // ipad pro
        if (game.width == 1024) { 
            this.player = this.add.sprite(60, 2000 - 200, 'playerS2', 0);
            add_player(this.player, this.game);
            this.RUNNING_SPEED = 300;
            barrel_size = "barrel";
            end_game_text_scale = 0.9
            var value_reducter = 420;
            var platforms = { "platform_1": [this.game.width / 2 - (135 + 68), 1650], "platform_2": [0, 1450], "platform_3": [this.game.width - 270 * 1.5, 1450] };
            var platform_high = 1450
            var double_platform_y = [platform_high, platform_high - 420, platform_high - 840]
            for (var i = 1; i < 5; i++) {
                var platform_name = "platform_" + i.toString();
                for (var p in platforms) {
                    this.platform_name = this.game.add.sprite(platforms[p][0], platforms[p][1], 'platform');
                    add_platform(this.platform_name, this.game, 1.5);

                    if (double_platform_y.includes(platforms[p][1])) {
                        fire = this.fires.create(platforms[p][0] + this.platform_name.width / 2, platforms[p][1] - 50, 'fire');
                        fire.scale.setTo(2);
                        fire.animations.add('fire', [0, 1], 4, true);
                        fire.play('fire');
                    }
                    this.fires.setAll('body.allowGravity', false);

                    platforms[p][1] -= value_reducter;
                    platforms_collide_names.push(this.platform_name)
                }
            }
            this.eniac = this.add.sprite(0, 75, 'eniac')
            this.eniac.scale.setTo(2.5)

            this.goal = this.add.sprite(100, 97, 'goal')
            this.goal.animations.add('yeet', [1, 2, 3], 2, true);
            this.goal.play('yeet')
            this.game.physics.arcade.enable(this.goal);
            this.goal.body.allowGravity = false;

            // // this.platform1 = add_platform(this.platform1, this.game.width / 2 - (135 + 68), 1650, 'platform', this.game);
            // this.platform1 = this.game.add.sprite(this.game.width/2-(135+68), 1650, 'platform');
            // add_platform(this.platform1, this.game);

            // this.platform2 = this.game.add.sprite(0, 1450, 'platform');
            // add_platform(this.platform2, this.game);

            // this.platform3 = this.game.add.sprite(this.game.width-270*1.5, 1450, 'platform');
            // add_platform(this.platform3, this.game);

            // this.platform4 = this.game.add.sprite(0, 1400, 'platform');
            // add_platform(this.platform4, this.game);

            // this.platform5 = this.game.add.sprite(this.game.width-270*1.5, 1400, 'platform');
            // add_platform(this.platform5, this.game);

            // this.platform6 = this.game.add.sprite(this.game.width/2-(135+68), 1400, 'platform');
            // add_platform(this.platform6, this.game);

        }
        // ipad
        if (game.width == 768) {
            this.player = this.add.sprite(60, 2000 - 200, 'playerS1.5', 0);
            add_player(this.player, this.game);
            value_reducter = 420;
            barrel_size = "barrel1.15";
            end_game_text_scale = 0.7
            scale = 1.15;
            platforms = { "platform_1": [(this.game.width - 270 * scale) / 2, 1650], "platform_2": [0, 1450], "platform_3": [this.game.width - 270 * scale, 1450] };
            var platform_high = 1450
            var double_platform_y = [platform_high, platform_high - 420, platform_high - 840]
            for (var i = 1; i < 5; i++) {
                platform_name = "platform_" + i.toString();
                for (var p in platforms) {
                    this.platform_name = this.game.add.sprite(platforms[p][0], platforms[p][1], 'platform');
                    add_platform(this.platform_name, this.game, scale);
                    if (double_platform_y.includes(platforms[p][1])) {
                        fire = this.fires.create(platforms[p][0] + this.platform_name.width / 2, platforms[p][1] - 50, 'fire');
                        fire.scale.setTo(1.6);
                        fire.animations.add('fire', [0, 1], 4, true);
                        fire.play('fire');
                    }
                    this.fires.setAll('body.allowGravity', false);
                    platforms[p][1] -= value_reducter;
                    platforms_collide_names.push(this.platform_name)
                }
            }
            this.eniac = this.add.sprite(0, 110, 'eniac')
            this.eniac.scale.setTo(1.5)

            this.goal = this.add.sprite(95, 120, 'goal1.5')
            this.goal.animations.add('yeet', [1, 2, 3], 2, true);
            this.goal.play('yeet')
            this.game.physics.arcade.enable(this.goal);
            this.goal.body.allowGravity = false;
            // this.player.anchor.setTo(0.5);
            // this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
            // game.physics.enable(this.player, Phaser.Physics.ARCADE);
            // this.player.customParams = {};
            // this.player.body.allowGravity = true;
            // this.game.camera.follow(this.player);
        }
        // iphone X also iphone 6/7/8
        if (game.width == 375) {
            this.player = this.add.sprite(60, 2000 - 200, 'player', 0);
            add_player(this.player, this.game);
            value_reducter = 420;
            barrel_size = "barrel0.55";
            end_game_text_scale = 0.4
            scale = 0.55;
            platforms = { "platform_1": [(this.game.width - 270 * scale) / 2, 1650], "platform_2": [0, 1450], "platform_3": [this.game.width - 270 * scale, 1450] };
            var platform_high = 1450
            var double_platform_y = [platform_high, platform_high - 420, platform_high - 840]
            for (var i = 1; i < 5; i++) {
                platform_name = "platform_" + i.toString();
                for (var p in platforms) {
                    this.platform_name = this.game.add.sprite(platforms[p][0], platforms[p][1], 'platform');
                    add_platform(this.platform_name, this.game, scale);
                    if (double_platform_y.includes(platforms[p][1])) {
                        fire = this.fires.create(platforms[p][0] + this.platform_name.width / 2, platforms[p][1] - 30, 'fire');
                        fire.scale.setTo(1.15);
                        fire.animations.add('fire', [0, 1], 4, true);
                        fire.play('fire');
                    }
                    this.fires.setAll('body.allowGravity', false);
                    platforms[p][1] -= value_reducter;
                    platforms_collide_names.push(this.platform_name)
                }

            }
            this.eniac = this.add.sprite(0, 130, 'eniac')
            this.eniac.scale.setTo(1.2)

            this.goal = this.add.sprite(70, 145, 'goalori')
            this.goal.animations.add('yeet', [1, 2, 3], 2, true);
            this.goal.play('yeet')
            this.game.physics.arcade.enable(this.goal);
            this.goal.body.allowGravity = false;
        }

        if (game.width == 414) {
            this.player = this.add.sprite(60, 2000 - 200, 'playerS1.5', 0);
            add_player(this.player, this.game);
            value_reducter = 420;
            barrel_size = "barrel0.60";
            end_game_text_scale = 0.5
            scale = 0.60;
            platforms = { "platform_1": [(this.game.width - 270 * scale) / 2, 1650], "platform_2": [0, 1450], "platform_3": [this.game.width - 270 * scale, 1450] };
            var platform_high = 1450
            var double_platform_y = [platform_high, platform_high - 420, platform_high - 840]
            for (var i = 1; i < 5; i++) {
                platform_name = "platform_" + i.toString();
                for (var p in platforms) {
                    this.platform_name = this.game.add.sprite(platforms[p][0], platforms[p][1], 'platform');
                    add_platform(this.platform_name, this.game, scale);
                    if (double_platform_y.includes(platforms[p][1])) {
                        fire = this.fires.create(platforms[p][0] + this.platform_name.width / 2, platforms[p][1] - 30, 'fire');
                        fire.scale.setTo(1.25);
                        fire.animations.add('fire', [0, 1], 4, true);
                        fire.play('fire');
                    }
                    this.fires.setAll('body.allowGravity', false);
                    platforms[p][1] -= value_reducter;
                    platforms_collide_names.push(this.platform_name)
                }

            }
            this.eniac = this.add.sprite(0, 130, 'eniac')
            this.eniac.scale.setTo(1.2)

            this.goal = this.add.sprite(70, 145, 'goalori')
            this.goal.animations.add('yeet', [1, 2, 3], 2, true);
            this.goal.play('yeet')
            this.game.physics.arcade.enable(this.goal);
            this.goal.body.allowGravity = false;
            // this.player.anchor.setTo(0.5);
            // this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
            // game.physics.enable(this.player, Phaser.Physics.ARCADE);
            // this.player.customParams = {};
            // this.player.body.allowGravity = true;
            // this.game.camera.follow(this.player);
        }

        this.createOnScreenControlls();

        this.barrels = this.add.group();
        this.barrels.enableBody = true;
        console.log(barrel_size);
        this.createBarrel();
        this.barrelCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.barrelFrequency, this.createBarrel, this);

    },
    update: function() {
        this.game.physics.arcade.collide(this.player, this.ground)
        for (var i = 0; i < platforms_collide_names.length; i++) {
            this.game.physics.arcade.collide(this.player, platforms_collide_names[i])
            this.game.physics.arcade.collide(this.barrels, platforms_collide_names[i])
        }

        this.game.physics.arcade.collide(this.barrels, this.ground)

        this.game.physics.arcade.collide(this.player, this.barrels, this.killPlayer);


        this.game.physics.arcade.overlap(this.player, this.fires, this.killPlayer);
        this.game.physics.arcade.overlap(this.player, this.goal, this.win);

        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
            this.player.body.velocity.x = -this.RUNNING_SPEED;
            this.player.scale.setTo(1, 1);
            this.player.play('walking');
        }
        else if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
            this.player.body.velocity.x = this.RUNNING_SPEED;
            this.player.scale.setTo(-1, 1);
            this.player.play('walking');
        }
        else {
            this.player.animations.stop()
            this.player.frame = 3
        }
        if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
            this.player.body.velocity.y = -this.JUMPING_SPEED;
            this.player.customParams.mustJump = false;
        }

        // this.barrels.forEach(function(){
        //     if(this.element.x<10 && this.element.y > 600){
        //         this.element.kill();
        //     }
        // },this)
    },
    createOnScreenControlls: function() {


        this.graphics = this.game.add.graphics()
        this.graphics.lineStyle(2, 808080, 1);
        this.graphics.beginFill(808080, 1);
        this.graphics.drawRect(0, this.game.height - 95, this.game.width, this.game.height);
        this.graphics.endFill();

        this.graphics.fixedToCamera = true;

        this.leftArrow = this.add.button(1, this.game.height - 87, 'arrowButton');
        this.rightArrow = this.add.button(80, this.game.height - 87, 'arrowButton');


        this.rightArrow.scale.setTo(-1.5, 1.5);
        this.leftArrow.scale.setTo(1.5);

        // this.actionButton = this.add.button(280, 6*this.game.height/8 + 100, 'actionButton');
        this.actionButton = this.add.button(this.game.width - 110, this.game.height - 87, 'actionButton');
        this.actionButton.scale.setTo(1.5)

        this.rightArrow.anchor.setTo(1, 0)

        this.leftArrow.fixedToCamera = true;
        this.rightArrow.fixedToCamera = true;
        this.actionButton.fixedToCamera = true;

        this.actionButton.events.onInputDown.add(function() {
            this.player.customParams.mustJump = true

        }, this)

        this.actionButton.events.onInputUp.add(function() {
            this.player.customParams.mustJump = false
        }, this)

        this.actionButton.events.onInputOver.add(function() {
            this.player.customParams.mustJump = true
        }, this)

        this.actionButton.events.onInputOut.add(function() {
            this.player.customParams.mustJump = false
        }, this)

        this.leftArrow.events.onInputDown.add(function() {
            this.player.customParams.isMovingLeft = true
        }, this)

        this.leftArrow.events.onInputUp.add(function() {
            this.player.customParams.isMovingLeft = false
        }, this)

        this.leftArrow.events.onInputOver.add(function() {
            this.player.customParams.isMovingLeft = true
        }, this)

        this.leftArrow.events.onInputOut.add(function() {
            this.player.customParams.isMovingLeft = false
        }, this)

        this.rightArrow.events.onInputDown.add(function() {
            this.player.customParams.isMovingRight = true
        }, this)

        this.rightArrow.events.onInputUp.add(function() {
            this.player.customParams.isMovingRight = false
        }, this)

        this.rightArrow.events.onInputOver.add(function() {
            this.player.customParams.isMovingRight = true
        }, this)

        this.rightArrow.events.onInputOut.add(function() {
            this.player.customParams.isMovingRight = false
        }, this)


    },

    killPlayer: function(player, fire) {
        console.log('ouch!')
        game.state.start('game')
    },

    win: function(player, goal) {
        // alert('You Win!')
        // game.state.start('gameover')
        stateContext.switchState('gameover');
    },

    createBarrel: function() {
        var barrel = this.barrels.getFirstExists(false);
        if (!barrel) {
            barrel = this.barrels.create(0, 0, barrel_size);
            barrel.scale.setTo(2)
        }

        barrel.body.collideWorldBounds = true;
        this.player.body.collideWorldBounds = true;
        barrel.body.bounce.set(1, 0);

        barrel.reset(this.levelData.goal.x, this.levelData.goal.y);
        barrel.body.velocity.x = this.levelData.barrelSpeed;
    },
    createBarrelX678plus: function() {
        var barrel = this.barrels.getFirstExists(false);
        if (!barrel) {
            barrel = this.barrels.create(0, 0, 'barrel1.5');
            barrel.scale.setTo(2)
        }

        barrel.body.collideWorldBounds = true;
        this.player.body.collideWorldBounds = true;
        barrel.body.bounce.set(1, 0);

        barrel.reset(this.levelData.goal.x, this.levelData.goal.y);
        barrel.body.velocity.x = this.levelData.barrelSpeed;
    },
    createBarrelX678: function() {
        var barrel = this.barrels.getFirstExists(false);
        if (!barrel) {
            barrel = this.barrels.create(0, 0, 'barrel1.1.5');
            barrel.scale.setTo(2)
        }

        barrel.body.collideWorldBounds = true;
        this.player.body.collideWorldBounds = true;
        barrel.body.bounce.set(1, 0);

        barrel.reset(this.levelData.goal.x, this.levelData.goal.y);
        barrel.body.velocity.x = this.levelData.barrelSpeed;
    },
};
var Gameover = {
    preload: function() {
        this.load.image('eniacLogo', 'static/img/eniacattacklogo.png');
    },
    create: function() {
        this.eniac = game.add.sprite(this.game.width / 2, this.game.height / 8, 'eniacLogo');
        this.eniac.anchor.setTo(0.5)
        this.eniac.scale.setTo(end_game_text_scale)
        
        var font = "bold " + (70*end_game_text_scale).toString() + "px Arial"
        
        var style = { font: font, fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };


        this.text = game.add.text(0, 0, "Play Again", style);
        this.text.x = (game.width-this.text.width)/2
        this.text.y = game.height / 2
        this.text.inputEnabled = true;
        this.text.events.onInputDown.add(function(){
            game.state.start('game');
        }, this);
    }
}
// define all the states that u have in this object:
var stateContext = {
    // define all states here:
    states: {
        game: GameState,
        gameover: Gameover,
    },

    // this is the function for switching between states:
    switchState: function(state) {
        // Add the 'mainState' and call it 'main'
        if (!(state in game.state.states)) {
            game.state.add(state, this.states[state]);
        }
        // Start the state to actually start the game
        game.state.start(state);
    }
}
// and then switch between states with this method:
stateContext.switchState('game');