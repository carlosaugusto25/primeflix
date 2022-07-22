import { useEffect, useState } from "react"
import api from "../../service";
import style from './style.module.scss';
import { Link } from 'react-router-dom'

export function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadData() {
        setLoading(true)
        const response = await api.get(`movie/now_playing`, {
            params: {
                api_key: '61029b078acf0d1a72872b3b179bd227',
                language: 'pt-BR',
                page: 1,
            }
        }).then(res => {
            setMovies(res.data.results.slice(0, 10))
            setLoading(false)
        })
    }

    useEffect(() => { loadData() }, [])

    return (
        <div className={style.container}>
            <div className={style.listaFilmes}>
                {
                    loading ?
                        <h2 className={style.loading}>Carregando filmes...</h2>
                        :
                        <>
                            {movies.map(filme => (
                                <article key={filme.id}>
                                    <strong>{filme.title}</strong>
                                    <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                    <Link to={`/filme/${filme.id}`} className={style.acessar} >Acessar</Link>
                                </article>
                            ))}
                        </>
                }
            </div>
        </div>
    )
}