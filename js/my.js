//  调色板插件 
$(document).ready(function () {

	$('.demo').each(function () {
		$(this).minicolors({
			control: $(this).attr('data-control') || 'hue',
			defaultValue: $(this).attr('data-defaultValue') || '',
			inline: $(this).attr('data-inline') === 'true',
			letterCase: $(this).attr('data-letterCase') || 'lowercase',
			opacity: $(this).attr('data-opacity'),
			position: $(this).attr('data-position') || 'bottom left',
			change: function (hex, opacity) {
				if (!hex) return;
				if (opacity) hex += ', ' + opacity;
				try {
					console.log(hex);
					oPtxt.style.color = hex; //改变字体颜色
					var oPtxtCode = document.getElementById("textDiv").innerHTML;
					teCode.innerText = oPtxtCode; //动态生成code
				} catch (e) {}
			},
			theme: 'bootstrap'
		});

	});

});
var scale = function (btn, bar, title) {
	this.btn = document.getElementById(btn);
	this.bar = document.getElementById(bar);
	this.title = document.getElementById(title);
	this.step = this.bar.getElementsByTagName("div")[0];
	this.init();
};
var oPtxt = document.getElementById("textDiv").children[0];
var teCode = document.getElementById("text_code");
var Color = document.getElementById("position-bottom-right");
scale.prototype = {
	init: function () {
		var f = this,
			g = document,
			b = window,
			m = Math;
		f.btn.onmousedown = function (e) {
			var x = (e || b.event).clientX;
			var l = this.offsetLeft;
			var max = f.bar.offsetWidth - this.offsetWidth;
			g.onmousemove = function (e) {
				var thisX = (e || b.event).clientX;
				var to = m.min(max, m.max(-2, l + (thisX - x)));
				f.btn.style.left = to + 'px';
				f.ondrag(m.round(m.max(0, to / max) * 100), to);
				b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
			};
			g.onmouseup = new Function('this.onmousemove=null');
		};
	},
	ondrag: function (pos, x) {
		this.step.style.width = Math.max(0, x) + 'px';
		this.title.innerHTML = pos + '%';
		oPtxt.style.fontSize = 12 + pos + "px";
		var oPtxtCode = document.getElementById("textDiv").innerHTML;
		teCode.innerText = oPtxtCode;
	}
}
new scale('btn', 'bar', 'title');
