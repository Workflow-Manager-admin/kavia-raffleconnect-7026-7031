#!/bin/bash
cd /home/kavia/workspace/code-generation/kavia-raffleconnect-7026-7031/main_container_for_kavia_raffleconnect
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

