#!/bin/bash

source env.sh
tsc -p server/
# tsc -p client/script/
# gulp css
# gulp browserify

node build/server/app.js