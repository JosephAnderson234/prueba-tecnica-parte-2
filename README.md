# Parte 2, Prueba ténica AWS Serverless

## Orgnanización del proyecto
El proyecto está organizado de la siguiente manera:
- `functions/`: Contiene las funciones Lambda escritas en TypeScript.
- `serverless.yml`: Archivo de configuración de Serverless Framework.
- `tsconfig.json`: Configuración de TypeScript.
- `package.json`: Archivo de gestión de dependencias y scripts.
- `README.md`: Documentación del proyecto.
## Requisitos previos
Antes de comenzar, asegúrate de tener instalado:
- Node.js (versión 14 o superior)
- Serverless Framework (`npm install -g serverless`)
- AWS CLI configurado con tus credenciales.
## Instalación
1. Clona este repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```
2. Instala las dependencias:
    ```bash
    npm install
    ```
## Despliegue
Para desplegar la aplicación en AWS, ejecuta el siguiente comando:
```bash
serverless deploy
```
## Invocación de la función
Una vez desplegada, puedes invocar la función Lambda utilizando el siguiente comando:
```bash
sls invoke -f hello -l
```
## Notas
- Asegúrate de tener las políticas de IAM adecuadas para que Serverless Framework pueda crear y gestionar los recursos en AWS.
- Puedes modificar el archivo `serverless.yml` para ajustar la configuración según tus necesidades.
- Para más información sobre Serverless Framework, visita la [documentación oficial](https://www.serverless.com/framework/docs).