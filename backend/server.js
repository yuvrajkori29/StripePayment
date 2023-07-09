const express = require('express');
const cors = require('cors');   //for smooth connectivity between frontwnd  and backend
const stripe = require("stripe")("sk_test_51NRYzhSB7EgAwFLKjAtyIBxWWa4BREvUD510u9y9MY0mDZjBlSFTGJlkk3RDLjUEZK5CXhjXwkEYDI1uZcnWJqRw00qqCHNusc");  //stripe payment
const uuid = require("uuid");   //for avoiding multiple paymments oncase of error ;
const app = express();  


app.use(express.json());   //middleware
app.use(cors());

//routes
app.get('/',async (req,res)=>{
    res.send("appp is running fine ");
})

//payment

app.post('/payment',(req,res)=>{
    const {product,token} = req.body;
  console.log("product",product);
  console.log(product.price);

  const idempontencyKey = uuid();    //makes sure that user is  not chared twice  for same oroduct;


  return stripe.customers.create({
   email : token.email,
   source :token.id 
  }).then(customer=>{
    stripe.charges.create({
        amount:product.price*100,
        currency : 'usd',
        customer : customer.id,
        receipt_email:token.email,
        description :`purchase of product.name`,
        shipping:{
            name : token.card.name,
            address:{
                country : token.card.address_country
            }
        }
    },{idempontencyKey});
  }).then(result => {
    res.status(200).json(result).catch(err=>{
        console.log(err);
    });
  })
});


app.listen('5000',()=>{
    console.log("server is running on 5000");
})