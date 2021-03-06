function animate(obj,group,isLinear){
	clearInterval(obj.Timer);
	iSpeed = 0;
	obj.Timer = setInterval(function(){
		var andAll = true;
		for(var attr in group){
			var whether = false;//是否关闭定时器
			var current = parseFloat(getComputedStyle(obj,false)[attr]);
			if(attr == 'opacity'){
				current = Math.round(current * 100);
			}
			if(isLinear){
				//匀速
				if(current > target){	
					iSpeed = -10;
				}else{
					iSpeed = 10;
				}
				//退出条件
				if(Math.abs(target - current) < Math.abs(iSpeed)){
					if(attr == 'opacity'){
						obj.style.opacity = target / 100;
					}else{
						obj.style[attr] = target + 'px';
					}
					whether = true;
				}else{
					andAll = false;
				}
			}else{
				//减速
				iSpeed = (target - current)/10;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				//退出条件
				if(!iSpeed){
					whether = true;
				}else{
					andAll = false;
				}
			}
		}
		if(whether){
			clearInterval(obj.Timer);
		}else{
			if(attr == 'opacity'){
				obj.style.opacity = (current + iSpeed)/100;	
			}else{
				obj.style[attr] = current + iSpeed +'px';
			}
		}
	},30)
}




function getScrollTop(){
	return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}