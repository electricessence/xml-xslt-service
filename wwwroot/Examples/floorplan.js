requestAnimationFrame(function (callback) {
    var labelsEnabled = document.getElementById("labelsEnabled");
    function updateLabelsEnabled() {
        document.body.classList.toggle('labels', labelsEnabled.checked);
    }
    updateLabelsEnabled();
    labelsEnabled.onchange = updateLabelsEnabled;
    var tags = {
        title: document.getElementById("room_title"),
        desc: document.getElementById("room_desc")
    };
    nullRoom = new Room(null, tags);
    selectedRoom = nullRoom;
    var rooms = document.querySelectorAll("svg g[*|label=\"Rooms\"] rect");
    for (var i = 0; i < rooms.length; i++) {
        new Room(rooms[i], tags);
    }
});
var nullRoom = null;
var selectedRoom = null;
var Room = /** @class */ (function () {
    function Room(rect, tags) {
        var _this = this;
        this.rect = rect;
        this.tags = tags;
        this.title = rect && rect.getElementsByTagName("title")[0].innerHTML || "";
        this.desc = rect && rect.getElementsByTagName("desc")[0].innerHTML || "";
        if (rect) {
            rect.onmouseover = function () { return _this.setActive(); };
            rect.onmouseout = function () {
                if (selectedRoom == _this)
                    nullRoom.setActive();
            };
        }
    }
    Room.prototype.setActive = function () {
        this.tags.title.innerText = this.title;
        this.tags.desc.innerHTML = this.desc;
        selectedRoom = this;
    };
    return Room;
}());
