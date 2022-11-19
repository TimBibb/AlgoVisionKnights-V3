import './Header.css';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

// Assets
import queries from './queries';
import Switch from "./Switch";
import UCF from './UCF_logo.png';

// Child Components
import MenuToggle from '../menu/MenuToggle';
//import Download from '../download/Download';

// Material UI
import {
	AppBar,
	Button,
	Toolbar,
	IconButton,
	Typography,
	InputBase,
	ListItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { BiSearch } from "react-icons/bi";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Device detection modules. Use for Desktop downloadable
// import { isMobile, isElectron, isTablet } from 'react-device-detect';

import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	inputIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		zIndex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		width: '100%',
	},
}));

function Header({
	toggleDrawer,
	algoPage,
	setAlgoPage,
	viewWidth,
	algorithms,
	categories,
}) {
	const classes = useStyles();

	const [search, setSearch] = React.useState(false);
	React.useEffect(() => {
		const checkSize = () => {
			if (viewWidth > 650) {
				setSearch(false);
			}
		};

		checkSize();
	});

	// Toggles mobile search
	const toggleSearch = () => {
		setSearch(!search);
	};

	const [focused, setFocused] = React.useState(false);
	const handleFocus = () => {
		setFocused(true);
	};
	const handleBlur = () => {
		setFocused(false);
	};

	const [filteredData, setFilterData] = React.useState(queries);
	const handleSearch = (event) => {
		let value = event.target.value.toLowerCase();

		handleFocus();

		console.log(value);

		let result = queries.filter((data) => {
			return (
				data.name.toLowerCase().search(value) !== -1 ||
				data.path.toLowerCase().search(value) !== -1
			);
		});

		setFilterData(result);
	};

	const [value, setValue] = React.useState(false);

	// NOTE: For V1 only
	// Check which device the user in on.
	//const renderDownload = () => {
	//	if (isElectron || isMobile || isTablet) {
	//		return null;
	//	} else {
	//		return <Download />;
	//	}
	//};

	return (
		<div className='Header'>
			<AppBar id='header-bar' elevation={0}>
				<Toolbar id='toolbar'>
					<div className='MenuTools'>
						{viewWidth > 650 || !search ? (
							<div className='LeftMenus'>
								<IconButton onClick={toggleDrawer}>
									<MenuIcon id='menu-icon' />
								</IconButton>

								<Routes>
									<Route
										exact={true}
										path='/'
										element={
											<Typography id='header-title'>
												Dashboard
											</Typography>
										}
									/>

									<Route
										exact={true}
										path='/settings'
										element={
											<Typography id='header-title'>
												Settings
											</Typography>
										}
									/>

									{categories.map((category) => (
										<Route
											exact={true}
											path={'/' + category.path}
											element={
												<Typography id='header-title'>
													{category.title}
												</Typography>
											}
										/>
									))}

									{Object.keys(algorithms).map((key) =>
										algorithms[key].map((algorithm) => (
											<>
												<Route
													exact={true}
													path={'/' + algorithm.path}
													element={
														<Typography id='header-title'>
															{algorithm.name}
														</Typography>
													}
												/>
												<Route
													exact={true}
													path={
														'/' +
														key +
														'/' +
														algorithm.path
													}
													element={
														<Typography id='header-title'>
															{algorithm.name}
														</Typography>
													}
												/>
											</>
										))
									)}
								</Routes>
							</div>
						) : null}

						{viewWidth > 650 || search ? (
							<div id='search-input' className={classes.search}>
								{viewWidth > 650 ? (
									<BiSearch
									style={{paddingLeft: '10px',
										height: '100%',
										position: 'absolute',
										zIndex: 1,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'}}
									size={35}/>
									// <SearchIcon
									// 	id='input-icon'
									// 	className={classes.inputIcon}
									// />
								) : (
									<IconButton
										id='input-icon'
										className={classes.inputIcon}
										onClick={toggleSearch}>
										<ArrowBackIcon />
									</IconButton>
								)}
								<InputBase
									placeholder='Search...'
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									onChange={(event) => handleSearch(event)}
									onFocus={handleFocus}
									onBlur={handleBlur}
								/>

								{focused ? (
									<div className='Results'>
										{filteredData.map((value, i) => (
											<Link
												className='Link'
												to={value.path}
												onMouseDown={(event) =>
													event.preventDefault()
												}>
												<ListItem
													id='result-item'
													key={i}>
													<Button
														id='result-button'
														onClick={handleBlur}>
														{value.name}
													</Button>
												</ListItem>
											</Link>
										))}
									</div>
								) : null}
							</div>
						) : (
							<div className='SearchInputMobile'>
								<IconButton
									id='search-button-mobile'
									onClick={toggleSearch}>
									<SearchIcon id='search-icon-mobile' />
								</IconButton>
							</div>
						)}
					</div>
					
					<div className='RightMenus'>
						{/* <div style={{marginRight: '5px'}}>
							<h3>ColorBlind Mode</h3>
						</div>
						<div style={{marginRight: '50px'}} className='RightMenus'>
							<Switch
								isOn={value}
								onColor="#FFC904"
								handleToggle={() => setValue(!value)}
							/>
						</div> */}
						<Link to="/settings">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-gear" viewBox="0 0 16 16">
						<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
						<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
						</svg>
						</Link>
						<a href="https://www.cs.ucf.edu/" target="_blank" rel="noreferrer">
							<img src={UCF} alt="UCF Logo" hr height={45} width={65}></img>
						</a>
					</div>

					{/* Right Menus removed by the new More Information button at the bottom */}
					{/* <div className='RightMenus'>
						<Routes>
							{Object.keys(algorithms).map((key) =>
								algorithms[key].map((algorithm) => (
									<>
										<Route
											exact={true}
											path={'/' + algorithm.path}
											element={
												<MenuToggle
													setAlgoPage={setAlgoPage}
													algoPage={algoPage}
													viewWidth={viewWidth}
												/>
											}
										/>
										<Route
										exact={true}
										path={'/' + key + '/' + algorithm.path}
										element={
												<MenuToggle
													setAlgoPage={setAlgoPage}
													algoPage={algoPage}
													viewWidth={viewWidth}
												/>
										}
								/>
									</>
								))
							)}
						</Routes>
					</div> */}
				</Toolbar>
			</AppBar>
			<hr className='hr-color'></hr>
		</div>
	);
}

export default Header;