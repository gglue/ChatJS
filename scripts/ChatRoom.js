class ChatRoom{

    constructor(room, name){
        this.room = room;
        this.name = name;
        this.chatLogs = database.collection('chat-logs');
    }

    // We will format the message in this function and also add to the database
    async addToChat(text){
        // Format the message
        const currentTime = new Date();
        const message = {
            name: this.name,
            room: this.room,
            sentAt: firebase.firestore.Timestamp.fromDate(currentTime),
            text
        };

        // Add to database
        const response = await this.chatLogs.add(message);
        return response;
    }
}