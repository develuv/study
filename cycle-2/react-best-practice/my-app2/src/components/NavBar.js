import { NavLink as RouterLink } from 'react-router-dom';

const items = [
  {
    href: '/local/product',
    title: 'local'
  },
  {
    href: '/global/product',
    title: 'global'
  },
];

function NavBar() {
  const rootClasses = {
    position: 'sticky',
    top: '0',
    backgroundColor: "#cae8ca",
    border: "2px solid #4CAF50",
  }
  const activeStyle = {
    textDecoration: 'underline',
    fontWeight: 'bold',
  }

  return (
    <ul style={rootClasses}>
      {items.map(({href, title}) => (
        <li key={title}>
          <RouterLink to={href} activeStyle={activeStyle}>
            {title}
          </RouterLink>
        </li>
      ))}
    </ul>
  )
}

export default NavBar;