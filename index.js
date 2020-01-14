//on va chercher le module express attaché à node
const express = require('express')
const app = express();

app.use(express.json());

//on créé une base de données en tableau pour faire des test
const courses = [
	{
		id: 1,
		name: 'course1'
	},
	{
		id: 2,
		name: 'course2'
	},
	{
		id: 3,
		name: 'course3'
	},
];

//affiche tout le contenu dans une chaine de caractère
app.get('/', (req, res) => {
	res.send('Hello World !');
});

//affiche tout le contenu dans un tableau
app.get('/api/courses', (req, res) => {
	res.send(courses);
});

app.post('/api/courses', (req, res) => {
	if (!req.body.name || req.body.name.length < 3) {
		// 400 bad request
		res.status(400).send('Name is required and should be minimum 3 characters.');
		return;
	}

	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
});

//anvoi la requête d'affichage tout le contenu en fonction de l'année et du mois dans l'url
//app.get('/api/posts/:year/:month', (req, res) => {
//	res.send(req.params);
//});

//affiche le contenu contenu dans une constante appelée courses
app.get('/api/courses/:id', (req, res) => {
	//on créé la constante course et on éclate les données de tableau en string
	const course = courses.find(c => c.id === parseInt(req.params.id));
	//si la donnée qu'on recherche de la constante est vide, alors on met une erreur 404 et un message d'erreur
	if (!course) res.status(404).send('The course with the given ID was not found.');
	//anvoi la requête d'affichage les données sur la page
	res.send(course);
});

// affiche tout le contenu trié par un paramètre précis (exemple : sortBy=name pour trier par nom)
//app.get('/api/posts/:year/:month', (req, res) => {
//	res.send(req.query);
//});


// PORT

// sélectionne le port du site ou défini de base celui-ci à 3000
const port = process.env.PORT || 3000;

// affiche dans la console le port du site
app.listen(port, () => console.log(`Listening on port ${port}...`));
