$(function(){
    $(".show-more").click(function(){
       
        var flag=false;
        if(this.flag){
       $(".content-body").css("overflow","visible").css("height","auto");
       $(this).children().removeClass("am-icon-angle-down");
       $(this).children().addClass("am-icon-angle-up"); 
       this.flag = false;
       console.log(flag);
    }
    
    else{
        $(".content-body").css("overflow","hidden").css("height","30px"); 
        $(this).children().removeClass("am-icon-angle-up");
        $(this).children().addClass("am-icon-angle-down"); 
        this.flag=true;
    }
    });
})