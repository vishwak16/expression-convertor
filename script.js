function convertExpression() {
    const expression = document.getElementById("expression").value;
    const notation = document.getElementById("notation").value;
    let result;
    let stack = [];

    if (notation === "prefix") {
        result = infixToPrefix(expression, stack);
    } else {
        result = infixToPostfix(expression, stack);
    }

    document.getElementById("result").innerText = `Converted ${notation} notation: ${result}`;
    displayStackTable(stack);
}

function infixToPrefix(expression, stack) {
    let result = '';
    const precedence = {
        '^': 3,
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1,
        '(': 0
    };

    const tempStack = [];

    for (let i = expression.length - 1; i >= 0; i--) {
        const char = expression[i];

        if (char === ')') {
            tempStack.push(char);
        } else if (char === '(') {
            while (tempStack.length > 0 && tempStack[tempStack.length - 1] !== ')') {
                stack.push(tempStack.pop());
            }
            tempStack.pop(); // Remove ')'
        } else if (precedence[char] !== undefined) {
            while (tempStack.length > 0 && precedence[tempStack[tempStack.length - 1]] > precedence[char]) {
                stack.push(tempStack.pop());
            }
            tempStack.push(char);
        } else {
            stack.push(char);
        }
    }

    while (tempStack.length > 0) {
        stack.push(tempStack.pop());
    }

    result = stack.slice().reverse().join('');

    return result;
}

function infixToPostfix(expression, stack) {
    let result = '';
    const precedence = {
        '^': 3,
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1,
        '(': 0
    };

    const tempStack = [];

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (char === '(') {
            tempStack.push(char);
        } else if (char === ')') {
            while (tempStack.length > 0 && tempStack[tempStack.length - 1] !== '(') {
                stack.push(tempStack.pop());
            }
            tempStack.pop(); // Remove '('
        } else if (precedence[char] !== undefined) {
            while (tempStack.length > 0 && precedence[tempStack[tempStack.length - 1]] >= precedence[char]) {
                stack.push(tempStack.pop());
            }
            tempStack.push(char);
        } else {
            stack.push(char);
        }
    }

    while (tempStack.length > 0) {
        stack.push(tempStack.pop());
    }

    result = stack.join('');

    return result;
}

function displayStackTable(stack) {
    const stackTable = document.getElementById("stack-table");
    stackTable.innerHTML = "";

    const table = document.createElement("table");
    const headerRow = table.insertRow();
    headerRow.insertCell().innerText = "Step";
    headerRow.insertCell().innerText = "Stack";

    stack.forEach((element, index) => {
        const row = table.insertRow();
        row.insertCell().innerText = index + 1;
        row.insertCell().innerText = element;
    });

    stackTable.appendChild(table);
}
