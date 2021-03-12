#! /bin/bash

kubectl autoscale deployment udacity-books-web --name udacity-books-web-hpa --cpu-percent=50 --min=1 --max=2
