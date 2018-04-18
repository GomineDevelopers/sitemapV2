var app = new Vue({
    el:'#main',
    data:{
        key_pre:''
    },
    methods:{
        search:function () {
            var vm = this;
            var key_pre = vm.key_pre;
            window.location.href = './html/searchList.html?key_pre='+key_pre;
        }
    }
})