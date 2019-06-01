# Wheelplant
### 一个轮播图插件，通过简单的配置参数就可以实现一个轮播图。

### 使用方法

#### 导入
1 标签导入 `<script src="./Wheelplant.js"></script>` 

2 commonJS `const Wheelplant = require('./Wheelplant.js')` 

#### 初始化
`var myWheelPlant = new Wheelplant(options)`

`myWheelPlant.picPlsy()`


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
      
#### Wheelplant的方法

Wheelplant.picPlay(),播放图片，初始化后需调用此方法来开始播放图片。

Wheelplant.picPause(),暂停播放。

Wheelplant.turn(index),跳转到对应图片。

Wheelplant.pushSrc(array||object),添加img数据（暂不能使用）。
      
      
      
      
      
      
      
      
      
      
      
      
      
      
