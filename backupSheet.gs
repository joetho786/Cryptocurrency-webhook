function backup(sheetName,new_data,length_new_data) {
  console.log(new_data);
            SpreadsheetApp.getActive().getSheetByName(sheetName).clear();
            for( var i = 0; i < length_new_data; i++){
              SpreadsheetApp.getActive().getSheetByName(sheetName).appendRow(new_data[i]);
              console.log(new_data[i]);
              
            }
          console.log('updated'+ sheetName)  
}
