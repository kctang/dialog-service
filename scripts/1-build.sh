#!/usr/bin/env bash
rm -fr dist
ng build dialog-service
ng build --prod
