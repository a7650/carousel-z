/**
 * carousel-z v1.0.3
 * (c) 2019 zzp
 */

`use strict`

const unit = require('../unit.js')

function Carousel({ width, height, parentNode, img, transitionTime, duration, hover, dots, tip, hidden, transitionName }) {
	if (!(width && height && parentNode && img && duration)) {
		err("please check width&&height&&parentNode&&img&&duration")
	}
	switch (true) {
		case typeof width !== 'number' && typeof width !== 'string': unit.err("'width' error"); break;
		case typeof height !== 'number' && typeof height !== 'string': unit.err("'height' error"); break;
		case typeof duration !== 'number' && typeof duration !== 'string': unit.err("'duration' error"); break;
	}
	let self = this,
		widthUnit = unit.getUnit(width.toString(), "px"),
		heightUnit = unit.getUnit(height.toString(), "px"),
		transitionTimeUnit = unit.getUnit(transitionTime.toString(), "s"),
		content = document.createElement("div"),
		container = document.createElement("div"),
		dotsNode = document.createElement("div");
	this.widthUnit = widthUnit;
	this.width = parseInt(width) + widthUnit;
	this.height = parseInt(height) + heightUnit;
	this.parentNode = parentNode.nodeType === 1 ? parentNode : typeof parentNode === 'string' ? document.querySelector(parentNode) : null;
	(!parentNode) && unit.err("'parentNode' error")
	this.transitionName = typeof transitionName === 'string' ? transitionName : "carousel-default";
	this.duration = parseInt(duration);
	transitionTime && (this.transitionTime = typeof parseFloat(transitionTime) === 'number' ? parseFloat(transitionTime) + transitionTimeUnit : 0);
	if (Array.isArray(img) && img.length) {
		this.img = img;
		this.total = img.length;
	} else {
		err("'img' error")
	}
	this.animation = false;
	this.timer = null;
	this._index = -1;
	this.container = container;
	this.dotsNode = dotsNode;
	unit.setStyle(content, { position: "relative", width: this.width, height: this.height, overflow: typeof hidden === "undefined" ? "hidden" : hidden ? "hidden" : "visible" });
	unit.setStyle(container, { width: this.width, height: this.height, })
	//生成子元素
	for (let item of this.img) {
		container.appendChild(this.createImg(item))
	}
	this.allImg = container.children;

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
			transition: "0s",
			spacing: "10px",
			turn: true
		}
		let params = unit._extends({}, baseParams, dots),
			dotSizeUnit = unit.getUnit(params.dotSize, "px"),
			dotSizeVal = parseInt(params.dotSize),
			bottomDistanceUnit = unit.getUnit(params.bottomDistance, "px"),
			radius = dotSizeVal / 2 + dotSizeUnit;
		this.dotsParams = params;
		unit.setStyle(dotsNode, { width: "100%", textAlign: "center", position: "absolute", bottom: params.bottomDistance, zIndex: 99 });
		//添加子元素
		for (let i = 0; i < this.total; i++) {
			var dot = document.createElement("div");
			dot.index = i;
			unit.setStyle(dot, { display: "inline-block", marginRight: params.spacing, transition: params.transition, width: dotSizeVal + dotSizeUnit, height: dotSizeVal + dotSizeUnit, borderRadius: radius, backgroundColor: params.ordinaryColor, cursor: params.turn ? "pointer" : '' });
			if (i === this.total - 1) {
				dot.style.marginRight = 0;
			}
			dotsNode.appendChild(dot);
		}
		//turn
		if (params.turn) {
			dotsNode.addEventListener("click", function (e) {
				let cur = e.target,
					index,
					last;
				if (cur.index > -1 && cur.index != self.index && !self.isanimated()) {
					index = cur.index;
				} else {
					return
				}
				self.timer && clearTimeout(self.timer);
				last = self.index;
				self.index = index;
				self.turn(index, last)
				self.timer = setTimeout(() => {
					self.picPlay()
				}, self.duration)
			})
		}
		content.appendChild(dotsNode);

		Object.defineProperty(self, "index", {
			enumerable: true,
			configurable: false,
			get: function () {
				return self._index
			},
			set: function (val) {
				if (val == self._index) return;
				let _dots = dotsNode.getElementsByTagName("div"),
					lastIndex = self._index == -1 ? 0 : self._index,
					curIndex = val;
				_dots[lastIndex].style.backgroundColor = self.dotsParams.ordinaryColor;
				_dots[curIndex].style.backgroundColor = self.dotsParams.activeColor;
				self._index = val;
			}
		})
	}

	//tip
	if (tip.show) {
		img.forEach(function (item, i) {
			if (!item.tipMes) {
				unit.err("img[" + i + "]'s " + "tipMes is undefined")
			}
			if (typeof item.tipMes !== "string") {
				unit.err("The 'tipMes' attribute is not 'string' type")
			}
		})
		let params = unit._extends({}, { fontColor: "#fff", backgroundColor: "rgba(0,0,0,.5)" }, tip)
		let tipNode = document.createElement("div");
		unit.setStyle(tipNode, { padding: "6px", color: params.fontColor, backgroundColor: params.backgroundColor, display: "none", position: "fixed", zIndex: 100, borderRadius: "3px" });
		container.addEventListener("mouseenter", function (e) {
			let curIndex = self.index == self.total ? 0 : self.index;
			tipNode.innerHTML = img[curIndex].tipMes;
			tipNode.style.display = "block";
		})
		container.addEventListener("mousemove", function (e) {
			tipNode.style.top = `${e.pageY + 30}px`;
			tipNode.style.left = `${e.pageX + 16}px`;
		})
		container.addEventListener("mouseleave", function (e) {
			tipNode.style.display = "none";
		})
		content.appendChild(tipNode);
	}
	content.appendChild(container);
	this.parentNode.appendChild(content);
}



Carousel.prototype.createImg = function (img) {
	let a = document.createElement("a");
	let _img = document.createElement("img");
	unit.setStyle(a, { width: this.width, height: this.height, position: "absolute", display: "block", top: 0, left: 0, display: "none", transitionDuration: this.transitionTime });
	unit.setStyle(_img, { width: this.width, height: this.height });
	_img.src = img.src;
	a.href = img.href ? img.href : "";
	a.appendChild(_img)
	return a
}

Carousel.prototype.isanimated = function () {
	return this.animation
}

Carousel.prototype.turn = function (to, from) {
	let nextNode = this.allImg[to],
		lastNode = this.allImg[from],
		t = this.transitionTime,
		enterClass, leaveClass;
	if (to > from || (to === 0 && from === this.total - 1)) {
		enterClass = this.transitionName + "-enter";
		leaveClass = this.transitionName + "-leave";
	} else if (to < from) {
		enterClass = this.transitionName + "-leave";
		leaveClass = this.transitionName + "-enter";
	}
	unit.setStyle(nextNode, { display: 'block', zIndex: 2 });
	nextNode.classList.add(enterClass)
	setTimeout(function () {
		nextNode.classList.remove(enterClass)
	}, 0)
	if (lastNode) {
		lastNode.classList.add(leaveClass);
		unit.setStyle(lastNode, { zIndex: 1 });
		setTimeout(() => {
			if (lastNode.classList.contains(leaveClass)) {
				lastNode.classList.remove(leaveClass);
				lastNode.style.display = "none";
			}
			this.animation = false;
		}, parseFloat(t) * 1000);
		this.animation = true;
	}
}

Carousel.prototype.picPlay = function () {
	let lastIndex = this.index,
		nextIndex = this.index + 1;

	if (nextIndex >= this.total) {
		nextIndex = 0;
		lastIndex = this.total - 1;
	}
	this.index = nextIndex;
	this.container.setAttribute('data-index', this.index);
	this.turn(nextIndex, lastIndex);
	this.timer = setTimeout(() => {
		this.picPlay()
	}, this.duration)
}

Carousel.prototype.picPause = function () {
	this.timer && clearTimeout(this.timer);
}

module.exports = Carousel;

// Allow use of default import syntax in TypeScript
module.exports.default = Carousel;




