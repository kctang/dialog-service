#!/usr/bin/env bash
rm -fr dist
ng build dialog-service --prod
ng build --prod
