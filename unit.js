
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

function getUnit(str, dUnit) {
    if (!str) return "";
    let unit = str.match(/[a-zA-Z]/g),
        res = unit ? unit.join('') : dUnit;
    return res
}

var unit = {
    _extends,
    err,
    setStyle,
    getUnit
}

module.exports = unit