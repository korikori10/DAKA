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
var e2016;
var e2017;
var e2018;
$(window).on("load", function(){
    StatisticsEmpByYear(RenderempByYear);
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
                    position:'Right',
                    type: 'value',
                    name: "%",
                    axisLabel: {
                        formatter: "{value} %"
                    },
                    max:100,
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
                        yAxisIndex:1,
                        smooth: true,
                        
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [e2016, ((e2017 - e2016) / e2016)*100, ((e2018-e2017)/ e2017)*100]
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

            // Apply options
            // ------------------------------

            myChart.setOption(chartOptions);

            // Resize chart
            // ------------------------------

            $(function () {

                // Resize chart on menu width change and window resize
                $(window).on('resize', resize);
                $(".menu-toggle").on('click', resize);

                // Resize function
                function resize() {
                    setTimeout(function() {

                        // Resize chart
                        myChart.resize();
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