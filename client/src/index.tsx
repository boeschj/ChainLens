import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css'
import 'antd/dist/antd.less';
import Router from './router';
import { ApolloProvider } from '@apollo/client';
import { client } from './gql/apolloClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <Router />
      </React.StrictMode>
    </ApolloProvider>
  </BrowserRouter>
);
