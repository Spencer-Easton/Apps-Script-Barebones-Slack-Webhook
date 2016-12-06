function doPost(e) {
  var returnMessage = "",
      slackToken = PropertiesService.getScriptProperties().getProperty("SlackToken"),       
      ssLogID = PropertiesService.getScriptProperties().getProperty("ssLogId"),
      postData = parseParams(e.postData.getDataAsString());
  
  if(postData.token === slackToken){
    SpreadsheetApp.openById().getSheetByName("Log").appendRow([postData]);
    returnMessage = "Your record has been logged."
  }else{
    returnMessage = "Invalid Token"
  }  
  return ContentService.createTextOutput(JSON.stringify({text:returnMessage})).setMimeType(ContentService.MimeType.JSON);
}

function parseParams(postData){
  var postObj = {}
  postData.split("&").map(function(param){var thisParam = param.split("="); postObj[thisParam[0]] = thisParam[1]});
  return postObj;
}

/*
Example of postData from API docs

token=XXXXXXXXXXXXXXXXXX
team_id=T0001
team_domain=example
channel_id=C2147483705
channel_name=test
timestamp=1355517523.000005
user_id=U2147483697
user_name=Steve
text=googlebot: What is the air-speed velocity of an unladen swallow?
trigger_word=googlebot:
*/