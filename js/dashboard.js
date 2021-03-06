// 图表处理
var pieOptionOne, pieOptionTwo, pieOptionThree, pieOptionFour = "";

var registeredCapitals = [{
        text: '全部',
        value: 'all'
    },
    {
        text: '0-100万',
        value: '0-100万'
    },
    {
        text: '100-200万',
        value: '100-200万'
    },
    {
        text: '200-500万',
        value: '200-500万'
    },
    {
        text: '500-1000万',
        value: '500-1000万'
    },
    {
        text: '1000万以上',
        value: '1000万以上'
    }
]
var staffs = [{
        text: '全部',
        value: 'all'
    },
    {
        text: "1-49人",
        value: "1-49人"
    },
    {
        text: "50-99人",
        value: "50-99人"
    },
    {
        text: "100-199人",
        value: "100-199人"
    },
    {
        text: "200-299人",
        value: "200-299人"
    },
    {
        text: "300-399人",
        value: "300-399人"
    },
    {
        text: "400-499人",
        value: "400-499人"
    },
    {
        text: "500人以上",
        value: "500人以上"
    }
]
var foundedTimes = [{
        text: '全部',
        value: 'all'
    },
    {
        text: '1-5年',
        value: '1-5年'
    },
    {
        text: '5-10年',
        value: '5-10年'
    },
    {
        text: '10-15年',
        value: '10-15年'
    },
    {
        text: '15-20年',
        value: '15-20年'
    },
    {
        text: '20年以上',
        value: '20年以上'
    }
]
var pcNumber = [{
        text: '全部',
        value: 'all'
    },
    {
        text: '1-50台',
        value: '1-50台'
    },
    {
        text: '51-100台',
        value: '51-100台'
    }
]

var chartResolution = new Vue({
    el: '#dashboardCharts',
    data: {
        /*样式*/
        pie: {
            width: '400px',
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
        legendData: [],
        seriesData: [],
        selected: {},
        // 饼图
        pieSet: {
            firstCollection: [],
            secondCollection: [],
            thirdCollection: [],
            fourthCollection: []
        },
        allData: [],
        breadItemUp: '',
        breadItem: '',
        selectedOptionOne: 'all',
        selectedOptionTwo: 'all',
        selectedOptionThree: 'all',
        selectedOptionFour: 'all',
        picklist: {
            firstOption: registeredCapitals,
            secondOption: foundedTimes,
            thirdOption: pcNumber,
            fourthOption: staffs
        },
        hasResult: true,
        isLoading: true
    },
    created: function () {
        //登陆检测
        loginCheck();
    },
    mounted: function () {
        if (type == "chart") {
            vm.info == ''
        }
        let vm = this
        vm.info = JSON.parse(localStorage.getItem('b')).info
        vm.organizor = JSON.parse(localStorage.getItem('b')).organizor
        vm.type = JSON.parse(localStorage.getItem('b')).type
        vm.breadItemUp = JSON.parse(localStorage.getItem('b')).navName
        vm.breadItem = vm.organizor + vm.info
        //以后要加PC台数
        if (vm.getUrlItem("RegC")) {
            vm.selectedOptionOne = decodeURI(decodeURI(vm.getUrlItem("RegC")));
        }
        if (vm.getUrlItem("Time")) {
            vm.selectedOptionTwo = decodeURI(decodeURI(vm.getUrlItem("Time")));
        }
        if (vm.getUrlItem("Sta")) {
            vm.selectedOptionFour = decodeURI(decodeURI(vm.getUrlItem("Sta")));
        }
        vm.initPieChart();
        vm.drawBarChartButtom();
        if (vm.getUrlItem("RegC") || vm.getUrlItem("Time") || vm.getUrlItem("Sta"))
            vm.searchSelect();
        else
            vm.drawPieChart();
    },
    methods: {
        resizePieChart: function () {
            let vm = this;
            vm.$nextTick(function () {
                vm.pie.width = $('#pieBasicOne').width()
                vm.pieChartOne.resize()
                vm.pieChartTwo.resize()
                vm.pieChartThree.resize()
                vm.pieChartFour.resize()
                vm.bar.width = $('#barBasicR').width()
                vm.barChartB.resize()
            });
        },
        getUrlItem: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        searchSelect: function () {
            var vm = this;
            vm.isLoading = true;
            let postData = {};
            postData.registeredCapitals = vm.selectedOptionOne;
            postData.foundedTimes = vm.selectedOptionTwo;
            postData.pcNumber = vm.selectedOptionThree;
            postData.staffs = vm.selectedOptionFour;
            postData.info = vm.info;
            postData.organizor = vm.organizor;
            axios(globalUrl + 'content/at_will', {
                    method: 'post',
                    data: Qs.stringify(postData)
                })
                .then(function (response) {

                    if (Object.keys(response.data.data).length != 0) {
                        pieOptionOne.series[0].data = response.data.data[1];
                        pieOptionTwo.series[0].data = response.data.data[2];
                        pieOptionThree.series[0].data = response.data.data[3];
                        pieOptionFour.series[0].data = response.data.data[4];
                        // setOption代码区域
                        vm.pieChartOne.setOption(pieOptionOne)
                        vm.pieChartTwo.setOption(pieOptionTwo)
                        vm.pieChartThree.setOption(pieOptionThree)
                        vm.pieChartFour.setOption(pieOptionFour)
                        vm.hasResult = true
                    } else {
                        vm.hasResult = false
                        vm.isLoading = true;
                    }
                    vm.isLoading = false;

                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        refreshPieChart: function () {
            var vm = this;
            vm.searchSelect();


        },
        initPieChart: function () {
            var vm = this
            vm.pieChartOne = echarts.init(
                document.getElementById('pieBasicOne'),
                'macarons'
            )
            vm.pieChartTwo = echarts.init(
                document.getElementById('pieBasicTwo'),
                'macarons'
            )
            vm.pieChartThree = echarts.init(
                document.getElementById('pieBasicThree'),
                'macarons'
            )
            vm.pieChartFour = echarts.init(
                document.getElementById('pieBasicFour'),
                'macarons'
            )
            pieOptionOne = {
                title: {
                    text: '注册资本',
                    textStyle: {
                        color: '#000'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },

                series: [{
                    name: '注册资本',
                    type: 'pie',
                    radius: ['50%', '80%'],
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
                    }
                }]
            };
            pieOptionTwo = {
                title: {
                    text: '成立时间',
                    textStyle: {
                        color: '#000'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                series: [{
                    name: '成立时间',
                    type: 'pie',
                    radius: '80%',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    }
                }]
            };
            pieOptionThree = {
                title: {
                    text: 'pc台数',
                    textStyle: {
                        color: '#000'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                series: [{
                    name: 'pc数量',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        },
                        emphasis: {
                            show: true
                        }
                    }
                }]
            };
            pieOptionFour = {
                title: {
                    text: '员工人数',
                    textStyle: {
                        color: '#000'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                series: [{
                    name: '员工人数',
                    type: 'pie',
                    radius: '80%',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    }
                }]
            };
        },
        drawPieChart: function () {
            let vm = this;
            // 注册资本 第一个饼图
            var promise1 = new Promise(function (resolve, reject) {
                axios
                    .post(globalUrl + 'content/statistics_capital/', {
                        type: vm.type,
                        info: vm.info,
                        organizor: vm.organizor
                    })
                    .then(function (response) {
                        vm.pieSet.firstCollection = response.data.data
                        // setOption代码区域
                        pieOptionOne.series[0].data = vm.pieSet.firstCollection;
                        // setOption代码区域
                        vm.pieChartOne.setOption(pieOptionOne);
                        resolve("1 success");
                    })
                    .catch(function (error) {
                        alert(error)
                    })
            });
            // 成立时间 第二个饼图
            var promise2 = new Promise(function (resolve, reject) {
                axios
                    .post(globalUrl + 'content/statistics_year/', {
                        type: vm.type,
                        info: vm.info,
                        organizor: vm.organizor
                    })
                    .then(function (response) {
                        vm.pieSet.secondCollection = response.data.data
                        pieOptionTwo.series[0].data = vm.pieSet.secondCollection;
                        // setOption代码区域
                        vm.pieChartTwo.setOption(pieOptionTwo)
                        resolve("2 success");
                    })
                    .catch(function (error) {
                        alert(error)
                    })

            });
            // pc数量 第三个饼图
            var promise3 = new Promise(function (resolve, reject) {
                axios
                    .post(globalUrl + 'content/statistics_pc/', {
                        type: vm.type,
                        info: vm.info,
                        organizor: vm.organizor
                    })
                    .then(function (response) {
                        vm.pieSet.thirdCollection = response.data.data
                        pieOptionThree.series[0].data = vm.pieSet.thirdCollection;
                        // setOption代码区域
                        vm.pieChartThree.setOption(pieOptionThree)
                        resolve("3 success");
                    })
                    .catch(function (error) {
                        alert(error)
                    })
            });
            // 员工人数第四个饼图
            var promise4 = new Promise(function (resolve, reject) {
                axios
                    .post(globalUrl + 'content/statistics_personnel/', {
                        type: vm.type,
                        info: vm.info,
                        organizor: vm.organizor
                    })
                    .then(function (response) {
                        vm.pieSet.fourthCollection = response.data.data
                        pieOptionFour.series[0].data = vm.pieSet.fourthCollection;
                        // setOption代码区域
                        vm.pieChartFour.setOption(pieOptionFour)
                        resolve("4 success");
                    })
                    .catch(function (error) {
                        alert(error)
                    })
            });
            //所有异步完成后,不再loading
            Promise.all([promise1, promise2, promise3, promise4]).then(function (values) {
                vm.isLoading = false;
                vm.resizePieChart();
            });
        },
        drawBarChartButtom: function () {
            var vm = this;
            // 图表插入
            vm.pieChartB = echarts.init(
                document.getElementById('pieBasicB'),
                'macarons'
            )
            vm.barChartB = echarts.init(
                document.getElementById('barBasicB'),
                'macarons'
            )

            /*下面柱状图*/
            axios
                .post(globalUrl + 'content/dashboardcitys/', {
                    type: vm.type,
                    info: vm.info,
                    organizor: vm.organizor
                })
                .then(function (response) {
                    response.data.data.forEach(function (element, index, array) {
                        vm.registerArea.push(element.Name)
                        vm.registerNum.push(element.Num)
                    })
                    var barOptionB = {
                        title: {
                            text: '',
                            textStyle: {
                                color: '#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        toolbox: {
                            show: true,
                            top: '3%',
                            itemSize: 18,
                            feature: {
                                dataView: {
                                    show: true,
                                    readOnly: false
                                },
                                magicType: {
                                    show: true,
                                    type: ['line', 'bar']
                                },
                                restore: {
                                    show: true
                                },

                                myTool: {
                                    show: true,
                                    itemSize: '18px',
                                    title: 'GIS展示',
                                    icon: 'image://../images/map.png',
                                    onclick: function () {
                                        window.location.href = 'map.html'
                                    },
                                    iconStyle: {
                                        normal: {
                                            color: 'white', //设置颜色
                                            itemSize: '30'
                                        }
                                    }
                                },
                                saveAsImage: {
                                    show: true
                                }
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
                                    var ret = ''
                                    var maxLength = 2
                                    var valLength = value.length
                                    var rowN = Math.ceil(valLength / maxLength)
                                    if (rowN > 1) {
                                        for (var i = 0; i < rowN; i++) {
                                            var temp = ''
                                            var start = i * maxLength
                                            var end = start + maxLength
                                            temp = value.substring(start, end) + '\n'
                                            ret += temp
                                        }
                                        return ret
                                    } else {
                                        return value
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
                    }

                    vm.barChartB.setOption(barOptionB)
                })
                .catch(function (error) {
                    alert(error)
                })

            /*下面的饼状图*/
            axios
                .post(globalUrl + 'content/industry/', {
                    type: vm.type,
                    info: vm.info,
                    organizor: vm.organizor
                })
                .then(function (response) {
                    vm.seriesData = response.data.data
                    response.data.data.forEach(function (element, index, array) {
                        vm.legendData.push(element.name)
                        /*vm.selected[element.name] = element.value != 0;*/
                        vm.selected[element.name] = index < 6
                    })

                    var pieOptionB = {
                        title: {
                            text: '',
                            subtext: '',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
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
                        series: [{
                            name: '行业',
                            type: 'pie',
                            radius: '55%',
                            center: ['40%', '50%'],
                            data: vm.seriesData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    }
                    vm.pieChartB.setOption(pieOptionB)
                })
                .catch(function (error) {
                    alert(error)
                })
        }
    }
})