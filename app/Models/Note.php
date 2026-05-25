<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    // Make sure all fields you want to mass assign are here
    protected $fillable = [
        'title',
        'content',
        'color',
        'folder_id',
        'user_id',
    ];

    // Relationship to User (optional but recommended)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
