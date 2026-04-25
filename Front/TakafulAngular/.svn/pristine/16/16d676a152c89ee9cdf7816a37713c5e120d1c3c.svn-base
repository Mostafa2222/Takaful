$(document).ready(function () {
    /************************        1                       **************************/
    var dom = document.getElementById("chart-1");
    var myChart = echarts.init(dom, 'shine');
    var app = {};
    option = null;
    app.title = '';
    option = {
        legend: {},
        tooltip: {},
        responsive: true,
        maintainAspectRatio: true,
        // dataset: {
        //     source: [
        //         ['product'              , 'Company 1' , 'Company 2' , 'Company 3' , 'Company 4'],
        //         ['Submitted Invoices'   , 41.1              , 30.4              , 65.1              , 53.3],
        //         ['Denied Services'      , 86.5              , 92.1              , 85.7              , 83.1],
        //         ['Right-off Claims'     , 24.1              , 67.2              , 79.5              , 86.4]
        //     ]
        // },
        // xAxis: [
        //     {type: 'category', gridIndex: 0},
        // ],
        // yAxis: [
        //     {gridIndex: 0},
        // ],

        // series: [
        //     // These series are in the first grid.
        //     {type: 'bar', seriesLayoutBy: 'row'},
        //     {type: 'bar', seriesLayoutBy: 'row'},
        //     {type: 'bar', seriesLayoutBy: 'row'}
        // ]
        xAxis: {
            type: 'category',
            data: ['center1', 'center2', 'center3', 'center4', 'center5', 'center6', 'center7', 'center8', 'center9', 'center10', 'center11', 'center12', 'center13'],

        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 210, 330, 420, 500, 650, 780, 700, 910],
            type: 'bar'
        }],
          };
    myChart.setOption(option);

    // var chartDom = document.getElementById('chart-1');
    // var myChart = echarts.init(chartDom);
    // var option;
    // var app = {};
    // option = {
    //     xAxis: {
    //         type: 'category',
    //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //     },
    //     yAxis: {
    //         type: 'value'
    //     },
    //     series: [
    //         {
    //             data: [120, 200, 150, 80, 70, 110, 130],
    //             type: 'bar',
    //             showBackground: true,
    //             backgroundStyle: {
    //                 color: 'rgba(180, 180, 180, 0.2)'
    //             }
    //         }
    //     ]
    // };

    // option && myChart.setOption(option);
    //
    /************************        2                              **************************/
    var dom = document.getElementById("chart-2");
    var myChart = echarts.init(dom, 'shine');
    var app = {};
    option = null;
    app.title = '';
    option = {
        responsive: true,
        maintainAspectRatio: true,
        legend: {},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },

        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['01/2020', '02/2020', '03/2020', '04/2020', '05/2020', '06/2020', '07/2020']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Company 1',
                type: 'line',
                stack: 'TimeBar',
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Company 2',
                type: 'line',
                stack: 'TimeBar',
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Company 3',
                type: 'line',
                stack: 'TimeBar',
                areaStyle: {},
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'Company 4',
                type: 'line',
                stack: 'TimeBar',
                areaStyle: {},
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'Company 5',
                type: 'line',
                stack: 'TimeBar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {},
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    myChart.setOption(option);
    /************************        3                               **************************/
    var dom = document.getElementById("chart-3");
    var myChart = echarts.init(dom, 'shine');
    var app = {};
    option = null;
    app.title = '';
    option = {
        responsive: true,
        maintainAspectRatio: true,
        xAxis: {
            type: 'category',
            data: ['Empty Beds', 'Occupied Beds', 'Beds A', 'Beds B']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} Bed'
            },
        },
        series: [{
            data: [18, 2,10,20],
            type: 'bar'
        }]
    };
    myChart.setOption(option);
    /************************        4        **************************/
    var dom = document.getElementById("chart-4");
    var myChart = echarts.init(dom, 'shine');
    var app = {};
    option = null;
    app.title = '';
    option = {
        responsive: true,
        maintainAspectRatio: true,
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ['product', 'Company 1', 'Company 2', 'Company 3', 'Company 4'],
                ['No Enough Reasons', 41.1, 30.4, 65.1, 53.3],
                ['Illegal Request', 86.5, 92.1, 85.7, 83.1],
                ['Out of Contract', 24.1, 67.2, 79.5, 86.4]
            ]
        },
        xAxis: [
            { type: 'category', gridIndex: 0 },
        ],
        yAxis: [
            { gridIndex: 0 },
        ],

        series: [
            // These series are in the first grid.
            { type: 'bar', seriesLayoutBy: 'row' },
            { type: 'bar', seriesLayoutBy: 'row' },
            { type: 'bar', seriesLayoutBy: 'row' }
        ]
    };
    myChart.setOption(option);
    /************************        5        **************************/
    var dom = document.getElementById("chart-5");
    var myChart = echarts.init(dom, 'shine');
    var app = {};
    option = null;
    app.title = '';
    option = {
        responsive: true,
        maintainAspectRatio: true,
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ['Procedures', '01/2020', '02/2020', '03/2020', '04/2020'],
                ['Procedure 1', 41.1, 30.4, 65.1, 53.3],
                ['Procedure 2', 86.5, 92.1, 85.7, 83.1],
                ['Procedure 3', 24.1, 67.2, 79.5, 86.4]
            ]
        },
        xAxis: [
            { type: 'category', gridIndex: 0 },
        ],
        yAxis: [
            { gridIndex: 0 },
        ],

        series: [
            // These series are in the first grid.
            { type: 'bar', seriesLayoutBy: 'row' },
            { type: 'bar', seriesLayoutBy: 'row' },
            { type: 'bar', seriesLayoutBy: 'row' }
        ]
    };
    myChart.setOption(option);
    /************************        6        **************************/
    var dom = document.getElementById("chart-6");
    var myChart = echarts.init(dom, 'shine');
    var app = {};
    option = null;
    app.title = '';
    option = {
        responsive: true,
        maintainAspectRatio: true,
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [
                    { value: 535, name: 'Procedures 01' },
                    { value: 535, name: 'Procedures 02' },
                    { value: 510, name: 'Procedures 03' },
                    { value: 634, name: 'Procedures 04' },
                    { value: 735, name: 'Procedures 05' },
                    { value: 535, name: 'Procedures 06' },
                    { value: 535, name: 'Procedures 07' },
                    { value: 510, name: 'Procedures 08' },
                    { value: 634, name: 'Procedures 09' },
                    { value: 735, name: 'Procedures 10' },
                    { value: 735, name: 'All Remaining' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
    /************************        7        **************************/
    var dom = document.getElementById("chart-7");
    var myChart = echarts.init(dom, 'shine');
    var app = {};
    option = null;
    app.title = '';
    option = {
        responsive: true,
        maintainAspectRatio: true,
        legend: {},
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['45Y - 49Y', '50Y - 54Y', '55Y - 69Y', '60Y - 64Y', '65Y - 69Y']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'InPatient',
                type: 'line',
                data: [70, 140, 160, 170, 150, 200, 220]
            },
            {
                name: 'OutPatient',
                type: 'line',
                data: [70, 220, 160, 190, 160, 180, 200]
            },
            {
                name: 'ER',
                type: 'line',
                data: [80, 90, 100, 120, 140, 150, 180]
            },
        ]
    };
    myChart.setOption(option);
    /************************        8        **************************/
    var chartDom = document.getElementById('chart-8');
    var myChart = echarts.init(chartDom);
    // var myChart = echarts.init(dom, 'shine');
    var option;
    option = {
        responsive: true,
        maintainAspectRatio: true,
        dataset: [
            {
                source: [
                    ['Product', 'Sales', 'Price', 'Year'],
                    ['Cake', 123, 32, 2011],
                    ['Cereal', 231, 14, 2011],
                    ['Tofu', 235, 5, 2011],
                    ['Dumpling', 341, 25, 2011],
                    ['Biscuit', 122, 29, 2011],
                    ['Cake', 143, 30, 2012],
                    ['Cereal', 201, 19, 2012],
                    ['Tofu', 255, 7, 2012],
                    ['Dumpling', 241, 27, 2012],
                    ['Biscuit', 102, 34, 2012],
                    ['Cake', 153, 28, 2013],
                    ['Cereal', 181, 21, 2013],
                    ['Tofu', 395, 4, 2013],
                    ['Dumpling', 281, 31, 2013],
                    ['Biscuit', 92, 39, 2013],
                    ['Cake', 223, 29, 2014],
                    ['Cereal', 211, 17, 2014],
                    ['Tofu', 345, 3, 2014],
                    ['Dumpling', 211, 35, 2014],
                    ['Biscuit', 72, 24, 2014]
                ]
            },
            {
                transform: {
                    type: 'filter',
                    config: { dimension: 'Year', value: 2011 }
                }
            },
            {
                transform: {
                    type: 'filter',
                    config: { dimension: 'Year', value: 2012 }
                }
            },
            {
                transform: {
                    type: 'filter',
                    config: { dimension: 'Year', value: 2013 }
                }
            }
        ],
        series: [
            {
                type: 'pie',
                radius: 50,
                center: ['50%', '25%'],
                datasetIndex: 1
            },
            {
                type: 'pie',
                radius: 50,
                center: ['50%', '50%'],
                datasetIndex: 2
            },
            {
                type: 'pie',
                radius: 50,
                center: ['50%', '75%'],
                datasetIndex: 3
            }
        ],
        // Optional. Only for responsive layout:
        media: [
            {
                query: { minAspectRatio: 1 },
                option: {
                    series: [
                        { center: ['25%', '50%'] },
                        { center: ['50%', '50%'] },
                        { center: ['75%', '50%'] }
                    ]
                }
            },
            {
                option: {
                    series: [
                        { center: ['50%', '25%'] },
                        { center: ['50%', '50%'] },
                        { center: ['50%', '75%'] }
                    ]
                }
            }
        ]
    };
    myChart.setOption(option);
});
// resize all charts
$(window).on('resize', function () {
    $("[_echarts_instance_]").each(function () {
        window.echarts.getInstanceById($(this).attr('_echarts_instance_')).resize()
    });
});