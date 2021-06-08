function updateOldValue() {
  var n = SpreadsheetApp.getActive().getSheetByName('tokenNames').getLastRow() - 1;
  var tokens = SpreadsheetApp.getActive().getSheetByName('tokenNames').getSheetValues(2, 2, n, 1);
  var new_data = new Array(n);

  var old_update= SpreadsheetApp.getActive().getSheetByName('adminConfig').getRange(1,9).getValue();//timing interval at which the oldValue sheet is to be updated (24hrs)
  
  var sheetName="oldData";

  var iters = SpreadsheetApp.getActive().getSheetByName('adminConfig').getRange(1,2).getValue();
//   console.log(iters);

  if (iters%old_update == 0){

      
  for( var i = 0; i < n; i++){
    new_data[i] = new Array(2);
    new_data[i][0] = tokens[i][0];
    new_data[i][1] = ImportJSON("https://api.wazirx.com/api/v2/tickers","/"+ tokens[i] +"inr/last","noInherit,noTruncate,noHeaders")[0][0];

    Logger.log(new_data[i]);

    
  }  
    //backup for old data
    backup(sheetName,new_data,n);
    console.log('updated'+ sheetName);
}
}
