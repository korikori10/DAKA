/*=========================================================================================
    File Name: tornado.js
    Description: echarts tornado chart
    ----------------------------------------------------------------------------------------
    Item Name: Robust - Responsive Admin Theme
    Version: 1.2
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Tornado chart
// ------------------------------
var eJ ;
var eF ;
var eM ;
var e4 ;
var e5 ;
var e6 ;
var e7 ;
var e8 ;
var e9 ;
var e10;
var e11 ;
var e12 ;
$(window).on("load", function(){

    // Set paths
    // ------------------------------
    StatisticsEmpByMonth(RenderempByMonth);
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
            var myChart = ec.init(document.getElementById('dynamic-data'));

            // Chart Options
            // ------------------------------
            chartOptions = {

                // Add Tooltip
                tooltip : {
                    trigger: 'axis'
                },

                // Add Legend
                legend: {
                    data: ['New Employees', 'New Employees Growth']
                },

                // Add custom colors
                color: ['#FF847C', '#99B898'],

                // Add Toolbook
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },

                // Data Zoom
                dataZoom : {
                    show : false,
                    start : 0,
                    end : 100
                },

                // Horizontal  Axis
                xAxis : [
                    {
                        type : 'category',
                     //   boundaryGap : true,
                        data : (function (){
                            var now = new Date();
                            var res = [];
                            var len = 10;
                            while (len--) {
                                res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                                now = new Date(now - 2000);
                            }
                            return res;
                        })()
                    },
                    {
                        type : 'category',
                       // boundaryGap : true,
                        data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December'
]
                    }
                ],

                // Vertical Axis
                yAxis : [
                    {
                        type : 'value',
                        scale: true,
                        name: 'New Employee',
                     //   boundaryGap: [0.2, 0.2]
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
                series : [
                    {
                        name:'New Employees',
                        type:'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: [eJ ,eF,eM,e4, e5, e6,e7,e8 , e9 ,e10 ,e11 ,e12 ]
                    },
                    {
                        name:'New Employees Growth',
                        type: 'line',
                        data: [eJ, (eF - eJ) / eJ, (eM - eF) / eF, (e4 - eM) / eM, (e5 - e4) / e4, (e6 - e5) / e5, (e7 - e6) / e6, (e8 - e7) / e7, (e9 - e8) / e8, (e10 - e9) / e9, (e11 - e10) / e10, (e12 - e11) / e11]//(function (){
                        //    var res = [];
                        //    var len = 10;
                        //    while (len--) {
                        //        res.push((Math.random()*10 + 5).toFixed(1) - 0);
                        //    }
                        //    return res;
                        //})()
                    }
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

                var lastData = 11;
                var axisData;
                clearInterval(timeTicket);
                var timeTicket = setInterval(function (){
                    lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
                    lastData = lastData.toFixed(1) - 0;
                    axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

                    // Dynamic Data Interface addData
                    myChart.addData([
                        [
                            0,        // Index Series
                            Math.round(Math.random() * 1000), // Add data
                            true,     // If new data is inserted from the head of the queue
                            false     // Whether to increase the queue length, false then delete the original custom data, deleting the tail end into the team, the tail is inserted deleted teams head
                        ],
                        [
                            1,        // Index Series
                            lastData, // Add data
                            false,    // If new data is inserted from the head of the queue
                            false,    // Whether to increase the queue length, false then delete the original custom data, deleting the tail end into the team, the tail is inserted deleted teams head
                            axisData  // Axis label
                        ]
                    ]);
                }, 2100);
            });
        }
    );
});
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