class JogoPlataforma extends Phaser.Scene {
    constructor() {
        super({ key: 'JogoPlataforma' });
    }

    preload() {
        this.load.image('player', 'https://via.placeholder.com/50'); // Placeholder do jogador
        this.load.image('plataforma', 'https://via.placeholder.com/100x20'); // Placeholder de plataforma
    }

    create() {
        this.add.text(20, 20, 'Jogo de Plataforma!', { font: '18px Arial', fill: '#ffffff' });
        
        // Adiciona plataformas
        this.plataformas = this.physics.add.staticGroup();
        this.plataformas.create(200, 400, 'plataforma');
        this.plataformas.create(400, 300, 'plataforma');
        this.plataformas.create(600, 200, 'plataforma');
        
        // Adiciona o jogador
        this.player = this.physics.add.sprite(100, 350, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.physics.add.collider(this.player, this.plataformas);
        
        // Controles do jogador
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-300);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { default: 'arcade', arcade: { gravity: { y: 500 }, debug: false } },
    scene: JogoPlataforma
};

const game = new Phaser.Game(config);
