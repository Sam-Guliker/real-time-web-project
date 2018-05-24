(function (){
    var socket = io()

    var app = {

        search: function() {
            const input = document.getElementsByName('hashtag')[0]
            const button = document.getElementsByName('button')[0]
            console.log(button)

            input.addEventListener('keyup', function() {
                const userValue = this.value
            })

            button.addEventListener('click', function() {
                const userValue = input.value
                socket.emit('search',userValue)
            })
        },
        create: function(data) {
            const article = document.createElement('aritcle')
            const section = document.createElement('section')
            const p = document.createElement('p')
            const img = document.createElement('img')


        }
        // loadMore: function(){
        //     const loadMoreButton = document.getElementsByTagName('button')[0]
        //     console.log(loadMoreButton)

        //     loadMoreButton.addEventListener('click', function(){
        //         socket.emit('load_more')
        //     })
        // }

    }

    socket.on('search', function (data){})
    // socket.on('load_more', function (data){
    //     console.log(data)
    // })

    app.search()
    app.create()
    // app.loadMore()

})();
