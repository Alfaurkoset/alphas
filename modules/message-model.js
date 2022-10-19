class Message {
    constructor(author, time) {

        this.author = author;
        this.time = time;
        
        this.edits = {};
        this.content = undefined;
        this.message_id = undefined;
        this.published = false;
    }

    setContent(content) {
        if (this.content != undefined) {
            return new Error({code: 405, message:"Failed: Cannot set content, when it already exists."})
        }
        this.content = content;
    }

    modifyContent(newContent, author, time) {

        if(this.content == undefined) {
            return new Error({code: 405, message:"Failed: Cannot modify unexisting content."})
        }
        
        this.edits[time] = {
            author: author,
            oldContent: this.content,
            newContent: newContent,
            timestamp: time
        };
        this.content = newContent;
    }
   
    setPublishedStatus(newStatus) {
        if (this.published === newStatus) {return new Error({code: 409, message: "Confilct: Cannot set the status, to same as it is already."})}
        this.published = newStatus;
    }
    
    setMessageId(message_id) {
        if (this.message_id != undefined) {return new Error({ code: 405, message: "Failed: Cannot set the message_id, this can only be set once" })}
        this.message_id = message_id;
    }

    getMessageInformation() {
        return {message:{
            AUTHOR: this.author,
            CONTENT: this.content,
            EDITS: this.edits,
            PUBLISHED: this.published,
            MESSAGE_ID: this.message_id,
            TIMESTAMP: this.time
        }}
    }
}


module.exports = Message;