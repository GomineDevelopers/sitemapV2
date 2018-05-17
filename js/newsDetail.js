
var newsDetail = new Vue({
    el: '#main',
    data: {
        title: '',
        source: '',
        create_time: '',
        content: '',
        newsId:''
    },
    computed: {
        sourceSort: function () {
            return '来源：' + this.source;
        },
        dateSort: function () {
            if (this.create_time)
                return '发布时间：' + formatDate(this.create_time);
        }
    },
    mounted: function () {
        var newsId = getQueryVariable('newsid');
        var self = this;
        axios.post('http://192.168.0.5/api/content/newdetail/id/', {
            id: newsId
        })
            .then(function (response) {
                self.title = response.data.data.title;
                self.source = response.data.data.source;
                self.create_time = response.data.data.create_time;
                self.content = response.data.data.content;
            })
            .catch(function (error) {
                console.log(error);
            });
       
    }
})
