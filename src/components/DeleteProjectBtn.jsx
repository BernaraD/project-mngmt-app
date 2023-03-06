import React from 'react';
import { useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { useNavigate } from "react-router-dom";


function DeleteProjectBtn({ projectId }) {

    //After deleting the project, we re-direct user to previous page
    //Using useNavigate hook from react-router-dom
    const navigate = useNavigate();

    const [deleteProject] = useMutation( DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => navigate( "/" ),

        refetchQueries: [{ query: GET_PROJECTS }]
    } )


    return (
        <div className="d-flex mt-3 ms-auto">
            <button className="btn btn-danger m-2"
                    onClick={ deleteProject }
            >
                <FaTrash className="icon"/>
            </button>

        </div>
    )
}

export default DeleteProjectBtn;