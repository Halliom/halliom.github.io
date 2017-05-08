var rows = 10;
var columns = 14;
var colors = ["red", "cyan", "green", "grey", "white"];

var animationSpeed = 0.35;

var previousTimeStamp = 0;

var animations = new Array();

var pads = new Array(rows);
for (var i = 0; i < rows; i++) {
    pads[i] = new Array(columns);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Animation(x, y, newColor, onDone) {
    this.x = x;
    this.y = y;
    this.newColor = newColor;
    this.onDone = onDone;
    this.progress = 0;
}

function addAnimation() {
    var anim = new Animation(Math.floor(Math.random() * rows), 
                             Math.floor(Math.random() * columns), 
                             getRandomColor(),
                             function() {
                                 setTimeout(function() { addAnimation(); }, 2000);
                             });
    animations.push(anim);
}

function updateAnimations(timestamp) {
    var delta = timestamp - previousTimeStamp;
    var deltaAnimation = delta * animationSpeed;

    for (var i = 0; i < animations.length; i++) {
        var animation = animations[i];

        if (animation.progress >= 180) {
            // Animation done, reset the rotation
            pads[animation.x][animation.y].style.transform = "rotateY(0deg)";

            // Remove the animation from the list
            animations.splice(i, 1);
            animation.onDone();
        } else if (Math.round(animation.progress) == 90) {
            pads[animation.x][animation.y].style.backgroundColor = animation.newColor;
        } else {
            pads[animation.x][animation.y].style.transform = "rotateY(" + animation.progress + "deg)";
        }
        
        animation.progress += deltaAnimation;
    }
    
    previousTimeStamp = timestamp;
    requestAnimationFrame(updateAnimations);
}

function clickHandler(event) {
    console.log(event.currentTarget);
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
        childNode.addEventListener("click", clickHandler);

        pads[i][j] = childNode;
        row.appendChild(childNode);
    }
    background.appendChild(row);
}

addAnimation();
setTimeout(function() {
    updateAnimations(previousTimeStamp);
}, 2000);