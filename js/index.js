document.addEventListener("DOMContentLoaded", main);

function hasInvalidChars(str) {
    // [^0-9.] - ищет всё, КРОМЕ цифр и точки
    return /[^0-9.]/.test(str);
}

function main(ev) {
    let calculator = document.getElementById("calculator");
    while (true) {
        if (!calculator) {
            alert("не могу найти калькулятор. Обратитесь к разработчику");
            continue;
        }
        break;
    }
    calculator.addEventListener("submit", calculate);

    let inputs = [];
    inputs.push(document.getElementsByName("input_one")[0]);
    inputs.push(document.getElementsByName("input_two")[0]);

    inputs.forEach(element => {
        element.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9.]/g, '');
            
            const dots = this.value.match(/\./g);
            if (dots && dots.length > 1) {
                this.value = this.value.replace(/\.+$/, '');
            }
        });
    });
}

function calculate(ev) {
    ev.preventDefault();

    let inputOne = document.getElementsByName("input_one")[0];
    let inputTwo = document.getElementsByName("input_two")[0];
    let operation = document.getElementsByName("input_block")[0];
    let block_result = document.getElementById("result");
    if (!inputOne || !inputTwo || !operation) {
        alert("Не могу найти поля ввода или поле с операцией. Обратитесь к разработчику");
    }
    if(hasInvalidChars(inputOne.value) || hasInvalidChars(inputTwo.value)) {
        alert("В строках не должно быть букв!!!");
        return;
    }

    let res = null;
    switch (operation.value) {
        case "+":
            res = Number(inputOne.value) + Number(inputTwo.value);
            break;
        case "-":
            res = Number(inputOne.value) - Number(inputTwo.value);
            break;
        case "*":
            res = Number(inputOne.value) * Number(inputTwo.value);
            break;
        case "/":
            if (Number(inputTwo.value) == 0){
                res = null;
                alert("Неделить на 0 нельзя!!!");
                break;
            }
            res = Number(inputOne.value) / Number(inputTwo.value);
            break;
        default:
            alert("Неизвестная операция. Обратитесь к разработчику");
            res = null;
            break;
    }
    if(!block_result) {
        alert("Не могу найти блок для результата. Обратитесь к разработчику\n\n" +
            "НО ВОТ РЕЗУЛЬТАТ ВАШЕГО ВЫЧИСЛЕНИЯ '" + res +"'");
        return;
    }
    let newLine = document.createElement('div');
    newLine.textContent = Number(inputOne.value) + 
        " " + operation.value + 
        " " + Number(inputTwo.value) + 
        " = " + res;
    block_result.prepend(newLine);

    return false;
}
