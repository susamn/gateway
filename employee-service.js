const {buildFederatedSchema} = require("@apollo/federation");
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        employeeData(id: Int!): Employee
    }

    type Employee @key(fields: "employeeId"){
        employeeId: Int!
        name: String!
        company: String!

    }
`;

const resolvers = {
    Query: {
        employeeData(id) {
            return { employeeId: 332233, name: "Supratim Samanta", company:  "TCS"}
        }
    }
};

const service = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

service.listen(4001).then(({ url }) => {
    console.log(`🚀 employee server ready at ${url}`);
});