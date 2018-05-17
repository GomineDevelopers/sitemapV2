/*初始化*/
var map = new BMap.Map("container", { minZoom: 5 }); // 创建地图实例
var point = new BMap.Point(116.404, 39.915);  // 创建中心点坐标
map.centerAndZoom(point, 5);                 // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

var myGeo = new BMap.Geocoder(); // 创建地址解析器实例

/*添加控件*/
map.addControl(new BMap.ScaleControl()); //比例尺

$(function() {
    addMarker();
    $(":radio").click(function () {
        var selected = $("input[name='radio10']:checked").val();
        if(selected == 'sg'){
            remove_Overlay();
            addMarkerSg();
        }else if (selected == 'sd') {
            remove_Overlay();
            addMarker();
        }
    });
});
/*------------------------------------------------------------------------------------散点图相关 start*/
/*省级多点标注 start*/
function addMarker() {
    /*缓存中的内容*/
    var info = JSON.parse(localStorage.getItem("b")).info;
    var organizor = JSON.parse(localStorage.getItem("b")).organizor;
    var type = JSON.parse(localStorage.getItem("b")).type;

    $.ajax({
        url: 'http://192.168.0.5/api/content/gisstate/',
        type: 'GET',
        dataType: 'json',
        data:{
            info:info,
            type:type,
            organizor:organizor
        },
        success: function (data, status) {
            for (var i = 0; i < data.data.length; i++) {
                /*标注添加到地图中*/
                var content = data.data[i].county;
                var point = new BMap.Point(data.data[i].lng,data.data[i].lat);
                var marker = new BMap.Marker(point);
                addClickHandler(marker,data.data[i].type);
                mouseHoverEvent(marker,data.data[i]);
                mouseOutEvent(marker);
                map.addOverlay(marker);
            }
        },
        error: function (data, status) {
            console.info(status);
        }
    });
}
/*省级多点标注 end*/

/*点击之后进入到下一级 start*/
function addClickHandler(marker,sign) {
    var info = JSON.parse(localStorage.getItem("b")).info;
    var organizor = JSON.parse(localStorage.getItem("b")).organizor;
    var type = JSON.parse(localStorage.getItem("b")).type;

    marker.addEventListener("click", function (e) {
        var newPoint = new BMap.Point(e.target.getPosition().lng, e.target.getPosition().lat);
        myGeo.getLocation(newPoint, function(result){
            var newName = "";
            switch(sign){
                case '1':
                    map.centerAndZoom(result.point, 8);
                    newName = result.addressComponents.province;
                    break;
                case '2':
                    map.centerAndZoom(result.point, 9);
                    newName = result.addressComponents.city;
                    break;
                case '3':
                    map.centerAndZoom(result.point, 9);
                    newName = result.addressComponents.district;
                    break;
            }
            $.ajax({
                url: 'http://192.168.0.5/api/content/giscitys/',
                type: 'GET',
                dataType: 'json',
                data:{
                    info:info,
                    type:type,
                    organizor:organizor,
                    name:newName
                },
                success: function (data, status) {
                    remove_Overlay();
                    for (var i = 0; i < data.data.length; i++) {
                        var point = new BMap.Point(data.data[i].lng,data.data[i].lat);
                        var marker = new BMap.Marker(point);
                        addClickHandler(marker,data.data[i].type);
                        mouseHoverEvent(marker,data.data[i]);
                        mouseOutEvent(marker);
                        map.addOverlay(marker);
                    }
                }
            });
        });
    });
}
/*点击之后进入到下一级 end*/

/*鼠标放到marker上显示数量*/
function mouseHoverEvent(marker,data) {
    marker.addEventListener("mouseover",function (e) {
        /*点上的文本*/
        var label = new BMap.Label("",{
            offset:new BMap.Size(15,-20)
        });
        label.setStyle({
            color: '#fff',
            background: '#67C23A',
            border: '1px solid "#ff8355"',
            borderRadius: "5px",
            textAlign: "center",
            height: "26px",
            lineHeight: "26px"
        });

        if(this.point.lat == data.lat){
            var con = data.name + "："+data.county;
            label.setContent(con);
        }
        this.setLabel(label);
    });
}

/*鼠标移出marker*/
function mouseOutEvent(marker){
    marker.addEventListener("mouseout",function(e){
        var label = this.getLabel();
        label.setContent("");//设置标签内容为空
        label.setStyle({border:"none",width:"0px",padding:"0px"});//设置标签边框宽度为0
    });
}

/*------------------------------------------------------------------------------------散点图相关 end*/

/*------------------------------------------------------------------------------------栅格相关 start*/
function addMarkerSg() {
    var info = JSON.parse(localStorage.getItem("b")).info;
    var organizor = JSON.parse(localStorage.getItem("b")).organizor;
    var type = JSON.parse(localStorage.getItem("b")).type;

    $.ajax({
        url: 'http://192.168.0.5/api/content/gisstate/',
        type: 'GET',
        dataType: 'json',
        data: {
            info: info,
            type: type,
            organizor: organizor
        },
        success:function (data, status) {
            for(var i =0;i<data.data.length;i++){
                getBoundary(data.data[i]);
            }
        }
    });
}

function getBoundary(data) {
    var bdary = new BMap.Boundary();
    bdary.get(data.name, function(rs){
        var count = rs.boundaries.length;
        for (var i = 0; i < count; i++) {
            var col = "";
            if(data.county == 0){
                col = "#d6e4ff";
            }else if(data.county > 0 && data.county < 10){
                col = "#36cfc9";
            }else if(data.county >=10 && data.county < 20){
                col = "#bae637";
            }else if(data.county >= 20 && data.county < 50){
                col = "#ffec3d";
            }else if(data.county >= 50 && data.county < 100){
                col = "#faad14";
            }
            else if(data.county >= 100 && data.county < 150){
                col = "#ffa940";
            }
            else if(data.county >= 150 && data.county < 200){
                col = "#ff7a45";
            }
            else if(data.county >= 200 && data.county < 300){
                col = "#ad2102";
            }
            else {
                col = "#ff6400";
            }
            var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 1, strokeColor: col,fillColor:col,fillColorOpacity:"0.5"}); //建立多边形覆盖物
            map.addOverlay(ply);  //添加覆盖物
            addLable(data);
        }
    });
}

function addLable(data) {
    var point = new BMap.Point(data.lng,data.lat);
    var ops = {
        position : point,   // 指定文本标注所在的地理位置
        offset:new BMap.Size(-5,-15)
    };
    /*var con = data.name+"："+data.county;*/
    var label = new BMap.Label(data.county,ops);
    label.setStyle({});
    map.addOverlay(label);
}

/*------------------------------------------------------------------------------------栅格相关 end*/


/*------------------------------------------------------------------------------------公用*/
/*清除覆盖物*/
function remove_Overlay() {
    map.clearOverlays();
}

/*鼠标滚轮start*/
var scrollFunc = function (e) {
    e = e || window.event;
    var t1 = document.getElementById("container");
    t1.value = map.getZoom();
    if (t1.value == 5 || t1.value == 6 || t1.value == 7) {
        remove_Overlay();
        var selected = $("input[name='radio10']:checked").val();
        if(selected == 'sd'){
            addMarker();
        }else if(selected == 'sg'){
            addMarkerSg();
        }
    }
}
if (document.addEventListener) {//注册事件
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome
/*鼠标滚轮end*/