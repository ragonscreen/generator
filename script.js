// function to shuffle a string
String.prototype.shuffle = function () {
    let arr = this.split('');
    let n = arr.length;

    for (let i = n - 1; i > 0; i--) {
        // random num between 0 and last index;
        let j = Math.floor(Math.random() * (i + 1));
        // store value of current index in temp variable
        let tmp = arr[i];
        // swap value of current index with random value
        arr[i] = arr[j];
        // restore swapped value with stored value so no value is deleted
        arr[j] = tmp;
    }

    return arr.join('');
}

const lengthInput = document.getElementById('length');
const numberInput = document.getElementById('number-count');
const specialInput = document.getElementById('special-count');

document.addEventListener('DOMContentLoaded', () => {
    lengthInput.value = '6';
    numberInput.value = '0';
    specialInput.value = '0';
});

const validateLen = elem => {
    const inputValue = elem.value.trim();
    const numValue = parseFloat(inputValue);

    if (isNaN(numValue)) {
        elem.value = '';
    }
    if (numValue > 128) {
        elem.value = '128';
    }
}

const validateMax = elem => {
    const inputValue = elem.value.trim();
    const numValue = parseFloat(inputValue);

    if (isNaN(numValue)) {
        elem.value = '';
    }
    if (numValue > 12) {
        elem.value = '12';
    }
}

let isUpper = document.getElementById('is-uppercase');
let isNum = document.getElementById('is-number');
let isSpc = document.getElementById('is-special');

let incUpper = isUpper.checked;
let incNum = isNum.checked;
let incSpc = isSpc.checked;

const isChecked = () => {
    if (isUpper.checked) {
        incUpper = true;
    } else {
        incUpper = false;
    }

    if (isNum.checked) {
        incNum = true;
    } else {
        incNum = false;
    }

    if (isSpc.checked) {
        incSpc = true;
    } else {
        incSpc = false;
    }
}

const output = document.getElementById('output-box');
const button = document.getElementById('generate-button');

button.addEventListener('click', () => {
    button.classList.add('clicked');
});

button.addEventListener('blur', () => {
    button.classList.remove('clicked');
});

button.addEventListener('click', () => {
    if (lengthInput.value == '') {
        lengthInput.value = 6;
    }
    if (numberInput.value == '') {
        numberInput.value = 0;
    }
    if (specialInput.value == '') {
        specialInput.value = 0;
    }

    let len = parseInt(lengthInput.value);
    let minNum = parseInt(numberInput.value);
    let minSpc = parseInt(specialInput.value);

    if (len < minNum + minSpc) {
        len = minNum + minSpc;
        lengthInput.value = len;
    }

    if (len < 6) {
        len = 6;
        lengthInput.value = len;
    }

    const generate = () => {
        const storage = [...'qwertyuiopasdfghjklzxcvbnm'];
        const uppercase = storage.map(e => e.toUpperCase());
        const numbers = [...'1234567890'];
        const specials = [...'!@#$%^&*'];

        if (incUpper) storage.push(...uppercase);
        if (incNum) {
            storage.push(...numbers);
        } else {
            minNum = 0;
        }
        if (incSpc) {
            storage.push(...specials);
        } else {
            minSpc = 0;
        }

        let result = '';
        for (let i = 0; i < minNum; i++) {
            result += numbers[Math.floor(Math.random() * numbers.length)];
        }
        for (let i = 0; i < minSpc; i++) {
            result += specials[Math.floor(Math.random() * specials.length)];
        }

        let final = len - result.length;
        for (let i = 0; i < final; i++) {
            result += storage[Math.floor(Math.random() * storage.length)];
        }

        output.textContent = result.shuffle();
    }

    generate();
});

const alertBox = document.querySelector('.alert');

output.addEventListener('click', () => {
    let text = output.textContent;
    navigator.clipboard.writeText(text);

    const copyOpacity = () => {
        let opacity = 1;

        const interval = setInterval(() => {
            if (opacity <= 0) {
                clearInterval(interval);
            } else {
                opacity -= 0.05;
                alertBox.style.opacity = opacity;
            }
        }, 50);
    }

    copyOpacity();
});
