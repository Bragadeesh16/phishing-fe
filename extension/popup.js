// This code goes in your popup.js

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const currentUrl = activeTab?.url;
    const tabId = activeTab?.id;
    
    // --- CRUCIAL FIX: Check for protected URLs ---
    if (!currentUrl || currentUrl.startsWith("chrome://") || currentUrl.startsWith("chrome-extension://")) {
        document.getElementById("status").innerText = "🛑 Cannot scan protected or internal pages.";
        // Send a message with placeholder data, or just stop here.
        // For simplicity, we'll stop the script and inform the user.
        return; 
    }
    // ---------------------------------------------

    // 1. Gather all necessary data from the popup/tab context
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    
    // 2. Execute script to get referrer
    chrome.scripting.executeScript(
        {
            target: { tabId: tabId },
            func: () => document.referrer
        },
        (injectionResults) => {
            const referrer = injectionResults?.[0]?.result || "";

            // 3. Send a robust message to the background with all required fields
            chrome.runtime.sendMessage({ 
                action: "checkUrl", 
                url: currentUrl,
                referrer: referrer,
                tab_id: tabId,
                screen_resolution: screenResolution
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.warn("⚠️ Runtime error (Background crash/timeout):", chrome.runtime.lastError.message);
                    document.getElementById("status").innerText = "Connection lost to background.";
                    return;
                }
        
                // 4. Handle response
                if (!response || response.status === "error") {
                    console.error("Background script error:", response?.error || "Unknown error.");
                    document.getElementById("status").innerText = "Error during check (Backend or Network issue).";
                    return;
                }
        
                const statusText = response.is_phishing
                    ? "⚠️ Phishing Detected!"
                    : "✅ Safe Website";
        
                document.getElementById("status").innerText = `${statusText}\nScore: ${response.confidence}`;
            });
        }
    );
});