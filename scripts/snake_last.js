var score;
var timer;
var cells;
var snake = new Object;
var keysPressed = [];
var cellsPassed_i = [];
var cellsPassed_j = [];
var lastKey = "up";
var sounds = [];
var fieldLeft;
var fieldTop;
var currRank = 1;
var gameStarted = false;

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
var dead1 = new Image();
var dead2 = new Image();
var dead3 = new Image();
var rank1 = new Image();
var rank2 = new Image();
var rank3 = new Image();
var rank4 = new Image();
var rank5 = new Image();
var rank6 = new Image();

	
window.addEventListener("keydown", changeDirection, false);

function addEvent ()
{
   addLoadEvent(preloader);
}
  
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
	var el = document.getElementById('field');
	fieldLeft = el.style.left;
	fieldTop = el.style.top;
	fieldLeft = fieldLeft.substr(0, fieldLeft.length - 1);
	fieldTop = fieldTop.substr(0, fieldTop.length - 1);
	fieldLeft = window.innerWidth * Number(fieldLeft) / 100;
	fieldTop = window.innerHeight * Number(fieldTop) / 100;
	
	bg.innerHTML = '<img id = "whitebg" src = "images/white.png" width = "' + field.width + '" height = "' + field.height + '" style = "position: fixed; top: ' + fieldTop + '; left: ' + fieldLeft + '; opacity: 0.3; z-index: 0;">';
	bg.innerHTML+= '<img id = "blackbg" src = "images/black.png" width = "' + field.width + '" height = "' + field.height + '" style = "position: fixed; top: ' + fieldTop + '; left: ' + fieldLeft + '; opacity: 0.3; z-index: 5;">';
	message.style = 'width:' + field.width + '; height: ' + field.height + '; position: fixed; top: ' + fieldTop + '; left: ' + fieldLeft + '; font-size: ' + String(field.width / 1.6) + '%; ';
	var dy = fieldTop + window.innerWidth * 0.035 * 7;
	var dx = fieldLeft + window.innerWidth * 0.035 * 3;
	startbtn.style = 'width: ' + window.innerWidth * 0.035 * 3 + '; position: fixed; top: ' + dy + '; left: ' + dx + '; font-size: ' + Math.sqrt(window.innerWidth * 0.035) * 20 + '%;';
	dy = window.innerWidth * 0.035 / 2;
	dx = fieldLeft + window.innerWidth * 0.035 * 10;
	var ddy = 10 * window.innerWidth * 0.035 - dy;
	board.style = 'width: ' + window.innerWidth * 0.035 * 3 + '; height: ' + ddy + ';  top: ' + fieldTop + '; left: ' + dx + '; font-size: ' + Math.sqrt(window.innerWidth * 0.035) * 20 + '%;  padding-top: ' + dy + ';';
	
	cells = matrixArray(12,12);
	cells[9][10] = "up";
	cells[10][10] = "up";
    var context = field.getContext('2d');
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(window.innerWidth * 0.035 * 10, 0);
	context.lineTo(window.innerWidth * 0.035 * 10, window.innerWidth * 0.035 * 10);
	context.lineTo(0, window.innerWidth * 0.035 * 10);
	context.lineTo(0,0);
	context.closePath();
	context.stroke();
}

function preloader() {
	if (document.getElementById) {
		document.getElementById("preload-0").style.background = "url(images/bronza_izho.png) no-repeat -9999px -9999px";
		document.getElementById("preload-1").style.background = "url(images/bronza_imo.png) no-repeat -9999px -9999px";
		document.getElementById("preload-2").style.background = "url(images/paluh_down.png) no-repeat -9999px -9999px";
		document.getElementById("preload-3").style.background = "url(images/paluh_up.png) no-repeat -9999px -9999px";
		document.getElementById("preload-4").style.background = "url(images/paluh_left.png) no-repeat -9999px -9999px";
		document.getElementById("preload-5").style.background = "url(images/paluh_right.png) no-repeat -9999px -9999px";
		document.getElementById("preload-6").style.background = "url(images/tail_up.png) no-repeat -9999px -9999px";
		document.getElementById("preload-7").style.background = "url(images/tail_down.png) no-repeat -9999px -9999px";
		document.getElementById("preload-8").style.background = "url(images/tail_left.png) no-repeat -9999px -9999px";
		document.getElementById("preload-9").style.background = "url(images/tail_right.png) no-repeat -9999px -9999px";
		document.getElementById("preload-10").style.background = "url(images/body_up.png) no-repeat -9999px -9999px";
		document.getElementById("preload-11").style.background = "url(images/body_down.png) no-repeat -9999px -9999px";
		document.getElementById("preload-12").style.background = "url(images/body_left.png) no-repeat -9999px -9999px";
		document.getElementById("preload-13").style.background = "url(images/body_right.png) no-repeat -9999px -9999px";
		document.getElementById("preload-14").style.background = "url(images/body_up_to_left.png) no-repeat -9999px -9999px";
		document.getElementById("preload-15").style.background = "url(images/body_up_to_right.png) no-repeat -9999px -9999px";
		document.getElementById("preload-16").style.background = "url(images/body_down_to_left.png) no-repeat -9999px -9999px";
		document.getElementById("preload-17").style.background = "url(images/body_down_to_right.png) no-repeat -9999px -9999px";
		document.getElementById("preload-18").style.background = "url(images/body_left_to_down.png) no-repeat -9999px -9999px";
		document.getElementById("preload-19").style.background = "url(images/body_left_to_up.png) no-repeat -9999px -9999px";
		document.getElementById("preload-20").style.background = "url(images/body_right_to_up.png) no-repeat -9999px -9999px";
		document.getElementById("preload-21").style.background = "url(images/body_right_to_down.png) no-repeat -9999px -9999px";
		document.getElementById("preload-22").style.background = "url(images/dead1.jpg) no-repeat -9999px -9999px";
		document.getElementById("preload-23").style.background = "url(images/dead2.jpg) no-repeat -9999px -9999px";
		document.getElementById("preload-24").style.background = "url(images/dead3.jpg) no-repeat -9999px -9999px";
		document.getElementById("preload-25").style.background = "url(images/rank1.jpg) no-repeat -9999px -9999px";
		document.getElementById("preload-26").style.background = "url(images/rank2.jpg) no-repeat -9999px -9999px";
		document.getElementById("preload-27").style.background = "url(images/rank3.jpg) no-repeat -9999px -9999px";
		document.getElementById("preload-28").style.background = "url(images/rank4.jpg) no-repeat -9999px -9999px";
		document.getElementById("preload-29").style.background = "url(images/rank5.jpg) no-repeat -9999px -9999px";
		document.getElementById("preload-30").style.background = "url(images/rank6.jpg) no-repeat -9999px -9999px";
	}
}
function addLoadEvent(func) {
	document.body.innerHTML+='<div id = "preload"></div>';
	for (var i = 0; i < 31; i++)
	{
		preload.innerHTML+= '<div id = "preload-' + i + '"></div>';
	}
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
	
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
	dead1.src = "images/dead1.jpg";
	dead2.src = "images/dead2.jpg";
	dead3.src = "images/dead3.jpg";
	rank1.src = "images/rank1.png";
	rank2.src = "images/rank2.png";
	rank3.src = "images/rank3.png";
	rank4.src = "images/rank4.png";
	rank5.src = "images/rank5.png";
	rank6.src = "images/rank6.png";
}

function loadSounds()
{
	var s = new Audio();
	s.src = 'sounds/1.mp3';
	sounds.push(s);
}

function hide(id)
{
	var elem = document.getElementById(id);
	if (elem)
	{
		elem.style.opacity = 0;
		elem.style.transition = "opacity 1s linear";
	}
}

function show(id)
{
	var elem = document.getElementById(id);
	if (elem)
	{
		elem.style.opacity = 1;
		elem.style.transition = "opacity 1s";
	}
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
	if (event.keyCode == 13) {
		if (gameStarted == false) {
			startGame();
		}
	}
}

function eatMedal()
{
	if (cells[snake.curr_i][snake.curr_j] == "medal")
	{
		snake.length++;
		score++;
		if (score / 10 >= currRank) {
			currRank++;
			switch (currRank) {
				case 2: { rankimg.src = rank2.src; rank.innerHTML = "Бадминтон"; break; }
				case 3: { rankimg.src = rank3.src; rank.innerHTML = "Ньютон"; break; }
				case 4: { rankimg.src = rank4.src; rank.innerHTML = "Вашингтон"; break; }
				case 5: { rankimg.src = rank5.src; rank.innerHTML = "Дракон"; break; }
				case 6: { rankimg.src = rank6.src; rank.innerHTML = "Наполеон"; break; }
			}
		}	
		scoreboard.innerHTML = String(score);
		if (score < 98)
			setMedal();
		snake_head.innerHTML+= '<img id = "body' + snake.length + '" src= "' + body_up.src +'" width = ' + snake.size + ' >';
		sounds[0].currentTime = 0;
		sounds[0].play();
	}
}


function drawBody()
{
	for (var i = cellsPassed_i.length-2; i >= 0; i--)
	{
		
		var dx = fieldLeft + (cellsPassed_j[i] - 1) * Number(snake.size);
		var dy = fieldTop + (cellsPassed_i[i] - 1) * Number(snake.size);
		switch (cells[cellsPassed_i[i]][cellsPassed_j[i]])
		{
			case "up": { snake.body = body_up.src;	snake.tail = tail_up.src; break; }
			case "down": { snake.body = body_down.src;	snake.tail = tail_down.src; break; }
			case "left": { snake.body = body_left.src;	snake.tail = tail_left.src; break; }
			case "right": { snake.body = body_right.src;	snake.tail = tail_right.src; break; }
			case "uptoleft": { snake.body = body_up_to_left.src;	snake.tail = tail_left.src; break; }
			case "downtoleft": { snake.body = body_down_to_left.src;	snake.tail = tail_left.src; break; }
			case "lefttodown": { snake.body = body_left_to_down.src;	snake.tail = tail_down.src; break; }
			case "righttodown": { snake.body = body_right_to_down.src;	snake.tail = tail_down.src; break; }
			case "uptoright": { snake.body = body_up_to_right.src;	snake.tail = tail_right.src; break; }
			case "downtoright": { snake.body = body_down_to_right.src;	snake.tail = tail_right.src; break; }
			case "lefttoup": { snake.body = body_left_to_up.src;	snake.tail = tail_up.src; break; }
			case "righttoup": { snake.body = body_right_to_up.src;	snake.tail = tail_up.src; break; }
		}
		if (i == 0)
		{			
			tail.src = snake.tail;
			tail.style = 'position: fixed; top: ' + dy + '; left: ' + dx + '; transition: all 0.2s linear';
		}
		else
		{
			var elem = document.getElementById("body" + i);
			elem.src = snake.body;
			elem.style = 'position: fixed; top: ' + dy + '; left: ' + dx + '; transition: all 0.2s linear';
		}
	}
}

function addCell(direction)
{
	cells[snake.curr_i][snake.curr_j] = direction;
	cellsPassed_i.push(snake.curr_i);
	cellsPassed_j.push(snake.curr_j);
}

function povorot(direction)
{
	switch (direction)
	{
		case "left": { if (cells[snake.curr_i][snake.curr_j+1] == "up") cells[snake.curr_i][snake.curr_j+1] = "uptoleft"; else cells[snake.curr_i][snake.curr_j+1] = "downtoleft"; break; }
		case "right": { if (cells[snake.curr_i][snake.curr_j-1] == "up") cells[snake.curr_i][snake.curr_j-1] = "uptoright"; else cells[snake.curr_i][snake.curr_j-1] = "downtoright"; break; }
		case "up": { if (cells[snake.curr_i+1][snake.curr_j] == "left") cells[snake.curr_i+1][snake.curr_j] = "lefttoup"; else cells[snake.curr_i+1][snake.curr_j] = "righttoup"; break; }
		case "down": { if (cells[snake.curr_i-1][snake.curr_j] == "left") cells[snake.curr_i-1][snake.curr_j] = "lefttodown"; else cells[snake.curr_i-1][snake.curr_j] = "righttodown"; break; }
	}
}

function drawSnake()
{
	head.src = snake.head;
	head.style = 'position: fixed; top:  ' + snake.y + '; left: ' + snake.x + '; transition: all 0.2s linear';
	drawBody();
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
				addCell("up");
				if (cells[snake.curr_i+1][snake.curr_j] != "up")
					povorot("up");
				snake.y = snake.y - window.innerWidth * 0.035;
				snake.head = paluh_up.src;
				drawSnake();
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
				addCell("down");
				if (cells[snake.curr_i-1][snake.curr_j] != "down")
					povorot("down");
				snake.y = snake.y + window.innerWidth * 0.035;
				snake.head = paluh_down.src;
				drawSnake();
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
				addCell("left");
				if (cells[snake.curr_i][snake.curr_j+1] != "left")
					povorot("left");
				snake.x = snake.x - window.innerWidth * 0.035;
				snake.head = paluh_left.src;
				drawSnake();
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
				addCell("right");
				if (cells[snake.curr_i][snake.curr_j-1] != "right")
					povorot("right");
				snake.x = snake.x + window.innerWidth * 0.035;
				snake.head = paluh_right.src;
				drawSnake();
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
	medal.style.top = String(fieldTop + window.innerWidth * 0.035 * (i-1));
	medal.style.left = String(fieldLeft + window.innerWidth * 0.035 * (j-1));
	medals.innerHTML = '<img src = "' + medal.src + '" width = "' + medal.width + '" style = "position: fixed; top: ' + medal.style.top + '; left: ' + medal.style.left + '">';
}

function startGame()
{
	startbtn.style.display = "none";
	hide("message");
	var elem = document.getElementById("button2");
	if (elem)
		elem.style.display = "none";
	blackbg.style = 'position: fixed; top: ' + fieldTop + '; left: ' + fieldLeft + '; opacity: 0; transition: 1s;';
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
	snake.x = fieldLeft + window.innerWidth * 0.035 * 9;
	snake.y = fieldTop + window.innerWidth * 0.035 * 8;
	snake.size = String(window.innerWidth * 0.035);
	var dx = fieldLeft + 9 * Number(snake.size);
	var dy = fieldTop + 9 * Number(snake.size);
		
	snake_head.innerHTML= '<img id = "head" style = "position: fixed; top:  ' + snake.y + '; left: ' + snake.x + ';" src = ' + snake.head + ' width = ' + snake.size + '>'; 	
	snake_head.innerHTML+= '<img id = "tail" style = "position: fixed; top: ' + dy + '; left: ' + dx + ';" src = ' + snake.tail + ' width = ' + snake.size + '>';
	
	dy = window.innerWidth * 0.035 / 2;
	dx = window.innerWidth * 0.035 * 3;
	board.innerHTML="Бронз ИЖО/ИМО: <br>";
	board.innerHTML+= '<div id = "scoreboard"></div><br>';
	scoreboard.style = 'margin-top: ' + dy + 'px; margin-bottom: ' + dy + '; font-size: ' + Math.sqrt(window.innerWidth * 0.035) * 40 + '%;';
	scoreboard.innerHTML = String(score);
	board.innerHTML+= 'Ранг: <br>';
	board.innerHTML+= '<img id = "rankimg" src = ' + rank1.src + ' width = ' + 2.5 * snake.size + ' style = "margin-top: ' + dy/2 + '" >';
	board.innerHTML+= '<p id  = "rank" style = "width: ' + dx + '; font-size: 2.1vw" >Жетон</p>';	
	setMedal();
	gameStarted = true;
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
	while (keysPressed.length > 0)
	{
		var kek = keysPressed.shift();
	}
	lastKey = "up";
	snake_head.innerHTML = "";
	medals.innerHTML = "";
	clearInterval(timer);
	cells = matrixArray(12,12);
	cells[9][10] = "up";
	cells[10][10] = "up";
}

function endGame()
{
	clearInterval(timer);
	currRank = 1;
	gameStarted = false;
	blackbg.style = 'position: fixed; top: ' + fieldTop + '; left: ' + fieldLeft + '; opacity: 0.3; z-index: 5; transition: 1s;';
	var elem = document.getElementById("dead");
	if (elem) {
		var rand = Math.random() * 30;
		if (rand < 10)
			dead.src = dead1.src;
		else if (rand < 20)
			dead.src = dead2.src;
		else 
			dead.src = dead3.src;
	}
	else {
		message.innerHTML+= '<img id = "dead" src = ' + dead1.src + ' width = ' + String(4*snake.size) + ' style = "position: relative;" ><br>'; 
	}	
	var elem1 = document.getElementById("button2");
	if (!elem1) {
		message.innerHTML+= '<div id = "button2" class="knopka01" onClick = "startGame()" style = "height: ' + snake.size + 'pt; line-height: ' + snake.size + 'pt; width: ' + 2*snake.size + '; font-size: ' + Math.sqrt(snake.size) * 10 + '%; margin-top: ' + snake.size/2 + 'pt;">Ещё</div>';
	}
	else {
		elem1.style.display = "inline-block";
	}
	show("message");
}

