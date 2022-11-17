import './App.css';
import React from 'react';
import { Route, Routes, HashRouter, Outlet } from 'react-router-dom';

// Components
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/header/Header';
import Navigation from './components/navigation/Navigation';
import AlgorithmPage from './components/algorithmPage/AlgorithmPage';
import Category from './components/category/Category';
import Settings from './components/settings/Settings';

// Algorithm Objects
import categories from './components/algorithmList/Categories';
import algorithms from './components/algorithmList/Algorithms';

function App() {
	console.log('App.js');

	// Drawer setters
	const [open, setOpen] = React.useState(false);

	// Open or close drawer
	const toggleDrawer = (event) => {
		setOpen(!open);
	};

	// PageToggler: Set to true if you want to see them
	const [page, setPage] = React.useState('Dashboard');

	// Visualizer and Information page toggler
	const [algoPage, setAlgoPage] = React.useState('visualizer');

	React.useEffect(() => {
		// Storing primaryColor in localStorage
		if(!localStorage.getItem('primaryColor')){
			localStorage.setItem('primaryColor', '#FFFFFF')
		}
		if(!localStorage.getItem('primaryColorR')){
			localStorage.setItem('primaryColorR', '255')
		}
		if(!localStorage.getItem('primaryColorG')){
			localStorage.setItem('primaryColorG', '255')
		}
		if(!localStorage.getItem('primaryColorB')){
			localStorage.setItem('primaryColorB', '255')
		}
		// Storing secondaryColor in localStorage
		if(!localStorage.getItem('secondaryColor')){
			localStorage.setItem('secondaryColor', '#404243')
		}
		if(!localStorage.getItem('secondaryColorR')){
			localStorage.setItem('secondaryColorR', '64')
		}
		if(!localStorage.getItem('secondaryColorG')){
			localStorage.setItem('secondaryColorG', '66')
		}
		if(!localStorage.getItem('secondaryColorB')){
			localStorage.setItem('secondaryColorB', '67')
		}
		// Storing backgroundColor in localStorage
		if(!localStorage.getItem('backgroundColor')){
			localStorage.setItem('backgroundColor', '#000000')
		}
		if(!localStorage.getItem('backgroundColorR')){
			localStorage.setItem('backgroundColorR', '0')
		}
		if(!localStorage.getItem('backgroundColorG')){
			localStorage.setItem('backgroundColorG', '0')
		}
		if(!localStorage.getItem('backgroundColorB')){
			localStorage.setItem('backgroundColorB', '0')
		}
		// Storing cardColor in localStorage
		if(!localStorage.getItem('cardColor')){
			localStorage.setItem('cardColor', '#181818')
		}
		if(!localStorage.getItem('cardColorR')){
			localStorage.setItem('cardColorR', '24')
		}
		if(!localStorage.getItem('cardColorG')){
			localStorage.setItem('cardColorG', '24')
		}
		if(!localStorage.getItem('cardColorB')){
			localStorage.setItem('cardColorB', '24')
		}
		// Storing accentColor in localStorage
		if(!localStorage.getItem('accentColor')){
			localStorage.setItem('accentColor', '#FFC904')
		}
		if(!localStorage.getItem('accentColorR')){
			localStorage.setItem('accentColorR', '255')
		}
		if(!localStorage.getItem('accentColorG')){
			localStorage.setItem('accentColorG', '201')
		}
		if(!localStorage.getItem('accentColorB')){
			localStorage.setItem('accentColorB', '4')
		}
	});

	// Resize screen handlers
	const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
	React.useLayoutEffect(() => {
		// Records the width the screen in real-time
		const handleResize = () => {
			setViewWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	});

	return (
		<div className='App' style={{backgroundColor: localStorage.getItem('backgroundColor')}}>
			<HashRouter>
				<Navigation
					open={open}
					toggleDrawer={toggleDrawer}
					setPage={setPage}
					page={page}
					setAlgoPage={setAlgoPage}
					viewWidth={viewWidth}
					categories={categories}
					algorithms={algorithms}
				/>
				<div className='Main'>
					<Header
						toggleDrawer={toggleDrawer}
						page={page}
						setPage={setPage}
						setAlgoPage={setAlgoPage}
						algoPage={algoPage}
						viewWidth={viewWidth}
						algorithms={algorithms}
						categories={categories}
					/>
					<Routes>
						<Route element={'Page404'} />

						{/* Home page. Where you will see the Category Algorithm cards */}
						<Route
							exact={true}
							path='/'
							element={
								<Dashboard
									categories={categories}
									algorithms={algorithms}
									inCategory={false}
								/>
							}
						/>

						{/* Settings page. Where you will see the Color Picker for now */}
						<Route
							exact={true}
							path='/settings'
							element={
								<Settings/>
							}
						/>

						{categories.map((category) => (
							<Route
								exact={true}
								path={category.path}
								element={
									<Category
										inCategory={true}
										algorithms={algorithms[category.path]}
									/>
								}
							/>
						))}

						{/* Temporary Fix :( */}
						{/* TODO: V1 team needs to overhaul and refactor navigation system after V2 team is done.  */}
						{Object.keys(algorithms).map((key) =>
							algorithms[key].map((algorithm) => {
								return (
									<>
										<Route
											exact={true}
											path={algorithm.path}
											element={
												<AlgorithmPage
													path={algorithm.path}
													type={algorithm.type}
													algoPage={algoPage}
												/>
											}
										/>
										<Route
											exact={true}
											path={key + '/' + algorithm.path}
											element={
												<AlgorithmPage
													path={algorithm.path}
													type={algorithm.type}
													algoPage={algoPage}
												/>
											}
										/>
									</>
								);
							})
						)}
					</Routes>
				</div>
			</HashRouter>
		</div>
	);
}

export default App;