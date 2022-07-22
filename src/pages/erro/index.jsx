import style from './style.module.scss';
import { Link } from 'react-router-dom';

export function Erro() {
    return (
        <div className={style.notFound}>
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <Link to='/' className={style.linkToHome}>Veja todos filmes!</Link>
        </div>
    )
}