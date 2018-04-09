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

        each_click_items.each(function(i){

     $(this).click(function(){
            var selected_items_value=$(this).text();
             var formatted_strings="<span>" + selected_items_value +"<i></i></span>";
             $(".selected-box").append(formatted_strings).children().addClass("selected-items");
             $(".selected-box").append(formatted_strings).children().siblings("i").addClass("am-icon-close");
             $(this).parent().parent(".am-cf").css("display","none");

      })

  });

})