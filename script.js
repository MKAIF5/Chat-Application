import {
    db,
    ref,
    set,
    remove,
    onChildAdded,
    onChildRemoved
} from "./firebase.js";

const msgText = document.querySelector("#msg-text")
let sender;

if (sessionStorage.getItem("sender")) {
    sender = sessionStorage.getItem("sender")
}

else {
    sender = prompt("PLEASE ENTER YOUR NAME");
    sessionStorage.setItem("sender", sender)
}

module.sendMsg = function sendMsg() {
    let msg = msgText.value;
    let timeStamp = new Date().getTime()
    set(ref(db, 'messages/' + timeStamp), {
        msg : msg,
        sender : sender
    });
}

onChildAdded(ref(db, "messages"), (data) => {
    if (data.val().sender == sender) {
        message.innerHTML += `
        <div style="justify-content: end; " class="outer" id="${data.key}">
        <div id="inner" class="me">YOU : ${data.val().msg} <button id="dltMsg" onclick="module.dltMsg(${data.key})">DELETE</button> </div>
    </div>`
    }
    else {
        message.innerHTML += `
        <div id="${data.key}" class="outer">
        <div id="inner" class="notMe">${data.val().sender} : ${data.val().msg}</div>
    </div>`
    }
});

module.dltMsg = function dltMsg(key) {
    remove(ref(db, "messages/" + key))
}

onChildRemoved(ref(db, "messages"), (data) => {
    let msgBox = document.getElementById(data.key);
    message.removeChild(msgBox);
});