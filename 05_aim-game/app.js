const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let maxTime = 0;
let score = 0;
// После в html добавляем к кнопкам префикс data-time

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

//Делигирование событий, проверка
timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = (event.target.getAttribute('data-time')); // или parseInt вместо +
        maxTime = (event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

const interval = setInterval(() => {
    decreaseTime();
}, 1000);


board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove(); // удаление текущего круга
        createRandomCircle();
    }
})


function startGame() {
    timeEl.parentNode.classList.remove('hide');
    board.innerHTML = '';
    score = 0;
    interval;
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let currentTime = --time;
        if (currentTime < 10) {
            currentTime = `0${currentTime}`;
        }
        setTime(currentTime);
    }
}

function setTime(value) {
    if (value >= 60) {
        if (value % 60 < 10) {
            timeEl.innerHTML = `0${Math.floor(value / 60)}:0${value % 60}`;
        } else {
            timeEl.innerHTML = `0${Math.floor(value / 60)}:${value % 60}`;
        }
    } else {
        timeEl.innerHTML = `00:${value}`;
    }
}

function finishGame() {
    timeEl.parentNode.classList.add('hide'); // удаление родителя, "осталось 00:00 сек"
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
    const conclusion = document.createElement('div');
    conclusion.style.cursor = 'default';
    if (score >= maxTime) {
        conclusion.innerHTML = 'Отличный результат!';
        board.append(conclusion);
    } else {
        conclusion.innerHTML = 'Вы можете лучше';
        board.append(conclusion);
    }
    const linkBegin = document.createElement('a');
    linkBegin.innerText = 'Начать заново';
    linkBegin.style.cursor = 'pointer';
    linkBegin.addEventListener('click', (event) => {
        event.preventDefault();
        screens[1].classList.remove('up');
        screens[0].classList.remove('up');
    })
    board.append(linkBegin);
};

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    // const qqq = board.getBoundingClientRect(); // показывает расположение и размер эл-та
    //деструктуризация
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)})`

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}