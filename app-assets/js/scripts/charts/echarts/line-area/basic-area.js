/*=========================================================================================
    File Name: basic-area.js
    Description: echarts basic area chart
    ----------------------------------------------------------------------------------------
    Item Name: Robust - Responsive Admin Theme
    Version: 1.2
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Basic Area chart
// ------------------------------
var eJ;
var eF;
var eM;
var e4;
var e5;
var e6;
var e7;
var e8;
var e9;
var e10;
var e11;
var e12;

var e2016;
var e2017;
var e2018;

var yearss;
var detailss;
var years= [];
var details= [];
var growth = [];
var growths;
$(window).on("load", function () {
    StatisticsEmpByYear(RenderempByYear);
    StatisticsEmpByMonth(RenderempByMonth);
    StatisticsBusiByYear(RenderBusiByYear);

    // Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: '../../../app-assets/vendors/js/charts/echarts'
        }
    });


    // Configuration
    // ------------------------------

    require(
        [
            'echarts',
            'echarts/chart/bar',
            'echarts/chart/line'
        ],


        // Charts setup
        function (ec) {
            // Initialize chart
            // ------------------------------
            var myChart = ec.init(document.getElementById('basic-area'));
            var myChart2 = ec.init(document.getElementById('montly-data'));
            var myChart3 = ec.init(document.getElementById('Yearly-data'));


            // Chart Options
            // ------------------------------
            chartOptions = {

                // Setup grid
                grid: {
                    x: 40,
                    x2: 20,
                    y: 35,
                    y2: 25
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis'
                },

                // Add legend
                legend: {
                    data: ['New Employees', 'New Employees Growth']//, 'In progress ', 'Closed deals']
                },

                // Add custom colors
                color: ['#FF847C', '#FECEA8', '#99B898'],

                // Enable drag recalculate
                calculable: true,

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: [
                        //      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December'
                        '2016', '2017', '2018'
                        
                    ]
                }],

                // Vertical axis
                yAxis: [{
                    name: 'New Employee',
                    position: 'Left',
                    type: 'value'
                },
                {
                    name: 'growth (%)',
                    position: 'Right',
                    type: 'value',
                    name: "%",
                    axisLabel: {
                        formatter: "{value} %"
                    },
                    max: 100,
                    inverse: true
                }],

                // Add series
                series: [
                    {
                        name: 'New Employees',
                        type: 'line',
                        smooth: true,
                        itemStyle: { normal: { areaStyle: { type: 'default' } } },
                        data: [e2016, e2017, e2018]
                    }
                    ,
                    {
                        name: 'New Employees Growth',
                        type: 'line',
                        yAxisIndex: 1,
                        smooth: true,

                        itemStyle: { normal: { areaStyle: { type: 'default' } } },
                        data: [e2016, ((e2017 - e2016) / e2016) * 100, ((e2018 - e2017) / e2017) * 100]
                    }//,
                    //{
                    //    name: 'New Employees',
                    //    type: 'line',
                    //    smooth: true,
                    //    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    //    data: [1320, 1132, 601, 234, 120, 90, 20]
                    //}
                ]
            };
            chartOptions2 = {

                // Setup grid
                grid: {
                    x: 40,
                    x2: 20,
                    y: 35,
                    y2: 25
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis'
                },

                // Add legend
                legend: {
                    data: ['New Employees', 'New Employees Growth']//, 'In progress ', 'Closed deals']
                },

                // Add custom colors
                color: ['#FF847C', '#FECEA8', '#99B898'],

                // Enable drag recalculate
                calculable: true,

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: [
                        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'

                    ]
                }],

                // Vertical axis
                yAxis: [{
                    name: 'New Employee',
                    position: 'Left',
                    type: 'value'
                },
                {
                    name: 'growth (%)',
                    position: 'Right',
                    type: 'value',
                    name: "%",
                    axisLabel: {
                        formatter: "{value} %"
                    },
                    max: 100,
                    inverse: true
                }],

                // Add series
                series: [
                    {
                        name: 'New Employees',
                        type: 'line',
                        smooth: true,
                        itemStyle: { normal: { areaStyle: { type: 'default' } } },
                        data: [eJ, eF, eM, e4, e5, e6, e7, e8, e9, e10, e11, e12]
                    }
                    ,
                    {
                        name: 'New Employees Growth',
                        type: 'line',
                        yAxisIndex: 1,
                        smooth: true,

                        itemStyle: { normal: { areaStyle: { type: 'default' } } },
                        data: [eJ, ((eF - eJ) / eJ) * 100, ((eM - eF) / eF) * 100, ((e4 - eM) / eM) * 100, ((e5 - e4) / e4) * 100, ((e6 - e5) / e5) * 100, ((e7 - e6) / e6) * 100, ((e8 - e7) / e7) * 100, ((e9 - e8) / e8) * 100, ((e10 - e9) / e9) * 100, ((e11 - e10) / e10) * 100, ((e12 - e11) / e11) * 100]
                    }
                ]
            };
            chartOptions3forbusi = {

                // Setup grid
                grid: {
                    x: 40,
                    x2: 20,
                    y: 35,
                    y2: 25
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis'
                },

                // Add legend
                legend: {
                    data: ['New Businesses', 'New Businesses Growth']//, 'In progress ', 'Closed deals']
                },

                // Add custom colors
                color: ['#FF847C', '#FECEA8', '#99B898'],

                // Enable drag recalculate
                calculable: true,

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: 
                        yearss
                    
                }],

                // Vertical axis
                yAxis: [{
                    name: 'Businesses',
                    position: 'Left',
                    type: 'value'
                },
                {
                    name: 'growth (%)',
                    position: 'Right',
                    type: 'value',
                    name: "%",
                    axisLabel: {
                        formatter: "{value} %"
                    },
                    max: 100,
                    inverse: true
                }],

                // Add series
                series: [
                    {
                        name: 'New Businesses',
                        type: 'line',
                        smooth: true,
                        itemStyle: { normal: { areaStyle: { type: 'default' } } },
                        data: detailss
                    }
                    //,
                    //{
                    //    name: 'New Businesses Growth',
                    //    type: 'line',
                    //    yAxisIndex: 1,
                    //    smooth: true,

                    //    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    //    data: [growths]
                    //}//,
                    //{
                    //    name: 'New Employees',
                    //    type: 'line',
                    //    smooth: true,
                    //    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    //    data: [1320, 1132, 601, 234, 120, 90, 20]
                    //}
                ]
            };

            // Apply options
            // ------------------------------

            myChart.setOption(chartOptions);
            myChart2.setOption(chartOptions2);
            myChart3.setOption(chartOptions3forbusi);
            // Resize chart
            // ------------------------------

            $(function () {

                // Resize chart on menu width change and window resize
                $(window).on('resize', resize);
                $(".menu-toggle").on('click', resize);

                // Resize function
                function resize() {
                    setTimeout(function () {

                        // Resize chart
                        myChart.resize();
                        myChart2.resize();
                        myChart3.resize();
                    }, 200);
                }
            });
        }
       

    );
});
function RenderempByYear(results) {
    statistics = results.d;
    e2016 = statistics[1];
    e2017 = statistics[3];
    e2018 = statistics[5];

}
function RenderempByMonth(results) {
    statistics = results.d;
    eJ = statistics[1];
    eF = statistics[3];
    eM = statistics[5];
    e4 = statistics[7];
    e5 = statistics[9];
    e6 = statistics[11];
    e7 = statistics[13];
    e8 = statistics[15];
    e9 = statistics[17];
    e10 = statistics[19];
    e11 = statistics[21];
    e12 = statistics[23];
}

function RenderBusiByYear(results) {
    var resultData = $.parseJSON(results.d);
    yearss = resultData[0];
    detailss = resultData[1]
    //statistics = $.parseJSON(results.d);
    $.each(statistics, function (i, row) {
    //    years[i] = row.Year;
    //    details[i] = row.businessCount;
    //    if (i == years.length) {
    //        yearss += "'" + row.Year + "'"
    //    }
    //    else {

    //        yearss += "'"+ row.Year + "',";
    //    }
    //    if (i == details.length) {
    //        detailss += "'" + row.businessCount + "'"
    //    } else {

    //        detailss += "'" +row.businessCount + "' ,";
    //    }
         if (i>0) {
             growth[i] = ((row.businessCount - growth[i-1])/growth[i-1])*100
         }
         else {

             growth[i] = row.businessCount 
         }
    });

    for (var i = 0; i < growth.length; i++) {
        if (growth.length==i) {
            growths += "'" + growth[i] + "'"     
        } else {

            growths += "'"+ growth[i]+"',";
        }
    }
}