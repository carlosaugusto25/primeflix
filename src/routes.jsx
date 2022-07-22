import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Erro } from "./pages/erro";
import { Favorites } from "./pages/favorites";
import { Home } from "./pages/home";
import { Movie } from "./pages/movie";

export function RoutesApp() {
    return (
        <BrowserRouter >
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/filme/:id' element={<Movie />} />
                <Route path="/favoritos" element={<Favorites/>} />

                <Route path='*' element={<Erro />} />
            </Routes>
        </BrowserRouter>
    )
}