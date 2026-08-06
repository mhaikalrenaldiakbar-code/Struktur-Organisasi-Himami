<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductConversion;
use App\Models\IpWhitelist;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Users (1 Admin, 1 Kasir, & Pegawai Biasa)
        $admin = User::create([
            'name' => 'Owner TB Berkah Jaya',
            'email' => 'admin@tbberkah.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'basic_salary' => 5000000.00,
            'allowance' => 500000.00,
            'qr_code_token' => 'ADMIN-TOKEN-001',
        ]);

        $kasir = User::create([
            'name' => 'Kasir Utama',
            'email' => 'kasir@tbberkah.com',
            'password' => Hash::make('password123'),
            'role' => 'kasir',
            'basic_salary' => 3000000.00,
            'allowance' => 200000.00,
            'qr_code_token' => 'KASIR-TOKEN-001',
        ]);

        $pegawai1 = User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@tbberkah.com',
            'password' => Hash::make('password123'),
            'role' => 'pegawai',
            'basic_salary' => 0.00,
            'allowance' => 0.00,
            'kasbon_limit' => 1000000.00,
            'qr_code_token' => 'PEGAWAI-TOKEN-001',
        ]);

        $pegawai2 = User::create([
            'name' => 'Agus Setiawan',
            'email' => 'agus@tbberkah.com',
            'password' => Hash::make('password123'),
            'role' => 'pegawai',
            'basic_salary' => 0.00,
            'allowance' => 0.00,
            'kasbon_limit' => 1000000.00,
            'qr_code_token' => 'PEGAWAI-TOKEN-002',
        ]);

        // 2. Seed Categories & Sub-categories
        $catCat = Category::create(['name' => 'Cat & Zat Kimia', 'slug' => 'cat-zat-kimia']);
        $catInterior = Category::create(['name' => 'Cat Tembok Interior', 'slug' => 'cat-tembok-interior', 'parent_id' => $catCat->id]);
        $catKayuBesi = Category::create(['name' => 'Cat Kayu & Besi', 'slug' => 'cat-kayu-besi', 'parent_id' => $catCat->id]);
        $thinner = Category::create(['name' => 'Thinner & Pelarut', 'slug' => 'thinner-pelarut', 'parent_id' => $catCat->id]);

        $besiBaja = Category::create(['name' => 'Besi & Baja', 'slug' => 'besi-baja']);
        $besiBeton = Category::create(['name' => 'Besi Beton SNI', 'slug' => 'besi-beton-sni', 'parent_id' => $besiBaja->id]);
        $bajaRingan = Category::create(['name' => 'Baja Ringan & Kanal C', 'slug' => 'baja-ringan-kanal-c', 'parent_id' => $besiBaja->id]);

        $semenMortar = Category::create(['name' => 'Semen & Mortar', 'slug' => 'semen-mortar']);
        $semenPortland = Category::create(['name' => 'Semen Portland (Gresik/Tiga Roda)', 'slug' => 'semen-portland', 'parent_id' => $semenMortar->id]);
        $mortarInstan = Category::create(['name' => 'Mortar Instan Acian', 'slug' => 'mortar-instan-acian', 'parent_id' => $semenMortar->id]);

        // 3. Seed Master Products (Bahan Bangunan TB Berkah Jaya)
        $p1 = Product::create([
            'code' => 'CAT-001',
            'name' => 'Cat Jotun Interior Putih 5kg',
            'category_id' => $catInterior->id,
            'base_unit' => 'Pcs',
            'purchase_price' => 120000.00,
            'selling_price' => 150000.00,
            'stock' => 50.00,
            'min_stock' => 10.00,
        ]);

        $p2 = Product::create([
            'code' => 'THN-001',
            'name' => 'Thinner Impala 1 Liter',
            'category_id' => $thinner->id,
            'base_unit' => 'Pcs',
            'purchase_price' => 20000.00,
            'selling_price' => 28000.00,
            'stock' => 100.00,
            'min_stock' => 15.00,
        ]);

        $p3 = Product::create([
            'code' => 'BSI-001',
            'name' => 'Besi Beton 10mm SNI Polos',
            'category_id' => $besiBeton->id,
            'base_unit' => 'Batang',
            'purchase_price' => 65000.00,
            'selling_price' => 78000.00,
            'stock' => 350.00,
            'min_stock' => 50.00,
        ]);

        $p4 = Product::create([
            'code' => 'SMN-001',
            'name' => 'Semen Tiga Roda 50kg',
            'category_id' => $semenPortland->id,
            'base_unit' => 'Sak',
            'purchase_price' => 62000.00,
            'selling_price' => 70000.00,
            'stock' => 250.00,
            'min_stock' => 30.00,
        ]);

        $p5 = Product::create([
            'code' => 'SCR-001',
            'name' => 'Sekrup SDS Baja Ringan 10x19',
            'category_id' => $bajaRingan->id,
            'base_unit' => 'Pcs',
            'purchase_price' => 200.00,
            'selling_price' => 350.00,
            'stock' => 5000.00,
            'min_stock' => 500.00,
        ]);

        // 4. Seed Product Multi-Unit Conversions
        ProductConversion::create([
            'product_id' => $p5->id,
            'unit_name' => 'Box (100 Pcs)',
            'value_in_base_unit' => 100.00,
        ]);

        ProductConversion::create([
            'product_id' => $p2->id,
            'unit_name' => 'Dus (12 Botol)',
            'value_in_base_unit' => 12.00,
        ]);

        // 5. Seed IP Whitelist (localhost + subnet)
        IpWhitelist::create(['ip_address' => '127.0.0.1', 'name' => 'Localhost IPv4']);
        IpWhitelist::create(['ip_address' => '::1', 'name' => 'Localhost IPv6']);

        // 6. Seed Simulation Data
        $this->call(SimulationSeeder::class);
    }
}
