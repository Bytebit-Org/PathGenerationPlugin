import BakeOptionsDialogFrame = require("./BakeOptionsDialogFrame");
import IDialogFrame = require("./IDialogFrame");

export enum Type {
	BakeOptions
}

const _DialogFrames = new Map<Type, IDialogFrame>();

export function GetByType(dialogFrameType: Type) : IDialogFrame {
	if (!_DialogFrames.has(dialogFrameType)) {
		switch (dialogFrameType) {
			case Type.BakeOptions:
				_DialogFrames.set(Type.BakeOptions, new BakeOptionsDialogFrame());
				break;
		}
	}

	return _DialogFrames.get(dialogFrameType);
}