
$(document).ready(function() {
    // const audio = new Audio (sound);
    let joke = document.querySelector(".setup")
    let result = document.querySelector(".result")
    let setup;
    let delivery;
    let urlEnding = ["Programming"]
    function fetchJoke() {
        //animation
        console.log("TEST")
        $('.setup').attr('id', 'new');
        setTimeout(() => {
            $('.setup').attr('id', '');
        }, 550);
        fetch(`https://v2.jokeapi.dev/joke/${urlEnding.join()}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`)
        .then((res) => res.json())
        .then((res) => {
            if (res.setup === undefined || res.delivery === undefined) {
                fetchJoke();
            } else {
                setup = res.setup;
                delivery = res.delivery;
                console.log(setup, delivery)
                joke.innerHTML = setup;
            }
            
        })
    }
    fetchJoke();
    $(".deliver").on("click", () => {
        $('.result').attr('id', 'delivered');
        result.innerHTML = delivery;
        // audio.play();
    })
    $(".refreshJoke").on("click", () => {
        result.innerHTML = '';
        $('.result').attr('id', 'undelivered');
        fetchJoke();
    })
    $('input.optional').change(function () {
        let current = this.name;
        let isChecked = $(`#${this.name}`)[0].checked;
        console.log(isChecked);
        if (isChecked == false) {
            urlEnding.forEach((el, index) => {
                if (el === this.name) {
                    urlEnding.splice(index);
                    console.log(urlEnding)
                    fetchJoke();
                }
            })
        } else {
            urlEnding.push(current);
            fetchJoke();
        }
    })  
});