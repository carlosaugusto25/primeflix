import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import style from './style.module.scss'
import api from '../../service'
import { toast } from 'react-toastify';

export function Movie() {

    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function loadData() {
        setLoading(true)
        await api.get(`/movie/${id}`, {
            params: {
                api_key: '61029b078acf0d1a72872b3b179bd227',
                language: 'pt-BR'
            }
        }).then(res => {
            console.log(res.data)
            setMovie(res.data)
            setLoading(false)
        }).catch(() => {
            console.log('filme não encontrado')
            navigate('/',{replace:true})
            setLoading(false)
            return;
        })

    }

    useEffect(() => { loadData() }, [])

    function handleSaveMovie(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === movie.id)

        if(hasFilme){
            toast.warn('Esse filme já está na lista')
            return
        }

        filmesSalvos.push(movie);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso')
    }

    return (
        <div className={style.container}>
            {
                loading ? 
                <div className={style.movieLoading}>
                    <h2>Carregando filme...</h2>
                </div>
                :
                <div className={style.movieInfo}>
                    <h1>{movie.title}</h1>
                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
                    <h3>Sinopse:</h3>
                    <span>{movie.overview}</span>
                    <strong>Avaliação: {movie.vote_average} / 10</strong>

                    <div className={style.areaButtons} >
                        <button onClick={handleSaveMovie}>Salvar</button>
                        <button>
                            <a target='_blank' rel='external' href={`https://youtube.com/results?search_query=${movie.title} trailer`}>Trailer</a>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}