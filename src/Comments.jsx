import React, { useEffect, useState } from "react";
import { useCustomContext } from "./Context";
import fetchData from "./http/fetchData";

export default function Comments() {
    const { moviesState, moviesDispatch } = useCustomContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const element = moviesState.list.filter(i => i.id === moviesState.selected)[0];

    useEffect(() => {
        setLoading(true);
        fetchData("/comments/" + moviesState.selected).then(json => {
            moviesDispatch({ type: 'GET_COMMENTS', id: moviesState.selected, data: json.data });
            setError(json.error);
            setLoading(false);
        });
    }, [moviesState.selected, moviesDispatch]);
    
    if (loading)
        return (<div><h4>Comments</h4>Loading...</div>);

    if (error)
        return (<div>{error}</div>);

    return (<div>
        <div><h4>Comments</h4></div>
        { element.comments.length > 0 ? 
            element.comments.map(item => <div key={item.id}><label>{item.userName}:</label> <label>{item.comment}</label></div>):
            <div>No comments yet</div>}
        <div>
            <div><input placeholder="Name" /></div>
            <div><textarea placeholder="Comments" /></div>
            <div><button>Save</button></div>
        </div>
    </div>);
};