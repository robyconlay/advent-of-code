#!/bin/bash

if [ $# -eq 0 ]; then
 echo "no arguments, you should pass a year e.g. <2021>"
 read 
 exit 1
fi

i=0
dir=$1
while [ $i -le 25 ] 
do
    mkdir $dir"\day${i}"
    touch $dir"\day${i}\solution.js"
    ((i++))
    #let i=i+1
done

read 
