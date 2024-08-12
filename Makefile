# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

# Copyright 2024 Brianna Bennett <brie@zonename.org>

.PHONY: all
all: node_modules smf.xml

install: smf.xml node_modules
	svccfg import smf.xml

smf.xml: smf.json node_modules
	json -f $< -e "this.start.exec=\"${PWD}/server.js\"" | ./node_modules/smfgen/smfgen > $@

node_modules: package.json
	npm install --progress=false
	@touch node_modules

clean:
	rm -r smf.xml node_modules
