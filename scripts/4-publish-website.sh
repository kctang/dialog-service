#!/usr/bin/env bash
pushd dist/demo
surge . dialog-service.surge.sh
popd
