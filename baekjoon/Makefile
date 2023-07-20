run:
	@image_count=$$(docker images node | wc -l); \
	if [ "$$image_count" -eq 1 ]; then \
		docker build -t node .; \
	fi
	docker run -it --name node -v ${PWD}:/tmp node /bin/bash

start:
	docker start node
	docker exec -it node bash

fclean:
	docker stop node
	docker rm node

re:
	make fclean
	make run