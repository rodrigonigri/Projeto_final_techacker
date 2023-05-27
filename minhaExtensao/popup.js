document.addEventListener("DOMContentLoaded", function() {
  var cookiesButton = document.getElementById("cookiesButton");
  var externalButton = document.getElementById("externalButton");
  var sessionButton = document.getElementById("sessionButton");
  var localButton = document.getElementById("localButton");
  var cookieList = document.getElementById("cookie-list");
  var externalList = document.getElementById("rd");
  var sessionStorageList = document.getElementById("sessionstorage");
  var localStorageList = document.getElementById("localstorage");

  cookiesButton.addEventListener("click", function() {
    cookieList.style.display = cookieList.style.display === "none" ? "block" : "none";
  });

  externalButton.addEventListener("click", function() {
    externalList.style.display = externalList.style.display === "none" ? "block" : "none";
  });

  sessionButton.addEventListener("click", function() {
    sessionStorageList.style.display = sessionStorageList.style.display === "none" ? "block" : "none";
  });

  localButton.addEventListener("click", function() {
    localStorageList.style.display = localStorageList.style.display === "none" ? "block" : "none";
  });
});


function showCookiesForTab(tabs) {
     let tab = tabs.pop();
  
     var allCookies = browser.cookies.getAll({url: tab.url});
     allCookies.then((cookies) => {
  
      var tabUrl = document.getElementById('header-title');
      var content = document.createTextNode(tab.title);
      var listCookies = document.getElementById('cookie-list');
      tabUrl.appendChild(content);


      var size = document.getElementById('cookiesId');
      var content = document.createTextNode(cookies.length);
      var listCookies = document.getElementById('cookie-list');
      size.appendChild(content);
  
       if (cookies.length > 0) {
         for (let cookie of cookies) {
           let li_tag = document.createElement("li");
           let content = document.createTextNode(cookie.name + ": "+ cookie.value);
           li_tag.appendChild(content);
           listCookies.appendChild(li_tag);
         }
         var urls = Array.prototype.map.call(
           document.querySelectorAll("link, img, script, iframe"), 
           function(e) {
               return e.href || e.src; 
           });
  
       } 
       else {
         let p_tag = document.createElement("p");
         let content = document.createTextNode("No cookies in this tab.");
         let parent = listCookies.parentNode;
  
         p_tag.appendChild(content);
         parent.appendChild(p_tag);
       }
       browser.tabs.sendMessage(tabs[0].id, {method: "getRequests"}).then(response => {
         let p_tag = document.createElement("p");
         let content = document.createTextNode("Requests: " + response.requests.length + " - External: " + response.external.length + " - Internal: " + response.internal.length + " - Total: " + response.total.length);
         let parent = listCookies.parentNode;
    
         p_tag.appendChild(content);
         parent.appendChild(p_tag);});
     });
  
   }
  
   async function showExternalConnections(tabs){
      
    let tab = tabs.pop();
  
     var itemList = document.getElementById('rd');
  
  
     const itens = await browser.tabs.sendMessage(
      tab.id,
      {method: "external"}
    )

    var size = document.getElementById('externalId');
    var text = document.createTextNode(itens.data.length);
      size.appendChild(text);
  
    if (itens.data.length > 0) {
      for (let item of itens.data) {
        if (item != "") {
          let li_tag = document.createElement("li");
          let content = document.createTextNode(item);
          li_tag.appendChild(content);
          itemList.appendChild(li_tag);}
      }
    } 
    else {
      let p_tag = document.createElement("p");
      let content = document.createTextNode("No storage in this tab.");
      let parent = itemList.parentNode;
  
      p_tag.appendChild(content);
      parent.appendChild(p_tag);
    }
  
  }
  
  async function showLocalStorage(tabs){
      
      let tab = tabs.pop();
  
       var itemList = document.getElementById('localstorage');
  
  
       const itens = await browser.tabs.sendMessage(
        tab.id,
        {method: "localstorage"}
      )
  
      if (itens.data.length > 0) {
        for (let item of itens.data) {
          if (item != undefined) {
            let li_tag = document.createElement("li");
            let content = document.createTextNode(item);
            li_tag.appendChild(content);
            itemList.appendChild(li_tag);}
        }
      } 
      else {
        let p_tag = document.createElement("p");
        let content = document.createTextNode("No storage connections in this tab.");
        let parent = itemList.parentNode;
  
        p_tag.appendChild(content);
        parent.appendChild(p_tag);
      }
  
  }
  
  async function showSessionStorage(tabs){
      
    let tab = tabs.pop();
  
     var itemList = document.getElementById('sessionstorage');
  
  
     const itens = await browser.tabs.sendMessage(
      tab.id,
      {method: "sessionstorage"}
    )
  
    if (itens.data.length > 0) {
      for (let item of itens.data) {
        if (item != undefined) {
          let li_tag = document.createElement("li");
          let content = document.createTextNode(item);
          li_tag.appendChild(content);
          itemList.appendChild(li_tag);}
      }
    } 
    else {
      let p_tag = document.createElement("p");
      let content = document.createTextNode("No storage connections in this tab.");
      let parent = itemList.parentNode;
  
      p_tag.appendChild(content);
      parent.appendChild(p_tag);
    }
  
  }
  
  function getActiveTab() {
    return browser.tabs.query({currentWindow: true, active: true});
  }
  
  getActiveTab().then(showCookiesForTab) 
  getActiveTab().then(showExternalConnections)
  getActiveTab().then(showLocalStorage) 
  getActiveTab().then(showSessionStorage)
