const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const path = require('path');

const schema = require('./graphql/schema/schema');

const app = express();

// graphQL initialization
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// connect to MongoDB
// const db = require('./config/keys').mongoURI;
const db = process.env.mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB connected.');
    // start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
  })
.catch(error => console.log("Error", error));
