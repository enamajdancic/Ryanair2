
function bookNow() {
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const name = document.getElementById('name').value;

    const cardNumber = document.getElementById('cardNumber').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const cvv = document.getElementById('cvv').value;

    

    const bookingData = {
        userInfo:{
            email: email,
            phoneNumber: phoneNumber,
            fullName: name
        },
        cardInfo:{
            cardNumber: cardNumber,
            expirationDate: expirationDate,
            cvv: cvv
        },
        offerId: offerId
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


         window.location.href = 'mybookings1.html';
    })
    
    .catch(error => {
        console.error('Error booking flight:', error);
    });
}






document.addEventListener('DOMContentLoaded', () => {
    
   
    offerId = localStorage.getItem('offerId');
    if (offerId) {
        fetch(`http://localhost:3000/api/bookings/${offerId}`, {
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
            <h2>Flight booked! Thank you for flying with us.</h2>`

            bookingDetailsDiv.innerHTML = `
        <div class="bookingDiv">
            <div class="bookingDone">
                <p>Email: ${data.email}</p>
                <p>Phone Number: ${data.phoneNumber}</p>
                <p>Name: ${data.fullName}</p>
                <p>Booking ID: ${offerId}</p>
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
