import { Outlet } from 'react-router-dom'
import { Header } from '@/common/components'
import * as S from './Default.styles'

function DefaultLayout() {
  return (
    <S.LayoutContainer>
      <Header />
      <Outlet />
    </S.LayoutContainer>
  )
}

export default DefaultLayout
