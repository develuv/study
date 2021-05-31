import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled'
import MainLayoutNavBar from './MainLayoutNavBar';

const MainLayoutRoot = styled.div`
  backgroundColor: '#eee';
  display: 'flex';
  height: '100%';
  overflow: 'hidden';
  width: '100%';
`

const MainLayoutWrapper =  styled.div`
  display: 'flex';
  flex: '1 1 auto';
  overflow: 'hidden';
  paddingTop: 64;
`

const MainLayoutContainer =  styled.div`
  backgroundColor: '#eee';
  display: 'flex';
  height: '100%';
  overflow: 'hidden';
  width: '100%';
`

const MainLayoutContent =  styled.div`
  flex: '1 1 auto';
  height: '100%';
  overflow: 'auto';
`



function MainLayout() {
  return (
    <MainLayoutRoot>
      <MainLayoutNavBar />
      <MainLayoutWrapper>
        <MainLayoutContainer>
          <MainLayoutContent>
            <Outlet />
          </MainLayoutContent>
        </MainLayoutContainer>
      </MainLayoutWrapper>
    </MainLayoutRoot>
  )
}

export default MainLayout;