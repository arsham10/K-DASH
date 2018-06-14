// Defines Game Canvas
var game = new Phaser.Game(640, 360, Phaser.AUTO);

// Makes The State For The Game
var GameState = {
    preload: function() {
        this.load.image('background', '/static/img/background.png');
        this.load.image('arrow', '/static/img/arrow.png');
        this.load.image('chicken', '/static/img/chicken.png');
        this.load.image('horse', '/static/img/horse.png');
        this.load.image('pig', '/static/img/pig.png');
        this.load.image('sheep', '/static/img/sheep3.png');
    },

    create: function() {

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // This Puts The Background Image At The Coordinates At 0,0
        this.background = this.game.add.sprite(0, 0, 'background');

        // This Part Add The pig Image In The Middle Of The World
        this.pig = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'pig');
        this.pig.anchor.setTo(0.5, 0.5);
        
        this.pig.inputEnabled = true;
        this.pig.input.pixelPerfectClick = true;
        this.pig.events.onInputDown.add(this.animateAnimal,this);
        
        // left arrow
        this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.x = -1;
        this.leftArrow.customParams = { direction: -1 }

        // left arrow allow user input
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);


        // right arrow
        this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.customParams = { direction: 1 }

        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

    },

    update: function() {},
    switchAnimal: function(sprite, event) {
        console.log('move animal');
    },
    animateAnimal: function(sprite, event) {
        console.log('animate animal');
    }
};

// This Assigns the GameState To The Game
game.state.add('GameState', GameState);
// This Starts The GameState
game.state.start('GameState');
