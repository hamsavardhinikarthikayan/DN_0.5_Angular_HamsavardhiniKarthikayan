2. Docker
What is Docker?

Docker is a containerization platform used to package an application along with its dependencies so it runs the same everywhere.
Docker Image

A read-only blueprint.

Docker Container

A running instance of an image.

Docker Basic Commands
Check Docker Version
docker --version
Check Running Containers
docker ps
Check All Containers
docker ps -a
List Images
docker images
Pull Image
docker pull nginx

Downloads an image from Docker Hub.

Run Container
docker run nginx
Run Container in Background
docker run -d nginx
Run with Port Mapping
docker run -p 8080:80 nginx

Host Port → Container Port

Stop Container
docker stop <container_id>
Start Container
docker start <container_id>
Restart Container
docker restart <container_id>
Remove Container
docker rm <container_id>
Remove Image
docker rmi <image_name>
View Logs
docker logs <container_id>
Execute Inside Container
docker exec -it <container_id> bash
Build Docker Image
docker build -t myapp .
Docker Compose
docker compose up
Starts all services defined in docker-compose.yml.
