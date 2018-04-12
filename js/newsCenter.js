var newsCenter = new Vue({
    el:'#main',
    data:{
        newsLeftData:[],
        newsRightData:[]
    },
    mounted:function () {
        var vm = this;
        axios.all([getLeft(), getRight()])
            .then(axios.spread(function (leftC, rightC) {
                // 两个请求现在都执行完成
                console.info(rightC.data.data.list.data);
                vm.newsLeftData = leftC.data.data.list.data;
                vm.newsRightData = rightC.data.data.list.data;
            }));
    }
})

function getLeft() {
    return axios.get('http://192.168.0.191/home/content/newlists?category=27');
}

function getRight() {
    return axios.get('http://192.168.0.191/home/content/newlists?category=27');
}