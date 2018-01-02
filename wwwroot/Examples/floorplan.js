/// <reference path="jquery/jquery.d.ts" />
function $byID(id) {
    return $('#' + id);
}
function bindCheckBoxToCssFlag(elementId, className) {
    var body = $(document.body);
    var checkbox = $byID(elementId);
    function update() {
        body.toggleClass(className, checkbox.prop('checked'));
    }
    update();
    checkbox.change(update);
}
requestAnimationFrame(function (callback) {
    bindCheckBoxToCssFlag('labelsEnabled', 'labels');
    bindCheckBoxToCssFlag('flipEnabled', 'flipped');
    var tags = {
        title: $byID('room_title'),
        desc: $byID('room_desc')
    };
    nullRoom = new Room(null, tags);
    selectedRoom = nullRoom;
    var rooms = $("svg g#rooms *");
    rooms.each(function (i, e) {
        new Room($(e), tags);
    });
});
var nullRoom = null;
var selectedRoom = null;
var Room = /** @class */ (function () {
    function Room(boundary, tags) {
        var _this = this;
        this.boundary = boundary;
        this.tags = tags;
        if (boundary) {
            this.title = boundary.find("title").text();
            this.desc = boundary.find("desc").text();
            var handler = function () {
                boundary.toggleClass('hover', true);
                _this.setActive();
            };
            boundary
                .click(handler)
                .mouseover(handler)
                .mouseout(function () {
                boundary.toggleClass('hover', false);
                if (selectedRoom == _this)
                    nullRoom.setActive();
            });
        }
        this.title = this.title || "";
        this.desc = this.desc || "";
    }
    Room.prototype.setActive = function () {
        this.tags.title.text(this.title);
        this.tags.desc.text(this.desc);
        selectedRoom = this;
    };
    return Room;
}());
