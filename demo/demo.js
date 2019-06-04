
console.log(Carousel)
var myCarousel = new Carousel({
    width: 660,
    height: 370,
    parentNode: "#a",
    duration: "5000ms",
    transitionTime: ".6s",
    transitionName: "c",
    hidden: false,
    img: [
        { href: "123123", src: "./img/1.jpg", tipMes: "这是第1张图的介绍" },
        { href: "123123", src: "./img/2.jpg", tipMes: "这是第2张图的介绍" },
        { href: "123123", src: "./img/3.jpg", tipMes: "这是第3张图的介绍" },
        { href: "123123", src: "./img/4.jpg", tipMes: "这是第4张图的介绍" }
    ],
    hover: {
        pause: true
    },
    dots: {
        show: true,
        ordinaryColor: "rgba(255,0,0,.3)",
        activeColor: "#ff0000",
        dotSize: "20px",
        bottomDistance: "20px",
        transition: ".3s",
        turn: true
    },
    tip: {
        show: true,
        backgroundColor: "blue",
        fontColor: "#fff"
    }
});
myCarousel.picPlay();