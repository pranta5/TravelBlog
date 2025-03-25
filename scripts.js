// ...existing code...

// Example JavaScript that might cause resizing
window.addEventListener('resize', function() {
    // ...existing code...
    if (window.innerWidth < 600) {
        document.body.style.fontSize = '12px'; // This could make the page appear smaller
    } else {
        document.body.style.fontSize = '16px';
    }
});

// ...existing code...
