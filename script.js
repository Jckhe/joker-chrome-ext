
$(document).ready(function() {
    let joke = document.querySelector(".setup")
    let result = document.querySelector(".result")
    let setup;
    let delivery;
    let urlEnding = ["Programming"]
    function fetchJoke() {
        fetch(`https://v2.jokeapi.dev/joke/${urlEnding.join()}`)
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
            console.log(current);
            urlEnding.push(current);
            console.log(urlEnding);
            fetchJoke();
        }
    })  
});