var background;
var tileSize = 75;
var space = 5;
var turn = 1;

var pieces;
var positions = [
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,2,1,0,0,0],
	[0,0,0,1,2,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0]
]

window.onload=function() {
    background = document.getElementById("background");
	pieces = document.getElementById("pieces");
    drawAField();
	drawPieces();
}

function drawAField() {
    for (var i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            var tile = document.createElement("div");
            tile.style.position = "absolute";
            tile.style.height = tileSize + "px";
            tile.style.width = tileSize + "px";
			tile.style.top = (tileSize + space)*i + space + "px";
            tile.style.left = (tileSize + space)*j + space + "px";
            tile.style.backgroundColor = "rgb(201, 157, 241)";
			var func = "onClickTile(" + i + ", " + j + ")";
			tile.setAttribute("onclick", func);
            background.appendChild(tile);
        }
    }
}

function drawPieces() {
	pieces.innerHTML = "";
    for (var i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            var value = positions[i][j];
			if (value != 0) {
				var piece = document.createElement("div");
				piece.style.position = "absolute";
				piece.style.height = tileSize + "px";
				piece.style.width = tileSize + "px";
				piece.style.borderRadius = "50%";
				piece.style.top = (tileSize + space)*i + space + "px";
				piece.style.left = (tileSize + space)*j + space + "px";
				if (value == 1) {
					piece.style.backgroundColor = "black";
				} else {
					piece.style.backgroundColor = "white";
				}
				pieces.appendChild(piece);
			}
        }
    }
}


function checkForAvailability(i, j) {
	var eatenPieces = getEatenPieces(i, j);
	if (eatenPieces.length != 0) {
		return true;
	}
	return false;
}

function getEatenPieces(i, j) {
	var column = j;
	var eatenPieces = [];
	var mayBeChanged = [];
	// step right
	while (column > 0) {
		column--;
		var value = positions[i][column];
		if (value == 0) {
			break;
		} else if (value == turn) {
			eatenPieces = eatenPieces.concat(mayBeChanged);
			break;
		} else {
			var pieceLocation = {row:i, column:column};
			mayBeChanged.push(pieceLocation);
		}
	}

	// step left
	var column = j;
	var mayBeChanged = [];
	while (column < 7) {
		column++;
		var value = positions[i][column];
		if (value == 0) {
			break;
		} else if (value == turn) {
			eatenPieces = eatenPieces.concat(mayBeChanged);
			break;
		} else {
			var pieceLocation = {row:i, column:column};
			mayBeChanged.push(pieceLocation);
		}
	}

	// step down
	var row = i;
	var mayBeChanged = [];
	while (row > 0) {
		row--;
		var value = positions[row][j];
		if (value == 0) {
			break;
		} else if (value == turn) {
			eatenPieces = eatenPieces.concat(mayBeChanged);
			break;
		} else {
			var pieceLocation = {row:row, column:j};
			mayBeChanged.push(pieceLocation);
		}
	}

	// step up
	var row = i;
	var mayBeChanged = [];
	while (row < 7) {
		row++;
		var value = positions[row][j];
		if (value == 0) {
			break;
		} else if (value == turn) {
			eatenPieces = eatenPieces.concat(mayBeChanged);
			break;
		} else {
			var pieceLocation = {row:row, column:j};
			mayBeChanged.push(pieceLocation);
		}
	}

	// step up left
	var row = i;
	var column = j;
	var mayBeChanged = [];
	while (row < 7 && column < 7) {
		row++;
		column++;
		var value = positions[row][column];
		if (value == 0) {
			break;
		} else if (value == turn) {
			eatenPieces = eatenPieces.concat(mayBeChanged);
			break;
		} else {
			var pieceLocation = {row:row, column:column};
			mayBeChanged.push(pieceLocation);
		}
	}

	// step down right
	var row = i;
	var column = j;
	var mayBeChanged = [];
	while (row > 0 && column > 0) {
		row--;
		column--;
		var value = positions[row][column];
		if (value == 0) {
			break;
		} else if (value == turn) {
			eatenPieces = eatenPieces.concat(mayBeChanged);
			break;
		} else {
			var pieceLocation = {row:row, column:column};
			mayBeChanged.push(pieceLocation);
		}
	}

	// step up right
	var row = i;
	var column = j;
	var mayBeChanged = [];
	while (row < 7 && column > 0) {
		row++;
		column--;
		var value = positions[row][column];
		if (value == 0) {
			break;
		} else if (value == turn) {
			eatenPieces = eatenPieces.concat(mayBeChanged);
			break;
		} else {
			var pieceLocation = {row:row, column:column};
			mayBeChanged.push(pieceLocation);
		}
	}

	// step down left
	var row = i;
	var column = j;
	var mayBeChanged = [];
	while (row > 0 && column < 7) {
		row--;
		column++;
		var value = positions[row][column];
		if (value == 0) {
			break;
		} else if (value == turn) {
			eatenPieces = eatenPieces.concat(mayBeChanged);
			break;
		} else {
			var pieceLocation = {row:row, column:column};
			mayBeChanged.push(pieceLocation);
		}
	}
	return eatenPieces;
}

function turnPieces(eatenPieces) {
	for (var k = 0; k < eatenPieces.length; k++) {
		var cell = eatenPieces[k];
		if (positions[cell.row][cell.column] == 1) {
			positions[cell.row][cell.column] = 2;
		} else {
			positions[cell.row][cell.column] = 1;
		}
	}
}

function makeAScore() {
	score1 = document.getElementById("playerOnePoints");
	score2 = document.getElementById("playerTwoPoints");
	counter1 = 0;
	counter2 = 0;
	for(var i = 0; i < positions.length; i++) {
		for(var j = 0; j < positions.length; j++) {
			if (positions[i][j] == 1) {
				counter1 += 1;
			} else if (positions[i][j] == 2) {
				counter2 += 1;
			}
		}
	}

	if (counter1 + counter2 == 64) {
		var info = document.getElementById("winnerInfo");
		var winner = document.createElement("div");
		winner.style.position = "absolute";
		winner.style.backgroundColor = "red";
		winner.style.fontSize = "25px";
		if (counter1 > counter2) {
			winner.innerHTML = "Black won!";
		} else if (counter1 < counter2) {
			winner.innerHTML = "White won!";
		} else {
			winner.innerHTML = "Drawn";
		}
		info.appendChild(winner);
	}

	score1.innerHTML = "Black: " + counter1;
	score2.innerHTML = "White: " + counter2;
}

function onClickTile(i, j) {
	if (positions[i][j] == 0) {
		if (checkForAvailability(i, j)) {
			var eatenPieces = getEatenPieces(i, j);
			turnPieces(eatenPieces);
			positions[i][j] = turn;
			if (turn == 1) {
				turn = 2;
			} else {
				turn = 1;
			}
			drawPieces();
			makeAScore();
		}
	}
}