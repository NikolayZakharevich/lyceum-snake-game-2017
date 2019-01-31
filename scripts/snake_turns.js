var score;
var timer;
var cells;
var snake = new Object;
var keysPressed = [];
var cellsPassed_i = [];
var cellsPassed_j = [];
var cellsTurned_i = [];
var cellsTurned_j = [];
var cellsTurned_name = [];
var turnNames = 0;
var lastKey = "up";
var sounds = [];

var bronza_izho = new Image();
	var bronza_imo = new Image();
	var paluh_down = new Image();
	var paluh_left = new Image();
	var paluh_right = new Image();
	var paluh_up = new Image(); 
	var tail_down = new Image();
	var tail_left = new Image();
	var tail_right = new Image();
	var tail_up = new Image();
	var body_down = new Image();
	var body_left = new Image();
	var body_right = new Image();
	var body_up = new Image();
	var body_up_to_left = new Image();
	var body_left_to_down = new Image();
	var body_down_to_right = new Image();
	var body_right_to_up = new Image();
	var body_up_to_right = new Image();
	var body_right_to_down = new Image();
	var body_down_to_left = new Image();
	var body_left_to_up = new Image();
	var clear = new Image();

	
window.addEventListener("keydown", changeDirection, false);

function matrixArray(rows,columns)
{
	var arr = new Array();
	for (var i=0; i<columns; i++)
	{
		arr[i] = new Array();
		for (var j=0; j<rows; j++)
		{
			if (i == 0 || j == 0 || i == columns-1 || j == rows-1)
				arr[i][j] = 1;
			else
				arr[i][j] = 0;
		}
    }
	return arr;
}

function createField()
{
	field.height = 10 * window.innerWidth * 0.035;
	field.width = 10 * window.innerWidth * 0.035;
	cells = matrixArray(12,12);
	cells[9][10] = 1;
	cells[10][10] = 1;
    var context = field.getContext('2d');
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(window.innerWidth * 0.035 * 10, 0);
	context.lineTo(window.innerWidth * 0.035 * 10, window.innerWidth * 0.035 * 10);
	context.lineTo(0, window.innerWidth * 0.035 * 10);
	context.lineTo(0,0);
	/*for (var i = 0; i < 11; i++)
	{
		context.moveTo(0, window.innerWidth * 0.035 * i);
		context.lineTo(window.innerWidth * 0.035 * 10, window.innerWidth * 0.035 * i);
	}
	for (var i = 0; i < 11; i++)
	{
		context.moveTo(window.innerWidth * 0.035 * i, 0);
		context.lineTo(window.innerWidth * 0.035 * i, window.innerWidth * 0.035 * 10);
	}*/
	context.closePath();
	context.stroke();
}

function loadImages()
{
	bronza_izho.src = "images/bronza_izho.png";
	bronza_imo.src = "images/bronza_imo.png";
	paluh_down.src = "images/paluh_down.png";
	paluh_left.src = "images/paluh_left.png";
	paluh_right.src = "images/paluh_right.png";
	paluh_up.src = "images/paluh_up.png";
	tail_down.src = "images/tail_down.png";
	tail_left.src = "images/tail_left.png";
	tail_right.src = "images/tail_right.png";
	tail_up.src = "images/tail_up.png";
	body_down.src = "images/body_down.png";
	body_left.src = "images/body_left.png";
	body_right.src = "images/body_right.png";
	body_up.src = "images/body_up.png";
	body_up_to_left.src = "images/body_up_to_left.png";
	body_left_to_down.src = "images/body_left_to_down.png";
	body_down_to_right.src = "images/body_down_to_right.png";
	body_right_to_up.src = "images/body_right_to_up.png";
	body_up_to_right.src = "images/body_up_to_right.png";
	body_right_to_down.src = "images/body_right_to_down.png";
	body_down_to_left.src = "images/body_down_to_left.png";
	body_left_to_up.src = "images/body_left_to_up.png";
	clear.src = "images/clear.png";
}

function loadSounds()
{
	var s = new Audio();
	s.src = 'sounds/1.mp3';
	sounds.push(s);
}
	
	

function changeDirection(event) 
{
	if (event.keyCode ==  38) 
	{
		if (lastKey == "left" || lastKey == "right"){ 	
			lastKey = "up";
			keysPressed.push("up");
		}
	}
	if (event.keyCode ==  40) {
		if (lastKey == "left" || lastKey == "right") {
			lastKey = "down";
			keysPressed.push("down");
		}
	}
	if (event.keyCode ==  37) {
		if (lastKey == "up" || lastKey == "down") {
			lastKey = "left";
			keysPressed.push("left");
		}
	}
	if (event.keyCode ==  39) {
		if (lastKey == "up" || lastKey == "down") {
			lastKey = "right";
			keysPressed.push("right");
		}
	}
}

function eatMedal()
{
	if (cells[snake.curr_i][snake.curr_j] == "medal")
	{
		snake.length++;
		setMedal();
		snake_head.innerHTML+= '<img id = "body' + snake.length + '" src= "' + body_up.src +'" width = ' + snake.size + ' >';
		sounds[0].currentTime = 0;
		sounds[0].play();
		score++;
	}
}

function drawBody()
{
	for (var i = cellsPassed_i.length-2; i >= 0; i--)
	{
		var dx = window.innerWidth * 0.1 + (cellsPassed_j[i] - 1) * Number(snake.size);
		var dy = window.innerHeight * 0.1 + (cellsPassed_i[i] - 1) * Number(snake.size);
		
		switch (cells[cellsPassed_i[i]][cellsPassed_j[i]])
		{
			case "up": { snake.body = body_up.src;	snake.tail = tail_up.src; break; }
			case "down": { snake.body = body_down.src;	snake.tail = tail_down.src; break; }
			case "left": { snake.body = body_left.src;	snake.tail = tail_left.src; break; }
			case "right": { snake.body = body_right.src;	snake.tail = tail_right.src; break; } 	
		//	case "povorot": { snake.body = clear.src;	snake.tail = tail_left.src; break; }
		}
		if (i == 0)
		{			
			setTimeout(function() {
				tail.src = snake.tail;
			}, 200);
			tail.style = 'position: fixed; top: ' + dy + '; left: ' + dx + '; transition: all 0.2s linear';
		}
		else
		{
			var elem = document.getElementById("body" + i);
			elem.src = snake.body;
			elem.style = 'position: fixed; top: ' + dy + '; left: ' + dx + '; transition: all 0.2s linear';
		}
		if (i == 0 && cellsTurned_i.length > 0)
		{
			if (cellsPassed_i[i] == cellsTurned_i[0] && cellsPassed_j[i] == cellsTurned_j[0])
			{
				var elem = document.getElementById(cellsTurned_name.shift());
				elem.style.opacity = 0;
				var kek = cellsTurned_i.shift();
				kek = cellsTurned_j.shift();
			}
		}
				
	}
}

function addCell(direction)
{
	cells[snake.curr_i][snake.curr_j] = direction;
	cellsPassed_i.push(snake.curr_i);
	cellsPassed_j.push(snake.curr_j);
}

/*function povorot(direction)
{
	switch (direction)
	{
		case "left": { if (cells[snake.curr_i][snake.curr_j+1] == "up") cells[snake.curr_i][snake.curr_j+1] = "uptoleft"; else cells[snake.curr_i][snake.curr_j+1] = "downtoleft"; break; }
		case "right": { if (cells[snake.curr_i][snake.curr_j-1] == "up") cells[snake.curr_i][snake.curr_j-1] = "uptoright"; else cells[snake.curr_i][snake.curr_j-1] = "downtoright"; break; }
		case "up": { if (cells[snake.curr_i+1][snake.curr_j] == "left") cells[snake.curr_i+1][snake.curr_j] = "lefttoup"; else cells[snake.curr_i+1][snake.curr_j] = "righttoup"; break; }
		case "down": { if (cells[snake.curr_i-1][snake.curr_j] == "left") cells[snake.curr_i-1][snake.curr_j] = "lefttodown"; else cells[snake.curr_i-1][snake.curr_j] = "righttodown"; break; }
	}
}*/

function povorot(direction)
{
	if (snake.length > 0)
	{
		var dx = window.innerWidth * 0.1 + (cellsPassed_j[cellsPassed_i.length-2] - 1) * Number(snake.size);
		var dy = window.innerHeight * 0.1 + (cellsPassed_i[cellsPassed_i.length-2] - 1) * Number(snake.size);
		switch (direction)
		{
			case "left": { 
				if (cells[snake.curr_i][snake.curr_j+1] == "up")  	
					snake.body = body_up_to_left.src;	
				else
					snake.body = body_down_to_left.src;
				break; 
			}
			case "right": { 
				if (cells[snake.curr_i][snake.curr_j-1] == "up") 
					snake.body = body_up_to_right.src;	
				else
					snake.body = body_down_to_right.src;
				break; 
			}
			case "up": { 
				if (cells[snake.curr_i+1][snake.curr_j] == "left") 
					snake.body = body_left_to_up.src;	
				else
					snake.body = body_right_to_up.src;
				break; 
			}
			case "down": { 
				if (cells[snake.curr_i-1][snake.curr_j] == "left") 
					snake.body = body_left_to_down.src;	
				else
					snake.body = body_right_to_down.src;
				break; 
			}
		}
		cells[cellsPassed_i[cellsPassed_i.length-2]][cellsPassed_j[cellsPassed_i.length-2]] = "povorot";
		cellsTurned_i.push(cellsPassed_i[cellsPassed_i.length-2]);
		cellsTurned_j.push(cellsPassed_j[cellsPassed_j.length-2]);
		cellsTurned_name.push("pov" + String(turnNames));
		povorot_pic.innerHTML+= '<img id = "pov' + String(turnNames) + '" src = "' + snake.body + '" style = "position: fixed; top: ' + dy + '; left: ' + dx + ';" width = ' + snake.size + ' >';
		turnNames++;
	}
}
			
function snakeMovement()
{
	if (keysPressed.length != 0)
		snake.direction = keysPressed.shift();
	switch (snake.direction)
	{
		case "up": 
		{
			if (cells[snake.curr_i-1][snake.curr_j] != "medal")	
				cells[cellsPassed_i.shift()][cellsPassed_j.shift()] = 0;
			snake.curr_i--;
			if (cells[snake.curr_i][snake.curr_j] != 0 && cells[snake.curr_i][snake.curr_j] != "medal")
				endGame();
			else
			{
				eatMedal();
				//cells[snake.curr_i+1][snake.curr_j] = "up";
				addCell("up");
				if (cells[snake.curr_i+1][snake.curr_j] != "up")
					povorot("up");
				snake.y = snake.y - window.innerWidth * 0.035;
				snake.head = paluh_up.src;
				head.src = snake.head;
				head.style = 'position: fixed; top:  ' + snake.y + '; left: ' + snake.x + '; transition: all 0.2s linear';
				drawBody();
			}
			break;
		}
		
		case "down": 
		{
			if (cells[snake.curr_i+1][snake.curr_j] != "medal")	
				cells[cellsPassed_i.shift()][cellsPassed_j.shift()] = 0;
			snake.curr_i++;
			if (cells[snake.curr_i][snake.curr_j] != 0 && cells[snake.curr_i][snake.curr_j] != "medal")
				endGame();
			else
			{
				eatMedal();
				//cells[snake.curr_i-1][snake.curr_j] = "down";
				addCell("down");
				if (cells[snake.curr_i-1][snake.curr_j] != "down")
					povorot("down");
				snake.y = snake.y + window.innerWidth * 0.035;
				snake.head = paluh_down.src;
				head.src = snake.head;
				head.style = 'position: fixed; top:  ' + snake.y + '; left: ' + snake.x + '; transition: all 0.2s linear';
				drawBody();
			}
			break;
		}
		
		case "left": 
		{
			if (cells[snake.curr_i][snake.curr_j-1] != "medal")	
				cells[cellsPassed_i.shift()][cellsPassed_j.shift()] = 0;
			snake.curr_j--;
			if (cells[snake.curr_i][snake.curr_j] != 0 && cells[snake.curr_i][snake.curr_j] != "medal")
				endGame();
			else
			{
				eatMedal();
				//cells[snake.curr_i][snake.curr_j+1] = "left";
				addCell("left");
				if (cells[snake.curr_i][snake.curr_j+1] != "left")
					povorot("left");
				snake.x = snake.x - window.innerWidth * 0.035;
				snake.head = paluh_left.src;
				head.src = snake.head;
				head.style = 'position: fixed; top:  ' + snake.y + '; left: ' + snake.x + '; transition: all 0.2s linear';
				drawBody();
			}
			break;
		}
		
		case "right": 
		{
			if (cells[snake.curr_i][snake.curr_j+1] != "medal")	
				cells[cellsPassed_i.shift()][cellsPassed_j.shift()] = 0;
			snake.curr_j++;
			if (cells[snake.curr_i][snake.curr_j] != 0 && cells[snake.curr_i][snake.curr_j] != "medal")
				endGame();
			else
			{
				eatMedal();
				//cells[snake.curr_i][snake.curr_j-1] = "right";
				addCell("right");
				if (cells[snake.curr_i][snake.curr_j-1] != "right")
					povorot("right");
				snake.x = snake.x + window.innerWidth * 0.035;
				snake.head = paluh_right.src;
				head.src = snake.head;
				head.style = 'position: fixed; top:  ' + snake.y + '; left: ' + snake.x + '; transition: all 0.2s linear';
				drawBody();
			}
			break;
		}
	}	
}
	
function setMedal()
{
	var i = snake.curr_i, j = snake.curr_j;
	while (cells[i][j] != 0)
	{
		var randi = Math.random();
		i = Math.floor(randi*10 + 1);
		var randj = Math.random();
		j = Math.floor(randj*10 + 1);
	}
	cells[i][j] = "medal";
	medal = new Image();
	if ((i + j) % 2 == 0)
		medal.src = bronza_izho.src;
	else
		medal.src = bronza_imo.src;
	medal.width = window.innerWidth * 0.035;
	medal.style.top = String(window.innerWidth * 0.035 * (i-1));
	medal.style.left = String(window.innerWidth * 0.035 * (j-1));
	medals.innerHTML = '<img src = "' + medal.src + '" width = "' + medal.width + '" style = "position: relative; top: ' + medal.style.top + '; left: ' + medal.style.left + '">';
}

function startGame()
{
	document.getElementById("start").readOnly = true;
	resetGame();
	keysPressed.push("up");
	score = 0;
	snake.curr_i = 9;
	snake.curr_j = 10;
	cellsPassed_i.push(10);
	cellsPassed_j.push(10);
	cellsPassed_i.push(9);
	cellsPassed_j.push(10);
	snake.head = paluh_up.src;
	snake.tail = tail_up.src;
	snake.length = 0;
	snake.x = window.innerWidth / 10 + window.innerWidth * 0.035 * 9;
	snake.y = window.innerHeight / 10 + window.innerWidth * 0.035 * 8;
	snake.size = String(window.innerWidth * 0.035);
	snake_head.style = "position: absolute; top:  " + snake.y + "; left: " + snake.x;
	snake_head.innerHTML= '<img id = "head" src = ' + snake.head + ' width = ' + snake.size + '>'; 	
	snake_head.innerHTML+= '<img id = "tail" style = "position: relative; top: ' + window.innerWidth * 0.035 + '; left: -' +  window.innerWidth * 0.035 +' " src = ' + snake.tail + ' width = ' + snake.size + '>';
	setMedal();
	snakeMovement();
	timer = setInterval(snakeMovement, 200);
}

function resetGame()
{
	score = 0;
	snake.length= 0;
	snake.size = 0;
	snake.curr_i = 0;
	snake_curr_i = 0;
	while (cellsPassed_i.length > 0)
	{
		var kek = cellsPassed_i.shift();
		kek = cellsPassed_j.shift();
	}
	while (cellsTurned_i.length > 0)
	{
		var kek = cellsTurned_i.shift();
		kek = cellsTurned_j.shift();
		kek = cellsTurned_name.shift();
	}
	while (keysPressed.length > 0)
	{
		var kek = keysPressed.shift();
	}
	lastKey = "up";
	snake_head.innerHTML = "";
	medals.innerHTML = "";
	povorot_pic.innerHTML = "";
	clearInterval(timer);
	createField();
}

function endGame()
{
	clearInterval(timer);
	alert("GG!!");
	document.getElementById("start").readOnly = true;
}
	