import PeoplePage from "../containers/PeoplePage";
import HomePage from "../containers/HomePage/HomePage";
import NotFoundPage from "../containers/NotFoundPage";
import PersonPage from "../containers/PersonPage/PersonPage";
import FavouritesPage from "../containers/FavouritesPage/FavouritesPage";
import SearchPeage from "../containers/SearchPeage";
import ErrorMessage from "../components/ErrorMessage";

const routesConfig = [
    {
        path: '/',
        exact: true,
        component: HomePage
    },
    {
        path: '/people',
        exact: true,
        component: PeoplePage
    },
    {
        path: '/people/:id',
        exact: false,
        component: PersonPage
    },
    {
        path: '/not-found',
        exact: true,
        component: NotFoundPage
    },
    {
        path: '/favourites',
        exact: true,
        component: FavouritesPage
    },
    {
        path: '/search',
        exact: true,
        component: SearchPeage
    },
    {
        path: '/fail',
        exact: true,
        component: ErrorMessage
    },
    {
        path: '*',
        exact: false,
        component: NotFoundPage
    }
];

export default routesConfig;