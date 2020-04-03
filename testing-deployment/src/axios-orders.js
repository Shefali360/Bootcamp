import axios from 'axios';

const instance=axios.create({
    baseURL:'https://react-my-burger-f40af.firebaseio.com/'
});

export default instance;