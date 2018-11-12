#!/bin/bash

release_serial()
{
  export BATCH=$1
  node release-serial-number.js
}

run_e2e()
{
  export JENKINS=true
  export CONF_PATH="/test-configs/$1"
  export BATCH=$1
  node request-serial-number.js
  wait
  protractor jenkins.conf.js
}

trap "kill 0" EXIT
trap "exit" SIGINT SIGTERM ERR

wait

echo "Running e2e in parallel";

(run_e2e batch1) &
(run_e2e batch2) &
(run_e2e batch3) &
(run_e2e batch4) &
(run_e2e batch5) &


echo "Parallel processes have started";

wait

release_serial batch1 &
release_serial batch2 &
release_serial batch3 &
release_serial batch4 &
release_serial batch5 &

wait

echo
echo "All processes have completed";