const verificarBD = () => {
    const bancoDeDados = localStorage.getItem('tarefasSalvas')
    if (!bancoDeDados){
        return []
    } else {
        const listaBD = JSON.parse(bancoDeDados)
        return listaBD
    }

}

const limparLista = () => {
    while (listaDeTarefas.firstChild){
        listaDeTarefas.removeChild(listaDeTarefas.lastChild)
    }
}

const atualizarLista = () => {
    localStorage.setItem('tarefasSalvas', JSON.stringify(tarefasAtuais))
    limparLista()
    tarefasAtuais.forEach((tarefa, i) => criarTarefa(tarefa, i))
}

const criarTarefa = (texto, indice) => {
    const listaDeTarefas = document.querySelector('#lista-de-tarefas')
    const tarefa = document.createElement('li')
    
    tarefa.classList.add('tarefa')
    tarefa.innerHTML = `${texto} <input type="button" value="❌" class="bt" data-chave="${indice}">`
    listaDeTarefas.appendChild(tarefa)
};


const addTarefa = (texto) => {
    tarefasAtuais.push(texto)
    localStorage.setItem('tarefasSalvas', JSON.stringify(tarefasAtuais))
}

let tarefasAtuais = verificarBD();

const btEnviar = document.querySelector('#bt-enviar')
const inputTarefa = document.querySelector('#input-tarefa')
const listaDeTarefas = document.querySelector('#lista-de-tarefas')
const botaoLimpar = document.querySelector('#bt-limpar')

btEnviar.addEventListener('click', () => {
    const textoTarefa = document.querySelector('#input-tarefa').value
    
    if (textoTarefa === ''){
        alert('Insira uma tarefa antes de adicionar!')
    } else {
        addTarefa(textoTarefa)
        atualizarLista()
    }
})

inputTarefa.addEventListener('keyup', (evento) => {
    const teclaPress = evento.key
    if (teclaPress == 'Enter') {
        const textoTarefa = document.querySelector('#input-tarefa').value
        
        if (textoTarefa === ''){
            alert('Insira uma tarefa antes de adicionar!')
        } else {
            addTarefa(textoTarefa)
            atualizarLista()
        }
    }
})

listaDeTarefas.addEventListener('click', (evento) => {
    const alvoDoClique = evento.target

    if (alvoDoClique.type === 'button'){
        const chave = alvoDoClique.dataset.chave
        tarefasAtuais.splice(chave, 1)
        
        atualizarLista()
    }
})

botaoLimpar.addEventListener('click', () => {
    tarefasAtuais = [];
    atualizarLista()
})

atualizarLista()
