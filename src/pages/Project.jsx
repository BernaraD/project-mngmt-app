import React from 'react';
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { GET_PROJECT } from "../queries/projectQueries";
import ClientInfo from "./ClientInfo";
import DeleteProjectBtn from "../components/DeleteProjectBtn";
import EditProjectForm from "../components/EditProjectForm";


function Project() {

    //Get id from the URL using useParams() hook
    const { id } = useParams();
    const { data, loading, error } = useQuery( GET_PROJECT, {
        variables: { id }
    } );

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


                        <EditProjectForm project={data.project}/>
                        <DeleteProjectBtn projectId={data.project.id}/>



                </div>

            ) }
        </>
    )
}

export default Project;