var newsCenter = new Vue({
    el:'#main',
    data:{
        loading: true,//默认不加载图标
        keyWord:'',
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
                vm.loading = false;
                vm.newsLeftData = leftC.data.data.data;
                vm.all = leftC.data.data.total;
                vm.newsLeftData.forEach(function (element, index, array) {// element: 指向当前元素的值 index: 指向当前索引 array: 指向Array对象本身
                    element.create_time = formatDate(element.create_time);    
                    element.source = "来源："+element.source; 
                });
                vm.newsRightData = rightC.data.data.data;
            }));
    },
    methods:{
        /*搜索*/
        Search:function(){
            var vm = this;
            vm.loading = true;
            vm.keyWord = $.trim(vm.keyWord);
            getLeft(vm.cur,vm.keyWord)
                .then(function (response) {
                    vm.loading = false;
                    vm.newsLeftData = response.data.data.data;
                    vm.newsLeftData.forEach(function (element, index, array) {// element: 指向当前元素的值 index: 指向当前索引 array: 指向Array对象本身
                        element.create_time = formatDate(element.create_time);
                        element.source = "来源："+element.source;
                    });
                    vm.all = response.data.data.total;
                });
        },
        /*分页*/
        btnClick: function(data){//页码点击事件
            var vm = this ;
            vm.loading = true;
            if(data != this.cur){
                this.cur = data;
                getLeft(this.cur,vm.keyWord)
                    .then(function (response) {
                        vm.loading = false;
                        vm.newsLeftData = response.data.data.data;
                        vm.newsLeftData.forEach(function (element, index, array) {// element: 指向当前元素的值 index: 指向当前索引 array: 指向Array对象本身
                            element.create_time = formatDate(element.create_time);
                            element.source = "来源："+element.source;   
                        });
                    })

            }
        },
        pageClick: function(){
            var vm =this;
            vm.loading = true;
            getLeft(this.cur,vm.keyWord)
                .then(function (response) {
                    vm.loading = false;
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
         
    }
})


function getLeft(curpage,key) {
    var par = curpage == undefined?page = '1':page = curpage;
    var l = axios({
        method: 'post',
        url: 'http://192.168.0.5/api/content/newlist',
        data: {
            limit:5,
            page: par,
            title:key
        }
    });
    return l;
}
function getRight() {
    return axios.get('http://192.168.0.5/api/content/popularlist');
}
