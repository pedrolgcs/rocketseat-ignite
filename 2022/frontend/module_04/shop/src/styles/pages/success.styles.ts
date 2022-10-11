import { styled } from '@/styles';

export const SuccessContainer = styled('main', {
  height: 656,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    transition: '0.3s',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    },
  },
});

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 130,
  height: 145,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  marginTop: '4rem',

  img: {
    objectFit: 'cover',
  },
});
