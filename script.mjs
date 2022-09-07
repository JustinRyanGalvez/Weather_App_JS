const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude =  place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    //Place and description call
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        setWeatherData1(data, place.formatted_address)
    })

    // fetch('/weather', {
    //     method: 'POST',
    //     headers: {
    //         'Content-type': 'application/json',
    //         'Accept': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         latitude: latitude,
    //         longitude: longitude
    //     })
    // }).then(res => res.json()).then(data => {
    //     console.log(data)
    //     // setWeatherData3(data, place.formatted_address)
    // })
})

//Wind speed call
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude =  place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/weather2', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        setWeatherData2(data)
    })
})

// Temp and humidity call
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude =  place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/weather3', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        setWeatherData3(data)
    })
})

const statusElement = document.querySelector('[data-status]')
const locationElement = document.querySelector('[data-location]')
const windElement = document.querySelector('[data-wind]')
const temperatureElement = document.querySelector('[data-temperature]')
const humidityElement = document.querySelector('[data-humidity]')
const weatherIcon = document.querySelector(".icon")



function setWeatherData1(data, place) {
    statusElement.textContent = place
    locationElement.textContent = data[0].main
    var icon = data[0].icon
    var iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
    weatherIcon.src = iconURL
}

function setWeatherData2(data){
    console.log(data.speed)
    windElement.textContent = data.speed
}

function setWeatherData3(data){
    console.log(data.temp)
    console.log(data.humidity)
    temperatureElement.textContent = data.temp
    humidityElement.textContent = data.humidity
}

