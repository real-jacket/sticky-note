let EventHub = (function () {
    let events = {}

    function on(eventName,handler) {
        events[eventName] = events[eventName] || []

        events[eventName].push({
            handler:handler
        })
    }

    function emit(eventName,args) {
        if (!events[eventName]) {
            return
        } 
        for (let i = 0; i < events[eventName].length; i++){
            events[eventName][i].handler(args)            
        }
    }

    return {
        on: on,
        emit:emit
    }
})()

module.exports = EventHub