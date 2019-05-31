
			function Wheelplant({width,height,parentNode,src,transitionTime,duration}){
				this.width = width&&typeof parseInt(width)==='number' ? width :0;
				this.height = height&&typeof parseInt(height)==='number' ? height :0;
				this.parentNode = parentNode.nodeType===1 ? parentNode : typeof parentNode === 'string' ? document.querySelector(parentNode) : null;
				this.src = Array.isArray(src) ? [...src,src[0]] : [];
				this.duration = duration&&typeof parseInt(duration)==='number' ? duration :0;;
				this.transitionTime = transitionTime || 0;
				this.index = -1;
				this.timer = null;
				let container = document.createElement("div")
				container.style.width = width*this.src.length+"px";
				container.style.height = height+"px";
				container.style.transition = this.transitionTime+'s';
				for(let item of this.src){
					container.appendChild(this.createImg(item))
				}
				this.container = container;
				this.parentNode.appendChild(this.container);
				let self = this;
				this.container.addEventListener('transitionend',function(e){
					if(this.dataset.index == self.src.length-1){
							this.style.transition = "0s";
							this.style.transform = "translateX(0px)";
							this.setAttribute('data-index',0);
							self.index = 0;
					}
				})
			}
			
			Wheelplant.prototype.createImg = function(src){
				let img = document.createElement("img");
				img.src = src;
				img.width = this.width;
				img.height = this.height;
				return img;
			}
			
			Wheelplant.prototype.pushSrc = function(src){
				if(Array.isArray(src)){
					this.src.splice(this.src.length-1,0,...src)
				}else if(typeof src === 'string'){
					this.src.splice(this.src.length-1,0,src)
				}
			}
			
			Wheelplant.prototype.trun = function(index){
				this.container.style.transition = this.transitionTime+'s';
				let _index = parseInt(index)>=0?index:this.index;
				// console.log(_index)
				this.container.style.transform = `translateX(${-_index*this.width}px)`
			}
			
			Wheelplant.prototype.picPlay=function (){
				this.index++;
				this.container.setAttribute('data-index',this.index);
				this.trun();
				this.timer = setTimeout(()=>{
					this.picPlay()
				},this.duration)
			}
			
			
// 			var myPlant = new Wheelplant({
// 				width:200,
// 				height:300,
// 				parentNode:"#a",
// 				duration:2000,
// 				transitionTime:0.4,
// 				src:[
// 					"./images/正面.jpg",
// 					"./images/反面.jpg"
// 				]
// 			})
// 			myPlant.picPlay();
