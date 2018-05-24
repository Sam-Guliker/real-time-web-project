(function (){

    var app = {

        search: function() {
            const input = document.getElementsByName('hashtag')[0]

            input.addEventListener('keyup', function() {
                const userValue = this.value
                console.log(userValue)
            })
        }


    }

    app.search()

})();
