document.addEventListener('DOMContentLoaded', (event) => {
    const parts = document.querySelectorAll('.part');
    const dropzones = document.querySelectorAll('.dropzone');
    const submitButton = document.getElementById('submit');
    const redoButton = document.getElementById('redo');

    parts.forEach(part => {
        part.addEventListener('dragstart', handleDragStart);
    });

    dropzones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragleave', handleDragLeave);
    });

    submitButton.addEventListener('click', validateAnswers);
    redoButton.addEventListener('click', resetActivity);

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.target.classList.add('over');
    }

    function handleDrop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const draggableElement = document.getElementById(id);
        const dropzone = e.target;
        if (dropzone && dropzone.classList.contains('dropzone')) {
            dropzone.appendChild(draggableElement);
            draggableElement.style.display = 'block';
        }
        dropzone.classList.remove('over');
    }

    function handleDragLeave(e) {
        e.target.classList.remove('over');
    }

    function validateAnswers() {
        dropzones.forEach(zone => {
            const expectedAnswer = zone.getAttribute('data-answer');
            const child = zone.firstChild;
            if (child && child.id === expectedAnswer) {
                zone.classList.add('correct');
                zone.classList.remove('incorrect');
            } else {
                zone.classList.add('incorrect');
                zone.classList.remove('correct');
            }
        });
    }

    function resetActivity() {
        const fiddlePartsContainer = document.querySelector('.fiddle-parts');
        dropzones.forEach(zone => {
            if (zone.firstChild) {
                fiddlePartsContainer.appendChild(zone.firstChild);
            }
            zone.classList.remove('correct', 'incorrect');
        });
    }
});
