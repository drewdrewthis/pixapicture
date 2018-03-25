export const DATA_AVAILABLE = 'DATA_AVAILABLE';

const KEY = process.env.PIXABAY_KEY;

export const getData = query => (dispatch) => {
  /* eslint-disable no-console */
  if (!query) { return; }

  console.log('Searching for', query);

  fetch(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&per_page=100`)
    .then((response) => {
      if (response.status !== 200) {
        console.log('API_KEY', KEY);
        console.log('Looks like there was a problem. Status Code:', response.status);
        return;
      }

      response.json().then((data) => {
        console.log('Received data from Pixabay -', data.hits.length, 'images');
        dispatch({ type: DATA_AVAILABLE, payload: data });
      });
    })
    .catch((err) => {
      console.log('Fetch Error', err);
    });
  /* eslint-enable no-console */
};
