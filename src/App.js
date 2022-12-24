import './App.css';
import {Component, useEffect} from "react";
import ErrorBoundary from "./components/Errorboundary/Errorboundary";
import GameForm from "./components/Game/GameForm";

class App extends Component {

    renderName() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const name = urlParams.get('name');
        return (
            <span id={"name"}>{name}</span>
        );
    }

    render() {
        document.title = 'Merry matriXmas';
        return (
            <div className="App">
                <ErrorBoundary>
                    <header className={"App-header"}>
                        <h1>
                            <div id={"App-title"}>Frohe Weihnachten {this.renderName()}!</div>
                        </h1>
                    </header>
                    <main className={"App-main"}>
                        <GameForm/>
                    </main>
                    <footer className={"App-footer"}>

                    </footer>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
