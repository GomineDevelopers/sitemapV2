
var app = new Vue({
    el: '#main',
    data: {
        /*selected:'',*///字母排序
        info:'',
        organizor:'',
        type:'',
        contentList: [],//搜索结果
        all: '', //总条数
        allPage: '',
        cur: 1,//当前页码
        goPage: 1
       
    },
    mounted: function () {
        var vm = this;
        vm.info = $.trim(decodeURI(getQueryVariable('info')));
        vm.organizor = $.trim(decodeURI(getQueryVariable('organizor')));
        vm.type = $.trim(decodeURI(getQueryVariable('type')));
        axios.post('http://192.168.0.5/api/content/ranking', {
            limit: 1,
            type:vm.type,
            info: vm.info,
            organizor: vm.organizor
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
            if (data != this.cur) {
                this.cur = data;
                getDataPage(this.cur,vm.type, vm.info, vm.organizor)
                    .then(function (response) {
                        vm.contentList = response.data.data.data;
                    })
            }
        },
        pageClick: function () {
            var vm = this;
            getDataPage(this.cur,vm.type, vm.info, vm.organizor)
                .then(function (response) {
                    vm.contentList = response.data.data.data;
                })
        },
        Go: function () {
            var vm = this;
            this.cur = Number(vm.goPage);
            //总页数
            vm.allPage = this.all % 1 == 0 ? this.all / 1 : Math.ceil(this.all / 1);
            if (this.cur <= vm.allPage) {
                getDataPage(this.cur,vm.type, vm.info, vm.organizor)
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
            vm.allPage = this.all % 1 == 0 ? this.all / 1 : Math.ceil(this.all / 1);
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
function getDataPage(curpage,type, info,organizor ) {
    var par = curpage == undefined ? page = '1' : page = curpage;
    var l = axios({
        method: 'post',
        url: 'http://192.168.0.5/api/content/ranking',
        data: {
            limit: 1,
            page: par,
            type:type,
            info: info,
            organizor: organizor
        }
    });
    return l;
}
