let ALFABETO = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
    "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "X", "W", "Y", "Z"];

const numeroElementos = 5;

let key_word = "voce";

let word = doWord("mente");

let word_without_repetition = keywordWithoutRepetition(key_word);

let matriz = returnMatriz(ALFABETO, word_without_repetition);

console.log(matriz);

let json = returnWord(word, matriz);

let encrypted_word = returnEncrypt(json, matriz);

console.log(encrypted_word)

json = returnWord(encrypted_word, matriz);

let decrypted_word = returnDecrypt(json, matriz);

console.log(decrypted_word);




function doWord(string) {
    let form_word = [];

    string = string.toUpperCase();

    let array = string.split("");

    array.forEach(element => {
        if (element != " ") {
            form_word.push(element);
        }
    });    
    for (let i = 0; i < form_word.length; i++) {
        if (form_word[i] == 'J') {
            form_word[i] = 'I';
        }

        if (form_word[i] == form_word[i + 1]) {
            form_word.splice(i + 1, 0, "X");
        }

    }

    if (form_word.length % 2 == 1) {
        form_word.push("X");
    }

    return form_word;
}

function keywordWithoutRepetition(string) {
    string = string.toUpperCase();

    array = string.split("");
    

    for (let i = 0; i < array.length; i++) {
        if (array[i] == 'J') {
            array[i] = 'I';
        }
    }

    for (let i = 0; i < array.length; i++) {
        for (let j = array.length - 1; j >= 0; j--) {
            if (array[i] == array[j] && i != j) {
                array.splice(j, 1);
            }
        }
    }
    return array;
}

function returnMatriz(array, string) {
    let matriz = [[],[],[],[],[]];
    let aux1 = string;
    let aux2 = array;

    for (let i = 0; i < aux1.length; i++) {
        for (let j = 0; j < aux2.length; j++) {
            if (aux1[i] == aux2[j]) {
                aux2.splice(j, 1);
            }
        }
    }

    for (let i = aux1.length - 1; i >= 0; i--) {
            aux2.unshift(aux1[i]);
    }

    

    for (let i = 0; i < numeroElementos; i++) {
        for (let j = 0; j < numeroElementos; j++) {
            matriz[i][j] = aux2[0];
            aux2.splice(0,1);
        }   
        
    }    
    return matriz;

}

function returnWord(par, matriz){
    let array = [];
    for (let i = 0; i < par.length; i++) {
        for (let j = 0; j < 5; j++) {
            for (let k = 0; k < 5; k++) {
                if(par[i] == matriz[j][k])
                    array[i] = {"linha":j, "coluna":k};
            }
            
        }   
    }    
    return array;
}

function returnEncrypt(json, matriz){
    let word = [];
    
    let cont = 0;
    let tamanho = json.length;    
    while(cont < tamanho){
        if(json[cont].linha === json[cont + 1].linha){
            let calcColum = (json[cont].coluna + 1) % 5;
            word.push(matriz[(json[cont].linha)][calcColum]);
            calcColum = (json[cont + 1].coluna + 1) % 5;
            word.push(matriz[json[cont].linha][calcColum]);
        }
        if(json[cont].coluna === json[cont + 1].coluna){
            let calcLine = (json[cont].linha + 1) % 5;
            word.push(matriz[calcLine][json[cont].coluna]);
            calcLine = (json[cont + 1].linha + 1) % 5;
            word.push(matriz[calcLine][json[cont].coluna]);
        }
        if(json[cont].coluna !== json[cont + 1].coluna && json[cont].linha !== json[cont + 1].linha){

            word.push(matriz[json[cont].linha][json[cont + 1].coluna]);
            word.push(matriz[json[cont + 1].linha][json[cont].coluna]);
        }

        console.log(cont)
        cont += 2;
    }
    return word;
}

function returnDecrypt(json, matriz){
    let word = [];
    
    let cont = 0;
    let tamanho = json.length;
    
    while(cont < tamanho){
        if(json[cont].linha === json[cont + 1].linha){
            if(json[cont].coluna === 0){
                json[cont].coluna = 5;
            }
            if(json[cont + 1].coluna === 0){
                json[cont + 1].coluna = 5;
            }
            let calcColum = (json[cont].coluna - 1) % 5;
            word.push(matriz[(json[cont].linha)][calcColum]);
            calcColum = (json[cont + 1].coluna - 1) % 5;
            word.push(matriz[json[cont].linha][calcColum]);
        }
        if(json[cont].coluna === json[cont + 1].coluna){
            if(json[cont].linha === 0){
                json[cont].linha = 5;
            }
            if(json[cont + 1].linha === 0){
                json[cont + 1].linha = 5;
            }
            let calcLine = (json[cont].linha - 1) % 5;
            word.push(matriz[calcLine][json[cont].coluna]);
            calcLine = (json[cont + 1].linha - 1) % 5;
            word.push(matriz[calcLine][json[cont].coluna]);
        }
        if(json[cont].coluna !== json[cont + 1].coluna && json[cont].linha !== json[cont + 1].linha){

            word.push(matriz[json[cont].linha][json[cont + 1].coluna]);
            word.push(matriz[json[cont + 1].linha][json[cont].coluna]);
        }        
        cont += 2;
    }
    return word;
}