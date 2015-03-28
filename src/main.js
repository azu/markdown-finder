import ExplorerContext from "./ExplorerFlux.js"
import Explorer from "./components/ExplorerComponent.js"
export default function () {
    var React = require('react');
    let context = new ExplorerContext();
    React.render(
        React.createElement(Explorer, {context}),
        document.querySelector('.l-content')
    );
};
