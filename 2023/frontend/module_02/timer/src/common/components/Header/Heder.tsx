import { NavLink } from 'react-router-dom'
import { Timer, Scroll } from 'phosphor-react'
import logo from '@/assets/logo.svg'
import * as S from './Header.styles'

function Header() {
  return (
    <S.HeaderContainer>
      <img src={logo} alt="" />

      <S.HeaderNavigation>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </S.HeaderNavigation>
    </S.HeaderContainer>
  )
}

export default Header
