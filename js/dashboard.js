

// 图表处理
var chartResolution = new Vue({
    el: '#dashboardCharts',
    data: {
        dataTitleX: [],
        dataTitleY: [],
        dataBudget: []
    },
    mounted: function () {
        var vm = this;
        vm.drawPieChart();
        vm.drawBarChart();
    },
    methods:{
        drawPieChart:function(){
            var pieChartOne = echarts.init(document.getElementById('pieBasicOne'), 'macarons');
            var pieChartTwo = echarts.init(document.getElementById('pieBasicTwo'), 'macarons');
            var pieChartThree = echarts.init(document.getElementById('pieBasicThree'), 'macarons');
            var pieChartFour = echarts.init(document.getElementById('pieBasicFour'), 'macarons');

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
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['40%', '60%'],
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ]
                    }
                ]
            };
            pieChartOne.setOption(pieOptionOne);

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
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ],
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
            pieChartTwo.setOption(pieOptionTwo);
            pieChartThree.setOption(pieOptionOne);
            pieChartFour.setOption(pieOptionTwo);
        },

        drawBarChart:function () {
            // 基于准备好的dom，初始化echarts实例
            /*axios.get('#')
            .then(function (response) {
                
            })
            .catch(function (error) {
                console.log(error);
            });*/

        // 图表插入
        var barChartR = echarts.init(document.getElementById('barBasicR'), 'macarons');
        var barChartB = echarts.init(document.getElementById('barBasicB'), 'macarons');


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
            /*grid:{
                x:80
            },*/
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['巴西','印尼','美国美国','印度','中国','皮革，毛皮，羽毛及其制品和制鞋业'],
                axisLabel:{
                    formatter:function (value,index) {
                        if(value.length > 3){
                            value = value.substr(0,3)+'...';
                        }
                        return value;
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
        barChartR.setOption(BarOptionR);


        /*下面柱状图*/
        var barOptionB = {
            title:{
                text:'注册地区',
                textStyle:{
                    color:'#000'
                },
                top:'3%'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        };
        barChartB.setOption(barOptionB);

        }
    }

})