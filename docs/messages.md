# Messages

## Actions

### action.sendRequest
Send an XMLHTTPRequest.

  * id: unique id
  * data: data to be sent (optional)
  * method: HTTP method
  * url: URL

### action.getCredentials
Get username and password.

  * id: unique id
  * title: title to be displayed

### action.syncDb
Synchronize database.

  * id: unique id
  * db: database object

## Events

### event.requestCompleted.<id>
Action "sendRequest" with the specified id has been completed.

  * id: id of the sendRequest action
  * data: the XHR object, if the request was successful
  * error: the XHR object, if the request was unsuccessful

### event.credentialsObtained.<id>
Action "getCredentials" with the specified id has been completed.

  * id: id of the getCredentials action
  * data: {user, password}, if request was successful
  * error: if request was unsuccessful

### event.dbSyncCompleted.<id>
Action "syncDb" with the specified id has been completed.

  * id: id of the syncDb action
  * error: if request was unsuccessful
