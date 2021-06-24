const {buildFederatedSchema} = require("@apollo/federation");
const { ApolloServer, gql } = require('apollo-server');


const typeDefs = gql`
    type Query {
        findAddressByEmployeeId(id: Int!): Address
    }

    type Address {
        addressId: String!
        street: String!
        city: String!
        state: String!
        zip: String!
        employeeId: Int!

    }

    type Employee @key(fields: "employeeId") @extends{
        employeeId: Int!  @external
        address: Address  @requires(fields: "employeeId") 
    }
`;

const resolvers = {
    Employee:{
        address(ref){
            return { addressId: "716271", street: "123 Surrey Way", city: "Maple Shade", state: "New Jersey", zip: "08051"}

        }
    },
    Query: {
        findAddressByEmployeeId(id) {
            return { addressId: "716271", street: "123 Surrey Way", city: "Maple Shade", state: "New Jersey", zip: "08051"}
        }

    }
};

const service = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

service.listen(4002).then(({ url }) => {
    console.log(`🚀 address server ready at ${url}`);
});