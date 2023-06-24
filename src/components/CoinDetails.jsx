import { Box, Container, HStack, VStack ,Radio, RadioGroup, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge } from '@chakra-ui/react';
import {React,useState,useEffect, } from 'react'
import Loader from './Loader';
import { server } from "../index";
import ErrorComponent from "./ErrorComponent";
import {useParams} from "react-router-dom"
import axios from 'axios';

const CoinDetails = () => {

  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
    const [currency, setCurrency] = useState("inr");

    const currencySymbol =
currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";


    const params = useParams()

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/${params.id}`
        );
        console.log(data);
        setCoin(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id]);
  
  if (error) return <ErrorComponent message={"Error While Fetching Coin"} />;


  return (
    <Container maxW={"container.xl"} >
    {
      loading ? (<Loader/>):(
        <>
        
        <Box w={'full'} borderRadius={1}  > {coin.name}
 </Box>

<RadioGroup value={currency} onChange={setCurrency} p={"8"} >
    <HStack spacing={"4"} >
      <Radio value={"inr"} >₹ INR</Radio>
      <Radio value={"usd"} >$ USD</Radio>
      <Radio value={"eur"} >€ EUR</Radio>
    </HStack>
</RadioGroup>
 
      
<VStack spacing={"4"} p={"16"} alignItems={"flex-start"}  >
    <Text fontSize={"small"} alignSelf={"center"} opacity={0.7} >Last Updated on {Date(coin.market_data.last_updated).split("G")["0"]} </Text>
    <Image src={coin.image.large} w={'16'} h={"16"} objectFit={"contain"} />
    <Stat>
      <StatLabel>{coin.name}</StatLabel>
      <StatNumber> {currencySymbol} {coin.market_data.current_price[currency]} </StatNumber>
      <StatHelpText> <StatArrow type={coin.market_data.price_change_24h > 0 ? "increase" : "decrease" }  /> {coin.market_data.price_change_24h} </StatHelpText>
      <StatHelpText> <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease" }  /> {coin.market_data.price_change_percentage_24h}% </StatHelpText>
    </Stat>

<Badge fontSize={"2xl"} bgColor={"blackAlpha.700"} color={"white"} > {`#${coin.market_cap_rank}`} </Badge>

    </VStack> 

        </>



      )
    }
    </Container>
  );
};

export default CoinDetails;