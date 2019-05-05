var funcMap = {};

function parseGui(guiStructure, componentProp) {
	if (guiStructure && "type" in guiStructure) {
		switch(guiStructure["type"]) {
			case "guiObj":
				return new GuiObj(guiStructure["classes"], guiStructure["ifClause"], 
								  guiStructure["flex"], guiStructure["layout"]);
			break;

			case "textBtn":
				return new TextButton(componentProp[guiStructure["properties"]], 
									  guiStructure["id"], guiStructure["label"], 
									  guiStructure["text"], funcMap[guiStructure["clickEvent"]], 
									  guiStructure["tooltip"], guiStructure["tooltipDir"]);
			break;

			case "iconBtn":
				return new IconButton(componentProp[guiStructure["properties"]], 
									  guiStructure["id"], guiStructure["label"], 
									  guiStructure["icon"], funcMap[guiStructure["clickEvent"]], 
									  guiStructure["tooltip"], guiStructure["tooltipDir"]);
			break;

			case "numInput":
				return new NumberInput(componentProp[guiStructure["properties"]], 
									   guiStructure["id"], guiStructure["label"], 
									   guiStructure["tooltip"], guiStructure["tooltipDir"], 
									   guiStructure["min"], guiStructure["max"], 
									   guiStructure["step"], guiStructure["value"], 
									   guiStructure["required"]);
			break;

			case "menu":
				let triggerButton = parseGui(guiStructure["triggerButton"], componentProp);
				let actions = [];
				guiStructure.actions.forEach(function(action) {
					actions.push(parseGui(action, componentProp));
				});
				return new Menu(componentProp[guiStructure["properties"]], 
								guiStructure["open"], triggerButton, 
								actions, funcMap[guiStructure["direction"]]);
			break;

			case "slideMeasure":
				return new SliderMeasure(componentProp[guiStructure["properties"]], 
									   guiStructure["id"], guiStructure["label"], 
									   guiStructure["tooltip"], guiStructure["tooltipDir"], 
									   guiStructure["min"], guiStructure["max"], 
									   guiStructure["step"], guiStructure["value"]);
			break;

			case "rangeMeasure":
				return new RangeMeasure(componentProp[guiStructure["properties"]], 
									   guiStructure["id"], guiStructure["label"], 
									   guiStructure["tooltip"], guiStructure["tooltipDir"], 
									   guiStructure["min"], guiStructure["max"], 
									   guiStructure["step"], guiStructure["value"],
									   componentProp[guiStructure["childProperties"]]);
			break;

			case "guiGroup":
				let sections = {};
				for (var sectionID in guiStructure["sections"]) {
					var section = guiStructure["sections"][sectionID];
					sections[sectionID] = parseGui(section, componentProp);
				}
				return new GuiGroup(componentProp[guiStructure["properties"]], 
									  guiStructure["id"], sections);
			break;

			case "select":
				return new SelectDisplay(componentProp[guiStructure["properties"]], 
									  guiStructure["id"], guiStructure["label"], 
									  guiStructure["options"], guiStructure["selected"],
									  guiStructure["multiSelect"], funcMap[guiStructure["onChange"]]);
			break;

			case "accordTab":
				let content =  parseGui(guiStructure["content"], componentProp);
				let expandButton = parseGui(componentProp[guiStructure["expandButton"]], componentProp);
				return new AccordionTab(componentProp[guiStructure["properties"]], 
									  guiStructure["id"], guiStructure["title"], 
									  content, guiStructure["flexOrder"],
									  guiStructure["open"], expandButton);
			break;

			default:
				return null;
		}
	} else {
		return null;
	}
}