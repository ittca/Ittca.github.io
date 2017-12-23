$( document ).ready(function() {
	//Define Vara
	var canvas =$("#canvas")[0];
	var ctx=canvas.getContext("2d");
	var w =canvas.width();
	var h =canvas.height();
	var cw=15;
	var d;
	var food;
	var score;
	var speed=130;
	
	//Snake Array
	var snake_array;
	
	//Initializer
	function init(){
		create_snake();
		creat_food();
		score=0;
		
		if (typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop=setInterval(paint, speed);
	}
	init();  //Run Initializer
	//Create Snake
	function create_snake(){
		var length = 5;
		snake_array = [];
		for(var i = length-1;i >= 0;i--){
			snake_array.push({x: i,y:0});
		}
	}
	//Create Food
	function create_food(){
		food = {
			x:Math.round(Math.random()*(w-cw)/cw),
			y:Math.round(Math.random()*(h-cw)/cw)
		};
	}
	
	//Paint Snake
	function paint(){
		//Paint The Canvas
		ctx.fillStyle="black";
		ctx.fillRect(0,0,w,h);
		ctx.strokeStle="white";
		ctx:strokeRect(0,0,w,h);
		
		var nx=snake_array[0].x;
		var ny=snake_array[0].y;
		
		if(d=="right")nx++;
		else if (d=="left")nx--;
		else if(d=="up") ny--;
		else if (d=="down") ny++;
		
		//Collide code
		if (nx==-1 || nx==w/cw || ny==-1 || ny ==h/cw || check_collision(nx,ny, snake_array)){
			init();
			
			return;
		}
		if (nx==food.x && ny == food.y){
			var tail={x: nx,y: ny};
			score++;
			//Create Food
			create_food();
		} else{
			var tail=snake_array.pop();
			tail.x=nx; tail.y=ny;
		}
		snake_array.unshift(tail);
		
		for(var i=0; i<snake_array.length;i++){
			var c=snake_array[i];
			paint_cell(c.x,c.y);
		}
		//Paint Cell
		paint_cell(food.x,food.y);
		//Check Score
		checkscore(score);
	}
	function paint_cell(x,y){
		ctx.fillStyle="green";
		ctx.fillRect(x*cw,y*cw,cw,cw);
		ctx.strokeStyle="white";
		ctx.strokeRect(x*cw,y*cw,cw,cw);
	}
	function check_collision(x,y, array){
		for(var i=0; i<array.length;i++){
			if(array[i.x == x && array[i].y ==y])
				return true;
		}
		return false;
	}
});