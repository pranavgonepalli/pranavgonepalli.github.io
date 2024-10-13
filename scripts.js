document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#nav-bar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === '#main_container') {
                // Scroll to the top of the page
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 60, // 60px is the navbar height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//   const experienceCards = document.querySelectorAll('.experience-card');
//   const popupOverlay = document.querySelector('.popup-overlay');
//   const popupContent = document.querySelector('.popup-content');
//   const popupInfo = document.getElementById('popup-info');
//   const closePopup = document.querySelector('.close-popup');

//   function openPopup() {
//     popupOverlay.style.display = 'block';
//     setTimeout(() => {
//       popupOverlay.classList.add('active');
//       popupContent.classList.add('active');
//     }, 10);
//   }

//   function closePopupFunc() {
//     popupOverlay.classList.remove('active');
//     popupContent.classList.remove('active');
//     setTimeout(() => {
//       popupOverlay.style.display = 'none';
//     }, 300);
//   }

//   experienceCards.forEach(card => {
//     card.addEventListener('click', () => {
//       // Get more detailed information from data attributes or by card content
//       const companyName = card.querySelector('.company-name').textContent;
//       const jobRole = card.querySelector('.job-role').textContent;
//       const dateLocation = card.querySelector('.date-location').textContent;
      
//       // You can add more details as needed, e.g., responsibilities, achievements, etc.
//       const moreInfo = `
//         <h2>${companyName}</h2>
//         <h3>${jobRole}</h3>
//         <p>${dateLocation}</p>
//         <h4>Responsibilities:</h4>
//         <ul>
//           <li>Responsibility 1</li>
//           <li>Responsibility 2</li>
//           <li>Responsibility 3</li>
//         </ul>
//         <h4>Achievements:</h4>
//         <ul>
//           <li>Achievement 1</li>
//           <li>Achievement 2</li>
//         </ul>
//       `;

//       popupInfo.innerHTML = moreInfo;
//       openPopup();
//     });
//   });

//   closePopup.addEventListener('click', closePopupFunc);

//   popupOverlay.addEventListener('click', (e) => {
//     if (e.target === popupOverlay) {
//       closePopupFunc();
//     }
//   });
// });