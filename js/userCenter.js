var departments = [{
    text: "IT 应用开发",
    value: "IT 应用开发"
  },
  {
    text: "IT 数据中心",
    value: "IT 数据中心"
  },
  {
    text: "IT 安全",
    value: "IT 安全"
  },
  {
    text: "IT 存储",
    value: "IT 存储"
  },
  {
    text: "IT 电信",
    value: "IT 电信"
  },
  {
    text: "IT 运营",
    value: "IT 运营"
  },
  {
    text: "IT 服务",
    value: "IT 服务"
  },
  {
    text: "IT 体系结构",
    value: "IT 体系结构"
  },
  {
    text: "财务/会计",
    value: "财务/会计"
  },
  {
    text: "人力资源",
    value: "人力资源"
  },
  {
    text: "物流",
    value: "物流"
  },
  {
    text: "市场营销",
    value: "市场营销"
  },
  {
    text: "网络管理",
    value: "网络管理"
  },
  {
    text: "采购",
    value: "采购"
  },
  {
    text: "研究/开发",
    value: "研究/开发"
  },
  {
    text: "销售",
    value: "销售"
  },
  {
    text: "技术支持",
    value: "技术支持"
  },
  {
    text: "客服服务",
    value: "客服服务"
  },
  {
    text: "顾问咨询",
    value: "顾问咨询"
  },
  {
    text: "工程",
    value: "工程"
  },
  {
    text: "培训/教育",
    value: "培训/教育"
  },
  {
    text: "法律",
    value: "法律"
  },
  {
    text: "行政管理",
    value: "行政管理"
  },
  {
    text: "其他",
    value: "其他"
  }
];
var userCenter = new Vue({
  el: '#userCenter',
  data: {
    tabItems: ["我的账户", "我的下载", "我的浏览", "账户设置"],
    tabContents: ["内容一", "内容二", "内容三", "内容四"],
    contentTabs: ["充值记录", "消费记录", "账户余额", "我要充值"],
    chargeValues: [{
      text: "10",
      value: '10',
      active: true
    }, {
      text: "30",
      value: '30',
      active: false
    }, {
      text: "50",
      value: '50',
      active: false
    }, {
      text: "100",
      value: '100',
      active: false
    }, {
      text: "200",
      value: '200',
      active: false
    }],
    num: 0,
    contentNum: 0,
    chargeValue: '',
    checkedMoney: '',
    checkedpayer: '',
    realValue: '',
    departments: departments,
    selected_pro: "",
    selected_city: "",
    selected_area: "",
  },
  watch: {
    checkedMoney: 'changeData'
  },
  methods: {
    tab(index) {
      this.num = index;
    },
    contentTab(index) {
      this.contentNum = index;
    },
    changeData() {
      let vm = this;
      vm.chargeValues.forEach(function (ele, index, arr) {
        console.info(vm.checkedMoney)
        if (vm.checkedMoney == ele.text) {
          ele.active = true;
        } else {
          ele.active = false;
        }
        vm.realValue = vm.checkedMoney;
        vm.chargeValue = '';
      });


    },
    handleFocus() {
      var vm = this;
      vm.chargeValues.forEach(function (ele, index, arr) {
        ele.active = false;
        vm.realValue = vm.chargeValue;

      })
    },
    handleEdit() {
      $('#my-prompt').modal({
        relatedTarget: this,
      });
    }
  }
})