browser.contextMenus.create({
  id: "search-perplexity",
  title: "Search with Perplexity",
  contexts: ["selection", "image"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "search-perplexity") {
    if (info.selectionText) {
      // Textbasierte Suche
      searchWithText(info.selectionText);
    } else if (info.srcUrl) {
      // Bildbasierte Suche
      searchWithImage(info.srcUrl);
    }
  }
});

function searchWithText(text) {
  let url = `https://www.perplexity.ai/search?q=${encodeURIComponent(text)}`;
  browser.tabs.create({ url });
}

function searchWithImage(imageUrl) {

  let url = `https://www.perplexity.ai/search?q=${encodeURIComponent(imageUrl)}`;
  browser.tabs.create({ url });
}

function fetchImageContent(url) {
  return fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }));
}