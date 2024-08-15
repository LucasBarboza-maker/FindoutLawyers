### Instruções de como rodar em modo desenvolvimento

- É necessário ter o **Redis 6>** instalado na máquina e rodando localmente. Se for o Windows, você pode instalar
através do Subsystem Linux, após instalado, é recomendável rodá-lo usando **sudo service redis start**.
- Tutorial para o Redis: https://www.youtube.com/watch?v=_nFwPTHOMIY
- É necessário ter o PostgresSQL instalado na máquina, o username e senha do banco de dados do sistema é 'postgres', username; 'admin', senha; você pode modificar no arquivo .env na pasta **prisma**.
- Para usar o banco de dados: https://prisma.io/
- Se for executar pela primeira vez em sua maquina, utilizar o comando **yarn migrate**
- Checar o arquivo **/server/config/stripe/index.ts**, se estiver no modo **DEV**, mudar as chaves para a **PUBLIC**
- Checar o arquivo **/server/config/stripe/index.ts**, **STRIPE_DOMAIN** para apontar para o **STRIPE_DOMAIN_LOCAL** se estiver em modo teste, em produção coloque o **STRIPE_DOMAIN_PROD**.
- Checar o arquivo **/server/config/stripe/index.ts**, **STRIPE_WEBOOK** para apontar para o **STRIPE_WEBOOK_DEV** se estiver em modo teste, em produção coloque o **STRIPE_WEBOOK_PROD**.


### Como acessar ao banco de dados através do programa, Beekeeper Studio

- Baixe o programa: https://www.beekeeperstudio.io/
- Instale e ao abrir clique no botão: **Import from URL**
- Copie a **URL** que está no arquivo **.env**, chamada **POSTGRESQL_URL** e cole no **Paste URL**. 
- Clique em **Import**
- Na nova janela, escolha um nome para o **Save Connection**, idealmente, **findoutlawyers** e clique em **Save**
- Depois de salvar, clique em **Connect**

### Como mudar o e-mail usado para enviar 

- No arquivo, nas variáveis: 
- **EMAIL_USER** esse é o e-mail do login, exemplo, se você criar um e-mail na GoDaddy, então o e-mail em si, será o **USER**
- **EMAIL_PASSWORD** essa é a senha do e-mail que você criou
- **EMAIL_SMTP_SERVER** esse é o dominio do servidor SMTP do e-mail que criou, exemplo, se for na GoDaddy, basta pesquisar no google "GoDaddy email SMTP", no caso o resultado será **smtpout.secureserver.net**
- **EMAIL_SMTP_PORT** essa é a porta de entrada do servidor SMTP do e-mail, ele vem junto com o **SMTP_SERVER**
- Link de exemplo: https://br.godaddy.com/help/usar-as-configuracoes-pop-para-adicionar-meu-workspace-email-a-um-cliente-de-email-4715
- É necessário também habilitar as configurações **POP** do e-mail
- **EMAIL_MAIN_ACCOUNT** recomendo não mexer nessa variável, aqui está o e-mail de login para a conta ADMIN do site

### Instruções de como atualizar a build em produção

- Ao realizar as mudanças necessárias, faça um arquivo **.zip** da pasta **api**, excluindo o **node_modules** e a pasta **.git**. É recomendável criar outra pasta com o nome **api** e só copiar os arquivos para lá.
- Utilize o programa **FileZilla** para acessar a VPS da Hostinger, os dados de acesso estão no arquivo **.env**. 
- Ao acessar no programa **FileZilla**, siga as pastas '..' -> 'var' -> 'www'. Lá você irá encontrar a pasta **api**. Coloque lá o arquivo **api.zip**, certificando que o mais atual e contem os arquivos da nova build. Após isso, feche.
- Acesse pelo terminal através de 'ssh' a VPS da Hostinger.
- ssh root@IP_DA_VPS
- senha
- Dentro do terminal, utilize:

```shell
cd /var/www
unzip api.zip
# Clique em 'A' para trocar tudo
cd api
# Se você modificou o banco de dados, utilize o comando
yarn migrate
# Para gerar a nova build:
pm2 delete api
rm -rf dist
yarn build
yarn run pm2:run
pm2 save
# para averiguar se está rodando ok
pm2 log api
# e saia
exit
# Opcionalmente você pode dar restart no nginx, mas não é recomendável
sudo systemctl restart nginx
sudo systemctl enable nginx
```
