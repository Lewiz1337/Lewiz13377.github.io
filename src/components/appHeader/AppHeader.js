import './appHeader.scss';

const AppHeader = () => {
    return(
        <header>
            <h1 className='headerText'><span className='colorRed'>Marvel</span> information portal</h1>
            <nav className = 'appMenu'> 
                <ul className = 'appMenuList'>
                    <li> <a tabIndex={0} href = "" type = 'button' className='colorRed'>Characters </a></li>
                    <li>/</li>
                    <li><a tabIndex={0} href = "" type = 'button' >Comics </a></li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;