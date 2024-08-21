
let btnEnviar = document.querySelectorAll('#botoes button')[0];
let btnExcluir = document.querySelectorAll('#botoes button')[1];
let btnEditar = document.querySelectorAll('#botoes button')[2];

let nome = document.querySelectorAll('#wrap input')[0];
let quantidade = document.querySelectorAll('#wrap input')[1];
let Validade = document.querySelectorAll('#wrap input')[2];

let COD = document.querySelectorAll('#wrap input')[3];

let tabela = document.querySelector('#saida table');
let BD = [];

btnEnviar.onclick = function(){
    let produto = new Object();
    produto.nome = nome.value;
    produto.quantidade = quantidade.value;
    produto.Validade = Validade.value;
    produto.ID = ID.value;
    produto.id = BD.length;
    BD.push(produto);
    tabela.innerHTML += `<tr><td><input type="checkbox" id="${produto.id}" onchange="verificar(this.id)"></td><td>${produto.nome}</td><td>${produto.quantidade}</td><td>${Validade.value}</td></tr>`;
}

btnExcluir.onclick = function(){
    for (let i = 0; i < BD.length; i++){
        let elemento = document.querySelectorAll('#saida table tr td input')[i];
        if (elemento.checked){
            BD.splice(elemento.id, 1);
            tabela.innerHTML = `<tr><td width="30px"></td><td>Nome</td><td>Quant.<td>Validade</td></td></tr>`;
            montarTabela();
        }
    }
}

function montarTabela(){
    for (let i = 0; i < BD.length; i++){
        tabela.innerHTML += `<tr><td width="30px"><input type="checkbox" id="${i}" onchange="verificar()"></td><td>${BD[i].nome}</td><td>${BD[i].quantidade}</td><td>${BD[i].Validade}</td></tr>`;
    }
}

btnEditar.onclick = function adicionarProduto(Produto){
    for (let i = 0; i < BD.length; i++){
        let elemento = document.querySelectorAll('#saida table tr td input')[i];
        if (elemento.checked){
            BD[i].nome = nome.value;
            BD[i].quantidade = quantidade.value;
            BD[i].Validade = Validade.value;

            BD[i].COD = COD.value;

            tabela.innerHTML = `<tr><td width="30px"></td><td>Nome</td><td>Quant.<td>Validade</td></td></tr>`;
            montarTabela();
        }
    }    
}

function verificar(id){
    let cont = 0;
    for (let i = 0; i < BD.length; i++){
        let elemento = document.querySelectorAll('#saida table tr td input')[i];
        if (elemento.checked){
            nome.value = BD[i].nome;
            quantidade.value = BD[i].quantidade;
            Validade.value = BD[i].Validade;
            COD.value = BD[i].COD;

            cont++;
            if (cont > 1){
                alert('Não é possível selecionar mais de 1 elemento.');
                elemento.checked = false;
                break;
            }
        }
    }
}

import Dexie from 'dexie'

const database = new Dexie('myDatabase')

database.version(1).stores({
    users: 'id++, name, lastname'
})

export default class Database {

    create(object) {
        database.users.add(object)
    }

    async read(id) {
        return await database.users.get(id)
    }

    update(id, object) {
        database.users.update(id, object)
    }

    delete(id) {
        database.users.delete(id)
    }

}

