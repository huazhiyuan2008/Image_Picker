title: Chrome插件之Image Picker实战
date: 2016-01-23 13:34:04
tags:

- 图片采集 
- chrome

---

## Chrome Extension Debug
右上角插件图标右键，点击Inspect Popup。在console面板执行`location.reload(true)`
或者用`console.log()` `console.error()`打印日志

## 鼠标右键功能（ContextMenu）
在`manifest.json`中加入

```
"background" : { 
    "scripts": ["js/background.js"] 
}
```
background.js内容如下

```
function getClickHandler() {
  return function(info, tab) {
      chrome.downloads.download({url: info.srcUrl}, function(id) {
	
	  });
  };
};

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "title" : "Pick Image",
  "type" : "normal",
  "contexts" : ["image"],
  "onclick" : getClickHandler()
});

```

同时声明权限

```
"permissions": [
    "contextMenus"
]
```
`background.js`在后台监听，鼠标右键时就会触发`chrome.contextMenus.create`生成自定义的contextMenu

## 鼠标滑过onMouseOver功能
下载单张图片，鼠标右键有时候还是显得麻烦，有没有更好的方式呢，答案是有的，利用鼠标滑过`onMouseEnter`事件就能实现。当onMouseEnter时，在图片旁边动态生成一个半透明pick按钮，点击按钮即可下载。 在Chrome插件中，需用到`content_scripts`，在`manifest.json`中加入

```
"content_scripts": [
    {
        "matches": ["http://*/*", "https://*/*"],
        "js": ["js/hover.js"]
    }
]
```
`matches`为网站的正则表达是，如只想对某个网站使用，可配置成` "matches": ["*://*.baidu.com/*"]`


## 悬浮下载实现
`picker div`嵌入到网页后，监听点击事件调用`chrome.downloads.download({url: selectedUrl}, function(id){});`就能下载了？Too young too simple. chrome会报异常

```
Uncaught TypeError: Cannot read property 'download' of undefined
```

这个问题困扰好久，google一下发现js实现下载竟然也不是见容易的事。直到追踪别的插件实现，发现`chrome.runtime.sendMessage`函数，原来Chrome为了安全性，**[Web Page不能直接调用extension的函数](https://developer.chrome.com/extensions/messaging)**，跨Web Page和Extension间通讯需通过监听和发送`message`。

`picker div` onClick事件

```
// 发送下载消息
chrome.runtime.sendMessage({action: "download", data: selectedUrl}, function(response) {
   
});
```

background.js中监听事件，执行下载

```
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.action == "download") {
      chrome.downloads.download({url: request.data}, function(id) { });
    }
  });
```

## Ref

[chrome extensions getstarted](https://developer.chrome.com/extensions/getstarted)

[chrome extensions api](https://developer.chrome.com/extensions/api_index)

[Chrome扩展及应用开发](http://www.ituring.com.cn/minibook/950)

[操作用户正在浏览的页面](http://www.ituring.com.cn/article/60212)

[常驻后台](http://www.ituring.com.cn/article/60242)

[Message Passing](https://developer.chrome.com/extensions/messaging)

[image-picker](https://github.com/bluemirr5/image-picker)

[image-downloader](https://github.com/vdsabev/image-downloader)


