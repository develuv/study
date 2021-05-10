import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div>
      <div>
        <h1>레이아웃</h1>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout;