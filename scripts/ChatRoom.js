class ChatRoom{

    constructor(room, name){
        this.room = room;
        this.name = name;
        this.chatLogs = database.collection('chat-logs');
        this.unsub = null;
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

    // Changes the name of the user and stores it to browser
    changeName(name){
        this.name = name;
        localStorage.setItem('name', name);
    }

    // Changes the channel
    changeChannel(room){
        this.room = room;
        localStorage.setItem('channel', room);
        // Unsub from changes from previous channel
        if (this.unsub){
            this.unsub();
        }
    }

    // Check the database for new changes, specifically for new chat-logs
    getChatLogs(callback){
        // Set unsub value so we can unsubscribe for listening to changes later
        this.unsub = this.chatLogs
            // Only get logs for the relevant channel
            .where('room', '==', this.room)
            //ordered by sent-at property
            .orderBy('sentAt').limit(50)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change =>{
                    // use callback function to update the UI
                    if(change.type === 'added'){
                        callback(change.doc.data());
                    }
                });
            });
    }
}

