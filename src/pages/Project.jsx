import React from 'react';
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { GET_PROJECT } from "../queries/projectQueries";
import ClientInfo from "./ClientInfo";


function Project() {

    //Get id from the URL
    const { id } = useParams();
    const { data, loading, error } = useQuery( GET_PROJECT, {
        variables: { id }
    } );

    console.log( data )

    if (loading) return <Spinner/>;
    if (error) return <p>Something went wrong</p>

    return (
        <>
            { !loading && !error && (
                <div className='mx-auto w-75 card p-5'>
                    <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
                        Back
                    </Link>

                    <h1>{ data.project.name }</h1>
                    <p className="lead">{ data.project.description }</p>

                    <h5 className="mt-3">Project Status</h5>
                    <p className='lead'>{ data.project.status }</p>
                    <hr/>
                    <ClientInfo client={data.project.client}/>
                </div>

            ) }
        </>
    )
}

export default Project;