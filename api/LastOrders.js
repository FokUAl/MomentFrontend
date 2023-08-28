import {useEffect} from 'react';
import axios from 'axios';
import apis from '../constants/apis';

export default async function LastOrders() {
  //   const data = JSON.stringify({
  //       city_id: '150',
  //       job_id: '2F7F157A-CA65-40FE-AC06-4348DEEC7AB5',
  //       limit: '20',
  //       offset: '0',
  //       phone: '77022031818',
  //       stream_id: '1688392625881562',
  //       tocity_id: '6022',
  //       token: '05d6ef2bdd0d2a1977394bc1c66e5949',
  //       type: 'intercity',
  //   })

  const data =
    'city_id=150&job_id=2F7F157A-CA65-40FE-AC06-4348DEEC7AB5&limit=20&offset=0&phone=77022031818&stream_id=1688392625881562&tocity_id=6022&token=05d6ef2bdd0d2a1977394bc1c66e5949&type=intercity';

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: apis.lastOrders,
    headers: {
      'Content-Type': 'application/x-www/form-urlencoded',
      Connection: 'keep-alive',
      traceparent: '00-67c34c315f32473aa4e399a11b7e225d-9a0890859ec74bda-01',
      Accept: '*/*',
      'User-Agent': 'inDriver.ru/5.33.0 (iPhone; iOS 16.5.1; Scale/3.00)',
      'Accept-Language': 'en-KZ;q=1, ru-KZ;q=0.9',
      'Content-Length': '187',
    },
    data: data,
  };

  useEffect(() => {
    axios(config)
      .then(response => {
        console.log('axios response: ', response);
      })
      .catch(error => {
        console.log('axios error: ', error);
      });
  }, []);

  // const response = await fetch(
  //   'https://terra-6.indriverapp.com/api/GetLastOrders?v=2&locale=en_KZ&cid=150',
  //   {
  //     method: 'POST',
  //     headers: {
  //       Connection: 'keep-alive',
  //       traceparent: '00-67c34c315f32473aa4e399a11b7e225d-9a0890859ec74bda-01',
  //       Accept: '*/*',
  //       'User-Agent': 'inDriver.ru/5.33.0 (iPhone; iOS 16.5.1; Scale/3.00)',
  //       'Accept-Language': 'en-KZ;q=1, ru-KZ;q=0.9',
  //       'Content-Length': '187',
  //     },
  //     body: new URLSearchParams({
  //       city_id: '150',
  //       job_id: '2F7F157A-CA65-40FE-AC06-4348DEEC7AB5',
  //       limit: '20',
  //       offset: '0',
  //       phone: '77022031818',
  //       stream_id: '1688392625881562',
  //       tocity_id: '6022',
  //       token: '05d6ef2bdd0d2a1977394bc1c66e5949',
  //       type: 'intercity',
  //     }),
  //   }
  // );
  // console.log(await response.json())
}
