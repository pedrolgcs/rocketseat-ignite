import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.neutral.gray[200]};
  border-radius: 6px 36px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > img {
    margin-top: -2.5rem;
    width: 120px;
    height: 120px;
    margin-bottom: 0.75rem;
  }

  > h3 {
    font-family: 'Baloo 2', cursive;
    color: ${(props) => props.theme.colors.neutral.gray[800]};
    font-size: 1.25rem;
    line-height: 1.3;
    margin-bottom: 8px;
  }

  > p {
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.neutral.gray[600]};
    text-align: center;
    line-height: 18px;
    margin-bottom: 2rem;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Tag = styled.div`
  padding: 4px 8px;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.brand.secondary[100]};
  color: ${(props) => props.theme.colors.brand.secondary[700]};
  font-size: 0.625rem;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 1.3;
`;

export const BuyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Price = styled.div``;

export const CartContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
