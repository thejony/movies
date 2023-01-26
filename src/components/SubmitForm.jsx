import React, { useEffect, useState } from "react";
import { useCustomContext } from "../Context";
import fetchData from "../http/fetchData";

export default function SubmitForm() {
    const { moviesState, moviesDispatch } = useCustomContext();
    const [userName, setUserName] = useState("");
    const [comment, setComment] = useState("");
    const [result, setResult] = useState("");

    useEffect(() => {
        setUserName("");
        setComment("");
        setResult("");
    }, [moviesState.selected]);
    
    function handleSubmit(event) {
        event.preventDefault();
        const data = { user_name: userName.trim(), comment: comment.trim() };
        fetchData("/comments/" + moviesState.selected, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(json => {
            if (json.error) {
                setResult(json.error);
            } else {
                moviesDispatch({ type: 'ADD_COMMENT', id: moviesState.selected, data: json.data });
                setResult("Success");
                setUserName("");
                setComment("");
            }
        });
    }

    const onNameChange = e => {
        setResult("");
        setUserName(e.target.value)
    }

    const onCommentChange = e => {
        setResult("");
        setComment(e.target.value)
    }
    
    return (<form onSubmit={handleSubmit}>
        <div><input onChange={onNameChange} placeholder="Name" value={userName} /></div>
        <div><textarea onChange={onCommentChange} placeholder="Comments" value={comment} /></div>
        <div><button>Save</button></div>
        <div>{result}</div>
    </form>);
};