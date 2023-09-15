import { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AuthorizationStatus } from '../../const';

type HeaderSignInProps = {
  isSignInPage: boolean;
  isAuthorized: boolean;
}

type HeaderProps = {
  backgroundImage?: string;
};

const authorizationStatus = AuthorizationStatus.Auth;

function HeaderSignAction({isSignInPage, isAuthorized}: HeaderSignInProps): JSX.Element {
  if(isSignInPage) {
    return (
      <h1 className="page-title user-page__title">Sign in</h1>
    );
  }

  return isAuthorized ? (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link">Sign out</a>
      </li>
    </ul>
  ) : (
    <div className='user-block'>
      <Link to={AppRoute.SignIn} className='user-block__link'>Sign In</Link>
    </div>
  );
}

function Header({children, backgroundImage}: PropsWithChildren<HeaderProps>): JSX.Element {
  const {pathname} = useLocation();
  const isIndexPage = pathname === AppRoute.Root;
  const isSignInPage = pathname === AppRoute.SignIn;
  const isFilmPage = pathname.split('/')[1] === AppRoute.Film.split('/')[1];
  const isMyListPage = pathname === AppRoute.MyList;

  return(
    <>
      {backgroundImage ?
        <>
          <div className="film-card__bg">
            <img src={backgroundImage} alt="The Grand Budapest Hotel" />
          </div>
          <h1 className="visually-hidden">WTW</h1>
        </>
        : null }

      <header className={`page-header ${ isIndexPage || isFilmPage ? 'film-card__head' : ''} ${isSignInPage || isMyListPage ? 'user-page__head' : ''}`}>

        <div className="logo">
          {
            isIndexPage ? (
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            )
              : (
                <Link to={AppRoute.Root} className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </Link>
              )
          }
        </div>

        { children ? children : null }
        <HeaderSignAction isAuthorized={authorizationStatus === AuthorizationStatus.Auth} isSignInPage={isSignInPage} />


      </header>
    </>
  );
}

export default Header;
