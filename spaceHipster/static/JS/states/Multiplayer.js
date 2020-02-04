var SpaceHipster = SpaceHipster || {};

SpaceHipster.GameState = {
    init: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.PLAYER_SPEED = 200;
        this.BULLET_SPEED = -1000;

        this.numLevels = 3;
        this.currentLevel = this.currentLevel ? this.currentLevel : 1;
        console.log('current level ' + this.currentLevel)
    },
    preload: function() {
        this.load.image('space', '/static/img/woodTexture.png')
        this.load.image('player', '/static/img/ketchup.png')
        this.load.image('bullet', '/static/img/bulletred.png')
        this.load.image('bulletyellow', '/static/img/bulletyellow.png')
        this.load.image('enemyParticle', '/static/img/enemyParticle.png')
        this.load.image('enemyParticleY', '/static/img/enemyParticleyellow.png')
        this.load.image('1player', '/static/img/1player.png')
        this.load.image('2player', '/static/img/2player.png')

        this.load.text('level1', '/static/data/level1.json');
        this.load.text('level2', '/static/data/level2.json');
        this.load.text('level3', '/static/data/level3.json');

        this.load.audio('song', ['/static/audio/8bit-orchestra.mp3', '/static/audio/8bit-orchestra.ogg'])

        this.load.spritesheet('yellowEnemy', '/static/img/pizza.png', 51, 46, 3, 1, 1);
        this.load.spritesheet('redEnemy', '/static/img/donut.png', 51, 46, 3, 1, 1);
        this.load.spritesheet('greenEnemy', '/static/img/green_enemy (8).png', 51, 46, 3, 1, 1);
    },
    create: function() {

        if (this.game.width == 667) {
            this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
            this.background.autoScroll(0, 30);

            this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 10, 'player')
            this.player.scale.setTo(2)
            this.player.anchor.setTo(0.5);
            this.game.physics.enable(this.player);
            this.player.body.collideWorldBounds = true;

            this.initBulllets();
            this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND / 5, this.createPlayerBullet, this)


            this.initEnemies();

            this.loadLevel();

            this.song = this.add.audio('song')
            this.song.play();
        }

        if (this.game.width == 736) {
            this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
            this.background.autoScroll(0, 30);

            this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 10, 'player')
            this.player.scale.setTo(2)
            this.player.anchor.setTo(0.5);
            this.game.physics.enable(this.player);
            this.player.body.collideWorldBounds = true;

            this.initBulllets();
            this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND / 5, this.createPlayerBullet, this)


            this.initEnemies();

            this.loadLevel();

            this.song = this.add.audio('song')
            this.song.play();
        }

        if (this.game.width == 812) {
            this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
            this.background.autoScroll(0, 30);

            this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 10, 'player')
            this.player.scale.setTo(2)
            this.player.anchor.setTo(0.5);
            this.game.physics.enable(this.player);
            this.player.body.collideWorldBounds = true;

            this.initBulllets();
            this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND / 5, this.createPlayerBullet, this)


            this.initEnemies();

            this.loadLevel();

            this.song = this.add.audio('song')
            this.song.play();
        }

        if (this.game.width == 1024) {
            this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
            this.background.autoScroll(0, 30);

            this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 10, 'player')
            this.player.scale.setTo(2)
            this.player.anchor.setTo(0.5);
            this.game.physics.enable(this.player);
            this.player.body.collideWorldBounds = true;

            this.initBulllets();
            this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND / 5, this.createPlayerBullet, this)


            this.initEnemies();

            this.loadLevel();

            this.song = this.add.audio('song')
            this.song.play();
        }

        if (this.game.width == 1366) {
            this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
            this.background.autoScroll(0, 30);

            this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 10, 'player')
            this.player.scale.setTo(2)
            this.player.anchor.setTo(0.5);
            this.game.physics.enable(this.player);
            this.player.body.collideWorldBounds = true;

            this.initBulllets();
            this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND / 5, this.createPlayerBullet, this)


            this.initEnemies();

            this.loadLevel();

            this.song = this.add.audio('song')
            this.song.play();
        }


    },
    update: function() {

        this.game.physics.arcade.overlap(this.playerBullets, this.enemies, this.damageEmeny, null, this);
        this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.killPLayer, null, this);

        this.player.body.velocity.x = 0;

        if (this.game.input.activePointer.isDown) {
            var targetX = this.game.input.activePointer.position.x;

            var direction = targetX >= this.game.world.centerX ? 1 : -1;

            this.player.body.velocity.x = direction * this.PLAYER_SPEED;


        }
    },
    initBulllets: function() {
        this.playerBullets = this.add.group();
        this.playerBullets.enableBody = true;
    },
    createPlayerBullet: function() {
        var bullet = this.playerBullets.getFirstExists(false);

        if (!bullet) {
            bullet = new SpaceHipster.PlayerBullet(this.game, this.player.x, this.player.top);
            this.playerBullets.add(bullet);
        }
        else {
            bullet.reset(this.player.x, this.player.top)
        }
        bullet.body.velocity.y = this.BULLET_SPEED;
    },
    initEnemies: function() {
        this.enemies = this.add.group();
        this.enemies.enableBody = true;

        this.enemyBullets = this.add.group();
        this.enemyBullets.enableBody = true;

    },
    damageEmeny: function(bullet, enemy) {
        enemy.damage(1);

        bullet.kill();
    },
    killPLayer: function() {
        this.player.kill();
        this.song.stop();
        this.game.state.start('GameState');
    },
    createEnemy: function(x, y, health, key, scale, speedX, speedY) {
        var enemy = this.enemies.getFirstExists(false);

        if (!enemy) {
            //ebugger
            enemy = new SpaceHipster.Enemy(this.game, x, y, key, health, this.enemyBullets);
            this.enemies.add(enemy);
        }
        enemy.reset(x, y, health, key, scale, speedX, speedY);
    },
    loadLevel: function() {

        this.currentEnemyIndex = 0;

        this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));

        this.endOfLevelTimer = this.game.time.events.add(this.levelData.duration * 1000, function() {
            console.log('level ended');
            this.song.stop();

            if (this.currentLevel < this.numLevels) {
                this.currentLevel++;
            }
            else {
                this.currentLevel = 1;
            }
            this.game.state.start('GameState', true, false, this.currentLevel);
        }, this)

        this.scheduleNextEnemy();
    },
    scheduleNextEnemy: function() {
        var nextEnemy = this.levelData.enemies[this.currentEnemyIndex]

        if (nextEnemy) {
            var nextTime = 1000 * (nextEnemy.time - (this.currentEnemyIndex == 0 ? 0 :
                this.levelData.enemies[this.currentEnemyIndex - 1].time));

            this.nextEnemyTimer = this.game.time.events.add(nextTime, function() {
                this.createEnemy(nextEnemy.x * this.game.world.width, -100, nextEnemy.health,
                    nextEnemy.key, nextEnemy.scale, nextEnemy.speedX, nextEnemy.speedY);

                this.currentEnemyIndex++;
                this.scheduleNextEnemy();
            }, this)
        }
    }

}
