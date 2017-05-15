serve:
	docker container run --rm -it \
		-v $(PWD):/website \
		-v $$GOPATH:/google-cloud-sdk/platform/google_appengine/gopath:ro \
		-w /website \
		-p 8080:8080 \
		--net=host \
		google/cloud-sdk \
		dev_appserver.py --host 0.0.0.0 .

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
		-v $$GOPATH:/google-cloud-sdk/platform/google_appengine/gopath:ro \
		-w /website \
		google/cloud-sdk \
		/google-cloud-sdk/platform/google_appengine/appcfg.py -A gold-summer-17 --noauth_local_webserver update .

certs:
	# openssl rsa -in letsencrypt/etc/archive/joshchorlton.com-0001/privkey2.pem > letsencrypt/etc/archive/joshchorlton.com-0001/privkey-rsa2.pem
	docker container run -it --rm \
		--name certbot \
		-v /home/j/Documents/Programming/website4.0/letsencrypt/etc:/etc/letsencrypt \
		-v /home/j/Documents/Programming/website4.0/letsencrypt/varlib:/var/lib/letsencrypt \
		quay.io/letsencrypt/letsencrypt:latest \
		certonly --agree-tos --keep --expand --manual --preferred-challenges=http -d www.joshchorlton.com -d joshchorlton.com --email=josh@joshchorlton.com

.PHONY: ui
