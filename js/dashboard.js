

// 图表处理
var chartResolution = new Vue({
    el: '#dashboardCharts',
    data: {
        /*样式*/
        pie:{
          width:'100%',
          height:'300px'
        },
        bar:{
            width:'100%',
            heightR:'600px',
            heightB:'500px'
        },
        /*数据-注册地区*/
        registerArea:[],
        registerNum:[]

    },
    mounted: function () {
        var vm = this;
        vm.drawPieChart();
        vm.drawBarChart();

        setTimeout(function (){
            window.onresize = function () {
                return function () {
                    vm.pie.width = $("#pieBasicOne").width();
                    vm.pieChartOne.resize();
                    vm.pieChartTwo.resize();
                    vm.pieChartThree.resize();
                    vm.pieChartFour.resize();
                    vm.bar.width = $("#barBasicR").width();
                    vm.barChartB.resize();
                    vm.barChartR.resize();
                }();
          }
        },400);
    },
    methods:{
        drawPieChart:function(){
            var vm =this;
            vm.pieChartOne = echarts.init(document.getElementById('pieBasicOne'), 'macarons');
            vm.pieChartTwo = echarts.init(document.getElementById('pieBasicTwo'), 'macarons');
            vm.pieChartThree = echarts.init(document.getElementById('pieBasicThree'), 'macarons');
            vm.pieChartFour = echarts.init(document.getElementById('pieBasicFour'), 'macarons');

            var pieOptionOne = {
                title:{
                    text:'注册资本',
                    textStyle:{
                        color:'#000'
                    },
                    top:'5%'
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
                        name:'访问来源',
                        type:'pie',
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
                        data:[
                            {value:335, name:'0-100万'},
                            {value:310, name:'100-200万'},
                            {value:234, name:'200万-500万'},
                            {value:135, name:'500万-1000万'},
                            {value:1548, name:'1000万以上'}
                        ]
                    }
                ]
            };
          

            var pieOptionTwo = {
                title:{
                    text:'成立时间',
                    textStyle:{
                        color:'#000'
                    },
                    top:'5%'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '60%',
                        data:[
                            {value:335, name:'0-500人'},
                            {value:310, name:'1000-5000人'},
                            {value:234, name:'5000-10000人'},
                            {value:135, name:'10000人以上'}
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

        drawBarChart:function () {
            var vm = this;

        // 图表插入
        vm.barChartR = echarts.init(document.getElementById('barBasicR'), 'macarons');
        vm.barChartB = echarts.init(document.getElementById('barBasicB'), 'macarons');

            /*下面柱状图*/
            axios.post('http://192.168.0.5/api/content/city.html', {})
                .then(function (response) {
                    response.data.data.forEach(function (element, index, array){
                        vm.registerArea.push(element.dataTitle);
                        vm.registerNum.push(element.dataBugets);
                        var barOptionB = {
                            title:{
                                text:'注册地区',
                                textStyle:{
                                    color:'#000'
                                },
                                top:'3%'
                            },
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid:{
                                x:50,
                                x2:0
                            },
                            xAxis: {
                                type: 'category',
                                axisLabel:{
                                    interval:0,
                                    formatter:function(value){
                                        var ret = "";
                                        var maxLength = 2;
                                        var valLength = value.length;
                                        var rowN = Math.ceil(valLength / maxLength);
                                        if (rowN > 1){
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
                                type: 'value'
                            },
                            series: [{
                                data: vm.registerNum,
                                type: 'bar'
                            }]
                        };
                        vm.barChartB.setOption(barOptionB);
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });


        /*右边柱状图*/
        var BarOptionR = {
            title:{
                text:'行业',
                textStyle:{
                    color:'#000'
                },
                top:'3%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: { // 控制图的大小，调整下面这些值就可以，
                x:50,
                y:50,
                x2: 0,
                y2: 50// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ['巴西','印尼','美国美国','印度','中国','皮革，毛皮，羽毛及其制品和制鞋业'],
                axisLabel:{
                    margin:2,
                    formatter:function(value){
                        var ret = "";//拼接加\n返回的类目项
                        var maxLength = 4;//每项显示文字个数
                        var valLength = value.length;//X轴类目项的文字个数
                        var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                        //如果类目项的文字大于5,
                        if (rowN > 1){
                            for (var i = 0; i < rowN; i++) {
                                var temp = "";//每次截取的字符串
                                var start = i * maxLength;//开始截取的位置
                                var end = start + maxLength;//结束截取的位置
                                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                                temp = value.substring(start, end) + "\n";
                                ret += temp; //凭借最终的字符串
                            }
                            return ret;
                        }
                        else {
                            return value;
                        }
                    }
                }
            },
            series: [
                {
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                }
            ]
        };
        vm.barChartR.setOption(BarOptionR);
        }
    }
})