#!/bin/bash

source ./config/config.sh
export PGPASSWORD=$PGPASSWORD

echo "Configuring db"

dropdb -U postgres dmhelper
createdb -U postgres dmhelper

psql -U postgres dmhelper < ./database/database.sql

echo "db configured"