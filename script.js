document.addEventListener('DOMContentLoaded', () => {

    // Functie voor de aftelteller
    function updateCountdown() {
        const targetDate = new Date('October 11, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update de HTML elementen
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        if (daysElement && hoursElement && minutesElement && secondsElement) {
            daysElement.innerText = days < 10 ? '0' + days : days;
            hoursElement.innerText = hours < 10 ? '0' + hours : hours;
            minutesElement.innerText = minutes < 10 ? '0' + minutes : minutes;
            secondsElement.innerText = seconds < 10 ? '0' + seconds : seconds;
        }

        if (distance < 0) {
            clearInterval(countdownInterval);
            const countdownContainer = document.getElementById('countdown');
            if (countdownContainer) {
                countdownContainer.innerHTML = "<h2>Het feest is begonnen!</h2>";
            }
        }
    }

    // Start de aftelteller
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Functie voor het uploaden van foto's
    const uploadInput = document.getElementById('photo-upload');
    const uploadPlaceholders = document.querySelectorAll('.upload-placeholder');
    const photoGallery = document.getElementById('photo-gallery');

    uploadPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            uploadInput.click();
        });
    });

    uploadInput.addEventListener('change', (event) => {
        const files = event.target.files;

        if (files.length > 0) {
            for (const file of files) {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        const photoUrl = e.target.result;
                        
                        const photoItem = document.createElement('div');
                        photoItem.classList.add('photo-item');

                        const img = document.createElement('img');
                        img.src = photoUrl;
                        img.alt = 'Geüploade foto';

                        photoItem.appendChild(img);
                        photoGallery.prepend(photoItem);
                    };

                    reader.readAsDataURL(file);
                }
            }
        }
    });

    // Functie voor de beheerder om foto's te downloaden
    function downloadAllPhotos() {
        const photos = document.querySelectorAll('.photo-item img');
        photos.forEach((img, index) => {
            const link = document.createElement('a');
            link.href = img.src;
            link.download = `moima_mayama_foto_${index + 1}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Voeg de downloadknop toe
    const mainSection = document.querySelector('main');
    if (mainSection) {
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download alle foto\'s';
        downloadButton.classList.add('download-button');
        downloadButton.addEventListener('click', downloadAllPhotos);
        mainSection.appendChild(downloadButton);
    }
});