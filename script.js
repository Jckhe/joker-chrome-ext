
$(document).ready(function() {
    let joke = document.querySelector(".setup")
    let result = document.querySelector(".result")
    let setup;
    let delivery;
    function fetchJoke() {
        fetch('https://v2.jokeapi.dev/joke/Programming')
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
        result.innerHTML = delivery;
    })
    $(".refreshJoke").on("click", () => {
        result.innerHTML = '';
        fetchJoke();
    })
});