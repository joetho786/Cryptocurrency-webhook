function sendUpdates() {
  var url = "Url of discord webhook";
  var n = SpreadsheetApp.getActive().getSheetByName('tokenNames').getLastRow() - 1;
  var names = SpreadsheetApp.getActive().getSheetByName('tokenNames').getSheetValues(2, 1, n, 1);
  var tokens = SpreadsheetApp.getActive().getSheetByName('tokenNames').getSheetValues(2, 2, n, 1);

  var m = SpreadsheetApp.getActive().getSheetByName('oldData').getLastRow();
  var old_data = SpreadsheetApp.getActive().getSheetByName('oldData').getSheetValues(1, 1, m, 2);
  
  var new_data = new Array(n);

  
  verify();
  
  for( var i = 0; i < n; i++){
    new_data[i] = new Array(2);
    new_data[i][0] = tokens[i][0];
    new_data[i][1] = ImportJSON("https://api.wazirx.com/api/v2/tickers","/"+ tokens[i] +"inr/last","noInherit,noTruncate,noHeaders")[0][0];

    Logger.log(new_data[i]);

    
  }
  
  
  
  //for daily backup 24hr backup
  updateOldValue();

  var adminValues = SpreadsheetApp.getActive().getSheetByName('adminConfig').getSheetValues(1, 1, 1, 3)[0];
  var iters = adminValues[1];
  var hrs = adminValues[2];
  console.log('iters:'+iters);
  
 //5hr update
  if(iters%hrs == 0){
    var out = "";
    console.log('post')
    var k = Math.min(n, m);
    for(var i = 0; i < k; i++){
      out += names[i][0] + ": " + new_data[i][1];
      var change = (parseInt(new_data[i][1]) - parseInt(old_data[i][1])) * 100 / parseInt(old_data[i][1]);

      if(change > 0){
        out += " :arrow_up_small: ";
      } else if(change < 0) {
        out += " :arrow_down_small: ";
      } else {
        out += " :arrow_forward: ";
      }
      out += change.toFixed(2).toString() + "%\n";
    }

    var discord = {
      "content": out,
    };

    var options = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(discord)
    };
    
    var response = UrlFetchApp.fetch(url, options);
    Logger.log(response);
  }

  SpreadsheetApp.getActive().getSheetByName('adminConfig').getRange(1, 2).setValue(iters + 1);
  
}
