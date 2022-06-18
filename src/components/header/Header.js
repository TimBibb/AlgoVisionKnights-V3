import './Header.css';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

// Assets
import queries from './queries';

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
									<SearchIcon
										id='input-icon'
										className={classes.inputIcon}
									/>
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
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Header;
