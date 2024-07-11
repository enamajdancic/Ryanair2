/*const apiUrl = 'http://localhost:3000';

fetch(apiUrl + '/api/airports/:airportCode/destinations')
fetch(apiUrl + '/api/flights?from=:airportCode&to=:airportCode')
fetch(apiUrl + '/api/bookings')
fetch(apiUrl + '/api/bookings/:email')
fetch(apiUrl + '/api/bookings/:bookingId')

document.addEventListener('DOMContentLoaded', () => {
    const fromSelect = document.getElementById('from').value;
    const toSelect = document.getElementById('to');

    fetch(apiUrl + 'api/airports')
        .then(response => response.json())
        .then(data => {
            const airports = data.value;
            fromSelect.textContent = airports;
            airports.forEach(airport => {
              const option = document.createElement('option');
              option.value = airports;
              option.textContent  = airports;
              fromSelect.appendChild(option);
              });
            })
          });
*/

document.addEventListener('DOMContentLoaded', () => {
  const apiURL = 'http://localhost:3000/api';

  fetch(`${apiURL}/airports`, {
      headers: {
          "Access-Control-Allow-Origin": "*"
      }
  })
  .then(response => response.json())
  .then(airports => {
      const airportSelect = document.getElementById('airportSelect');
      airports.forEach(airport => {
          console.log(airport)
          const option = document.createElement('option');
          option.value = airport.code;
          option.text = airport.city;
          airportSelect.add(option);
      });
  });

  document.getElementById('airportSelect').addEventListener('change', event => {
      const selectedAirportCode = event.target.value;

      fetch(`${apiURL}/airports/${selectedAirportCode}/destinations`, {
          headers: {
              "Access-Control-Allow-Origin": "*"
          }
      })
      .then(response => response.json())
      .then(destinations => {
          const destinationSelect = document.getElementById('destinationSelect');
          destinationSelect.innerHTML = ''; 
          destinations.forEach(destination => {
              const option = document.createElement('option');
              option.value = destination.code;
              option.text = destination.city;
              destinationSelect.add(option);
          });
      });
  });

  document.getElementById('findFlightsButton').addEventListener('click', () => {
      const fromAirportCode = document.getElementById('airportSelect').value;
      const toAirportCode = document.getElementById('destinationSelect').value;

      fetch(`${apiURL}/flights?from=${fromAirportCode}&to=${toAirportCode}`, {
          method: 'POST',
          headers: {
              "Access-Control-Allow-Origin": "*"
          }
      })
      .then(response => response.json())
      .then(flights => {
          const flightsContainer = document.getElementById('flightsContainer');
          flightsContainer.innerHTML = ''; 
          flights.forEach(flight => {
              const departureTime = new Date(flight.departureTime).toLocaleString();
              const arrivalTime = new Date(flight.arrivalTime).toLocaleString();

              const flightElement = document.createElement('div');
              flightElement.className = 'flight';
              flightElement.innerHTML = `
  <div class="flightInfo">
        <p>Flight ID: ${flight.id}</p>
        <p>Departure: ${departureTime}</p>
        <p>Arrival: ${arrivalTime}</p>
        <p>Price: ${flight.price} ${flight.currency}</p>
  </div>
  <div class="button-container">
        <button class="gumb2" onclick="bookFlight()">Book a flight</button>
  </div>
`;
        localStorage.setItem('offerId', flight.id);

              flightsContainer.appendChild(flightElement);
          });
      });
  });
  
});

function bookFlight(){
                location.href = "mybookings.html";
}


