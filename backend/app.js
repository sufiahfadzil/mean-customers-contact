const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Customer = require('./models/customer');

const app = express();

mongoose.connect('mongodb+srv://admin:<password>@cluster0.3g6epw9.mongodb.net/node-angular?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to database');
})
.catch(() => {
  console.log('Connection failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/customers', (req, res, next) => {
  const customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    gender: req.body.gender
  });
  customer.save()
  .then(createdCustomer => {
    res.status(201).json({
      message: 'Customer added successfully.',
      customerId: createdCustomer._id
    });
  });
});

app.put('/api/customers/:id', (req, res, next) => {
  const customer = new Customer({
    _id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    gender: req.body.gender
  });
  Customer.updateOne({ _id: req.params.id }, customer)
  .then(result => {
    res.status(200).json({
      message: 'Customer updated successfully.',
    });
  });
});

app.get('/api/customers', (req, res, next) => {
  Customer.find()
  .then(documents => {
    res.status(200).json({
      message: 'Success',
      customers: documents
    });
  });
});

app.get('/api/customers/:id', (req, res, next) => {
  Customer.findById(req.params.id)
  .then(customer => {
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({
        message: 'Customer not found!'
      });
    }
  });
});

app.delete('/api/customers/:id', (req, res, next) => {
  Customer.deleteOne({ _id: req.params.id })
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Customer deleted!'
    });
  });
});

module.exports = app;
