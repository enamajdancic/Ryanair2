
function bookNow() {
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const name = document.getElementById('name').value;

    const cardNumber = document.getElementById('cardNumber').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const cvv = document.getElementById('cvv').value;

    const offerId = localStorage.getItem('offerId'); // Pretpostavka da je offerId spremljen u localStorage

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
        localStorage.setItem('email',data.userInfo.email );
        fetchBookingDetails();
        window.location.href = 'mybookings1.html';
    })
    
    .catch(error => {
        console.error('Error booking flight:', error);
    });
}

function fetchBookingDetails() {
    const email = localStorage.getItem('email');
    if (email) {
        fetch(`http://localhost:3000/api/bookings?email=${email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => response.json())
        .then(data => {
            displayBookingDetails(data);
        })
        .catch(error => {
            console.error('Error fetching booking details:', error);
        });
    } else {
        document.getElementById('bookingDetails').innerHTML = 'No booking information found.';
    }
}

function displayBookingDetails(data) {
    const bookingDetailsDiv = document.getElementById('bookingDetails');
    if (data.length > 0) {
        let bookingElement = "";
        for(let booking of data) {
            bookingElement = bookingElement + `
            <div class="bookingDiv">
            
                <div class="bookingDone">
                    <p>Email: ${booking.userInfo.email}</p>
                    <p>Phone Number: ${booking.userInfo.phoneNumber}</p>
                    <p>Name: ${booking.userInfo.fullName}</p>
                    <p>Booking ID: ${booking.offerId || localStorage.getItem('offerId')}</p>
                </div>
                <div class="img">
                    <img src="airplane.png" alt="Airplane">
                </div>
            </div>
        `
        };
        bookingDetailsDiv.innerHTML = bookingElement
    } else {
        bookingDetailsDiv.innerHTML = 'No booking information found.';
    }
}



document.addEventListener('DOMContentLoaded', () => {
    fetchBookingDetails();
});




/*document.addEventListener('DOMContentLoaded', () => {
    
    
    email = localStorage.getItem('email');
    offerId = localStorage.getItem('offerId');
    if (email) {
        fetch(`http://localhost:3000/api/bookings/${email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        
        .then(response => response.json())
        
        .then(data => {
            console.log(data[0])
            const bookingDetailsDiv = document.getElementById('bookingDetails');
            const confirmationDiv = document.getElementById('confirmation');
            confirmationDiv.innerHTML = `
            <h2>Flight booked! Thank you for flying with us.</h2>`
            
            bookingDetailsDiv.innerHTML = `
        <div class="bookingDiv">
            <div class="bookingDone">
                <p>Email: ${data.userInfo.email}</p>
                <p>Phone Number: ${data.userInfo.phoneNumber}</p>
                <p>Name: ${data.userInfo.fullName}</p>
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
*/
