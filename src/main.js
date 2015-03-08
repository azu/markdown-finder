global.document = window.document;
global.navigator = window.navigator;
window.require('nw.gui').Window.get().showDevTools();
import ExplorerFlux from "./ExplorerFlux.js"
import Explorer from "./components/ExplorerComponent.js"
var React = require('react');
let flux = new ExplorerFlux();
React.render(
    React.createElement(Explorer, {flux}),
    document.querySelector('.l-content')
);
