var app = new Vue({
    el:'#main',
    data:{
        key_pre:'请输入企业名称',
        newspop:[]
    },
    mounted:function(){
        var vm = this;
        axios.get('http://192.168.0.5/api/content/popularlist', {
            params: {}
        })
            .then(function (response) {
                vm.newspop = response.data.data.data;

            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods:{
        search:function () {
            var vm = this;
            var key_pre = vm.key_pre;
            window.location.href = './html/searchList.html?key_pre='+key_pre;
        },
        enteringDetail:function (id) {
            window.location.href ="./html/newsDetail.html?newsid="+id;
        }
    }

})