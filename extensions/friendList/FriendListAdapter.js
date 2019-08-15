import {AbsAdapter} from "./FriendListView";

const ListItem = require('./inviteItem');
cc.Class({
    extends: AbsAdapter,
    updateView(item, posIndex) {
        let comp = item.getComponent(ListItem);
        if (comp) {
            comp.setData(this.getItem(posIndex));
        }
    }
})