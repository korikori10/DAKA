/*=========================================================================================
    File Name: stacked-area.js
    Description: echarts stacked area chart
    ----------------------------------------------------------------------------------------
    Item Name: Robust - Responsive Admin Theme
    Version: 1.2
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Stacked area chart
// ------------------------------
var year;
var yearsString=[];
var q1;
var q2;
var q3;
var q4;

$(window).on("load", function(){
    StatisticsbusiByQuarter(RenderBusiByQuarter);

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
            var myChart = ec.init(document.getElementById('stacked-area'));

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
                    data: yearsString
                },

                // Add custom colors
                color: ['#FF847C', '#FECEA8', '#99B898', '#E84A5F', '#2A363B'],

                // Enable drag recalculate
                calculable: true,

                // Add horizontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['QUARTER 1', 'QUARTER 2', 'QUARTER 3', 'QUARTER 4']
                }],

                // Add vertical axis
                yAxis: [{
                    name: 'New business',
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
                }
                ],

                // Add series
                //series: [
                //    {
                //        name: 'Email marketing',
                //        type: 'line',
                //        stack: 'Total',
                //        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                //        data: [120, 132, 101, 134, 90, 230, 210]
                //    },
                //    {
                //        name: 'Advertising alliance',
                //        type: 'line',
                //        stack: 'Total',
                //        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                //        data: [220, 182, 191, 234, 290, 330, 310]
                //    },
                //    {
                //        name: 'Video ads',
                //        type: 'line',
                //        stack: 'Total',
                //        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                //        data: [150, 232, 201, 154]
                //    },
                //    {
                //        name: 'Direct access',
                //        type: 'line',
                //        stack: 'Total',
                //        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                //        data: [320, 332, 301, 334, 390, 330, 320]
                //    },
                //    {
                //        name: 'Search engine',
                //        type: 'line',
                //        stack: 'Total',
                //        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                //        data: [820, 932, 901, 934, 1290, 1330, 1320]
                //    }
                //]
                series: seriess

                

            };
                //end-for-loop
            
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


function RenderBusiByQuarter(results) {
    var resultData = $.parseJSON(results.d);
      year = resultData[0];
    q1= resultData[1];
    //   quarter = resultData[2];
    q2 = resultData[2];
    q3 = resultData[3];
    q4 = resultData[4];

    for (var i = 0; i < year.length; i++) {
        //if (i == 2) {
        //    yearsString [i]= "'"+ year[i]+"'" ;

        //} else {
        yearsString[i] =  year[i] ;
        //}
    }
    seriess = [];
    for (var j = 0; j < year.length; j++) {
        seriess.push(
            {
                name: year[j],
                type: 'line',
                stack: 'Total',
                //symbol: 'none',
                itemStyle: {
                    normal: {
                        areaStyle: {

                            type: 'default'
                        }
                    }
                }
                ,
                data: [
                    q1[j], q2[j], q3[j], q4[j],
                ]

            }
        );//end-push
    } 
}
