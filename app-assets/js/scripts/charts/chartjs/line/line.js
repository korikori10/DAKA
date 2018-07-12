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
var Month;
var EmployeeCountMont;
var Moving_AVG;
//var m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12;
var datasetss = [];
$(window).on("load", function(){

    SMARTELEMENTStatistics(Renderemp);
    //Get the context of the Chart canvas element we want to select
    var ctx = $("#line-chart");
    setTimeout(function () {
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
                    labelString: 'month'
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
            //text: 'Moving Average'
        }
    };

    // Chart Data
    var chartData = {
        labels: Month,
        datasets: [
        //{
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
                label: "Moving Average",
                data: Moving_AVG, 
            fill: false,
            borderDash: [5, 5],
            borderColor: "#00BCD4",
            pointBorderColor: "#00BCD4",
            pointBackgroundColor: "#FFF",
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
        }, {
              
                label: "Past Years Average",
                data: EmployeeCountMonth,
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
    }, 100);

});

function Renderemp(results)
{
    var resultData = $.parseJSON(results.d);
    Month = resultData[0];
    len = Month.length;
    for (var i = 0; i < len; i++) {
        switch (Month[i]) {
            case "1":
                Month[i] = "January";
                continue;
            case "2": Month[i] = "February";
                continue;
            case "3": Month[i] = "March";
                continue;
            case "4": Month[i] = "April";
                continue;
            case "5": Month[i] = "May";
                continue;
            case "6": Month[i] = "June";
                continue;
            case "7": Month[i] = "July";
                continue;
            case "8": Month[i] = "August";
                continue;
            case "9": Month[i] = "September";
                continue;
            case "10": Month[i] = "October";
                continue;
            case "11": Month[i] = "November";
                continue;
            case "12": Month[i] = "December";
                continue;
            default:
        }
    }
    EmployeeCountMonth = resultData[1];
    Moving_AVG = resultData[2];
 
}