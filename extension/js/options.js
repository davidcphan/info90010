var background = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('timerSet');
    // onClick's logic below:
    link.addEventListener('click', function() {
      
      timerDuration = document.getElementById('timerValue').value;
      console.log("Change in Timer Setting "+timerDuration+" minutes");
      //background.resetTimer();
      background.startTimer(timerDuration);
    });
  });