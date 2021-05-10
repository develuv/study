import React from 'react';
import { jsx, css } from '@emotion/react'

const MainLayoutRoot = ({ children }) => (
  <div css={css`
    backgroundColor: 'hotpink',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  `}>
    {children}
  </div>
)

function LocalState() {
  return (
    <MainLayoutRoot>
      <h1>Local State</h1>
    </MainLayoutRoot>
  )
}

export default LocalState;

