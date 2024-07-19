browser.contextMenus.create({
  id: "search-perplexity",
  title: "Mit Perplexity suchen",
  contexts: ["image"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "search-perplexity") {
    if (info.srcUrl) {
      // Bild-URL-basierte Suche
      searchWithImageUrl(info.srcUrl);
    } else {
      // Inhaltsbasierte Suche
      fetchImageContent(info.srcUrl).then(imageData => {
        searchWithImageContent(imageData);
      });
    }
  }
});

function searchWithImageUrl(url) {
  let searchUrl = `https://www.perplexity.ai/search?q=${encodeURIComponent(url)}`;
  browser.tabs.create({ url: searchUrl });
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

function searchWithImageContent(imageData) {
  // Hier müssten Sie die API von Perplexity anpassen, um Bilddaten zu akzeptieren
  let searchUrl = `https://www.perplexity.ai/image-search?data=${encodeURIComponent(imageData)}`;
  browser.tabs.create({ url: searchUrl });
}
