const verificarBD = () => {
    const bancoDeDados = localStorage.getItem('tarefasSalvas')
    if (!bancoDeDados){
        return []
    } else {
        const listaBD = JSON.parse(bancoDeDados)
        return listaBD
    }

}

const criarTarefa = (texto, indice) => {
    const listaDeTarefas = document.querySelector('#lista-de-tarefas')
    const tarefa = document.createElement('li')
    
    tarefa.classList.add('tarefa')
    tarefa.dataset.chave = indice
    tarefa.innerHTML = `${texto} <input type="button" value="❌" class="bt">`
    listaDeTarefas.appendChild(tarefa)
};


const addTarefa = (texto) => {
    tarefasAtuais.push(texto)
    localStorage.setItem('tarefasSalvas', JSON.stringify(tarefasAtuais))    
}

const tarefasAtuais = verificarBD();
tarefasAtuais.forEach((tarefa, i) => criarTarefa(tarefa, i))

const btEnviar = document.querySelector('#bt-enviar')
const inputTarefa = document.querySelector('#input-tarefa')

btEnviar.addEventListener('click', () => {
    const textoTarefa = document.querySelector('#input-tarefa').value
    
    if (textoTarefa === ''){
        alert('Insira uma tarefa antes de adicionar!')
    } else {
        criarTarefa(textoTarefa, tarefasAtuais.length)
        addTarefa(textoTarefa)
    }
})

inputTarefa.addEventListener('keyup', (evento) => {
    const teclaPress = evento.key
    if (teclaPress == 'Enter') {
        const textoTarefa = document.querySelector('#input-tarefa').value
        
        if (textoTarefa === ''){
            alert('Insira uma tarefa antes de adicionar!')
        } else {
            criarTarefa(textoTarefa, tarefasAtuais.length)
            addTarefa(textoTarefa)
        }
    }
})
