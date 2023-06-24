import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <VStack h={"90vh"} justifyContent={"center"} color={"whatsapp.700"} >
      <Box transform={"scale(3)"} >
        <Spinner size={"md"} />
      </Box>
    </VStack>
  )
}

export default Loader;