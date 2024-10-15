function tow(n) {
    return n >= 0 && n < 10 ? '0' + n : '' + n;
}
setInterval(function () {
    let oSpan1 = document.getElementsByTagName("timing1")[0];
    let localhostTime1 = new Date(2016, 10, 18, 0, 0, 0);//获取页面打开的时间
    calTime(localhostTime1,oSpan1);
    
    let oSpan2 = document.getElementsByTagName("timing2")[0];
    let localhostTime2 = new Date(2022, 4, 27, 0, 0, 0);//获取页面打开的时间
    calTime(localhostTime2,oSpan2);
    
    let oSpan3 = document.getElementsByTagName("timing3")[0];
    let localhostTime3 = new Date(2022, 8, 17, 0, 0, 0);//获取页面打开的时间
    calTime(localhostTime3,oSpan3);
    
    let oSpan4 = document.getElementsByTagName("timing4")[0];
    let localhostTime4 = new Date(2022, 9, 5, 0, 0, 0);//获取页面打开的时间
    calTime(localhostTime4,oSpan4);
    
    let oSpan5 = document.getElementsByTagName("timing5")[0];
    let localhostTime5 = new Date(2024, 6, 20, 0, 0, 0);//获取页面打开的时间
    calTime(localhostTime5,oSpan5);
}, 1000)

function calTime(localhostTime,oSpan){
  let goTime = new Date();//获取动态时间
    let diffTime = goTime.getTime() - localhostTime.getTime();
    var second = Math.floor(diffTime / 1000);//未来时间距离现在的秒数
    var day = Math.floor(second / 86400);//整数部分代表的是天；一天有24*60*60=86400秒 ；
    second = second % 86400;//余数代表剩下的秒数；
    var hour = Math.floor(second / 3600);//整数部分代表小时；
    second %= 3600; //余数代表 剩下的秒数；
    var minute = Math.floor(second / 60);
    second %= 60;
    var str = tow(day) + '<span class="time">天</span>'
        // + tow(hour) + '<span class="time">小时</span>'
        // + tow(minute) + '<span class="time">分钟</span>'
        // + tow(second) + '<span class="time">秒</span>';
    // var str = tow(hour) + '<span class="time">小时</span>'
    //     + tow(minute) + '<span class="time">分钟</span>'
    //     + tow(second) + '<span class="time">秒</span>';
    oSpan.innerHTML = str;
}