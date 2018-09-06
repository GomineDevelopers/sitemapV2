// 全局URl
//const globalUrl = "http://118.31.78.153/backend/api/";
// 本地全局URl
const globalUrl = "http://192.168.0.5/sitemap/api/";
/*时间戳*/
function formatDate(date, showDetail) {
    var isShow = showDetail || false;
    var d = new Date(parseInt(date) * 1000);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date1 = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    if (isShow)
        return (
            year +
            "-" +
            month +
            "-" +
            date1 +
            " " +
            hour +
            ":" +
            minute +
            ":" +
            second
        );
    else return year + "-" + month + "-" + date1;
}
/*获取url后的参数*/
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}

function setLocalStorage(key, val) {
    var exp = new Date().getTime() + 2 * 24 * 60 * 60 * 100; //令牌过期时间
    var obj = {
        val: val,
        exp: exp
    };
    localStorage.setItem(key, JSON.stringify(obj));
}

function getLocalStorage(key) {
    var info = localStorage.getItem(key);
    if (info) {
        info = JSON.parse(info);
        if (info.exp > new Date().getTime()) {
            return info.val;
        } else {
            this.deleteLocalStorage("token");
            this.deleteLocalStorage("userName");
        }
    }
    return "";
}

function deleteLocalStorage(key) {
    return localStorage.removeItem(key);
}

function logout() {
    deleteLocalStorage("token");
    deleteLocalStorage("userName");
    window.location.reload();
}

/*导航点击事件*/
function getTagData(organizor, info, type, navName) {
    //首页
    var storage = {
        type: type,
        info: info,
        organizor: organizor,
        navName: navName
    };
    localStorage.setItem("b", JSON.stringify(storage));
    window.location.href = "./html/labelSearch.html";
}

function innerPageGetTagData(organizor, info, type, navName) {
    //非首页
    var storage = {
        type: type,
        info: info,
        organizor: organizor,
        navName: navName
    };
    localStorage.setItem("b", JSON.stringify(storage));
    window.location.href = "./labelSearch.html";
}

$(function () {
    if (getLocalStorage("token") && getLocalStorage("userName")) {
        $("#isLogin").remove();
        $("#vipName").text(getLocalStorage("userName"));
        $("#isLogout").show();
    } else {
        $("#isLogout").remove();
        $("#isLogin").show();
    }

    if ($("#logout")) {
        $("#logout").click(function () {
            logout();
        });
    }
});