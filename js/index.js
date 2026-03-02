document.addEventListener("DOMContentLoaded", main);

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
}

function calculate(ev) {
    ev.preventDefault();

    let inputOne = document.getElementsByName("input_one")[0];
    let inputTwo = document.getElementsByName("input_two")[0];
    let operation = document.getElementsByName("input_block")[0];
    let blockResult = document.getElementById("result");
    if (!inputOne || !inputTwo || !operation) {
        alert("Не могу найти поля ввода или поле с операцией. Обратитесь к разработчику");
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
            if (Number(inputTwo.value) == 0) {
                res = null;
                alert("Делить на 0 нельзя!!!");
                inputTwo.classList.add("error");
                break;
            }
            if (inputTwo.classList.contains("error")) {
                inputTwo.classList.remove("error");
            }
            res = Number(inputOne.value) / Number(inputTwo.value);
            break;
        default:
            alert("Неизвестная операция. Обратитесь к разработчику");
            res = null;
            break;
    }
    if(!blockResult) {
        alert("Не могу найти блок для результата. Обратитесь к разработчику\n\n" +
            "НО ВОТ РЕЗУЛЬТАТ ВАШЕГО ВЫЧИСЛЕНИЯ '" + res +"'");
        return;
    }
    let newLine = document.createElement('div');
    newLine.textContent = `${Number(inputOne.value)} ${operation.value} ${Number(inputTwo.value)} = ${res}`;
    blockResult.prepend(newLine);

    return false;
}
