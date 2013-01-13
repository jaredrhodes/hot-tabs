
chrome.tabs.onUpdated.addListener(function(id, ev, tabs){
	setTabs();
});

chrome.tabs.onMoved.addListener(function(id, ev, tabs){
	setTabs();
});

function setTabs(){
	// get all the tabs in the window
	var tabs = chrome.tabs.query({'windowId': null}, function(tabs){
		var tabsLength = tabs.length;
		for(i = 0; i < tabsLength; i++){
			var tabId = tabs[i].id;
			var tabTitle = tabs[i].title;
			// adding 1 to var i to "count" where we are at
			var tabNumber = 1+i;
			// pattern for something like "3) " in the title
			var patt = /^\d{1,2}\)\s/;
			// if there is a match, update the match
			if(patt.test(tabTitle)){
				newTabTitle = tabTitle.replace(patt,tabNumber+') ');
			}
			// otherwise append the tab number
			else{
				newTabTitle = tabNumber+') '+tabTitle;
			}
			// inject the new title name
			chrome.tabs.executeScript(tabId, {code: 'document.title = "'+newTabTitle+'"'}, null);
		}
	});
}