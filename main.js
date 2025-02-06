// This is the main js file

// this function will turn a map into a string to be
// used in an HTML <pre> block
// takes a 2d map array
// returns a string
function generateMapLayout(map) {
  let map_string = "";
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      map_string = map_string + map[i][j];
    }
    map_string = map_string + "\n";
  }
  return map_string;
}

// this function prints a map in a browser window
// accepts 1 argument: string 
function printMap(layout) {
  document.getElementById('map-display').innerText = layout;
}

// place player token
function placePlayerToken(map, {x,y}) {
  map[x][y] = "@";
}

//locatePlayer finds the player token on a given map
// accepts 2 arguments: string, array (2d)
function locatePlayer(playerChar, map) {
  // loop through 2d array
  console.log(playerChar);
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        // check coordinate if equals playerChar
        console.log(map[i][j]);
        if (map[i][j] === playerChar) {
          // if true return coordinates
          return {x: j, y: i};
        }
    }
  }
  return false;
}

// movePlayer moves the player token on the mapCopy
// acceptes two arguments: object {x,y}, string
function movePlayer(playerLocation, direction) {
  // determine target location
  let targetLocation = {...playerLocation};
  // // target location is player location + direction
  // // up inc y axis
  // // left dec x axis
  // // down dec y axis
  // // right inc x axis
  if (direction === "up") {
    targetLocation.x--;
  }
  if (direction === "left") {
    targetLocation.y--;
  }
  if (direction === "down") {
    targetLocation.x++;
  }
  if (direction === "right") {
    targetLocation.y++;
  }
   console.log(targetLocation);

  // // target location is not out of bounds
  if (targetLocation.x < 0 
    || targetLocation.x > MAX_X 
    || targetLocation.y < 0 
    || targetLocation.y > MAX_Y
  ) {
    console.log("OUT OF BOUNDS");
    return playerLocation;
  } else {
    console.log(targetLocation);
  }

  let targetLocationValue = map[targetLocation.x][targetLocation.y];
  console.log (targetLocationValue);

  // // target location is not a wall
  if (targetLocationValue === "#") {
    console.log("Wall")
    return playerLocation;
  }
  // // target location is not a closed door
  if (targetLocationValue === "D") {
    console.log("Door")
    return playerLocation;
  }
  // // target location is not a monster
  if (targetLocationValue === "a") {
    console.log("Arachnid")
    return playerLocation;
  }
  // check move target location is valid
  // if valid check if empty space
  if (targetLocationValue === ".") {
    console.log("The way is clear.");
    // then move player to new location
    // store value of player location from original map
    playerLocationGroundValue = map[playerLocation.x][playerLocation.y];
    // replace the current player location on map Copy with the new value
    mapCopy[playerLocation.x][playerLocation.y] = playerLocationGroundValue;
    // place character symbol at target location on map Copy
    printMap(generateMapLayout(mapCopy));
    placePlayerToken(mapCopy,{x:targetLocation.x, y:targetLocation.y});
    printMap(generateMapLayout(mapCopy));
    return {x: targetLocation.x, y:targetLocation.y};
  }
}

// START
// hard code a map in a 2d array
let map = [
  ["#", "#", "#", "#"],
  ["#", ".", ".", "D"],
  ["#", ".", "a", "#"],
  ["#", "#", "#","#"],
];

// copy the map
// need to be able to reference the layout of the map
// the monsters and player will walk over the map
// some items need to stay on the map even if the 
// character walks over it
let mapCopy = JSON.parse(JSON.stringify(map));

// [0,1,2]
// get length and width of map for looping over map
const MAX_Y = map.length;
const MAX_X = map[0].length;
let mapLayout = generateMapLayout(mapCopy);
console.log(mapLayout);
printMap(mapLayout);
placePlayerToken(mapCopy, {x: 1,y: 1});
printMap(generateMapLayout(mapCopy));
// setTimeout(({x=1,y=1}) => placePlayerToken, 1000);
//console.log(map_string);
//console.log(map[2][1]);
let playerLocation = locatePlayer("@", mapCopy);
console.log("PLayer Location: ", JSON.stringify(playerLocation));

// Event listener for player movement
addEventListener('keydown', function (e) {
let direction = "";

// TODO: Player location not being updated after playerMove
if (e.key === "w" || e.key === "ArrowUp") {
  playerLocation = movePlayer(playerLocation,"up")}
if (e.key === "a" || e.key === "ArrowLeft") {
  playerLocation = movePlayer(playerLocation,"left")}
if (e.key === "s" || e.key === "ArrowDown") {
  playerLocation = movePlayer(playerLocation,"down")}
if (e.key === "d" || e.key === "ArrowRight") {
  playerLocation = movePlayer(playerLocation,"right")}
// console.log(direction);
})

// END
