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

function deleteItem(index) {
    itens.splice(index, 1);
    setItensBD();
    loadItens();
  }
  
  function insertItem(item, index) {
    let tr = document.createElement('tr');
  
    tr.innerHTML = `
      <td class="acao">
      <button onclick="openModal(true, ${index})"><i class='bx bx-edit-alt' ></i></button> 
      </td>
      <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash' ></i></button>
      </td>
      <td>${item.nome}</td>
      <td>${item.fornecedor}</td>
      <td>R$ ${item.preco}</td>
    `;
    tbody.appendChild(tr);
  }
  
  btnSalvar.onclick = e => {
    if (sNome.value == '' || sFornecedor.value == '' || sPreco.value == '') {
      return;
    }
  
    e.preventDefault();

    if (id !== undefined) {
      itens[id].nome = sNome.value;
      itens[id].fornecedor = sFornecedor.value; // corrigido para fornecedor
      itens[id].preco = sPreco.value; // corrigido para preco
    } else {
      itens.push({'nome': sNome.value, 'fornecedor': sFornecedor.value, 'preco': sPreco.value}); // ajustado fornecedor e preco
    }
  
    setItensBD();
  
    modal.classList.remove('active');
    loadItens();
    id = undefined;
  };
  
  function loadItens() {
    itens = getItensBD();
    tbody.innerHTML = '';
    itens.forEach((item, index) => {
      insertItem(item, index);
    });
  }
  
  // Local Storage para salvar os itens
  const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
  const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));
  
  
  loadItens();

