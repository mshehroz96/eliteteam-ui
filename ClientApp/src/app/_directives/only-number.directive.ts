import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: "[appOnlyNumber]",
})
export class OnlyNumberDirective {
	constructor() {}
	@HostListener("keydown", ["$event"]) onKeyDown(e: { shiftKey: any; key: string; preventDefault: () => void; }) {
		// Ensure that it is a number and stop the keypress
		if (
			e.shiftKey ||
			[
				"0",
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"Backspace",
				"Tab",
				".",
			].indexOf(e.key) === -1
		) {
			e.preventDefault();
		}
	}
}