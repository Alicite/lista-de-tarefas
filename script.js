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
    
    if (document.querySelector('#bt-limpar') != null){
        const labelTarefa = document.querySelector('#label-tarefa')
        
        labelTarefa.removeChild(labelTarefa.lastChild)
    }
}

const atualizarLista = () => {
    localStorage.setItem('tarefasSalvas', JSON.stringify(tarefasAtuais))
    limparLista()
    tarefasAtuais.forEach((tarefa, i) => criarTarefa(tarefa.texto, i, tarefa.status))
    
    if (tarefasAtuais[0] && document.querySelector('#bt-limpar') == null){
        const labelTarefa = document.querySelector('#label-tarefa')
        const botaoLimpar = document.createElement('input')
        
        botaoLimpar.type = 'button'
        botaoLimpar.value = "🧹"
        botaoLimpar.id = 'bt-limpar'
        botaoLimpar.classList.add('bt')
        botaoLimpar.onclick = () => {
            tarefasAtuais = [];
            atualizarLista()
        }
        
        labelTarefa.appendChild(botaoLimpar)
    }   
}

const criarTarefa = (texto, indice, status) => {
    const listaDeTarefas = document.querySelector('#lista-de-tarefas')
    const tarefa = document.createElement('li')
    
    tarefa.classList.add('tarefa')

    if (status === ''){
        tarefa.innerHTML = `<input type="checkbox" data-chave="${indice}"><div class='texto-tarefa'> ${texto} </div><input type="button" value="❌" class="bt" data-chave="${indice}">`
    } else {
        tarefa.innerHTML = `<input type="checkbox"${status} data-chave="${indice}"><div class='texto-tarefa-marcada'> ${texto} </div><input type="button" value="❌" class="bt" data-chave="${indice}">`
    }
    
    listaDeTarefas.appendChild(tarefa)
};


const addTarefa = (texto) => {
    tarefasAtuais.push({texto, status: ''})
    localStorage.setItem('tarefasSalvas', JSON.stringify(tarefasAtuais))
}

let tarefasAtuais = verificarBD();

const btEnviar = document.querySelector('#bt-enviar')
const inputTarefa = document.querySelector('#input-tarefa')
const listaDeTarefas = document.querySelector('#lista-de-tarefas')

btEnviar.addEventListener('click', () => {
    const textoTarefa = document.querySelector('#input-tarefa').value
    
    if (textoTarefa === ''){
        alert('Insira uma tarefa antes de adicionar!')
    } else {
        addTarefa(textoTarefa)
        document.querySelector('#input-tarefa').value = ''
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
            document.querySelector('#input-tarefa').value = ''
            atualizarLista()
        }
    }
})

listaDeTarefas.addEventListener('click', (evento) => {
    const alvoDoClique = evento.target
    const chave = alvoDoClique.dataset.chave

    if (alvoDoClique.type === 'button'){
        tarefasAtuais.splice(chave, 1)
        
        atualizarLista()
    } else if (alvoDoClique.type === 'checkbox'){
        if (tarefasAtuais[chave].status === ''){
            tarefasAtuais[chave].status = 'checked'
        } else {
            tarefasAtuais[chave].status = ''
        }

        atualizarLista()
    }
})

atualizarLista()
