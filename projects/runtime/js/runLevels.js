var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE

    function createSawBlade(x, y) {
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(
        hitZoneSize,
        damageFromObstacle
      );
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x = x * -1;
      obstacleImage.y = y * -1;
    }
    /*
    createSawBlade(400, 160);
    createSawBlade(600, 275);
    createSawBlade(900, 160);
*/
    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy);
      enemy.velocityX = -2;
      enemy.rotationalVelocity = 1;
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10);
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.fadeOut();
        {
          shrink();
        }
      };
    }
    function createReward(x, y) {
      var reward = game.createGameItem("reward", 25);
      var yellowSquare = draw.rect(50, 50, "yellow");
      yellowSquare.x = -25;
      yellowSquare.y = -25;
      reward.addChild(yellowSquare);
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);
      reward.velocityX = -2;
      reward.rotationalVelocity = 1;
      reward.onPlayerCollision = function () {
        game.increaseScore(1000);
        reward.fadeOut();
        {
          shrink();
        }
      };
      reward.onProjectileCollision = function () {
        reward.fadeOut();
        {
          shrink();
        }
      };
    }
    function createMarker(x, y) {
      var marker = game.createGameItem("marker", 25);
      var greenSquare = draw.rect(50, 50, "green");
      greenSquare.x = -25;
      greenSquare.y = -25;
      marker.addChild(greenSquare);
      marker.x = x;
      marker.y = y;
      game.addGameItem(marker);
      marker.velocityX = -2;
      marker.rotationalVelocity = 3;
      marker.onPlayerCollision = function () {
        game.increaseScore(3000);
        game.changeIntegrity(20);
        marker.fadeOut();
        {
          shrink();
        }
      };
      marker.onProjectileCollision = function () {
        game.increaseScore(3000);
        game.changeIntegrity(20);
        marker.fadeOut();
        {
          shrink();
        }
      };
    }

    /*createEnemy(400, groundY - 50);
    createEnemy(800, groundY - 60);
    createEnemy(1200, groundY - 50);
    createReward(1400, groundY - 10);
    createMarker(1600, groundY - 50);
    */
    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects = level.gameItems;
      for (var i = 0; i < levelObjects.length; i++) 
{
var object = levelObjects[i];
if (object.type === "sawblade") {
createSawBlade(object.x, object.y);
} 
else if (object.type === "marker"){
  createMarker(object.x, object.y)
}
else if (object.type === "reward"){
  createReward(object.x, object.y)
}
else if (object.type == 'enemy'){
  createEnemy(object.x, object.y)
}

}
      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
