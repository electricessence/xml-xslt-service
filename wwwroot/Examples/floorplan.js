function bindCheckBoxToCssFlag(elementId, className) {
    var checkbox = document.getElementById(elementId);
    function update() {
        document.body.classList.toggle(className, checkbox.checked);
    }
    update();
    checkbox.onchange = update;
}
requestAnimationFrame(function (callback) {
    bindCheckBoxToCssFlag('labelsEnabled', 'labels');
    bindCheckBoxToCssFlag('flipEnabled', 'flipped');
    var tags = {
        title: document.getElementById("room_title"),
        desc: document.getElementById("room_desc")
    };
    nullRoom = new Room(null, tags);
    selectedRoom = nullRoom;
    var rooms = document.querySelectorAll("svg g[*|label=\"Rooms\"] *");
    for (var i = 0; i < rooms.length; i++) {
        new Room(rooms[i], tags);
    }
});
var nullRoom = null;
var selectedRoom = null;
var Room = /** @class */ (function () {
    function Room(boundary, tags) {
        var _this = this;
        this.boundary = boundary;
        this.tags = tags;
        var titleTag = boundary && boundary.getElementsByTagName("title")[0];
        this.title = titleTag && titleTag.innerHTML || "";
        var descTag = boundary && boundary.getElementsByTagName("desc")[0];
        this.desc = descTag && descTag.innerHTML || "";
        if (boundary) {
            boundary.onclick =
                boundary.onmouseover =
                    function () { return _this.setActive(); };
            boundary.onmouseout =
                function () {
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
