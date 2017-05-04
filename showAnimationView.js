function showNumber(i,j,num){
	
	var  theNumberCell = $('#number-cell-'+i+'-'+j);
	
	theNumberCell.css('background',getNumberBackgroungColor(num))
	theNumberCell.css('color',getNumberColor(num))
	theNumberCell.text(num)

	theNumberCell.animate({
		width:gridCellLen,
		height:gridCellLen,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50)


}

function showMoverAnimation(formx,formy,tox,toy){
	var  numberCell = $('#number-cell-'+formx+'-'+formy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200)


}
function updataScore(score){
	$('#score span').text(score)
}
