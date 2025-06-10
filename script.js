const input = document.getElementById('nova-tarefa');
const botao = document.getElementById('adicionar-tarefa');
const lista = document.getElementById('lista-tarefas');
const botaoTema = document.getElementById('alternar-tema');

carregarTarefas();

botao.addEventListener('click', function() {
    const texto = input.value.trim();
    if (texto !== '') {
        const li = document.createElement('li');
        li.className = 'tarefa';
        li.innerHTML = `
            <span class="nome-tarefa">${texto}</span>
            <button class="remover-tarefa">Remover</button>
        `;
        lista.appendChild(li);
        input.value = '';
        salvarTarefas();
    }
});

lista.addEventListener('click', function(event) {
    if (event.target.classList.contains('remover-tarefa')) {
        const tarefa = event.target.parentElement;
        lista.removeChild(tarefa);
        salvarTarefas();
    }
});

input.addEventListener('keydown', function(event) {
    if(event.key === 'Enter'){
        botao.click();
    }
});

botaoTema.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('white-theme');
    if (document.body.classList.contains('dark-theme')) {
        botaoTema.textContent = 'Tema Claro';
    } else {
        botaoTema.textContent = 'Tema Escuro';
    }
});
document.body.classList.add('white-theme');
document.body.classList.remove('dark-theme');

function salvarTarefas() {
    const tarefas = [];
    document.querySelectorAll('.nome-tarefa').forEach(span => {
        tarefas.push(span.textContent);
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(texto => {
        const li = document.createElement('li');
        li.className = 'tarefa';
        li.innerHTML = `
            <span class="nome-tarefa">${texto}</span>
            <button class="remover-tarefa">Remover</button>
        `;
        lista.appendChild(li);
    });
}