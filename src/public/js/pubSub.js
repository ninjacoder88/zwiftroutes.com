const pubsub = (function(){
    let queues = {};

    return {
        subscribe: function(messageName, callback){
            console.log(`Subscribe ${messageName}`);

            if(queues[messageName] === undefined){
                queues[messageName] = [];
            }
            queues[messageName].push(callback);
        },
        publish: function(messageName, message){
            console.log(`Publish ${messageName}`);

            queues[messageName].forEach(cb => {
                cb(message);
            });
        }
    }
})();