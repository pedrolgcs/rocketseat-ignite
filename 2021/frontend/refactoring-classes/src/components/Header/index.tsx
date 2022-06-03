import { FiPlusSquare } from 'react-icons/fi';

// assets
import Logo from '../../assets/logo.svg';

// styles
import { Container } from './styles';

type HeaderProps = {
  openModal: () => void;
};

function Header({ openModal }: HeaderProps) {
  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button type="button" onClick={openModal}>
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  );
}

export default Header;
