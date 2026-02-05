class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        // Titre
        this.add.text(300, 80, 'INDIE CROSS', { fontSize: '40px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(300, 120, 'THE KNIGHT FIGHT', { fontSize: '20px', fill: '#00ffff' }).setOrigin(0.5);

        // Zone du portrait (Le carré blanc que tu voyais)
        // Je l'ai réduit pour qu'il ne cache pas le reste
        this.add.rectangle(300, 250, 150, 200, 0x1a1a1a).setStrokeStyle(2, 0xffffff);
        this.add.text(300, 250, '[PHOTO DU BOSS]', { fontSize: '14px', fill: '#555' }).setOrigin(0.5);

        // LE BOUTON START (L'élément le plus important)
        // On crée un rectangle orange pour qu'il soit bien visible
        let btnBox = this.add.rectangle(300, 450, 220, 60, 0xffa500).setInteractive({ useHandCursor: true });
        let btnText = this.add.text(300, 450, 'COMMENCER', { fontSize: '24px', fill: '#000', fontStyle: 'bold' }).setOrigin(0.5);

        // Interaction du bouton
        btnBox.on('pointerover', () => { btnBox.setFillStyle(0xffffff); });
        btnBox.on('pointerout', () => { btnBox.setFillStyle(0xffa500); });
        
        // C'est ici que l'on passe au combat !
        btnBox.on('pointerdown', () => {
            console.log("Lancement du combat...");
            this.scene.start('BattleScene');
        });
    }
}

class BattleScene extends Phaser.Scene {
    constructor() {
        super('BattleScene');
    }

    create() {
        this.add.text(20, 20, 'COMBAT EN COURS...', { fill: '#0f0' });
        
        // Boîte de combat
        this.add.graphics().lineStyle(4, 0xffffff).strokeRect(150, 250, 300, 300);

        // Joueur (Cœur rouge)
        this.player = this.add.rectangle(300, 400, 16, 16, 0xff0000);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        let speed = 200;
        this.player.body.setVelocity(0);
        if (this.cursors.left.isDown) this.player.body.setVelocityX(-speed);
        if (this.cursors.right.isDown) this.player.body.setVelocityX(speed);
        if (this.cursors.up.isDown) this.player.body.setVelocityY(-speed);
        if (this.cursors.down.isDown) this.player.body.setVelocityY(speed);
    }
}

// CONFIGURATION FINALE
const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#000000',
    physics: { default: 'arcade' },
    scene: [MainMenu, BattleScene] // MainMenu est BIEN en premier ici
};

const game = new Phaser.Game(config);