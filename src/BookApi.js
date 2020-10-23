
import {useState, useEffect} from 'react';
import axios from 'axios';

/*
 * Abstracts away both needs for api calls,
 * on rendering and on events / conditions
 *
 * useBookApi, hook, default export
 * bookApi, normal function
 *
 */

/*
 * Useful for http data as a dependency in rendering
 *
 * @param method [string], http method
 * @param path [string], relative path to baseUrl
 * @param bodyData [object]
 * @return, Response Data
 *
 * Custom Hook: Eine Funktion die einen Hook oder einen anderen custom Hook aufruft (muss mit use beginnen)
*/
export default function useBookApi(method, path) {
  const [data, setData] = useState(null);

  useEffect(() => {
    bookApi(
      method,
      path,
      data => setData(data)
    )
  }, [method, path])

  return data;
}

/*
 * Useful for calls on events or in condition
 *
 * @param method [string], http method
 * @param path [string], relative path to baseUrl
 * @param data [function], callback, gets `response.data` as an argument
 * @param data [object], body data
*/
export function bookApi(method, path, callback, data = {}) {
  const baseUrl = 'https://api3.angular-buch.com/secure'

  axios({
    method: method,
    url: `${baseUrl}/${path}`,
    headers: {Authorization: 'Bearer 1234567890'},
    data
  }).then((response) => callback(response.data))
}
