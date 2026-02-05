// --- CONFIGURATION ---
const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    // On définit deux scènes : le Menu d'abord, puis le Jeu
    scene: [MainMenu, BattleScene]
};

const game = new Phaser.Game(config);

// --- SCÈNE 1 : MENU PRINCIPAL ---
class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // Tu peux charger une image de fond pour le menu ici
        // this.load.image('knight_intro', 'assets/knight_intro.png');
    }

    create() {
        // Titre style Indie Cross / Undertale
        this.add.text(300, 100, 'INDIE CROSS', { fontSize: '48px', fill: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
        this.add.text(300, 160, 'MULTIVERSE CALAMITY', { fontSize: '24px', fill: '#f00' }).setOrigin(0.5);

        // Rectangle pour simuler le portrait du Knight
        this.add.rectangle(300, 300, 120, 150, 0x333333).setStrokeStyle(2, 0xffffff);
        this.add.text(300, 300, 'THE\nKNIGHT', { fontSize: '20px', fill: '#fff', align: 'center' }).setOrigin(0.5);

        // Bouton Start (Bad Time Simulator style)
        const startBtn = this.add.rectangle(300, 480, 200, 50, 0x000000).setStrokeStyle(2, 0xffffff);
        const startText = this.add.text(300, 480, 'START FIGHT', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);

        // Rendre le bouton interactif
        startBtn.setInteractive({ useHandCursor: true });
        
        startBtn.on('pointerover', () => {
            startBtn.setFillStyle(0xffffff);
            startText.setFill(0x000000);
        });

        startBtn.on('pointerout', () => {
            startBtn.setFillStyle(0x000000);
            startText.setFill(0xffffff);
        });

        startBtn.on('pointerdown', () => {
            this.scene.start('BattleScene');
        });

        this.add.text(300, 550, 'Inspired by MORØ Productions', { fontSize: '14px', fill: '#666' }).setOrigin(0.5);
    }
}

// --- SCÈNE 2