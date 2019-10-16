/* eslint no-console: 0 */
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { json } from 'body-parser';
import express from 'express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const PORT = 5000;

const app = express();
app.use(cors());
app.use(json());
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
app.listen(PORT, (): void => console.log(`Example app listening on port ${PORT}!`));
