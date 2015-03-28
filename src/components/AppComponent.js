// LICENSE : MIT
"use strict";
var React = require('react');
import Explorer from "./ExplorerComponent.js"
import ExplorerToolbar from "./ExplorerToolbarComponent.js"
class AppComponent extends React.Component {
    render() {
        return (<div className="App l-App">
            <ExplorerToolbar />
            <Explorer context={this.props.context}/>
        </div>)
    }
}
export default AppComponent;