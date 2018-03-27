
var alfabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

var cifrar_letra = function(letra, valor){
	const TAMANHO_TEXTO = 26;
	for(var i = 0; i < letra.length; i++){
		for(var j = 0; j < alfabeto.length; j++){
			if(alfabeto[j] == letra[i]){
				return alfabeto[(j + valor)%TAMANHO_TEXTO];
			}
		}
	}
}


var decifrar_letra = function(letra, valor){
	const TAMANHO_TEXTO = 26;
	for(var i = 0; i < letra.length; i++){
		for(var j = 0; j < alfabeto.length; j += 1){
			if(letra[i] == alfabeto[j]){
				return alfabeto[((j - valor)+TAMANHO_TEXTO)%TAMANHO_TEXTO];
			}
		}
	}
}



var posicao = function(char){
	for (var i = 0; i < alfabeto.length; i+=1){
		if (alfabeto[i] === char){
			return i;
		} 
	}
}

var cifrar = function(texto, chave){
	var cifrado = '';

	texto = remover_acento(texto);

	for(var i = 0; i < texto.length; i+=1){
		switch(texto[i]){
			case ' ':
				cifrado += texto[i];
				break;
			case ',':
				cifrado += texto[i];
				break;
			case '.':
				cifrado += texto[i];
				break;
			case '!':
				cifrado += texto[i];
				break;
			case '?':
				cifrado += texto[i];
				break;
			case '"':
				cifrado += texto[i];
				break;
			default:
				cifrado += cifrar_letra(texto[i], posicao(chave[i]));
		}
	}

	return cifrado;
}


var decifrar = function(texto, chave){
	var decifrado = '';

	texto = remover_acento(texto);

	for(var i = 0; i < texto.length; i+=1){
		switch(texto[i]){
			case ' ':
				decifrado += texto[i];
				break;
			case ',':
				decifrado += texto[i];
				break;
			case '.':
				decifrado += texto[i];
				break;
			case '!':
				decifrado += texto[i];
				break;
			case '?':
				decifrado += texto[i];
				break;
			case '"':
				decifrado += texto[i];
				break;
			default:
				decifrado += decifrar_letra(texto[i], posicao(chave[i]));
		}
	}

	return decifrado;
}



var alterar_chave = function(chave, texto){
	var nova_chave = '';
	chave = retirar_espacos(chave);
	chave = remover_acento(chave);

	while(nova_chave.length < texto.length){
		nova_chave += chave;
	}

	if(nova_chave.length > texto.length){
		chave = '';

		for(var i = 0; i < texto.length; i += 1){
			chave += nova_chave[i];
		}

		console.log(nova_chave);

		return adicionar_espacos(texto, chave);
	}

	return adicionar_espacos(texto, nova_chave);
}

// Retira espaços da chave
var retirar_espacos = function(chave){
	var nova_chave = '';

	for(var i = 0; i < chave.length; i++){
		if(chave[i] != ' '){
			nova_chave += chave[i];
		}
	}

	return nova_chave;
}



