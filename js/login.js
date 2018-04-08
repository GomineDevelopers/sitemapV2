
var app =new Vue({
    el:'#app',
    data:{
        userName:'',
        password:''
    },
    methods:{
        login:function () {
            var vm = this;
            var userName =  vm.$refs.userName.value;
            var password =  vm.$refs.password.value;
            console.log(userName);
            console.log(password);
            axios.post('#', {
                username: 'userName',
                password: 'password'
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})
