var jobs = [{
    text: "员工",
    value: "员工"
  },
  {
    text: "总裁/执行董事",
    value: "总裁/执行董事"
  },
  {
    text: "首席信息官/IT总监",
    value: "首席信息官/IT总监"
  },
  {
    text: "首席财务官",
    value: "首席财务官"
  },
  {
    text: "CXO/高级经理",
    value: "CXO/高级经理"
  },
  {
    text: "经理 (有下属员工)",
    value: "经理 (有下属员工)"
  },
  {
    text: "经理 (无下属员工)",
    value: "经理 (无下属员工)"
  },
  {
    text: "总监/资深经理",
    value: "总监/资深经理"
  },
  {
    text: "行政人员",
    value: "行政人员"
  },
  {
    text: "其他",
    value: "其他"
  }
];
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
  el: "#userCenter",
  data: {
    tabItems: ["我的账户", "我的下载", "我的浏览", "账户设置"],
    tabContents: ["内容一", "内容二", "内容三", "内容四"],
    contentTabs: ["充值记录", "消费记录", "账户余额", "我要充值"],
    // 历史纪录和搜索
    targetSearchcontent: "",
    historyData: {},
    cur: 1, //当前页码
    goPage: 1,
    all: "", //总条数
    allPage: "",
    isSearch: true,
    isShow: {
      loading: true,
      pagination: false,
      count: false
    },

    chargeValues: [{
        text: "10",
        value: "10",
        active: true
      },
      {
        text: "30",
        value: "30",
        active: false
      },
      {
        text: "50",
        value: "50",
        active: false
      },
      {
        text: "100",
        value: "100",
        active: false
      },
      {
        text: "200",
        value: "200",
        active: false
      }
    ],
    num: 0,
    contentNum: 0,
    chargeValue: "",
    checkedMoney: "",
    checkedpayer: "",
    realValue: "",
    userSetting: {
      userEmail: "",
      userName: "",
      userLastName: "",
      department: "",
      job: "",
      userPassword: "",
      userPhone: "",
      userCompanyName: ""
    },
    selected_pro: "",
    selected_city: "",
    selected_area: "",
    departments: departments,
    jobs: jobs,
    oldPassword: "",
    newPassword: "",
    newPasswordCheck: "",
    tipCon: ""
  },
  watch: {
    checkedMoney: "changeData",
    selected_pro: "resetDispicker"
  },
  mounted: function () {
    var token = localStorage;
    console.log(token);
  },
  computed: {
    //分页
    indexs: function () {
      var left = 1;
      var vm = this;
      /*总页数*/
      vm.allPage = vm.all % 5 == 0 ? vm.all / 5 : Math.ceil(vm.all / 5);
      var right = vm.allPage;
      var ar = [];
      if (vm.allPage >= 5) {
        if (vm.cur > 3 && vm.cur < vm.allPage - 2) {
          left = vm.cur - 2;
          right = vm.cur + 2;
        } else {
          if (vm.cur <= 3) {
            left = 1;
            right = 5;
          } else {
            right = vm.allPage;
            left = vm.allPage - 4;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    }
  },
  methods: {
    resetDispicker() {
      $("#targetArea").distpicker({
        province: "-请选择省-",
        city: "-请选择省-",
        district: "-请选择省-"
      });
    },
    // 获取token

    // 搜索内容获取
    getSearchData() {
      var vm = this;
      axios
        .post(globalUrl + "content/number", {
          token: "3986236de4c68ebac8051572d3be678dae2b50db"
        })
        .then(function (response) {
          vm.historyData = response.data.data.data;
          vm.all = response.data.data.total;
        });
    },
    /*分页*/
    btnClick: function (data) {
      //页码点击事件
      var vm = this;
      vm.isShow.loading = true;
      if (data != vm.cur) {
        vm.cur = data;
        if (vm.isSearch) {
          getSearchDataPage(vm.cur, vm.targetSearchcontent).then(function (response) {
            vm.isShow.loading = false;
            vm.historyData = response.data.data.data;
          });
        } else {
          getDataPage(vm.cur).then(function (response) {
            vm.isShow.loading = false;
            vm.historyData = response.data.data.data;
          });
        }
      }
    },
    pageClick: function () {
      var vm = this;
      vm.isShow.loading = true;
      if (vm.isSearch) {
        getSearchDataPage(vm.cur, vm.targetSearchcontent).then(function (response) {
          vm.isShow.loading = false;
          vm.historyData = response.data.data.data;
        });
      } else {
        getDataPage(vm.cur).then(function (response) {
          vm.isShow.loading = false;
          vm.historyData = response.data.data.data;
        });
      }
    },
    Go: function () {
      var vm = this;
      vm.isShow.loading = true;
      vm.cur = Number(vm.goPage);
      //总页数
      vm.allPage = vm.all % 5 == 0 ? vm.all / 5 : Math.ceil(vm.all / 5);
      if (vm.cur <= vm.allPage) {
        if (vm.isSearch) {
          getSearchDataPage(vm.cur, vm.targetSearchcontent).then(function (response) {
            vm.isShow.loading = false;
            vm.historyData = response.data.data.data;
          });
        } else {
          getDataPage(vm.cur).then(function (response) {
            vm.isShow.loading = false;
            vm.historyData = response.data.data.data;
          });
        }
      } else {
        alert("输入的页数超过总页数！");
      }
    },

    // 数据搜索
    toSearchData() {
      var vm = this;
      axios
        .post(globalUrl + "content/numsearch", {
          token: "3986236de4c68ebac8051572d3be678dae2b50db",
          content: vm.targetSearchcontent
        })
        .then(function (response) {
          vm.historyData = response.data.data.data;
          vm.all = response.data.data.total;
          vm.isSearch = true;
        });
    },

    getExistedData() {
      let vm = this;
      let temp = {};
      axios
        .post(globalUrl + "content/settings", {
          token: "3986236de4c68ebac8051572d3be678dae2b50db"
        })
        .then(function (response) {
          temp = response.data.data[0];
          vm.userSetting.userEmail = temp.email;
          vm.userSetting.userName = temp.names;
          vm.userSetting.userLastName = temp.lastname;
          vm.userSetting.department = temp.department;
          vm.userSetting.userPassword = temp.password;
          vm.userSetting.userPhone = temp.phone;
          vm.userSetting.userCompanyName = temp.Account_Name;
          vm.userSetting.job = temp.position;
          vm.setCity(temp.State_Code, temp.City_Code, temp.County_Code);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    saveUserdata() {
      var vm = this;
      var $modal = $("#my-alert");
      /*验证*/
      var len = $(".user-input").length;
      var arr = []; //存放未通过的验证
      for (var i = 0; i < len; i++) {
        if ($(".user-input")[i].validity.valid == false) {
          arr.push(i);
        }
      }
      if (arr.length == 0) {
        axios
          .post(globalUrl + "content/uppsword", {
            token: "9c55fe3a1fa542021e99ad9576936b853c7c9aeb",
            email: vm.userSetting.userEmail,
            State_Code: vm.selected_pro,
            City_Code: vm.selected_city,
            County_Code: vm.selected_area,
            lastname: vm.userSetting.userLastName,
            names: vm.userSetting.userName,
            phone: vm.userSetting.userPhone,
            Account_Name: vm.userSetting.userCompanyName,
            department: vm.userSetting.department,
            position: vm.userSetting.job
          })
          .then(function (response) {
            vm.tipCon = "信息修改成功";
            $modal.modal();
          })
          .catch(function (error) {
            vm.tipCon = "请求后台出错！";
            $modal.modal();
          });
      } else {
        vm.tipCon = "请检查并正确填写信息~";
        $modal.modal();
      }
    },
    changePassword() {
      let vm = this;
      var $modal = $("#my-alert");
      /*验证*/
      var len = $(".change-passwd").length;
      var arr = []; //存放未通过的验证
      for (var i = 0; i < len; i++) {
        if ($(".change-passwd")[i].validity.valid == false) {
          arr.push(i);
        }
      }
      if (arr.length == 0) {
        axios
          .post(globalUrl + "content/password", {
            token: "9c55fe3a1fa542021e99ad9576936b853c7c9aeb",
            password: vm.oldPassword,
            newPassword: vm.newPassword,
            newPasswordCheck: vm.newPasswordCheck
          })
          .then(function (response) {
            if (response.data.status == 0) {
              vm.tipCon = "原始密码错误";
              $modal.modal();
            } else if (response.data.status == 2) {
              vm.tipCon = "新密码与原始密码一致，请重新修改";
              $modal.modal();
            } else if (response.data.status == 1) {
              vm.tipCon = "密码修改成功";
              $modal.modal();
              $("#my-prompt").modal("close");
            } else {
              vm.tipCon = "未知错误，请刷新重试";
              $modal.modal();
            }
          })
          .catch(function (error) {});
      } else {
        vm.tipCon = "请检查并正确填写信息~";
        $modal.modal();
      }
    },
    setCity(pro, city, area) {
      $("#targetArea").distpicker({
        province: pro,
        city: city,
        district: area
      });
    },
    tab(index) {
      this.num = index;
      if (this.num == 3) {
        this.getExistedData();
      } else if (this.num == 2) {
        vm.isSearch = false;
        this.getSearchData();
      }
    },
    contentTab(index) {
      this.contentNum = index;
    },
    changeData() {
      let vm = this;
      vm.chargeValues.forEach(function (ele, index, arr) {
        if (vm.checkedMoney == ele.text) {
          ele.active = true;
        } else {
          ele.active = false;
        }
        vm.realValue = vm.checkedMoney;
        vm.chargeValue = "";
      });
    },
    handleFocus() {
      var vm = this;
      vm.chargeValues.forEach(function (ele, index, arr) {
        ele.active = false;
        vm.realValue = vm.chargeValue;
      });
    },
    handleEdit() {
      $("#my-prompt").modal({
        relatedTarget: this,
        onConfirm: function (options) {
          this.changePassword;
        },
        // closeOnConfirm: false,
        onCancel: function () {}
      });
    }
    // 历史纪录分页相关
  }
});
$(function () {
  var $form = $("#form-with-tooltip");
  var $tooltip = $('<div id="vld-tooltip">提示信息！</div>');
  $tooltip.appendTo(document.body);
  $form.validator();
  var validator = $form.data("amui.validator");
  $form.on("focusin focusout", ".am-field-error", function (e) {
    if (e.type === "focusin") {
      var $this = $(this);
      var offset = $this.offset();
      var msg =
        $this.data("foolishMsg") ||
        validator.getValidationMessage($this.data("validity"));
      $tooltip
        .text(msg)
        .show()
        .css({
          left: offset.left + 10,
          top: offset.top + $(this).outerHeight() + 10
        });
    } else if (e.type === "focusout") {
      $tooltip.hide();
    } else {
      $tooltip.hide();
    }
  });
  $form.on("focusin focusout", ".am-field-valid ", function (e) {
    if (e.type === "focusin") {
      $tooltip.hide();
    } else if (e.type === "focusout") {
      $tooltip.hide();
    }
  });
});

function getDataPage(curpage) {
  var par = curpage == undefined ? (page = "1") : (page = curpage);
  var l = axios({
    method: "post",
    url: globalUrl + "content/number",
    data: {
      page: par,
      token: "3986236de4c68ebac8051572d3be678dae2b50db"
    }
  });
  return l;
}

function getSearchDataPage(curpage, content) {
  var par = curpage == undefined ? (page = "1") : (page = curpage);
  var l = axios({
    method: "post",
    url: globalUrl + "content/numsearch",
    data: {
      page: par,
      content: content,
      token: "3986236de4c68ebac8051572d3be678dae2b50db"
    }
  });
  return l;
}