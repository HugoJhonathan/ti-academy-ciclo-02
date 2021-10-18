import { arrayFrutas } from './script.js';

const listaProdutos = document.querySelector("#produtos");
const mostraTotalCompra = document.querySelector("#mostraTotalCompra");

let arrayCestaCliente = []; // Array da cesta que irá armazenar o id refencia das frutas selecionadas

function listarFrutas(produtos, local) { // parâmetro do array dos produtos e o local onde será adicionada
    for (let produto of produtos) {
        let addFruta = document.createElement('li');
        local.appendChild(addFruta).setAttribute('data-preco', produto.preco);
        local.appendChild(addFruta).setAttribute('data-id', produto.id);
        local.appendChild(addFruta).textContent = produto.fruta;
    }
}

function adicionarNoCarrinho() { // Função para capturar clique na lista de frutas
    let frutas = document.querySelectorAll("#produtos > li");
    frutas.forEach(function(listaFrutas) { // Capturando click nas frutas da Lista de Produtos
        listaFrutas.addEventListener('click', function(elemento) {
            let produto = elemento.target;
            mostrarNoCarrinho(produto);
        });
    });
}

function mostrarNoCarrinho(produto) { // Função para validar/enviar o produto selecionado para cesta
    console.log('-----------------');
    try { // faz as verificações e possíveis causas de error
        function procuraObjetonoArray(objeto) {
            return ((objeto.fruta === `${produto.innerHTML}`) &&
                (objeto.id === Number(produto.dataset.id)) &&
                (objeto.preco === Number(produto.dataset.preco)));
        }
        if (arrayFrutas.findIndex(procuraObjetonoArray) === -1) { // Verifica se a fruta de fato existe no array de fruta, pois caso o usuario inspecionar
            throw new Error("Atualize a página e tente novamente"); // conseguiria alterar os valores
        }

        let frutaAdd = Number(produto.dataset.id);

        if (!arrayCestaCliente.includes(frutaAdd)) { // Verifica se a fruta ainda não foi adicionada na cesta 
            produto.style.textDecoration = "line-through"; // tachar a fruta que acabou de adicionar na cesta

            arrayCestaCliente.push(frutaAdd); // adiciona o id da fruta para o arrau da cesta

            let addFruta = document.createElement('li');
            let btnExcluir = document.createElement('div')

            cestaDoCliente.appendChild(addFruta).setAttribute('data-preco', produto.dataset.preco);
            cestaDoCliente.appendChild(addFruta).setAttribute('data-id', produto.dataset.id);

            cestaDoCliente.appendChild(addFruta).textContent =
                `${produto.innerHTML}: ${Number(produto.dataset.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}/Kg`;

            let divExcluir = cestaDoCliente.lastChild;
            let divCriada = divExcluir.appendChild(btnExcluir); // Cria o botão de excluir e guarda a referencia
            divCriada.textContent = 'Excluir'; // Adiciona o texto
            divCriada.setAttribute('class', 'btn-excluir-cesta'); // Adiciona a classe
            divCriada.setAttribute('data-id', produto.dataset.id);
            divCriada.addEventListener('click', removerProdutos);
            console.log('Produto adicionado na cesta! array dela:', arrayCestaCliente);
            calcularTotalCompra();
        } else {
            alert(`Este item ${produto.innerHTML} já está na sua cesta!`);
        }
    } catch (error) { // Mostra um dos erros que ocorrer em try
        alert(error)
    }
}

function removerProdutos(evento) {

    let id = evento.target.dataset.id;
    let posicao = arrayCestaCliente.findIndex(verificar);

    function verificar(valor) {
        return valor === Number(id);
    }

    console.log('Removido o produto que possui id:', id);
    console.log(`que está na posição: ${posicao} do Array da cesta`);
    console.log('Cesta agora depois da exclusão:', arrayCestaCliente);

    arrayCestaCliente.splice(posicao, 1); // remove do array da cesta a fruta selecionada pra excluir

    let produtosNaLista = document.querySelectorAll("#produtos > li");
    produtosNaLista.forEach(mudarCor);

    function mudarCor(item) { // Função que percorre a lista das frutas para remover a marcação da fruta que ja foi adicionada na cesta
        if (item.dataset.id === id) {
            item.style.color = '#000';
            item.style.textDecoration = "none";
        }
    }

    let produtos = document.querySelectorAll("#cestaDoCliente > li");
    produtos.forEach(cestaCliente);

    function cestaCliente(item) { // Função que percorre a lista da cesta para remover a fruta selecionada e recalcular o total
        if (item.dataset.id === String(id)) {
            item.remove();
            calcularTotalCompra();
        }
    }
}

function calcularTotalCompra() { // Função que calcula o total da cesta

    let valorTotalCesta = 0; // Cada chama inicia em 0, pois o valor será somando de acordo com os valores do array da cesta
    console.log('Cesta do cliente', arrayCestaCliente);
    for (let i of arrayCestaCliente) {
        for (let obj of arrayFrutas) { // Percorre o array das Frutas para somar o total de acordo com o array de id's que tem a cesta
            if (obj.id === i) {
                valorTotalCesta += obj.preco;
            }
        }
    }
    mostraTotalCompra.value = valorTotalCesta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); // mostra no input o total na cesta
}
export { adicionarNoCarrinho, listarFrutas, calcularTotalCompra, listaProdutos };