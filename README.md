# carousel-z
### 一个轮播图插件，通过简单的配置参数就可以实现一个轮播图。

### 使用方法

#### 安装
<<<<<<< HEAD
 `npm install carousel-z`

#### 使用
`import Carousel from "carousel-z"`

`var myCarousel = new Carousel(options)`

`myCarousel.picPlay()`
=======
 `npm install wheel-plant`

#### 使用
`var myWheelPlant = new Wheelplant(options)`

`myWheelPlant.picPlsy()`
>>>>>>> d0e683200715973d12d256250591d445734298cf


参数options为一个对象，设定了轮播图的各种参数。

#### options的属性示例
##### parentNode(必须)(string || object)

     parentNode为将要挂载的dom对象，即轮播图挂载在该dom上，此参数必须传入，可以是一个css选择器或者dom对象。
     
##### width(必须)(string || number)

    width为轮播图容器的宽度，即将要显示的单张图片的宽度。此参数必须传入，可以是数值类型或字符串类型，数值类型时默认单位为"px"。
    
##### height(必须)(string || number)

    同"width"。
    
##### duration(必须)(string || number)

    duration为图片播放的间隔，此参数必须传入，可以是数值类型或字符串类型。单位为"ms"。
    
##### transitionTime(可选)(string || number)

    transitionTime为图片切换动画的时长，单位为"s"

##### img(必须)(array)

    img为所有图片的数据，数组类型，数组的每一项为单个图片数据，是对象类型，对象属性如下：
      {
        href:"链接，即用户点击该图片要跳转的链接",
        src:"图片的src，可选",
        tipMes:"提示信息,可选，但在使用tip时必须参在"
      }

##### hover(可选)(object)

    hover控制鼠标在轮播图上时的行为，有如下属性：
      hover.pause:鼠标悬停时是否停止播放图片，boolean类型，默认为false。
     
##### hidden(可选)(boolean)

    超出容器范围时是否隐藏图片，默认为true，即隐藏。

##### transitionName(可选)(string)

    你可以通过设置该属性来指定类名，`transitionName-enter`和`transitionName-leave`(例如你设置transitionName为"cir"，则相应的类名为"cir-enter"和"cir-leave")；

    之后你就可以在css中添加"transitionName-enter"和"transitionName-leave"的样式，他们分别表示图片在"进入容器范围之前的状态"和"进入容器范围之后的状态"；

    当然如果你没有设置这个属性的话，你也有默认的类名来使用，他们分别是"carousel-default-enter"和"carousel-default-leave"，使用这两个能达到相同的效果；

    如果你设置了transitionName属性，则默认的类名将不能使用，因为他们会被默认的类名覆盖掉。

##### dots(可选)(object)

    dots设置图片的控制条。主要有以下属性：
      dots.show:是否显示控制条，默认false，即不显示。
      dots.ordinaryColor:非当前图片的dot的颜色，默认为半透明的黑色。
      dots.activeColor:当前图片的dot的颜色，默认白色。
      dots.dotSize:dot的直径，默认10px。
      dots.bottomDistance:控制条与底部的距离，默认20px。
      dots.transition:dot的样式变化时间，默认0s。
      dots.spacing:dot间隔，默认10px。
      turn：点击dot是否跳转到对应图片，默认true。
      
##### tip(可选)(object)

    tip设置图标在图片上悬浮时的提示框属性，有如下属性：
      tip.show:是否显示提示框。该参数为true时，img中图片数据的tipMes必须存在。
      backgroundColor:提示框背景颜色，默认为半透明的黑色。
      fontColor:提示框字体，默认为白色。
      
#### Wheelplant的方法(以下方法可以在Carousel的实例上使用)

myCarousel.picPlay(),播放图片，初始化后需调用此方法来开始播放图片。

myCarousel.picPause(),暂停播放。

myCarousel.turn(to,from),参数为图片的index，从from跳转到to。

myCarousel.isanimated(),判断是否处于动画状态，返回true或false。




      
      
      
      
      
      
      
      
      
      
      
      
      
      
