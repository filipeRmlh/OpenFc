#!/bin/bash
# shellcheck disable=SC2068
set -e

disconnect() {
  kill "$1"
  echo "PID $1 DISCONNECTED"
}

connect() {
  openfortivpn $@ &
  last_command_pid=$!
  echo "COMMAND_PID=$last_command_pid"
  wait $last_command_pid
  exit_code=$?
  if [ -z "$exit_code" ] ; then
    exit 29
  fi ;
  exit $exit_code
}

action=$1
if [ "$action" == "connect" ]; then
  connect ${@: -1}
elif [ "$action" == "disconnect" ]; then
  disconnect ${@: -1}
else
  echo "INVALID_ACTION"
  exit 12
fi ;

