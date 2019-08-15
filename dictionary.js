var t = cc.Class({
    name: "dictionary",
    ctor: function() {
        this._data = {};
    },
    set: function(a, e) {
        this._data[a] = e;
    },
    get: function(t) {
        return this._data[t];
    },
    remove: function(t) {
        this._data[t] = null;
    },
    isEmpty: function() {
        return 0 === this.size();
    },
    size: function() {
        return Object.getOwnPropertyNames(this._data).length;
    },
    clear: function() {
        this._data = {};
    },
    getIterator: function() {
        return this._data;
    }
});
module.exports = t;