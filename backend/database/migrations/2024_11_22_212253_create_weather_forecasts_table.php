<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('weather_forecasts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('city_id')->constrained('cities');
            $table->float('temperature');
            $table->float('feelslike')->nullable();
            $table->integer('humidity')->nullable();
            $table->integer('cloudcover')->nullable();
            $table->float('wind_speed')->nullable();
            $table->integer('wind_degree')->nullable();
            $table->string('wind_dir')->nullable();
            $table->float('pressure')->nullable();
            $table->float('precip')->nullable();
            $table->integer('uv_index')->nullable();
            $table->integer('visibility')->nullable();
            $table->string('weather_description')->nullable();
            $table->string('weather_icon')->nullable();
            $table->boolean('is_day')->default(true);
            $table->timestamp('date_of_forecast');
            $table->boolean('is_favorite')->default(false);
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weather_forecasts');
    }
};
