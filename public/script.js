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
        setWeatherData(data, place.formatted_addresses)
    })
})

const locationElement = document.querySelector(['data-location'])
const statusElement = document.querySelector(['data-status'])
const temperatureElement = document.querySelector(['data-temperature'])
const humidityElement = document.querySelector(['data-humidity'])
const windElement = document.querySelector(['data-wind'])


// Fix here and populate host
function setWeatherData(data, place) {
    locationElement.textContent = place
    statusElement.textContent = data.description
    temperatureElement.textContent = temp
    humidityElement = humidity
    windElement = wind
}