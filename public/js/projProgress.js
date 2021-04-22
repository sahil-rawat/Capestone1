function test(){
	var tabsNewAnim = $('#navbarSupportedContent')
	var activeItemNewAnim = tabsNewAnim.find('.active')
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight()
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth()
	var itemPosNewAnimTop = activeItemNewAnim.position()
	var itemPosNewAnimLeft = activeItemNewAnim.position()
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	})
}

function showname(){
	id=event.target.name
	document.getElementById(id).style.display='inline'
}

function hidename(){
	id=event.target.name
	document.getElementById(id).style.display='none'
}

var pp=JSON.parse(document.getElementById('pp').value)
var pid=document.getElementById('pid').value
Object.keys(pp).forEach(e=>{
	var KanbanTest = new jKanban({
		element : '#myKanban'+e,
		widthBoard : '100%',  
		responsivePercentage: true,
		boards  :pp[e],
		itemHandleOptions: {
            enabled : true,
            customHandler       : "<div class='item_handle'><h5>%s</h5> <br><button class='btn btn-secondary'><i class='fa fa-comment'></i> comment</button></div> "
        },
		dropEl : function (el, target, source, sibling) {   
			var data=el.getAttribute('data-eid')

			
			var boardNum=KanbanTest.options.element.slice(-1)
			var opt=KanbanTest.options.boards
			var pp_temp={}
			var progress;


			opt[source.parentElement.getAttribute('data-order')-1]['prog']-=1
			opt[target.parentElement.getAttribute('data-order')-1]['prog']+=1


			var index;
			
			opt[source.parentElement.getAttribute('data-order')-1]['item'].forEach((e,i)=>{
				if(e.id==data){
				index=i
				}
			})
			var item=opt[source.parentElement.getAttribute('data-order')-1]['item'][index]
			opt[source.parentElement.getAttribute('data-order')-1]['item'].splice(index,1)
			opt[target.parentElement.getAttribute('data-order')-1]['item'].splice(index, 0, item)

			if(target.parentElement.getAttribute('data-order')==1){
				progress=0
			}else if(target.parentElement.getAttribute('data-order')==2){
				progress=30
			}else if(target.parentElement.getAttribute('data-order')==3){
				progress=60
			}else{
				progress=100
			}

			pp_temp[boardNum]=opt
			
			data={
				pp:pp_temp
			}

			var http = new XMLHttpRequest();
			http.open("POST", "/project/"+pid+"/progress/update");
			http.setRequestHeader("Content-Type","application/json")
			http.send(JSON.stringify(data));
			http.onreadystatechange = function () {
				var prog=http.responseText
				document.getElementById("_progress").innerHTML=http.responseText
				document.getElementById("_progress").parentElement.classList.add('p'+prog)
			}
		} 
	});

})



function toggle(){
	console.log("myKanban"+event.target.id)
	var a= document.getElementById("myKanban"+event.target.id)
	
	if (a.style.display == 'none'){
		a.style.display="block"
	}else{
		a.style.display='none';
	}
	console.log(a)
}