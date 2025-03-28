'use client'

import React from 'react'
import { Container, View } from './style'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <View>{children}</View>
    </Container>
  )
}

export default Layout
