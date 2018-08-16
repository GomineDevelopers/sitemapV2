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
    userSetting: {
      userEmail: '',
      userName: '',
      department: '',
      job: '',
      userPassword: '',
      userPhone: '',
      userCompanyName: '',
      newpsword: ''
    },
    selected_pro: '',
    selected_city: '',
    selected_area: '',
    departments: departments,
    jobs: jobs

  },
  watch: {
    checkedMoney: 'changeData',

  },
  mounted: function () {
    var vm = this;



  },
  methods: {
    getExistedData() {
      let vm = this;
      let temp = {};
      axios.post(globalUrl + "content/settings", {
          token: '9c55fe3a1fa542021e99ad9576936b853c7c9aeb',
        })
        .then(function (response) {
          temp = response.data.data[0]
          vm.userSetting.userEmail = temp.email;
          vm.userSetting.userName = temp.lastname + " " + temp.names
          vm.userSetting.department = temp.department
          vm.userSetting.userPassword = temp.password
          vm.userSetting.userPhone = temp.phone
          vm.userSetting.userCompanyName = temp.Account_Name
          vm.userSetting.job = temp.position;
          vm.setCity(temp.State_Code, temp.City_Code, temp.County_Code);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    saveUserdata() {
      let vm = this
      arr = this.userSetting.userName.split(" ");
      let lastname = arr[0];
      let name = arr[1];
      var $modal = $("#my-alert");

      /*验证*/
      var len = $(".am-form input").length;
      var arr = []; //存放未通过的验证
      for (var i = 0; i < len; i++) {
        if ($(".am-form input")[i].validity.valid == false) {
          arr.push(i);
        }
      }

      if (arr.length == 0) {
        axios.post(globalUrl + "content/uppsword", {
          email: vm.userSetting.userEmail,
          State_Code: vm.selected_pro,
          City_Code: vm.selected_city,
          County_Code: vm.selected_area,
          lastname: lastname,
          names: name,
          phone: vm.userSetting.userPhone,
          Account_Name: vm.userSetting.userCompanyName,
          department: vm.userSetting.department,
          position: vm.userSetting.job
        }).then(function () {
          vm.tipCon = "修改个人信息成功！";
          $modal.modal({
            onCancel: function () {
              window.location.href = "../login.html";
            }
          });
        }).catch(function (error) {
          vm.tipCon = "请求后台出错！";
          // $modal.modal();
        });
      }
    },
    changePassword() {
      let VM = this;
      axios.post(globalUrl + "content/uppsword", {
        password: vm.userSetting.userPassword,

      }).then(function () {
        vm.tipCon = "修改个人信息成功！";
        $modal.modal({
          onCancel: function () {
            window.location.href = "../login.html";
          }
        });
      }).catch(function (error) {
        vm.tipCon = "请求后台出错！";
        // $modal.modal();
      });
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
      }
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
$(function () {
  var $form = $("#form-with-tooltip");
  var $tooltip = $('<div id="vld-tooltip">提示信息！</div>');
  $tooltip.appendTo(document.body);

  $form.validator();

  var validator = $form.data("amui.validator");

  $form.on("focusin focusout", ".am-form-error input", function (e) {
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
  $form.on("focusin focusout", ".am-form-success input", function (e) {
    if (e.type === "focusin") {
      $tooltip.hide();
    } else if (e.type === "focusout") {
      $tooltip.hide();
    }
  });
});