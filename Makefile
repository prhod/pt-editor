start:
	docker-compose up --detach postgrest 

stop:
	docker-compose down --remove-orphan
	@docker network rm pt-editor_default 2> /dev/null

wipe:
	$(info Removing persistent data)
	@sudo rm -rf shared_volumes

scratch: stop wipe start ## Shortcut for stop + wipe + pull + start
	$(info Stack restarted from scratch)

build: ## Build local docker images 
	$(info Building local images)
	docker-compose build

help: ## Print this help message
	@grep -E '^[a-zA-Z_-]+:.*## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
