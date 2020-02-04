var PreloadState = {
    preload: function() {
        
        this.logo = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo')
        this.logo.anchor.setTo(0.5)
        
        this.preloadBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY+128,'preloadBar')
        this.preloadBar.anchor.setTo(0.5)
        this.load.setPreloadSprite(this.preloadBar);
        
        this.load.image('backyard', '/static/img/backyard.png');
        this.load.image('apple', '/static/img/apple.png');
        this.load.image('candy', '/static/img/candy.png');
        this.load.image('rotate', '/static/img/rotate.png');
        this.load.image('toy', '/static/img/toy.png');
        this.load.image('arrow', '/static/img/arrow.png');
        this.load.spritesheet('pet', '/static/img/pet.png', 97, 83, 5, 1, 1);
    },
    create : function(){
        this.state.start('HomeState');
    }
};
