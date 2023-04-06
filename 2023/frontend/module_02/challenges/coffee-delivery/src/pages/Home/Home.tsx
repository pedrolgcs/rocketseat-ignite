import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react';
import { CoffeeCard } from './components';
import * as S from './Home.styles';

function Home() {
  return (
    <S.HomeContainer>
      <S.IntroBackground />

      <S.IntroContainer>
        <S.IntroContent>
          <S.IntroTitleContainer>
            <h1>Encontre o café perfeito para qualquer hora do dia</h1>
            <p>
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </p>
          </S.IntroTitleContainer>

          <S.IntroDescriptionContainer>
            <S.IntroItem color="yellowDark">
              <span>
                <ShoppingCart weight="fill" />
              </span>
              Compra simples e segura
            </S.IntroItem>

            <S.IntroItem color="gray">
              <span>
                <Package weight="fill" />
              </span>
              Embalagem mantém o café intacto
            </S.IntroItem>

            <S.IntroItem color="yellow">
              <span>
                <Timer weight="fill" />
              </span>
              Entrega rápida e rastreada
            </S.IntroItem>

            <S.IntroItem color="purple">
              <span>
                <Coffee weight="fill" />
              </span>
              O café chega fresquinho até você
            </S.IntroItem>
          </S.IntroDescriptionContainer>
        </S.IntroContent>

        <img src="/images/home-coffee-image.svg" alt="" />
      </S.IntroContainer>

      <S.CoffeesContainer>
        <h2>Nossos cafés</h2>

        <S.CoffeesList>
          <CoffeeCard />
          <CoffeeCard />
          <CoffeeCard />
          <CoffeeCard />
          <CoffeeCard />
          <CoffeeCard />
          <CoffeeCard />
          <CoffeeCard />
          <CoffeeCard />
        </S.CoffeesList>
      </S.CoffeesContainer>
    </S.HomeContainer>
  );
}

export default Home;
