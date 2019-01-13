serve:
	docker container run --rm -it \
		-v $(PWD):/website \
		-v $$GOPATH:/google-cloud-sdk/platform/google_appengine/gopath:ro \
		-w /website \
		-p 8080:8080 \
		--net=host \
		jchorl/appengine-go:latest \
		sh -c "go get ./... && dev_appserver.py --port=8080 --host=0.0.0.0 --admin_host=0.0.0.0 \$$(pwd)"

pdfgenbuild:
	docker build -t jchorl/pdfgen -f pdfgen/Dockerfile.chrome ./pdfgen

pdfgen: ui
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
		node \
		bash

deploy:
	docker container run --rm -it \
		-v $(PWD):/website \
		-v $$GOPATH:/usr/lib/google-cloud-sdk/platform/google_appengine/gopath:ro \
		-w /website \
		google/cloud-sdk \
		python /usr/lib/google-cloud-sdk/platform/google_appengine/appcfg.py -A gold-summer-17 --noauth_local_webserver update .

.PHONY: ui pdfgen
