#!/bin/sh
#SBATCH --time=00:30:00
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=8
#SBATCH --job init_calibration

experiment_id=$1
JULIA_NUM_PRECOMPILE_TASKS=8

echo "Initializing calibration for experiment: $experiment_id"

julia --color=no --project=experiments/$experiment_id -e '
    using Pkg; Pkg.instantiate(;verbose=true)
'

if [ "$generate_data" = true ] ; then
    echo "Generating observations"
    julia --project=experiments/$experiment_id experiments/$experiment_id/generate_truth.jl
fi

julia --color=no --project=experiments/$experiment_id -e '
    import CalibrateAtmos
    CalibrateAtmos.initialize("'$experiment_id'")
'

echo "Calibration initialized"
