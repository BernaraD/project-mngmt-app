import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, InMemoryCache }
    from "@apollo/client";

//2nd way to delete something, with updating cache.
//In browser when we update the cache, we might get this error: "Cache data may be lost when replacing the clients field
// of a Query object. To address this problem define a custom merge function for the Query.clients field,
// so InMemoryCache can safely merge these objects
const cache = new InMemoryCache( {
    typePolicies: {
        Query: {
            fields: {

                clients: {
                    merge(existing, incoming) {
                        return incoming
                    }
                },

                projects: {
                    merge(existing, incoming) {
                        return incoming
                    },
                },
            },
        },
    },
} );

const client = new ApolloClient( {
    uri: 'http://localhost:5000/graphql',
    cache,
} )

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(

        <ApolloProvider client={ client }>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </ApolloProvider>

);

reportWebVitals();
