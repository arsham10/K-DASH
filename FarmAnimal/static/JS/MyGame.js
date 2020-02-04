// Defines Game Canvas


// Makes The State For The Game
var GameState = {
    preload: function() {
        this.load.image('background', '/FarmAnimal/static/img/background.png');
        this.load.image('arrow', '/FarmAnimal/static/img/arrow.png');
        // this.load.image('chicken', '/static/img/chicken.png');
        // this.load.image('pig', '/static/img/pig.png');
        // this.load.image('sheep', '/static/img/sheep3.png');
        
        this.load.spritesheet('chicken', '/FarmAnimal/static/img/chicken_spritesheet.png',131,200,3);
        this.load.spritesheet('horse', '/FarmAnimal/static/img/horse_spritesheet.png',212,200,3);
        this.load.spritesheet('pig', '/FarmAnimal/static/img/pig_spritesheet.png',297,200,3);
        this.load.spritesheet('sheep', '/FarmAnimal/static/img/sheep_spritesheet.png',244,200,3);
        
        this.load.audio('chickenSound', ['/FarmAnimal/static/audio/chicken.ogg','/static/audio/chicken.mp3']);
        this.load.audio('horseSound', ['/FarmAnimal/static/audio/horse.ogg','/static/audio/horse.mp3']);
        this.load.audio('pigSound', ['/FarmAnimal/static/audio/pig.ogg','/static/audio/pig.mp3']);
        this.load.audio('sheepSound', ['/FarmAnimal/static/audio/sheep.ogg','/static/audio/sheep.mp3']);
    },

    create: function() {

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // This Puts The Background Image At The Coordinates At 0,0
        this.background = this.game.add.sprite(0, 0, 'background');
        
        var animalData = [
            {key:'chicken', text:'CHICKEN', audio:'chickenSound'},
            {key:'horse', text:'HORSE', audio:'horseSound'},
            {key:'pig', text:'PIG', audio:'pigSound'},
            {key:'sheep', text:'SHEEP', audio:'sheepSound'}
            ];
        
        
        this.animals = this.game.add.group();
        
        var self = this;
        var animal;
        
        animalData.forEach(function(element){
            // makes a group of sprites
            animal = self.animals.create(-1000, this.game.world.centerY,element.key,0);
            
            // adds a custom parameter for getting the text of the animal
            animal.customParams = {text: element.key,sound : self.game.add.audio(element.audio)};
            
            // sets the anchor of all the sprites to 0.5
            animal.anchor.setTo(0.5);
            
            animal.animations.add('animate',[0,1,2,1,0,1], 3, false);
            
            // this lets you to be able to click the animals
            animal.inputEnabled = true;
            
            // this part lets you to click exactly on the animal instead of click on a box
            animal.input.pixelPerfectClick = true;
            
            // this part assigns the animal group a custon parameter for animating it
            animal.events.onInputDown.add(self.animateAnimal, self);
            
            
        });
        
        this.currentAnimal = this.animals.next();
        
        // sets the animal which is out of screen to the middle of the screen
        this.currentAnimal.position.set(this.game.world.centerX,this.game.world.centerY);
        
        this.showText(this.currentAnimal);
        
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
        
        // this is for the right arrow which has the custon parameter switchAnimal
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

    },

    update: function() {},
    
    animateAnimal: function(sprite, event) {
        sprite.play('animate');
        
        sprite.customParams.sound.play();
    },
        switchAnimal: function(sprite, event) {
            
        if(this.isMoving){
            return false;
        }
        
        this.isMoving = true;
        
        this.animalText.visible = false;
        
        // makes 2 variables for the end of the screen and the new animals
        var newAnimal, endX;
        
        // this checks if the direction of the arrow is more than 0 if you move the sprite of the screen if not it would bring in to the middle
        if(sprite.customParams.direction > 0){
            newAnimal = this.animals.next();
            newAnimal.x = -newAnimal.width/2;
            endX = 640 + this.currentAnimal.width/2;
        }
        else{
            newAnimal = this.animals.previous();
            newAnimal.x = 640 + newAnimal.width/2;
            endX = -this.currentAnimal.width/2;
        }
        // this sets the coordinates of the currentAnimal to the end
        // this.currentAnimal.x = endX;
        
        // // this part brings the new animal to the middle of the screen
        // newAnimal.x = this.game.world.centerX;
        
        // this makes a new variable animal movement and it includes tween
        var newAnimalMovement = this.game.add.tween(newAnimal);
        
        // this sets the animals x to 1000 in an animations
        newAnimalMovement.to({x: this.game.world.centerX}, 1000);
        
        
        newAnimalMovement.onComplete.add(function(){
            this.isMoving = false;
            this.showText(newAnimal);
        },this);
        
        // this starts the animation
        newAnimalMovement.start();
        
        // this makes a new variable animal movement and it includes tween
        var currentAnimalMovement = game.add.tween(this.currentAnimal)
            
        // this sets the animals x to 1000 in an animations
        currentAnimalMovement.to({x: endX}, 1000);
        
        // this starts the animation
        currentAnimalMovement.start();
        
        // then it sets the currentAnimal to the newAnimal
        this.currentAnimal = newAnimal;
    },
    showText : function(animal){
        var style = {
            font: 'bold 30pt Arial',
            fill: '#ff0000',
            align: 'center'
        }
        if(!this.animalText){
            this.animalText = this.game.add.text(this.game.width/2,this.game.height*0.85,'',style)
            this.animalText.anchor.setTo(0.5);
        }
        this.animalText.setText(animal.customParams.text); 
        this.animalText.visible = true;
    }
};

var game = new Phaser.Game(640, 360, Phaser.AUTO);

// This Assigns the GameState To The Game
game.state.add('GameState', GameState);
// This Starts The GameState
game.state.start('GameState');
