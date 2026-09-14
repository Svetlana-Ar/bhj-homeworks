document.addEventListener('DOMContentLoaded', () => {
    const rotators = document.querySelectorAll('.rotator');

    rotators.forEach(rotator => {
        const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
        let intervalId = null;

        cases.forEach(item => {
            if (item.dataset.color) {
                item.style.color = item.dataset.color;
            }
        });

        const startRotation = () => {
            const activeCase = rotator.querySelector('.rotator__case_active');
            const speed = parseInt(activeCase.dataset.speed) || 1000;
            
            intervalId = setInterval(() => {                
                clearInterval(intervalId);                
                let nextCase = activeCase.nextElementSibling;
                if (!nextCase || !nextCase.classList.contains('rotator__case')) {
                    nextCase = cases[0]; 
                }
                
                activeCase.classList.remove('rotator__case_active');
                nextCase.classList.add('rotator__case_active');
                
                startRotation();
            }, speed);
        };
        
        startRotation();
    });
});