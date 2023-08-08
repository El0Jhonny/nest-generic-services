# Nest Generic Services

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm i nest-generic-services
```

## Quick Start

1. Add module in your AppModule

```js
@Module({
  imports: [
    GenericServicesModule.register()
  ],
})
export class AppModule {
}
```

2. Create a new nest project using the command `nest new proyect-name`.
3. Install de library using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):
4. Create your entities in your project and extends the class BaseEntity

```js
export class UserEntity extends BaseEntity {
}
```

5. Create your dto in your project.
6. Create your services in your project and extends the class BaseService

```js
export class UserService extends BaseService<UserEntity, UserDto> {
}
```

7. Create your controllers in your project and extends the class CustomResponseBaseController or DefaultResponseBaseController

```js
export class UserController1 extends CustomResponseBaseController<UserEntity, UserService, UserDto, ResponseDto> {
}
```

```js
export class UserController2 extends DefaultResponseBaseController<UserEntity, UserService,UserDto> {
}
```
