serve:
	docker run --rm -it \
		-v $(PWD):/website \
		-w /website \
		-p 8080:8080 \
		google/cloud-sdk \
		dev_appserver.py .

ui:
	docker run --rm -it \
		-v $(PWD)/ui:/usr/src/app \
		-w /usr/src/app \
		-p 3000:3000 \
		node \
		npm run build

ui-dev:
	docker run --rm -it \
		-v $(PWD)/ui:/usr/src/app \
		-w /usr/src/app \
		-p 3000:3000 \
		node \
		npm start

node:
	docker run --rm -it \
		-v $(PWD)/ui:/usr/src/app \
		-w /usr/src/app \
		node \
		bash

.PHONY: ui
