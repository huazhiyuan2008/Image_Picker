title: chrome插件入门
date: 2016-01-23 13:34:04
tags:
---

## debug
 location.reload(true)
 console.log() and console.error()

## 鼠标右键功能
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
    // The srcUrl property is only available for image elements.
    console.log("url-->" + info.srcUrl);
    alert(info.srcUrl)
  };
};

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "title" : "pick image",
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
下载单张图片，鼠标右键有时候还是显得麻烦，有没有更好的方式呢，答案是有的，利用鼠标滑过`onMouseOver`事件就能实现。当onMouseOver时，在图片旁边动态生成一个半透明pick按钮，点击按钮即可下载。 在Chrome插件中，需用到`content_scripts`，在`manifest.json`中加入

```
"content_scripts": [
    {
        "matches": ["*://*/*"],
        "js": ["js/hover.js"]
    }
]
```
`matches`为网站的正则表达是，如只想对某个网站使用，可配置成` "matches": ["*://*.baidu.com/*"]`


## Ref

[chrome extensions getstarted](https://developer.chrome.com/extensions/getstarted)

[chrome extensions api](https://developer.chrome.com/extensions/api_index)

[Chrome扩展及应用开发](http://www.ituring.com.cn/minibook/950)

[操作用户正在浏览的页面](http://www.ituring.com.cn/article/60212)

[常驻后台](http://www.ituring.com.cn/article/60242)

[image-picker](https://github.com/bluemirr5/image-picker)

[image-downloader](https://github.com/vdsabev/image-downloader)


