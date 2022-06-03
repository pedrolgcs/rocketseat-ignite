import { useState, useEffect } from 'react';

// components
import RepositoryItem from './components/RepositoryItem';

// services
import { api } from '../../services/api';

// styles
import './styles.scss';

type Repository = {
  name: string;
  description: string;
  url: string;
};

function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    async function loadRepositories() {
      try {
        const { data } = await api.get<[Record<string, string>]>(
          '/orgs/rocketseat/repos'
        );

        const parsedData = data.map((data) => ({
          name: data.name,
          description: data.description,
          url: data.html_url,
        }));

        setRepositories(parsedData);
      } catch (error) {
        console.log(error);
      }
    }

    loadRepositories();
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de Repositórios</h1>

      <ul>
        {repositories.map((repository) => (
          <RepositoryItem repository={repository} key={repository.name} />
        ))}
      </ul>
    </section>
  );
}

export default RepositoryList;
