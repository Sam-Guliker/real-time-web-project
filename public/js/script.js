(function (){
    var socket = io()

    var app = {

        search: function() {
            const input = document.getElementsByName('hashtag')[0]
            const button = document.getElementsByName('button')[0]

            input.addEventListener('keyup', function() {
                const userValue = this.value
            })

            button.addEventListener('click', function() {
                const userValue = input.value
                socket.emit('search',userValue)
            })
        }
    }

    socket.on('search', function (data){})

    app.search()

})();
