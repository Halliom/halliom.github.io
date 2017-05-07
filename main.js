var rows = 12;
var columns = 18;
var colors = ["red", "cyan", "green", "grey", "white"];

var animationSpeed = 1;

var previousTimeStamp = 0;

var currentAnimation;
var currentAnimationX;
var currentAnimationY;

var pads = new Array(rows);
for (var i = 0; i < rows; i++) {
    pads[i] = new Array(columns);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function animation(timestamp) {
    if (currentAnimation >= 360) {
        currentAnimation = 0;
        currentAnimationX = Math.floor(Math.random() * rows);
        currentAnimationY = Math.floor(Math.random() * columns);
    } else if (currentAnimation >= 180) {
        // Do nothing, just wait
    } else if (currentAnimation == 90) {
        pads[currentAnimationX][currentAnimationY].style.backgroundColor = getRandomColor();
    } else {
        pads[currentAnimationX][currentAnimationY].style.transform = "rotateY(" + currentAnimation + "deg)";
    }

    var delta = timestamp - previousTimeStamp;
    currentAnimation += animationSpeed;

    console.log(currentAnimation);
    previousTimeStamp = timestamp;
    requestAnimationFrame(animation);
}

var background = document.getElementById("background");
for (var i = 0; i < rows; i++) {
    // Create a row element to contain the cells/pads in that row
    var row = document.createElement("div");
    row.style.width = "100%";
    row.style.height = (100 / rows) + "%";
    row.style.display = "table-row";
    for (var j = 0; j < columns; j++) {
        // Create the table cells (the pads)
        var childNode = document.createElement("div");
        childNode.className = "pad";
        childNode.style.width = (100 / columns) + "%";
        childNode.style.height = (100 / rows) + "%";
        childNode.style.backgroundColor = getRandomColor();
        childNode.style.display = "table-cell";

        pads[i][j] = childNode;
        row.appendChild(childNode);
    }
    background.appendChild(row);
}

currentAnimation = 0;
currentAnimationX = Math.floor(Math.random() * rows);
currentAnimationY = Math.floor(Math.random() * columns);
setTimeout(animation, 2000);