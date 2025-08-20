# Team Building
## A MVP that manages the team building activities for a company


### Tech Stack
This application developed keeping <b>Nextjs</b> for frontend and <b>Expressjs</b> for backend.
Typescript is used for the backend scripting to maintain the typing.
For styling Tailwindcss is being used.


### Client (Folder):
Client related components and routing are present in this folder.


### Server (Folder):
Server(backend) related functions where File parsing and organizing different team building activities are handled.


### Polymorphism:
Base class is an abstract class from where all team building games can get inherited. This is followed to achieve polymorphism.


### Scalability:
If any new team building activity/game is to be implemented, create a separate folder for the same in server and build its related functionality by inheriting the base abstract class "Games" in it.


For the localhost/dev environment, client and server instances need to be started separately. Nodemon library is integrated in-order to achieve automatic recompilation of the scripts during development.


### Execution steps:
Take a pull from this repo and initialize both client and server folder for its dependencies.
run ``npm run dev`` on both client and server to start both the instances.


While hosting to a webserver specify the **domain url** while calling the server API endpoint in ``index.ts`` at the server folder.


### Further enhancements:
Build authorization functionality.


### Missing part
Tests need to be implemented.