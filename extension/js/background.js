//background.js will send message to popup.js, popup.js will update popup.html

//interval is the time between breaks
let interval = 1;
let breaktime = new Date();
//Start the study timer
//startTimer(interval);
var countdown = 0

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

function resetTimer() {
  console.log("RESET CALLED.")
  clearInterval(countdown);
  breaktime.setMinutes(0);
  breaktime.setHours(0);
  breaktime.setSeconds(0);
  chrome.runtime.sendMessage({
    study: true, 
    time: {
        h: 0,
        m: 0,
        s: 0
    }
  });
}

function startTimer(n) {
  if(n == "" || n == null)
    {n = 25
    }
  console.log("New Duration "+n);
  
  //Add amount of minutes to current time for next study break
  console.log("DEBUG")
  var date = new Date();
  breaktime = date;
  console.log("RESET BREAK TIME IS" + breaktime);
  console.log(date);
  //console.log(date.getMinutes());
  breaktime = addMinutes(breaktime, n);

  // Start the countdown
  countdown = setInterval(function() {
    // Get today's date and time
    var now = new Date();
    console.log(breaktime + 'is breaktime')
    console.log(now + 'is now')
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
      console.log("entered else.. ")
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
});

