browser.contextMenus.create({
    id: "search-perplexity",
    title: "Mit Perplexity suchen",
    contexts: ["selection", "image"]
  });
  
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "search-perplexity") {
      let query = info.selectionText || info.srcUrl;
      let url = `https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`;
      browser.tabs.create({ url });
    }
  });
  
