<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Stock;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Product::factory()
        //     ->has(Stock::factory()->count(5)) // Minden termékhez 5 stock
        //     ->count(10) // 10 termék létrehozása
        //     ->create();
        Product::factory()->has(Stock::factory()->count(5))->create([
            'item_number' => 'TV-1245',
            'name' => 'Smart LED TV',
            'description' => '55 hüvelykes, 4K UHD kijelzővel és beépített WiFi-vel. Támogatja a streaming szolgáltatásokat és hangvezérlést.',
            'condition' => 'Új'
        ]);
        Product::factory()->has(Stock::factory()->count(3))->create([
            'item_number' => 'GM-4321',
            'name' => 'Gaming Egér',
            'description' => 'Ergonomikus kialakítás, RGB világítással, 7 programozható gomb és 16000 DPI szenzor.',
            'condition' => 'Használt'
        ]);
        Product::factory()->has(Stock::factory()->count(6))->create([
            'item_number' => 'WH-9785',
            'name' => 'Vezeték nélküli Fülhallgató',
            'description' => 'Bluetooth 5.0 kapcsolat, zajszűrő technológia, 20 órás üzemidő egy töltéssel.',
            'condition' => 'Új'
        ]);
        Product::factory()->has(Stock::factory()->count(5))->create([
            'item_number' => 'LB-5623',
            'name' => 'Laptop Hátizsák',
            'description' => 'Vízálló, 15,6 hüvelykes laptophoz készült, több rekeszes kialakítás, USB porttal.',
            'condition' => 'Új'
        ]);
        Product::factory()->has(Stock::factory()->count(1))->create([
            'item_number' => 'HD-3345',
            'name' => 'Külső Merevlemez',
            'description' => '1 TB tárhely, USB 3.0 kapcsolat, hordozható és ütésálló házzal.',
            'condition' => 'Tesztelt'
        ]);
        Product::factory()->has(Stock::factory()->count(3))->create([
            'item_number' => 'KB-7842',
            'name' => 'Mechanikus Billentyűzet',
            'description' => 'Tactile switchek, RGB háttérvilágítás, anti-ghosting funkció, fémből készült ház.',
            'condition' => 'Felújított'
        ]);
        Product::factory()->has(Stock::factory()->count(2))->create([
            'item_number' => 'SW-1289',
            'name' => 'Okosóra',
            'description' => 'Pulzusmérő, GPS nyomkövetés, 10 napos akkumulátor üzemidő, 1,3 hüvelykes AMOLED',
            'condition' => 'Felújított'
        ]);
        Product::factory()->has(Stock::factory()->count(6))->create([
            'item_number' => 'DC-9950',
            'name' => 'DSLR Fényképezőgép',
            'description' => '24,2 MP felbontás, Full HD videófelvétel, 18-55 mm-es kit objektívvel, WiFi és NFC',
            'condition' => 'Tesztelt'
        ]);
        Product::factory()->has(Stock::factory()->count(1))->create([
            'item_number' => 'FB-2101',
            'name' => 'Fitness Karkötő',
            'description' => 'Lépésszámláló, kalóriaszámláló, alváskövetés és vízálló kialakítás. Bluetooth kapcsolattal szinkronizálható.',
            'condition' => 'Új'
        ]);
        Product::factory()->has(Stock::factory()->count(4))->create([
            'item_number' => 'VR-6709',
            'name' => 'Porszívó Robot',
            'description' => 'Automata takarítás, időzítő funkció, önálló dokkolás, többféle tisztítási mód, akadályérzékelő.',
            'condition' => 'Sérült'
        ]);
    }
}
