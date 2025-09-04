import axios from 'axios';

export async function urlToBase64Url(url: string): Promise<string> {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  const base64 = Buffer.from(response.data as Buffer).toString('base64');
  return `data:image/jpeg;base64,${base64}`;
}
