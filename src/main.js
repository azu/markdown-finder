global.document = window.document;
global.navigator = window.navigator;
window.require('nw.gui').Window.get().showDevTools();
import ExplorerContext from "./ExplorerFlux.js"
import Explorer from "./components/ExplorerComponent.js"
var React = require('react');
let context = new ExplorerContext();
React.render(
    React.createElement(Explorer, {context}),
    document.querySelector('.l-content')
);
