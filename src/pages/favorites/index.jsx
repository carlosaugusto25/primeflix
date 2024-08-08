import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.scss'
import { toast } from 'react-toastify';

export function Favorites() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeflix');
        setMovies(JSON.parse(minhaLista) || []);
    }, [])

    function handleDelete(id) {
        let filtroFilmes = movies.filter(item => {
            return item.id !== id
        })

        setMovies(filtroFilmes)
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
        toast.success('Filme removido com sucesso.')
    }

    return (
        <div className={style.meusFilmes}>
            <h1>Meus filmes</h1>

            {movies.length === 0 && <span>Você não possui filmes salvos ;(</span>}

            <ul>
                {movies.map(item => (
                    <li key={item.id}>
                        <span>{item.title}</span>

                        <div>
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button onClick={() => handleDelete(item.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}