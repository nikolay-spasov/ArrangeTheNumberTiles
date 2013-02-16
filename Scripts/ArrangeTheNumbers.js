(function () {
	"use strict";
	
	function Tile(value, element) {
		this.value = value;
		this.element = element;
	};
	
	var field;
	var emptyTile;
	var canMove = true;
	
	$(document).ready(function () {
		$('#board').keydown(function (eventInfo) {
			var keyCode = eventInfo.keyCode;
		
			if (keyCode === 37 && emptyTile.col + 1 < 4) {
				// LEFT
				var r = emptyTile.row;
				var c = emptyTile.col;
				
				if (canMove === true) {
					canMove = false;
					$(field[r][c + 1].element).animate({'left': c * 80 + 'px'}, 'fast', function () {
						var temp = field[r][c];
						field[r][c] = field[r][c + 1];
						field[r][c + 1] = temp;
						emptyTile.col++;
						canMove = true;
					});
				}
			} else if (keyCode === 39 && emptyTile.col - 1 >= 0) {
				// RIGHT
				var r = emptyTile.row;
				var c = emptyTile.col;
				
				if (canMove === true) {
					canMove = false;
					$(field[r][c - 1].element).animate({'left': c * 80 + 'px'}, 'fast', function () {
						var temp = field[r][c];
						field[r][c] = field[r][c - 1];
						field[r][c - 1] = temp;
						emptyTile.col--;
						canMove = true;
					});
				}
			} else if (keyCode === 38 && emptyTile.row + 1 < 4) {
				// UP
				var r = emptyTile.row;
				var c = emptyTile.col;
				
				if (canMove === true) {
					canMove = false;
					$(field[r + 1][c].element).animate({'top': r * 80 + 'px'}, 'fast', function () {
						var temp = field[r][c];
						field[r][c] = field[r + 1][c];
						field[r + 1][c] = temp;
						emptyTile.row++;
						canMove = true;
					});
				}
			} else if (keyCode === 40 && emptyTile.row - 1 >= 0) {
				// DOWN
				var r = emptyTile.row;
				var c = emptyTile.col;
				
				if (canMove === true) {
					canMove = false;
					$(field[r - 1][c].element).animate({'top': r * 80 + 'px'}, 'fast', function () {
						var temp = field[r][c];
						field[r][c] = field[r - 1][c];
						field[r - 1][c] = temp;
						emptyTile.row--;
						canMove = true;
					});
				}				
			}

			if (win()) {
				console.log("WIN");
			}
		});
		$('#board').focus();
	});
	
	function mapUIElementsToField () {
		var allTilesUI = $(".tile");
		
		for (var row = 0; row < 4; row++) {
			for (var col = 0; col < 4; col++) {
				field[row][col].element = allTilesUI[row * 4 + col];
			}
		}
	};
	
	function win () {
		var count = 1;
		for (var row = 0; row < 4; row++) {
			for (var col = 0; col < 4; col++) {
				if (field[row][col].value !== count) {
					return false;
				}
				count++;
			}
		}
		
		return true;
	};
	
	function showField () {
		var tiles = "";
		var top = 0;
		var left = 0;
		
		for (var row = 0; row < 4; row++) {
			top = row * (75 + 5);
			for (var col = 0; col < 4; col++) {
				left = col * (75 + 5);
				if (field[row][col].value !== 16) {
					tiles = tiles + "<div class='tile' style='" + 
						"top: " + top + "px; left: " + left + "px;'>" + 
						"<p class='tile-number'>" + field[row][col].value + "</p></div>";
				} else {
					tiles = tiles + "<div class='tile hidden-tile' style='" + 
						"top: " + top + "px; left: " + left + "px;'>" + 
						"</div>";
				}
			}
		}
		
		$('#board').html(tiles);
	};
	
	function shuffle () {
		var randomizedQueue = [];
		for (var i = 0; i < 16; i++) {
			randomizedQueue[i] = i + 1;
		}
		
		for (var i = 0; i < 16; i++) {
			var index = Math.floor(Math.random() * 16);
			var temp = randomizedQueue[i];
			randomizedQueue[i] = randomizedQueue[index];
			randomizedQueue[index] = temp;
		}
		
		field = [];
		for (var row = 0; row < 4; row++) {
			field[row] = [];
			for (var col = 0; col < 4; col++) {
				field[row][col] = new Tile(randomizedQueue.shift());
				if (field[row][col].value === 16) {
					emptyTile = { 'row': row, 'col': col };
				}
			}
		}
	};
	
	shuffle();
	showField();
	mapUIElementsToField();
	
})();