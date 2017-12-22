requestAnimationFrame(callback => {
	const labelsEnabled = <HTMLInputElement>document.getElementById("labelsEnabled");

	function updateLabelsEnabled() {
		document.body.classList.toggle('labels', labelsEnabled.checked);
	}

	updateLabelsEnabled();
	labelsEnabled.onchange = updateLabelsEnabled;

	const tags = {
		title: document.getElementById("room_title"),
		desc: document.getElementById("room_desc")
	};

	nullRoom = new Room(null, tags);
	selectedRoom = nullRoom;

	const rooms = document.querySelectorAll("svg g[*|label=\"Rooms\"] rect");
	for (let i = 0; i < rooms.length; i++) {
		new Room(<SVGRectElement>rooms[i], tags);
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
		public readonly rect: SVGRectElement | null,
	    public tags: { title: HTMLElement, desc: HTMLElement })
	{
		this.title = rect && rect.getElementsByTagName("title")[0].innerHTML || "";
		this.desc = rect && rect.getElementsByTagName("desc")[0].innerHTML || "";

		if (rect) {
			rect.onmouseover = () => this.setActive();
			rect.onmouseout = () => {
				if(selectedRoom==this)
					nullRoom.setActive();
			};
		}
	}

}