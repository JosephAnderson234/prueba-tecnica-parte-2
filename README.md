# Parte2 — Despliegue de la función y la tabla DynamoDB

Nota rápida: en `serverless.yml` la variable de entorno `TABLE_NAME` está definida como `${sls:stage}-t_todos`. Por convención, si despliegas al stage `dev` la tabla se llamará `dev-t_todos`.

---

Requisitos previos
- Una cuenta AWS con permisos para crear Lambdas, API Gateway y DynamoDB, o pedir a tu administrador que cree los recursos y te dé acceso.
- Node.js y npm si vas a empacar desde tu máquina.
-  Serverless Framework instalado globalmente si eliges esa ruta: `npm i -g serverless`.
- Credenciales IAM en maquina local

## Despliegue con Serverless Framework (único flujo)

Este README está escrito como si Serverless Framework fuera la única herramienta que vas a usar: aquí verás, en lenguaje claro y directo, cómo preparar el proyecto, desplegarlo y validar que la API y la tabla DynamoDB funcionan.

Contexto rápido: el `serverless.yml` del proyecto define `TABLE_NAME: ${sls:stage}-t_todos`. Si despliegas con `--stage dev`, la tabla resultante será `dev-t_todos`.

Prerequisitos
- Tener el AWS CLI configurado (`aws configure`) con credenciales que permitan crear recursos básicos (Lambda, API Gateway, DynamoDB). Si tu usuario no tiene permisos para crear roles (`iam:CreateRole`), el deploy puede fallar al intentar crear roles de observabilidad; ver "Notas sobre permisos" más abajo.
- Node.js y npm instalados.
- Serverless Framework instalado globalmente (opcional):
```powershell
npm i -g serverless
```

Preparar el proyecto
- Desde la raíz del repo, instala dependencias:
```powershell
npm install
```
- Confirma que `functions/todoHandler.js` existe (ya está incluido). El `handler` declarado en `serverless.yml` apunta a `functions/todoHandler.handler`.

Despliegue (paso a paso)
1. Revisa `serverless.yml`: asegúrate que la sección `provider.iam.role` apunte a un role válido (por ejemplo `arn:aws:iam::331315825646:role/LabRole`) o deja que Serverless cree el role si tu cuenta tiene permisos.
2. Abre una terminal en la raíz del proyecto. Compilar tus cambios (si los hiciste) a un archivo js: (saltatelo porque en dist ya tenemos el js)
```powershell
npm run build
```
3. Y ahora puedes exportar tus funciones a AWS con el deploy:
```powershell
sls deploy --stage dev
```

Qué esperar
- Serverless empaquetará la función, creará la tabla DynamoDB definida en `resources/dynamodb-tables.yml` (con el nombre `dev-t_todos`) y levantará el endpoint HTTP.
- Si ves errores relacionados con IAM (por ejemplo `iam:CreateRole` o errores de tagging), revisa la sección "Notas sobre permisos".

Probar
- Obtén las endpoints desplegadas (Serverless mostrará las urls tras el deploy). Prueba con curl:
```powershell
# GET todos
curl <API_URL>/todos

# POST crear todo
curl -X POST <API_URL>/todos -H "Content-Type: application/json" -d '{"titulo":"Tarea ejemplo"}'
```

Verificación en AWS
- Revisa la tabla en DynamoDB (debe aparecer `dev-t_todos`) y confirma que los items insertados desde POST quedan guardados.
- Revisa CloudWatch Logs para la función Lambda si algo falla.

Notas sobre permisos y Serverless Dashboard
- Si no quieres que Serverless trate de integrar con el Dashboard/Observability (que puede crear roles adicionales y fallar si no tienes `iam:CreateRole`), ya eliminamos `org` y `app` del `serverless.yml` en este repo para evitar esa creación automática.
- En caso de errores por permisos durante deploy, las soluciones son:
    - Pedir a tu administrador que añada `iam:CreateRole`, `iam:AttachRolePolicy`, `iam:PassRole` y permisos de tagging al usuario o role que uses; o
    - Mantener `org`/`app` fuera del `serverless.yml` (como está ahora) y usar un role existente con permisos adecuados (`provider.iam.role`).