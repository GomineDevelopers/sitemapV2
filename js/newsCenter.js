var newsCenter = new Vue({
    el:'#main',
    data:{
        loading: false,
        newsLeftData:[],
        newsRightData:[]
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
        }
    }
})


function getLeft() {
    return axios.get('http://192.168.0.191/home/content/newlists?category=27');
}

function getRight() {
    return axios.get('http://192.168.0.191/home/content/newlists?category=27');
}