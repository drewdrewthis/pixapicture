/* eslint-disable no-console */
export const UPDATE_RESULTS = 'UPDATE_RESULTS';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const UPDATE_PAGES = 'UPDATE_PAGES';

const KEY = process.env.PIXABAY_KEY;

export const getData = () => (dispatch, getState) => {
  const {
    query,
    images: currentImages,
    pages: oldPages,
    totalResults,
  } = getState().appReducer;

  const remainingImages = totalResults - currentImages.length;
  console.log('Remaining Images:', remainingImages);

  if (remainingImages <= 0) { return; }

  const pages = oldPages + 1;

  console.log('Updating images. Page:', pages);

  fetch(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&per_page=200&page=${pages}`)
    .then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code:', response.status, response._bodyText);
        console.log('URL:', response.url);
        return;
      }

      response.json().then((data) => {
        console.log('Received data from Pixabay -', data.hits.length, 'new images.');

        dispatch({
          type: UPDATE_RESULTS,
          payload: {
            ...data,
            pages,
            images: currentImages.concat(data.hits),
          },
        });
      });
    })
    .catch((err) => {
      console.log('Fetch Error', err);
    });
};

export const updateQuery = query => (dispatch) => {
  if (!query) { return; }

  dispatch({ type: UPDATE_QUERY, payload: query });

  console.log('Searching for', query);

  fetch(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&per_page=200`)
    .then((response) => {
      if (response.status !== 200) {
        console.log('API_KEY', KEY);
        console.log('Looks like there was a problem. Status Code:', response.status);
        return;
      }

      response.json().then((data) => {
        console.log('Received data from Pixabay -', data.hits.length, 'images of ', data.total);
        dispatch({
          type: UPDATE_RESULTS,
          payload: {
            images: data.hits,
            totalResults: data.total,
            pages: 1,
          },
        });
      });
    })
    .catch((err) => {
      console.log('Fetch Error', err);
    });
};
/* eslint-enable no-console */
