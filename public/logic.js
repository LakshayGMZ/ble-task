document.addEventListener("DOMContentLoaded", function () {
    const baseURL = "https://blebackend.lakshaygmz.repl.co/map/getData";
    let latitude = document.getElementsByClassName("mapLat")[0];
    let longitude = document.getElementsByClassName("mapLong")[0];
    let map = document.getElementById("mapIFrame");
    setInterval(
        () => {
            fetch(baseURL)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        console.log(data.data)
                        latitude.innerHTML = data.latitude;
                        longitude.innerHTML = data.longitude;
                        map.src = `https://www.google.com/maps/embed/v1/place?q=${data.latitude},${data.longitude}&key=AIzaSyA6J2BYuY_JHtYTrND5mq7a2F4Q4qaHxPY`
                    }

                })
        }, 5000
    )

});