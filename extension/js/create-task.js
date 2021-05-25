
window.onload=function(){
    document.getElementById('submit').addEventListener('click',function(){
        chrome.browserAction.setPopup({
            popup:"popup.html"
            });
        window.location.href = 'popup.html';
    });
};
