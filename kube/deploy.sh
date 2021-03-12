#! /bin/bash

kubectl apply -f ./kube
./kube/deploy-config.sh
./kube/deploy-autoscale.sh
