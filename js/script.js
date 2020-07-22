'use strick';
let money, time;



function start() {
    money = +prompt('Ваш бюджет на месяц', '');

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt(
            'Ваш бюджет на месяц (пожалуюста, пишите реальные цифры бюджета)', ''
        );
    }
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
}

start();


let appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false,

        chooseExpenses: function () {
            for (let i = 0; i < 2; i++) {
                let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
                    b = +prompt("Во сколько обойдется?", '');
                if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null &&
                    a != '' && b != '' && a.length < 50) {
                    console.log('done');
                    appData.expenses[a] = b;
                } else {
                    console.log("error!");
                    i--;
                }
            }
        },

        detectDayBudget: function(){
            appData.moneyPerDay = (appData.budget / 30).toFixed(2);
            alert('Ежедневный бюджет:' + appData.moneyPerDay + ' р');
        },

        detectLevel: function(){
            if (appData.moneyPerDay < 100) {
                console.log("Это минимальный уровень достатка!");
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                console.log("Это средний уровень достатка!");
            } else if (appData.moneyPerDay > 2000) {
                console.log("Это высокий уровень достатка!");
            } else {
                console.log("Произошла ошибка");
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
            let i = 0;
            while (i<3) {
                let questionOptionalExpenses = prompt('Статья необязательных расходов?');
                appData.optionalExpenses[i] = questionOptionalExpenses;
                i++;
            }
            console.log(appData.optionalExpenses);
        },

        chooseIncome: function(){
            let items = prompt('Что принесет дополнительный доход? (напишите через запятую!)', '');
            if(items == '' || typeof(items) == null || typeof(items) != 'string'){
                console.log('ERROR!');
            }
            else{
                appData.income = items.split(', ');
                appData.income.push(prompt('Что еще?',''));
                appData.income.sort();
            }
            console.log('Способы доп. заработка:');
            appData.income.forEach(function(item,i){
                console.log((i+1) + ": " + item);
            });
        }


};
console.log('Наша программа включает в себя данные: ');

for (let i in appData){
    console.log('Наша программа включает в себя данные:' + i + " - " + appData[i]);
}

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
