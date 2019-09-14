import React from "react"

import logo from "./logo.svg"

import "./App.css"

export default function App(){
    return (
        <div className="App">
            <header className="App_header">
                <img src={logo} className="App_logo" alt="logo" />
                <p className="App_header_content">

                </p>

            </header>
            <a
                className="App_link App_link--active"
            > Learn React</a>
        </div>
    )
}