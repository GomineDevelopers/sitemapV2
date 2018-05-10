
var app = new Vue({
    el: '#main',
    data: {
        selectedItems: [],//已选中的条件
        /*selected:'',*///字母排序
        contentList: [],//搜索结果
        key: '',//本页的关键字
        all: '', //总条数
        allPage: '',
        cur: 1,//当前页码
        goPage: 1
       
    },
    mounted: function () {
        /*searchSelect();*///选择图表就跳转页面
        var vm = this;
        vm.key = vm.key != "" ? $.trim(vm.key) : $.trim(decodeURI(getQueryVariable('key_pre')));
        axios.post('http://192.168.0.5/api/content/search', {
            limit: 10,
            accounname: vm.key,
            range: "",
            capital: "",
            time: "",
            address: ""
        })
            .then(function (response) {
                vm.contentList = response.data.data.data;
                vm.all = response.data.data.total;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods: {

        /*分页*/
        btnClick: function (data) {//页码点击事件
            var vm = this;
            vm.key = vm.key != "" ? $.trim(vm.key) : $.trim(decodeURI(getQueryVariable('key_pre')));
            if (data != this.cur) {
                this.cur = data;
                getDataPage(this.cur, vm.key, vm.selectedItems)
                    .then(function (response) {
                        vm.contentList = response.data.data.data;
                    })
            }
        },
        pageClick: function () {
            var vm = this;
            vm.key = vm.key != "" ? $.trim(vm.key) : $.trim(decodeURI(getQueryVariable('key_pre')));
            getDataPage(this.cur, vm.key, vm.selectedItems)
                .then(function (response) {
                    vm.contentList = response.data.data.data;
                })
        },
        Go: function () {
            var vm = this;
            this.cur = Number(vm.goPage);
            vm.key = vm.key != "" ? $.trim(vm.key) : $.trim(decodeURI(getQueryVariable('key_pre')));
            //总页数
            vm.allPage = this.all % 10 == 0 ? this.all / 10 : Math.ceil(this.all / 10);
            if (this.cur <= vm.allPage) {
                getDataPage(this.cur, vm.key, vm.selectedItems)
                    .then(function (response) {
                        vm.contentList = response.data.data.data;
                    })
            } else {
                alert("输入的页数超过总页数！");
            }


        },
        goDetail: function (id) {
            window.open("searchDetail.html?Seq_No=" + id, '_blank');
        },
        // 清除所有选项
        // clearAll:function(){
        //     vm=this;
        //     vm.selectedItems=[];
        //     vm.isShow.isShow_dlRan = true;
        //     vm.isShow.isShow_dlRegC = true;
        //     vm.isShow.isShow_dlSta = true;
        //     vm.isShow.isShow_dlTurn = true;
        //     vm.isShow.isShow_dlInd = true;
        //     vm.isShow.isShow_dlTime = true;
        //     vm.isShow.isShow_dlReg = true;
        // }
    },

    computed: {
        //分页
        indexs: function () {
            var left = 1;
            var vm = this;
            /*总页数*/
            vm.allPage = this.all % 10 == 0 ? this.all / 10 : Math.ceil(this.all / 10);
            var right = vm.allPage;
            var ar = [];
            if (vm.allPage >= 5) {
                if (this.cur > 3 && this.cur < vm.allPage - 2) {
                    left = this.cur - 2
                    right = this.cur + 2
                } else {
                    if (this.cur <= 3) {
                        left = 1
                        right = 5
                    } else {
                        right = vm.allPage
                        left = vm.allPage - 4
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar
        }
    }
})


/*function searchSelect() {
    $('#search_select').on('change', function() {
        var searchSel = $(this).find('option').eq(this.selectedIndex).val();
        if(searchSel == 'img'){
            window.location.href = 'dashboard.html';
        }
    });
}*/
function getDataPage(curpage, key, selectedData) {
    var range = "";
    var capital = "";
    var time = "";
    var address = "";
    selectedData.forEach(function (element, index, array) {
        switch (element.tag) {
            case 'Ran':
                range = element.selectedName;
                break;
            case 'RegC':
                capital = element.selectedName;
                break;
            /*case 'Sta':
                var range = element.selectedName;
                break;
            case 'Turn':
                var range = element.selectedName;
                break;
            case 'Ind':
                var range = element.selectedName;
                break;*/
            case 'Time':
                time = element.selectedName;
                break;
            case 'Reg':
                address = element.selectedName;
                break;
        }
    });
    var par = curpage == undefined ? page = '1' : page = curpage;
    var l = axios({
        method: 'post',
        url: 'http://192.168.0.5/api/content/search',
        data: {
            accounname: key,
            limit: 10,
            page: par,
            range: range,
            capital: capital,
            time: time,
            address: address
        }
    });
    return l;
}
