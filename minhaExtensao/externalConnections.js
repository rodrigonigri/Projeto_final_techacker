var endereco = Array.prototype.map.call(
    document.querySelectorAll("link, img, script, iframe"),
    function(e) {
        return e.href || e.src; 
    }
);


browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method === "external"){
        sendResponse({data: endereco});}
    else if (request.method === "localstorage"){
        sendResponse({data: Object.entries(localStorage)})
    }
    else if (request.method === "sessionstorage"){
        sendResponse({data: Object.entries(sessionStorage)})
    }
    else 
        sendResponse({data: undefined})
    return true
  });