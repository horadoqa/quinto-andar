#!/bin/bash

while true; do
  npx playwright test
  echo "Execução finalizada. Aguardando 5 minutos..."
  sleep 300
done