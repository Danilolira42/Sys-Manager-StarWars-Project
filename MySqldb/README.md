Para rodar o banco pega o arquivo dump.sql dentro desta pasta e execute em seu MySql, ele criará todas as instâncias automaticamente. 

Caso queira resetar os INSERTS automáticos feitos dentro da table execute:

TRUNCATE TABLE sw_favorite_character

Caso queira apenas rodar a TABLE pegue em schema.sql nesta pasta e altere a connectionstring que se encontra dentro desta pasta em connection.sql para se conectar em sua instância do banco de dados.

Exemplo de inserção de dados na table sw_favorite_character:

character_id: "1", (String -> VARCHAR)
character_name: "Luke Skywalker", (String -> VARCHAR)
character_notes: "O melhor jedai", (String -> VARCHAR)
created_at:"2026-04-14T15:54:00Z" (OffSetDateTime -> DATETIME)