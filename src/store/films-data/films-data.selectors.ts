import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { TFilmSmallCards } from '../../types/films';

export const getFilms = (state: State): TFilmSmallCards => state[NameSpace.Films].films;
export const getFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.Films].isFilmsDataLoading;
export const getSimilarFilms = (state: State): TFilmSmallCards => state[NameSpace.Films].similarFilms;
export const getSimilarFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.Films].isSimilarFilmsDataLoading;