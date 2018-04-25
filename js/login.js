
var app =new Vue({
    el:'#app',
    data:{
        userName:'',
        password:'',
        checkedLogin:''
    },
    /*页面加载的时候获取*/
    mounted: function (){
        this.getCookie();
    },
    methods:{
        login:function () {
            var userName = this.userName;
            var password = this.password;
            var vm = this;
            axios.post('http://192.168.0.5/api/login/login', {
                    email: userName,
                    password: password
            })
                .then(function (response) {
                    if(response.data.status == '1'){
                        //判断复选框是否被勾选 勾选则调用配置cookie方法
                        if(vm.checkedLogin == true){
                            vm.setCookie(userName,password,7);
                        }
                        setLocalStorage('token', response.data.data.token);
                        setLocalStorage('userName', response.data.data.email);
                        window.location.href = './index.html';

                    }else if(response.data.status == '0'){
                        alert(response.data.message);
                    }

                })
                .catch(function (error) {
                    console.info(error);
                });
        },
        //设置cookie
        setCookie:function(c_name,c_pwd,exdays) {
            var exdate=new Date();//获取时间
            exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
            window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
            window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
        },
        //读取cookie
        getCookie:function () {
            if (document.cookie.length>0) {
                this.checkedLogin = true;
                var arr=document.cookie.split('; ');
                for(var i=0;i<arr.length;i++){
                    var arr2=arr[i].split('=');
                    if(arr2[0]=='userName'){
                        this.userName=arr2[1];
                    }else if(arr2[0]=='userPwd'){
                        this.password=arr2[1];
                    }
                }
            }
        },
        //清除cookie
        clearCookie:function () {
            this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
            window.location.reload();//刷新当前页面.
        }

    }
})

