(function () {

  var selectedUrl
  var $pickerView
  var MIN_WIDTH = 200
  var MIN_HEIGHT = 200
  var $body = $('body');

  function bigImg(x) {
    x.height = x.height + 5;
    x.width = x.width + 5
  }

  function normalImg(x) {
    x.height = x.height - 5;
    x.width = x.width - 5;
  }

  function over_image(e) {
    var image = this;

    if (image.width < MIN_WIDTH || image.height < MIN_HEIGHT) {
      return
    }
    if (!e) {
      e = window.event;
    }
    //console.log(this.src);
    selectedUrl = image.src
    var left = image.getBoundingClientRect().left + $body.scrollLeft() + 0;
    var top = image.getBoundingClientRect().top + $body.scrollTop() + 0;
    // console.log(left + ", " + top);
    $pickerView.css({
      display: 'block',
      left: left,
      top: top
    });

    //bigImg(this);
    // btn_move(this, e.clientX, e.clientY);
  }

  function out_image(e) {
    if (this.width < MIN_WIDTH || this.height < MIN_HEIGHT) {
      return
    }
    if (!e) {
      e = window.event;
    }
    //console.log(this.src);
    $pickerView.css('display', 'none')
    // normalImg(this);
    // btn_move(this, e.clientX, e.clientY);
  }

  function loadListeners() {
    $body.on('mouseenter', 'img', over_image);
    $body.on('mouseleave', 'img', out_image);
  }

  function appendPicker() {
    var pickHtml = '<div class="PICKER-f-button">采集</div>' +
      '<style>.PICKER-f-button { position: absolute; display: none; z-index: 9999999999998; box-shadow: 0 0 0 2px rgba(255,255,255,.2); background: #aaa; background: rgba(0,0,0,.3); color: white; cursor: pointer; padding: 0 12px; height: 30px; line-height: 30px; border-radius: 2px; font-size: 14px;} .PICKER-f-button:hover {display:block !important; cursor:pointer; background:rgba(0,0,0,0.4)}</style>';
    $body.append(pickHtml);
    $pickerView = $('.PICKER-f-button');
    $pickerView.click(function () {
      // chrome.downloads.download({url: selectedUrl}, function(id){});
      // 发送下载消息
      chrome.runtime.sendMessage({action: "download", data: selectedUrl}, function (response) {
        // console.log(response.data);
      });
    })
  }

  chrome.runtime.sendMessage({action: "is500px"}, function (response) {
    if (!response.data) {
      console.log("init");
      appendPicker();
      loadListeners();
    }
  });
}());