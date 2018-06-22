/*=========================================================================================
    File Name: column.js
    Description: Chartjs column chart
    ----------------------------------------------------------------------------------------
    Item Name: Robust - Responsive Admin Theme
    Version: 1.2
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Column chart
// ------------------------------
//emp monthly growth
var yearsString;
var year;//the years
var m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12;
var datasetss = [];
var lineChart;
$(window).on("load", function(){
    StatisticsEmpByMonth(RenderempByMonth);

    //Get the context of the Chart canvas element we want to select
    var ctx = $("#column-chart");

    // Chart Options
    var chartOptions = {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each bar to be 2px wide and green
        elements: {
            rectangle: {
                borderWidth: 2,
                borderColor: 'rgb(0, 255, 0)',
                borderSkipped: 'bottom'
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration:500,
        legend: {
            position: 'top',

        },
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                }
            }]
        },
        title: {
            display: true,
            text: 'New Employees By month'
        }
    };

    // Chart Data
    var chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: datasetss
        //[{
        //    label: "",
        //    data: [65, 59, 80, 81, 56],
        //    backgroundColor: "#673AB7",
        //    hoverBackgroundColor: "rgba(103,58,183,.9)",
        //    borderColor: "transparent"
        //}, {
        //    label: "My Second dataset",
        //    data: [28, 48, 40, 19, 86],
        //    backgroundColor: "#E91E63",
        //    hoverBackgroundColor: "rgba(233,30,99,.9)",
        //    borderColor: "transparent"
        //}]
    };

    var config = {
        type: 'bar',

        // Chart Options
        options : chartOptions,

        data : chartData
    };

    // Create the chart

    //var resetCanvas = function () {
    //    $('#column-chart').remove(); // this is my <canvas> element
    //    $('#graph-container').append('<canvas id="column-chart"><canvas>');
    //    canvas = document.querySelector('#olumn-chart');
    //    ctx = canvas.getContext('2d');
    //    ctx.canvas.width = $('#graph').width(); // resize to parent width
    //    ctx.canvas.height = $('#graph').height(); // resize to parent height
    //    var x = canvas.width / 2;
    //    var y = canvas.height / 2;
    //    ctx.font = '10pt Verdana';
    //    ctx.textAlign = 'center';
    //    ctx.fillText('This text is centered on the canvas', x, y);
    //};
       //$(function () {
    lineChart = new Chart(ctx, config);

    // Resync the render size
    //lineChart.resize();
       //    // Resize chart on menu width change and window resize
       //    $(window).on('resize', resize);
       //    $(".menu-toggle").on('click', resize);

       //    // Resize function
       //    function resize() {
       //        setTimeout(function () {

       //            // Resize chart
       //            lineChart.resize();
       //        }, 200);
       //    }
       //});

    });


function RenderempByMonth(results) {
    var resultData = $.parseJSON(results.d);
    year = resultData[0];
    m1 = resultData[1];
    m2 = resultData[2];
    m3 = resultData[3];
    m4 = resultData[4];
    m5 = resultData[5]; 
    m6 = resultData[6];
    m7 = resultData[7];
    m8 = resultData[8];
    m9 = resultData[9];
    m10 = resultData[10];
    m11 = resultData[11];
    m12 = resultData[12];

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    for (var j = 0; j < year.length; j++) {
        datasetss.push(
            {
                label: year[j],
                data: [m1[j], m2[j], m3[j], m4[j], m5[j], m6[j], m7[j], m8[j], m9[j], m10[j], m11[j], m12[j]],
                backgroundColor: getRandomColor(),
                hoverBackgroundColor: "rgba(103,58,183,.9)",
                borderColor: "transparent"

            }
        );//end-push
    } 
}