import React, { useState, useEffect } from 'react';

export default function App() {
  const [ respositories, setRespositories ] = useState([]);

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/henrique010/repos');
    const data = await response.json();

    setRespositories(data);
  }, [] );

  useEffect(() => {
    const favoriteRepos = respositories.filter(repo => repo.favorite);

    document.title = `Você tem ${favoriteRepos.length} favoritos`;

  }, [respositories] );

  function handleFavorite(id){
    const newRepositories = respositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    });

    setRespositories(newRepositories);
  }

  return (
      <ul>
        {respositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
  );
}

