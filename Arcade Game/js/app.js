// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;

  // when enemy bug reaches end of canvas call reset()
  if (this.x > 505) {
    this.reset();
  }
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// resets the enemy bug back to start of canvas
Enemy.prototype.reset = function() {
  this.x = -200;
};



// Sets player x and y starting coordinates
var startX = 200;
var startY = 400;
// a helper we've provided to easily load images
var Player = function() {
  this.x = startX;
  this.y = startY;
  this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
Player.prototype.update = function(){
    if (this.x < 0)
        this.x = 0;
    if (this.x > 400)
        this.x = 400;
    if (this.y < 0) {
        this.reset();
        }
    if (this.y > 405)
        this.y = 405;
//collision function is called here
  checkCollisions();
}

// reset function sets the player back to the start coordinates
Player.prototype.reset = function() {
  this.x = startX;
  this.y = startY;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];

// push enemies into allEnemies array, 4 enemies total
// sets Y coordinate for each enemy to 0, 145, and 225 by using incrementer
// sets X coordinate randomly
// sets speed to a base of 60 and then randomizes each enemy
for (var i = 0; i < 3; i++) {
  var enemyY = 65 + 80 * i;
  var enemyX = Math.floor(Math.random() * 30);
  var enemySpeed = 60 + Math.floor(Math.random() * 150);
  allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed));
}
// player enemy collision function
function checkCollisions() {
      for (var i = 0; i < allEnemies.length; i++) {
        if ((allEnemies[i].x) <= player.x + 65 &&
          (allEnemies[i].x + 70) >= (player.x) &&
          (allEnemies[i].y) <= player.y + 35 &&
          (allEnemies[i].y + 35) >= (player.y)) {
          player.reset();
        }
      }
    }

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// switch statement takes the key event listener and adjusts x or y accordingly
Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'up':
      this.y -= 90;
      break;

    case 'down':
      this.y += 90;
      break;

    case 'left':
      this.x -= 100;
      break;

    case 'right':
      this.x += 100;
      break;

    default:
      break;
  }
};
