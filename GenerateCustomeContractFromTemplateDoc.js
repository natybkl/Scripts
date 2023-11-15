function generateDocumentFromTemplate() {
    // Get the template file by its ID
    var templateFileId = "1mWAUIrb1YrSv0Ocn-djeyvw_38zGzwQNRw-8aSSX000";
    var templateFile = DriveApp.getFileById(templateFileId);
    
    
    // Get the data from the Google Sheet
    var sheetId = "1Ah_cV9l6QMSM4HHDKzww8W9PBjuhQ6lRU6FLXUUAvxY";
    var sheetName = "Test Data";
    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
    var data = sheet.getDataRange().getValues();
    
    // Define the keywords to replace and their corresponding column indexes in the sheet
    var keywords = {
      "{First Name}": 0,
      "{Full Name}": 1,
      "{Role}":2,
      "{Country of Residence}":3
      // Add more keywords and column indexes as needed
    };
    
    for (var rowIndex = 1; rowIndex < data.length; rowIndex++) {
      // Make a copy of the template file
      var copiedFile = templateFile.makeCopy();
    
      // Get the ID of the copied file
      var copiedFileId = copiedFile.getId();
  
      // Open the copied file as a Google Doc
      var doc = DocumentApp.openById(copiedFileId);
    
      // Get the body of the document
      var body = doc.getBody();
  
      // Iterate through each paragraph in the document body
      var paragraphs = body.getParagraphs();
      for (var p = 0; p < paragraphs.length; p++) {
        var paragraph = paragraphs[p];
  
        // Replace the keywords in the paragraph
        for (var keyword in keywords) {
          var columnIndex = keywords[keyword];
          var value = data[rowIndex][columnIndex];
          paragraph.replaceText(keyword, value);
        }
      }
      
      // Save and close the document
      doc.saveAndClose();
      
      // Get the URL of the copied document
      var copiedFileUrl = copiedFile.getUrl();
      
      // Set the URL in a separate column in the Google Sheet
      var urlColumnIndex = 5;
      var urlRowIndex = rowIndex + 1; // Assuming the first row is for headers
      sheet.getRange(urlRowIndex, urlColumnIndex).setValue(copiedFileUrl);
      
      var docName = data[rowIndex][1] + " Contract 2023";
      doc.setName(docName);
  
    }  
      // Return the URL of the copied document
    return copiedFileUrl;
  }