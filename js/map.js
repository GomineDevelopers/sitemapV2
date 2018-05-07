Vue.use(VueBaiduMap.default, {
    ak: 'piXQ5CgHFqEefqCVbhhBFfe6HjF7l4zW'
});
new Vue({
    el: "#app",
    data: {
        zoom: 5,
        center: { lng: 116.463, lat: 39.924 }
    }
})