window.onload=function(){
    document.getElementById('public').addEventListener('click',function(){
        //This should link to specific room
        chrome.tabs.create({ url: "https://us05web.zoom.us/s/88665556787?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiI4M2NtcG9ucVItQ295bHRLQUYzbGV3IiwiaXNzIjoid2ViIiwic3R5IjoxMDAsIndjZCI6InVzMDUiLCJjbHQiOjAsInN0ayI6InJsbU5NMGtVeHpPX0l2Y1poQjVES1ljU05YQzI0anVGcWY1R3pCQW02NzguQmdZZ1p6Qk1kRFprUjBKNVptRTRNeXN3VkhaeFdXSktiRUkzTjFWWlNUTjRLMkZBTTJNd05HRTFZakUxTVRNeE9URXlNamRrTkRNM1pHWmhZbUUwWkRKak9XVTVPREJsTURRNFltTXlNV0l6TWpsaFpHWXlNemt6TmpWbE16SXdObUl6TkFBZ01HcHFRblpQTUhadlJubDNRelZJU2pKeE1GTnRWMUEyZGk5b0x6Y3ZSR29BQkhWek1EVUFBQUY1bzRHY09RQVNkUUFBQUEiLCJleHAiOjE2MjE5NTMwNTAsImlhdCI6MTYyMTk0NTg1MCwiYWlkIjoiZlNPaDduMU5Rb1NLQXlWSlV5WEZnQSIsImNpZCI6IiJ9.uNqg-NkqcgcJIarIzkvJv5Nf87tHqh23cmVnwlI2mhI" });
    });
    document.getElementById('space').addEventListener('click',function(){
        chrome.tabs.create({ url: "https://studymates.davidphan.info/my-groups/" });
    });
};

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


function getTasks(){
    //Send AJAX request to retrieve task list
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://studymates.davidphan.info/wp-json/api/v1/tasks', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        var tasks = JSON.parse(this.responseText);
        if(tasks!='{}'){
            loadTasks(tasks);
        }
    };
    xhr.send('user=test');
  
  }
getTasks();



function removeTask(x){
    //Send AJAX request to retrieve task list
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://studymates.davidphan.info/wp-json/api/v1/remove-task', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        window.location.reload();
    };
    xhr.send('user=test&id='+x);
}


function completeTask(x){
    //Send AJAX request to retrieve task list
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://studymates.davidphan.info/wp-json/api/v1/complete-task', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        window.location.reload();
    };
    xhr.send('user=test&id='+x);
}


function loadTasks(tasks){
    var html = "";
    //Create the tasks with buttons
    for (i in tasks) {
        var task = tasks[i]
        html += "<div class='task'><button class='btn-remove' id='rm"+task.task_id+"'>x</button><span>"+task.task_name+"</span><button class='btn-complete' id='cmp"+task.task_id+"'>&#10004;</button></div>";
    }
    document.getElementById("display-tasks").innerHTML = html;

    //Since we cannot do inline js we need to add listeners after
    for (i in tasks) {
        var task = tasks[i];
        addListeners(task.task_id);
    }
}

function addListeners(x) {
    document.getElementById('rm'+x).addEventListener('click',function(){
        removeTask(x);
    });
    document.getElementById('cmp'+x).addEventListener('click',function(){
        completeTask(x);
     });
}





