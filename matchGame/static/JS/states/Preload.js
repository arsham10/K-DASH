 var Match3 = Match3 || {};
 
 Match3.PreloadState = {
     preload : function(){
         this.preloadBar = this.add.sprite('bar',this.game.world.centerX,this.game.world.centerY);
         this.preloadBar.anchor.setTo(0.5);
         this.preloadBar.scale.setTo(100,1);
         this.load.setPreloadSprite(this.preloadBar);
         
         this.load.image('block1','/static/img/bean_blue.png')
         this.load.image('block2','/static/img/bean_green.png')
         this.load.image('block3','/static/img/bean_orange.png')
         this.load.image('block4','/static/img/bean_pink.png')
         this.load.image('block5','/static/img/bean_purple.png')
         this.load.image('block6','/static/img/bean_yellow.png')
         this.load.image('block7','/static/img/bean_red.png')
         this.load.image('block8','/static/img/bean_white.png')
         this.load.image('deadBlock','/static/img/bean_dead.png')
         this.load.image('background','/static/img/backyard2.png')
         this.load.image('bar','/static/img/preloader-bar.png')
     },
     create:function(){
         this.state.start('Game'); 
     }
 }