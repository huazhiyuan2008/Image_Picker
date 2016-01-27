var selectedUrl
var $pickerView
var MIN_WIDTH = 150
var MIN_HEIGHT = 150
var $body = $('body');

function btn_move(el, mouseLeft, mouseTop) {
    var leftRnd = (Math.random() - 0.5) * 20;
    var topRnd = (Math.random() - 0.5) * 20;
    var btnLeft = mouseLeft + (leftRnd > 0 ? 100 : -100) + leftRnd;
    var btnTop = mouseTop + (topRnd > 0 ? 30 : -30) + topRnd;
    btnLeft = btnLeft < 100 ? (btnLeft + window.innerWidth - 200) : (btnLeft > window.innerWidth - 100 ? btnLeft - window.innerWidth + 200 : btnLeft);
    btnTop = btnTop < 100 ? (btnTop + window.innerHeight - 200) : (btnTop > window.innerHeight - 100 ? btnTop - window.innerHeight + 200 : btnTop);
    el.style.position = 'fixed';
    el.style.left = btnLeft + 'px';
    el.style.top = btnTop + 'px';
}

function bigImg(x) {
    x.height = x.height + 5;
    x.width = x.width + 5
}

function normalImg(x) {
    x.height = x.height - 5;
    x.width = x.width - 5;
}

function over_image(e) {
    if (this.width < MIN_WIDTH && this.height < MIN_HEIGHT) {
        return
    }
    if (!e) {
        e = window.event;
    }
    //console.log(this.src);
    // var left = this.position().left + 10;
    // var top = this.position().top + 10; 
    selectedUrl = this.src
    var left = this.getBoundingClientRect().left + $body.scrollLeft() + 0;
    var top = this.getBoundingClientRect().top + $body.scrollTop() + 0;
    // console.log(left + ", " + top);
    $pickerView.css({
        display: 'block',
        left: left,
        top: top
    });
    // alert(this.src)

    //bigImg(this);
    // btn_move(this, e.clientX, e.clientY);
}

function out_image(e) {
    if (this.width < MIN_WIDTH && this.height < MIN_HEIGHT) {
        return
    }
    if (!e) {
        e = window.event;
    }
    //console.log(this.src);
    //alert(this.src)
    $pickerView.css('display', 'none')
    // normalImg(this);
    // btn_move(this, e.clientX, e.clientY);
}

function loadListeners() {
    /**
    var imgs = $('img').
    console.log(imgs.length);
    imgs.each(function(i, img){
        img.onmouseover = over_image;
        img.onmouseout = out_image;
    });
    **/

    $body.on('mouseenter', 'img', over_image);
    $body.on('mouseleave', 'img', out_image);

    // for (var i = 0; i < imgs.length; i++) {
    //     // imgs[i].onmouseover = function() {
    //     //     console.log(this.src)
    //     // };
    //     if (imgs[i].width > 150 && imgs[i].height > 150) {
    //         imgs[i].onmouseover = over_image;
    //         imgs[i].onmouseout = out_image;
    //     }
    // }
}

loadListeners();

//循环执行，每隔3秒钟执行一次showalert（） 
//window.setInterval(loadListeners, 3000);

//定时执行，5秒后执行show() 
// window.setTimeout(loadListeners, 5000);
// window.setTimeout(loadListeners, 10000);

function appendPicker() {
    // var pickHtml = '<div id="PICKER_WIDGETS"><div class="PICKER-f-button" style="display: none; left: 20px; top: 202px;">采集</div><style>#PICKER_WIDGETS  {font-family: "helvetica neue",arial,sans-serif; color: #444; font-size: 14px;} #PICKER_WIDGETS * {box-sizing: content-box;} #PICKER_WIDGETS .PICKER-main {position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: #e5e5e5; background: rgba(229,229,229,.95); max-height: 100%; overflow: hidden; z-index: 9999999999999;} #PICKER_WIDGETS a img {border: 0;} #PICKER_WIDGETS .PICKER-header {height: 50px; background: white; box-shadow: 0 0 4px rgba(0,0,0,.2); width: 100%; left: 0; top: 0; position: absolute;} #PICKER_WIDGETS .PICKER-header .PICKER-inner {margin: 0 auto; position: relative;} #PICKER_WIDGETS .PICKER-header .PICKER-close {width: 60px; height: 50px; border-left: 1px solid #ddd; position: absolute; right: 0; top: 0; background: url(//PICKER.com/img/widgets/btn_close.png) 20px 14px no-repeat; cursor: pointer;} #PICKER_WIDGETS .PICKER-header .PICKER-close:hover {background-position: 20px -26px;} #PICKER_WIDGETS .PICKER-header .PICKER-close:active {background-position: 20px -66px;} #PICKER_WIDGETS .PICKER-header .PICKER-logo {display: block; position: absolute; top: 12px;} #PICKER_WIDGETS .PICKER-waterfall-holder {position: relative; overflow-y: auto; height: 100%;} #PICKER_WIDGETS .PICKER-waterfall {position: relative; margin-top: 50px;} #PICKER_WIDGETS .PICKER-waterfall .PICKER-empty {position: absolute; left: 50%; top: 30px; height: 36px; line-height: 36px; width: 216px; text-align: left; margin-left: -128px; color: #777; background: url(//PICKER.com/img/widgets/icon_notice.png) 12px 8px no-repeat white; padding-left: 40px; font-size: 15px;} #PICKER_WIDGETS .PICKER-btn {display: inline-block; border-radius: 2px; font-size: 14px; padding: 0 12px; height: 30px; line-height: 30px; cursor: pointer; text-decoration: none; white-space: nowrap; -moz-user-select: none; -webkit-user-select: none; user-select: none; text-align: center; background: #D53939; color: white;} #PICKER_WIDGETS .PICKER-btn:hover {background: #E54646;} #PICKER_WIDGETS .PICKER-btn:active {background: #C52424;} #PICKER_WIDGETS .PICKER-wbtn {background: #EDEDED; color: #444;} #PICKER_WIDGETS .PICKER-wbtn:hover {background: #F2F2F2;} #PICKER_WIDGETS .PICKER-wbtn:active {background: #DDD;} #PICKER_WIDGETS .PICKER-f-button {position: absolute; display: none; z-index: 9999999999998; box-shadow: 0 0 0 2px rgba(255,255,255,.2); background: #aaa; background: rgba(0,0,0,.3); color: white; cursor: pointer; padding: 0 12px; height: 30px; line-height: 30px; border-radius: 2px; font-size: 14px} #PICKER_WIDGETS .PICKER-f-button:hover {background-color: #999; background-color: rgba(0,0,0,.5);} #PICKER_WIDGETS .PICKER-f-button:active {background-color: rgba(0,0,0,.6);} #PICKER_WIDGETS .PICKER-red-normal-icon-button {width: 36px; height: 24px; border: 0px; line-height: 24px; padding-left: 24px; padding-right: 0px; text-align: left; background: url(//PICKER.com/img/widgets/widget_icons.png) 0 -200px no-repeat; box-shadow: none !important; font-size: 14px; background-color: transparent !important;} #PICKER_WIDGETS .PICKER-red-normal-icon-button:hover {background-position: -130px -200px;} #PICKER_WIDGETS .PICKER-red-normal-icon-button:active {background-position: -260px -200px;} #PICKER_WIDGETS .PICKER-red-large-icon-button {width: 80px; height: 24px; border: 0px; line-height: 24px; padding-left: 24px; padding-right: 0px; text-align: left; background: url(//PICKER.com/img/widgets/widget_icons.png) 0 -150px no-repeat; box-shadow: none !important; font-size: 14px; background-color: transparent !important;} #PICKER_WIDGETS .PICKER-red-large-icon-button:hover {background-position: -130px -150px;} #PICKER_WIDGETS .PICKER-red-large-icon-button:active {background-position: -260px -150px;} #PICKER_WIDGETS .PICKER-red-small-icon-button {width: 30px; height: 21px; border: 0px; line-height: 21px; padding-left: 20px; padding-right: 0px; text-align: left; background: url(//PICKER.com/img/widgets/widget_icons.png) 0 -250px no-repeat; box-shadow: none !important; font-size: 12px; background-color: transparent !important;} #PICKER_WIDGETS .PICKER-red-small-icon-button:hover {background-position: -130px -250px;} #PICKER_WIDGETS .PICKER-red-small-icon-button:active {background-position: -260px -250px;} #PICKER_WIDGETS .PICKER-white-normal-icon-button {width: 36px; height: 24px; border: 0px; line-height: 24px; padding-left: 24px; padding-right: 0px; text-align: left; background: url(//PICKER.com/img/widgets/widget_icons.png) 0 -500px no-repeat; box-shadow: none !important; color: #444; font-size: 14px; background-color: transparent !important;} #PICKER_WIDGETS .PICKER-white-normal-icon-button:hover {background-position: -130px -500px;} #PICKER_WIDGETS .PICKER-white-normal-icon-button:active {background-position: -260px -500px;} #PICKER_WIDGETS .PICKER-white-large-icon-button {width: 80px; height: 24px; border: 0px; line-height: 24px; padding-left: 24px; padding-right: 0px; text-align: left; background: url(//PICKER.com/img/widgets/widget_icons.png) 0 -450px no-repeat; box-shadow: none !important; color: #444; font-size: 14px; background-color: transparent !important;} #PICKER_WIDGETS .PICKER-white-large-icon-button:hover {background-position: -130px -450px;} #PICKER_WIDGETS .PICKER-white-large-icon-button:active {background-position: -260px -450px;} #PICKER_WIDGETS .PICKER-white-small-icon-button {width: 30px; height: 21px; border: 0px; line-height: 21px; padding-left: 20px; padding-right: 0px; text-align: left; background: url(//PICKER.com/img/widgets/widget_icons.png) 0 -550px no-repeat; box-shadow: none !important; color: #444; font-size: 12px; background-color: transparent !important;} #PICKER_WIDGETS .PICKER-white-small-icon-button:hover {background-position: -130px -550px;} #PICKER_WIDGETS .PICKER-white-small-icon-button:active {background-position: -260px -550px;} #PICKER_WIDGETS .PICKER-cell {width: 236px; position: absolute; background: white; box-shadow: 0 1px 3px rgba(0,0,0,.3); transition: left .3s ease-in-out, top .3s linear;} #PICKER_WIDGETS .PICKER-cell .PICKER-img-holder {overflow: hidden; position: relative;} #PICKER_WIDGETS .PICKER-cell .PICKER-img-holder:hover img.PICKER-cell-img {opacity: .8} #PICKER_WIDGETS .PICKER-cell .PICKER-video-icon {width: 72px; height: 62px; position: absolute; left: 50%; top: 50%; margin: -31px auto auto -36px; background: url(//PICKER.com/img/widgets/media_video.png) 0 0 no-repeat; display: none;} #PICKER_WIDGETS .PICKER-cell.PICKER-video .PICKER-video-icon {display: block;} #PICKER_WIDGETS .PICKER-cell .PICKER-over {display: none;} #PICKER_WIDGETS .PICKER-cell:hover .PICKER-over {display: block;} #PICKER_WIDGETS .PICKER-cell .PICKER-over .PICKER-btn {width: 60px; height: 34px; padding: 0; position: absolute; left: 50%; top: 50%; margin: -18px 0 0 -31px; line-height: 34px; box-shadow: 0 0 0 2px rgba(255,255,255,.2); font-size: 16px;} #PICKER_WIDGETS .PICKER-cell.PICKER-long .PICKER-img-holder {height: 600px;} #PICKER_WIDGETS .PICKER-cell.PICKER-long .PICKER-img-holder:after {content: ""; display: block; position: absolute; width: 236px; height: 12px; left: 0; bottom: 0; background: url(//PICKER.com/img/widgets/long_image_shadow_2.png) repeat-x 4px top;} #PICKER_WIDGETS .PICKER-cell img {width: 236px; display: block;} #PICKER_WIDGETS .PICKER-cell .PICKER-size {margin: 8px 16px; font-size: 12px; color: #999} #PICKER_WIDGETS .PICKER-cell .PICKER-description {display: block; width: 202px; margin: 0 6px 6px; padding: 6px 10px; border: 0; resize: none; outline: 0; border: 1px solid transparent; line-height: 18px; font-size: 13px; overflow: hidden; word-wrap: break-word; background: url(//PICKER.com/img/widgets/icon_edit.png) 500px center no-repeat;} #PICKER_WIDGETS .PICKER-cell:hover .PICKER-description {background-color: #fff9e0; background-position: right top;} #PICKER_WIDGETS .PICKER-cell .PICKER-description:focus {background-color: #F9F9F9; background-position: 500px center;} #PICKER_WIDGETS .PICKER-cell .PICKER-select-btn {width: 34px; height:34px; background: url(//PICKER.com/img/widgets/checkbox.png) 0 0 no-repeat; position: absolute; right: 5px; top: 5px; cursor: pointer;} #PICKER_WIDGETS .PICKER-cell .PICKER-pinned-label {position: absolute; left: 0; top: 10px; height: 24px; line-height: 24px; padding: 0 10px; background: #CE0000; background: rgba(200, 0, 0, 0.9); color: white; font-size: 12px; display: none;} #PICKER_WIDGETS .PICKER-cell.PICKER-pinned .PICKER-pinned-label {display: block;} #PICKER_WIDGETS .PICKER-selected .PICKER-select-btn {background-position: 0 -40px;} #PICKER_WIDGETS .PICKER-multi .PICKER-cell .PICKER-img-holder {cursor: pointer;} #PICKER_WIDGETS .PICKER-multi .PICKER-cell .PICKER-cell-pin-btn {display: none;} #PICKER_WIDGETS .PICKER-multi .PICKER-cell .PICKER-over {display: block;} #PICKER_WIDGETS .PICKER-header .PICKER-multi-buttons {position: absolute; top: 10px; left: 0; display: none;} #PICKER_WIDGETS .PICKER-header .PICKER-multi-buttons .PICKER-btn {margin-right: 10px;} #PICKER_WIDGETS .PICKER-header .PICKER-multi-noti {display: none; height: 50px; line-height: 50px; text-align: center; font-size: 16px; color: #999; font-weight: bold;} #PICKER_WIDGETS .PICKER-header .PICKER-multi-noti span {font-weight: normal;} #PICKER_WIDGETS .PICKER-header .PICKER-multi-noti i {font-style: normal;} #PICKER_WIDGETS .PICKER-header .PICKER-notice {padding: 0 10px; height:30px; line-height: 30px; position: absolute; left: 50%; top: 10px; margin-left: -83px; background: #fff9e2; text-align: center;} #PICKER_WIDGETS .PICKER-header .PICKER-notice i {display: inline-block; width: 18px; height: 18px; background: url(//PICKER.com/img/widgets/icon_notice.png) 0 0 no-repeat; vertical-align: top; margin: 6px 6px 0 0;} #PICKER_WIDGETS .PICKER-switcher {height: 50px; width: 100px; position: relative;} #PICKER_WIDGETS .PICKER-switcher .PICKER-title {position: absolute; right: 75px; top: 13px; color: #999; white-space: nowrap; line-height: 24px; opacity: 0; visibility: hidden;} #PICKER_WIDGETS .PICKER-switcher:hover .PICKER-title {visibility: visible; opacity: 1; -webkit-transition: opacity .2s linear; -webkit-transition-delay: .2s; transition: opacity .2s linear; transition-delay: .2s;} #PICKER_WIDGETS .PICKER-switcher .PICKER-bar {width: 40px; height: 24px; background: #EB595F; border-radius: 12px; color: white; position: absolute; right: 0; top: 13px; cursor: pointer; font-size: 14px; -webkit-transition: all .2s linear; transition: all .2s linear;} #PICKER_WIDGETS .PICKER-switcher:hover .PICKER-bar {width: 64px;} #PICKER_WIDGETS .PICKER-switcher.PICKER-on .PICKER-bar {background: #7DD100;} #PICKER_WIDGETS .PICKER-switcher .PICKER-bar .PICKER-round {width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; left: 2px; top: 2px; -webkit-transition: left .2s linear; box-shadow: 0px 0px 3px rgba(0,0,0,0.15); transition: left .2s linear; box-shadow: 0px 0px 3px rgba(0,0,0,0.15);} #PICKER_WIDGETS .PICKER-switcher.PICKER-on .PICKER-bar .PICKER-round {left: 17px;} #PICKER_WIDGETS .PICKER-switcher.PICKER-on:hover .PICKER-bar .PICKER-round {left: 41px;} #PICKER_WIDGETS .PICKER-switcher .PICKER-bar .PICKER-text-1 {height: 24px; line-height: 24px; position: absolute; right:17px; top: 0; opacity: 0; visibility: hidden; -webkit-transition: all .2s linear; transition: all .2s linear;} #PICKER_WIDGETS .PICKER-switcher:hover .PICKER-bar .PICKER-text-1 {right: 9px; opacity: 1; visibility: visible;} #PICKER_WIDGETS .PICKER-switcher.PICKER-on:hover .PICKER-bar .PICKER-text-1 {right: 17px; opacity: 0; visibility: hidden;} #PICKER_WIDGETS .PICKER-switcher .PICKER-bar .PICKER-text-2 {height: 24px; line-height: 24px; position: absolute; left:17px; top: 0; opacity: 0; visibility: hidden; -webkit-transition: all .2s linear; transition: all .2s linear;} #PICKER_WIDGETS .PICKER-switcher:hover .PICKER-bar .PICKER-text-2 {left: 17px; opacity: 0; visibility: hidden;} #PICKER_WIDGETS .PICKER-switcher.PICKER-on:hover .PICKER-bar .PICKER-text-2 {left: 9px; opacity: 1; visibility: visible;} #PICKER_WIDGETS .PICKER-header .PICKER-switcher {position: absolute; right: 0; top: 0;} <!--[if IE 6]>#PICKER_WIDGETS .PICKER-red-normal-icon-button, .PICKER-red-large-icon-button, .PICKER-red-small-icon-button, .PICKER-white-normal-icon-button, .PICKER-white-large-icon-button, .PICKER-white-small-icon-button { background-image: url({{imgBase}}/widget_icons_ie6.png) <![endif]--></style></div>'
    var pickHtml = '<div class="PICKER-f-button">采集</div>' + 
    '<style>.PICKER-f-button { position: absolute; display: none; z-index: 9999999999998; box-shadow: 0 0 0 2px rgba(255,255,255,.2); background: #aaa; background: rgba(0,0,0,.3); color: white; cursor: pointer; padding: 0 12px; height: 30px; line-height: 30px; border-radius: 2px; font-size: 14px;} .PICKER-f-button:hover {display:block !important; cursor:pointer; background:rgba(0,0,0,0.4)}</style>';
    $('body').append(pickHtml)
    $pickerView = $('.PICKER-f-button')
    $pickerView.click(function() {
        console.log("url-->" + selectedUrl);
        console.log(chrome.downloads)
        chrome.downloads.download({url: selectedUrl}, function(id){});
    })
}

appendPicker();