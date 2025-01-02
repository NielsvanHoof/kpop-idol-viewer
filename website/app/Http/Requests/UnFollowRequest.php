<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UnFollowRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => ['required', 'integer'],
            'type' => ['required', 'string', 'in:idol,group'],
        ];
    }
}
