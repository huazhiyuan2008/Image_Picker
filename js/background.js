// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
 */
function getClickHandler() {
  return function(info, tab) {
    console.log("url-->" + info.srcUrl);
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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.action == "download") {
      chrome.downloads.download({url: request.data}, function(id) {});
      sendResponse({data: "goodbye"});
    } else if (request.action == "tabUrl") {
      sendResponse({data:sender.tab.url})
    } else if (request.action == "is500px") {
      sendResponse({data: sender.tab.url.startsWith('https://500px.com')})
    }
  });
