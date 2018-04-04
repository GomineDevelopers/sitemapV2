var jobs = [
    { text: '员工', value: '员工' },
    { text: '总裁/执行董事', value: '总裁/执行董事' },
    { text: '首席信息官/IT总监', value: '首席信息官/IT总监' },
    { text: '首席财务官', value: '首席财务官' },
    { text: 'CXO/高级经理', value: 'CXO/高级经理' },
    { text: '经理 (有下属员工)', value: '经理 (有下属员工)' },
    { text: '经理 (无下属员工)', value: '经理 (无下属员工)' },
    { text: '总监/资深经理', value: '总监/资深经理' },
    { text: '行政人员', value: '行政人员' },
    { text: '其他', value: '其他' }
];
var departments = [
    { text: 'IT 应用开发', value: 'IT 应用开发' },
    { text: 'IT 数据中心', value: 'IT 数据中心' },
    { text: 'IT 安全', value: 'IT 安全' },
    { text: 'IT 存储', value: 'IT 存储' },
    { text: 'IT 电信', value: 'IT 电信' },
    { text: 'IT 运营', value: 'IT 运营' },
    { text: 'IT 服务', value: 'IT 服务' },
    { text: 'IT 体系结构', value: 'IT 体系结构' },
    { text: '财务/会计', value: '财务/会计' },
    { text: '人力资源', value: '人力资源' },
    { text: '物流', value: '物流' },
    { text: '市场营销', value: '市场营销' },
    { text: '网络管理', value: '网络管理' },
    { text: '采购', value: '采购' },
    { text: '研究/开发', value: '研究/开发' },
    { text: '销售', value: '销售' },
    { text: '技术支持', value: '技术支持' },
    { text: '客服服务', value: '客服服务' },
    { text: '顾问咨询', value: '顾问咨询' },
    { text: '工程', value: '工程' },
    { text: '培训/教育', value: '培训/教育' },
    { text: '法律', value: '法律' },
    { text: '行政管理', value: '行政管理' },
    { text: '其他', value: '其他' }
];

var app = new Vue({
    el:'#app',
    data:{
        jobs:jobs,
        departments:departments
    }
})



$(function() {
    var $form = $('#form-with-tooltip');
    var $tooltip = $('<div id="vld-tooltip">提示信息！</div>');
    $tooltip.appendTo(document.body);

    $form.validator();

    var validator = $form.data('amui.validator');

    $form.on('focusin focusout', '.am-form-error input', function(e) {
        if (e.type === 'focusin') {
            var $this = $(this);
            var offset = $this.offset();
            var msg = $this.data('foolishMsg') || validator.getValidationMessage($this.data('validity'));

            $tooltip.text(msg).show().css({
                left: offset.left + 10,
                top: offset.top + $(this).outerHeight() + 10
            });
        } else {
            $tooltip.hide();
        }
    });
});