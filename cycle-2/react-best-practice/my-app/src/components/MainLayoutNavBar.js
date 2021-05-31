import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled'

const MainLayoutNavBarRoot = styled.div`
    position: sticky;
    top: 0px;
    background-color: rgb(255, 255, 128);;
`

const items = [
  {
    href: '/local',
    title: 'local'
  },
  {
    href: '/global',
    title: 'global'
  },
];

function MainLayoutNavBar() {
  
  const activeStyle = {
    textDecoration: 'underline',
    fontWeight: 'bold',
  }

  return (
    <MainLayoutNavBarRoot>
      <ul>
        {items.map(({href, title}) => (
            <li key={title}>
              <RouterLink to={href} activeStyle={activeStyle}>
                {title}
              </RouterLink>
            </li>
          ))}
      </ul>
    </MainLayoutNavBarRoot>
  )
}

export default MainLayoutNavBar;