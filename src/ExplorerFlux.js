// LICENSE : MIT
"use strict";
import ExplorerAction from "./actions/ExploreAction.js"
import ExplorerStore from "./stores/ExploreStore.js"
import { Context } from 'material-flux';

class ExplorerContext extends Context {
    constructor(flux) {
        super(flux);
        this.explorerAction = new ExplorerAction(this);
        this.explorerStore = new ExplorerStore(this);
    }
}
export default ExplorerContext;