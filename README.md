# PracticaFundamentosReact
Práctica de fundamentos de REACT

Alumno: @XaviRoca (ABR23)


## Prerequisitos

### Backend: **nodepop-api**

* Instalación 
```
git clone https://github.com/davidjj76/nodepop-api
cd nodepop-api
npm install
``` 
Añadir nodepop-api en el fichero .gitignore

* Ejecución

```
npm start
```

* Swagger --> http://localhost:3001/swagger

**NOTA:** En el repositorio hay una carperta nodepop-api que contiene únicamente la data: ./data y ./uploads, por si se quiere tener un juego de pruebas.

Usuario: xroca@vilamatica.com / 1234

### Librerias necesarias

* **AXIOS** --> npm install axios
* **ROUTER** --> npm install react-router-dom
* **classnames** --> npm install classnames
* **styled-components** --> npm install --save styled-components
### Plug-in VSC

* **Prettier** - Code formatter

### Extensiones browser

* Chrome: **React Developer Tools**
* Firefox: **React Developer Tools**

## Comentarios sobre la práctica

* Se ha asegurado el funcionamiento de todos los requisitos de la práctica, pero sin demasiadas florituras.
* La maquetación no está bien trabajada, por falta de tiempo
* Hay funcionalidades que se cumplen , pero creo que no estan demasiado bien programadas. Por ejemplo useEffect() de AdvertsPage
```js
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      
      try {
        // en teoría aquí se deberían recuperar los anuncios
        const adverts = await getLatestAdverts();
        //...
      } catch (error) {
        if (error.status === 401) {
          navigate('/login');       
        } 
      }
      
      // si no hago esta segunda llamada no me recupera los anuncios
      const adverts = await getLatestAdverts();
      // ...
      setAdverts(adverts);
      setIsLoading(false);
    }

      fetchData();

  }, []);
```
* En general me ha servido mucho para entender la filosofía REACT. Las clases estan muy bien pero no se retiene conocimiento. Es necesario tener que pelearse unas horas con el código.






