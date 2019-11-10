function ActionItemAlert() {

  //Email addresses to send notification to; multiple email addresses expected to be comma separated
  var emailAddress = ''

  //SheetName to watch
  var SheetName = "Actions"
  var SS=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetName)

  //Column to watch for days remaining (Calculation for days remaining done on Google Sheets using sheet formulas)
  var Avals = SS.getRange("E2:E").getValues();
  var numberOfValues = Avals.filter(String).length;
  var daysToGo = SS.getRange(2,5,numberOfValues).getValues();

  //To get the Action Item and Status of line item
  var actionItems = SS.getRange(2,2,numberOfValues).getValues();
  var itemStatus = SS.getRange(2,6,numberOfValues).getValues();
  var actiondue = 'FALSE'
  for(i = 0; i < numberOfValues; i++)
  {
    if (daysToGo[i]<1 && itemStatus[i].toString().toLowerCase()=='open')
      actiondue = 'TRUE'
  };
  //Send Alert Email.
  if (actiondue == 'TRUE')
  {
    var message = 'There are a few action items due soon, please check the tracker on Google Sheets\n\n *** This message was auto-generated ***';
    var subject = 'Action item due';
    MailApp.sendEmail(emailAddress, subject, message);
  }
}
