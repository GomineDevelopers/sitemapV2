/*初始化*/
var map = new BMap.Map("container"); // 创建地图实例
var point = new BMap.Point(116.404, 39.915);  // 创建中心点坐标
map.centerAndZoom(point,5);                 // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

/*添加控件*/
map.addControl(new BMap.ScaleControl() ); //比例尺
map.addControl(new BMap.MapTypeControl() );//地图类型

addMarker();
/*多点标注*/
function addMarker() {
    $.ajax({
       url:'../js/NE.json',
        type:'GET',
        dataType:'json',
        success:function (data,status) {
            console.info(data.province);
            for(var i = 0;i<data.province.length;i++){
                var point = new BMap.Point(data.province[i].lng,data.province[i].lat);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
            }
        },
        error:function (data,status) {
            console.info(status);
        }
    });
}



