<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    protected $fillable = ['username', 'color'];

    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}