<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UnLikeRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'type' => ['required', 'string', 'in:idol,group'],
            'id' => ['required', 'integer'],
        ];
    }
}
