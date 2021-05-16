//Send message to background that popup is open
//chrome.runtime.sendMessage({popupOpen: true});

//Recieve time values from background.js and update the popup html
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //If it is study time update time
        if (request.study) {
            document.getElementById("hours").innerHTML = request.time.h;
            document.getElementById("mins").innerHTML = request.time.m;
            document.getElementById("secs").innerHTML = request.time.s;
        }
    }
);