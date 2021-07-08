* # `Introduction`

Introducing key concepts to understanding how Rest API's function.

* ## `Client Server Architecture`

A client is a front-end platform in which the user interacts with. (Apps, websites, etc.).

The server is where data is stored and managed. 

In this architecture, these two communicate via the `HTTP protocol`.

REST: `Representational State Transfer`

* ## `HTTP`

AKA `Hypertext Transfer Protocol`

HTTP is a protocol that provides the functionality to `Create, Read, Update, and Delete` data. (CRUD Operations).

* Methods:
    
    * GET
    * POST
    * PUT
    * DELETE

* ## `Functionality of HTTP Methods`

* `GET`

Sending a GET request will retrieve a list of data from a given address.

For example, requesting a list of customers would look something like this `GET /api/customers`

The endpoint given determins what information is given in the response.

For a specific customer, it'd look something like: `GET /api/customers/1` and will return the customer with the ID of 1.

* `PUT`

When sending a PUT request, you provide the endpoint/address of the desired data to be updated. Then you provide the object in the body of the request with *`UPDATED`* properties.

This gets sent to the server and the server's response is to update the data of the given address' properties.

* `DELETE`

When sending a DELETE request, you simply provide the endpoint/address of an object.

* `POST`

Sending a POST request to a given endpoint, will add a data value at that address. In the body of this request, you include the object of the data with given property values to be assigned to this new data.

* ### Frameworks

With HTTP modules, you are able to use a request object to check URL's of incoming requests.

You can create a multitude of these to access each route in the API. Instead of adding more `if` statements in the callback function to handle these, you use a framework.

Using a framework, you are able to add more routes without impacting the maintainability of a program.