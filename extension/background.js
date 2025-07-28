chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkUrl") {
        fetch("http://localhost:8000/api/check-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: message.url,
                timestamp: Date.now(),
                user_agent: navigator.userAgent,
                referrer: message.referrer, // Now received from content.js
                tab_id: sender.tab.id,
                cookies_enabled: navigator.cookieEnabled,
                screen_resolution: message.screen_resolution // Now received from content.js
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            sendResponse({ is_phishing: data?.prediction?.SCORE <= 110, confidence: data?.prediction?.SCORE })
        })
        .catch(error => sendResponse({ status: "error", confidence: 0 }));

        console.log("inside the extension")
        return true; // Keeps the sendResponse function open for async calls
    }
});
