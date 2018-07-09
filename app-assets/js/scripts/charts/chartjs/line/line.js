/*=========================================================================================
    File Name: line.js
    Description: Chartjs simple line chart
    ----------------------------------------------------------------------------------------
    Item Name: Robust - Responsive Admin Theme
    Version: 1.2
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Line chart
// ------------------------------

var yearsString;
//var year;//the years
var Month=[];
var EmployeeCountMonth=[];
var Moving_AVG =[];
//var m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12;
var datasetss = [];
$(window).on("load", function(){

    SMARTELEMENTStatistics(Renderemp);
    //Get the context of the Chart canvas element we want to select
    var ctx = $("#line-chart");

    // Chart Options
    var chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'bottom',
        },
        hover: {
            mode: 'label'
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
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true
                   // labelString: 'Value'
                }
            }]
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart - Legend'
        }
    };

    // Chart Data
    var chartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July","August","December"],
        datasets: [//{
        //    label: "My First dataset",
        //    data: [65, 59, 80, 81, 56, 55, 40],
        //    fill: false,
        //    borderDash: [5, 5],
        //    borderColor: "#673AB7",
        //    pointBorderColor: "#673AB7",
        //    pointBackgroundColor: "#FFF",
        //    pointBorderWidth: 2,
        //    pointHoverBorderWidth: 2,
        //    pointRadius: 4,
        //},
        {
                label: "My Second dataset",
                data: EmployeeCountMonth,
            fill: false,
            borderDash: [5, 5],
            borderColor: "#00BCD4",
            pointBorderColor: "#00BCD4",
            pointBackgroundColor: "#FFF",
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
        }, {
                label: "My Third dataset - No bezier",
                data: Moving_AVG,
            lineTension: 0,
            fill: false,
            borderColor: "#FF5722",
            pointBorderColor: "#FF5722",
            pointBackgroundColor: "#FFF",
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
        }]
    };

    var config = {
        type: 'line',

        // Chart Options
        options : chartOptions,

        data : chartData
    };

    // Create the chart
    var lineChart = new Chart(ctx, config);
});

function Renderemp(results)
{
    var resultData = $.parseJSON(results.d);
    Month = resultData[0];
    EmployeeCountMonth = resultData[1];
    Moving_AVG = resultData[2];
    //m1 = resultData[1];
    //m2 = resultData[2];
    //m3 = resultData[3];
    //m4 = resultData[4];
    //m5 = resultData[5];
    //m6 = resultData[6];
    //m7 = resultData[7];
    //m8 = resultData[8];
    //m9 = resultData[9];
    //m10 = resultData[10];
    //m11 = resultData[11];
    //m12 = resultData[12];

    //function getRandomColor() {
    //    var letters = '0123456789ABCDEF'.split('');
    //    var color = '#';
    //    for (var i = 0; i < 6; i++) {
    //        color += letters[Math.floor(Math.random() * 16)];
    //    }
    //    return color;
    //}

    //len = year.length;
    //for (var j = 0; j < len; j++) {
    //    datasetss.push(
    //        {
    //            label: year[j],
    //            data: [m1[j], m2[j], m3[j], m4[j], m5[j], m6[j], m7[j], m8[j], m9[j], m10[j], m11[j], m12[j]],
    //            backgroundColor: getRandomColor(),
    //            hoverBackgroundColor: "rgba(103,58,183,.9)",
    //            borderColor: "transparent"

    //        }
    //    );//end-push
    //}
}