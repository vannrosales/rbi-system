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
        Schema::create('inhabitants', function (Blueprint $table) {
            $table->id();

            
            $table->string('region');
            $table->string('province');
            $table->string('city_municipality');
            $table->string('barangay');
            $table->string('street_name')->nullable();

            
            $table->string('last_name');
            $table->string('first_name');
            $table->string('middle_name')->nullable(); 
            $table->string('extension_name', 10)->nullable(); 
            $table->string('place_of_birth');
            $table->date('date_of_birth');
            $table->integer('age')->nullable(); 
            $table->string('sex', 10); 
            $table->string('civil_status'); 
            $table->string('citizenship')->default('Filipino'); 
            $table->string('occupation')->nullable();
            $table->string('special_indication')->nullable(); 
            $table->string('relationship_to_head'); 

            $table->timestamps();
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('inhabitants');
    }
};