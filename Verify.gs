function verify() {
  var url = "Discord webhook url";
  var n = SpreadsheetApp.getActive().getSheetByName('tokenNames').getLastRow() - 1;
  var names = SpreadsheetApp.getActive().getSheetByName('tokenNames').getSheetValues(2, 1, n, 1);
  var tokens = SpreadsheetApp.getActive().getSheetByName('tokenNames').getSheetValues(2, 2, n, 1);

  var new_data = new Array(n);
  var flag = true;
  
  for( var i = 0; i < n; i++){
    new_data[i] = new Array(2);
    new_data[i][0] = tokens[i][0];
    try {
      new_data[i][1] = ImportJSON("https://api.wazirx.com/api/v2/tickers","/"+ tokens[i] +"inr/last","noInherit,noTruncate,noHeaders")[0][0];
    }
    catch(err) {
      flag = false;

      var discord = {
      "content": "Token error for: "+ names[i] + ": " + tokens[i],
      };

      var options = {
        method: 'POST',
        contentType: 'application/json',
        payload: JSON.stringify(discord)
      };

      var response = UrlFetchApp.fetch(url, options);

      return "Token error: " + tokens[i];
    }
  } 
  if(flag){
      return "Verified! Everything is working!"; 
    }
}
