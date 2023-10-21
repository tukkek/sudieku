#!/usr/bin/bash
set -m

python3 -m http.server&
sleep 2
firefox --new-window localhost:8000&disown
fg
