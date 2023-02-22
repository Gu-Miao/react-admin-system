import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * Request
 * @param config config of request
 */
export default async function request(
  config: AxiosRequestConfig,
): Promise<[any] | [null, AxiosResponse]> {
  try {
    const res = await axios(config)
    return [null, res]
  } catch (err) {
    return [err]
  }
}
