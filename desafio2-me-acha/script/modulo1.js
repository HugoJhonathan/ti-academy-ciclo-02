import { CepInput } from './script.js';

window.onload = function() {
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
    });

    CepInput.addEventListener('keyup', function() {
        CepInput.value = CepInput.value.replace(/\D+/g, '');
        CepInput.value = CepInput.value.replace(/^(\d{5})(\d{3}).*/, "$1-$2");
        CepInput.style.border = "2px solid black";
    });
}

const formulario = document.querySelector('#form-endedeco');

let pesquisaCep = async function(cep) {
    document.querySelector('#loading').style.display = 'flex';

    let url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        let dadosFetch = await fetch(url); // response
        let dadosJson = await dadosFetch.json(); // json do dadosFetch
        console.log('dadosJson', dadosJson);
        console.log('dadosFetch', dadosFetch);

        if (dadosJson.erro) {
            formulario.reset();
            formulario.cep.focus();
            throw new Error("CEP não localizado! Tente novamente");
        }
        if (dadosJson) {
            setTimeout(function() {
                document.querySelector('#loading').style.display = 'none';
                resultadoCep(dadosJson); // envia o json para outra função
            }, 300);
        }
    } catch (error) { // se der erro
        setTimeout(function() {
            document.querySelector('#loading').style.display = 'none';
        }, 300);
        alert(error);
    }
}

function resultadoCep(pesquisaCep) {
    for (let campo in pesquisaCep) {
        if (document.querySelector(`#${campo}`)) {
            document.querySelector(`#${campo}`).value = pesquisaCep[campo];
        }
    }
}

export { pesquisaCep }