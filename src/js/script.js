'use strick';

let startBtn = document.querySelector('#start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    expensesItem = document.querySelectorAll('.expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value');

expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

let money, time;

startBtn.addEventListener('click', function(){
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц', '');

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt(
            'Ваш бюджет на месяц (пожалуюста, пишите реальные цифры бюджета)', ''
        );
    }
    appData.timeData = time;
    appData.budget = money;
    budgetValue.textContent = appData.budget.toFixed(); 
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value  = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDay();

    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBtn.disabled = false;
});

let appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false,

        chooseExpenses: function () {
            let sum = 0;

            for (let i = 0; i < expensesItem.length; i++) {
                let a = expensesItem[i].value,
                    b = +expensesItem[++i].value;
                if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null &&
                    a != '' && b != '' && a.length < 50) {
                    console.log('done');
                    appData.expenses[a] = b;
                    sum += +b;
                } else {
                    console.log("error!");
                    i--;
                }
            }

            expensesValue.textContent = sum;
        },

        detectDayBudget: function(){
            if(appData.budget != undefined){
                appData.moneyPerDay = (appData.budget / 30).toFixed(2);
                dayBudgetValue.textContent = appData.moneyPerDay;

                if (appData.moneyPerDay < 100) {
                    levelValue.textContent = "Это минимальный уровень достатка!";
                } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                    levelValue.textContent = "Это средний уровень достатка!";
                } else if (appData.moneyPerDay > 2000) {
                    levelValue.textContent = "Это высокий уровень достатка!";
                } else {
                    levelValue.textContent = "Произошла ошибка";
                }

            }else{
                alert('Произошла ошибка, не выведен доход');
            }
        },

        checkSavings: function(){
            if (appData.savings == true) {
                let save = +prompt('Какова сумма накопления?'),
                    percent = +prompt('Под какой процент?');
                appData.monthIncome = save / 100 / 12 * percent;
        
                alert('Доход в месяц с вашего депозита :' + appData.monthIncome);
            }
        },

        chooseOptExpenses: function(){
            for (let i = 0; i < optionalExpensesItem.length; i++) {
                let questionOptionalExpenses = optionalExpensesItem[i].value;
                appData.optionalExpenses[i] = questionOptionalExpenses;
                optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
            }
            console.log(appData.optionalExpenses);
        },

        chooseIncome: function(){
            let items = incomeItem.value;
            appData.income = items.split(', ');
            appData.income.sort();
            incomeValue.textContent = appData.income;
        }


};
console.log('Наша программа включает в себя данные: ');

for (let i in appData){
    console.log('Наша программа включает в себя данные:' + i + " - " + appData[i]);
}

expensesBtn.addEventListener('click', appData.chooseExpenses);
optionalExpensesBtn.addEventListener('click', appData.chooseOptExpenses);
countBtn.addEventListener('click', appData.detectDayBudget);
incomeItem.addEventListener('input', appData.chooseIncome);

checkSavings.addEventListener('click', function(){
    if(appData.savings == true){
        appData.savings = false;
    }else{
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function(){
    if(appData.savings == true){
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12 * percent;
        appData.yearIncome = sum/100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function(){
    if(appData.savings == true){
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12 * percent;
        appData.yearIncome = sum/100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

//WHILE

// let i = 0;
// while (i < 2) {
//     let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
//         b = +prompt("Во сколько обойдется?", '');
//     if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null &&
//         a != '' && b != '' && a.length < 50) {
//         console.log('done');
//         appData.expenses[a] = b;
//     } else {
//         console.log("error!");
//         i = 0;
//     }
//     i++;
// }

//DO .. WHILE 

// let i = 0;
// do {
//     let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
//         b = +prompt("Во сколько обойдется?", '');
//     if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null &&
//         a != '' && b != '' && a.length < 50) {
//         console.log('done');
//         appData.expenses[a] = b;
//     } else {
//         console.log("error!");
//         i = 0;
//     }
//     i++;
// }
// while (i < 2);
