function checkReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;    
        const revealBottom = reveal.getBoundingClientRect().bottom; 
        
        if (revealTop < windowHeight && revealBottom > 0) {
            reveal.classList.add('reveal_active');
        } else {
            reveal.classList.remove('reveal_active');
        }
    });
}

window.addEventListener('scroll', checkReveal);

checkReveal();