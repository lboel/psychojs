/**
 * Button Stimulus.
 *
 * @author Alain Pitiot
 * @version 2021.2.0
 * @copyright (c) 2017-2020 Ilixa Ltd. (http://ilixa.com) (c) 2020-2021 Open Science Tools Ltd. (https://opensciencetools.org)
 * @license Distributed under the terms of the MIT License
 */

import { Mouse } from "../core/Mouse.js";
import { TextBox } from "./TextBox.js";

/**
 * <p>ButtonStim visual stimulus.</p>
 *
 * @name module:visual.ButtonStim
 * @class
 * @extends TextBox
 * @param {Object} options
 * @param {module:core.Window} options.win - the associated Window
 * @param {String} options.name - the name used when logging messages from this stimulus
 * @param {string} [options.text=""] - the text to be rendered
 * @param {string} [options.font= "Arial"] - the font family
 * @param {Array.<number>} [options.pos= [0, 0]] - the position of the center of the text
 * @param {string} [options.anchor= "center"] - horizontal alignment
 * @param {string} [options.units= "norm"] - the units of the text size and position
 * @param {Color} [options.color= Color("white")] the background color
 * @param {Color} [options.fillColor= Color("darkgrey")] the fill color
 * @param {Color} [options.borderColor= Color("white")] the border color
 * @param {Color} [options.borderWidth= 0] the border width
 * @param {number} [options.opacity= 1.0] - the opacity
 * @param {number} [options.letterHeight= undefined] - the height of the text
 * @param {boolean} [options.bold= true] - whether or not the text is bold
 * @param {boolean} [options.italic= false] - whether or not the text is italic
 * @param {boolean} [options.autoDraw= false] - whether or not the stimulus should be automatically drawn on every frame flip
 * @param {boolean} [options.autoLog= false] - whether or not to log
 */
export class ButtonStim extends TextBox
{
	constructor(
		{
			win,
			name,
			text,
			font,
			pos,
			size,
			padding,
			anchor = "center",
			units,
			color,
			fillColor = "darkgrey",
			borderColor,
			borderWidth = 0,
			opacity,
			letterHeight,
			bold = true,
			italic,
			autoDraw,
			autoLog,
		} = {},
	)
	{
		super({
			win,
			name,
			text,
			font,
			pos,
			size,
			padding,
			anchor,
			units,
			color,
			fillColor,
			borderColor,
			borderWidth,
			opacity,
			letterHeight,
			bold,
			italic,
			alignment: "center",
			autoDraw,
			autoLog,
		});

		this.psychoJS.logger.debug("create a new Button with name: ", name);

		this.listener = new Mouse({ name, win, autoLog });

		this._addAttribute(
			"wasClicked",
			false,
		);

		// Arrays to store times of clicks on and off
		this._addAttribute(
			"timesOn",
			[],
		);

		this._addAttribute(
			"timesOff",
			[],
		);

		this._addAttribute(
			"numClicks",
			0,
		);

		if (this._autoLog)
		{
			this._psychoJS.experimentLogger.exp(`Created ${this.name} = ${this.toString()}`);
		}
	}

	/**
	 * How many times has this button been clicked on?
	 *
	 * @name module:visual.ButtonStim#numClicks
	 * @returns {number} the number of times the button has been clicked on
	 */
	get numClicks()
	{
		return this.timesOn.length;
	}

	/**
	 * Is this button currently being clicked on?
	 *
	 * @name module:visual.ButtonStim#isClicked
	 * @returns {boolean} whether or not the button is being clicked on
	 */
	get isClicked()
	{
		return this.listener.isPressedIn(this, [1, 0, 0]);
	}
}
