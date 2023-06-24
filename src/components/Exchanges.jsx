/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from 'react';
import axios from "axios"
import { server } from '../index';
import { Container, HStack, Heading, Image, Text, VStack} from '@chakra-ui/react';
import Loader from './Loader'
import ErrorComponent from './ErrorComponent';



const Exchanges = () => {

  const[Exchanges, setExchanges] =useState([]);
  const[loading, setLoading] =useState(true);
  const[error, setError] =useState(false);

useEffect(() => {

  const fatchExchanges = async()=>{
   
    try {
      const {data} = await axios.get(`${server}/exchanges`);
      setExchanges(data);
      setLoading(false);
      
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  
 };
  fatchExchanges();
}, [])

if(error) return <ErrorComponent massage={"Error While Fetching Exchanges"} />

   
  
 
  return (
   <Container  maxW={"container.xl"}>{loading ? <Loader /> : (
    <>
    <HStack wrap={'wrap'} justifyContent={"space-evenly"} >
      {Exchanges.map((i)=>(
         <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url}/>
      ))}
    </HStack>
    </>
   )}</Container>
  )
}

const ExchangeCard = ({name,img,rank,url})=>(
<a href= {url} target={"blank"}  >
  <VStack color={"black"} w={"52"} shadow={"lg"} p={'8'} borderRadius={'lg'} transform={"all 0.5s"} m={'4'}
  
  css={{
    "&:hover":{
      transform: "scale(1.1)",
    }
  }}

  > 
  <Image   src={img} w={"10"} h={"10"} objectFit={"contain"} ait={"Exchange"} />
  <Heading size={'md'} noOfLines={1} >
  {rank}
  </Heading>
  <Text noOfLines={1} >{name}</Text>  
   </VStack>
</a>
);

export default Exchanges