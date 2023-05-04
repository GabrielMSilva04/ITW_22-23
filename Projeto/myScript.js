const myCarouselElement = document.querySelector('#myCarousel')
$('document').ready(function () {
    const carousel = new bootstrap.Carousel('#myCarousel', {
        interval: 10000
    });
});
