#### link challenge
https://devcode.gethired.id/challenge/nodejs-api-todolist

#### run solution locally
- install docker and swarm first

- run in terminal:

$ docker network create --attachable --driver overlay --scope swarm skyshi-cluster

$ docker run --network skyshi-cluster --name skyshi-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD={ROOT_PASSWORD} -e MYSQL_USER={USER} -e MYSQL_PASSWORD={PASSWORD} -e MYSQL_DATABASE={DB} -d mysql:8.0

$ docker run -e MYSQL_HOST=skyshi-mysql -e MYSQL_USER={USER} -e MYSQL_PASSWORD={PASSWORD} -e MYSQL_DBNAME={DB} -p 3030:3030 --name skyshi_todo_list --network skyshi-cluster alrasyidlathif/skyshi-todo-list:1.0.7
