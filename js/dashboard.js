

// 图表处理
var chartResolution = new Vue({
    el: '#dashboardCharts',
    data: {
        /*样式*/
        pie: {
            width: '100%',
            height: '300px'
        },
        bar: {
            width: '100%',
            heightR: '600px',
            heightB: '500px'
        },
        /*数据-注册地区*/
        registerArea: [],
        registerNum: [],
        /*数据-注册行业*/
        legendData:[],
        seriesData:[],
        selected:{}

    },
    mounted: function () {
        var vm = this;
        vm.drawPieChart();
        vm.drawBarChart();

        setTimeout(function () {
            window.onresize = function () {
                return function () {
                    vm.pie.width = $("#pieBasicOne").width();
                    vm.pieChartOne.resize();
                    vm.pieChartTwo.resize();
                    vm.pieChartThree.resize();
                    vm.pieChartFour.resize();
                    vm.bar.width = $("#barBasicR").width();
                    vm.barChartB.resize();
                    vm.pieChartB.resize();
                }();
            }
        }, 400);
    },
    methods: {
        drawPieChart: function () {
            var vm = this;
            vm.pieChartOne = echarts.init(document.getElementById('pieBasicOne'), 'macarons');
            vm.pieChartTwo = echarts.init(document.getElementById('pieBasicTwo'), 'macarons');
            vm.pieChartThree = echarts.init(document.getElementById('pieBasicThree'), 'macarons');
            vm.pieChartFour = echarts.init(document.getElementById('pieBasicFour'), 'macarons');

            var pieOptionOne = {
                title: {
                    text: '注册资本',
                    textStyle: {
                        color: '#000'
                    },
                    top: '5%'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                /*legend: {
                    orient: 'horizontal',
                    itemHeight:10,
                    itemWidth:10,
                    data:['0-100万','100-200万','200万-500万','500万-1000万','1000万以上']
                },*/
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '14'
                                }
                            }
                        },
                        data: [
                            { value: 335, name: '0-100万' },
                            { value: 310, name: '100-200万' },
                            { value: 234, name: '200万-500万' },
                            { value: 135, name: '500万-1000万' },
                            { value: 1548, name: '1000万以上' }
                        ]
                    }
                ]
            };


            var pieOptionTwo = {
                title: {
                    text: '成立时间',
                    textStyle: {
                        color: '#000'
                    },
                    top: '5%'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '60%',
                        data: [
                            { value: 335, name: '0-500人' },
                            { value: 310, name: '1000-5000人' },
                            { value: 234, name: '5000-10000人' },
                            { value: 135, name: '10000人以上' }
                        ],
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '14'
                                }
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            vm.pieChartOne.setOption(pieOptionOne);
            vm.pieChartTwo.setOption(pieOptionTwo);
            vm.pieChartThree.setOption(pieOptionOne);
            vm.pieChartFour.setOption(pieOptionTwo);
        },

        drawBarChart: function () {
            var vm = this;

            // 图表插入
            vm.pieChartB = echarts.init(document.getElementById('pieBasicB'), 'macarons');
            vm.barChartB = echarts.init(document.getElementById('barBasicB'), 'macarons');

            vm.info = JSON.parse(localStorage.getItem("b")).info;
            vm.organizor = JSON.parse(localStorage.getItem("b")).organizor;
            vm.type = JSON.parse(localStorage.getItem("b")).type;

            /*下面柱状图*/
            axios.post('http://192.168.0.5/api/content/dashboardcitys/', {
                type: vm.type,
                info: vm.info,
                organizor: vm.organizor
            })
                .then(function (response) {
                    response.data.data.forEach(function (element, index, array) {
                        vm.registerArea.push(element.Name);
                        vm.registerNum.push(element.Num);
                    });
                        var barOptionB = {
                            title: {
                                text: '',
                                textStyle: {
                                    color: '#000'
                                }
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            toolbox: {
                                show: true,
                                top: '3%',
                                itemSize: 18,
                                feature: {
                                    dataView: { show: true, readOnly: false },
                                    magicType: { show: true, type: ['line', 'bar'] },
                                    restore: { show: true },

                                    myTool: {
                                        show: true,
                                        itemSize: '18px',
                                        title: 'GIS展示',
                                        icon: 'image://../images/map.png',
                                        onclick: function () {
                                            window.location.href = 'map.html';
                                        },
                                        iconStyle: {
                                            normal: {
                                                color: 'white',//设置颜色
                                                itemSize: '30',
                                            }
                                        }
                                    },
                                    saveAsImage: { show: true }
                                }
                            },
                            grid: {
                                x: 50,
                                x2: 0
                            },
                            xAxis: {
                                type: 'category',
                                axisLabel: {
                                    interval: 0,
                                    formatter: function (value) {
                                        var ret = "";
                                        var maxLength = 2;
                                        var valLength = value.length;
                                        var rowN = Math.ceil(valLength / maxLength);
                                        if (rowN > 1) {
                                            for (var i = 0; i < rowN; i++) {
                                                var temp = "";
                                                var start = i * maxLength;
                                                var end = start + maxLength;
                                                temp = value.substring(start, end) + "\n";
                                                ret += temp;
                                            }
                                            return ret;
                                        }
                                        else {
                                            return value;
                                        }
                                    }
                                },
                                data: vm.registerArea
                            },
                            yAxis: {
                                type: 'value',
                                name: '数量（个）'
                            },
                            series: [{
                                data: vm.registerNum,
                                type: 'bar'
                            }]

                        };

                        vm.barChartB.setOption(barOptionB);
                })
                .catch(function (error) {
                    alert(error);
                });

            /*下面的饼状图*/
            axios.post('http://192.168.0.5/api/content/industry/', {
                type: vm.type,
                info: vm.info,
                organizor: vm.organizor
            })
                .then(function (response) {
                    vm.seriesData = response.data.data;
                    response.data.data.forEach(function (element, index, array) {
                        vm.legendData.push(element.name);
                        /*vm.selected[element.name] = element.value != 0;*/
                        vm.selected[element.name] = index < 6;
                    });

                    var pieOptionB={
                        title : {
                            text: '',
                            subtext: '',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            type: 'scroll',
                            orient: 'vertical',
                            right: 10,
                            top: 20,
                            bottom: 20,
                            data: vm.legendData,
                            selected: vm.selected
                        },
                        series : [
                            {
                                name: '行业',
                                type: 'pie',
                                radius : '55%',
                                center: ['40%', '50%'],
                                data: vm.seriesData,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    vm.pieChartB.setOption(pieOptionB);
                })
                .catch(function (error) {
                    alert(error);
                });
        }


    }
})