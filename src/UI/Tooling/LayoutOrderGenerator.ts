export = class LayoutOrderGenerator {
	private _LayoutOrder = 1;

	public GetNextLayoutOrder() : number {
		return this._LayoutOrder++;
	}
}