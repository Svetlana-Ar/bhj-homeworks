document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('book');
    
    const fontSizeControls = Array.from(document.querySelectorAll('.font-size'));

    fontSizeControls.forEach(control => {
        control.addEventListener('click', (e) => {
            e.preventDefault();             
            fontSizeControls.forEach(item => item.classList.remove('font-size_active'));            
            control.classList.add('font-size_active');            
            book.classList.remove('book_fs-small', 'book_fs-big');

            const size = control.dataset.size;
            if (size === 'small') {
                book.classList.add('book_fs-small');
            } else if (size === 'big') {
                book.classList.add('book_fs-big');
            }
        });
    });

    
    const textColorControls = Array.from(document.querySelectorAll('.book__control_color .color'));

    textColorControls.forEach(control => {
        control.addEventListener('click', (e) => {
            e.preventDefault();

            textColorControls.forEach(item => item.classList.remove('color_active'));
            control.classList.add('color_active');            
            book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke');
            
            const textColor = control.dataset.textColor;
            if (textColor) {
                book.classList.add(`book_color-${textColor}`);
            }
        });
    });

    
    const bgColorControls = Array.from(document.querySelectorAll('.book__control_background .color'));

    bgColorControls.forEach(control => {
        control.addEventListener('click', (e) => {
            e.preventDefault();

            bgColorControls.forEach(item => item.classList.remove('color_active'));
            control.classList.add('color_active');            
            book.classList.remove('book_bg-black', 'book_bg-gray', 'book_bg-white');
            
            const bgColor = control.dataset.bgColor;
            if (bgColor) {
                book.classList.add(`book_bg-${bgColor}`);
            }
        });
    });
});