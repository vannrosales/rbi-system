<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateInhabitantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name'           => 'sometimes|required|string|max:255',
            'last_name'            => 'sometimes|required|string|max:255',
            'occupation'           => 'nullable|string|max:255',
            'civil_status'         => 'sometimes|required|string',
            'relationship_to_head' => 'sometimes|required|string',
            'remarks'              => 'nullable|string',
        ];
    }
}
