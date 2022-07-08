const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude =  place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
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
        setWeatherData(data, place.formatted_address)
    })
})

const statusElement = document.querySelector('[data-status]')
const locationElement = document.querySelector('[data-location]')
const windElement = document.querySelector('[data-wind]')
const temperatureElement = document.querySelector('[data-temperature]')
const humidityElement = document.querySelector('[data-humidity]')


// Fix here and populate host
function setWeatherData(data, place) {
    statusElement.textContent = place
    locationElement.textContent = data[0].description
    // Fix these v
    // windElement = weather.wind
    // humidityElement = weather.humidity
    // temperatureElement.textContent = weather.temperature
}