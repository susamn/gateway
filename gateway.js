const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

// Initialize an ApolloGateway instance and pass it an array of
// your implementing service names and URLs
const gateway = new ApolloGateway({
    serviceList: [
        { name: 'myservice', url: 'http://localhost:8080/graphql' },
        //{ name: 'person', url: 'https://fts-dev.platco.xfinity.com/graphql' }
        { name: 'person', url: 'http://localhost:4001/graphql' }
        // Define additional services here
    ],
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
    gateway,

    // Disable subscriptions (not currently supported with ApolloGateway)
    subscriptions: false,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Gateway ready at ${url}`);
});


