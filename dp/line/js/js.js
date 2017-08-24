/**
* Chart information
**/
var info = {
    top: "RANK SCORE RANK",
    left: "HISTORY",
    bottom: "QUY LAM VIEC",
};

/**
* Data chart
**/
var line = {
    height: [0, 1, 2, 3, 4, ""],
    value: [1.5, 3.5, 1.5, 3.5, 2.5, 3.5],
    colorLine: "#0083ff",
    lineWidth: 4,
    colorText: "black",
    width: 50,
    distant: 35,
};

/**
* Draw line chart
**/
var lineChart = (function() {
    // Private
    var canvas = document.getElementById("myChart");
    var ctx = canvas.getContext("2d");
    canvas.height = 350;
    canvas.width = 600;
    
    /**
    * Draw explain
    */  
    function drawExplain() {
        var pX = line.distant + line.width;
        ctx.fillStyle = line.colorText;
        ctx.font = '18px Arial';
        ctx.fillText(info.bottom, line.width * 1.8, 330);
        ctx.rotate( - 90 * Math.PI / 180);
        ctx.fillText(info.left, - 220, 20);
    }
    function drawLine() {
        var chartX = 65;
        var chartY = 80;
        var size = line.width;
        var distant = line.distant; // distant between 2 line
        var width = line.width; // width line value
        var plinthX = (chartX + 22); // default position begin of line
        var heightValue = canvas.height - size * 1.5;
        ctx.strokeStyle = line.colorLine;
        ctx.lineWidth = line.lineWidth;
        ctx.beginPath();        
        ctx.stroke();
        var flag;
        var value = line.value;
        //Loop draw line
        for (var i = 0; i < value.length; i++) {
            //draw first value
            if (i == 0) {
                flag = value[i];
                ctx.moveTo(plinthX, heightValue - distant * value[i]);
                ctx.bezierCurveTo(plinthX * (flag - 0.3), heightValue - distant * value[i],
                              plinthX * (flag - 0.2), heightValue - distant * value[i + 1],
                              plinthX * flag, heightValue - distant * value[i + 1]);
            }
            //draw each value
            if (i > 0 && i < value.length - 3) {
                ctx.moveTo(plinthX * flag, heightValue - distant * value[i]);
                ctx.bezierCurveTo(plinthX * (flag + 0.2), heightValue - distant * value[i],
                                  plinthX * (flag + 0.3), heightValue - distant * value[i + 1],
                                  plinthX * (flag + 0.5), heightValue - distant * value[i + 1]);
                flag = flag + 0.5;
            }
            //draw value last - 1, last value is [length - 1], draw value before last value
            if (i == value.length - 2 - 1) {
                ctx.moveTo(plinthX * flag, heightValue - distant * value[i]);
                ctx.bezierCurveTo(plinthX * (flag + 0.1), heightValue - distant * value[i],
                                  plinthX * (flag + 0.2), heightValue - distant * value[i + 1],
                                  plinthX * (flag + 0.3), heightValue - distant * value[i + 1]);
                flag = flag + 0.3;
            }
            //draw value last
            if (i > value.length - 2 - 1) {
                ctx.moveTo(plinthX * flag, heightValue - distant * value[i]);
                ctx.bezierCurveTo(plinthX * (flag + 0.4), heightValue - distant * value[i],
                                  plinthX * (flag + 0.5), heightValue - distant * (flag + 0.4),
                                  plinthX * (flag + 0.8), heightValue - distant * value[i + 1]);
                flag = flag + 0.5;
            }
            
        }
        ctx.stroke();
    }
    
    /**
    * Draw background chart and line
    */
    function drawChart() {
        ctx.font = "23px Arial";
        ctx.fillStyle = line.colorText;
        ctx.fillText(info.top, line.width * 2.3, 30);
        var distantHeight = line.width;
        var chartX = 65;
        var chartY = 80;
        var size = line.width;
        var distant = line.distant;
        var plinthX = (chartX + 22);
        
        //Draw chart background (line bottom)
        var heightValue = canvas.height - size * 1.5;
        ctx.moveTo(plinthX - 20, heightValue);
        ctx.lineTo(plinthX + line.width * (line.height.length - 1), heightValue);
        //Draw line left
        ctx.moveTo(plinthX - 20, chartY - 8);
        ctx.lineTo(plinthX - 20, heightValue);
        //Fill height numbers
        for (var i = 0; i < line.height.length; i++) {
            heightValue -= distant;
            ctx.font = "14px arial";
            ctx.fillText(line.height[i], chartX - 10, plinthX + heightValue - distantHeight);
        }
        ctx.stroke();    
        drawLine();
    }
    return {
        draw: drawChart,
        explain: drawExplain,
    }
})();

$(document).ready(function() {
    lineChart.draw();
    lineChart.explain();
});
