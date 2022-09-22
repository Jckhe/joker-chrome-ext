
// //checks for active tab
$(document).ready(function() {
  let currentTab;
  //so when we load this page, this function below will automatically grab the active TAB we are on and set
  //currentTab to the id
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      console.log(tabs[0].id);
      currentTab = tabs[0].id;
  });

  //event listener here that will inject test.js into the currentTab
  //test.js has JS where we change all the DOM elements
  $(".comicSansBtn").on('click', () => {
    //this logs the index of the current tab we're on
    chrome.scripting.insertCSS({
      target: {
          tabId: currentTab
      },
      files: ["comic.css"],
  },
  () => {
    chrome.scripting.executeScript({
      target: {
          tabId: currentTab
      },
      files: ["test.js"]
    })
  });
})


});






//function to get the currentTab's id
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.index;
  }

  