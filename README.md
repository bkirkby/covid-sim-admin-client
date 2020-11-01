# Covid Sim Admin Client
this project is the admin client for the Covid Sim System. with this project
admins wil be able to give admin credentials and then query the server
for the aggregate average data for each covid sim done in the wild.

the interface will show graphs of the average sim runs along with tabular
data for each graph if desired.

## development
* fork and clone this repo to your local machine
* create a .env file in the root of the project that contains the following:
  * REACT_APP_SERVER_API=http://localhost:8081
* open a console window and start the covid sim admin client by entering `yarn start`

the covid sim client should then start in your default browser on http://localhost:3001

## deployment
the bkirkby/covid-sim-admin-client repo is configured to deploy a build of the `master` branch
automatically to the publically available https://covidsim-admin.now.sh host.

this means you should not merge into master unless you are sure the changes should
be made live in production.

for those of you forking the code, feel free to submit pull requests on any
changes you made.