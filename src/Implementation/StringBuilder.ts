import IStringBuilder = require("Interfaces/IStringBuilder");

export = class StringBuilder implements IStringBuilder {
	private stringsArray = new Array<string>();

	Add(str: string) : void {
		this.stringsArray.push(str);
	}

	Render() : string {
		return this.stringsArray.join("");
	}
}