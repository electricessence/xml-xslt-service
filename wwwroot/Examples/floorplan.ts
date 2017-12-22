function bindCheckBoxToCssFlag(elementId:string, className:string)
{
	const checkbox = <HTMLInputElement>document.getElementById(elementId);

	function update() {
		document.body.classList.toggle(className, checkbox.checked);
	}

	update();
	checkbox.onchange = update;
}


requestAnimationFrame(callback => {
	bindCheckBoxToCssFlag('labelsEnabled', 'labels');
	bindCheckBoxToCssFlag('flipEnabled', 'flipped');


	const tags = {
		title: document.getElementById("room_title"),
		desc: document.getElementById("room_desc")
	};

	nullRoom = new Room(null, tags);
	selectedRoom = nullRoom;

	const rooms = document.querySelectorAll("svg g[*|label=\"Rooms\"] *");
	for (let i = 0; i < rooms.length; i++) {
		new Room(<SVGElement>rooms[i], tags);
	}
});

let nullRoom: Room | null = null;
let selectedRoom: Room | null = null;

class Room {
	readonly title: string;
	readonly desc: string;

	setActive(): void {
		this.tags.title.innerText = this.title;
		this.tags.desc.innerHTML = this.desc;
		selectedRoom = this;
	}

	constructor(
		public readonly boundary: SVGElement | null,
	    public tags: { title: HTMLElement, desc: HTMLElement })
	{
		const titleTag = boundary && boundary.getElementsByTagName("title")[0];
		this.title = titleTag && titleTag.innerHTML || "";

		const descTag = boundary && boundary.getElementsByTagName("desc")[0];
		this.desc = descTag && descTag.innerHTML || "";

		if (boundary) {

			boundary.onclick =
			boundary.onmouseover =
				() => this.setActive();

			boundary.onmouseout =
				() => {
				if(selectedRoom==this)
					nullRoom.setActive();
			};
		}
	}

}