serve:
	docker container run --rm -it \
		-v $(PWD):/website \
		-w /website \
		-p 8080:8080 \
		--net=host \
		google/cloud-sdk \
		dev_appserver.py --host 0.0.0.0 .

ui:
	docker container run --rm -it \
		-v $(PWD)/ui:/usr/src/app \
		-w /usr/src/app \
		-p 3000:3000 \
		node \
		npm run build
	docker container run --rm -it \
		-v $(PWD)/adminui:/usr/src/app \
		-w /usr/src/app \
		-p 3000:3000 \
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
		-v $(PWD)/ui:/usr/src/app \
		-w /usr/src/app \
		node \
		bash

.PHONY: ui
