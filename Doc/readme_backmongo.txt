node -v
npm -v
npm i -g typescript
tsc -v

npm init

::::::::::::::::: Instalacion de Paquetes :::::::::::::::::

npm i cors          --> intercambio de peticiones
npm i express       --> 
npm i jsonwebtoken  --> autenticacion 
npm i morgan        --> middleware para peticiones http
npm i bcryptjs      --> cifrados de informacion 
npm i mongoose      --> interaccion de base datos y api (ORM)

::::::::::::::::: Paquetes de entorno de desarrollo :::::::::::::::::

npm i nodemon --save-dev --> 
npm i dotenv --save-dev --> para manejo de variables de entorno
npm i @types/cors --save-dev
npm i @types/express --save-dev
npm i @types/morgan --save-dev
npm i @types/jsonwebtoken --save-dev
npm i @types/mongoose --save-dev

::::::::::::::::: Configuracion Typescript :::::::::::::::::

in terminal : npm i -g typescript
in Terminal : tsc -v
in Terminal : tsc --init

in (tsconfig.json) : "target" : "es2016",
in (tsconfig.json) : "outDir": "./build",
in (tsconfig.json) : "resolveJsonModule": true,

::::::::::::::::: Scripts :::::::::::::::::

in (package.json) in Scripts{} : "build": "tsc -w",
in (package.json) in Scripts{} : "dev": "nodemon build/index.js" 

para utilizarlos seria:

in Terminal : npm run build
in Terminal : npm run dev

::::::::::::::::: Folders Tree :::::::::::::::::

src
    app
        public
        private
        shared
    config
        api
        connection
.env
package.json
tsconfig.json
