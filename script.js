const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome-produto');
const sFornecedor = document.querySelector('#m-fornecedor');
const sPreco = document.querySelector('#m-preco');
const btnSalvar = document.querySelector('#btnSalvar');

let itens;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  if (edit) {
    sNome.value = itens[index].nome;
    sFornecedor.value = itens[index].fornecedor;
    sPreco.value = itens[index].preco;
    id = index;
  } else {
    sNome.value = '';
    sFornecedor.value = '';
    sPreco.value = '';
  }
}