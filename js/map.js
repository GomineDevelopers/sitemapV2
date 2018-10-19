$((function () {


}))
var map =new Vue({
    el:"#mapRoot",
    data :{
        countData: []
    },
    mounted:function () {
     this.getMapdata();
    }
    ,
    methods:{
        handleResource(){
            if(key= JSON.parse(localStorage.getItem("type")).type==1){
                var storage={}
                localStorage.setItem("b", JSON.stringify(storage));
                var key= JSON.parse(localStorage.getItem("searchLitToMap")).key;
                var range= JSON.parse(localStorage.getItem("searchLitToMap")).range;
                var capital= JSON.parse(localStorage.getItem("searchLitToMap")).capital;
                var time= JSON.parse(localStorage.getItem("searchLitToMap")).time;
                var address= JSON.parse(localStorage.getItem("searchLitToMap")).address;
            }
        },
        getMapdata(){
            let vm=this
            var arryData=[]
            axios(globalUrl + 'content/gis_screen', {
                method: 'post',

            }).then(function (response) {
                vm.countData=response.data.data.result
                vm.setMap(vm.countData)
                })
                .catch(function (error) {
                    console.log(error)
                })


        },
        setMap(temp){
            let vm=this;
            var dom = document.getElementById("container");
            var myChart = echarts.init(dom);
            option = null;
            var data=[]
            data=temp;
            console.log(data)
            var geoCoordMap = {
                '海门':[121.15,31.89],
            '澳门特别行政区':[113.55751910182,22.204117988443],
                '香港特别行政区':[114.18612410257,22.29358599328],
                '台湾省':[121.97387097872,24.086956718805],
                '新疆维吾尔自治区':[85.614899338339,42.127000957642],
                '宁夏回族自治区':[106.15548126505,37.321323112295],
                '青海省':[96.202543672261,35.499761004275],
                '甘肃省':[38.103267343752,102.45762459934],
                '陕西省':[35.860026261323,109.50378929073],
                '西藏自治区':[31.367315402715,89.137981684031],
                '云南省':[101.59295163701,24.864212795483],
                '贵州省':[106.7349961033,26.902825927797],
                '四川省':[102.8991597236,30.367480937958],
                '重庆市':[106.53063501341,29.544606108886],
                '海南省':[109.73375548794,19.180500801261],
                '广西壮族自治区':[108.92427442706,23.552254688119],
                '广东省':[113.39481755876,23.408003729025],
                '湖南省':[111.72066354648,27.695864052356],
                '湖北省':[112.41056219213,31.20931625014],
                '河南省':[113.48680405753,34.157183767956],
                '山东省':[118.52766339288,36.099289929728],
                '江西省':[115.6760823667,27.757258443441],
                '福建省':[117.98494311991,26.050118295661],
                '安徽省':[117.21600520757,31.859252417079],
                '浙江省':[119.95720242066,29.159494120761],
                '江苏省':[119.36848893836,33.013797169954],
                '上海市':[121.48789948569,31.249161710015],
                '黑龙江省':[128.04741371499,47.356591643111],
                '吉林省':[126.26287593078,43.678846185241],
                '辽宁省':[41.621600105958,122.75359155772],
                '内蒙古自治区':[114.41586754817,43.468238221949],
                '山西省':[112.51549586384,37.866565990509],
                '河北省':[115.66143362422,38.613839749251],
                '天津市':[117.21081309155,39.14392990331],
                '北京市':[116.46,39.92],
            };

            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            option = {
                // backgroundColor: '#404a59',
                title: {
                    text: '公司分布情况',
                    subtext: 'data from GOMINE',
                    sublink: 'http://www.gomine.com',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item'
                },
                bmap: {
                    center: [104.114129, 37.550339],
                    zoom: 5,
                    roam: true,
                    mapStyle: {
                        styleJson: [
                            {
                                "featureType": "water",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#044161"
                                }
                            },
                            {
                                "featureType": "land",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#004981"
                                }
                            },
                            {
                                "featureType": "boundary",
                                "elementType": "geometry",
                                "stylers": {
                                    "color": "#064f85"
                                }
                            },
                            {
                                "featureType": "railway",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "highway",
                                "elementType": "geometry",
                                "stylers": {
                                    "color": "#004981"
                                }
                            },
                            {
                                "featureType": "highway",
                                "elementType": "geometry.fill",
                                "stylers": {
                                    "color": "#005b96",
                                    "lightness": 1
                                }
                            },
                            {
                                "featureType": "highway",
                                "elementType": "labels",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "arterial",
                                "elementType": "geometry",
                                "stylers": {
                                    "color": "#004981"
                                }
                            },
                            {
                                "featureType": "arterial",
                                "elementType": "geometry.fill",
                                "stylers": {
                                    "color": "#00508b"
                                }
                            },
                            {
                                "featureType": "poi",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "green",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#056197",
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "subway",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "manmade",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "local",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "arterial",
                                "elementType": "labels",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "boundary",
                                "elementType": "geometry.fill",
                                "stylers": {
                                    "color": "#029fd4"
                                }
                            },
                            {
                                "featureType": "building",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#1a5787"
                                }
                            },
                            {
                                "featureType": "label",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            }
                        ]
                    }
                },
                series : [
                    {
                        name: 'pm2.5',
                        type: 'scatter',
                        coordinateSystem: 'bmap',
                        data: convertData(data),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#ddb926'
                            }
                        }
                    },
                    {
                        name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'bmap',
                        data: convertData(data.sort(function (a, b) {
                            return b.value - a.value;
                        }).slice(0, 6)),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        showEffectOn: 'emphasis',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    },

                ]
            };;
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        }

    }
})
