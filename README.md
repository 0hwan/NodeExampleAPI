# NodeExampleAPI

## 기본 NPM
- 날짜 시간관련 npm : dayjs, dayjs-ext
- logging : log4js
- route 관리 : express-enrouten
- TDD : mocha, chai, chai-http

## Package Structure
```
NodeExample -\
             |- controller/  – defines your app routes and their logic
             |- helpers/ – code and functionality to be shared by different parts of the project
             |- middlewares/ – Express middlewares which process the incoming requests before handling them down to the routes
             |- models/ – represents data, implements business logic and handles storage
             |- services/ -
             |- public/ – contains all static files like images, styles and javascript
             |- views/ – provides templates which are rendered and served by your routes
             |- tests/ – tests everything which is in the other folders
             |- app.js – initializes the app and glues everything together
             |- package.json – remembers all packages that your app depends on and their versions
```
