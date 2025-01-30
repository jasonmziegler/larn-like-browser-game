// This is the main js file






let map = [
  ["#", "#", "#", "#"],
  ["#", ".", ".", "#"],
  ["#", "@", ".", "#"],
  ["#", "#", "#","#"],
];

// [0,1,2]
const MAX_Y = map.length;
const MAX_X = map[0].length;

let map_string = "";

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    map_string = map_string + map[i][j];
  }
  map_string = map_string + "\n";
}

function drawMap() {
  document.getElementById('map-display').innerText = map_string;
}

console.log(map_string);

drawMap();

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
console.log(map[2][1]);
let playerLocation = locatePlayer("@", map);

console.log(JSON.stringify(playerLocation));

addEventListener('keydown', function (e) {

let direction = "";
if (e.key === "w" | e.key === "ArrowUp") {movePlayer(playerLocation,"up")}
if (e.key === "a" | e.key === "ArrowLeft") {movePlayer(playerLocation,"left")}
if (e.key === "s" | e.key === "ArrowDown") {movePlayer(playerLocation,"down")}
if (e.key === "d" | e.key === "ArrowRight") {movePlayer(playerLocation,"right")}

console.log(direction);
})


function movePlayer(playerLocation, direction) {
  // determine target location
  let targetLocation = playerLocation;
  // // target location is player location + direction
  // // up inc y axis
  // // left dec x axis
  // // down dec y axis
  // // right inc x axis
  if (direction === "up") {
    targetLocation.y--;
  }
  if (direction === "left") {
    targetLocation.x--;
  }
  if (direction === "down") {
    targetLocation.y++;
  }
  if (direction === "right") {
    targetLocation.x++;
  }
  console.log(targetLocation);

// check move target location is valid
let locationValue = map[targetLocation.x][targetLocation.y];


// // target location is not out of bounds
if (targetLocation.x < 0 
  || targetLocation.x > MAX_X 
  || targetLocation.y < 0 
  || targetLocation.y > MAX_Y
) {
  console.log("OUT OF BOUNDS");
} else {
  console.log(targetLocation);
}
// // target location is not a wall
// // target location is not a closed door
// // target location is not a monster


}