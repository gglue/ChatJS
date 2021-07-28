class ChatRoomUI{

    constructor(logs){
        this.logs = logs;
    }

    render(data){
        // Format for each chat message
        const time = dateFns.distanceInWordsToNow(
            data.sentAt.toDate(),
            {addSuffix: true}
        );
        const html = 
            `<li class="list-group-item">
                <span><b>${data.name}:</b></span>
                <span>${data.text}</span>
                <div class = "sentAt">${time}</span>
            </li>
            `;
        this.logs.innerHTML += html;

    }
}