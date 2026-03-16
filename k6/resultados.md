# Verificando informações do site

```bash
curl -I https://www.quintoandar.com.br/
HTTP/2 200 
content-type: text/html; charset=utf-8
date: Mon, 16 Mar 2026 11:37:39 GMT
strict-transport-security: max-age=31536000;
x-content-type-options: nosniff
x-powered-by: Next.js
cache-control: max-age=7200, s-maxage=7200
link: <https://static.quintoandar.com.br>; rel=preconnect, <https://static.quintoandar.com.br>; rel=dns-prefetch, <https://cozy-assets.quintoandar.com.br>; rel=preconnect, <https://cozy-assets.quintoandar.com.br>; rel=dns-prefetch, <https://cdn-lib.quintoandar.com.br/cookie-banner/cookie-banner-importer.esm.js>; rel=preconnect, <https://cdn-lib.quintoandar.com.br/cookie-banner/cookie-banner-importer.esm.js>; rel=dns-prefetch, <https://cozy-assets.quintoandar.com.br/cozy-static/v3/latest/default/logo/QuintoAndar/default/complete.pt-BR.svg>; rel=preload; as="image", <https://cozy-assets.quintoandar.com.br/cozy-static/v3/latest/default/logo/QuintoAndar/inverse/complete.pt-BR.svg>; rel=preload; as="image"
x-envoy-upstream-service-time: 58
server: envoy
x-request-id: b7ab4df4-b124-94e4-aea5-e0571df15626
x-frame-options: deny
referrer-policy: no-referrer
x-download-options: noopen
x-dns-prefetch-control: off
content-security-policy: frame-ancestors none;
vary: Accept-Encoding
via: 1.1 7b1d047380f9924c2379d6400c8811da.cloudfront.net (CloudFront)
alt-svc: h3=":443"; ma=86400
age: 5349
set-cookie: 5ANNEX=null; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax
set-cookie: 5ANNEX=eyJ1dWlkIjoibVFBYlRHUUN2Z3g5cGc4VktTUG1NNHJwQmdYak9SLWJzTEFCdWhOOXFJTWxUVjNES28xUnRRIiwiZiI6W3siayI6InJjX2JlYWttYW5faGxzX2Rpc2FibGUiLCJ2Ijp0cnVlLCJ0IjoiciJ9LHsiayI6InJjX2JlYWttYW5fc2F2ZV9sZWFkX3YyX2VuYWJsZWQiLCJ2Ijp0cnVlLCJ0IjoiciJ9LHsiayI6ImFiX2JlYWttYW5fc2hvcnRfZGVzY3JpcHRpb25fZW5hYmxlZCIsInYiOjEsInQiOiJpIn0seyJrIjoiYWJfYmVha21hbl9zZWFyY2hfc2VydmljZXNfbG9jYXRpb25fZW1iZWRkaW5nX29uX2NnX2V4cGVyaW1lbnQiLCJ2IjoxLCJ0IjoiaSJ9XX0%3D; Path=/; Expires=Tue, 16 Mar 2027 13:06:48 GMT; SameSite=Lax; Domain=.quintoandar.com.br
x-bk-ab: 388/5
x-cache: Hit from cloudfront
x-amz-cf-pop: GIG51-P1
x-amz-cf-id: mQAbTGQCvgx9pg8VKSPmM4rpBgXjOR-bsLABuhN9qIMlTV3DKo1RtQ==

```


 █ TOTAL RESULTS 

    checks_total.......: 3635    24.048676/s
    checks_succeeded...: 100.00% 3635 out of 3635
    checks_failed......: 0.00%   0 out of 3635

    ✓ status was 200

    HTTP
    http_req_duration..............: avg=344.24ms min=86.46ms med=237.09ms max=4.35s p(90)=630.75ms p(95)=849.96ms
      { expected_response:true }...: avg=344.24ms min=86.46ms med=237.09ms max=4.35s p(90)=630.75ms p(95)=849.96ms
    http_req_failed................: 0.00%  0 out of 3635
    http_reqs......................: 3635   24.048676/s

    EXECUTION
    iteration_duration.............: avg=319.38ms min=88.37ms med=239.13ms max=3.07s p(90)=615.76ms p(95)=800.43ms
    iterations.....................: 3635   24.048676/s
    vus............................: 1      min=1         max=10
    vus_max........................: 10     min=10        max=10

    NETWORK
    data_received..................: 2.0 GB 13 MB/s
    data_sent......................: 2.7 MB 18 kB/s

---

 █ TOTAL RESULTS 

    checks_total.......: 3928    25.520112/s
    checks_succeeded...: 100.00% 3928 out of 3928
    checks_failed......: 0.00%   0 out of 3928

    ✓ status was 200

    HTTP
    http_req_duration..............: avg=2.37s min=94.52ms med=1.15s max=23.51s p(90)=5.82s p(95)=9.98s
      { expected_response:true }...: avg=2.37s min=94.52ms med=1.15s max=23.51s p(90)=5.82s p(95)=9.98s
    http_req_failed................: 0.00%  0 out of 3928
    http_reqs......................: 3928   25.520112/s

    EXECUTION
    iteration_duration.............: avg=2.21s min=96.07ms med=1.13s max=22.21s p(90)=5.25s p(95)=9.14s
    iterations.....................: 3928   25.520112/s
    vus............................: 5      min=2         max=100
    vus_max........................: 100    min=100       max=100

    NETWORK
    data_received..................: 2.1 GB 14 MB/s
    data_sent......................: 3.6 MB 24 kB/s

Verifiquei que com 400 VUS recebi corte do site

INFO[0180] [k6-reporter v3.0.4] Generating HTML summary report, with theme: default  source=console
     ✓ status was 200

     checks.........................: 100.00% ✓ 5318      ✗ 0   
     data_received..................: 2.9 GB  15 MB/s
     data_sent......................: 4.2 MB  21 kB/s
     http_req_blocked...............: avg=3.85ms   min=183ns    med=275ns    max=1.79s    p(90)=550ns    p(95)=734ns   
     http_req_connecting............: avg=1.97ms   min=0s       med=0s       max=1.28s    p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=918.22ms min=90.67ms  med=491.29ms max=10.83s   p(90)=2.4s     p(95)=3.45s   
       { expected_response:true }...: avg=918.22ms min=90.67ms  med=491.29ms max=10.83s   p(90)=2.4s     p(95)=3.45s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5318
     http_req_receiving.............: avg=604.7ms  min=581.35µs med=166.43ms max=10.22s   p(90)=1.8s     p(95)=2.82s   
     http_req_sending...............: avg=47.42µs  min=16.59µs  med=43.35µs  max=832.97µs p(90)=63.43µs  p(95)=74.35µs 
     http_req_tls_handshaking.......: avg=1.87ms   min=0s       med=0s       max=1.57s    p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=313.47ms min=54.63ms  med=245.33ms max=3.87s    p(90)=550.72ms p(95)=682.32ms
     http_reqs......................: 5318    27.003665/s
     iteration_duration.............: avg=850.97ms min=92.04ms  med=476.15ms max=9.67s    p(90)=2.09s    p(95)=3.12s   
     iterations.....................: 5318    27.003665/s
     vus............................: 1       min=1       max=50

running (3m16.9s), 00/50 VUs, 5318 complete and 0 interrupted iterations
default ✓ [======================================] 00/50 VUs  3m0s
