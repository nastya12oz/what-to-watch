import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { TFilmSmallCards } from '../../types/films';
import FilmCardsList from '../../components/film-cards-list/film-cards-list';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import { useAppSelector } from '../../hooks/index';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GenresNamespace } from '../../const';
import Promo from '../../components/promo/promo';
import { getGenre } from '../../store/films-process/films-process.selectors';
import { resetDisplayFilmsCount, increaseDisplayFilmsCount } from '../../store/films-process/films-process.slice';
import { getDisplayedFilmsCount } from '../../store/films-process/films-process.selectors';

type WelcomeScreenProps = {
  filmsSmallCards: TFilmSmallCards;
  genres: string[];
}

function WelcomeScreen({filmsSmallCards, genres}: WelcomeScreenProps): JSX.Element {

  const currentGenre = useAppSelector(getGenre);
  const filmsByCurrentGenre = currentGenre === 'All genres' ? filmsSmallCards : filmsSmallCards.filter((filmItem) => filmItem.genre === GenresNamespace[currentGenre as keyof typeof GenresNamespace]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetDisplayFilmsCount());
  }, [dispatch]); //сбрасывает счетчик до 8 каждый раз когда возвращаюсь на WelcomeScreen


  const handleShowMoreButtonClick = () => {
    dispatch(increaseDisplayFilmsCount());
  };

  const displayedFilmsCount = useAppSelector(getDisplayedFilmsCount);
  const filmsShowed = filmsByCurrentGenre.slice(0, displayedFilmsCount);


  return(
    <>
      <section className="film-card">
        <Helmet>
          <title>WTW. Welcome!</title>
        </Helmet>

        <Header />

        <Promo />


      </section>
      <div className="page-content">

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList genres={genres} films={filmsSmallCards} />
          <FilmCardsList films={filmsShowed} />
        </section>

        {filmsByCurrentGenre.length > displayedFilmsCount ? <ShowMoreButton onShowMoreButtonClick={handleShowMoreButtonClick} /> : null}

        <Footer />
      </div>
    </>
  );
}

export default WelcomeScreen;
