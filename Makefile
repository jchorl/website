UID=$(shell id -u)
GID=$(shell id -g)
PROJECT_ID=gold-summer-17

serve:
	docker container run --rm -it \
		-v $(PWD):/website \
		-w /website \
		--net=host \
		golang:1.20.2 \
		go run .

pdfgenbuild:
	docker build -t jchorl/pdfgen -f pdfgen/Dockerfile.chrome ./pdfgen

pdfgen: pdfgenbuild ui
	docker run --init -it --rm \
		-v $(PWD)/ui/build:/out \
		jchorl/pdfgen

ui:
	docker container run --rm -it \
		-v $(PWD)/ui:/usr/src/app \
		-w /usr/src/app \
		node \
		npm run build
	docker container run --rm -it \
		-v $(PWD)/adminui:/usr/src/app \
		-w /usr/src/app \
		node \
		npm run build

ui-dev:
	docker container run --rm -it \
		-v $(PWD)/ui:/usr/src/app \
		-u $(UID):$(GID) \
		-w /usr/src/app \
		-p 3000:3000 \
		--net=host \
		node \
		npm start

adminui-dev:
	docker container run --rm -it \
		-v $(PWD)/adminui:/usr/src/app \
		-w /usr/src/app \
		-p 3000:3000 \
		--net=host \
		node \
		npm start

node:
	docker container run --rm -it \
		-v $(PWD):/usr/src/app \
		-w /usr/src/app \
		-u $(UID):$(GID) \
		node \
		bash

deploy:
	docker run -it --rm \
		-v $(PWD):/website \
		-w /website \
		--env=CLOUDSDK_CORE_PROJECT=$(PROJECT_ID) \
		-v websitecreds:/root/.config/gcloud/ \
		google/cloud-sdk:252.0.0 \
		sh -c "echo \"gcloud auth login\ngcloud app deploy\" && \
		bash"

prettier:
	docker run -it --rm \
		-v "$(PWD)"/ui:/usr/src/app \
		-w /usr/src/app \
		-u $(UID):$(GID) \
		node:latest \
		sh -c "node node_modules/prettier/bin-prettier.js --write src/**/*.js"

.PHONY: ui pdfgen
