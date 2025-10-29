chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("📩 Message received:", message);

    if (message.action === "checkUrl") {
        console.log("🌐 Sending URL to backend:", message.url);

        fetch("http://localhost:8000/api/check-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: message.url,
                timestamp: Date.now(),
                user_agent: navigator.userAgent,
                referrer: message.referrer || "",
                tab_id: sender.tab?.id ?? 0,
                screen_resolution: message.screen_resolution || "1920x1080"
            })
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("✅ Backend Response:", data);

            const score = Number(data?.prediction?.SCORE ?? 0);
            const THRESHOLD = 110;
            const isPhishing = score <= THRESHOLD;

            console.log(`🎯 Result for ${message.url} → Score: ${score} → ${isPhishing ? "⚠️ PHISHING" : "✅ SAFE"}`);

            const TRANSPARENT_ICON_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

            const notificationOptions = {
                type: "basic",
                // --- FIX: iconUrl is MANDATORY, so we must add a local icon file path ---
                iconUrl: TRANSPARENT_ICON_URL , 
                // ------------------------------------------------------------------------
                title: isPhishing ? "⚠️ Phishing Alert!" : "✅ Safe Website",
                message: isPhishing
                    ? `This site may be unsafe.\nScore: ${score}`
                    : `This site appears safe.\nScore: ${score}`
            };

            chrome.notifications.create(notificationOptions);

            sendResponse({
                status: "ok",
                is_phishing: isPhishing,
                confidence: score
            });
        })
        .catch(error => {
            console.error("❌ Fetch error:", error);
            sendResponse({ status: "error", is_phishing: false, confidence: 0, error: error.message });
        });

        return true; // keep sendResponse alive
    }
});
