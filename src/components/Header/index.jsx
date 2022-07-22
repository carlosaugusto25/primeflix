import { Link } from 'react-router-dom';
import style from './style.module.scss'

export function Header() {
    return(
        <header className={style.header}>
            <Link to='/' className={style.logo} >PrimeFlix</Link>
            <Link to='/favoritos' className={style.favoritos} >Meus filmes</Link>
        </header>
    )
}