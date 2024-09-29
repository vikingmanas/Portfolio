document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Toggle project card overlay visibility on hover
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseover', () => {
            card.querySelector('.card-overlay').style.opacity = '1';
        });
        card.addEventListener('mouseout', () => {
            card.querySelector('.card-overlay').style.opacity = '0';
        });
    });

    // Add form validation for the contact form
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const input = item.querySelector('p');
        if (input && input.textContent.trim() === '') {
            input.style.color = 'red'; // Indicate empty fields
            input.textContent = 'Information not provided'; // Placeholder text
        }
    });
});
