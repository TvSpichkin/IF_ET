import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

var decoded; // Объявление копии массива для расшифровки

function decoder() {
    decoded = JSON.parse(JSON.stringify(encoded)); // Создание копии массива для расшифровки
    let trueKeys = Object.keys(decoded[0]).filter(s => (s.slice(-2).toLowerCase() == 'id')&&(s != 'groupId')), // Создание массива для нужных ключей структуры
    allIds = Object.keys(translations), // Создание массива всех идентификаторов
    uniIds = []; // Создание массива уникальных идентификаторов
    
    for(let i = 0; i < decoded.length; i++) for(let j = 0; j < trueKeys.length; j++) if(allIds.indexOf(decoded[i][trueKeys[j]]) != -1) {
        if(uniIds.indexOf(decoded[i][trueKeys[j]]) == -1) uniIds.push(decoded[i][trueKeys[j]]); // Заполнение массива уникальных идентификаторов
        decoded[i][trueKeys[j]] = translations[decoded[i][trueKeys[j]]]; // Расшифровка полей
    }
    
    console.log(uniIds);
}

decoder();
console.log(decoded)
