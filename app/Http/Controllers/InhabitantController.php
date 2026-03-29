<?php

namespace App\Http\Controllers;

use App\Models\Inhabitant;
use App\Http\Requests\StoreInhabitantRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class InhabitantController extends Controller
{
    public function index()
    {
        return Inertia::render('Inhabitants/Index', [
            'inhabitants' => Inhabitant::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Inhabitants/Create');
    }

    public function store(StoreInhabitantRequest $request)
    {
        $validated = $request->validated();


        $address = collect($validated)->except('members')->toArray();

        try {
            foreach ($validated['members'] as $member) {

                Inhabitant::create(array_merge($address, $member, [
                    'age' => Carbon::parse($member['date_of_birth'])->age,
                ]));
            }

            return redirect()->route('inhabitants.index')->with('message', 'Records saved.');
        } catch (\Exception $e) {
            dd("Error: " . $e->getMessage());
        }
    }

    public function edit(Inhabitant $inhabitant)
    {
        return Inertia::render('Inhabitants/Edit', [
            'inhabitant' => $inhabitant
        ]);
    }

    public function update(Request $request, Inhabitant $inhabitant)
    {

        $data = $request->all();

        if (isset($data['date_of_birth'])) {
            $data['age'] = Carbon::parse($data['date_of_birth'])->age;
        }

        $inhabitant->update($data);

        return redirect()->route('inhabitants.index')->with('message', 'Updated successfully.');
    }

    public function destroy(Inhabitant $inhabitant)
    {
        $inhabitant->delete();
        return redirect()->back()->with('message', 'Record deleted.');
    }
}
