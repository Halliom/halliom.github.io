var rows = 6;
var columns = 6;
var colors = ["red", "cyan", "green", "grey", "white"];

var pads = new Array(rows);
for (var i = 0; i < rows; i++) {
    pads[i] = new Array(columns);
}

function getRandomColor() {
    return colors[Math.round(Math.random() * colors.length)];
}

var background = document.getElementById("background");
for (var i = 0; i < rows; i++) {
    var row = document.createElement("div");
    row.style.width = "100%";
    row.style.height = (100 / rows) + "%";
    row.style.display = "table-row";
    for (var j = 0; j < columns; j++) {
        var childNode = document.createElement("div");
        childNode.style.width = (100 / columns) + "%";
        childNode.style.height = (100 / rows) + "%";
        childNode.style.backgroundColor = getRandomColor();
        childNode.style.display = "table-cell";
        row.appendChild(childNode);
    }
    background.appendChild(row);
}