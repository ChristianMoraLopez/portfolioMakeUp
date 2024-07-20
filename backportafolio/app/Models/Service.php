<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'price', 'image_url',
    ];

    /**
     * Obtener los usuarios que han comprado este servicio.
     */
    public function clients()
    {
        return $this->belongsToMany(User::class, 'compras', 'servicio_id', 'user_id')
                    ->withTimestamps();
    }
}
