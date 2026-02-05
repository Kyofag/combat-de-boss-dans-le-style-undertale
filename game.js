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
    scene: { preload: preload, create: create, update: update }
};

const game = new Phaser.Game(config);
let player;
let cursors;
let box;
let enemies;

function preload() {
    // C'est ici que tu chargeras tes futurs sprites
    // this.load.image('heart', 'assets/heart.png');
    // this.load.image('knight', 'assets/knight.png');
}

function create() {
    // 1. Création de la Box de combat (Zone restreinte)
    box = this.add.graphics();
    box.lineStyle(4, 0xffffff);
    box.strokeRect(150, 300, 300, 250);

    // 2. Le Joueur (Cœur)
    // Remplacé par un carré rouge en attendant tes images
    player = this.add.rectangle(300, 425, 15, 15, 0xff0000);
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);

    // 3. Groupe pour les attaques
    enemies = this.physics.add.group();

    // 4. Contrôles
    cursors = this.input.keyboard.createCursorKeys();

    // 5. Spawn d'attaques toutes les secondes
    this.time.addEvent({
        delay: 1000,
        callback: spawnKnightAttack,
        callbackScope: this,
        loop: true
    });

    // Collision
    this.physics.add.overlap(player, enemies, hitPlayer, null, this);
}

function update() {
    const speed = 200;
    player.body.setVelocity(0);

    // Mouvements limités à la box
    if (cursors.left.isDown && player.x > 165) player.body.setVelocityX(-speed);
    if (cursors.right.isDown && player.x < 435) player.body.setVelocityX(speed);
    if (cursors.up.isDown && player.y > 315) player.body.setVelocityY(-speed);
    if (cursors.down.isDown && player.y < 535) player.body.setVelocityY(speed);
}

function spawnKnightAttack() {
    // Exemple d'attaque : Une vague d'ombre (Shade Soul)
    let wave = this.add.rectangle(450, Phaser.Math.Between(320, 530), 40, 20, 0x330066);
    enemies.add(wave);
    wave.body.setVelocityX(-250);
    
    // Détruire l'attaque après 3 secondes pour ne pas ralentir le jeu
    this.time.delayedCall(3000, () => { wave.destroy(); });
}

function hitPlayer(player, enemy) {
    console.log("Touché !");
    // Ici tu pourras ajouter ton animation de dégâts
}