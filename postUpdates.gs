function postUpdates() {
  var url = "Discord Webhook url";
  var sheetName="regularUpdate";
  
  // var test_url = "https://discord.com/api/webhooks/840022099321815070/_1FtciEWBhvgPKWAcQVS9b8hPR9NpawiBXeQx4wh0l5STkNY8ziHFHRg-StP8dkFrVVX";
 
  
  var m = SpreadsheetApp.getActive().getSheetByName(sheetName).getLastRow();
  var n = SpreadsheetApp.getActive().getSheetByName('tokenNames').getLastRow() - 1;
  var names = SpreadsheetApp.getActive().getSheetByName('tokenNames').getSheetValues(2, 1, n, 1);
  var tokens = SpreadsheetApp.getActive().getSheetByName('tokenNames').getSheetValues(2, 2, n, 1);
  var old_data = SpreadsheetApp.getActive().getSheetByName(sheetName).getSheetValues(1, 1, m, 2);
 
  var delta  = SpreadsheetApp.getActive().getSheetByName('tokenNames').getSheetValues(2,3,n,1); //the % change in cryptocurrency stats that is considered significant
  
  var changeWindow = SpreadsheetApp.getActive().getSheetByName('tokenNames').getSheetValues(2,4,1,1);//time of regular posting
   
  var new_data = new Array(n);
  
  
  for( var i = 0; i < n; i++){
    new_data[i] = new Array(2);
    new_data[i][0] = tokens[i][0];
    new_data[i][1] = ImportJSON("https://api.wazirx.com/api/v2/tickers","/"+ tokens[i] +"inr/last","noInherit,noTruncate,noHeaders")[0][0];

    Logger.log(new_data[i]);
  }

  var adminValues = SpreadsheetApp.getActive().getSheetByName('adminConfig').getSheetValues(1,1,1,6)[0];
  var iters = adminValues[5];
  
  var iter_regular = adminValues[1];
  var hrs = adminValues[2];
  var flag =false;
 
  var out = "Significant Changes in last "+changeWindow+' min: \n';

  var k = Math.min(n, m);

  try{

  for(var i = 0; i < k; i++){
      
      var change = (parseInt(new_data[i][1]) - parseInt(old_data[i][1])) * 100 / parseInt(old_data[i][1]);
      
      //For checking if change >delta
         
      if (Math.abs(change)>delta[i][0]){
        flag=true;
        out += names[i][0] + ": " + new_data[i][1];
        if(change > 0){
        out += " :arrow_up_small: ";
        } else if(change < 0) {
        out += " :arrow_down_small: ";
        } else {
        out += " :arrow_forward: ";
        }
        out += change.toFixed(2).toString() + "%\n";
      }
  }
    var discord = {
      "content": out,
    };

    var options = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(discord)
    };

    //testing flag
    console.log('flag:'+flag)
  }
  catch(err){
    flag=false;
  }
    // timing using changewindow regularUpdate
    if ( (iters%changeWindow ==0)&&(flag) ){
    var response = UrlFetchApp.fetch(url, options);
    console.log('posted');
    Logger.log(response);

    //to renew data in regularUpdate sheet
    backup(sheetName,new_data,n);
    console.log('updated'+sheetName);
    } 

    


  SpreadsheetApp.getActive().getSheetByName('adminConfig').getRange(1,6).setValue(iters + 1);
    
}
