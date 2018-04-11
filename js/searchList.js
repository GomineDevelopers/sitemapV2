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

})