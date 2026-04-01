const verificarBD = () => {
    const bancoDeDados = localStorage.getItem('tarefasSalvas')
    if (!bancoDeDados){
        return []
    } else {
        const listaBD = JSON.parse(bancoDeDados)
        return listaBD
    }

}

const criarTarefa = (texto) => {
    const listaDeTarefas = document.querySelector('#lista-de-tarefas')
    const tarefa = document.createElement('li')
    
    tarefa.classList.add('tarefa')
    tarefa.dataset.chave = tarefasAtuais.length + 1
    tarefa.innerHTML = `${texto} <input type="button" value="❌" class="bt">`
    listaDeTarefas.appendChild(tarefa)
};


const addTarefa = (texto) => {
    tarefasAtuais.push(texto)
    localStorage.setItem('tarefasSalvas', JSON.stringify(tarefasAtuais))    
}

const tarefasAtuais = verificarBD();
tarefasAtuais.forEach((tarefa) => criarTarefa(tarefa))

const btEnviar = document.querySelector('#bt-enviar')

btEnviar.addEventListener('click', () => {
    const textoTarefa = document.querySelector('#input-tarefa').value
    
    if (textoTarefa === ''){
        alert('Insira uma tarefa antes de adicionar!')
    } else {
        addTarefa(textoTarefa)
        criarTarefa(textoTarefa)
    }
})

// btEnviar.addEventListener('keypress', (evento) => {
//     evento.preventDefault()
//     if (evento.key === 'enter'){
//         const textoTarefa = evento.target.value
//         if (textoTarefa === ''){
//             alert('Insira uma tarefa antes de adicionar!')
//         }
//         criarTarefa(textoTarefa)
//     }
// })
