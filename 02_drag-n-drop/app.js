const item = document.querySelector('.item');
const placeholders = document.querySelectorAll('.placeholder');

item.addEventListener('dragstart', dragstart);
item.addEventListener('dragend', dragend);

function dragstart (event) {
    // console.log('Drag start', event.target) event.target - наш item
    event.target.classList.add('hold');
    // чтобы при перетаскивании эл-та он исчез, но оставался под мышкой
    setTimeout(() => event.target.classList.add('hide'), 0); 
}
function dragend (event) {
    event.target.classList.remove('hold' , 'hide');
    // или event.target.className = 'item', только item остается
}

for (const placeholder of placeholders) {
    //элемент над placeholder, куда мы можем поместить
    placeholder.addEventListener('dragover', dragover);
    //элемент внутри placeholder, на территории
    placeholder.addEventListener('dragenter', dragenter);
    //перетащили и вышли
    placeholder.addEventListener('dragleave', dragleave);
    //отпустили
    placeholder.addEventListener('drop', dragDrop);   
}

// чтобы отменить поведение для перетаскивания, исправляем это для того, чтоб смогли перетащить
function dragover (event) {
    // console.log('drag over');
    event.preventDefault();
};

function dragenter (event) {
    // console.log('drag enter');
    event.target.classList.add('hovered');
};

function dragleave (event) {
    // console.log('drag leave');
    event.target.classList.remove('hovered');
};

function dragDrop (event) {
    // console.log('drop');
    event.target.append(item);
    event.target.classList.remove('hovered');
};
