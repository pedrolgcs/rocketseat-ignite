import styled from 'styled-components';

export const HeaderContainer = styled.div`
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CartContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const Location = styled.span`
  font-size: 0.875rem;
  line-height: 1.8;
  color: ${(props) => props.theme.colors.brand.primary[700]};
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colors.brand.primary[100]};
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  > svg {
    color: ${(props) => props.theme.colors.brand.primary[500]};
  }
`;

export const ShoppingCartButton = styled.button`
  padding: 8px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.brand.secondary[100]};
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    color: ${(props) => props.theme.colors.brand.secondary[700]};
  }
`;
