<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Inhabitant;


class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'totalInhabitants' => Inhabitant::count() ?? 0,
            'totalHouseholds'  => Inhabitant::distinct('street_name')->count() ?? 0,
            'totalVoters' => Inhabitant::where('age', '>=', 18)->count() ?? 0,
            'recentInhabitants' => Inhabitant::latest()->take(5)->get() ?? [],
            'totalMale' => Inhabitant::where('sex', 'Male')->count() ?? 0,
            'totalFemale' => Inhabitant::where('sex', 'Female')->count() ?? 0,
            'totalSeniorCitizens' => Inhabitant::where('age', '>=', 60)->count() ?? 0,
        ]);
    }
}
