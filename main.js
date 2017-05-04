//

//主要的数据，初始化方块二维数组，总分数
var board = new Array();
var score = 0;

//初始化方块是否撞击过
var hasConflicted = new Array()

//移动端触摸位置初始化
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

//行数,列数
var pot = 4;
var lineX = pot;
var lineY = pot ;







//主函数
$(document).ready(function () {
	//初始化css样式
	prepareForMobile()
	//开始一个游戏
	newGame()
})

document.addEventListener('touchstart',function(event){
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
});
document.addEventListener('touchmove',function(event){
	 event.preventDefault();
});
document.addEventListener('touchend',function(event){
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;

	var delX = endX - startX ;
	var delY = endY - startY ;

	if (Math.abs(delX) < 0.2*documentWidth && Math.abs(delY) < 0.2*documentWidth) {
		return
	}
	//x
	if (Math.abs(delX) >= Math.abs(delY) ) {
		//move right
		if (delX > 0) {
			if (moverRight()) {
				setTimeout('generateOneNumber()',210)
				setTimeout('isOverGame()',300)
			}
		}
		//move left
		else{
			if (moverLeft()) {
				setTimeout('generateOneNumber()',210)
				setTimeout('isOverGame()',300)
			}
		}
	}
	//y
	else{
		//move down
		if (delY > 0) {
			if (moverDown()) {
				setTimeout('generateOneNumber()',210)
				setTimeout('isOverGame()',300)
			}
		}
		//move top
		else{
			if (moverTop()) {
				setTimeout('generateOneNumber()',210)
				setTimeout('isOverGame()',300)
			}
		}
	}

});






function prepareForMobile(){
	//初始化css，gridContainerWidth需要随个数更改
	if (documentWidth > 500) {
		gridContainerWidth = 500;
		gridCellLen = 100;
		gridCellSpace = 20;

	}


	$('#grid-container').css({
		'width':gridContainerWidth-(2*gridCellSpace),
		'height':gridContainerWidth-(2*gridCellSpace),
		'padding':gridCellSpace
	})
	$('.grid-cell').css({
		'width':gridCellLen,
		'height':gridCellLen,
		
	})
}
function newGame(){
	//初始化棋盘格
	init();
	//在棋盘格随机生成两个数字
	generateOneNumber()
	generateOneNumber()


}
function init(){
	for (var i = 0; i < lineX; i++) 
		for (var j = 0; j < lineY; j++) {
			var gridCell = $('#grid-cell-'+i+'-'+j)
			gridCell.css('top',getPosTop(i,j))
			gridCell.css('left',getPosLeft(i,j))
		}
	
	for (var i = 0; i < lineX; i++) {
		board[i] = new Array()
		hasConflicted[i] = new Array()
		for (var j = 0; j < lineY; j++ ){
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
		
	}

	updateBoardView();


	score = 0;
	
}
function updateBoardView(){
	$('.number-cell').remove();
	for (var i = 0; i < lineX; i++) {
		for (var j = 0; j < lineY; j++) {
			
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			if (board[i][j] == 0) {
				theNumberCell.css('width','0')
				theNumberCell.css('height','0')
				theNumberCell.css('top',getPosTop(i,j)+gridCellLen/2)
				theNumberCell.css('left',getPosLeft(i,j)+gridCellLen/2)
				

			}else{
				theNumberCell.css('width',gridCellLen)
				theNumberCell.css('height',gridCellLen)
				theNumberCell.css('top',getPosTop(i,j))
				theNumberCell.css('left',getPosLeft(i,j))
				theNumberCell.css('background',getNumberBackgroungColor(board[i][j]))
				theNumberCell.css('color',getNumberColor(board[i][j]))
				theNumberCell.text(board[i][j])

				
			}
			hasConflicted[i][j] = false;
			
			if (board[i][j]>64){
				theNumberCell.css('font-size',0.4*gridCellLen+'px')

			}else{
				theNumberCell.css('font-size',0.6*gridCellLen+'px')
			}

		}
	}
	$('.number-cell').css('line-height',gridCellLen+'px')
	


}
function generateOneNumber(){
	 if (noSpace(board)) 
	 	return false

	 //生成一个位置
	 var rendx = parseInt(Math.random()*pot)
	 var rendy = parseInt(Math.random()*pot)
	 var timers = 0
	 while(timers<50){
	 	if (board[rendx][rendy] == 0)
	 		break;
	 	rendx = parseInt(Math.random()*pot)
	 	rendy = parseInt(Math.random()*pot)
	 	timers ++;
	 }
	 if (timers ==50) {
	 	for(var i = 0; i < lineX ; i ++)
	 		for(var j = 0 ; j < lineY ; j ++)
	 			if (board[i][j]==0) {
	 				rendx = i;
	 				rendy = j;
	 			}
	 }
	 //随机生成一个数字
	 var randomNum = Math.random()<0.5?1:4
	 board[rendx][rendy] = randomNum
	 //动态显示数字2
	 showNumber(rendx,rendy,randomNum)
	 return true

}


$(document).keydown(function(event){

	switch(event.keyCode){
		case 37://left
			if (moverLeft()) {
				setTimeout('generateOneNumber()',210)
				setTimeout('isOverGame()',300)
			}
			break;
		case 38://top
			if (moverTop()) {
				setTimeout('generateOneNumber()',210)
				setTimeout('isOverGame()',300)
			}
			break;
		case 39://right
			if (moverRight()) {
				setTimeout('generateOneNumber()',210)
				setTimeout('isOverGame()',300)
			}
			break;
		case 40://down
			if (moverDown()) {
				setTimeout('generateOneNumber()',210)
				setTimeout('isOverGame()',300)
			}
			break;
		default:
			break;
		
		

		


	}

})
function isOverGame(){
	if (noSpace(board)&&noMove(board)) {
		gameOver()
	}
}
function gameOver(){
	alert('游戏结束！')
}
function moverLeft(){
	if (!canMoveLeft(board))
		return false;
	for(var i = 0 ; i < lineX ; i ++)
		for(var j = 1 ; j < lineY ; j ++)

			if (board[i][j] != 0){
				

				for (var k = 0 ; k < j ; k ++){
					if (board[i][k] == 0 && noBlockHorizontal(i,k,j,board)) {
						//move
						showMoverAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue

					}
					if (board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[k][i]) {
			
						//move
						showMoverAnimation(i,j,i,k);
						
						
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						hasConflicted[k][i] = true;
						score += board[i][k];
						updataScore(score)
						continue
					}
				}

			} 
	setTimeout(updateBoardView,200)
	
	return true;
	
}
function moverRight(){
	if (!canMoveRight(board))
		return false;
	for(var i = 0 ; i < lineX ; i ++)
		for(var j = lineY - 2 ; j >=0 ; j --)

			if (board[i][j] != 0){
				console.log(board[i][j])
				

				for (var k = lineY - 1 ; k >j ; k --){
					if (board[i][k] == 0 && noBlockHorizontal(i,j,k,board)) {
						//move
						showMoverAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue

					}
					else if (board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]) {
						//move
						showMoverAnimation(i,j,i,k);
						
						
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						updataScore(score)
						hasConflicted[i][k] = true;
						continue
					}
				}

			} 
	setTimeout(updateBoardView,200)
	
	return true;
	
}
function moverTop(){
	if (!canMoveTop(board))
		return false;
	for(var j =0 ; j < lineY ; j ++)
		for(var i = 1 ; i < lineX ; i ++)

			if (board[i][j] != 0){
				

				for (var k = 0 ; k <i ; k ++){
					if (board[k][j] == 0 && noBlockVertical(j,k,i,board)) {
						//move
						showMoverAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue

					}
					else if (board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]) {
						//move
						showMoverAnimation(i,j,k,j);
						
						
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						updataScore(score)
						hasConflicted[k][j] = true;
						continue
					}
				}

			} 
	setTimeout(updateBoardView,200)
	
	return true;
	
}
function moverDown(){
	if (!canMoveDown(board))
		return false;
	for(var j =0 ; j < lineY ; j ++)
		for(var i = lineX - 2 ; i >=0 ; i --)

			if (board[i][j] != 0){
				console.log(board[i][j])
				

				for (var k = lineX - 1 ; k >i ; k --){
					if (board[k][j] == 0 && noBlockVertical(j,i,k,board)) {
						//move
						showMoverAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue

					}
					else if (board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]) {
						//move
						showMoverAnimation(i,j,k,j);
						
						
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						updataScore(score)
						hasConflicted[k][j] = true;
						continue
					}
				}

			} 
	setTimeout(updateBoardView,200)
	
	return true;
	
}


















