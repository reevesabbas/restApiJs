# `How to build a Rest API using NodeJS, ExpressJS & MongoDB`

Date: 6/23/2021

This is being done on Windows 10 using WSL & Ubuntu.

I am following along with [this Web Dev Simplified Video](https://youtu.be/fgTGADljAeg). There are many cases where he explains things very uniformly, where someone who is unfamiliar with the content needs more explanation and context as to *`why`* things are being implemented and *`what`* exactly they do. I will be trying my best to give sources/explain my interpretation of these concepts and components as I learn them.

* ## `Prerequisites`

    * Create a new directory on your system for this: `mkdir (name)`

    * Ensure you have `nodejs`, `npm` installed on system. As well as MongoDB
        
        * In your terminal, run: `npm i express mongoose`
        
            Express is a NodeJS framework that assists in creating server-side web applications.

            Mongoose is...
        
        * Next, run: `npm i --save-dev dotenv nodemon`

            `--save-dev` ensures that these modules are development-based and are not required for the integrity of the program.

            `dotenv` allows storing and pulling of environment variables

            `nodemon` allows us to make changes without manually 
            refreshing server.

    * In your directory, there should be a `package.json` file. In this, replace the entire `"test"` script line with: `"devStart": "nodemon (filename).js`

        * For the file name, insert the name of the js file you'll be using for the rest API.

    * Next, create a file named `.env` for storing environment variables and `.gitignore` to ignore dev files when pushing to github.

        * In the `.gitignore` folder you want to put on separate lines: `.env` and `node_modules`

             Ignoring .env because environmental variables are unique to each system? idk. And node_modules because these are installed separately by each dev.

    * Ensure the MongoDB service is running by using `sudo service mongodb start`

    ### *Throughout this process, it is vital to properly name variables and keep track of the purpose and use of each one. It is easy to get mess up by using the wrong variable when following along if you do not name them well enough. I will be using var names that are broad for understanding purposes.*
    
* ## `Setting up`

First, you need to implement the Express & Mongoose libraries into your NodeJS file. You do this by using the `require()` method which loads JS modules.
To access the modules' methods, you have to declare a variable (usually called `app`) and assign it to the express function like so:

```js 
const express = require('express');
const mongoose = require('mongoose');
const app = express();
```

In order to connect the client program to a server program, you will need a `port number` to listen from.

Since ports are `dynamically set` in `hosting environments`, you will first use the process method to access an environments port like so:

```js
const port = process.env.PORT || 3000;
```
This way, the port can be set in different environments and won't be hardcoded. || (random number) is used as a backup.

Then, you need to impliment the `.listen` method of the `require` library to retrieve get requests and start the server.

* This method takes in 2 parameters, the port number, and a callback function, which in this case will be used for displaying a message to the console that the server has started.

* Pass through the port variable you created above, and in the message use backticks to use a template literal of the port #.

```js
app.listen(port, () => console.log(`Server started on port ${port}`));
```

* ## `Connecting to Mongoose DB`

Mongoose has a `.connect` method that takes in 2 parameters: a `URL`, and an `object to configure the connection to the database`.

To get the URL, in your `.env file` you will need to create a variable and assign it to your localhost url with mongodb in front, like so:

```
DATABASE_URL = mongodb://localhost/data
```
You can replace `'data'` with the piece of data that you are using with this rest API.

Now, back in your nodeJS file, you want to access the `.env` file by using require, at the top of the nodejs file do:

```js
require('dotenv').config();
```

Then, call the connect method on the mongoose variable like so:

```js
mongoose.connect(process.env.DATABASE_URL)
```
Type in the terminal: `npm run devStart`

You will receieve a `warning` telling you to pass an option of an object with a property named `"useNewUrlparser"` that is set to true, copy that object and paste it after the database URL, then save the file.

For me, another warning came up that told me to pass in another object. This property was `"useUnifiedTopology"` which was also set to true. Copy this property and paste it into the same object.

Now, your db connection should look like this:

```js
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
```

And when you save, it should automatically restart because of the script we wrote in the package.json file.

And it should show `"Server started on port (portNum)"` as written in the `.listen` method call.

* ## `Checking your DB Connection`

Declare a variable and set it to the `.connection` method of the mongoose library.

Now, access the `.on` method of that variable, and pass through two arguments:
`'error'` for the state of connection, and a `callback function` that has one argument:
`error` 

You want to console.error the error parameter to let you know when the database connection has an error.

To know if he database has been connected to, you use the `.once` method on the same variable, which also takes 2 arguments:

`'open'` for when the database connection status is `opened`. And a `callback function` to log to the console that the database has been connected to.

This should all look like:

```js 
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));
```

Ctrl + S to save and now, nodemon should restart and you should see your `Server started` message and `Connected to database` message. 

If at this point it is not working, you need to ensure your mongoDB is running properly on your system.

Type `sudo service mongodb status` in your terminal to check the status. 

* ## `Setting up Server for JSON & Setting up routes`

To have the server accept JSON, we need code that runs when the server gets a request, but before it gets passed to the `routes`.

To do so, we use `app.use()` and we pass through the `.json` method of the express library.

```js
app.use(express.json())
```

This allows our server to use JSON in the body for Post and Get requests etc.

To implement routes into the API, create a variable that accesses a file path where the routes/endpoints will be.

You do so by using the `require` method with a variable declaration.

```js
const dataRouter = require(`./routes/data`);
```


Under that, to set up how the router will be accessed we use the .use method of the express library.

```js
app.use('/data', dataRouter)
```

*Again, `replace 'data' with whatever data you will be handling throughout this.`*

You'll receive an error now, that is because we have not setup the routes folder and file.

`Setting up the routes file`

Create a folder named `routes`, and in there create a `data.js` file and a `route.rest` file to test these routes in.

In the route.rest file, ensure your server is running and you are connected to the database. Then, get the URL, which should look something like:

`http://localhost:5000/data` if you are using localhost.

To test the HTTP methods, all you do is write out the method type, then the URL, like so:

```r
GET http://localhost:5000/data

###

GET http://localhost:5000/data/Id

### 

POST http://localhost:5000/data
Content-Type: application/json

{
    "name": "putNameHere",
    "etc": "etc"
}

###

DELETE http://localhost:5000/data/Id

###

PATCH http://localhost:5000/data/Id
Content-Type: application/json

{
    "name": "updatedName",
    "etc": "updatedEtc"
}
//See explanation below:
```

Separate each method with 3 hashtags `###`

Above each method, there is a `Send Request` button, when you click on it, it sends a request to the server which pops up the response on the right. 

If working, it will show some random 7 or so lines I just ignored, and then `an array of objects, of JSON formatted data`

In the requests that require additional information to POST or UPDATE, there needs to be `Content-Type: application/json` under the URL to set the formatting of the data you are about to give it.

* ### `REFER TO THESE TESTS AS YOU ARE WRITING AND BUILDING THE ROUTES FOR THESE METHODS`

---

The routes for each HTTP method will be set up here, in order to do that we need to require express here as well.

```js
const express = require('express')
const router = express.Router()
```

`express.Router()` is a class that creates route handlers. Creating an instance of this class creates the routing system and a middleware.

To create a route, you use `router.` and create a method which takes in 2-3 arguments based on the method functionality

In our case, we need routes to each HTTP method. And the methods with 2 arguments are the requests that do not require an Id.

And the 3rd argument for the requests that require an Id will be a function to handle searching for an Id within the database.

Finding by Id is going to be used multiple times, so creating it's own function would be optimal. 

For now, I will insert this third parameter as `getData`, we will create it as we setup the body of the routes.

So, we set these up like so:

```js

//Async because communicating with server, need to use a try/catch and await for the server to read the request and give a response.
//For getting all data.
router.get('/', async (req, res) => {
    //...
})

//For getting single piece of data by Id
router.get('/:id', getData, (req, res) => {
    //...
})

//For creating data and storing in database.
router.post('/', async (req, res) => {
    //...
})

//For updating data by Id
router.patch('/:id', getData, async (req, res) => {
    //...
})

//For deleting data by Id
router.delete('/:id', getData, async (req, res) => {
    //...
})
```

For the first argument, we do '/' or '/:id' for the url path being accessed. Second argument for finding data by Id, and third argument being a callback function for the request and response of the server.

Now that we have the routes set, we need to actually setup our data format to manage it properly.

* ## `Formatting Data (Schema setup)`

Create a new folder named `models` and within this, create a `data.js` file (replace data w/ your data name).

Access the mongoose library 

```js
const mongoose = require('mongose')
```

To create a new Schema which is just an `outline for your data`, you create a new instance of `mongoose.Schema` like so:

```js
const dataSchema = new mongoose.Schema({
 //...body
})
```

Inside the body is where you will setup the data for your db.

Essentially, you are creating your data properties and allocating their functionality within the database.

For example, you create a property for the name, now what type of data is this going to be? Is this property going to be required for POST'ing? (creating a piece of data). Or, what will be the data's default, if any?

For defining your Schema further, see this [MongooseJS page](https://mongoosejs.com/docs/guide.html) for resources.

It should look like:

```js
const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
})
```
These are the two that would prob be in most Schemas, you can `add` whatever you see fit for `outlining your data`.

Make sure you add commas after each property.

`Next,` outside the body of the Schema, we have to write code to allow exporting this Schema into our routes file for direct interaction.  

We do this by accessing the `.model` function of the mongoose library. This creates a copy of your Schema, so make sure that if you add more properties, this gets ran again before managing your database.

For more information see [this MongooseJS page](https://mongoosejs.com/docs/models.html)

```js
module.exports = mongoose.model('data', dataSchema)
```

Now that your schema is setup, back in the `routes` folder we go.

* ## `Routes Bodies`

Next to where you are importing the express library, to access the Schema made, do:
```js
const Data = require('../models/data')
```

Lets create out `getData()` function mentioned earlier to find a piece of data by Id. 

This will be an `async` function with `3 arguments` handling the request, response, and next method to be used.

I will use commenting to describe the code:

```js
async function getData(req, res, next) {
    //For storing the 
    let dataFoundById
    try {
        //using mongoose's findById to look for the a matching ID in the db.
        dataFoundById = await Data.findById(req.params.id)
        //If this does not exist, err 404
        if (dataFoundById == null) {
            //404 means could not find something
            //Returning, because if ID not found- we want to exit the function
            return res.status(404).json({message: 'Cannot find album name'})
        }
        //In the case the Id is not found, but is not null, catch the error and return it thru json.
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    //Setting a response variable = to the data we found by Id.
    res.data = dataFoundById
    //callback function to continue methods.
    next()
}

```

Now we can pass through this function as an argument to search for data by Id.

`For GETing all data:`

```js
router.get('/', async (req, res) => {
    try {
        //await for the .find method to return found data.
        const data = await Data.find();
        //respond with json parsed data.
        res.json(data)
    } catch (err) {
        //Send err to user as JSON, bc json API.
        //Status set to 500 so user knows err w/ server.
        res.status(500).json({message: err.message})
    }

})
```

Simple enough right? We access the data through our variable to access the Schema we made at the top.

`For GETing one piece of data thru Id`

```js
//Pass through the getData function as the second argument.
router.get('/:id', getData, (req, res) => {
    //respond with json parsed data found by the getData function.
    res.json(res.data)
})
```
The functionality of this method was already made, so it's very easy to setup.

`For updating a dataset or "PATCH"ing`

So the way this method works, it finds data by Id, and will only update what is given in the `requests` body, that way you won't need to re-write down the data's Schema in the request for it to work.
```js
//updating a piece of data
router.patch('/:id', getData, async (req, res) => {
//Only updates data that is given in the request's body.
    if (req.body.name != null) {
        res.data.name = req.body.name;

    try {
        //returns a promise, resolves to the data that was saved.
        const updatedData = await res.data.save()
        //respond with json parsed updated data
        res.json(updatedData)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
```

`For deleting data found by Id:`

```js
router.delete('/:id', getData, async (req, res) => {
    try {
        //If data successfully removed, respond with json msg.
        await res.data.remove()
        res.json({message: `Deleted data`})
        //If not, err500 something wrong with server end.
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})
```

Now, test all of the methods within the `route.rest` file. If all of them work properly, then you're done with building a basic
Representational State Transfer, Application Programming Interface

or RESTful API.