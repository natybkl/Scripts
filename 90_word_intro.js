function generateIntroductions() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Names');
    
    var personaNames = sheet.getRange("A2:A").getValues().flat().filter(Boolean);
    
    var intros = [];
    
    for (var i = 0; i < personaNames.length; i++) {
      var name = personaNames[i];
      var prompt = "Introduce " + name + " in 90 words:";
      var intro = generateIntroduction(prompt);
      intros.push([intro.introText, intro.introCount]);
    }
    
    sheet.getRange(2, 2, intros.length, 2).setValues(intros);
  }
  
  function generateIntroduction(prompt) {
    var apiKey = 'OPEN_AI_API_KEY';
    var apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    
    var headers = {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    };
    
    var payload = {
      'prompt': prompt,
      'max_tokens': 110,
      'temperature': 0.7,
      'n': 1
    };
    
    var options = {
      'method': 'post',
      'headers': headers,
      'payload': JSON.stringify(payload)
    };
    
    var response = UrlFetchApp.fetch(apiUrl, options);
    var intro = JSON.parse(response.getContentText()).choices[0].text.trim();
  
    // Find the last occurrence of a period (.) in the generated text
    var lastPeriodIndex = intro.lastIndexOf('.');
    
    // Trim the text to the last complete sentence
    introText = intro.slice(0, lastPeriodIndex + 1);
  
    // Count the number of sentences in the generated text
    var introCount = introText.split(/\s+/).length;
    
    return { introText: introText, introCount: introCount };
  
  }
