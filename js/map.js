/*初始化*/
var map = new BMap.Map("container",{minZoom:5}); // 创建地图实例
var point = new BMap.Point(116.404, 39.915);  // 创建中心点坐标
map.centerAndZoom(point,5);                 // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

/*添加控件*/
map.addControl(new BMap.ScaleControl() ); //比例尺

addMarker();

/*添加信息窗口*/
var opts = {
    width : 250,
    height : 100,
    title:""
}

/*省级多点标注 start*/
function addMarker() {
    var markerArr = [];
    $.ajax({
       url:'../js/NE.json',
        type:'GET',
        dataType:'json',
        success:function (data,status) {
            for(var i = 0;i<data.province.length;i++){
                /*标注添加到地图中*/
                var point = new BMap.Point(data.province[i].lng,data.province[i].lat);
                var marker = new BMap.Marker(point);

                /*窗口内容*/
                var content = data.province[i].name;

                addClickHandler(content,marker);

                /*标注添加hover的监听事件*/
                marker.addEventListener("mouseover",function (e) {
                    /*点上的文本*/
                    var label = new BMap.Label("",{
                        offset:new BMap.Size(15,-20)
                    });
                    label.setStyle({
                        width: "60px",
                        color: '#fff',
                        background: '#ff8355',
                        border: '1px solid "#ff8355"',
                        borderRadius: "5px",
                        textAlign: "center",
                        height: "26px",
                        lineHeight: "26px"
                    });
                    for(var j = 0;j<data.province.length;j++){
                        var labelContent = "";
                        if( this.point.lat == data.province[j].lat){
                            labelContent = data.province[j].count;
                            label.setContent(labelContent);
                        }
                    }
                    this.setLabel(label);
                });
                marker.addEventListener("mouseout",function(e){
                    var label = this.getLabel();
                    label.setContent("");//设置标签内容为空
                    label.setStyle({border:"none",width:"0px",padding:"0px"});//设置标签边框宽度为0
                });

                map.addOverlay(marker);
            }
        },
        error:function (data,status) {
            console.info(status);
        }
    });
}
/*省级多点标注 end*/

/*点击之后进入到下一级 start*/
function addClickHandler(content,marker) {
    marker.addEventListener("click",function (e) {
        /*openInfo(content,e);*/
        var newPoint = new BMap.Point(e.target.getPosition().lng,e.target.getPosition().lat);
        map.centerAndZoom(newPoint,8);
        $.ajax({
            url:'../js/NE.json',
            type:'GET',
            dataType:'json',
            success:function (data,status) {
                remove_Overlay();
                for(var i = 0;i<data.city.length;i++){
                    var point = new BMap.Point(data.city[i].lng,data.city[i].lat);
                    var marker = new BMap.Marker(point);
                    map.addOverlay(marker);
                }
            }
        });
    });
}
/*点击之后进入到下一级 end*/

/*清除覆盖物 start*/
function remove_Overlay() {
    map.clearOverlays();
}
/*清除覆盖物 end*/

/*鼠标滚轮start*/
var scrollFunc=function(e){
    e = e || window.event;
    var t1=document.getElementById("container");
    t1.value=map.getZoom();
    if(t1.value == 5 || t1.value == 6 || t1.value == 7){
        remove_Overlay();
        addMarker();
    }
}
if(document.addEventListener){//注册事件
    document.addEventListener('DOMMouseScroll',scrollFunc,false);
}
window.onmousewheel=document.onmousewheel=scrollFunc; //IE/Opera/Chrome
/*鼠标滚轮end*/

function openInfo(content,e) {
    var point = new BMap.Point(e.target.getPosition().lng,e.target.getPosition().lat);
    var infoWindow = new BMap.InfoWindow(content,opts);//创建信息窗口对象
    map.openInfoWindow(infoWindow,point);//开启窗口
}




