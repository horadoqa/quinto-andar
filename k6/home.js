import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const BASE_URL = 'https://www.quintoandar.com.br/';

// Aumentando gradualmente o número de usuários virtuais para simular um aumento de tráfego no site
export const options = {
    stages: [
      { duration: '30s', target: 10 },
      { duration: '30s', target: 20 },
      { duration: '30s', target: 30 },
      { duration: '30s', target: 40 }, // Corte do site
      { duration: '30s', target: 50 },
      { duration: '30s', target: 0 },
    ],
  
  };

export default function () {
    const res = http.get(BASE_URL);
    check(res, { 'status was 200': (r) => r.status == 200 });
    console.log('Response time was ' + String(res.timings.duration) + ' ms');
    console.log('Response size: ' + String(res.body.length) + ' bytes');
    console.log('Status code was ' + String(res.status));
    // console.log('URL: ' + String(res.url));
    // console.log('Protocol: ' + String(res.proto));
    // console.log('Quantiidade de Vus: ' + String(__VU));
    console.log('-----------------------------------');

};

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
