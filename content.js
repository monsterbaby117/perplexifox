browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "search") {
      let url = `https://www.perplexity.ai/search?q=${encodeURIComponent(message.query)}`;
      window.open(url, '_blank');
    }
  });