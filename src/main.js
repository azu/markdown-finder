import ExplorerContext from "./ExplorerFlux.js"
import App from "./components/AppComponent.js"
export default function () {
    var React = require('react');
    let context = new ExplorerContext();
    React.render(
        React.createElement(App, {context}),
        document.querySelector('.l-content')
    );
};
