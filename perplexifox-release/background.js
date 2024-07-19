browser.contextMenus.create({
  id: "search-perplexity",
  title: "Mit Perplexity suchen",
  contexts: ["selection", "image"],
  icons: {
    "16": "../icons/icon-16.png",
    "32": "../icons/icon-32.png",
    "48": "../icons/icon-48.png"

  }
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "search-perplexity") {
    let query = info.selectionText || info.srcUrl;
    let url = `https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`;
    browser.tabs.create({ url });
  }
});

