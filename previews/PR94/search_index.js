var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/#Model-Interface","page":"API","title":"Model Interface","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"ClimaCalibrate.set_up_forward_model\nClimaCalibrate.run_forward_model\nClimaCalibrate.observation_map","category":"page"},{"location":"api/#ClimaCalibrate.set_up_forward_model","page":"API","title":"ClimaCalibrate.set_up_forward_model","text":"set_up_forward_model(member, iteration, experiment_dir::AbstractString)\nset_up_forward_model(member, iteration, experiment_config::ExperimentConfig)\n\nSet up and configure a single member's forward model. Used in conjunction with run_forward_model.\n\nThis function must be overriden by a component's model interface and  should set things like the parameter path and other member-specific settings.\n\n\n\n\n\n","category":"function"},{"location":"api/#ClimaCalibrate.run_forward_model","page":"API","title":"ClimaCalibrate.run_forward_model","text":"run_forward_model(model_config)\n\nExecute the forward model simulation with the given configuration.\n\nThis function should be overridden with model-specific implementation details. config should be obtained from set_up_forward_model: run_forward_model(set_up_forward_model(member, iter, experiment_dir))\n\n\n\n\n\n","category":"function"},{"location":"api/#ClimaCalibrate.observation_map","page":"API","title":"ClimaCalibrate.observation_map","text":"observation_map(iteration)\n\nRuns the observation map for the specified iteration. This function must be implemented for each calibration experiment.\n\n\n\n\n\n","category":"function"},{"location":"api/#Backend-Interface","page":"API","title":"Backend Interface","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"ClimaCalibrate.calibrate\nClimaCalibrate.sbatch_model_run","category":"page"},{"location":"api/#ClimaCalibrate.calibrate","page":"API","title":"ClimaCalibrate.calibrate","text":"calibrate(::Type{JuliaBackend}, config::ExperimentConfig)\ncalibrate(::Type{JuliaBackend}, experiment_dir::AbstractString)\n\nRun a calibration in Julia.\n\nTakes an ExperimentConfig or an experiment folder. If no backend is passed, one is chosen via get_backend.  This function is intended for use in a larger workflow, assuming that all needed  model interface and observation map functions are set up for the calibration.\n\nExample\n\nRun: julia --project=experiments/surface_fluxes_perfect_model\n\nimport ClimaCalibrate\n\n# Generate observational data and load interface\nexperiment_dir = dirname(Base.active_project())\ninclude(joinpath(experiment_dir, \"generate_data.jl\"))\ninclude(joinpath(experiment_dir, \"observation_map.jl\"))\ninclude(joinpath(experiment_dir, \"model_interface.jl\"))\n\n# Initialize and run the calibration\neki = ClimaCalibrate.calibrate(experiment_dir)\n\n\n\n\n\ncalibrate(::Type{SlurmBackend}, config::ExperimentConfig; kwargs...)\ncalibrate(::Type{SlurmBackend}, experiment_dir; kwargs...)\n\nRun a full calibration, scheduling the forward model runs on Caltech's HPC cluster.\n\nTakes either an ExperimentConfig or an experiment folder.\n\nKeyword Arguments\n\n`experiment_dir: Directory containing experiment configurations.\n`model_interface: Path to the model interface file.\nslurm_kwargs: Dictionary of slurm arguments, passed through to sbatch.\nverbose::Bool: Enable verbose output for debugging.\n\nUsage\n\nOpen julia: julia --project=experiments/surface_fluxes_perfect_model\n\nimport ClimaCalibrate: CaltechHPCBackend, calibrate\n\nexperiment_dir = dirname(Base.active_project())\nmodel_interface = joinpath(experiment_dir, \"model_interface.jl\")\n\n# Generate observational data and load interface\ninclude(joinpath(experiment_dir, \"generate_data.jl\"))\ninclude(joinpath(experiment_dir, \"observation_map.jl\"))\ninclude(model_interface)\n\nslurm_kwargs = kwargs(time = 3)\neki = calibrate(CaltechHPCBackend, experiment_dir; model_interface, slurm_kwargs);\n\n\n\n\n\n","category":"function"},{"location":"api/#ClimaCalibrate.sbatch_model_run","page":"API","title":"ClimaCalibrate.sbatch_model_run","text":"sbatch_model_run(\n    iter,\n    member,\n    output_dir,\n    experiment_dir;\n    model_interface,\n    verbose;\n    slurm_kwargs,\n)\n\nConstruct and execute a command to run a forward model on a Slurm cluster for a single ensemble member.\n\nArguments:\n\niter: Iteration number\nmember: Member number\noutput_dir: Calibration experiment output directory\nexperiment_dir: Directory containing the experiment's Project.toml\nmodel_interface: File containing the model interface\nmoduleloadstr: Commands which load the necessary modules\nslurm_kwargs: Dictionary containing the slurm resources for the job. Easily generated using kwargs.\n\n\n\n\n\n","category":"function"},{"location":"api/#EnsembleKalmanProcesses-Interface","page":"API","title":"EnsembleKalmanProcesses Interface","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"ClimaCalibrate.initialize\nClimaCalibrate.save_G_ensemble\nClimaCalibrate.update_ensemble\nClimaCalibrate.ExperimentConfig\nClimaCalibrate.get_prior\nClimaCalibrate.get_param_dict\nClimaCalibrate.path_to_iteration","category":"page"},{"location":"api/#ClimaCalibrate.initialize","page":"API","title":"ClimaCalibrate.initialize","text":"initialize(\n    ensemble_size,\n    observations,\n    noise,\n    prior,\n    output_dir;\n    rng_seed = 1234,\n)\ninitialize(config::ExperimentConfig; rng_seed = 1234)\ninitialize(filepath::AbstractString; rng_seed = 1234)\n\nInitializes the calibration process by setting up the EnsembleKalmanProcess object and parameter files with a given seed for random number generation.\n\n\n\n\n\n","category":"function"},{"location":"api/#ClimaCalibrate.save_G_ensemble","page":"API","title":"ClimaCalibrate.save_G_ensemble","text":"save_G_ensemble(config::ExperimentConfig, iteration, G_ensemble)\nsave_G_ensemble(output_dir::AbstractString, iteration, G_ensemble)\n\nSaves the ensemble's observation map output to the correct directory based on the provided configuration. Takes an output directory, either extracted from an ExperimentConfig or passed directly.\n\n\n\n\n\n","category":"function"},{"location":"api/#ClimaCalibrate.update_ensemble","page":"API","title":"ClimaCalibrate.update_ensemble","text":"update_ensemble(output_dir::AbstractString, iteration, prior)\nupdate_ensemble(config::ExperimentConfig, iteration)\nupdate_ensemble(config_file::AbstractString, iteration)\n\nUpdates the EnsembleKalmanProcess object and saves the parameters for the next iteration.\n\n\n\n\n\n","category":"function"},{"location":"api/#ClimaCalibrate.ExperimentConfig","page":"API","title":"ClimaCalibrate.ExperimentConfig","text":"ExperimentConfig(\n    n_iterations::Integer,\n    ensemble_size::Integer,\n    observations,\n    noise,\n    prior::ParameterDistribution,\n    output_dir,\n)\nExperimentConfig(filepath::AbstractString; kwargs...)\n\nConstruct an ExperimentConfig from a given YAML file or directory containing 'experiment_config.yml'.\n\nExperimentConfig holds the configuration for a calibration experiment. This can be constructed from a YAML configuration file or directly using individual parameters.\n\n\n\n\n\n","category":"type"},{"location":"api/#ClimaCalibrate.get_prior","page":"API","title":"ClimaCalibrate.get_prior","text":"get_prior(param_dict::AbstractDict; names = nothing)\nget_prior(prior_path::AbstractString; names = nothing)\n\nConstructs the combined prior distribution from a param_dict or a TOML configuration file specified by prior_path. If names is provided, only those parameters are used.\n\n\n\n\n\n","category":"function"},{"location":"api/#ClimaCalibrate.get_param_dict","page":"API","title":"ClimaCalibrate.get_param_dict","text":"get_param_dict(distribution; names)\n\nGenerates a dictionary for parameters based on the specified distribution, assumed to be of floating-point type. If names is not provided, the distribution's names will be used.\n\n\n\n\n\n","category":"function"},{"location":"api/#ClimaCalibrate.path_to_iteration","page":"API","title":"ClimaCalibrate.path_to_iteration","text":"path_to_iteration(output_dir, iteration)\n\nCreates the path to the directory for a specific iteration within the specified output directory.\n\n\n\n\n\n","category":"function"},{"location":"emulate_sample/#Emulate-and-Sample","page":"Emulate and Sample","title":"Emulate and Sample","text":"","category":"section"},{"location":"emulate_sample/","page":"Emulate and Sample","title":"Emulate and Sample","text":"Once you have run a successful calibration, we can fit an emulator to the resulting input/output pairs.","category":"page"},{"location":"emulate_sample/","page":"Emulate and Sample","title":"Emulate and Sample","text":"First, import the necessary packages:","category":"page"},{"location":"emulate_sample/","page":"Emulate and Sample","title":"Emulate and Sample","text":"import JLD2\n\nusing CalibrateEmulateSample.Emulators\nusing CalibrateEmulateSample.MarkovChainMonteCarlo\n\nimport EnsembleKalmanProcesses as EKP\nusing EnsembleKalmanProcesses.ParameterDistributions\nusing EnsembleKalmanProcesses.TOMLInterface\n\nimport ClimaCalibrate as CAL","category":"page"},{"location":"emulate_sample/","page":"Emulate and Sample","title":"Emulate and Sample","text":"Next, load in the data, EKP object, and prior distribution. These values are taken from the Held-Suarez perfect model experiment in ClimaAtmos.","category":"page"},{"location":"emulate_sample/","page":"Emulate and Sample","title":"Emulate and Sample","text":"asset_path = joinpath(\n    pkgdir(CAL),\n    \"docs\",\n    \"src\",\n    \"assets\")\n\nekp = JLD2.load_object(joinpath(asset_path, \"emulate_example_ekiobj.jld2\"))\ny_obs = ekp.obs_mean\ny_noise_cov = ekp.obs_noise_cov\ninitial_params = [EKP.get_u_final(ekp)[1]]\n\nprior_path = joinpath(asset_path, \"emulate_example_prior.toml\")\nprior = CAL.get_prior(prior_path)","category":"page"},{"location":"emulate_sample/","page":"Emulate and Sample","title":"Emulate and Sample","text":"Get the input-output pairs which will be used to train the emulator.  The inputs are the parameter values, and the outputs are the result of the observation map.  In thise case, the outputs are the average air temperature at roughly 500 meters.","category":"page"},{"location":"emulate_sample/","page":"Emulate and Sample","title":"Emulate and Sample","text":"input_output_pairs = CAL.get_input_output_pairs(ekp)","category":"page"},{"location":"emulate_sample/","page":"Emulate and Sample","title":"Emulate and Sample","text":"Next, create the Gaussian Process-based emulator and Markov chain.  The samples from the chain can be used in future predictive model runs with the same configuration. The posterior distribution can be saved to a JLD2 file using save_posterior. Samples can be extracted from the posterior using ClimaParams.","category":"page"},{"location":"emulate_sample/","page":"Emulate and Sample","title":"Emulate and Sample","text":"emulator = CAL.gp_emulator(input_output_pairs, y_noise_cov)\n(; mcmc, chain) = CAL.sample(emulator, y_obs, prior, initial_params)\nconstrained_posterior = CAL.save_posterior(mcmc, chain; filename = \"samples.jld2\")\ndisplay(chain)","category":"page"},{"location":"quickstart/#Getting-Started","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"quickstart/","page":"Getting Started","title":"Getting Started","text":"First, make sure your system meets the dependencies of CalibrateEmulateSample.jl. You can run calibrations a cluster that supports Slurm or on your local machine.","category":"page"},{"location":"quickstart/","page":"Getting Started","title":"Getting Started","text":"A good way to get started is to run the example experiment, surface_fluxes_perfect_model, which uses the SurfaceFluxes.jl package to generate a physical model that calculates the Monin Obukhov turbulent surface fluxes based on idealized atmospheric and surface conditions. Since this is a \"perfect model\" example, the same model is used to generate synthetic observations using its default parameters and a small amount of noise. These synthetic observations are considered to be the ground truth, which is used to assess the model ensembles' performance when parameters are drawn from the prior parameter distributions. ","category":"page"},{"location":"quickstart/","page":"Getting Started","title":"Getting Started","text":"It is a perfect-model calibration, serving as a test case for the initial pipeline.  By default, it runs 10 ensemble members for 6 iterations. Further details can be found in the experiment folder, experiments/surace_fluxes_perfect_model.","category":"page"},{"location":"quickstart/#Local-Machine","page":"Getting Started","title":"Local Machine","text":"","category":"section"},{"location":"quickstart/","page":"Getting Started","title":"Getting Started","text":"To run the example experiment on your local machine, first open your REPL with the proper project: julia --project=experiments/surface_fluxes_perfect_model","category":"page"},{"location":"quickstart/","page":"Getting Started","title":"Getting Started","text":"Next, run the following code:","category":"page"},{"location":"quickstart/","page":"Getting Started","title":"Getting Started","text":"import ClimaCalibrate\n\nexperiment_dir = dirname(Base.active_project())\n\n# Generate observational data and include observational map + model interface\ninclude(joinpath(experiment_dir, \"generate_data.jl\"))\ninclude(joinpath(experiment_dir, \"observation_map.jl\"))\ninclude(joinpath(experiment_dir, \"model_interface.jl\"))\n\neki = ClimaCalibrate.calibrate(JuliaBackend, experiment_dir)\ninclude(joinpath(experiment_dir, \"postprocessing.jl\"))","category":"page"},{"location":"quickstart/#HPC-Cluster","page":"Getting Started","title":"HPC Cluster","text":"","category":"section"},{"location":"quickstart/","page":"Getting Started","title":"Getting Started","text":"This method will queue Julia processes to run on your slurm cluster.","category":"page"},{"location":"quickstart/","page":"Getting Started","title":"Getting Started","text":"To run this experiment:","category":"page"},{"location":"quickstart/","page":"Getting Started","title":"Getting Started","text":"Log onto the Caltech HPC\nClone ClimaCalibrate.jl and cd into the repository.\nStart julia: julia --project=experiments/surace_fluxes_perfect_model\nRun the following:","category":"page"},{"location":"quickstart/","page":"Getting Started","title":"Getting Started","text":"import ClimaCalibrate: CaltechHPCBackend, calibrate\n\nexperiment_dir = dirname(Base.active_project())\n\ninclude(joinpath(experiment_dir, \"generate_data.jl\"))\nmodel_interface = joinpath(experiment_dir, \"model_interface.jl\")\ninclude(joinpath(experiment_dir, \"observation_map.jl\"))\neki = calibrate(CaltechHPCBackend, experiment_dir; \n                time_limit = 3, model_interface)\n\ninclude(joinpath(experiment_dir, \"postprocessing.jl\"))","category":"page"},{"location":"quickstart/","page":"Getting Started","title":"Getting Started","text":"New experiments should be defined within the component model repos (in this case, SurfaceFluxes.jl), so that the internals of ClimaCalibrate.jl do not explicitly depend on component models.","category":"page"},{"location":"atmos_setup_guide/#Experiment-Set-Up-Guide-for-ClimaAtmos","page":"ClimaAtmos Setup Guide","title":"Experiment Set Up Guide for ClimaAtmos","text":"","category":"section"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Please read this entire guide before setting up an experiment. This guide assumes familiarity with ClimaAtmos and a basic understanding of Ensemble Kalman Inversion (EKI). Because moderate resolution ClimaAtmos runs need to be run with MPI and/or on GPU, this example demonstrates how to set up a perfect model example calibration (i.e., generating the synthetic \"true\" data with the same model that we are calibrating with towards a known set of parameters).","category":"page"},{"location":"atmos_setup_guide/#Summary","page":"ClimaAtmos Setup Guide","title":"Summary","text":"","category":"section"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"For a perfect model scenario, observations are generated by running the model and then processing the diagnostic output through the constructed observation map.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"To calibrate parameters, you need:","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Atmos model configuration\nSteady-state restart file\nEKP configuration\nPrior parameter distributions\nTruth and noise data\nObservation map script with a function observation_map(iteration)","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"These components are detailed in the guide below. Examples of all of these can also be found in ClimaAtmos in calibration/experiments/sphere_held_suarez_rhoe_equilmoist","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"First, create a folder for your experiment with a descriptive name in the calibration/experiments/ folder. All of the components described below will be stored in this folder.","category":"page"},{"location":"atmos_setup_guide/#Atmos-Configuration-File","page":"ClimaAtmos Setup Guide","title":"Atmos Configuration File","text":"","category":"section"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"One ClimaAtmos configuration YAML file will be used to run all simulations in the calibration. The only changes between model runs are the parameters selected for calibration. This is a typical Atmos YAML file, but it must be named model_config.yml.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"If your configuration requires a parameter TOML file, ensure that the toml entry in your configuration is an absolute path or a correctly configured relative path.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"note: Note\nWhen targeting a global or otherwise costly simulation, it may be worth it to optimize your timestep dt as well as your timestepping algorithm, ode_algo. Turning off default diagnostics can increase performance as well.","category":"page"},{"location":"atmos_setup_guide/#Restart-File-(optional)","page":"ClimaAtmos Setup Guide","title":"Restart File (optional)","text":"","category":"section"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"The restart file is a snapshot of the model state which will be used to spin-off all ensemble members' forward model runs.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Once you have settled on a configuration, follow these steps to generate a restart file:","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Run ClimaAtmos with your configuration to determine the time it takes for the simulation to reach an equilibrium state.\nGenerate a restart file by setting dt_save_state_to_disk in the model configuration to the equilibrium timestamp.\nTransfer the file to your experiment directory and enter the relative path into your atmosphere configuration file:","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"restart_file: experiments/experiment_name/restart_file.hdf5","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"note: Note\nA restarted simulation starts from the saved date of the restart file. A restart file saved at 200 days and a t_end of 201 days will only run for 1 simulated day:restart_file: experiments/experiment_name/day200.hdf5\nt_end: 201 days","category":"page"},{"location":"atmos_setup_guide/#Prior-Distribution-File","page":"ClimaAtmos Setup Guide","title":"Prior Distribution File","text":"","category":"section"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"First, create your TOML file in your experiment folder. For each calibrated parameter, create a prior distribution with the following format:","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"[long_name]\nalias = \"alias_name\"\ntype = \"float\"\nprior = \"Parameterized(Normal(0,1))\"\nconstraint = \"[bounded(0,5)]\"","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Note that the prior distribution here is in unconstrained space - the constraint list constrains the distribution in parameter space.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"note: Why two parameter spaces?\nThe calibration tools are effective when working with unconstrained parameters (u), whereas physical models typically require (partially-)bounded parameters (φ). To satisfy both conditions the ParameterDistribution object contains maps between these two spaces. The drawback is that the prior must be defined in the unconstrained space.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"An easy way to generate prior distributions directly in constrained parameter space is with the constrained_gaussian constructor from EnsembleKalmanProcesses.ParameterDistributions. Here is an example:","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"using EnsembleKalmanProcesses.ParameterDistributions\nphysical_mean = 125\nphysical_std = 40\nlower_bound = -50\nupper_bound = Inf\nconstrained_gaussian(\"name\", physical_mean, physical_std, lower_bound, upper_bound)","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"This constructor can be used in the TOML file directly: ","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"[name]\ntype = \"float\"\nprior = \"constrained_gaussian(name, physical_mean, physical_std, lower_bound, upper_bound)\"\ndescription = \" this prior has approximate (mean,std) = (125,40) and is bounded below by -50\"","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"If using the constrained_gaussian constructor, ensure that you don't have an additional constraint in your TOML entry:","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Constraint constructors:","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Lower bound: bounded_below(0)\nUpper bound: bounded_above(2)\nUpper and lower bounds: bounded(0, 2)","category":"page"},{"location":"atmos_setup_guide/#Observation-Map","page":"ClimaAtmos Setup Guide","title":"Observation Map","text":"","category":"section"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"The observation map is applied to process model output diagnostics into the exact observable used to fit to observations. In a perfect model setting it is used also to generate the observation.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"These requirements arise from the update step, which runs the observation_map function. This function must load in model diagnostics for each ensemble member in the iteration and construct an array arr = Array{Float64}(undef, dims..., ensemble_size) such that arr[:, i] will return the i-th ensemble member's observation map output. Note this floating point precision is required for the EKI update step.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"In the update step of EKI, the array will be saved in a JLD2 file named G_ensemble.jld2 in the iteration folder of the output directory.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"As an example, in observation_map function in the sphere_held_suarez_rhoe_equilmoist experiment, we have the following sequence:","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"First, construct the array to store the ensemble's observations. Then, for each ensemble member m:","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Load in the model diagnostic output, in this case 60-day air temperature averages.\nCall process_member_data(m) and stores the result in the output array.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Pseudocode for observation_map(iteration):","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"function observation_map(iteration)\n    # Get Configuration\n    config_file = joinpath(\"calibration\", \"sphere_held_suarez_rhoe_equilmoist\")\n    config = ExperimentConfig(config_file)\n    ensemble_size = config.ensemble_size\n\n    # Setup output array\n    # dims = size of individual member observation map output\n    dims = 1\n    G_ensemble = Array{Float64}(undef, dims..., ensemble_size)\n\n    for m in 1:ensemble_size\n        ta = load_member_diagnostics(m)\n        # Compute observation map for the member\n        G_ensemble[:, m] = process_member_data(ta)\n    end\n    return G_ensemble\nend","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"process_member_data(m) then does the following:","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Removes the first two samples to ensure an equilibrium state\nAverages across latitude and longitude\nExtracts the second height slice\nReturns the third sample in an array","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Pseudocode for process_member_data(m):","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"function process_member_data(ta; output_variance = false)\n    # Cut off first two points to ensure equilibrium, grab second height slice\n    ta_second_height = ta[3:size(ta)[1], :, :, 2]\n    # Average over long and latitude\n    area_avg_ta_second_height =\n        longitudinal_avg(latitudinal_avg(ta_second_height))\n    # Take the third sample\n    observation = [area_avg_ta_second_height[3]]\n    return observation\nend","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"If you are running a perfect-model experiment and generating truth data from ClimaAtmos itself, you may find it useful to create a kernel function to compute the observation map for each ensemble member. You can use this to run the default simulation's diagnostic output through the observation map and save the truth data and noise.","category":"page"},{"location":"atmos_setup_guide/#Generating-Truth-Data","page":"ClimaAtmos Setup Guide","title":"Generating Truth Data","text":"","category":"section"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"The truth data must be an array of observations with the same dimensions as an individual ensemble member's entry in the observation map (arr[:, i] from above).","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"The noise is the sample covariance of the truth data. The dimension of each truth data sample determines how many samples you need to generate. Covariance estimation techniques may be required for high dimensional truth data.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Save a single sample from the observations and the noise in separate JLD2 files. These will be read in when constructing the EKP object. For sphere_held_suarez_rhoe_equilmoist, these are saved as obs_mean.jld2 and obs_noise_cov.jld2 respectively. To inspect them, start julia --project=experiments and run:","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"import JLD2\nexperiment_path = joinpath(\"experiments\", \"sphere_held_suarez_rhoe_equilmoist\")\ntruth = JLD2.load_object(joinpath(experiment_path, \"obs_mean.jld2\"))\nnoise = JLD2.load_object(joinpath(experiment_path, \"obs_noise_cov.jld2\"))","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"note: Note\nFor full reproducibility, create and store a script that generates the truth data. If running a perfect-model scenario, the script should run the model and use the resulting diagnostic output to generate the truth data.","category":"page"},{"location":"atmos_setup_guide/#EKP-Configuration-File","page":"ClimaAtmos Setup Guide","title":"EKP Configuration File","text":"","category":"section"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Your EKP configuration file must in YAML format and contain the following:","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"n_iterations, the number of iterations to run\nensemble_size, the ensemble size\nprior, the TOML file with the prior parameter distributions\nobservations, the observational data\nnoise, the covariance of the observational data\noutput_dir, the folder where you want calibration data and logs to be output. This must be the same as the output_dir in the model configuration file.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"The filepaths will be treated as relative.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Example:","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"output_dir: output/sphere_held_suarez_rhoe_equilmoist\nprior: prior.toml\nensemble_size: 10\nn_iterations: 3\nobservations: obs_mean.jld2\nnoise: obs_noise_cov.jld2","category":"page"},{"location":"atmos_setup_guide/#Plotting-Results","page":"ClimaAtmos Setup Guide","title":"Plotting Results","text":"","category":"section"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"It may be useful to generate convergence plots to summarize your experiments. The postprocessing.jl file in sphere_held_suarez_rhoe_equilmoist experiment provides a decent template.","category":"page"},{"location":"atmos_setup_guide/","page":"ClimaAtmos Setup Guide","title":"ClimaAtmos Setup Guide","text":"Sample plot from sphere_held_suarez_rhoe_equilmoist: (Image: Convergence Plot)","category":"page"},{"location":"precompilation/#Using-PrecompileTools-for-faster-model-runs","page":"Precompilation","title":"Using PrecompileTools for faster model runs","text":"","category":"section"},{"location":"precompilation/","page":"Precompilation","title":"Precompilation","text":"PrecompileTools.jl enables developers to force the Julia compiler to save more code to disk, preventing re-compilation in the future.","category":"page"},{"location":"precompilation/","page":"Precompilation","title":"Precompilation","text":"For ClimaCalibrate, this is useful under certain conditions:","category":"page"},{"location":"precompilation/","page":"Precompilation","title":"Precompilation","text":"The atmosphere model configuration is set and will not change often. This is because the model configuration specifies things like the floating-point type and callbacks, which affect the MethodInstances that get precompiled. Generically precompiling ClimaAtmos would take much too long to be useful.\nThe model runtime is short compared to the compile time. If the model runtime is an order of magnitude or more than the compilation time, any benefit from reduced compilation time will be trivial.","category":"page"},{"location":"precompilation/#How-do-I-precompile-my-configuration?","page":"Precompilation","title":"How do I precompile my configuration?","text":"","category":"section"},{"location":"precompilation/","page":"Precompilation","title":"Precompilation","text":"The easiest way is by copying and pasting the code snippet below into src/ClimaCalibrate.jl. This will precompile the model step and all callbacks for the given configuration.","category":"page"},{"location":"precompilation/","page":"Precompilation","title":"Precompilation","text":"using PrecompileTools\nimport SciMLBase\nimport ClimaAtmos as CA\nimport YAML\n\n@setup_workload begin\n    config_file = Dict(\"FLOAT_TYPE\" => \"Float64\")\n    @compile_workload begin\n        config = CA.AtmosConfig(config_dict)\n        simulation = CA.get_simulation(config)\n        (; integrator) = simulation\n        SciMLBase.step!(integrator)\n        CA.call_all_callbacks!(integrator)\n    end\nend","category":"page"},{"location":"#ClimaCalibrate.jl","page":"Home","title":"ClimaCalibrate.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ClimaCalibrate.jl is a toolkit for developing scalable and reproducible model  calibration pipelines using CalibrateEmulateSample.jl with minimal boilerplate.","category":"page"},{"location":"","page":"Home","title":"Home","text":"For more information, see our Getting Started page.","category":"page"}]
}
