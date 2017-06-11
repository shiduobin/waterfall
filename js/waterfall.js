$(document).ready(function() {
	$(window).on("load", function() {
		imgLocation("container", "box");
		window.onscroll = function() {
			if(scrollside()) {
				$.getJSON("js/img.json", function(json) {
					var imgData = json.data;
					$.each(imgData, function(index, value) {
						var box = $("<div>").addClass("box").appendTo($("#container"));
						var content = $("<div>").addClass("content").appendTo(box);
						console.log($(value).attr("title"));
						$("<img>").attr("src", "./img/" + $(value).attr("src")).appendTo(content);
						var p = $('<p></p>'); //创建一个p标签
						p.addClass("img-title"); //添加css样式
						p.text($(value).attr("title")); //给p标签添加内容
						p.appendTo(content);
					});
					imgLocation("container", "box");
				});
			}
		}
	});
});

function imgLocation(parent, content) {
	var parent = document.getElementById(parent);
	var content = getChildElement(parent, content);
	var box = $(".box");
	var boxWidth = box.eq(0).width(); //获取box的宽度
	var num = Math.floor($(window).width() / boxWidth); //获取box的个数
	parent.style.cssText = "width:" + boxWidth * num + "px;margin:0 auto"; //用box的宽度*box个数指定宽度，使图片整体居中
	var boxheightArr = []; //box高度集合
	box.each(function(index, value) {
		var boxHeight = box.eq(index).height(); //获取box的高度
		if(index < num) {
			boxheightArr[index] = boxHeight;
		} else {
			var minboxHeight = Math.min.apply(null, boxheightArr); //获取最小box的高度
			var minboxIndex = $.inArray(minboxHeight, boxheightArr);
			$(value).css({
				"position": "absolute", //第二排图片绝对定位
				"top": minboxHeight + 20, //第二排图片距离顶部的距离为第一排最小图片的高度
				"left": box.eq(minboxIndex).position().left, //第二排图片距离左边的距离为第一排最小图片的位置
			});
			boxheightArr[minboxIndex] += box.eq(index).height() + 20;
		}
	});
}

function getChildElement(parent, content) {
	var boxcontentArr = []; //存放box内容集合
	var allcontent = parent.getElementsByTagName("*");
	for(var i = 0; i < allcontent.length; i++) {
		if(allcontent[i].className == content) {
			boxcontentArr.push(allcontent[i]);
		}
	}
	return boxcontentArr;
}

function scrollside() {
	var box = $(".box");
	var lastboxHeight = Math.floor(box.last().get(0).offsetTop / 2) + Math.floor(box.last().height() / 2); //最后一张图片距离顶端的距离+最后一张图片高度的一半
	var documentHeight = $(document).width(); //当前能看见的部分容器的高低
	var scrollHeight = $(window).scrollTop(); //鼠标滚动的距离顶端的高度
	return(lastboxHeight < documentHeight + Math.floor(scrollHeight / 2)) ? true : false;
}
