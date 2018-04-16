
var app =new Vue({
    el:'#app',
    data:{
        userName:'',
        password:''
    },
    /*页面加载的时候获取*/
    mounted(){
        this.getCookie()
    },
    methods:{
        login:function () {
            var userName = this.userName;
            var password = this.password;
            axios.post('http://192.168.0.191/api/apptoken/get', {
                ac: 'userName',
                se: 'password'
            })
                .then(function (response) {
                    if(response.data.code == '400'){
                        window.location.href = 'index.html'
                    }else{
                        alert(response.data.msg);
                    }

                })
                .catch(function (error) {
                    alert("请求错误！");
                });
            //判断复选框是否被勾选 勾选则调用配置cookie方法
            if(this.checked=true){
                //传入账号名，密码，和保存天数3个参数
                this.setCookie(userName,password,7);
            }
        },
        //设置cookie
        setCookie(c_name,c_pwd,exdays) {
            var exdate=new Date();//获取时间
            exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
            //字符串拼接cookie
            window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
            window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
        },
        //读取cookie
        getCookie:function () {
            console.info(document.cookie);
            if (document.cookie.length>0) {
                var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
                for(var i=0;i<arr.length;i++){
                    var arr2=arr[i].split('=');//再次切割
                    //判断查找相对应的值
                    if(arr2[0]=='userName'){
                        this.userName=arr2[1];//保存到保存数据的地方
                    }else if(arr2[0]=='userPwd'){
                        this.password=arr2[1];
                    }
                }
            }
        }
        //清除cookie
        /*clearCookie:function () {
            this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
        }*/

    }
})

