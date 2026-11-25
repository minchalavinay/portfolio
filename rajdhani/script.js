/**
 * Rajdhani Enterprises - Interactive Controller
 * Multi-Business Hub & Verticals Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileDrawer();
  initCategoryFilters();
  initWhatsAppForms();
});

// Central Support & WhatsApp Details for Rajdhani Enterprises
const RAJDHANI_CONFIG = {
  phone: "8374577884", // Default business contact
  whatsapp: "918374577884",
  address: "Near Ramnagar Bridge, Ram Nagar, Rajampet, Poli, Andhra Pradesh 516115"
};

/* --- Sticky Header & Scroll Effects --- */
function initHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --- Mobile Navigation Drawer --- */
function initMobileDrawer() {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.close-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      drawer.classList.add('open');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer) drawer.classList.remove('open');
    });
  });
}

/* --- Catalog / Menu Category Filtering --- */
function initCategoryFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const catalogCards = document.querySelectorAll('.catalog-card');

  if (!filterTabs.length || !catalogCards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.getAttribute('data-category');

      catalogCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || itemCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* --- Interactive Forms with WhatsApp Message Dispatch --- */
function initWhatsAppForms() {
  // 1. Restaurant Table Reservation
  const restaurantForm = document.getElementById('restaurant-booking-form');
  if (restaurantForm) {
    restaurantForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('res-name').value.trim();
      const phone = document.getElementById('res-phone').value.trim();
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;
      const guests = document.getElementById('res-guests').value;
      const notes = document.getElementById('res-notes')?.value.trim() || 'None';

      const msg = `*🍽️ TABLE RESERVATION - HIVAS RESTAURANT*\n\n` +
                  `*Guest Name:* ${name}\n` +
                  `*Phone:* ${phone}\n` +
                  `*Date:* ${date}\n` +
                  `*Time:* ${time}\n` +
                  `*Guests:* ${guests}\n` +
                  `*Special Request:* ${notes}\n\n` +
                  `_Sent via Rajdhani Enterprises Website_`;

      dispatchWhatsApp(msg);
      showToast('Redirecting to WhatsApp to confirm your table reservation!');
      restaurantForm.reset();
    });
  }

  // 2. Supermarket Grocery Order
  const supermarketForm = document.getElementById('grocery-order-form');
  if (supermarketForm) {
    supermarketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sup-name').value.trim();
      const phone = document.getElementById('sup-phone').value.trim();
      const address = document.getElementById('sup-address').value.trim();
      const list = document.getElementById('sup-list').value.trim();

      const msg = `*🛒 GROCERY ORDER - RAJDHANI SUPER MARKET*\n\n` +
                  `*Customer:* ${name}\n` +
                  `*Phone:* ${phone}\n` +
                  `*Delivery Address:* ${address}\n\n` +
                  `*Grocery List / Items:*\n${list}\n\n` +
                  `_Sent via Rajdhani Enterprises Website_`;

      dispatchWhatsApp(msg);
      showToast('Redirecting to WhatsApp with your grocery list!');
      supermarketForm.reset();
    });
  }

  // 3. Cafe Table / Party Inquiry
  const cafeForm = document.getElementById('cafe-booking-form');
  if (cafeForm) {
    cafeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cafe-name').value.trim();
      const phone = document.getElementById('cafe-phone').value.trim();
      const occasion = document.getElementById('cafe-occasion').value;
      const date = document.getElementById('cafe-date').value;
      const guests = document.getElementById('cafe-guests').value;

      const msg = `*☕ CAFE BOOKING / HANGOUT - PRIYA CAFE*\n\n` +
                  `*Name:* ${name}\n` +
                  `*Phone:* ${phone}\n` +
                  `*Occasion:* ${occasion}\n` +
                  `*Date:* ${date}\n` +
                  `*Group Size:* ${guests} People\n\n` +
                  `_Sent via Rajdhani Enterprises Website_`;

      dispatchWhatsApp(msg);
      showToast('Redirecting to WhatsApp to confirm cafe hangout table!');
      cafeForm.reset();
    });
  }

  // 4. Hotel Room Booking
  const hotelForm = document.getElementById('hotel-booking-form');
  if (hotelForm) {
    hotelForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('hotel-name').value.trim();
      const phone = document.getElementById('hotel-phone').value.trim();
      const roomType = document.getElementById('hotel-room-type').value;
      const checkin = document.getElementById('hotel-checkin').value;
      const checkout = document.getElementById('hotel-checkout').value;
      const guests = document.getElementById('hotel-guests').value;

      const msg = `*🏨 ROOM RESERVATION - HOTEL SKY GRAND INN*\n\n` +
                  `*Guest Name:* ${name}\n` +
                  `*Phone:* ${phone}\n` +
                  `*Room Type:* ${roomType}\n` +
                  `*Check-In Date:* ${checkin}\n` +
                  `*Check-Out Date:* ${checkout}\n` +
                  `*Guests Count:* ${guests}\n\n` +
                  `_Sent via Rajdhani Enterprises Website_`;

      dispatchWhatsApp(msg);
      showToast('Redirecting to WhatsApp to check room availability!');
      hotelForm.reset();
    });
  }

  // 5. Function Hall Inquiry
  const hallForm = document.getElementById('hall-booking-form');
  if (hallForm) {
    hallForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('hall-name').value.trim();
      const phone = document.getElementById('hall-phone').value.trim();
      const eventType = document.getElementById('hall-event-type').value;
      const date = document.getElementById('hall-date').value;
      const guests = document.getElementById('hall-guests').value;
      const notes = document.getElementById('hall-notes')?.value.trim() || 'None';

      const msg = `*🎊 FUNCTION HALL BOOKING - RAJDHANI FUNCTION HALL*\n\n` +
                  `*Host Name:* ${name}\n` +
                  `*Phone:* ${phone}\n` +
                  `*Event Type:* ${eventType}\n` +
                  `*Event Date:* ${date}\n` +
                  `*Expected Guests:* ${guests}\n` +
                  `*Additional Needs:* ${notes}\n\n` +
                  `_Sent via Rajdhani Enterprises Website_`;

      dispatchWhatsApp(msg);
      showToast('Redirecting to WhatsApp with your event inquiry!');
      hallForm.reset();
    });
  }

  // 6. General Contact Hub Form
  const hubForm = document.getElementById('hub-contact-form');
  if (hubForm) {
    hubForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('hub-name').value.trim();
      const phone = document.getElementById('hub-phone').value.trim();
      const business = document.getElementById('hub-business').value;
      const message = document.getElementById('hub-message').value.trim();

      const msg = `*🏢 GENERAL INQUIRY - RAJDHANI ENTERPRISES*\n\n` +
                  `*Name:* ${name}\n` +
                  `*Phone:* ${phone}\n` +
                  `*Concerned Vertical:* ${business}\n` +
                  `*Message Details:*\n${message}\n\n` +
                  `_Sent via Rajdhani Enterprises Portal_`;

      dispatchWhatsApp(msg);
      showToast('Redirecting your message to Rajdhani Enterprises on WhatsApp!');
      hubForm.reset();
    });
  }
}

// Quick WhatsApp Dispatch Helper
function dispatchWhatsApp(encodedText) {
  const url = `https://wa.me/${RAJDHANI_CONFIG.whatsapp}?text=${encodeURIComponent(encodedText)}`;
  window.open(url, '_blank');
}

// Toast Notification
function showToast(text) {
  let toast = document.getElementById('rajdhani-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'rajdhani-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #22c55e;"></i> <span>${text}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Quick WhatsApp Order for individual catalog item
window.orderItemOnWhatsApp = function(itemName, price, businessName) {
  const msg = `Hello *${businessName}* (Rajdhani Enterprises),\nI am interested in ordering/inquiring about:\n*${itemName}* (${price})\nPlease share details and availability.\n\n_Address: Near Ramnagar Bridge, Rajampet_`;
  dispatchWhatsApp(msg);
};
