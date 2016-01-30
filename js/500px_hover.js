(function () {

  var selectedUrl
  var $pickerView
  var MIN_WIDTH = 200
  var MIN_HEIGHT = 200
  var $body = $('body');

  function over_image(e) {
    var image = $(this).find('img')[0];

    if (image.width < MIN_WIDTH || image.height < MIN_HEIGHT) {
      return
    }
    if (!e) {
      e = window.event;
    }
    selectedUrl = image.src;
    // console.log(selectedUrl);
    var left = this.getBoundingClientRect().left + $body.scrollLeft() + 0;
    var top = this.getBoundingClientRect().top + $body.scrollTop() + 0;
    $pickerView.css({
      display: 'block',
      left: left,
      top: top
    });
  }

  function out_image(e) {
    if (!e) {
      e = window.event;
    }
    $pickerView.css('display', 'none')
  }

  function loadListeners() {
    $body.on('mouseenter', '.photo_thumbnail, .jg-entry, .entry-visible', over_image);
    $body.on('mouseleave', '.photo_thumbnail, .jg-entry, .entry-visible', out_image);
  }

  function downloadBigImage(selectedUrl, callback) {
    var photoId = getPhotoId(selectedUrl);
    $.get("https://api.500px.com/v1/photos/" + photoId, {
        image_size: 6,
        _method: "get",
        sdk_key: "edd6ed0389356e74aae866d908da619c3352f438",
        consumer_key: "F9DOz7poYksF07SCv89WWeDweVhmavoHcWnDCYmn"
      },
      function (data) {
        if (data.photo.image_url) {
          callback(data.photo.image_url)
        } else {
          callback(selectedUrl);
          console.log("pick small");
        }
      });

  }

  function getPhotoId(url) {
    var startIndex = url.indexOf('photo/') + "photo/".length;
    var str = url.substring(startIndex)
    var endIndex = str.indexOf("/");
    return str.substring(0, endIndex)
  }

  function appendPicker() {
    //var pickHtml = '<div class="pxdownloader_wrapper"><div class="pxdownloader_spinnerWrapper"><div class="pxdownloader_bg"></div><div class="pxdownloader_spinner"></div></div> <div class="pxdownloader_photo download" title="Download the image with 500px Photos Download!" style="opacity: 0.15;"></div> <div class="pxdownloader_photo new-tab" title="Open max resolution jpg image with 500px Photos Download!" style="opacity: 0.15;"></div> </div>'
    var pickHtml = '<div class="PICKER_500px-f-button">500采集</div>' +
      '<style>.PICKER_500px-f-button { position: absolute; display: none; z-index: 9999999999998; box-shadow: 0 0 0 2px rgba(255,255,255,.2); background: #aaa; background: rgba(0,0,0,.3); color: white; cursor: pointer; padding: 0 12px; height: 30px; line-height: 30px; border-radius: 2px; font-size: 14px;} .PICKER_500px-f-button:hover {display:block !important; cursor:pointer; background:rgba(0,0,0,0.4)}</style>';

    $body.append(pickHtml);
    $pickerView = $('.PICKER_500px-f-button');
    $pickerView.click(function () {
      // chrome.downloads.download({url: selectedUrl}, function(id){});
      downloadBigImage(selectedUrl, function (url) {
        // 发送下载消息
        chrome.runtime.sendMessage({action: "download", data: url}, function (response) {
          // console.log(response.data);
        });
      });

    })
  }

  chrome.runtime.sendMessage({action: "is500px"}, function (response) {
    if (response.data) {
      console.log("init");
      appendPicker();
      loadListeners();
    }
  });

}());