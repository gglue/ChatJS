// Create ChatRoom instance
const chatRoom = new ChatRoom('general', 'Victor');

// Get the chat message div
const chatLogs = document.querySelector('.chat-list');

// Create ChatroomUI instanec
const chatRoomUI = new ChatRoomUI(chatLogs);

//test.addToChat('I hate HoloLive!').then(()=> console.log("Success!")).catch(err => console.log(err));

// Print out chat-logs in console
chatRoom.getChatLogs(data => chatRoomUI.render(data));