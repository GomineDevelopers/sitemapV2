var newsCenter = new Vue({
    el:'#main',
    data:{
        loading: false,
        newsLeftData:[],
        newsRightData:[],
        all: 20, //总页数
        cur: 1,//当前页码
    },
    mounted:function () {
        var vm = this;
        axios.all([getLeft(), getRight()])
            .then(axios.spread(function (leftC, rightC) {
                // 两个请求现在都执行完成
                vm.newsLeftData = leftC.data.data.list.data;
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
        toggleLoading(show) {
            show = true;
            this.loading = show
        },
        fakeAjax() {
            alert(0);
            this.toggleLoading(true);
            setTimeout(function () {
                this.toggleLoading(false)
            }, 1000);
        },
        ready() {
            this.fakeAjax()
        },
        btnClick: function(data){//页码点击事件
            if(data != this.cur){
                this.cur = data 
            }
        },
        pageClick: function(){
            console.log('现在在'+this.cur+'页');
        }
    },
    //分页
    computed: {
        indexs: function(){
          var left = 1;
          var right = this.all;
          var ar = [];
          if(this.all>= 5){
            if(this.cur > 3 && this.cur < this.all-2){
                    left = this.cur - 2
                    right = this.cur + 2
            }else{
                if(this.cur<=3){
                    left = 1
                    right = 5
                }else{
                    right = this.all
                    left = this.all -4
                }
            }
         }
        while (left <= right){
            ar.push(left)
            left ++
        }
        return ar
       }
         
    },
    watch: {
        cur: function(oldValue , newValue){
            console.log(arguments);
        }
    }
})


function getLeft() {
    return axios.get('http://192.168.0.191/home/content/newlists?category=27');
}

function getRight() {
    return axios.get('http://192.168.0.191/home/content/newlists?category=27');
}
