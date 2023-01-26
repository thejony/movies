import React, { useEffect, useState } from "react";
import { useCustomContext } from "./Context";
import fetchData from "./http/fetchData";

export default function Details() {
    const { moviesState, moviesDispatch } = useCustomContext();
    const [error, setError] = useState("");
    
    const element = moviesState.list.filter(i => i.id === moviesState.selected)[0];

    useEffect(() => {
        if (!element.details) {
            fetchData("/details/" + moviesState.selected).then(json => {
                moviesDispatch({ type: 'GET_DETAILS', id: moviesState.selected, data: json.data });
                setError(json.error);
            });
        }
    }, [moviesState.selected, element.details, moviesDispatch]);

    if (error)
        return (<div>{error}</div>);

    return (<div>
        <h3>{element["Film"]}</h3>
        <div>Genre: {element.details && element.details["genre"]}</div>
        <div>Studio: {element.details && element.details["studio"]}</div>
        <div>User rating: {element.details && (element.details["audience_score"] + '%')}</div>
        <div>Profitability: {element.details && (element.details["profitability"].toFixed(1) + '%')}</div>
        <div>Rotten Tomatoes Rating: {element.details && (element.details["rotten_tomatoes"] + '%')}</div>
        <div>Worldwide Gross: {element.details && element.details["worldwide_gross"]}</div>
        <div>Year Release: {element.details && element.details["year"]}</div>
    </div>);
};