const inputValor = document.getElementById('valor');
const selectConversao = document.getElementById('conversao');
const btnConverter = document.getElementById('btnConverter');
const btnLimpar = document.getElementById('btnLimpar');
const areaErro = document.getElementById('erro');
const containerRes = document.getElementById('resultado-container');
const txtResultado = document.getElementById('resultadoText');
const txtFormula = document.getElementById('formulaText');
const listaHistorico = document.getElementById('listaHistorico');

// Função principal de conversão
const realizarConversao = () => {
    // 1. Validações 
    const valorNum = parseFloat(inputValor.value);
    const tipo = selectConversao.value;

    // a cada conversao limpa area de mensagens de erro para evitar confusão com mensagens antigas
    limparMensagens();

    if (isNaN(valorNum)) {
        exibirErro("Por favor, digite um valor numérico válido.");
        return;
    }

    if (tipo === "") {
        exibirErro("Selecione um tipo de conversão.");
        return;
    }

    let resultado = 0;
    let simbolo = "";
    let formula = "";

    // 2. Lógica de Cálculo definida no input de tipo de conversão
    switch (tipo) {
        case 'c-f':
            resultado = (valorNum * 9/5) + 32;
            simbolo = " °F";
            formula = `Fórmula: (${valorNum}°C × 9/5) + 32`;
            break;
        case 'f-c':
            resultado = (valorNum - 32) * 5/9;
            simbolo = " °C";
            formula = `Fórmula: (${valorNum}°F - 32) × 5/9`;
            break;
        case 'm-cm':
            resultado = valorNum * 100;
            simbolo = " cm";
            formula = `Fórmula: ${valorNum}m × 100`;
            break;
        case 'cm-m':
            resultado = valorNum / 100;
            simbolo = " m";
            formula = `Fórmula: ${valorNum}cm / 100`;
            break;
        case 'kg-g':
            resultado = valorNum * 1000;
            simbolo = " g";
            formula = `Fórmula: ${valorNum}kg × 1000`;
            break;
        case 'g-kg':
            resultado = valorNum / 1000;
            simbolo = " kg";
            formula = `Fórmula: ${valorNum}g / 1000`;
            break;
        case 'h-m':
            resultado = valorNum * 60;
            simbolo = " min";
            formula = `Fórmula: ${valorNum}h × 60`;
            break;
        case 'm-h':
            resultado = valorNum / 60;
            simbolo = " h";
            formula = `Fórmula: ${valorNum}min / 60`;
            break;
        default:
            exibirErro("Conversão não implementada.");
            return;
    }

    exibirResultado(resultado, simbolo, formula);
};

// Funções de Auxílio
function exibirResultado(valor, sufixo, formula) {
    const formatado = valor.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
    txtResultado.innerText = `Resultado: ${formatado}${sufixo}`;
    txtFormula.innerText = formula;
    
    // Funcionalidade Extra: Mudar cor dinamicamente
    txtResultado.style.color = valor > 0 ? "#28a745" : "#007bff";
    
    containerRes.classList.remove('hidden');
    adicionarAoHistorico(`${inputValor.value} -> ${formatado}${sufixo}`);
}

// envia mensagem de erro para a área de erro usando o parametro msg e esconde o resultado
function exibirErro(msg) {
    areaErro.innerText = msg;
    containerRes.classList.add('hidden');
}

// limpa mensagem de erro e esconde resultado para evitar confusão com mensagens antigas
function limparMensagens() {
    areaErro.innerText = "";
}

// adicione ao historico de conversões um novo item no topo da lista a cada nova conversão realizada, usando o texto formatado do resultado da conversão
function adicionarAoHistorico(texto) {
    const item = document.createElement('li');
    item.innerText = texto;
    listaHistorico.prepend(item); 
}

// Evento Limpar
// apaga toda a informação dos inputs, mensagens de erro, resultado e histórico para começar uma nova conversão do zero
btnLimpar.addEventListener('click', () => {
    inputValor.value = "";
    selectConversao.value = "";
    limparMensagens();
    containerRes.classList.add('hidden');
    listaHistorico.innerHTML = "";
});

// Eventos de Execução
btnConverter.addEventListener('click', realizarConversao);

// Funcionalidade Extra: Converter automaticamente ao mudar o select
selectConversao.addEventListener('change', () => {
    if (inputValor.value !== "") realizarConversao();
});