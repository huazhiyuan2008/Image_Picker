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
  var left = image.getBoundingClientRect().left + $body.scrollLeft() + 0;
  var top = image.getBoundingClientRect().top + $body.scrollTop() + 0;
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

loadListeners();

function appendPicker() {
  //var pickHtml = '<div class="pxdownloader_wrapper"><div class="pxdownloader_spinnerWrapper"><div class="pxdownloader_bg"></div><div class="pxdownloader_spinner"></div></div> <div class="pxdownloader_photo download" title="Download the image with 500px Photos Download!" style="opacity: 0.15;"></div> <div class="pxdownloader_photo new-tab" title="Open max resolution jpg image with 500px Photos Download!" style="opacity: 0.15;"></div> </div>'
  var pickHtml = '<div class="PICKER-f-button">采集</div>' +
    '<style>.PICKER-f-button { position: absolute; display: none; z-index: 9999999999998; box-shadow: 0 0 0 2px rgba(255,255,255,.2); background: #aaa; background: rgba(0,0,0,.3); color: white; cursor: pointer; padding: 0 12px; height: 30px; line-height: 30px; border-radius: 2px; font-size: 14px;} .PICKER-f-button:hover {display:block !important; cursor:pointer; background:rgba(0,0,0,0.4)}</style>';

  $body.append(pickHtml);
  $pickerView = $('.PICKER-f-button');
  $pickerView.click(function() {
    // chrome.downloads.download({url: selectedUrl}, function(id){});
    // 发送下载消息
    chrome.runtime.sendMessage({action: "download", data: selectedUrl}, function(response) {
      // console.log(response.data);
    });
  })
}

appendPicker();
