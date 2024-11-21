const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('header ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function() {
  emailjs.init('SCucFs-wPBRydzaDO'); 

  function sendReservationEmail(name, email, date) {
      const templateParams = {
          name: name,
          email: email,
          date: date,
      };

      emailjs.send('service_9eb9iwf', 'template_z6iw7u5', templateParams)
          .then(function(response) {
              console.log('Success!', response);
              alert('Your reservation has been confirmed! We will contact you soon to confirm the details.');
          }, function(error) {
              console.log('Failed...', error);
              alert('Oops! Something went wrong, please try again later.');
          });
  }

  const form = document.querySelector('#reservation-form'); 
  form.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const date = document.querySelector('#date').value;

      sendReservationEmail(name, email, date);
  });
});