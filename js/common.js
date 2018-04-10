

$(function(){
    // 高度计算示例
    var docHeight = $(document).height();
    winHeight = $(window).height();
    headerHeight = $(".header").outerHeight();
    footerHeight = $(".footer").outerHeight();
    $("div.content-container").height(winHeight-headerHeight-footerHeight);
})
