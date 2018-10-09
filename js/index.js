var app = new Vue({
    el: "#main",
    data: {
        key_pre: "",
        newspop: []
    },
    mounted: function() {
        var vm = this;
        axios
            .get(globalUrl + "content/popularlist", {
                params: {}
            })
            .then(function(response) {
                vm.newspop = response.data.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
        vm.loginCheck();
    },
    methods: {
        search: function() {
            var vm = this;
            var key_pre = vm.key_pre;
            window.location.href = "./html/searchList.html?key_pre=" + key_pre;
        },
        enteringDetail: function(id) {
            window.location.href = "./html/newsDetail.html?newsid=" + id;
        },
        //检测是否登陆，未登录跳转登陆页面
         loginCheck(){
            let token=getLocalStorage("token")||null
            console.log(token)
            var flag=0;
            if (token==''||token==null){
                if(flag<1){
                    window.location.href = "login.html";
                    this.flag++;
                }

            }
        }
    }
});
