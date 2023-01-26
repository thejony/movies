import React, { useEffect, useState } from "react";
import { useCustomContext } from "../Context";
import fetchData from "../http/fetchData";

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
        <div><b>Genre:</b> {element.details && element.details["genre"]}</div>
        <div><b>Studio:</b> {element.details && element.details["studio"]}</div>
        <div><b>User rating:</b> {element.details && (element.details["audience_score"] + '%')}</div>
        <div><b>Profitability:</b> {element.details && (element.details["profitability"] + '%')}</div>
        <div><b>Rotten Tomatoes Rating:</b> {element.details && (element.details["rotten_tomatoes"] + '%')}</div>
        <div><b>Worldwide Gross:</b> {element.details && element.details["worldwide_gross"]}</div>
        <div><b>Year Release:</b> {element.details && element.details["year"]}</div>
    </div>);
};