<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Relación uno a muchos con Servicio.
     */
    public function servicios()
    {
        return $this->hasMany(Service::class);
    }

    /**
     * Relación muchos a muchos con Servicio para servicios comprados.
     */
    public function serviciosComprados()
    {
        return $this->belongsToMany(Service::class, 'compras', 'user_id', 'servicio_id')
                    ->withTimestamps();
    }
}
