//background.js will send message to popup.js, popup.js will update popup.html

//interval is the time between breaks
let interval = 25;

//Start the study timer
startTimer(interval);

function startTimer(n) {
  let breaktime = new Date();
  //Add amount of minutes to current time for next study break
  breaktime.setMinutes(breaktime.getMinutes() + interval);

  // Start the countdown
  var countdown = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();
    var distance = breaktime - now;
    // Time calculations for hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // If the count down is finished stop updating
    if (distance<0) {
      //stop this recurring function
      clearInterval(countdown);
      // Open break popup
      window.open("break.html", "_blank", "fullscreen=yes");
    }
    else {
      // Send time to popup.js
      chrome.runtime.sendMessage({
        study: true, 
        time: {
            h: hours,
            m: minutes,
            s: seconds
        }
      });
      
    }
  }, 1000);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if(message.restart){
    startTimer(interval);
  }
  else if(message.home){
    window.location.href="popup.html";
  }
});
