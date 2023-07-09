import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import StripeCheckout from 'react-stripe-checkout' ;


function App() {

  const [product,] = useState({
    name : "React from facebboook",
    price: 10,
    productBy : "facebook"
  })


   const  makePayment = async token  =>{
      const body = {
        token,
        product,
      }

      const headers = {
        "Content-type" : "application/json"
      }

      return await fetch(`http://localhost:5000/payment`,{
        method : "POST",
        headers,
        body :JSON.stringify(body)
      }).then(response=>{
        console.log("Response"  ,response);
        const {status} = response;
        console.log(status);
      }).catch(err =>  console.log(err));  
    
   };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </a>
        <StripeCheckout  
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name='Buy React'
          amount={product.price*100}
        >
        <button className='btn-large pink'>Buy React in JUst {product.price}$</button>
        </StripeCheckout>

     
      </header>
    </div>
  );
}

export default App;
