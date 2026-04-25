// Function to handle smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple animation for service cards when they appear on screen
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
});

document.querySelectorAll('.card').forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
});
// This script runs when the button is clicked
const estimateBtn = document.querySelector('.btn-yellow');

estimateBtn.addEventListener('click', function() {
    alert("Thank you for your interest! We will redirect you to our booking form.");
    // You could also redirect to a new page:
    // window.location.href = "contact.html";
});
window.onscroll = function() {
    const header = document.querySelector("header");
    if (window.pageYOffset > 100) {
        header.style.position = "fixed";
        header.style.top = "0";
        header.style.width = "100%";
        header.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
    } else {
        header.style.position = "relative";
        header.style.boxShadow = "none";
    }
};
const counters = document.querySelectorAll('.count');
const speed = 200; // The higher the number, the slower the count

const startCounters = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const updateCount = () => {
                const target = +entry.target.getAttribute('data-target');
                const count = +entry.target.innerText;

                // Lower increment to make it smoother
                const inc = target / speed;

                if (count < target) {
                    // Add increment and run again
                    entry.target.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    entry.target.innerText = target;
                }
            };
            
            updateCount();
            // Stop observing once the animation is done
            observer.unobserve(entry.target);
        }
    });
};

// Create the observer
const observerOptions = {
    threshold: 1.0 // Trigger only when 100% of the element is visible
};

const counterObserver = new IntersectionObserver(startCounters, observerOptions);

// Attach observer to each counter
counters.forEach(counter => {
    counterObserver.observe(counter);
});
