const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('header ul');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.querySelector('header').style.backgroundColor = 'lightblue';
});

document.addEventListener("DOMContentLoaded", function () {
  const showNotificationBanner = () => {
    const banner = document.createElement('div');
    banner.id = 'notification-banner';
    banner.className = 'notification-banner';
    banner.textContent = 'Welcome to QuickBus! Enjoy a 10% discount on your first booking.';

    document.body.appendChild(banner);
    banner.style.display = 'block';

    setTimeout(() => {
      banner.style.display = 'none';
      document.body.removeChild(banner);
    }, 5000);
  };

  showNotificationBanner();
});

document.addEventListener('mousemove', (event) => {
  const getColorFromPosition = (x, y) => {
    const r = Math.floor((x / window.innerWidth) * 255);
    const g = Math.floor((y / window.innerHeight) * 255);
    const b = Math.floor(((x + y) / (window.innerWidth + window.innerHeight)) * 255);
    return `rgb(${r}, ${g}, ${b})`;
  };
  const color = getColorFromPosition(event.clientX, event.clientY);
  document.querySelector('h1').style.color = color;
});

