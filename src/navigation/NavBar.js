import { useMediaQuery, useTheme } from '@mui/material';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';


const NavBar = ({logout}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    if (isMobile) {
        return <MobileNav logout={logout} />
    } else {
        return <DesktopNav logout={logout} />
    }
}

export default NavBar;
