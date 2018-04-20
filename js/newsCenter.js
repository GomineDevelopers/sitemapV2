var newsCenter = new Vue({
    el:'#main',
    data:{
        loading: false,
        keyWord:'请输入关键字',
        newsLeftData:[],
        newsRightData:[],
        all: '',
        allPage:'',//总页数
        cur: 1//当前页码
    },
    mounted:function () {
        var vm = this;
        axios.all([getLeft(), getRight()])
            .then(axios.spread(function (leftC, rightC) {// 两个请求现在都执行完成
                vm.newsLeftData = leftC.data.data.data;
                vm.all = leftC.data.data.total;
                vm.newsLeftData.forEach(function (element, index, array) {// element: 指向当前元素的值 index: 指向当前索引 array: 指向Array对象本身
                    element.create_time = formatDate(element.create_time);    
                });
                vm.newsRightData = rightC.data.data.data;
            }));
    },
    methods:{
        /*加载图标start*/
        // toggleLoading(show) {
        //     show = true;
        //     this.loading = show
        // },
        // fakeAjax() {
        //     this.toggleLoading(true);
        //     setTimeout(function () {
        //         this.toggleLoading(false)
        //     }, 1000);
        // },
        // ready() {
        //     this.fakeAjax()
        // },
        /*搜索*/
        Search:function(){
            /*写入方法*/
        },
        /*分页*/
        btnClick: function(data){//页码点击事件
            var vm = this ;
            if(data != this.cur){
                this.cur = data;
                getLeft(this.cur)
                    .then(function (response) {
                        vm.newsLeftData = response.data.data.data;
                        vm.newsLeftData.forEach(function (element, index, array) {// element: 指向当前元素的值 index: 指向当前索引 array: 指向Array对象本身
                            element.create_time = formatDate(element.create_time);    
                        });
                    })

            }
        },
        pageClick: function(){
            var vm =this;
            getLeft(this.cur)
                .then(function (response) {
                    vm.newsLeftData = response.data.data.data;
                    vm.newsLeftData.forEach(function (element, index, array) {// element: 指向当前元素的值 index: 指向当前索引 array: 指向Array对象本身
                        element.create_time = formatDate(element.create_time);    
                    });
                })
        },
        enteringDetail:function(id){
            window.location.href ="newsDetail.html?newsid="+id;
        }
    },
    //分页
    computed: {
        indexs: function() {
            var left = 1;
            var vm = this;
            /*总页数*/
            vm.allPage = this.all % 5 == 0 ? this.all / 5: Math.ceil(this.all / 5);
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
         
    },
    watch: {
        cur: function(oldValue , newValue){
            /*console.log(arguments);*/
        }
    }
})


function getLeft(curpage) {
    var par = curpage == undefined?page = '1':page = curpage;
    var l = axios({
        method: 'get',
        url: 'http://192.168.0.5/api/content/newlist',
        params: {
          
            limit:5,
            page: par
        }
    });
    return l;
}

function getRight() {
    return axios.get('http://192.168.0.5/api/content/popularlist');
}
