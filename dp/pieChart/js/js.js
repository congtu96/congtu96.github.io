/**
* Data of Module
*/
var myData = {
    values: [10, 20, 10, 60],
    info: ["Xuất sắc", "Tốt", "Trung bình", "Kém"],
};
/**
* Setting option Module
*/
var setting = {
    color: ["#4267b1", "#e42a1d", "#ff9800", "#189747"],
};

/**
* Module pie chart 2D
*/
var _pie2D = (function() {
	// Private
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    canvas.height = 400;
    canvas.width = 400;
    
    var data = myData.values;
    var color = setting.color;
    var total = 0;
    var lastEnd = 1.5 * Math.PI;
    // Position of the center pie
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    
    for (var i in data) {
        var tmp = parseInt(data[i]);
        total += tmp;
    }
    console.log(total);
/**
* Draw pie 2D
*/
    function drawPie() {
        //Radius of pie
        var r = canvas.height / 2;
        for (var i in data) {      
            ctx.fillStyle = color[i];
            ctx.beginPath();
            ctx.moveTo(x, y);
            // Arc Parameters: x, y, radius, starting Angle (radians), ending Angle (radians), antiClockwise (boolean)
            ctx.arc(x, y, r, lastEnd, lastEnd + (Math.PI * 2 * (data[i] / total)), false);
            ctx.fill();
            lastEnd += Math.PI * 2 * (data[i] / total);
        }
        var tmp = lastEnd;
        for (var i in data) {
            var slice = 2 * Math.PI * (data[i] / total);
            //Calculate the position of the text
            var pX = x + r/1.3 * Math.cos(tmp + slice/2);
            var pY = y + r/1.4 * Math.sin(tmp + slice/2);
            ctx.font = "20px Georgia";
            ctx.fillStyle = "black";
            var info = data[i] * 100 / total;
            ctx.fillText(info + "%", pX, pY);
            tmp += (data[i]/total) * Math.PI * 2;
        }
    }
    
    /**
    * Draw circle inside pie chart
    */
    function drawCircle() {
        var miniRadius = canvas.height / 4;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, miniRadius, 0, Math.PI * 2);
        ctx.fill();
    }
    return {
        draw: drawPie,
        init: drawCircle,
    }
})();

/**
* Module draw info pie chart 2D
*/
var info = (function() {
    var canvas = document.getElementById("info");
    var ctx = canvas.getContext("2d");
    canvas.height = 250;
    canvas.width = 150;
    function drawInfo() {
        var color = setting.color;
        var _info = myData.info;
        var textX = 30;
        var textY = 30;
        var positionX = 0;
        var positionY = 10;
        for (var i in color) {
            ctx.fillStyle = color[i];
            ctx.fillRect(positionX , positionY, 20, 20);
            ctx.font = "20px Georgia";
            ctx.fillStyle = "black";
            ctx.fillText(_info[i], textX, textY);
            positionY += 30;
            textY += 30;
        }
    }
    return {
        draw: drawInfo,
    }
})();
$(document).ready(function() {
    _pie2D.draw();
    _pie2D.init();
    info.draw();
});
 