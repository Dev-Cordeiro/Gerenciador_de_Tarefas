import React, { useState } from 'react';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    const novaTarefaObj = { id: new Date().getTime(), nome: novaTarefa, concluida: false };
    setTarefas(prevTarefas => [...prevTarefas, novaTarefaObj]);
    setNovaTarefa('');
  };

  const completarTarefa = (id) => {
    setTarefas(prevTarefas => 
      prevTarefas.map(tarefa => tarefa.id === id ? {...tarefa, concluida: true} : tarefa)
    );
  };
  
  const removerTarefasConcluidas = () => {
    const tarefasRestantes = tarefas.filter(tarefa => !tarefa.concluida);
    setTarefas(tarefasRestantes);
  };

  return (
    <div className="app">
      <h1>Gerenciador de Tarefas</h1>
      <div className="adicionar-tarefa">
        <input 
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Adicione uma nova tarefa"
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <div className="listas">
        <div className="lista-tarefas-nao-concluidas">
          <h2>Não Concluídas</h2>
          <ul>
            {tarefas.filter(t => !t.concluida).map(tarefa => (
              <li key={tarefa.id}>
                {tarefa.nome}
                <button className="marcar-concluida" onClick={() => completarTarefa(tarefa.id)}>Concluir</button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="divisoria"></div>
        
        <div className="lista-tarefas-concluidas">
          <h2>Concluídas</h2>
          <ul>
            {tarefas.filter(t => t.concluida).map(tarefa => (
              <li key={tarefa.id}>{tarefa.nome}</li>
            ))}
          </ul>
        </div>
      </div>
      <button className="remover-concluidas" onClick={removerTarefasConcluidas}>Remover tarefas concluídas</button>
    </div>
  );
}

export default App;