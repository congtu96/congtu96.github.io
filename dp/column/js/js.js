/**
* Chart information
* top: Name chart
* left, right: information chart
* bottom: name project
**/
var info = {
    top: "BIỂU ĐỒ LỊCH SỬ LEVEL OF POSITION",
    left: "LEVEL OF POSITION",
    right: ["LEVEL", "OF", "POSITION"],
    bottom: "TÊN DỰ ÁN",
};

/**
* Data colum chart
* height: value array
* name: name column
* value: value of column
**/
var colum = {
    height: [0, 1, 2, 3, 4], 
    name: ["A", "B", "C", "E", "F"],
    value: [2, 0, 3, 4, 4],
    colorColum: "blue",
    colorText: "black",
    width: 45,
    distant: 30,
};

/**
* Draw colum chart
**/
var columChart = (function() {
    // Private
    var canvas = document.getElementById("myChart");
    var ctx = canvas.getContext("2d");
    var plinthY; // value Y, positon begin calculation
    var sizeChart; // max height of chart
    
    /**
    * Draw explain
    */
    function drawExplain() {
        var pX = colum.distant + colum.width;
        var _heightText = colum.width * 2.6;
        ctx.fillStyle = colum.colorColum;
        ctx.fillRect(pX * (sizeChart + 0.5), colum.width * 1.55, colum.width, colum.width / 2);
        ctx.fillStyle = colum.colorText;
        ctx.font = '16px Arial';
        // Draw info right
        for (var i in info.right) {
            ctx.fillText(info.right[i], pX * (sizeChart + 0.5), _heightText);
            _heightText += colum.distant - 5;
        }
        // Draw info bottom
        ctx.font = 'Italic 18px Arial';
        ctx.fillText(info.bottom, canvas.width / 3, canvas.height - 5);
        ctx.rotate( - 90 * Math.PI / 180);
        ctx.fillText(info.left, - 250, 20);
    }
    
    /**
    * Draw background chart and colum
    */
    function drawChart() {
        ctx.font = "24px Arial";
        ctx.fillStyle = colum.colorText;
        ctx.fillText(info.top, canvas.width / 6, 30);
        var distantHeight = 45;
        var chartX = 63;
        var chartY = 80;
        var size = colum.width;
        var distant = colum.distant;
        var plinthX = (chartX + 22);
        plinthY = (chartY - 8) + size * 3;
        var value = colum.value;
        //Draw chart background
        var tmp = 0; // Temp for distant
        // Draw line value
        var addValue = colum.height[colum.height.length - 1]; // Last value in colum.height
        var tempValue = addValue - colum.height[colum.height.length - 2]; // Calculation distant value
        var nums = sizeChart - colum.height.length; // number need add
        for (var i = sizeChart - 1; i >= 0; i--) {
            ctx.moveTo(chartX + 22, (chartY - 8) + tmp);
            ctx.lineTo(chartX + 22 + (size + distant) * (sizeChart - 1), (chartY - 8) + tmp);
            tmp += distantHeight;
            ctx.font = "14px arial";
            // Fill line value of chart
            if (i < colum.height.length) {
                ctx.fillText(colum.height[i], chartX, chartY + tmp - distantHeight - 5);
            } else {
                // Auto calculation and fill value not in colum.height
                ctx.fillText(addValue + tempValue * nums, chartX, chartY + tmp - distantHeight - 5);
                nums -= 1;
            }
            // Draw line footer
            if (i == 0) {
                plinthY = chartY + tmp - distantHeight - 5;
                ctx.moveTo(chartX + 22, plinthY - 2);
                ctx.lineTo(chartX + 22 + (size + distant) * (sizeChart - 1), plinthY - 2);
            }
        }
        ctx.stroke();
        ctx.fillStyle = colum.colorColum;
        //Draw each colum
        for (var i = 0; i < sizeChart - 1; i++) {
            //If value = 0, draw colum height = 5
            if (value[i] == 0) {
                ctx.fillRect(plinthX, plinthY - 8, size, 5);
                ctx.fillStyle = colum.colorText;
                ctx.fillText(colum.name[i], plinthX + 15, plinthY + 20);
                ctx.fillStyle = colum.colorColum;
                plinthX += distant + size;
            } else {
                //Draw square each line
                var begin = plinthY - size - 4;
                for (var j = 0; j < value[i]; j++) {
                    //line 3th is last line, draw line (3-j) with sizeX = sizeY = size
                    ctx.fillRect(plinthX, begin - (size * j), size, size);
                }
                // Fill name colum
                if (i < colum.name.length) {
                    ctx.fillStyle = colum.colorText;
                    ctx.fillText(colum.name[i], plinthX + 15, plinthY + 20);
                    ctx.fillStyle = colum.colorColum;
                }
                plinthX += distant + size;
            }
        }
    }
    
    /**
    * Check input value
    */
    function checkInput() {
        var maxHeight = 700;
        var maxWidth = 1000;
        var maxValue = 0;
        for (var i in colum.value) {
            maxValue = Math.max(maxValue, colum.value[i]);
        }
        var maxSizeChart = Math.max(Math.max(colum.height.length, colum.name.length), maxValue);
        sizeChart = maxSizeChart + 1;
        var height = sizeChart * 60 + 50;
        var width = colum.name.length * 100 + 150;
        // Draw chart if enough height and width
        if (height < maxHeight && width < maxWidth) {
            canvas.height = height;
            canvas.width = width;
            drawChart();
            drawExplain();
        } else {
        // Draw notification if not enough height or width
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "20px arial";
            ctx.fillText("Height or width exceeds the limit", 0, 50);
        }
    }
    return {
        draw: drawChart,
        explain: drawExplain,
        check: checkInput,
    }
})();

$(document).ready(function() {
    columChart.check();
});
