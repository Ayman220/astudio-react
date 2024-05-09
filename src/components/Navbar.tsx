import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit"><Link to="/">Home</Link></Button>
                        <Button color="inherit"><Link to="/users">Users</Link></Button>
                        <Button color="inherit"><Link to="/products">products</Link></Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Outlet />
        </>
    )

}

export default Navbar;