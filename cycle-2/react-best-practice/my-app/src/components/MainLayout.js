import { Outlet } from 'react-router-dom';

const MainLayoutRoot = () => (
  <div
    css={{
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%'
    }}
  />
)



function MainLayout() {
  return (
    <MainLayoutRoot>
      <div>
        <h1>레이아웃</h1>
        <Outlet />
      </div>
    </MainLayoutRoot>
  )
}

export default MainLayout;