import { Box, Container, HStack, VStack ,Radio, RadioGroup, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress } from '@chakra-ui/react';
import {React,useState,useEffect} from 'react'
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
    <Image src={coin.image.large} w={'40'} h={"40"} objectFit={"contain"} justifyContent={"space-evenly"} />
    <Stat>
      <StatLabel>{coin.name}</StatLabel>
      <StatNumber> {currencySymbol} {coin.market_data.current_price[currency]} </StatNumber>
      <StatHelpText> <StatArrow type={coin.market_data.price_change_24h > 0 ? "increase" : "decrease" }  /> {coin.market_data.price_change_24h} </StatHelpText>
      <StatHelpText> <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease" }  /> {coin.market_data.price_change_percentage_24h}% </StatHelpText>
    </Stat>

<Badge fontSize={"2xl"} bgColor={"blackAlpha.700"} color={"white"} > {`#${coin.market_cap_rank}`} </Badge>

<CustomBar 
hight={`${currencySymbol}${coin.market_data.high_24h[currency]}`} 
low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />

<Box w={"full"} p={'4'} >
<Box w={"full"} p="4">
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
</Box>
    </VStack> 

        </>



      )
    }
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);


const CustomBar = ({hight,low})=>(
  <VStack w={"full"}  >
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"} >
     <Badge children={low} colorScheme={"red"} />
     <Text fontSize={"sm"}  >24H Range</Text>
     <Badge children={hight} colorScheme={"green"} />
    </HStack>
  </VStack>
)

export default CoinDetails;