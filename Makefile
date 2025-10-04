.PHONY: up
up:
	docker compose up --build

test-cross-service-conn:
	curl http://localhost:8001/web-api-server
	@echo "\n"
	@echo "\n"
	curl http://localhost:8000/ai-model-wrapper


