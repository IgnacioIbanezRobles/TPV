let resultDisplay = document.getElementById('resultDisplay');

function appendToResult(value) {
    resultDisplay.value += value;
}

function clearResult() {
    resultDisplay.value = '';
}

function calculateResult() {
    try {
        resultDisplay.value = eval(resultDisplay.value);
    } catch (error) {
        resultDisplay.value = 'Error';
    }
}
