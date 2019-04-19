class GuiObj {
	constructor(classes, src, include, ifClause, layout, layoutAlign) {
		this.classes = classes;
		this.src = src; 
		this.include = include;
		this.ifClause = ifClause;
		this.layout = layout;
		this.layoutAlign = layoutAlign;
	}

	packData() {
		return null;
	}
}

class IconButton extends GuiObj {
	constructor(properties, id, label, direction, icon, clickEvent) {
		super(properties.classes, properties.src, properties.include, 
			  properties.ifClause, properties.layout, properties.layoutAlign);
		this.id = id; 
		this.label = label;
		this.direction = direction;
		this.icon = icon;
		this.clickEvent = clickEvent;
	}
}

class Menu extends GuiObj {
	constructor(properties, open, triggerButton, actions, direction) {
		super(properties.classes, properties.src, properties.include, 
			  properties.ifClause, properties.layout, properties.layoutAlign);
		this.open = open;
		this.triggerButton = triggerButton;
		this.actions = actions;
		this.direction = direction;
	}
}

class SliderMeasure extends GuiObj {
	constructor(properties, id, label, tooltip, min, max, step, value) {
		super(properties.classes, properties.src, properties.include, 
			  properties.ifClause, properties.layout, properties.layoutAlign);
		this.id = id;
		this.label = label;
		this.tooltip = tooltip;
		this.min = min;
		this.max = max;
		this.step = step;
		this.value = value;
	}

	packData() {
		return { this.label : this.value };
	}
}

class RangeMeasure extends SliderMeasure {
	constructor(properties, id, label, tooltip, min, max, step, value, childProperties) {
		super(properties, id, label, tooltip, min, max, step, value);

		this.lowID = this.id + "Low";
		this.lowSlider = new SliderMeasure(childProperties, this.lowID, "low", "", this.min, this.max, this.step, this.value);
		this.highID = this.id + "High";
		this.highSlider = new SliderMeasure(childProperties, this.highID, "high", "", this.min, this.max, this.step, this.value);
	}

	packData() {
		var low = this.lowSlider.packData()[this.lowID];
		var high = this.highSlider.packData()[this.highID];
		return { this.id : { "low" : low, "high" : high } };
	}
}

class GuiGroup extends GuiObj {
	constructor(properties, id, sections) {
		super(properties.classes, properties.src, properties.include, 
			  properties.ifClause, properties.layout, properties.layoutAlign);
		this.id = id;
		this.sections = sections;
	}

	packData() {
		var packageData = {};
		for (const [sectionID, section] of Object.entries(this.sections)) {
			var subPack = section.packData();
			if (subPack != null) {
				var data;
				if (subPack.hasOwnProperty(sectionID)) {
					data = subPack[sectionID];
				}
				else {
					data = subPack;
				}
				packageData[sectionID] = data;
			}
		}

		return { this.id : packageData };
	}
}

class SelectDisplay extends GuiObj {
	constructor(properties, id, label, options, selected, multiSelect) {
		super(properties.classes, properties.src, properties.include, 
			  properties.ifClause, properties.layout, properties.layoutAlign);
		this.id = id;
		this.label = label;
		this.options = options;
		this.selected = selected;
		this.multiSelect = multiSelect;
	}

	packData() {
		var selectedVals = [];
		var valType = typeof this.selected;
		if (valType == "string") {
			selectedVals.push(this.selected);
		}
		else {
			selectedVals = selectedVals.concat(this.selected);
		}

		return { this.id : selectedVals };
	}
}

class AccordionTab extends GuiObj {
	constructor(properties, id, title, content, flexOrder, state) {
		super(properties.classes, properties.src, properties.include, 
			  properties.ifClause, properties.layout, properties.layoutAlign);
		this.id = id;
		this.title = title;
		this.content = content;
		this.flexOrder = flexOrder;
		this.state = state;
	}

	packData() {
		var data = this.content.packData()[this.content.id];
		if (Object.keys(data).length > 0) {
			return { this.id : data };
		}
		else {
			return null;
		}
	}
}