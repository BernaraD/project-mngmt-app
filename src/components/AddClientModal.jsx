import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";

import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_CLIENT } from "../mutations/clientMutations";


function AddClientModal() {

    const [name, setName] = useState( '' );
    const [email, setEmail] = useState( '' );
    const [phone, setPhone] = useState( '' );

    //setting use mutation, and passing ADD_CLIENT, everything we want to pass in is variables is going in this object (name, email, phone)
    const [addClient] = useMutation( ADD_CLIENT, {
        variables: { name, email, phone },
        //you can re-fetch, but cleaner way is to update the cache
        //we can see clients to show up in UI, we pass cache, and data ADD_CLIENT

        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery( { query: GET_CLIENTS } );

            //We write to the client, and concat a new to current clients with new or use spread operator
            cache.writeQuery( {
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] },
                // data: { clients: clients.concat( [addClient] ) },
            } );
        }
    } );

    const onSubmit = (e) => {
        e.preventDefault();

        //basic validation
        if (name === "" || email === "" || phone === "") {
            return alert( 'Please fill in all fields' )
        }
        addClient( name, email, phone )

        setName( '' );
        setEmail( '' );
        setPhone( '' );
    };

    return (
        <>
            <button type="button"
                    className="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#addClientModal">
                <div className="d-flex align-items-center">
                    <FaUser className="icon"/>
                    <div>Add Client</div>
                </div>
            </button>


            <div className="modal fade" id="addClientModal" tabIndex="-1" aria-labelledby="addClientModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fs-5" id="addClientModalLabel">Add Client</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" onSubmit={ onSubmit }>

                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text"
                                           className="form-control"
                                           id="name"
                                           value={ name }
                                           onChange={ (e) => setName( e.target.value ) }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email"
                                           className="form-control"
                                           id="email"
                                           value={ email }
                                           onChange={ (e) => setEmail( e.target.value ) }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="phone"
                                           className="form-control"
                                           id="phone"
                                           value={ phone }
                                           onChange={ (e) => setPhone( e.target.value ) }
                                    />
                                </div>

                                <button type="submit"
                                        data-bs-dismiss="modal"
                                        className="btn btn-secondary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddClientModal;