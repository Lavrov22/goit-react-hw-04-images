const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '?key=29607752-b3abb9abc1baaf34c2e91fe2c';
const OPTIONS = 'image_type=photo&orientation=horizontal';
const perPage = 12;

export const fetchImagesApi = (query, page) => {
    const response = fetch(`${BASE_URL}${API_KEY}&q=${query}&${OPTIONS}&page=${page}&per_page=${perPage}`)
    return response;
};