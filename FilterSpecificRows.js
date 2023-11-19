function filterRowsByGraduationYear() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var responsesSheet = spreadsheet.getSheetByName('Responses');
    var graduatedSheet = spreadsheet.getSheetByName('Graduated Candidates');
    var responsesDataRange = responsesSheet.getDataRange();
    var responsesValues = responsesDataRange.getValues();
    var filteredValues = [];
  
    for (var i = 0; i < responsesValues.length; i++) {
      var graduationYear = responsesValues[i][1]; // Assuming the graduation year column is the second column (B)
  
      // Extract numbers from the graduation year
      var numericYear = graduationYear.replace(/\D/g, ''); // Remove non-numeric characters
  
      if (numericYear && parseInt(numericYear) <= 2023) {
        filteredValues.push(responsesValues[i]);
      }
    }
    
    // Clear existing data in the Graduated Candidates sheet
    graduatedSheet.clearContents();
  
    // Write the filtered values to the Graduated Candidates sheet
    if (filteredValues.length > 0) {
      graduatedSheet.getRange(1, 1, filteredValues.length, filteredValues[0].length).setValues(filteredValues);
    }
  }