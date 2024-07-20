<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    // Incluye 'user_id' en los campos rellenables
    protected $fillable = [
        'user_id',  // Añadido para permitir asignación masiva
        'name',
        'description',
        'price',
        'image_url',
        'available', // Si también necesitas asignar 'available'
    ];

    /**
     * Obtener los usuarios que han comprado este servicio.
     */
    public function clients()
    {
        return $this->belongsToMany(User::class, 'compras', 'servicio_id', 'user_id')
                    ->withTimestamps();
    }

    /**
     * Obtener el usuario que creó este servicio.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
