const CORENCY = 'руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';

let expenses = [];

const inputNode = document.querySelector('.js-expenses-input');
const buttonNode = document.querySelector('.js-expenses-button');
const resetButtonNode = document.querySelector('.js-expenses-button-reset');
const historyNode = document.querySelector('.js-expenses-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const inputCategoryNode = document.querySelector('.spending-category');
const changeLimitButton = document.querySelector('.js-change-limit');


let LIMIT = parseInt(limitNode.innerText);



buttonNode.addEventListener ('click', function(){
    
    const currentAmount = getExpensFromUser()

    if(!currentAmount) {
        return
    }

    const currentCategory = getSelectedCategory()

    const newExpense = {amount: currentAmount, category: currentCategory}

    expenses.push(newExpense)
    
    // считаем сумму трат
    getTotal(expenses)
    
    // 3. Выведем новый список трат
    renderHistory(expenses)
    
    // сравнение с лимитом
    renderStatus(expenses)

    clearInput()
})

const clearButtonhHandler = () => {
    expenses = []

    renderHistory()
    renderStatus()
}

resetButtonNode.addEventListener('click', clearButtonhHandler)

changeLimitButton.addEventListener('click', function(){
    const getLimitFromUser = prompt('введите новый лимит')
    newLimit = parseInt(getLimitFromUser)

    if(!newLimit){
        return
    }

    limitNode.innerText = newLimit;
    LIMIT = newLimit;


    renderHistory()
    renderStatus()
})




const getExpensFromUser = () => {
    return parseInt(inputNode.value);
}

const getSelectedCategory = () => {
    return inputCategoryNode.value
}

const clearInput = () => {
    inputNode.value = '';
}

function getTotal(expenses) {
    let sum = 0;

    expenses.forEach(element => {
        sum += element.amount;    
    });

    sumNode.innerText = sum;

    return sum
}

function renderStatus() {
    total = getTotal(expenses);

    if(total <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.className = "status-positive";
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT-total} руб.)`;
        statusNode.className = "status-negative";
    }
}

function renderHistory() {
    let expensesListHTML = '';

    expenses.forEach(element => {
        expensesListHTML += `<li>${element.amount} ${CORENCY} -  ${element.category}</li>`;

    });

    historyNode.innerHTML = `<ol>${expensesListHTML} </ol>`;
}

