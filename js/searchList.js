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
    
})