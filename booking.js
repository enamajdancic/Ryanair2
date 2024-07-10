
function bookNow() {
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const name = document.getElementById('name').value;

    const bookingData = {
        email: email,
        phoneNumber: phoneNumber,
        name: name
    };

    fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(bookingData)
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('bookingId', data.id);

        window.location.href = 'mybookings1.html';
    })
    
    .catch(error => {
        console.error('Error booking flight:', error);
    });
}






document.addEventListener('DOMContentLoaded', () => {
    const bookingId = localStorage.getItem('bookingId');

    if (bookingId) {
        fetch(`http://localhost:3000/api/bookings/${bookingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        
        .then(response => response.json())
        
        .then(data => {
            const bookingDetailsDiv = document.getElementById('bookingDetails');
            const confirmationDiv = document.getElementById('confirmation');
            confirmationDiv.innerHTML = `
            <h2>Flight booked! Than you for flying with us.</h2>`

            bookingDetailsDiv.innerHTML = `
        <div class="bookingDiv">
            <div class="bookingDone">
                <p>Email: ${data.email}</p>
                <p>Phone Number: ${data.phoneNumber}</p>
                <p>Name: ${data.name}</p>
                <p>Booking ID: ${data.id}</p>
            </div>
            <div class="img">
                <img src="airplane.png">
        	</div>
        </div>

            `;
        })
        
        .catch(error => {
            console.error('Error fetching booking details:', error);
        });
        
    } else {
        document.getElementById('bookingDetails').innerHTML = 'No booking information found.';
    }
});