const apiUrl = 'http://localhost:3000';


fetch(apiUrl + '/api/airports')
        .then((response) => response.json())
        .then((data) => {
          const airports = data.value;
          // Display the joke on your website or app
          document.write(airports);
          console.log(airports);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
/*
fetch(apiUrl + '/api/airports/:airportCode/destinations')
fetch(apiUrl + '/api/flights?from=:airportCode&to=:airportCode')
fetch(apiUrl + '/api/bookings')
fetch(apiUrl + '/api/bookings/:email')
fetch(apiUrl + '/api/bookings/:bookingId')
