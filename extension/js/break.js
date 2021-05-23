window.onload=function(){
    document.getElementById("close").addEventListener("click", function(){

        chrome.runtime.sendMessage({restart: true});
        window.close();
    
    });
   


    
}