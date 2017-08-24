/**
* Chart information
**/
var info = {
    top: "BIỂU ĐỒ LỊCH SỬ LEVEL OF POSITION",
    left: "LEVEL OF POSITION",
    right: ["LEVEL", "OF", "POSITION"],
    bottom: "TÊN DỰ ÁN",
};

/**
* Data colum chart
**/
var colum = {
    height: [0, 1, 2, 3, 4],
    width: 45,
    distant: 30,
    name: ["A", "B", "C", "E", "F"],
    value: [2, 0, 3, 4, 4],
    colorColum: "blue",
    colorText: "black",
};

/**
* Draw colum chart
**/
var columChart = (function() {
    // Private
    var canvas = document.getElementById("myChart");
    var ctx = canvas.getContext("2d");
    canvas.height = 350;
    canvas.width = 600;
    
    /**
    * Draw explain
    */
    function drawExplain() {
        var pX = colum.distant + colum.width;
        var _heightText = colum.width * 2.6;
        ctx.fillStyle = colum.colorColum;
        ctx.fillRect(pX * (colum.height.length + 1.4), colum.width * 1.55, colum.width, colum.width / 2);
        ctx.fillStyle = colum.colorText;
        ctx.font = '16px Arial';
        for (var i in info.right) {
            ctx.fillText(info.right[i], pX * (colum.height.length + 1.4), _heightText);
            _heightText += colum.distant - 5;
        }
        ctx.font = 'Italic 18px Arial';
        ctx.fillText(info.bottom, 220, 330);
        ctx.rotate( - 90 * Math.PI / 180);
        ctx.fillText(info.left, - 250, 20);
    }
    
    /**
    * Draw background chart and colum
    */
    function drawChart() {
        ctx.font = "24px Arial";
        ctx.fillStyle = colum.colorText;
        ctx.fillText(info.top, 50, 30);
        var distantHeight = 45;
        var chartX = 63;
        var chartY = 80;
        var size = colum.width;
        var distant = colum.distant;
        var plinthX = (chartX + 22);
        var plinthY = (chartY - 8) + size * 3;
        var value = colum.value;
        //Draw chart background
        ctx.moveTo(chartX + 22, canvas.height - 97);
        ctx.lineTo(chartX + 22 + (size + distant) * colum.height.length, canvas.height - 97);
        ctx.stroke();
        var tmp = 0;
        for (var i = colum.height.length - 1; i >= 0; i--) {
            ctx.moveTo(chartX + 22, (chartY - 8) + tmp);
            ctx.lineTo(chartX + 22 + (size + distant) * colum.height.length, (chartY - 8) + tmp);
            tmp += distantHeight;
            ctx.font = "14px arial";
            ctx.fillText(colum.height[i], chartX, chartY + tmp - distantHeight - 5);
        }
        ctx.stroke();
        ctx.fillStyle = colum.colorColum;
        //Draw each colum
        for (var i = 0; i < colum.height.length; i++) {
            //If value = 0, draw colum height = 5
            if (value[i] == 0) {
                ctx.fillRect(plinthX, plinthY + 40, size, 5);
                ctx.fillStyle = colum.colorText;
                ctx.fillText(colum.name[i], plinthX + 15, plinthY + size + 20);
                ctx.fillStyle = colum.colorColum;
                plinthX += distant + size;
            } else {
                //Draw square each line
                var begin = (chartY - 8);
                for (var j = 0; j < value[i]; j++) {
                    //line 3th is last line, draw line (3-j) with sizeX = sizeY = size
                    ctx.fillRect(plinthX, begin + size * (3 - j), size, size);
                }
                ctx.fillStyle = colum.colorText;
                ctx.fillText(colum.name[i], plinthX + 15, plinthY + size + 20);
                ctx.fillStyle = colum.colorColum;
                plinthX += distant + size;
            }
        }
    }
    return {
        draw: drawChart,
        explain: drawExplain,
    }
})();

$(document).ready(function() {
    columChart.draw();
    columChart.explain();
});
