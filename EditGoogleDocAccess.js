function grantEditorAccess() {
    // Replace the email with the email address to which you want to grant editor access.
    var email = 'mamowubayehu@gmail.com';
    
    var sheet = SpreadsheetApp.getActiveSheet();
    var data = sheet.getDataRange().getValues();
    

    for (var i = 0; i < data.length; i++) {
      var docLink = data[i][0];
      
      Logger.log(docLink);
      try {
        // Open the Google Doc.
        var doc = DocumentApp.openByUrl(docLink);
        
        // Add the email address as an editor.
        doc.addEditor(email);
        
       
        success += 1;
      } catch (e) {
        // Log any errors for your reference.
        Logger.log('Error granting access to ' + email + ' for: ' + docLink);
      }
    }
  
    
  }
  