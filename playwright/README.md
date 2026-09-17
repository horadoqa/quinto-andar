mkdir quintoandar-playwright
cd quintoandar-playwright

npm init -y

npm install -D @playwright/test

npx playwright install

npx playwright codegen https://proprietario.quintoandar.com.br/anunciar-imovel
