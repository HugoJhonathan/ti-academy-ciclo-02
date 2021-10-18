import { arrayFrutas } from './script.js';

let valorTotalCesta = 0;
const listaProdutos = document.querySelector("#produtos");
const mostraTotalCompra = document.querySelector("#mostraTotalCompra");
mostraTotalCompra.value = valorTotalCesta.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

let arrayCestaCliente = [];

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
            elemento.target.style.textDecoration = "line-through"; // tachar as frutas já adicionadas na cesta
            let produto = elemento.target;
            mostrarNoCarrinho(produto);
        });
    });
}

function mostrarNoCarrinho(produto) { // Função para validar/enviar o produto selecionado para cesta
    console.log('-----------------');
    try { // faz as verificações e possíveis causas de error
        function procuraObjetonoArray(objeto) {
            return ((objeto.fruta === `${produto.innerHTML}`) && (objeto.id === Number(produto.dataset.id)) && (objeto.preco === Number(produto.dataset.preco)));
        }

        if (arrayFrutas.findIndex(procuraObjetonoArray) === -1) { // Verifica se a fruta de fato existe no array de fruta, pois caso o usuario inspecionar
            throw new Error("Atualize a página e tente novamente"); // conseguiria alterar os valores
        }

        if ((arrayCestaCliente.findIndex(item => (item.id === produto.dataset.id)) === -1)) { // verifica se ja foi adicionado na cesta 

            let frutaAdd = { // objeto com o produto selecionado para ir pra cesta
                fruta: produto.innerHTML,
                preco: Number(produto.dataset.preco),
                id: String(produto.dataset.id),
            };
            console.log(frutaAdd);
            arrayCestaCliente.push(frutaAdd); // adiciona a fruta no array da cesta


            let addFruta = document.createElement('li');
            let btnExcluir = document.createElement('div')

            cestaDoCliente.appendChild(addFruta).setAttribute('data-preco', frutaAdd.preco);
            cestaDoCliente.appendChild(addFruta).setAttribute('data-id', frutaAdd.id);

            cestaDoCliente.appendChild(addFruta).textContent = `${frutaAdd.fruta}: ${frutaAdd.preco.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}`;

            let divExcluir = cestaDoCliente.lastChild;
            let divCriada = divExcluir.appendChild(btnExcluir); // Cria o botão de excluir e guarda a referencia
            divCriada.textContent = 'Excluir'; // Adiciona o texto
            divCriada.setAttribute('class', 'btn-excluir-cesta'); // Adiciona a classe
            divCriada.setAttribute('data-id', frutaAdd.id);
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

    function procuraObjetonoArray(objeto) {
        return ((objeto.id === id));
    }

    console.log('Removido o produto que possui id:', id);
    console.log(`que está na posição: ${arrayCestaCliente.findIndex(procuraObjetonoArray)} do Array da cesta`);
    console.log('Cesta agora depois da exclusão:', arrayCestaCliente);

    arrayCestaCliente.splice(arrayCestaCliente.findIndex(procuraObjetonoArray), 1); // remove do array da cesta a fruta selecionada pra excluir

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
        if (item.dataset.id === id) {
            item.remove();
            calcularTotalCompra();
        }
    }
}

function calcularTotalCompra() { // Função que calcula o total da cesta

    valorTotalCesta = 0;
    for (let i of arrayCestaCliente) { // Percorre todo o array da cesta e soma o preço, assim evita do usuario mudar o valor do data-preco
        valorTotalCesta += i.preco; // e acabar mostrando a soma errada.
    }
    mostraTotalCompra.value = valorTotalCesta.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

export { adicionarNoCarrinho, listarFrutas, listaProdutos };