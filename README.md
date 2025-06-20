# Lo-de-Miguelito
Este proyecto es una API REST desarrollada con Node.js y Express, diseñada para gestionar el flujo completo de un sistema de reservas y pedidos en un restaurante ficticio llamado "Lo de Miguel". Incluye autenticación mediante JWT, manejo de sesiones con cookies seguras, control de acceso por roles, y operaciones CRUD sobre clientes, pedidos y mesas. La API está pensada para ser utilizada desde Postman, permitiendo simular peticiones del cliente y probar todos los endpoints de manera sencilla.

# Integrantes
- Federico Greco
- Rocío Penalva

# Aclaración sobre Contributors del repositorio
Entre los contributors se encuentra otro usuario de github debido a que por accidente no configuramos correctamente una computadora del colegio y al hacer el push se hizo con el usuario que estaba configurado en esa computadora.

# Decisiones en el diseño
Entre las decisiones para el diseño podemos mencionar la funcionalidad de de que el cliente pueda cancelar su propia reserva, ya que esta no formaba parte de la consigna. 
Luego, otra decisión que está relacionada más con el diseño general que con algo en específico, es que en las funcionalidades a ser usadas por el cliente se suele intentar pedir la menor información posible e intentar "automatizar todo". Por ejemplo, en las funciones como cerrar sesión no sé pregunta qué usuario está cerrando sesión, o en cancelar la reserva no se pide al usuario qué mesa es de la que se va a cancelar la reserva, y cuando el el cliente quiere ver el estado de pedido, se obtienen todos sus pedidos y se muestran todos en lugar de preguntar qué pedido quiere.

# Compilar y correr el proyecto
Para poder compilarlo es necesario correr los siguientes comandos:
```bash
npm install
npm run db:generate
npm run dev
``` 

# Cómo importar las requests para testear con postman
Puede generar usted mismo los requests de la API con sus respectivos endpoints, pero se adjunta archivo de postman con todos los requests organizados y con ejemplos de uso (formatos de los distintos body) para su comodidad si prefiriera. Se debe importar el archivo "lo_de_miguel.postman_collection" desde la app de Postman.

# Usuario admin
En el archivo con las requests ya existe una request para iniciar sesión como administrador, para poderutilizar sus debidas funcionalidades, pero se agregan datos del usuario con rol de administrador por si fuera necesario:
- email: "fede@gmail.com"
- contraseña: "12345678"