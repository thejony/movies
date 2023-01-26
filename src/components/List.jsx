import React, { useEffect, useState } from "react";
import { useCustomContext } from "../Context";
import fetchData from "../http/fetchData";

export default function List() {
    const { moviesState, moviesDispatch } = useCustomContext();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData("/movies").then(json => {
            moviesDispatch({ type: 'SET_LIST', data: json.data });
            setError(json.error);
            setLoading(false);
        });
    }, [moviesDispatch]);

    if (loading)
        return (<div>Loading...</div>);

    if (error)
        return (<div>{error}</div>);

    return (<div>
        <div><input type={"text"} placeholder={"search"} value={search} onChange={e => setSearch(e.target.value)} /></div>
        <ul>
            {moviesState.list.filter(i => i.Film.toLowerCase().includes(search.toLowerCase())).map(item => 
                <li key={item.id}>
                    <button className="link-button" onClick={() => moviesDispatch({ type: 'SET_SELECTED', id: item.id })}>{item.Film}</button>
                </li>)}
        </ul>
    </div>);
};