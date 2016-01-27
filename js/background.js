// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
 */
function getClickHandler() {
  return function(info, tab) {
    // The srcUrl property is only available for image elements.
    console.log("url-->" + info.srcUrl);
    chrome.downloads.download({url: info.srcUrl}, function(id) {

	  });
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
