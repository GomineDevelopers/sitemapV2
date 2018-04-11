
var newsDetail = new Vue({
    el: '#main',
    data: {
        title: '',
        source: '',
        create_time: '',
        content: ''
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
        var self = this;
        axios.post('http://192.168.0.191/home/content/newdetail/id/', {
            id: '1'
        })
            .then(function (response) {
                self.title = response.data.data.data.title;
                self.source = response.data.data.data.source;
                self.create_time = response.data.data.data.create_time;
                self.content = response.data.data.data.content;
            })
            .catch(function (error) {
                console.log(error);

            });
    }
})