// styles
import './styles.scss';

type RepositoryItemProps = {
  repository: {
    name: string;
    description: string;
    url: string;
  }
}

function RepositoryItem({ repository }: RepositoryItemProps): JSX.Element {
  return (
    <li className="repository-item">
      <strong>{repository.name}</strong>
      <p>{repository.description}</p>
      <a href={repository.url}>URL</a>
    </li>
  );
}

export default RepositoryItem;
