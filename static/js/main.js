var has_fired;
var elements = document.getElementsByClassName('animation');

document.onscroll = () => {
    scrolldisplay();
}

function scrolldisplay() {
    Array.prototype.forEach.call(elements, (element) => {
        if (!element.classList.contains('hiddenBounceL') && !element.classList.contains('hiddenBounceR') && !element.classList.contains('hiddenBounceUp'))  {
            return
        }
        let scrollHeight = document.documentElement.scrollTop + window.innerHeight - 50;
        if (scrollHeight >= element.offsetTop) {
            if (element.classList.contains('hiddenBounceUp')) {
                element.classList.add('bounceUp');
                element.classList.remove('hiddenBounceUp')
            } else if (element.classList.contains('hiddenBounceL')) {
                element.classList.add('bounceLeft');
                element.classList.remove('hiddenBounceL')
            } else {
                element.classList.add('bounceRight');
                element.classList.remove('hiddenBounceR')
            }

        }
    })
}

scrolldisplay();