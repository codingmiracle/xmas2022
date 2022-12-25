import './App.css';
import {Component} from "react";
import ErrorBoundary from "./components/Errorboundary/Errorboundary";
import GameForm from "./components/Game/GameForm";
import MessageForm from "./components/Message/MessageForm";

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
                    <header className={"App-header glow"}>
                        <h1>
                            <div id={"App-title"}>Frohe Weihnachten {this.renderName()}!</div>
                        </h1>
                    </header>
                    <main className={"App-main"}>
                        <GameForm/>
                        <MessageForm/>
                    </main>
                    <footer className={"App-footer"}>

                    </footer>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
