<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreInhabitantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Geographic Header
            'region'            => 'required|string|max:255',
            'province'          => 'required|string|max:255',
            'city_municipality' => 'required|string|max:255',
            'barangay'          => 'required|string|max:255',
            'street_name'       => 'required|string|max:255',

            // Members Array
            'members'                          => 'required|array|min:1',
            'members.*.first_name'             => 'required|string|max:255',
            'members.*.last_name'              => 'required|string|max:255',
            'members.*.middle_name'            => 'nullable|string|max:255',
            'members.*.extension_name'         => 'nullable|string|max:10',
            'members.*.place_of_birth'         => 'required|string',
            'members.*.date_of_birth'          => 'required|date',
            'members.*.sex'                    => 'required|string',
            'members.*.civil_status'           => 'required|string',
            'members.*.citizenship'            => 'required|string',
            'members.*.occupation'             => 'nullable|string',
            'members.*.special_indication'     => 'nullable|string',
            'members.*.relationship_to_head'   => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'members.*.first_name.required'    => 'First name is required for all members.',
            'members.*.last_name.required'     => 'Last name is required for all members.',
            'members.*.date_of_birth.required' => 'Please provide a birth date.',
            'street_name.required'             => 'Street name or House No. is required.',
        ];
    }
}

