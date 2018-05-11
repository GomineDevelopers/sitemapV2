var rang = [
    {text:'企业名称',value:'企业名称'},{text:'股东',value:'股东'}, {text:'法人代表',value:'法人代表'},{text:'高管',value:'高管'},
    {text:'上市公司',value:'上市公司'},{text:'社会组织',value:'社会组织'},{text:'联系方式',value:'联系方式'},{text:'经济范围',value:'经济范围'},
    {text:'网址',value:'网址'},{text:'产品',value:'产品'},{text:'商标',value:'商标'}
];
var  registeredCapitals=[
    {text:'0-100万',value:'0-100万'},
    {text:'100万-200万',value:'100万-200万'},
    {text:'200万-500万',value:'200万-500万'},
    {text:'500万-1000万',value:'500万-1000万'},
    {text:'1000万以上',value:'1000万以上'}

];
var staffs=[
    {text:'0-500人',value:'0-500人'},
    {text:'1000-5000人',value:'1000-5000人'},
    {text:'5000-10000人',value:'5000-10000人'},
    {text:'10000人以上',value:'10000人以上'}


];
var turnovers=[
    {text:'0-100万',value:'0-100万'},
    {text:'100-200万',value:'100-200万'},
    {text:'200万-500万',value:'200万-500万'},
    {text:'500万-1000万',value:'500万-1000万'},
    {text:'1000万以上',value:'1000万以上'}
];
var industry = [
    {text:'农副食品加工业'},{text:'食品制造业'},{text:'酒，饮料和精制茶制造业'},{text:'烟草制品业'},{text:'纺织业'},
    {text:'皮革，毛皮，羽毛及其制品和制鞋业'},{text:'木材加工和木，竹，藤，棕，草制品业'},{text:'家具制造业'},{text:'造纸和纸制品业'},{text:'印刷和记录媒介复制业'},
    {text:'文教，工美，体育和娱乐用品制造业'},{text:'石油，煤炭，及其他燃料加工业'},{text:'化学原料和化学制品制造业'},{text:'医药制造业'},{text:'化学纤维制造业'},
    {text:'橡胶和塑料制品业'},{text:'非金属矿物制品业'},{text:'黑色金属冶炼和压延加工业'},{text:'有色金属冶炼和压延加工业'},{text:'金属制品业'},
    {text:'通用设备制造业'},{text:'专用设备制造业'},{text:'汽车制造业'},{text:'电气机械和器材制造业'},{text:'铁路，船舶，航空航天和其他运输设备制造业'},
    {text:'废弃资源综合利用业'},{text:'计算机，通信，和其他电子设备制造业'},{text:'仪器仪表制造业'},{text:'其他制造业'},{text:'金属制品，机械和设备修理业'}
];
var foundedTimes=[
    {text:'1-5年'},
    {text:'5-10年'},
    {text:'10-15年'},
    {text:'15年以上'}

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
        isShow:{
            isShow_ind:false,
            isShow_reg:false,

            isShow_dlRan:true,
            isShow_dlRegC:true,
            isShow_dlSta:true,
            isShow_dlTurn:true,
            isShow_dlInd:true,
            isShow_dlTime:true,
            isShow_dlReg:true
        },
        selectedItems:[],//已选中的条件
        rang:rang,
        registeredCapitals:registeredCapitals,
        staffs:staffs,
        turnovers:turnovers,
        industry:industry,
        foundedTimes:foundedTimes,
        area:area,
        /*detailUrl:'',*/
        /*selected:'',*///字母排序
        contentList:[],//搜索结果
        key:'',//本页的关键字
        all:'', //总条数
        allPage:'',
        cur: 1,//当前页码
        goPage:1
    },
    mounted:function(){
        /*searchSelect();*///选择图表就跳转页面
        var vm = this;
        vm.key = vm.key != "" ? $.trim(vm.key) : $.trim(decodeURI(getQueryVariable('key_pre')));
        axios.post('http://192.168.0.5/api/content/search', {
            limit:10,
            accounname:vm.key,
            range:"",
            capital:"",
            time:"",
            address:""
        })
            .then(function (response) {
                vm.contentList = response.data.data.data;
                vm.all = response.data.data.total;
            })
            .catch(function (error) {
                alert(error);
            });
    },
    methods:{
        Search:function () {
            var vm = this;
            vm.cur = 1;//页码从1开始
            vm.key = vm.key != "" ? $.trim(vm.key) : $.trim(decodeURI(getQueryVariable('key_pre')));
            /*var selected = vm.selected;*/
            axios.post('http://192.168.0.5/api/content/search', {
                limit:10,
                accounname:vm.key,
                range:"",
                capital:"",
                time:"",
                address:""
            })
                .then(function (response) {
                    vm.contentList = response.data.data.data;
                    vm.all = response.data.data.total;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        /*分页*/
        btnClick: function(data){//页码点击事件
            var vm = this ;
            vm.key = vm.key != "" ? $.trim(vm.key) : $.trim(decodeURI(getQueryVariable('key_pre')));
            if(data != this.cur){
                this.cur = data;
                getDataPage(this.cur,vm.key,vm.selectedItems)
                    .then(function (response) {
                        vm.contentList = response.data.data.data;
                    })
            }
        },
        pageClick: function(){
            var vm =this;
            vm.key = vm.key != "" ? $.trim(vm.key) : $.trim(decodeURI(getQueryVariable('key_pre')));
            getDataPage(this.cur,vm.key,vm.selectedItems)
                .then(function (response) {
                    vm.contentList = response.data.data.data;
                })
        },
        Go:function(){
            var vm = this;
            this.cur = Number(vm.goPage);
            vm.key = vm.key != "" ? $.trim(vm.key) : $.trim(decodeURI(getQueryVariable('key_pre')));
            //总页数
            vm.allPage = this.all % 10 == 0 ? this.all / 10: Math.ceil(this.all / 10);
            if(this.cur <= vm.allPage){
                getDataPage(this.cur,vm.key,vm.selectedItems)
                    .then(function (response) {
                        vm.contentList = response.data.data.data;
                    })
            }else{
                alert("输入的页数超过总页数！");
            }


        },
        /*点击更多显示与隐藏*/
        More:function (temp,e) {
            var vm = this;
            if(temp == 'reg'){
                if(vm.isShow.isShow_reg == false){
                    vm.isShow.isShow_reg = true;
                }else if(vm.isShow.isShow_reg == true){
                    vm.isShow.isShow_reg = false;
                }
            }else if(temp == 'ind'){
                if(vm.isShow.isShow_ind == false){
                    vm.isShow.isShow_ind = true;
                }else if(vm.isShow.isShow_ind == true){
                    vm.isShow.isShow_ind = false;
                }
            }
        },
        getSelected:function (tmp,e) {
            var vm = this;
            vm.cur = 1;//页码从1开始
            vm.key = vm.key != "" ? $.trim(vm.key) : $.trim(decodeURI(getQueryVariable('key_pre')));
            vm.selectedItems.push({'selectedName':e.target.innerText,'tag':tmp});//选中的数组
            /*控制选中隐藏*/
            switch (tmp){
                case 'Ran':
                    vm.isShow.isShow_dlRan = false;
                    break;
                case 'RegC':
                    vm.isShow.isShow_dlRegC = false;
                    break;
                case 'Sta':
                    vm.isShow.isShow_dlSta = false;
                    break;
                case 'Turn':
                    vm.isShow.isShow_dlTurn = false;
                    break;
                case 'Ind':
                    vm.isShow.isShow_dlInd = false;
                    break;
                case 'Time':
                    vm.isShow.isShow_dlTime = false;
                    break;
                case 'Reg':
                    vm.isShow.isShow_dlReg = false;
                    break;
            }
            getDataPage(this.cur,vm.key,vm.selectedItems)
                .then(function (response) {
                    vm.contentList = response.data.data.data;
                    vm.all = response.data.data.total;

                })
        },
        delSelected:function (tmp,e) {
            var vm = this;
            vm.cur = 1;//页码从1开始
            vm.selectedItems.forEach(function (element,index,array) {
                if( element.selectedName == e.target.innerText){
                    array.splice(index,1);
                }
            });
            switch (tmp){
                case 'Ran':
                    vm.isShow.isShow_dlRan = true;
                    break;
                case 'RegC':
                    vm.isShow.isShow_dlRegC = true;
                    break;
                case 'Sta':
                    vm.isShow.isShow_dlSta = true;
                    break;
                case 'Turn':
                    vm.isShow.isShow_dlTurn = true;
                    break;
                case 'Ind':
                    vm.isShow.isShow_dlInd = true;
                    break;
                case 'Time':
                    vm.isShow.isShow_dlTime = true;
                    break;
                case 'Reg':
                    vm.isShow.isShow_dlReg = true;
                    break;
            }
            getDataPage(1,vm.key,vm.selectedItems)
                .then(function (response) {
                    vm.contentList = response.data.data.data;
                    vm.all = response.data.data.total;
                })
        },
        goDetail:function(id){
            window.open ("searchDetail.html?Seq_No="+id,'_blank');
        },
        // 清除所有选项
        // clearAll:function(){
        //     vm=this;
        //     vm.selectedItems=[];
        //     vm.isShow.isShow_dlRan = true;
        //     vm.isShow.isShow_dlRegC = true;
        //     vm.isShow.isShow_dlSta = true;
        //     vm.isShow.isShow_dlTurn = true;
        //     vm.isShow.isShow_dlInd = true;
        //     vm.isShow.isShow_dlTime = true;
        //     vm.isShow.isShow_dlReg = true;
        // }
    },

    computed: {
        //分页
        indexs: function() {
            var left = 1;
            var vm = this;
            /*总页数*/
            vm.allPage = this.all % 10 == 0 ? this.all / 10: Math.ceil(this.all / 10);
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
        }
    }
})


/*function searchSelect() {
    $('#search_select').on('change', function() {
        var searchSel = $(this).find('option').eq(this.selectedIndex).val();
        if(searchSel == 'img'){
            window.location.href = 'dashboard.html';
        }
    });
}*/
function getDataPage(curpage,key,selectedData) {
    var range = "";
    var capital = "";
    var time = "";
    var address = "";
    selectedData.forEach(function (element, index, array){
        switch(element.tag){
            case 'Ran':
                 range = element.selectedName;
                break;
            case 'RegC':
                capital = element.selectedName;
                break;
            /*case 'Sta':
                var range = element.selectedName;
                break;
            case 'Turn':
                var range = element.selectedName;
                break;
            case 'Ind':
                var range = element.selectedName;
                break;*/
            case 'Time':
                time = element.selectedName;
                break;
            case 'Reg':
                address = element.selectedName;
                break;
        }
    });
    var par = curpage == undefined?page = '1':page = curpage;
    var l = axios({
        method: 'post',
        url: 'http://192.168.0.5/api/content/search',
        data: {
            accounname:key,
            limit: 10,
            page: par,
            range:range,
            capital:capital,
            time:time,
            address:address
        }
    });
    return l;
}
