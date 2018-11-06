let Toast = require('./toast.js').toast;
let Note = require('./note.js').Note;
let Event = require('module/eventhub.js');


let NoteManager = (function () {

    function load() {
        $.get('/api/notes')
            .done(function (ret) {
                if (ret.status == 0) {
                    $.each(ret.data, function (idx, article) {
                        new Note({
                            id: article.id,
                            context: article.text,
                            username: article.username
                        });
                    });

                    Event.emit('waterfall');
                } else {
                    Toast(ret.errorMsg);
                }
            })
            .fail(function () {
                Toast('网络异常');
            });


    }

    function add() {
        new Note();
    }

    return {
        load: load,
        add: add
    }

})();

module.exports.NoteManager = NoteManager