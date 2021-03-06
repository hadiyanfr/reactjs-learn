import { getCollectionApi } from '../../shared/baseApi'
import * as actionTypes from './actionTypes';

export const moviesStart = () => ({
    type: actionTypes.MOVIE_START
});

export const moviesSuccess = (data, page) => ({
    type: actionTypes.MOVIE_SUCCESS,
    data, page
});

export const moviesFail = (error) => ({
    type: actionTypes.MOVIE_FAIL,
    error,
});

export const fetchMovies = ({
    ...query
}) => async (dispatch) => {
    dispatch(moviesStart());
    await getCollectionApi('/movies', {
        ...query
    })
    .then((res) => {
        const data = {
            ...res.data,
        };
        dispatch(moviesSuccess(data, query.page));
    })
    .catch((err) => {
        dispatch(
            moviesFail(
                err?.response?.data?.message || 'Sedang terjadi masalah pada server'
            )
        );
    });
}