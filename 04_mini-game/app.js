const board = document.querySelector('#board');
const SQUARES_NUMBER = 500;

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover', () => { // наведение мыши
        setColor(square);
    })

    square.addEventListener('mouseleave', () => {
        square.style.backgroundColor = '#1d1d1d';        
        square.style.boxShadow = `0 0 2px #000`;
    })

    board.append(square);
}

function setColor(element) {
    let color = randomColor();
    element.style.backgroundColor = `${color}`;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`; //вторая тень - для "подсветки"
}

function randomColor() {
    return `rgb(${Math.round((Math.random()) * 255)}, ${Math.round((Math.random()) * 255)}, ${Math.round((Math.random()) * 255)})`
}