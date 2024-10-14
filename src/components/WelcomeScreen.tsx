import { Container, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'

const WelcomeScreen = () => {
  return (
    <Container>
      <Typography variant='h1'>GOBLIN ARENA</Typography>
      <Image 
        src='/assets/logo.jpeg' 
        width={100} 
        height={100} 
        alt='logo' 
        layout='responsive'
      />
    </Container>
  )
}

export default WelcomeScreen
