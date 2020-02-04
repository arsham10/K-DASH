var SpaceHipster = SpaceHipster || {};
SpaceHipster.MenuState = {
    preload: function() {
        this.load.image('space', '/static/img/woodTexture.png')
        this.load.image('nomTime', '/static/img/nomtimelogo.png')
        this.load.image('1player', '/static/img/1player.png')
        this.load.image('2player', '/static/img/2player.png')
    },
    create: function() {

        if (this.game.width == 812) {
            this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
            this.background.autoScroll(0, 30);
            

            this.button = this.game.add.button(this.game.width / 2, this.game.height / 2, '1player');
            this.button.scale.setTo(0.5);
            this.button.anchor.setTo(0.5);
            this.button.inputEnabled = true;
            this.button.events.onInputDown.add(this.onDown, this);
            
            this.button2 = this.game.add.button(this.game.width / 2, 3*this.game.height / 4, '2player');
            this.button2.scale.setTo(0.5);
            this.button2.anchor.setTo(0.5);
            this.button2.inputEnabled = true;
            

            this.nomTime = this.game.add.sprite(this.game.width / 2, this.game.height / 8+25, 'nomTime');
            this.nomTime.scale.setTo(0.75);
            this.nomTime.anchor.setTo(0.5);


        }


        if (this.game.width == 736) {
            this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
            this.background.autoScroll(0, 30);

            this.button = this.game.add.button(this.game.width / 2, this.game.height / 2, '1player');
            this.button.scale.setTo(0.5);
            this.button.anchor.setTo(0.5);
            this.button.inputEnabled = true;
            this.button.events.onInputDown.add(this.onDown, this);
            
            this.button2 = this.game.add.button(this.game.width / 2, 3*this.game.height / 4, '2player');
            this.button2.scale.setTo(0.5);
            this.button2.anchor.setTo(0.5);
            this.button2.inputEnabled = true;

            this.nomTime = this.game.add.sprite(this.game.width / 2, this.game.height / 8+25, 'nomTime');
            this.nomTime.scale.setTo(0.5);
            this.nomTime.anchor.setTo(0.5);
        }

        if (this.game.width == 667) {
            this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
            this.background.autoScroll(0, 30);

            this.button = this.game.add.button(this.game.width / 2, this.game.height / 2, '1player');
            this.button.scale.setTo(0.5);
            this.button.anchor.setTo(0.5);
            this.button.inputEnabled = true;
            this.button.events.onInputDown.add(this.onDown, this);
            
            this.button2 = this.game.add.button(this.game.width / 2, 3*this.game.height / 4, '2player');
            this.button2.scale.setTo(0.5);
            this.button2.anchor.setTo(0.5);
            this.button2.inputEnabled = true;

            this.nomTime = this.game.add.sprite(this.game.width / 2, this.game.height / 8+25, 'nomTime');
            this.nomTime.scale.setTo(0.5);
            this.nomTime.anchor.setTo(0.5);
        }

        if (this.game.width == 1024) {
            this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
            this.background.autoScroll(0, 30);

            this.button = this.game.add.button(this.game.width / 2, this.game.height / 2, '1player');
            this.button.scale.setTo(0.75);
            this.button.anchor.setTo(0.5);
            this.button.inputEnabled = true;
            this.button.events.onInputDown.add(this.onDown, this);
            
            this.button2 = this.game.add.button(this.game.width / 2, 3*this.game.height / 4, '2player');
            this.button2.scale.setTo(0.75);
            this.button2.anchor.setTo(0.5);
            this.button2.inputEnabled = true;

            this.nomTime = this.game.add.sprite(this.game.width / 2 - 340, this.game.height / 8+25, 'nomTime');
        }

        if (this.game.width == 1366) {
            this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
            this.background.autoScroll(0, 30);

            this.button = this.game.add.button(this.game.width / 2, this.game.height / 2, '1player');
            this.button.anchor.setTo(0.5);
            this.button.inputEnabled = true;
            this.button.events.onInputDown.add(this.onDown, this);
            
            this.button2 = this.game.add.button(this.game.width / 2, 3*this.game.height / 4, '2player');
            // this.button2.scale.setTo(0.5);
            this.button2.anchor.setTo(0.5);
            this.button2.inputEnabled = true;

            this.nomTime = this.game.add.sprite(this.game.width / 2 - 380, this.game.height / 8+25, 'nomTime');
            this.nomTime.scale.setTo(1.25);
        }

    },
    onDown : function(){
        SpaceHipster.game.state.start('GameState');
    }

}
