function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Filter by Your Name')
    .addItem('Filter Your Name', 'showSidebar')
    .addToUi();

}


var htmlOutput; // Declare a variable to store the sidebar HTML content

function showSidebar(selectedName) {
  if (!htmlOutput) {
    htmlOutput = HtmlService.createHtmlOutputFromFile('sidebar')
      .setWidth(300)
      .setTitle('Choose Your Name');
  }
  
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
  
}

function applyFilter(name) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Individuals');
  var filter = sheet.getFilter();

  if (filter) {
    filter.remove();
  }

  sheet.getDataRange().createFilter();

  var criteria = SpreadsheetApp.newFilterCriteria().whenTextContains(name).build();
  sheet.getFilter().setColumnFilterCriteria(1, criteria);

}



