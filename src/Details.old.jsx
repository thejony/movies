import React from "react";

export default function Details({ film, details }) {

    return (<div>
        <h3>{film}</h3>
        <div>Genre: {details && details["Genre"]}</div>
        <div>Studio: {details && details["Lead Studio"]}</div>
        <div>User rating: {details && (details["Audience score"] + '%')}</div>
        <div>Profitability: {details && (details["Profitability"].toFixed(1) + '%')}</div>
        <div>Rotten Tomatoes Rating: {details && (details["Rotten Tomatoes"] + '%')}</div>
        <div>Worldwide Gross: {details && details["Worldwide Gross"]}</div>
        <div>Year Release: {details && details["Year"]}</div>
    </div>);
};