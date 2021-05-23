//Send message to background that popup is open
//chrome.runtime.sendMessage({popupOpen: true});

//Recieve time values from background.js and update the popup html
//document.addEventListener('DOMContentLoaded', onInit, false);
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("reset").addEventListener("click", function () {

        var background = chrome.extension.getBackgroundPage();
        background.resetTimer();

    });
});
chrome.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {
        console.log('popup listening');
        //If it is study time update time
        if (request.study) {
            console.log("study timer working inside popup.js")
            document.getElementById("hours").innerHTML = request.time.h;
            document.getElementById("mins").innerHTML = request.time.m;
            document.getElementById("secs").innerHTML = request.time.s;
        }
    }
);