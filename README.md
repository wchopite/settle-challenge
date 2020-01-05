## Rest API with Nodejs and MongoDB

This API is designed using multiple layers:

1. `API`: Presentation Layer (Routes and Controllers).
2. `Service`: Layer with all the business logic.
3. `DAL (Data Access Layer)`: This layer separates access to data sources (databases). Use a type of `Repository Pattern`, trying to maintain a common interface to the `service layer`, allowing if necessary change the database engine (for example: change `MongoDB` for `MySQL`)
4. `Shared`: This layer contains modules common to all layers, such as an `http client` and the `logger`

`Of course` this is a beginning. A good idea is to add a central layer called `Domain`, with all the business logic, and create `models each layer`. In other words, try to apply a full `Clean Architecture`  https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

### To start:

1. Clone this repo using `git clone https://github.com/wchopite/settle-challenge.git`
2. Rename the file `.env.example` to `.env` and setup the environment vars
4. Install the dependencies with `npm install`
5. Create the databases you have setup on `step 2`
6. Run the application in development mode with `npm run start:dev`
7. Access `http://localhost:8080/`

Each request to the API must include the following headers:

```
Content-Type: "application/json"
```

## Things to do after configuration and dependencies installation (test purpose)

1. Create a rate from the default provider (`fixerio`) using the `/api/provider_rates` endpoint
2. To create an custom rate (rate with a custom fee)

Check the `swagger doc` `/api/docs` for more information

## Scripts

This repo comes with some npm scripts, you will run them with `npm run <script name>`:

- `start` Run the application in production mode
- `start:dev`: Run the application in development mode
- `lint`: Lint the codebase
- `test`: Run the all test suite
- `coverage`: Run the coverage using nyc
- `verify`: Run the `lint` and `test`command

For testing, `mocha`, `chai`, and `supertest` are used

## Running the app with docker-compose

If you wish, you can run the app using Docker and Docker Compose. For this, you need:

1. `Install Docker`: https://docs.docker.com/compose/install/
2. `Install Docker Compose`: https://docs.docker.com/compose/install/

Once you have installed them, in the root folder of the project you need to run `docker-compose up`. This command generate the containers with the node app and mongo database. Then you can test it using an application like Postman (for example)

## Endpoints documentation

This API uses swagger for the documentation of endpoints. To access this, you just need to start the server and then access `http://server:port/api/docs`, for example:` http://localhost:8080/api/docs`

## Deployed example

1. Global health check: `aws code deployed, health check`
2. Swagger API Documentation: `aws code deployed, docs endpoint`

## Thinks to do

1. Add more unit and integration `test`, and improve the actual tests
2. Add input validation on endpoints using `joi` https://hapi.dev/family/joi/
3. To improve `error management`
4. To improve `coverage` with `nyc` lib
5. Add a new command to run in a separate way the `unit` and `integration` test
6. Allow pagination in the endpoints
7. Create a separate file for the `server`
8. Add a token to the swagger documentation
9. Add files configuration to `CI/CD` (codeship, google cloud build...)
10. To improve the abstraction on the repositories (DAL layer, access to database) and define a better interface to the `service layer`
11. To improve management dependencies, using for example an `IoC (Inversion of Control) container`, like: `awilix`, `bottlejs`, `inversify`
