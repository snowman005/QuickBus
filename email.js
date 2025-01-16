document.addEventListener("DOMContentLoaded", async function () {
  emailjs.init('SCucFs-wPBRydzaDO');

  function sendReservationEmail(name, email, date) {
    const templateParams = {
      name: name,
      email: email,
      date: date,
    };
    emailjs
      .send('service_9eb9iwf', 'template_z6iw7u5', templateParams)
      .then(function (response) {
        console.log('Success!', response);
        alert('Your reservation has been confirmed! We will contact you soon to confirm the details.');
      })
      .catch(function (error) {
        console.log('Failed...', error);
        alert('Oops! Something went wrong, please try again later.');
      });
  }

  const form = document.querySelector('#reservation-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const date = document.querySelector('#date').value;
    sendReservationEmail(name, email, date);
    localStorage.setItem('reservation', JSON.stringify({ name, email, date }));
  });

  form.addEventListener('submit', function (event) {
    const email = document.querySelector('#email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Invalid email address');
      event.preventDefault();
    }
  });
});

document.addEventListener("DOMContentLoaded", async function () {
  const formInputs = document.querySelectorAll('#reservation-form input, #reservation-form select');
  const countryCodeSelect = document.getElementById('tel2');
  const startingPointSelect = document.getElementById('starting-point');
  const destinationSelect = document.getElementById('destination');

  async function fetchDestinations() {
    try {
      const response = await fetch('destinations.json');
      const data = await response.json();
      return data.destinations;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return [];
    }
  }

  function updateCountryCodeOptions(destinations) {
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Select country code";
    countryCodeSelect.appendChild(defaultOption);

    destinations.forEach(dest => {
      const option = document.createElement('option');
      option.value = dest.phoneCode;
      option.textContent = `${dest.phoneCode} (${dest.country})`;
      countryCodeSelect.appendChild(option);
    });
  }

  function updateDestinationOptions(destinations) {
    destinations.forEach(dest => {
      const option = document.createElement('option');
      option.value = dest.country.toLowerCase();
      option.textContent = `${dest.country} (${dest.capital} - ${dest.station})`;

      startingPointSelect.appendChild(option.cloneNode(true));
      destinationSelect.appendChild(option);
    });
  }

  const destinations = await fetchDestinations();
  updateCountryCodeOptions(destinations);
  updateDestinationOptions(destinations);

  formInputs.forEach(input => {
    input.addEventListener('change', () => {
      const formData = {};
      formInputs.forEach(input => {
        formData[input.name] = input.value;
      });
      localStorage.setItem('reservationFormData', JSON.stringify(formData));
    });
  });

  const savedFormData = JSON.parse(localStorage.getItem('reservationFormData'));
  if (savedFormData) {
    formInputs.forEach(input => {
      if (savedFormData[input.name]) {
        input.value = savedFormData[input.name];
      }
    });

    if (savedFormData['country-code']) {
      countryCodeSelect.value = savedFormData['country-code'];
    }
  }

  console.log(localStorage.getItem('reservationFormData'));
});
