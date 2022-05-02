const pubsub = (function(){
    let queues = {};

    return {
        subscribe: function(messageName, callback){
            if(queues[messageName] === undefined){
                queues[messageName] = [];
            }
            queues[messageName].push(callback);
        },
        publish: function(messageName, message){
            queues[messageName].forEach(cb => {
                cb(message);
            });
        }
    }
})();