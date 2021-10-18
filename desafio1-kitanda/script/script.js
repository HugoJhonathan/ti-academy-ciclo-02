import { adicionarNoCarrinho, listarFrutas, calcularTotalCompra, listaProdutos } from './modulo1.js';

export let arrayFrutas = [{
    id: 1,
    fruta: "Mamão Papaia",
    preco: 5.99,
}, {
    id: 2,
    fruta: "Laranja",
    preco: 8.89,
}, {
    id: 3,
    fruta: "Manga",
    preco: 4.29,
}, {
    id: 4,
    fruta: "Melão",
    preco: 7.99,
}, {
    id: 5,
    fruta: "Melancia",
    preco: 1.89,
}, ];

listarFrutas(arrayFrutas, listaProdutos); // inicialmente listar as frutas na lista de produtos

adicionarNoCarrinho();

calcularTotalCompra();