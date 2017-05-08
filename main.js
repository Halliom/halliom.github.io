// Dimensions of the pad grid
var rows = 10;
var columns = 14;

// Taken from http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
function toRGB(h, s, l){
    var r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return "rgb(" + Math.round(r * 255) + ", " + Math.round(g * 255) + ", " + Math.round(b * 255) + ")";
}


// Generate the color palette
var colors = new Array();
var saturation = 0.25 + Math.random() * 0.5;
var luminance = 0.25 + Math.random() * 0.5;

var baseOffset = Math.random() * 360;
var offset1 = -15;
var offset2 = 120;

var range1 = 30;
var range2 = 30;
var range3 = 60;
for (var i = 0; i < 10; i++) {
    var randAngle = Math.random() * (range1 + range2 + range3);
    if (randAngle > range1) { // It is not in the first range
        if (randAngle < (range1 + range2)) { // It is in the second range
            randAngle += offset1;
        } else { // It is in the third range
            randAngle += offset2;
        }
    }

    var hue = ((baseOffset + randAngle) / 360) % 1.0;
    colors.push(toRGB(hue, saturation, luminance));
}
console.log(colors);

// Speed of the animation
var animationSpeed = 0.35;

// Previous time stamp for delta calculation
var previousTimeStamp = 0;

// The animations to render at this time
var animations = new Array();

var pads = new Array(rows);
for (var i = 0; i < rows; i++) {
    pads[i] = new Array(columns);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomColorNot(color) {
    var index = colors.indexOf(color);
    if (index != -1) {
        var rand = Math.floor(Math.random() * (colors.length - 1));
        if (rand >= index) {
            // Skip the index
            ++rand;
        }
        return colors[rand];
    }
}

function Animation(x, y, newColor, onDone) {
    this.x = x;
    this.y = y;
    this.flipped = false;
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
        } else if (!animation.flipped && animation.progress >= 90) {
            pads[animation.x][animation.y].style.backgroundColor = animation.newColor;
            animation.flipped = true;
        } else {
            pads[animation.x][animation.y].style.transform = "rotateY(" + animation.progress + "deg)";
        }
        animation.progress += deltaAnimation;
    }
    
    previousTimeStamp = timestamp;
    requestAnimationFrame(updateAnimations);
}

function clickHandler(event) {
    var i = event.currentTarget.getAttribute("row");
    var j = event.currentTarget.getAttribute("col");
    var previousColor = event.currentTarget.style.backgroundColor;

    animations.push(new Animation(i, j, getRandomColorNot(previousColor), function() {}));
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
        childNode.setAttribute("row", i);
        childNode.setAttribute("col", j);

        pads[i][j] = childNode;
        row.appendChild(childNode);
    }
    background.appendChild(row);
}

addAnimation();
setTimeout(function() {
    updateAnimations(previousTimeStamp);
}, 2000);