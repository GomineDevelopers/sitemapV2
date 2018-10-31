$((function () {


}))
var map = new Vue({
    el: "#mapRoot",
    data: {
        countData: [],
        isGrid: false,
    },
    mounted: function () {
        if (JSON.parse(localStorage.getItem("type")).type == 0) {
            this.getlabelData();
        }
        if (JSON.parse(localStorage.getItem("type")).type == 1) {
            this.getMapdata();
        }
    },
    methods: {
        getMapdata() {
            let vm = this;
            var storage = {}
            localStorage.setItem("b", JSON.stringify(storage));
            var key = JSON.parse(localStorage.getItem("searchLitToMap")).key;
            var range = JSON.parse(localStorage.getItem("searchLitToMap")).range;
            var capital = JSON.parse(localStorage.getItem("searchLitToMap")).capital;
            var time = JSON.parse(localStorage.getItem("searchLitToMap")).time;
            var address = JSON.parse(localStorage.getItem("searchLitToMap")).address;
            axios(globalUrl + 'content/gis_screen', {
                method: 'post',
                params: {
                    accounname: key,
                    range: range,
                    capital: capital,
                    time: time,
                    address: address
                }
            }).then(function (response) {
                vm.countData = response.data.data
                vm.setMap(vm.countData)
            }).catch(function (error) {
                console.log(error)
            })


        },
        getlabelData() {
            var storage = {}
            localStorage.setItem("searchLitToMap", JSON.stringify(storage));
            /*缓存中的内容*/
            var info = JSON.parse(localStorage.getItem("b")).info;
            var organizor = JSON.parse(localStorage.getItem("b")).organizor;
            var type = JSON.parse(localStorage.getItem("b")).type;
            let vm = this
            axios(globalUrl + 'content/gisstate/', {
                    method: 'get',
                    dataType: "json",
                    params: {
                        info: info,
                        type: type,
                        organizor: organizor
                    },

                }).then(function (response) {
                    vm.countData = response.data.data
                    vm.setMap(vm.countData)
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        setMap(temp) {
            let vm = this;
            var dom = document.getElementById("container");
            var myChart = echarts.init(dom);
            option = null;
            var data = []
            data = temp;
            var geoCoordMap = {
                '澳门': [113.55751910182, 22.204117988443],
                '香港': [114.18612410257, 22.29358599328],
                '台湾': [121.97387097872, 24.086956718805],
                '新疆': [85.614899338339, 42.127000957642],
                '宁夏': [106.15548126505, 37.321323112295],
                '青海': [35.499761004275, 96.202543672261],
                '甘肃': [102.45762459934, 38.103267343752],
                '陕西': [109.50378929073, 35.860026261323],
                '西藏': [89.137981684031, 31.367315402715],
                '云南': [101.59295163701, 24.864212795483],
                '贵州': [106.7349961033, 26.902825927797],
                '四川': [102.8991597236, 30.367480937958],
                '重庆': [106.53063501341, 29.544606108886],
                '海南': [109.73375548794, 19.180500801261],
                '广西': [108.92427442706, 23.552254688119],
                '广东': [113.39481755876, 23.408003729025],
                '湖南': [111.72066354648, 27.695864052356],
                '湖北': [112.41056219213, 31.20931625014],
                '河南': [113.48680405753, 34.157183767956],
                '山东': [118.52766339288, 36.099289929728],
                '江西': [115.6760823667, 27.757258443441],
                '福建': [117.98494311991, 26.050118295661],
                '安徽': [117.21600520757, 31.859252417079],
                '浙江': [119.95720242066, 29.159494120761],
                '江苏': [119.36848893836, 33.013797169954],
                '上海': [121.48789948569, 31.249161710015],
                '黑龙江': [128.04741371499, 47.356591643111],
                '吉林': [126.26287593078, 43.678846185241],
                '辽宁': [122.75359155772, 41.621600105958],
                '内蒙古': [114.41586754817, 43.468238221949],
                '山西': [112.51549586384, 37.866565990509],
                '河北': [115.66143362422, 38.613839749251],
                '天津': [117.21081309155, 39.14392990331],
                '北京': [116.46, 39.92],
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
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        return params.name + '<br/>' +
                            params.seriesName + ": " + params.value[2]
                    }
                },
                bmap: {
                    center: [104.114129, 37.550339],
                    zoom: 5,
                    scaleLimit: {
                        min: 5,
                        max: 7
                    },
                    roam: true,
                    mapStyle: {
                        styleJson: [{
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
                    },
                    data: data
                },
                series: [{
                        name: '数量',
                        type: 'scatter',
                        coordinateSystem: 'bmap',
                        data: convertData(data),
                        symbolSize: function (val) {
                            if (val[2] < 10) {
                                return val[2] * 2;
                            } else {
                                return val[2] / 3
                            }
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
                    //排序的内容
                    {
                        name: '数量',
                        type: 'effectScatter',
                        coordinateSystem: 'bmap',
                        data: convertData(data.sort(function (a, b) {
                            return b.value - a.value;
                        }).slice(0, 6)),
                        symbolSize: function (val) {
                            if (val[2] < 10) {
                                return val[2] * 2;
                            } else {
                                return val[2] / 3
                            }

                        },
                        showEffectOn: 'render',
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
                                color: '#F4E925',
                                shadowBlur: 10,
                                shadowColor: '#05C3F9'
                            }
                        },
                        zlevel: 1
                    },

                ]
            };;
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        },
        changePointChart() {
            let vm = this;
            vm.isGrid = false;
        },
        changeMap() {
            let vm = this;
            vm.isGrid = true;
            var data = [];
            for (var i = 0; i < vm.countData.length; i++) {
                data.push({
                    name: vm.countData[i].name,
                    value: vm.countData[i].value
                });
            }

            console.log(data)
            var mainContainer = document.getElementById('containerGrid');
            var resizeMainContainer = function () {
                mainContainer.style.width = window.innerWidth * 0.8 + 'px';
                mainContainer.style.height = window.innerHeight * 0.8 + 'px';
            };
            resizeMainContainer();
            var dom = document.getElementById("containerGrid");
            var myChart = echarts.init(dom, e_macarons);
            $(window).on('resize', function () { //
                //屏幕大小自适应，重置容器高宽
                resizeMainContainer();
                myChart.resize();
            });
            option = {
                title: {
                    text: '公司数量分布图',
                    subtext: '来源:GOMINE',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['公司数量']
                },
                visualMap: {
                    min: 0,
                    max: 500,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'], // 文本，默认为数值文本
                    calculable: true
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: {
                            readOnly: false
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [{
                    name: '公司数量',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: vm.countData
                }]
            };
            myChart.setOption(option);
        }

    }
})