var rang = [
    {text:'企业名称',value:'企业名称'},{text:'股东',value:'股东'}, {text:'法人代表',value:'法人代表'},{text:'高管',value:'高管'},
    {text:'上市公司',value:'上市公司'},{text:'社会组织',value:'社会组织'},{text:'联系方式',value:'联系方式'},{text:'经济范围',value:'经济范围'},
    {text:'网址',value:'网址'},{text:'产品',value:'产品'},{text:'商标',value:'商标'}
];
var industry = [
    {text:'农副食品加工业'},{text:'食品制造业'},{text:'酒，饮料和精制茶制造业'},{text:'烟草制品业'},{text:'纺织业'},
    {text:'皮革，毛皮，羽毛及其制品和制鞋业'},{text:'木材加工和木，竹，藤，棕，草制品业'},{text:'家具制造业'},{text:'造纸和纸制品业'},{text:'印刷和记录媒介复制业'},
    {text:'文教，工美，体育和娱乐用品制造业'},{text:'石油，煤炭，及其他燃料加工业'},{text:'化学原料和化学制品制造业'},{text:'医药制造业'},{text:'化学纤维制造业'},
    {text:'橡胶和塑料制品业'},{text:'非金属矿物制品业'},{text:'黑色金属冶炼和压延加工业'},{text:'有色金属冶炼和压延加工业'},{text:'金属制品业'},
    {text:'通用设备制造业'},{text:'专用设备制造业'},{text:'汽车制造业'},{text:'电气机械和器材制造业'},{text:'铁路，船舶，航空航天和其他运输设备制造业'},
    {text:'废弃资源综合利用业'},{text:'计算机，通信，和其他电子设备制造业'},{text:'仪器仪表制造业'},{text:'其他制造业'},{text:'金属制品，机械和设备修理业'}
];
var area = [
    {text:'北京'},{text:'天津'},{text:'上海'},{text:'重庆'},{text:'河北'},{text:'山西'},{text:'辽宁'},{text:'吉林'},{text:'黑龙江'},{text:'江苏'},
    {text:'浙江'},{text:'安徽'},{text:'福建'},{text:'江西'},{text:'山东'},{text:'河南'},{text:'湖北'},{text:'湖南'},{text:'广东'},{text:'海南'},
    {text:'四川'},{text:'山东'},{text:'贵州'},{text:'山西'},{text:'云南'},{text:'西藏'},{text:'陕西'},{text:'甘肃'},{text:'青海'},{text:'内蒙古'},
    {text:'广西'},{text:'西藏'},{text:'宁夏'},{text:'新疆'},{text:'香港'},{text:'澳门'},{text:'台湾'}
]
var app = new Vue({
    el:'#main',
    data:{
        rang:rang,
        industry:industry,
        area:area,
        detailUrl:'searchDetail.html',
        selected:'',
        contentList:[],
        key:'',
        all:'', //总条数
        allPage:'',
        cur: 1//当前页码
    },
    mounted:function(){
        var vm = this;
        axios.get('http://192.168.0.191/home/content/certiflist', {
            params: {}
        })
            .then(function (response) {
                vm.contentList = response.data.data.list.data;
                vm.all = response.data.data.list.total;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods:{
        Search:function () {
            var vm = this;
            var key = vm.key;
            var selected = vm.selected;
            console.info(selected);
            axios.get('http://192.168.0.191/home/content/certiflist', {
                key: key,
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        /*分页*/
        btnClick: function(data){//页码点击事件
            var vm = this ;
            if(data != this.cur){
                this.cur = data;


            }
        },
        pageClick: function(){
            var vm =this;
            /*getLeft(this.cur)
                .then(function (response) {
                    vm.newsLeftData = response.data.data.list.data;
                })*/
        }
    },

    computed: {
        //分页
        indexs: function() {
            var left = 1;
            var vm = this;
            /*总页数*/
            vm.allPage = this.all % 5 == 0 ? this.all / 5: Math.ceil(this.all / 5);
            var right = vm.allPage;
            var ar = [];
            if (vm.allPage >= 5) {
                if (this.cur > 3 && this.cur < vm.allPage - 2) {
                    left = this.cur - 2
                    right = this.cur + 2
                } else {
                    if (this.cur <= 3) {
                        left = 1
                        right = 5
                    } else {
                        right = vm.allPage
                        left = vm.allPage - 4
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar
        },
        /*首字母拼音排序*/
        sortData:function () {
            var vm = this;
            console.info(vm.contentList);
            return vm.contentList;
        }

    }
})

$(function () {
    // 列表展开隐藏orz..orz QaQ
    $(".show-more").click(function () {
        if ($(this).siblings(".content-body").hasClass("show-content-body")) {
            $(this).siblings(".content-body").removeClass("show-content-body");
            $(this).children().removeClass("am-icon-angle-down");
            $(this).children().addClass("am-icon-angle-up");
        } else {
            $(this).children().removeClass("am-icon-angle-up");
            $(this).children().addClass("am-icon-angle-down");
            $(this).siblings(".content-body").addClass("show-content-body");
        }
    });
    // 已选条件展示orz
    each_click_items = $('.sx_child');

    each_click_items.each(function (i) {

        $(this).click(function () {
            var selected_items_value = $(this).text();
            var formatted_strings = "<span>" + selected_items_value + "<i></i></span>";
            $(".selected-box").append(formatted_strings).children().addClass("selected-items");
            $(".selected-box").children().children(':last-child').addClass("am-icon-close");
            $(this).parent().parent(".am-cf").css("display", "none");
            $(".clear-all").css("display", "block");
            var target_css = $(this);
            var target_row = target_css.parent().parent(".am-cf")
            console.log(target_css.html());
            click_items = $('.selected-items');
            click_items.each(function (i) {
                $(this).click(function () {
                    var inbox_item = $(this);
                    var selected_item_text = inbox_item.text();
                    console.log(selected_item_text);
                    if (target_css.text() == selected_item_text) {
                        target_row.css("display", "block");

                    }
                    inbox_item.remove();

                    if ($(".selected-items").length == 0) {
                        console.log($(".selected-items").length);
                        $(".clear-all").css("display", "none");
                    }

                });

            });
            $(".clear-all").click(function () {
                $(".selected-box span.selected-items").remove();
                target_row.css("display", "block");
                $(this).css("display", "none");
            });

        });


    });
    // 
    //   反选内容
    // reverse_click_items = $('.selected-items');
    // reverse_click_items.each(function (i) {

    //     $(this).click(function () {
    //         console.log(reverse_click_items);
    //         $(this).remove();


    //     });
    // });
    $('#search_select').on('change', function() {
        var searchSel = $(this).find('option').eq(this.selectedIndex).val();
        if(searchSel == 'img'){
            window.location.href = 'dashboard.html';
        }
    });

})
