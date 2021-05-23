const {buildFederatedSchema} = require("@apollo/federation");
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        me: Person
    }

    type Person @key(fields: "personId"){
        personId: String!
    }
`;

const resolvers = {
    Query: {
        me() {
            return { personId: "42207ad4-590e-4d5d-a65f-6a4ccddca9e3071" }
        }
    }
};

const service = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

service.listen(4001).then(({ url }) => {
    console.log(`🚀 Person server ready at ${url}`);
});