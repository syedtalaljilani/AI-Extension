// background.js
// Register persistent event listeners
chrome.runtime.onInstalled.addListener(() => {
  console.log('Service worker activated');
});

// Add regular keep-alive pings
setInterval(() => {
  console.log('Service worker heartbeat');
}, 30 * 1000); // 30 seconds