import * as S from './CoffeeCard.styles';

const tags = ['tradicional', 'com leite'];

function CoffeeCard() {
  return (
    <S.Container>
      <img src="https://picsum.photos/120" alt="" />

      <S.TagsContainer>
        {tags.map((tag) => (
          <S.Tag key={tag}>{tag}</S.Tag>
        ))}
      </S.TagsContainer>

      <h3>Expresso Tradicional</h3>
      <p>O tradicional café feito com água quente e grãos moídos</p>

      <S.BuyContainer>
        <S.Price>
          <span>R$</span>
          9.90
        </S.Price>

        <S.CartContainer></S.CartContainer>
      </S.BuyContainer>
    </S.Container>
  );
}

export default CoffeeCard;
