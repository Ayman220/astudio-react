import './App.css';
import UsersPage from './pages/Users';
import { UserDataProvider } from './context/UserDataContext';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ProductDataProvider } from './context/ProductDataContext';
import ProductsPage from './pages/Products';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { themeColor } from './constants/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: themeColor.blue,
    },
    success: {
      main: '#ff0000',
    },
    warning: {
      main: themeColor.yellow,
    },
    info: {
      main: themeColor.black,
    },
    secondary: {
      main: themeColor.grey,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => `
        h1 {
          color: ${themeParam.palette.info.main};
        },
        th {
          background-color: ${themeParam.palette.primary.main};
          border: 1px solid ${themeParam.palette.secondary.main};
        },
        td {
          padding: 0.5rem;
          border: 1px solid ${themeParam.palette.secondary.main};
        },
        tr:hover {
          background-color: ${themeParam.palette.secondary.main};
        }
      `,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/users",
        element:
          <UserDataProvider>
            <UsersPage />
          </UserDataProvider>,
      },
      {
        path: "/products",
        element:
          <ProductDataProvider>
            <ProductsPage />
          </ProductDataProvider>,
      },
    ]
  }
]);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
