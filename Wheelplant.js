
function err(errMes) {
	throw new Error(errMes)
}

function setStyle(node, styObj) {
	if (!styObj || Object.prototype.toString.call(styObj) !== "[object Object]") {
		err("The second parameter error of 'setStyle' function")
	} else {
		Object.keys(styObj).forEach(function (item) {
			node.style[item] = styObj[item]
		})
	}
}

function getUnit(str){
	return str.match(/[a-zA-Z]/g).join('')
}

function Wheelplant({ width, height, parentNode, img, transitionTime, duration, hover, dots }) {
	let self = this;
	this.width = width && typeof parseInt(width) === 'number' ? width : 0;
	this.height = height && typeof parseInt(height) === 'number' ? height : 0;
	this.parentNode = parentNode.nodeType === 1 ? parentNode : typeof parentNode === 'string' ? document.querySelector(parentNode) : null;
	this.duration = duration && typeof parseInt(duration) === 'number' ? duration : 0;;
	this.transitionTime = transitionTime || 0;
	this.timer = null;
	this._index = -1;
	if (Array.isArray(img) && img.length) {
		this.total = img.length;
		img.push(img[0]);
		this.img = img;
	} else {
		this.img = [];
	}
	//容器
	let container = document.createElement("div"),
		dotsNode = document.createElement("div");	
	this.container = container;
	this.dotsNode = dotsNode;
	setStyle(container, { width: width * this.img.length + "px", height: height + "px", transition: this.transitionTime })
	//生成子元素
	for (let item of this.img) {
		container.appendChild(this.createImg(item))
	}
	//hover
	if (hover) {
		if (hover.pause) {
			container.addEventListener("mouseenter", self.picPause.bind(self));
			container.addEventListener("mouseleave", function () {
				self.timer = setTimeout(function () {
					self.picPlay()
				}, self.duration)
			});
		}
	}

	//dotsNode
	if (dots && dots.show) {
		let baseParams = {
			ordinaryColor: "rgba(0,0,0,.5)",
			activeColor: "#fff",
			dotSize: "10px",
			bottomDistance: "20px",
			transition:"0s"
		}
		let params = Object.assign({},baseParams,dots),
			dotSizeUnit = getUnit(params.dotSize),
			bottomDistanceUnit = getUnit(params.bottomDistance),
			radius = parseInt(params.dotSize)/2+dotSizeUnit;
		this.dotsParams = params;
		setStyle(dotsNode,{width:"100%",textAlign:"center"})
		for (let i = 0; i < this.total; i++) {
			let dot = document.createElement("div");
			setStyle(dot, {display:"inline-block",marginRight:"10px",transition:params.transition,width:params.dotSize,height:params.dotSize,borderRadius:radius,backgroundColor:params.ordinaryColor});
			dotsNode.appendChild(dot);
		}
		this.parentNode.appendChild(dotsNode);
	}
	//挂载
	this.parentNode.appendChild(this.container);
	this.container.addEventListener('transitionend', function (e) {
		if (this.dataset.index == self.img.length - 1) {
			this.style.transition = "0s";
			this.style.transform = "translateX(0px)";
			this.setAttribute('data-index', 0);
			self.index = 0;
		}
	})

	Object.defineProperty(self, "index", {
		enumerable: true,
		configurable: false,
		get:function(){
			return self._index
		},
		set: function (val) {
			if(val == self._index)return;
			let _dots = dotsNode.getElementsByTagName("div"),
				lastIndex = self._index==-1?0:self._index>self.total-1?0:self._index,
				curIndex = val>self.total-1?0:val;
			console.log(lastIndex,curIndex);
			_dots[lastIndex].style.backgroundColor = self.dotsParams.ordinaryColor;
			_dots[curIndex].style.backgroundColor = self.dotsParams.activeColor;
			self._index = val;

		}
	})
}



Wheelplant.prototype.createImg = function (img) {
	let a = document.createElement("a");
	let _img = document.createElement("img");
	setStyle(a, { width: this.width + "px", height: this.height + "px", position: "relative", display: "inline-block" });
	setStyle(_img, { width: this.width + "px", height: this.height + "px" });
	_img.src = img.src;
	a.href = img.href ? img.href : "";
	a.appendChild(_img)
	return a
}

Wheelplant.prototype.pushSrc = function (img) {
	if (Array.isArray(img)) {
		this.img.splice(this.img.length - 1, 0, ...img)
	} else if (typeof img === 'string') {
		this.img.splice(this.img.length - 1, 0, img)
	}
}

Wheelplant.prototype.trun = function (index) {
	this.container.style.transition = this.transitionTime + 's';
	let _index = parseInt(index) >= 0 ? index : this.index;
	// console.log(_index)
	this.container.style.transform = `translateX(${-_index * this.width}px)`
}

Wheelplant.prototype.picPlay = function () {
	this.index++;
	this.container.setAttribute('data-index', this.index);
	this.trun();
	this.timer = setTimeout(() => {
		this.picPlay()
	}, this.duration)
}

Wheelplant.prototype.picPause = function () {
	let container = this.container;
	this.timer && clearTimeout(this.timer);
	if (container.dataset.index == this.img.length - 1) {
		container.style.transition = "0s";
		container.style.transform = "translateX(0px)";
		container.setAttribute('data-index', 0);
		this.index = 0;
	}
}


var myPlant = new Wheelplant({
	width: 200,
	height: 300,
	parentNode: "#a",
	duration: 2000,
	transitionTime: 0.4,
	img: [
		{ href: "123123", src: "./img/正面.jpg" },
		{ href: "123123", src: "./img/反面.jpg" },
		{ href: "123123", src: "./img/1.jpg" },
		{ href: "123123", src: "./img/2.jpg" }
	],
	hover: {
		pause: true
	},
	dots: {
		show: true,
		ordinaryColor:"#000",
		activeColor: "#ff0000",
		dotSize: "20px",
		bottomDistance: "20px",
		transition:".3s"
	}
})
myPlant.picPlay();
