import logo from './logo.svg';
import './App.css';
import { firebase } from './firebase';
import { useEffect, useState } from 'react';

function App() {
	const [ loading, setLoading ] = useState(false);
	const [ cities, setCities ] = useState([]);

	const createData = (city) => {
		const db = firebase.firestore();

		db
			.collection('cities')
			.add(city)
			.then((docRef) => {
				console.log('Document written with ID: ', docRef.id);
			})
			.catch((error) => {
				console.error('Error adding document: ', error);
			});
	};

	const readData = () => {
		const db = firebase.firestore();

		setLoading(true);

		db
			.collection('cities')
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, ' => ', doc.data());
				});

				setLoading(false);
			})
			.catch((error) => {
				console.log('Error getting documents: ', error);
			});
	};

	const deleteData = (idDoc) => {
		const db = firebase.firestore();

		db
			.collection('cities')
			.doc(idDoc)
			.delete()
			.then(() => {
				console.log('Document successfully deleted!');
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	};

	const updateData = () => {
		const db = firebase.firestore();
		db
			.collection('cities')
			.doc('ekKESFiMo0Mv8ZZuf1Qo')
			.update({
				name: 'Galicia'
			})
			.then(() => {
				console.log('Document successfully updated!');
			})
			.catch((error) => {
				// The document probably doesn't exist.
				console.error('Error updating document: ', error);
			});
	};

	const readAllData = () => {
		const db = firebase.firestore();

		db.collection('cities').onSnapshot((querySnapshot) => {
			var cities = [];
			querySnapshot.forEach((doc) => {
				let myCity = {
					id: doc.id,
					name: doc.data()['name'],
					country: doc.data()['country']
				};

				cities.push(myCity);
			});
			setCities(cities);
		});
	};

	// Esta función se llamará cuando se monte el componente
	useEffect(() => {
		// do something
		console.log('Se ha actualizado!');
		readAllData();
	}, []);

	const guardarDatos = (e) => {
		e.preventDefault();

		const newCity = { name: e.target.city.value, country: e.target.country.value };

		createData(newCity);

		e.target.reset();
	};

	return (
		<div className="App">
			<div className="container mt-4">
				<h1>Hola 🤯</h1>

				{loading ? <p>Cargando...</p> : null}

				<ul className="list-group mb-4">
					{cities.map((item, index) => (
						<li key={index} className="list-group-item">
							{item.name}, {item.country}
							<button onClick={() => deleteData(item.id)} type="button" className="btn btn-danger">
								Eliminar
							</button>
						</li>
					))}
				</ul>

				<button onClick={createData} type="button" className="btn btn-primary">
					Añadir datos
				</button>

				<button onClick={readData} type="button" className="btn ms-3 btn-primary">
					Leer datos
				</button>

				<button onClick={updateData} type="button" className="btn ms-3 btn-primary">
					Actualizar
				</button>

				<button onClick={deleteData} type="button" className="btn mt-4 btn-primary">
					Eliminar documento
				</button>
			</div>

			<div className="container mt-3">
				<h2>Formulario</h2>
				<form onSubmit={guardarDatos}>
					<input type="text" placeholder="Ingrese nombre ciudad" className="form-control mb-2" name="city" />
					<input type="text" placeholder="Ingrese pais" className="form-control mb-2" name="country" />
					<button className="btn btn-primary btn-block" type="submit">
						Agregar
					</button>
				</form>
			</div>
		</div>
	);
}

export default App;
