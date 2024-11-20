window.addEventListener('DOMContentLoaded', function () {
    const elem = document.querySelector('.carousel');
    const flkty = new Flickity(elem, {
        cellAlign: 'left',
        contain: true,
        wrapAround: true,
    });
});
