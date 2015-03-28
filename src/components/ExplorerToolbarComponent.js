// LICENSE : MIT
"use strict";
var React = require('react');
class ExplorerToolbar extends React.Component {
    createNewNote() {
        let {context} = this.props;
        var currentFolder = context.explorerStore.currentFolder;
        context.explorerAction.createNewNote(currentFolder);
    }

    deleteSelectedNote() {
        let {context} = this.props;
        var currentFolder = context.explorerStore.currentFolder;
        context.explorerAction.deleteItem(context.explorerStore.currentItem, currentFolder);
    }

    render() {
        return (<div className="ExplorerToolbar">
            <button onClick={this.createNewNote.bind(this)}>Create New Note</button>
            <button onClick={this.deleteSelectedNote.bind(this)}>Delete Selected Note</button>
        </div>)
    }
}
export default ExplorerToolbar;