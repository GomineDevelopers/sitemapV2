
var newsDetail = new Vue({
    el: '#main',
    data: {
        title: '',
        source: '',
        create_time: '',
        content: '',
        newsId:'',
    },
    computed: {
        sourceSort: function () {
            return '来源：' + this.source;
        },
        dateSort: function () {
            if (this.create_time)
                return '发布时间：' + this.create_time;
        }
    },
    mounted: function () {
         // id传递
         function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        var Request = new Object();
        Request = GetRequest();
        var newsId = Request['newsid'];
        
// id传递
        var self = this;
        axios.post('http://192.168.0.5/api/content/newdetail/id/', {
            id: newsId
        })
            .then(function (response) {
                console.log(response)
                self.title = response.data.data.title;
                self.source = response.data.data.source;
                self.create_time = response.data.data.addate;
                self.content = response.data.data.content;
            })
            .catch(function (error) {
                console.log(error);

            });
       
    }
})
