import CalibrateAtmos
using Test

# Tests for ensuring CalibrateAtmos has protected interfaces. The API tested below must be defined for each model,
# otherwise CalibrateAtmos will throw an error.

struct TestPhysicalModel <: CalibrateAtmos.AbstractPhysicalModel end

@testset "get_config" begin
    @test_throws ErrorException(
        "get_config not implemented for TestPhysicalModel()",
    ) CalibrateAtmos.get_config(TestPhysicalModel(), 1, 1, Dict{Any, Any}())
end

@testset "run_forward_model" begin
    @test_throws ErrorException(
        "run_forward_model not implemented for TestPhysicalModel()",
    ) CalibrateAtmos.run_forward_model(TestPhysicalModel(), Dict{Any, Any}())
end

@testset "get_forward_model" begin
    @test_throws ErrorException(
        "get_forward_model not implemented for Val{:test}()",
    ) CalibrateAtmos.get_forward_model(Val(:test))
end

@testset "observation_map" begin
    @test_throws ErrorException(
        "observation_map not implemented for experiment Val{:test}() at iteration 1",
    ) CalibrateAtmos.observation_map(Val(:test), 1)
end

# This test depends on `surface_fluxes_perfect_model` in the `experiments/` folder 
@testset "calibrate func" begin
    dir = pwd()
    cd(pkgdir(CalibrateAtmos))
    @test_throws ErrorException CalibrateAtmos.calibrate(
        "surface_fluxes_perfect_model",
    )
    cd(dir)
end
