//Access the zip code text box, submit button, and results container from the index.html page

let zipCodeTB = document.getElementById('zipCodeTB')
let submitButton = document.getElementById('submitButton')
let resultsContainer = document.getElementById('resultsContainer')


//zipcode validation

const zipCodeRegex = /^\d{5}$/
//Create a function that will fetch the data from the API based on the zip code entered

async function fetchZone(zip){

    let response = await fetch(`https://phzmapi.org/${zip}.json`)
    console.log(response)
    let zoneResults = await response.json()
    
    return zoneResults
}

//create a function that will call the fetch func when the user clicks the submit button and inserts teh returned data into the results display

submitButton.addEventListener('click', async () => {
    let zipCode = zipCodeTB.value

    const zipCodeRegex = /^\d{5}$/

    if (zipCodeRegex.test(zipCode)) {

    

    let result = await fetchZone(zipCode)

    let zone = `<div class="zoneDisplay">
    <h2> Your Growing Zone</h2>
    <span>Zone: ${result.zone} </span>
    <span>Temp Range: ${result.temperature_range}</span>
    <span>Lat: ${result.coordinates.lat}</span>
    <span>Lon: ${result.coordinates.lon}</span>
    </div>` 

    resultsContainer.innerHTML = zone
    zipCodeTB.value = ''
    
   }else{
       resultsContainer.innerHTML = 'Please enter a valid zip code'
       zipCodeTB.value = ''
   }   
})

