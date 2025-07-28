chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.runtime.sendMessage({ action: "checkUrl", url: tabs[0].url }, (response) => {
        document.getElementById("status").innerText = 
            response.is_phishing === true? "Phishing Detected!" : "Safe Website";
    });
});
