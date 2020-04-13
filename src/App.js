import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((resp) => {
      //console.log(resp.data);
      setRepositories(resp.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: "Project teste 1",
      owner: "Kalil Peixoto",
      techs: ["Java", "Spring Boot"],
    };

    const repositoryAdded = await api.post("repositories", repository);

    setRepositories([...repositories, repositoryAdded.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
