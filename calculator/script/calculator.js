class Stack {
    constructor() {
        this.opStack = new Array();
        this.valStack = new Array();
        this.resetFlag = false;
    }
}

class Operations {
    static order = {
        "^": 3,
        "*": 2,
        "/": 2,
        "+": 1,
        "-": 1
    };

    static calcAdd(a, b) { return a + b; }
    static calcSub(a, b) { return a - b; }
    static calcMul(a, b) { return a * b; }
    static calcDiv(a, b) { return a / b; }
    static calcExp(a, b) { return a ** b; }

    static getOperation(operand) {
        switch (operand) {
            case "+":
                return this.calcAdd;
            case "-":
                return this.calcSub;
            case "*":
                return this.calcMul;
            case "/":
                return this.calcDiv;
            case "^":
                return this.calcExp;
        }
    }
}

function printToDisplay(value) {
    const display = document.querySelector("#display");
    display.textContent += value;
}

function appendToHistory(value, operand = null, reset = false) {
    const hist = document.querySelector("#history");
    // Reset the history after Equal.
    if (reset && operand) {
        hist.textContent = `${value} ${operand} `;
    }
    else if (reset && !operand) {
        hist.textContent = value;
    }
    else if (!operand) {
        hist.textContent += value;
    } else {
        hist.textContent += `${value} ${operand} `;
    }
}

function clearDisplay() {
    document.querySelector("#display").textContent = "";
}

function clearHistory(opStack, valStack) {
    document.querySelector("#history").textContent = "";
    opStack.splice(0, opStack.length);
    valStack.splice(0, valStack.length);
}

function clear(opStack, valStack) {
    clearDisplay();
    clearHistory(opStack, valStack);
}

function evalStack(opStack, valStack) {
    const hist = document.querySelector("#history");
    var tokens = hist.textContent.split(" ");
    while (tokens.length !== 0) {
        let token = tokens.shift();
        if (!isNaN(Number(token))) {
            valStack.push(token);
            continue;
        }
        while (opStack.length !== 0
            && Operations.order[opStack.slice(-1)] >= Operations.order[token]) {
            let func = Operations.getOperation(opStack.pop());
            let b = Number(valStack.pop());
            let a = Number(valStack.pop());
            // Catch division by zero.
            if (b === 0 && func === Operations.calcDiv) {
                return NaN;
            }
            valStack.push(func(a, b));
        }
        opStack.push(token);
    }
    while (opStack.length !== 0) {
        let func = Operations.getOperation(opStack.pop());
        let b = Number(valStack.pop());
        let a = Number(valStack.pop())
        // Catch division by zero.
        if (b === 0 && func === Operations.calcDiv) {
            return NaN;
        }
        valStack.push(func(a, b));
    }
    return valStack.pop();
}

function truncate(number) {
    if (number.toString().search("e+") === -1) {
        return Number(number.toPrecision(12)).toString().substring(0, 12);
    }
    // Special handling for scientific notation.
    let expIndex = number.toString().search("e+");
    let exponent = number.toString().slice(expIndex);
    let ret = number.toPrecision(8).toString().substring(0, 8);
    return Number(ret + exponent);
}

function computeResult(opStack, valStack, resetFlag) {
    var value = Number(document.querySelector("#display").textContent);
    if (resetFlag) {
        appendToHistory(value, null, resetFlag);
        return;
    }
    appendToHistory(value);
    let result = evalStack(opStack, valStack);
    if (result.toString().length > 12) {
        result = truncate(result);
    }
    clearDisplay();
    if (isNaN(result)) {
        // Division by zero error
        clear(opStack, valStack);
        printToDisplay("ಠ_ಠ");
    } else if (!isFinite(result)) {
        // Overflow error
        clear(opStack, valStack);
        printToDisplay("OVERFLOW");
    } else {
        printToDisplay(result);
    }
}

function buttonHandler(e, stack) {
    const button = e.target.dataset.val;
    if (button === "c") {
        clear(stack.opStack, stack.valStack);
    } else if (button === "d") {
        let disp = document.querySelector("#display");
        disp.textContent = disp.textContent.substring(0, disp.textContent.length - 1);
    } else if (button === "=") {
        computeResult(stack.opStack, stack.valStack, stack.resetFlag);
        stack.resetFlag = true;
    } else if (button === "pm") {
        let disp = document.querySelector("#display");
        let value = Number(disp.textContent);
        if (value !== 0) {
            value = value * -1;
        }
        disp.textContent = value;
    } else if (e.target.classList.contains("operatorBtn")) {
        let value = Number(document.querySelector("#display").textContent);
        appendToHistory(value, button, stack.resetFlag);
        stack.resetFlag = false;
        clearDisplay();
    } else {
        if (stack.resetFlag) {
            clear(stack.opStack, stack.valStack);
            stack.resetFlag = false;
        }
        printToDisplay(button);
    }
}

window.onload = function main() {
    const buttonArray = document.querySelectorAll(".btn");
    var stack = new Stack();
    buttonArray.forEach(btn => btn.addEventListener("click", e =>
        buttonHandler(e, stack)));
}
