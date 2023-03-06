import React from 'react';
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";


function ClientRow({ client }) {

    //There are couple ways to delete an object
    //1. Delete and re-fetch the queries, and call GET_CLIENTS again
    //   This is fine, but if you do it too much, and you start calling multiple queries, you might start
    //   bug your application, and that is why there is another way, and that is to update the cache.

    //2. Update the cache, where we don't need to make request again.

    const [deleteClient] = useMutation(DELETE_CLIENT, {
    //1.
        variables: { id: client.id },
        //after deleting the user, we want to delete all his projects
        refetchQueries: [{ query: GET_CLIENTS}, {query: GET_PROJECTS}],

    //2. Second way to delete:

        //We have a function called update cache, where we pass "cache", where we setting up the "data" with the
        //response from client (deleteClient mutation from mutation file, with id, name, phone)
        // update(cache, { data: { deleteClient } }) {
        // we are creating a variable and putting data from the cache
        //   const { clients } = cache.readQuery(
        //       { query: GET_CLIENTS });
          // and then we are going to write to the cache, with the cache "writeQuery" using the "GET_CLIENTS"
          // cache.writeQuery({
          //   query: GET_CLIENTS,
              //and then we are setting the data, to filter out clients that matches the incoming id
          //   data: {
          //     clients: clients.filter((client) => client.id !== deleteClient.id),
          //   },
          // });
        //},

});
    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className='btn btn-danger btn-sm' onClick={() => deleteClient(client.id)}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}

export default ClientRow;