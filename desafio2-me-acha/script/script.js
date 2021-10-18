import { pesquisaCep } from './modulo1.js';

const btnBuscar = document.querySelector("#buscarCep");
export const CepInput = document.querySelector("#cep");

btnBuscar.addEventListener('click', function() {
    if (CepInput.value.length !== 9) {
        CepInput.style.border = "2px solid red";
        return
    }
    pesquisaCep(CepInput.value);
});