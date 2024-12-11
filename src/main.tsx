import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "@radix-ui/themes/styles.css";
import { UtilsProvider } from './context/utilsContext/UtilsProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import {  ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://192.168.0.96:4000/graphql', // Replace with your GraphQL API endpoint
  cache: new InMemoryCache()
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <BrowserRouter>
      <UtilsProvider>
          <App />
      </UtilsProvider>
    </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)