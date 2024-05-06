window.addEventListener('load', function() {
    // Zugriff auf das Bild-Element
    var image = document.querySelector('.scaled-image');

    // Check if the image element exists
    if (!image) {
        console.error('Image element with class "scaled-image" not found');
        return;
    }

    // Array zum Speichern der Klick-Koordinaten
    var clickCoordinates = JSON.parse(localStorage.getItem('clickCoordinates')) || [];

    // Event-Listener für das Klick-Ereignis hinzufügen
    image.addEventListener('click', function(event) {
        // Koordinaten des Klicks relativ zum Bild ermitteln
        var rect = image.getBoundingClientRect();
        var x = event.pageX - rect.left - window.scrollX;
        var y = event.pageY - rect.top - window.scrollY;

        // Koordinaten speichern
        clickCoordinates.push({x: x, y: y});

        // Koordinaten in localStorage speichern
        localStorage.setItem('clickCoordinates', JSON.stringify(clickCoordinates));

        // Koordinaten in der Konsole ausgeben (zum Testen)

        // Remove the existing dot if it exists
        var existingDot = document.getElementById('click-dot');
        if (existingDot) {
            existingDot.remove();
        }

        // Create a new dot element at the clicked coordinates
        var dot = document.createElement('div');
        dot.id = 'click-dot';
        dot.style.position = 'absolute';
        dot.style.left = (x - 2.5) + 'px'; // subtract half the width of the dot
        console.log("X: " + dot.style.left);
        dot.style.top = (y + 57.5) + 'px'; // subtract half the height of the dot
        console.log("Y: " + dot.style.top);
        dot.style.width = '5px';
        dot.style.height = '5px';
        dot.style.backgroundColor = 'red';
        dot.style.borderRadius = '50%';
        image.parentElement.appendChild(dot);
    });
});