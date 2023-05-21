document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("open-btn").addEventListener("click", function () {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {type: "open"});
        });
    });
});