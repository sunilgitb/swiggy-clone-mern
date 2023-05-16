import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';

const AppLayout = () => {
	return (
		<Provider store={store}>
			<Header />
			<Outlet />
			<Footer />
		</Provider>
	);
};

const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={appRouter} />;
};
export default App;
