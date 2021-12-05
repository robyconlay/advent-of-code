#!/bin/bash

if [ $# -eq 0 ]; then
 echo "no arguments, you should pass a year e.g. <2021>"
 exit 1
fi

i=1
dir=$1
mkdir $dir
while [ $i -le 25 ] 
do
    if [[ ${#i} < 2 ]] 
    then
        mkdir $dir"\day0${i}"
        touch $dir"\day0${i}\solution.js"
    else
        mkdir $dir"\day${i}"
        touch $dir"\day${i}\solution.js"
    fi
    
    ((i++))
done