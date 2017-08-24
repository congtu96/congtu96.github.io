/**
* Data of Module
*/
var myData = {
    // Value must Sort up ascending, or bigest value must begin value in array value
    values: [80, 20],
    info: ["Đã đạt", "Chưa đạt", "Binh Thuong"],
    name: "BIỂU ĐỒ TỔNG QUAN KHUNG NĂNG LỰC"
};

/**
* Setting option Module
*/
var setting = {
    color: ["#6382bf", "#e6655b", "#42b742", "green", "#e42a1d", "#4267b1"],
    height: 100,
    space: 30,
    lineColor: ["#6382bf", "#e6655b"],
    widthLine: 5,
    radius: 0.7,
};

/**
* Module pie chart 3D
*/
var pie3D = (function() {
	// Private
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    canvas.height = 500;
    canvas.width = 800;
    var data = myData.values;
    var color = setting.color;
    var total = 0;
    var lastEnd = 0;
    // Position of the center pie
    var x = canvas.width / 2;
    var y = canvas.height;
    var r = Math.min(canvas.width / 2, canvas.height / 2) * setting.radius;
    var scaleX = 0.9;
    var scaleY = 0.4;
    ctx.scale(scaleX, scaleY);
    var lastPoint;
    var space = setting.space;
    // Calculation total value
    for (var i in data) {
        var tmp = parseInt(data[i]);
        total += tmp;
    }

    /**
    * Draw pie 2D
    * @param: {height}
    * draw pie 2D with center O (x, y - height)
    */
    function drawPie(height) {
        //Radius of pie
        ctx.fillStyle = "black";
        var slice;
        for (var i in data) {
            // Calculation earch slice
            slice = Math.PI * 2 * (data[i] / total);
            // Draw pie part 2, part smaller
            if (i != 0) {
                // Draw color for face slice
                ctx.fillStyle = color[i];
                if (height >= setting.height - 1) {
                    ctx.fillStyle = color[color.length - 1 - i];
                }
                ctx.beginPath();

                if (slice < 50) {
                    ctx.moveTo(x + space, y - height - space);
                    ctx.arc(x + space, y - height - space, r, lastEnd, lastEnd + slice);
                    ctx.lineTo(x + space, y - height - space);
                }
                
                if (slice >= 50) {
                    ctx.moveTo(x - space, y - height - space);
                    ctx.arc(x - space, y - height - space, r, lastEnd, lastEnd + slice);
                    ctx.lineTo(x - space, y - height - space);
                }
                ctx.fill();
                lastEnd += Math.PI * 2 * (data[i] / total);
            }
            // Draw pie part 1, part large
            if (i == 0) {
                // Draw color for face slice
                ctx.fillStyle = color[i];
                
                if (height >= setting.height - 1) {
                    ctx.fillStyle = color[color.length - 1 - i];
                }
                ctx.beginPath();
                ctx.moveTo(x , y - height);
                // Arc Parameters: x, y - height, radius, starting Angle (radians), ending Angle (radians), antiClockwise (boolean)
                ctx.arc(x, y - height, r, lastEnd, lastEnd + (Math.PI * 2 * (data[i] / total)));
                ctx.lineTo(x, y - height );
                ctx.fill();
                lastEnd += Math.PI * 2 * (data[i] / total);
            }
        }
    }
    
    /**
    * Draw pie - 3D
    * for i -> 100 draw pie 2D
    */
    function draw3D() {
        for (var height = 0; height < setting.height; height++) {
            drawPie(height);
            // Draw description when draw the last pie
            if (height == 100 - 1) {
                drawDescription();
            }
        }
    }
    
    /**
    * Draw Description
    */
    function drawDescription() {
        lastPoint = lastEnd;
        var heightLine = 100;
        var widthLine = 50;
        for (var i in data) {
            var slice = 2 * Math.PI * (data[i] / total);
            //Calculate the position of the text
            var pX = x + r / 1.3 * Math.cos(lastPoint + slice / 2);
            var pY = y - setting.height + r / 1.4 * Math.sin(lastPoint + slice / 2);
            ctx.font = "30px arial";
            ctx.fillStyle = "black";
            var info = data[i] * 100 / total;
            
            // Draw line description
            ctx.beginPath();
            ctx.lineWidth = setting.widthLine;
            heightLine = heightLine + info * 1.2;
            // If slice >= 50%
            if (info >= 50) {
                ctx.strokeStyle = setting.lineColor[i];
                ctx.moveTo(pX - widthLine * 2, pY - heightLine + data[i]);
                ctx.lineTo(pX - widthLine * 4, pY - heightLine + data[i]);
                ctx.moveTo(pX, pY);
                ctx.lineTo(pX - widthLine * 2, pY - heightLine + data[i]);
                ctx.stroke();
                ctx.fillText(info + "%" + myData.info[i], pX - widthLine * 4.5, pY - heightLine - 10 + data[i]);
            }
            // If slice < 50%
            if (info < 50) {
                ctx.strokeStyle = setting.lineColor[i];
                ctx.moveTo(pX + widthLine * 2, pY - heightLine + data[i]);
                ctx.lineTo(pX + widthLine * 4, pY - heightLine + data[i]);
                ctx.moveTo(pX, pY);
                ctx.lineTo(pX + widthLine * 2, pY - heightLine + data[i]);
                ctx.stroke();
                ctx.fillText(info + "%" + myData.info[i], pX + widthLine * 2, pY - heightLine - 10 + data[i]);
            }
            lastPoint += (data[i] / total) * Math.PI * 2;
        }
        ctx.font = "35px arial";
        ctx.fillStyle = "blue";
        ctx.fillText(myData.name, 100, canvas.height * 2);
    }
    
    return {
        draw3D: draw3D,
    }
})();

$(document).ready(function() {
    pie3D.draw3D();
});
 