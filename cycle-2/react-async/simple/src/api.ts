import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

mock.onGet('list').reply(200, [
  {id: 1, title: '1'},
  {id: 2, title: '2'},
  {id: 3, title: '3'},
  {id: 4, title: '4'},
  {id: 5, title: '5'},
  {id: 6, title: '6'},
  {id: 7, title: '7'},
  {id: 8, title: '8'},
  {id: 9, title: '9'}
])
