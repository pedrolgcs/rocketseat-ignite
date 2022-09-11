import styled from 'styled-components';
import theme from '@/styles/themes/default';

export const HomeContainer = styled.main``;

// --------------- <Intro /> ---------------
export const IntroBackground = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 544px;
  background: url('/images/home-background.png') no-repeat center center;
  background-size: 100% 100%;
`;

export const IntroContainer = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  padding: 5.75rem 0;
  display: grid;
  grid-template-columns: 588px auto;
  gap: 3.5rem;
`;

export const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.125rem;
`;

export const IntroTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-size: 3rem;
    color: ${(props) => props.theme.colors.neutral.gray[900]};
    font-family: 'Baloo 2', cursive;
    line-height: 1.3;
    font-weight: 800;
  }

  p {
    font-weight: 400;
    font-size: 20px;
    line-height: 130%;
    font-size: 1.25rem;
    color: ${(props) => props.theme.colors.neutral.gray[800]};
  }
`;

export const IntroDescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  gap: 1.25rem;
`;

const parsedIconColor = {
  yellow: theme.colors.brand.secondary[500],
  yellowDark: theme.colors.brand.secondary[700],
  gray: theme.colors.neutral.gray[700],
  purple: theme.colors.brand.primary[500],
};

type ItemProps = {
  color: keyof typeof parsedIconColor;
};

export const IntroItem = styled.div<ItemProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.neutral.white};
    background: ${(props) => parsedIconColor[props.color]};
    padding: 8px;
    border-radius: 50%;
  }
`;

// --------------- <Coffees /> ---------------

export const CoffeesContainer = styled.div`
  padding: 2rem 0;

  h2 {
    font-family: 'Baloo 2', cursive;
    font-weight: 800;
    font-size: 2rem;
    line-height: 1.3;
    color: ${(props) => props.theme.colors.neutral.gray[800]};
  }
`;

export const CoffeesList = styled.div`
  padding: 3.375rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;
  row-gap: 2.5rem;
`;
