var ship;
var bullets = [];
var asteroids = [];
var spawnRate = 25;
var hit = 0;
var livesLeft = 2;
var points = 0;
var dodge = 0;
var playing = false;

function startGame() {
    if(playing == false){
        ship = new component(40, 40, "mship1.png", 364, 196, "image", 0);
        lives = new scoreboard("20px", "Consolas", "black", 25, 25);
        score = new scoreboard("20px", "Consolas", "black", 25, 45);
        ded = new scoreboard("60px", "Consolas", "black", 300, 400);
        endScore = new scoreboard("40px", "Consolas", "black", 100, 100);
        bullets = [];
        asteroids = []
        points = 0;
        livesLeft = 2;
        spawnRate = 25;
        myGameArea.start();
        playing = true;
    }
}

function restart() {
    myGameArea.stop();
    myGameArea.clear();
    playing = false;
    startGame();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 768;
        this.canvas.height = 432;
        this.context = this.canvas.getContext("2d");
        document.getElementById("gameWrap").appendChild(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type, speed) {
    this.type = type;
    if(type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.angle = 0;
    this.moveAngle = 0;
    this.vectorInitiate = true;
    this.angleSpeedx = 0;
    this.angleSpeedy = 0;
    this.x = x;
    this.y = y;
    this.rotateUpdate = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    this.lineUpdate = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPosRotate = function() {     
        this.angle += this.moveAngle * Math.PI / 180;
    }
    this.newPosLine = function() {
        if(this.vectorInitiate){
            this.angleSpeedy = this.speed * Math.cos(ship.angle);
            this.angleSpeedx = this.speed * Math.sin(ship.angle);
            this.vectorInitiate = false;
        } else {
            this.x += this.angleSpeedx;
            this.y -= this.angleSpeedy;
        }
    }
}

function asteroid() {
    this.width = Math.floor((Math.random() * 40) + 10);
    this.height = this.width;
    this.speedx = Math.floor((Math.random() * 3) + 1);
    this.speedy = Math.floor((Math.random() * 3) + 1);
    this.initialSpawn = true;
    this.seed = Math.floor((Math.random() * 2) + 1);
    if(this.initialSpawn){
        if(this.seed == 1){
            this.initialx = true;
            this.initaly = false;
            this.x = 1;
            this.y = Math.floor((Math.random() * 432) + 1)
        } else {
            this.initialy = true;
            this.initialx = false;
            this.y = 1;
            this.x = Math.floor((Math.random() * 768) + 1);
        }
        this.initialSpawn = false;
    }
    this.decideVector = Math.floor((Math.random() * 2) + 1);
    this.asteroidUpdate = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = "grey";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newAsteroidPos = function() {
        if(this.decideVector == 1 && this.initialx){
            this.x += this.speedx;
            this.y -= this.speedy;
        }
        else if(this.decideVector == 2 && this.initialx){
            this.x += this.speedx;
            this.y += this.speedy;
        }
        else if(this.decideVector == 1 && this.initialy){
            this.x -= this.speedx;
            this.y += this.speedy;
        }
        else if(this.decideVector == 2 && this.initialy){
            this.x += this.speedx;
            this.y += this.speedy;
        }
    };
}

function scoreboard(size, fontstyl, color, x, y){
    this.size = size;
    this.fontstyl = fontstyl;
    this.color = color;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.font = this.size + " " + this.fontstyl;
        ctx.fillstyle = this.color;
        ctx.fillText(this.text, this.x, this.y)
    }
}

function shipUpdate(){
        ship. moveAngle = 0;
        if (myGameArea.keys && myGameArea.keys[37]) {ship.moveAngle = -5; }
        if (myGameArea.keys && myGameArea.keys[39]) {ship.moveAngle = 5; }
        ship.newPosRotate();
        ship.rotateUpdate();
}

function shoot(){
    if (myGameArea.frameNo == 1 || everyinterval(7)){
        if(myGameArea.keys && myGameArea.keys[32]){
            bullets.push(new component(3, 3, "black", 364, 196, 0, 7));
        }
    }
}

function bulletUpdate(){
    if(bullets.length){
        for(i = 0; i < bullets.length; i += 1){
            bullets[i].newPosLine();
            bullets[i].lineUpdate();
        }
    } else {
            return false;
        }
}

function createAsteroid(){
    if (myGameArea.frameNo == spawnRate || everyinterval(spawnRate)){
        asteroids.push(new asteroid());
    }
}

function updateAsteroid(){
    if(asteroids.length){
        for(i = 0; i < asteroids.length; i += 1){
            asteroids[i].asteroidUpdate();
            asteroids[i].newAsteroidPos();
        }
    }
}

function destroyAsteroid(){
    var hit = 0;
    var miss = 0;
    for (i = 0; i < bullets.length; i += 1){
        for(n = 0; n < asteroids.length; n += 1){
            bulletLeft = bullets[i].x;
            bulletRight = bullets[i].x + (bullets[i].width);
            bulletTop = bullets[i].y;
            bulletBottom = bullets[i].y + (bullets[i].height);
            asteroidLeft = asteroids[n].x;
            asteroidRight = asteroids[n].x + (asteroids[n].width);
            asteroidTop = asteroids[n].y;
            asteroidBottom = asteroids[n].y + (asteroids[n].height);
            if ((bulletBottom < asteroidTop) || (bulletTop > asteroidBottom) || (bulletRight < asteroidLeft) || (bulletLeft > asteroidRight)) {
                miss ++;
            } else {
                hit ++;
                asteroids.splice(n, 1);
                bullets.splice(i, 1);
                points += 10;
            }
        }
    }
}

function shipHit(){
    for(n = 0; n < asteroids.length; n += 1){
        shipLeft = ship.x;
        shipRight = ship.x + (ship.width);
        shipTop = ship.y;
        shipBottom = ship.y + (ship.height);
        asteroidLeft = asteroids[n].x;
        asteroidRight = asteroids[n].x + (asteroids[n].width);
        asteroidTop = asteroids[n].y;
        asteroidBottom = asteroids[n].y + (asteroids[n].height);
        if ((shipBottom < asteroidTop) || (shipTop > asteroidBottom) || (shipRight < asteroidLeft) || (shipLeft > asteroidRight)) {
            dodge ++;
        } else {
            livesLeft --;
            asteroids.splice(n, 1);
        }
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function updateGameArea() {
    if (livesLeft == 0){
        myGameArea.clear();
        ded.text = "You Ded";
        endScore.text = "Final Score:" + points;
        ded.update();
        endScore.update();
        myGameArea.stop();
    } else {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    lives.text = "Lives:" + livesLeft;
    score.text = "Score:" + points;
    shoot();
    createAsteroid();
    updateAsteroid();
    bulletUpdate();
    destroyAsteroid();
    shipHit();
    shipUpdate();
    lives.update();
    score.update();
    }
}
