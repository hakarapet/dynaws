# dynaws
Simple API for connecting to Amazon DynamoDB using aws-sdk

### Description
Implements simple CRUD functionality for connecting to AWS dynamoDB.
Currently it is implemented only for local use, as this is for learning purposes only.
Later might be updated to use in production if anyone will need it :)


### Purpose
Learn best practices of creating db client to connect to DynamoDB.

### Usage
* At first the schema of tables should be set. There is a _tables.json_ file in models/setup/ folder. That should be updated with the tables that are needed to be put.
* Run the docker-compose. No need to install anything. It will create container with node js app and dynamodb connected.
* Every endpoint is set to have the table name in it. So for making _GET_ request to get all datas from table _Planes_ the request should look like.
* Request to create a new input

```
curl -X POST \
  http://localhost:80/planes \
  -d '{
	"title": "Airbus 321neo",
	"seats": 185
	}'
```
* Request of getting list of planes
```
curl -X GET \
  http://localhost:80/planes \
```
* Request to get one specific plane. The plane ID (key) should be sent as parameter. Here _3d9e5043-cb9d-4fe7-8040-dcbbe048a961_ is an id for the plane.
```
curl -X GET \
  http://localhost:80/planes/3d9e5043-cb9d-4fe7-8040-dcbbe048a961
```
* Update an input. Again using the id.
```
curl -X PATCH \
  http://localhost:80/planes/3d9e5043-cb9d-4fe7-8040-dcbbe048a961 \
  -d '{
	"title": "Airbus A321neo",
	"seats": 180
}'
```
* Delete the input.
```
curl -X DELETE \
  http://localhost:80/planes/3d9e5043-cb9d-4fe7-8040-dcbbe048a961
```
