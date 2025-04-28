$(document).ready(function () {
    // Inicializa a animação dos botões
    initButtonEffects();

    // Configura os event listeners
    $('#decodeBtn').click(handleDecode);
    $('#resetBtn').click(handleReset);
    $('#inputCode').keypress(function (e) {
        if (e.which === 13) { // Enter key
            handleDecode();
        }
    });
});

/**
 * Inicializa os efeitos de hover nos botões
 */
function initButtonEffects() {
    $('.btn-6')
        .on('mouseenter', function (e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({ top: relY, left: relX });
        })
        .on('mouseout', function (e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({ top: relY, left: relX });
        });
}

/**
 * Manipula o evento de decifrar o código
 */
function handleDecode() {
    const inputCode = $('#inputCode').val().trim();

    if (!inputCode) {
        showResult('Por favor, insira um código para decifrar.');
        return;
    }

    const result = encontrarCodigo(inputCode);
    showResult(result);
}

/**
 * Manipula o evento de limpar/resetar
 */
function handleReset() {
    $('#inputCode').val('');
    $('#result').text('');
    $('#inputCode').focus();
}

/**
 * Exibe o resultado na tela
 * @param {string} text - Texto a ser exibido
 */
function showResult(text) {
    $('#result').text(text);
}

/**
 * Função principal que decifra o código
 * @param {string} str - String com o código desordenado
 * @returns {string} - Código decifrado
 */
function encontrarCodigo(str) {
    // Verifica se a string está vazia
    if (!str) return '';

    // Separa letras e caracteres especiais
    const letters = [];
    const specialChars = [];

    // Percorre cada caractere da string
    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        // Verifica se é uma letra (a-z ou A-Z)
        if (/[a-zA-Z]/.test(char)) {
            letters.push(char);
            specialChars.push(null); // Marca posição como letra
        } else {
            specialChars.push(char); // Armazena caractere especial
        }
    }

    // Se não há letras, retorna a string original
    if (letters.length === 0) return str;

    // Ordena as letras em ordem alfabética (case insensitive)
    letters.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    // Reconstrói a string com as letras ordenadas e caracteres especiais nas posições originais
    let result = [];
    let letterIndex = 0;

    for (let i = 0; i < specialChars.length; i++) {
        if (specialChars[i] === null) {
            // Insere a próxima letra ordenada
            result.push(letters[letterIndex]);
            letterIndex++;
        } else {
            // Mantém o caractere especial na posição original
            result.push(specialChars[i]);
        }
    }

    return result.join('');
}