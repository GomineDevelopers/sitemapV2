var newsCenter = new Vue({
    el:'#main',
    data:{
        loading: false,
        newsLeftData:[],
        newsRightData:[],
        all: '', //总页数
        right:'',
        cur: 1,//当前页码
    },
    mounted:function () {
        var vm = this;
        axios.all([getLeft(), getRight()])
            .then(axios.spread(function (leftC, rightC) {
                // 两个请求现在都执行完成
                vm.newsLeftData = leftC.data.data.list.data;
                vm.all = leftC.data.data.list.total;
                vm.newsLeftData.forEach(function (element, index, array) {
                    // element: 指向当前元素的值
                    // index: 指向当前索引
                    // array: 指向Array对象本身
                    element.create_time = formatDate(element.create_time);
                });
                vm.newsRightData = rightC.data.data.list.data;
            }));
    },
    methods:{
        /*加载图标start*/
        toggleLoading(show) {
            show = true;
            this.loading = show
        },
        fakeAjax() {
            this.toggleLoading(true);
            setTimeout(function () {
                this.toggleLoading(false)
            }, 1000);
        },
        ready() {
            this.fakeAjax()
        },
        /*分页*/
        btnClick: function(data){//页码点击事件
            var vm = this ;
            if(data != this.cur){
                this.cur = data;
                getLeft(this.cur)
                    .then(function (response) {
                        vm.newsLeftData = response.data.data.list.data;
                    })

            }
        },
        pageClick: function(){
            var vm =this;
            getLeft(this.cur)
                .then(function (response) {
                    vm.newsLeftData = response.data.data.list.data;
                })
        }
    },
    //分页
    computed: {
        indexs: function(){
            var left = 1;
              /*var right = this.all;*/
            var vm = this;
            vm.right = this.all%5==0?this.all/5:Math.ceil(this.all/5);
            var ar = [];
            while (left <= vm.right){
                ar.push(left);
                left ++
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
        url: 'http://192.168.0.191/home/content/newlists',
        params: {
            category : 2,
            limit: 5,
            page: par
        }
    });
    return l;

}

function getRight() {
    return axios.get('http://192.168.0.191/home/content/newlists?category=27');
}
