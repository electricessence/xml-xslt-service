/// <reference path="jquery/jquery.d.ts" />

function $byID(id:string):JQuery
{
	return $('#'+id);
}

function bindCheckBoxToCssFlag(elementId:string, className:string)
{
	const body = $(document.body);
	const checkbox = $byID(elementId);

	function update() {
		body.toggleClass(className,checkbox.prop('checked'));
	}

	update();
	checkbox.change(update);
}


requestAnimationFrame(callback => {

	bindCheckBoxToCssFlag('labelsEnabled', 'labels');
	bindCheckBoxToCssFlag('flipEnabled', 'flipped');

	const tags = {
		title: $byID('room_title'),
		desc: $byID('room_desc')
	};

	nullRoom = new Room(null, tags);
	selectedRoom = nullRoom;

	const rooms = $("svg g#rooms *");
	rooms.each((i,e)=>{
		new Room($(e), tags);
	});
});

let nullRoom: Room | null = null;
let selectedRoom: Room | null = null;

class Room {
	readonly title: string;
	readonly desc: string;

	setActive(): void {
		this.tags.title.text(this.title);
		this.tags.desc.text(this.desc);
		selectedRoom = this;
	}

	constructor(
		public readonly boundary: JQuery | null,
	    public tags: { title: JQuery, desc: JQuery })
	{

		if (boundary) {
			this.title = boundary.find("title").text();
			this.desc = boundary.find("desc").text();

			const handler = () => {
				boundary.toggleClass('hover', true);
				this.setActive();
			};

			boundary
				.click(handler)
				.mouseover(handler)
				.mouseout(() => {
					boundary.toggleClass('hover', false);
					if(selectedRoom==this)
						nullRoom.setActive();
				});
		}

		this.title = this.title || "";
		this.desc = this.desc || "";

	}

}