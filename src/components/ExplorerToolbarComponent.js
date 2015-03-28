// LICENSE : MIT
"use strict";
var React = require('react');
class ExplorerToolbar extends React.Component {
    createNewNote(){
        let {context} = this.props;
        context.explorerAction.createNewNote(context.explorerStore.currentFolder);
    }
    render() {
        return (<div className="ExplorerToolbar">
            <button onClick={this.createNewNote.bind(this)}>Create New Note</button>
        </div>)
    }
}
export default ExplorerToolbar;