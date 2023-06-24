import { Alert, AlertIcon,   } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({massage}) => {
  return (
    <Alert status='error' position={'fixed'} bottom={'4'} left={"50%"} transform={"translateX(-50%)" }
    w={'container.lg'} color={'red.100'} >
    <AlertIcon/>
      {massage}  
    </Alert>
  )
}

export default ErrorComponent;