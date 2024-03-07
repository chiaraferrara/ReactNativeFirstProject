
// import { FormControl, Input, Stack, Text, Divider, Box, WarningOutlineIcon, ScrollView, Center, NativeBaseProvider } from "native-base";
import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  useColorScheme,
  View,
  ScrollView,
  Image,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';



type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

// Navbar component


interface NavbarProps {
  addProduct: boolean;
  setAddProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({addProduct, setAddProduct} : NavbarProps): React.JSX.Element {


  const toggleAppProduct = () =>{
    setAddProduct(!addProduct);
    console.log(addProduct)
  }

  return (
    <>
      <View style={{backgroundColor: 'black'}}>
       <Button title='Add a Product' onPress={() => toggleAppProduct()}/>
      </View>
    </>
  );
}

interface Product{
  productImg: string;
  productName: string;
  priceNumber?: number;

}
interface FormProps{
  productName: string;
  price: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  productImg: string;
  setImg: React.Dispatch<React.SetStateAction<string>>;
  setAddProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

function Form ({productName, price, setName, setPrice, products, setProducts, productImg, setImg, setAddProduct}: FormProps) : React.JSX.Element {

  const priceNumber = parseFloat(price);

  const handleFormSubmit = () => {
    if(productImg === "" || productName === '' || price === ''){
      return;
    }else{
      setProducts([...products, {productImg, productName, priceNumber}]);
      setImg('');
      setName('');
      setPrice('');
      setAddProduct(false);
    }    
    
  }

  return (
    <View>

      <Section title='Add a product'/>
      <TextInput value={productImg} onChangeText={(text) => setImg(text)} placeholder='Image Product URL'/>
      <TextInput value={productName} onChangeText={(text) => setName(text)} placeholder='Name Product'/>
      <TextInput value={price} onChangeText={(text) => setPrice(text)} placeholder='Price'/>
      <Button title="Submit" onPress={() => {
        handleFormSubmit()
        console.log(products)}} />
      <Button onPress={() =>{
        setAddProduct(false);
      }} title="Close"/>
    </View>
  );
};


function ProductList({products} : {products: Product[]}) : React.JSX.Element {

  return (
    <View>
      <Section title='Product List'/>
     
      {products.map((product, index) => {
        return ( <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
          <View key={index}>
            <Image source={{uri: product.productImg}} style={{width: 150, height: 150}} />
            <Text>{product.productName}</Text>
            <Text>{product.priceNumber}</Text>
          </View></View>
        );
      })}
    </View>
  );
}

function App(): React.JSX.Element {
  const [productName, setName] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [productImg, setImg] = useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const [addProduct, setAddProduct] = useState<boolean>(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Navbar addProduct={addProduct} setAddProduct={setAddProduct} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
         
          {addProduct ? 
          <Form  productName={productName} 
          price={price} 
          setName={setName} 
          setPrice={setPrice}
          products={products} 
          setProducts={setProducts}
          productImg={productImg}
          setImg={setImg}
          setAddProduct={setAddProduct}
          /> 
          :
          <ProductList products={products} />
           }
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
