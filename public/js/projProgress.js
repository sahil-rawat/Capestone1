function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
}


function showname(){
	
	id=event.target.name
	document.getElementById(id).style.display='inline'
}

function hidename(){
	
	id=event.target.name
	document.getElementById(id).style.display='none'
}

console.dir(JSON.parse(document.getElementById('pp').value))
var pp=JSON.parse(document.getElementById('pp').value)
Object.keys(pp).forEach(e=>{

var KanbanTest = new jKanban({
	element : '#myKanban'+e,
	widthBoard : '100%',  
	responsivePercentage: true,
	
	boards  :pp[e]
});

})

