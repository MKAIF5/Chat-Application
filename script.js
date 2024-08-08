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
        msg: msg,
        sender: sender
    });
}

onChildAdded(ref(db , "messages") , (data) => {
    console.log(data.val().sender + ":" + data.val().msg);
});