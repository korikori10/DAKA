/// <reference path="../../../../../vendors/js/charts/echarts/chart/bar.js" />
/// <reference path="../../../../../vendors/js/charts/echarts/chart/bar.js" />
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

//busi yearly growth
var yearss;
var detailss; 
var growths;

//emp yearly growth
var yearsEmployee;
var detailsEmployee;
var growthEmployee;

//emp monthly growth
var monthsinYearEmployee;//the years
var month;
var detailsmonthEmployee;

$(window).on("load", function () {
    StatisticsEmpByYear(RenderempByYear);
    StatisticsBusiByYear(RenderBusiByYear);

    // Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: '/bgroup59/prod/app-assets/vendors/js/charts/echarts'
        }
    });

    //require.config({
    //    paths: {
    //        echarts: '../../../app-assets/vendors/js/charts/echarts'
    //    }
    //});
    // Configuration
    // ------------------------------

    require(
        [
            'echarts',
            'echarts/chart/bar',
            'echarts/chart/line'
           
        ],
            //require(
    //    [
    //        'app-assets/vendors/js/charts/echarts/echarts',
    //        'app-assets/vendors/js/charts/echarts/chart/bar',
    //        'app-assets/vendors/js/charts/echarts/chart/line'

    //    ],


        // Charts setup
        function (ec) {
            // Initialize chart
            // ------------------------------
            var myChart = ec.init(document.getElementById('basic-area'));
            var myChart3 = ec.init(document.getElementById('Yearly-data'));


            // Chart Options
            // ------------------------------
            chartOptions = {

                // Setup grid
                grid: {
                    x: 50,
                    x2: 30,
                    y: 55,
                    y2: 55,
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis'
                },

                // Add legend
                legend: {
                    data: ['New Employees', 'New Employees Growth']
                },

                // Add custom colors
                color: ['#673AB7', '#E91E63', '#E91E67'],

                // Enable drag recalculate
                calculable: true,

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: yearsEmployee
                }],

                // Vertical axis
                yAxis: [{
                    name: 'New Employee',
                    position: 'Left',
                    type: 'value',
                    scale: true,
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
                    scale: true,
                    
                   
                }],

                // Add series
                series: [
                    {
                        name: 'New Employees',
                        type: 'line',
                        smooth: true,
                        itemStyle: { normal: { areaStyle: { type: 'default' } } },
                        data: detailsEmployee
                    }
                    ,
                    {
                        name: 'New Employees Growth',
                        type: 'line',
                        yAxisIndex: 1,
                        smooth: true,

                        itemStyle: { normal: { areaStyle: { type: 'default' } } },
                        data: growthEmployee
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
                color: ['#673AB7', '#E91E63', '#E91E67'],

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
                    ,
                    {
                        name: 'New Businesses Growth',
                        type: 'line',
                        yAxisIndex: 1,
                        smooth: true,

                        itemStyle: { normal: { areaStyle: { type: 'default' } } },
                        data: growths
                    }
                ]
            };

            // Apply options
            // ------------------------------

            myChart.setOption(chartOptions);
            myChart3.setOption(chartOptions3forbusi);
            // Resize chart
            // ------------------------------

            

                // Resize chart on menu width change and window resize
                $(window).on('resize', resize);
            $(".menu-toggle").on('click', resize);
            $('[data-action="expand"]').on('click', resize);

                // Resize function
                function resize() {
                    setTimeout(function () {

                        // Resize chart
                        myChart.resize();
                        //myChart2.resize();
                        myChart3.resize();
                    }, 200);
                }
            
        }
       

    );

});
function RenderempByYear(results) {
    var resultData = $.parseJSON(results.d);
    yearsEmployee = resultData[0];
    detailsEmployee = resultData[1];
    growthEmployee = resultData[2];

}


function RenderBusiByYear(results) {
    var resultData = $.parseJSON(results.d);
    yearss = resultData[0];
    detailss = resultData[1];
    growths = resultData[2];

}
