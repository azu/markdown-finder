// LICENSE : MIT
"use strict";
var React = require('react');
var marked = require('marked');
class ExplorerComponent extends React.Component {
    template() {
        var item = this.props.item;
        var content = "";
        if (item) {
            content = require("fs").readFileSync(item.path, "utf-8");
        }
        return content;
    }

    render() {
        var item = this.props.item;
        if (item == null || item.isDirectory) {
            return <div />;
        }
        var content = this.template();
        return (<div className="PreviewContent">
            <div className="markdown-body" dangerouslySetInnerHTML={{
            __html: marked(content)
          }}>
            </div>
        </div>);
    }
}
export default ExplorerComponent;