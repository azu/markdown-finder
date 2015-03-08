// LICENSE : MIT
"use strict";
"use strict";
var React = require('react');
var marked = require('marked');
class ExplorerComponent extends React.Component {
    template() {
        var item = this.props.item;
        var content="";
        if (item) {
            content = require("fs").readFileSync(item.path, "utf-8");
        }
        return content;

    }

    render() {
        var content = this.template();
        return (<div>
            <div dangerouslySetInnerHTML={{
            __html: marked(content)
          }}>
            </div>
        </div>);
    }
}
export default ExplorerComponent;