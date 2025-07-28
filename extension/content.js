chrome.runtime.sendMessage({ 
    action: "checkUrl", url: window.location.href,
    referrer: document.referrer,
    screen_resolution: `${window.screen.width}x${window.screen.height}`
 }, (response) => {
    console.log(response)
    if (response.is_phishing === true) {
        alert("⚠️ Warning: This website may be a phishing site!");
    }
    else (response.is_phishing === false) 
    {
        alert("✅ This website is safe.");
    }
});
