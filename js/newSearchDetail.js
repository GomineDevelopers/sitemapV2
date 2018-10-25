var app = new Vue({
    el: '#newSearchDetail',
    data: {
        companyId: "",
        isShow: {
            loading: true,
            isShowDiv: false,
            tabIndex: '1',
            showChart: '0'
        },
        intro: {
            Account_Name: "",
            Company_Phone: "",
            GANO: "",
            Official_Website: "",
            Street: "",
            update_time: "",
            latitude: "",
            longitude: ""
        },
        basicInfo: {
            Account_Name_En: "",
            Account_Name_Abbr: "",
            USCI_Code: "",
            TAX_Code: "",
            Registration_No: "",
            Legal_Person: "",
            Registered_Capital: "",
            Operation_Status: "",
            Start_Year: "",
            AKA_Name: "",
            FSI_Code: "",
            Ownership: "",
            Employee_Range: "",
            State_Code: "",
            City_Code: "",
            Company_Area_Code: "",
            PostCode: "",
            Business_Scope: ""
        },
        companySize: {
            Employee_Number: "",
            Tracking_Year: "",
            Site_Range: "",
            Site_Number: "",
            Bed_Number_Range: "",
            Bed_Number: "",
            Revenue_Range: "",
            Revenue: "",
            Phone_Range: "",
            Phone_Number: "",
            PC_Range: "",
            PC_Number: "",
            Server_Range: "",
            Server_Number: "",
            Storage_Range: "",
            Storage_Number: ""
        },
        // 分页
        cur: 1, //当前页码
        goPage: 1,
        all: "", //总条数
        allPage: '',
        newsType: "1",
        newsData: {},
        goPage: "1",
        createTime: '',
        angleOne: false,
        angleTwo: false,
        angleThree: false,
        angleFour: false,
        // 公司人员信息
        picUrl: '',
        name: '',
        jobTitle: ''
    },
    created: function () {
        //登陆检测
        loginCheck();
    },
    computed: {
        //分页
        indexs: function () {
            var left = 1;
            var vm = this;
            /*总页数*/
            vm.allPage = this.all % 5 == 0 ? this.all / 5 : Math.ceil(this.all / 5);
            var right = vm.allPage;
            var ar = [];
            if (vm.allPage >= 5) {
                if (vm.cur > 3 && vm.cur < vm.allPage - 2) {
                    left = vm.cur - 2;
                    right = vm.cur + 2;
                } else {
                    if (vm.cur <= 3) {
                        left = 1;
                        right = 5;
                    } else {
                        right = vm.allPage;
                        left = vm.allPage - 4;
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        }
    },
    mounted: function () {
        this.getNewsData();
    },
    methods: {
        getNewsData() {
            var companyId = getQueryVariable("Seq_No");
            let self = this;
            let temp = "";
            axios.get(globalUrl + "content/detail/Seq_No/", {
                    params: {
                        Seq_No: companyId,
                        types: this.newsType
                    }
                }).then(function (response) {
                    let tempRes = response.data.data
                    self.isShow.isShowDiv = true;
                    // 头部简介
                    self.intro.Account_Name = tempRes.data.Account_Name == null ? temp : tempRes.data.Account_Name;
                    self.intro.Company_Phone = tempRes.data.Company_Phone == null ? temp : tempRes.data.Company_Phone;
                    self.intro.GANO = tempRes.data.GANO == null ? temp : tempRes.data.GANO;
                    self.intro.Official_Website = tempRes.data.Official_Website == null ? temp : tempRes.data.Official_Website;
                    self.intro.Street = tempRes.data.Street == null ? temp : tempRes.data.Street;
                    self.intro.update_time = tempRes.data.update_time == null ? "未知" : formatDate(tempRes.data.update_time);
                    // 基本信息展示
                    self.basicInfo.Account_Name_En = tempRes.data.Account_Name_En == null ? temp : tempRes.data.Account_Name_En;
                    self.basicInfo.Account_Name_Abbr = tempRes.data.Account_Name_Abbr == null ? temp : tempRes.data.Account_Name_Abbr;
                    self.basicInfo.USCI_Code = tempRes.data.USCI_Code == null ? temp : tempRes.data.USCI_Code;
                    self.basicInfo.TAX_Code = tempRes.data.TAX_Code == null ? temp : tempRes.data.TAX_Code;
                    self.basicInfo.Registration_No = tempRes.data.Registration_No == null ? temp : tempRes.data.Registration_No;
                    self.basicInfo.Legal_Person = tempRes.data.Legal_Person == null ? temp : tempRes.data.Legal_Person;
                    self.basicInfo.Registered_Capital = tempRes.data.Registered_Capital == null ? temp : tempRes.data.Registered_Capital;
                    self.basicInfo.Operation_Status = tempRes.data.Operation_Status == null ? temp : tempRes.data.Operation_Status;
                    self.basicInfo.Start_Year = tempRes.data.Start_Year == null ? temp : tempRes.data.Start_Year;
                    self.basicInfo.AKA_Name = tempRes.data.AKA_Name == null ? temp : tempRes.data.AKA_Name;
                    self.basicInfo.FSI_Code = tempRes.data.FSI_Code == null ? temp : tempRes.data.FSI_Code;
                    self.basicInfo.Ownership = tempRes.data.Ownership == null ? temp : tempRes.data.Ownership;
                    self.basicInfo.Employee_Range = tempRes.data.Employee_Range == null ? temp : tempRes.data.Employee_Range;
                    self.basicInfo.State_Code = tempRes.data.State_Code == null ? temp : tempRes.data.State_Code;
                    self.basicInfo.City_Code = tempRes.data.City_Code == null ? temp : tempRes.data.City_Code;
                    self.basicInfo.PostCode = tempRes.data.PostCode == null ? temp : tempRes.data.PostCode;
                    self.basicInfo.Business_Scope = tempRes.data.Business_Scope == null ? temp : tempRes.data.Business_Scope;
                    // 公司规模信息
                    self.companySize.Employee_Number = tempRes.data.Employee_Number == null ? temp : tempRes.data.Employee_Number;
                    self.companySize.Tracking_Year = tempRes.data.Tracking_Year == null ? temp : tempRes.data.Tracking_Year;
                    self.companySize.Site_Range = tempRes.data.Site_Range == null ? temp : tempRes.data.Site_Range;
                    self.companySize.Site_Number = tempRes.data.Site_Number == null ? temp : tempRes.data.Site_Number;
                    self.companySize.Bed_Number_Range = tempRes.data.Bed_Number_Range == null ? temp : tempRes.data.Bed_Number_Range;
                    self.companySize.Bed_Number = tempRes.data.Bed_Number == null ? temp : tempRes.data.Bed_Number;
                    self.companySize.Revenue_Range = tempRes.data.Revenue_Range == null ? temp : tempRes.data.Revenue_Range;
                    self.companySize.Revenue = tempRes.data.Revenue == null ? temp : tempRes.data.Revenue;
                    self.companySize.Phone_Range = tempRes.data.Phone_Range == null ? temp : tempRes.data.Phone_Range;
                    self.companySize.Phone_Number = tempRes.data.Phone_Number == null ? temp : tempRes.data.Phone_Number;
                    self.companySize.PC_Range = tempRes.data.PC_Range == null ? temp : tempRes.data.PC_Range;
                    self.companySize.PC_Number = tempRes.data.PC_Number == null ? temp : tempRes.data.PC_Number;
                    self.companySize.Server_Range = tempRes.data.Server_Range == null ? temp : tempRes.data.Server_Range;
                    self.companySize.Server_Number = tempRes.data.Server_Number == null ? temp : tempRes.data.Server_Number;
                    self.companySize.Storage_Range = tempRes.data.Storage_Range == null ? temp : tempRes.data.Storage_Range;
                    self.companySize.Storage_Number = tempRes.data.Storage_Number == null ? temp : tempRes.data.Storage_Number;
                    self.intro.latitude = tempRes.data.lat == null ? temp : tempRes.data.lat;
                    self.intro.longitude = tempRes.data.lng == null ? temp : tempRes.data.lng;
                    self.picUrl = tempRes.data.picture;
                    self.name = tempRes.data.leader_name;
                    self.jobTitle = tempRes.data.title;
                    self.isShow.loading = false;
                    // 新闻相关分页和数据
                    self.newsData = tempRes.result.data;
                    self.cur = tempRes.result.current_page;
                    self.all = tempRes.result.total
                    self.showLocation();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        showItem(index) {
            let vm = this;
            vm.isShow.tabIndex = index;
            vm.newsType = index;
            this.getTypeNewsData();

        },
        showCharts(index) {
            let vm = this;
            vm.isShow.showChart = index;
        },
        showLocation() {
            // 百度地图API功能
            let vm = this;
            var map = new BMap.Map("companyLocation");
            var point = new BMap.Point(vm.intro.longitude, vm.intro.latitude);

            var marker = new BMap.Marker(point); // 创建标注
            map.addOverlay(marker); // 将标注添加到地图中
            map.centerAndZoom(point, 15);
            map.disableScrollWheelZoom(); //开启鼠标滚轮缩放
            map.disableDragging();
            var opts = {
                width: 200, // 信息窗口宽度
                height: 100, // 信息窗口高度
                title: "公司地址", // 信息窗口标题
            }
            var tempMsg = ''
            if (!this.intro.longitude) {
                tempMsg = "暂无公司地址信息"

            } else {
                tempMsg = this.intro.Account_Name
            }
            var infoWindow = new BMap.InfoWindow(tempMsg, opts); // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point); //开启信息窗口
            marker.addEventListener("click", function () {
                map.openInfoWindow(infoWindow, point); //开启信息窗口
            });

        },
        // 分页数据
        btnClick: function (data) {
            //页码点击事件
            var vm = this;
            vm.isShow.loading = true;
            if (data != vm.cur) {
                vm.cur = data;
                vm.getDataPage(vm.cur, vm.newsType)
            }
        },
        pageClick: function () {
            var vm = this;
            vm.isShow.loading = true;
            vm.getDataPage(vm.cur, vm.newsType)
        },
        Go() {
            var vm = this;
            vm.isShow.loading = true;
            vm.cur = Number(vm.goPage);
            //总页数
            vm.allPage = vm.all % 5 == 0 ? vm.all / 5 : Math.ceil(vm.all / 5);
            if (vm.cur <= vm.allPage) {
                vm.getDataPage(vm.cur, vm.newsType)
                vm.isShow.loading = false;
            } else {
                alert("输入的页数超过总页数！");
            }
        },
        getTypeNewsData() {
            let companyId = getQueryVariable("Seq_No");
            let self = this;
            axios.get(globalUrl + "content/detail/Seq_No/", {
                    params: {
                        Seq_No: companyId,
                        types: this.newsType
                    }
                }).then(function (response) {
                    let tempRes = response.data.data
                    self.isShow.isShowDiv = true;
                    // 新闻相关分页和数据
                    self.newsData = tempRes.result.data;
                    self.cur = tempRes.result.current_page;
                    self.all = tempRes.result.total

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getDataPage(curpage) {
            let vm = this;
            var companyId = getQueryVariable("Seq_No");
            var par = curpage == undefined ? (page = "1") : (page = curpage);
            axios.get(globalUrl + "content/detail/Seq_No/", {
                params: {
                    Seq_No: companyId,
                    types: vm.newsType,
                    page: par
                }
            }).then(function (response) {
                let tempRes = response.data.data
                vm.isShow.loading = false;
                vm.newsData = tempRes.result.data;
            }).catch(function (error) {
                console.log(error);
            });
        },
        toggle(tempflag) {
            if (tempflag == "angleOne") {
                this.angleOne = !this.angleOne;
            } else if (tempflag == "angleTwo") {
                this.angleTwo = !this.angleTwo;
            } else if (tempflag == "angleThree") {
                this.angleThree = !this.angleThree;
            } else if (tempflag == "angleFour") {
                this.angleFour = !this.angleFour;
            }
        },
        goWebsite(website) {
            window.open("http://" + website, '_blank');
        },

    }
});
$(document).ready(function () {
    /*初始化*/






});