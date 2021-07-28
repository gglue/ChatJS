// Check local storage for name
let username = localStorage.name;
if (!username){
    username = 'Guest';
}

// Check local storage for chosen channel
let channel = localStorage.channel;
if (!channel){
    channel = 'general';
}
// Create ChatRoom instance
const chatRoom = new ChatRoom(channel, username);

// Get the chat message div
const chatLogs = document.querySelector('.chat-list');

// Start the chatlogs at the bottom of the scroll
console.log(chatLogs.scrollTop);
console.log(chatLogs.scrollHeight);
chatLogs.scrollTop = chatLogs.scrollHeight;

// Create ChatroomUI instance
const chatRoomUI = new ChatRoomUI(chatLogs);

// Get the new message div
const newMessage = document.querySelector('.new-message');

// Sends message to Firebase and displays it
newMessage.addEventListener('submit', e => {
    e.preventDefault();
    const text = newMessage.message.value.trim();
    chatRoom.addToChat(text)
        .then(() => newMessage.reset())
        .catch(err => console.log(err));
});

// Get the name change input div
const nameChange = document.querySelector('.change-name');

// Get the name change notification div
const nameNotification = document.querySelector('.name-change');

// Changes name of the user and pops up notification
nameChange.addEventListener('submit', e =>{
    e.preventDefault();
    const text = nameChange.newName.value.trim();
    chatRoom.changeName(text);
    nameNotification.innerHTML = `Name is now ${text}`;
    // 3 seconds to show and then delete
    setTimeout(() => nameNotification.innerHTML = '', 3000);
    nameChange.reset();
});

// Get the series of button
const channelChange = document.querySelector('.channels');

// Changes channel based on button pressed
channelChange.addEventListener('click', e =>{
    if (e.target.tagName === 'BUTTON'){
        chatRoomUI.clear();
        chatRoom.changeChannel(e.target.getAttribute('id'));
        chatRoom.getChatLogs(chat => chatRoomUI.render(chat));
    }
});

//test.addToChat('I hate HoloLive!').then(()=> console.log("Success!")).catch(err => console.log(err));

// Print out chat-logs
chatRoom.getChatLogs(data => chatRoomUI.render(data));