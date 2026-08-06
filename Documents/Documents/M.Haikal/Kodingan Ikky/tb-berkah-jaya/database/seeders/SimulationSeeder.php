<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\ProductConversion;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\Attendance;
use App\Models\Kasbon;
use App\Models\Payroll;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class SimulationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Boost initial stock to prevent negative inventory during sales simulation
        Product::query()->update([
            'stock' => 1200.00
        ]);

        $admin = User::where('role', 'admin')->first();
        $pegawai = User::where('role', 'pegawai')->first();
        $products = Product::with('conversions')->get();

        if (!$admin || !$pegawai || $products->isEmpty()) {
            return;
        }

        // We will seed data for the last 30 days
        $startDate = Carbon::now()->subDays(30);

        DB::transaction(function() use ($admin, $pegawai, $products, $startDate) {
            
            // Standard lateness threshold (08:00 AM)
            $startTime = Carbon::createFromFormat('H:i:s', '08:00:00');

            for ($i = 0; $i <= 30; $i++) {
                $currentDate = $startDate->copy()->addDays($i);

                // --- SEED ATTENDANCE (excluding Sundays) ---
                if ($currentDate->dayOfWeek !== Carbon::SUNDAY) {
                    // 10% chance of absence (alpha)
                    if (rand(1, 100) > 10) {
                        // Check-in between 07:45 AM and 08:35 AM
                        $checkInHour = rand(7, 8);
                        $checkInMin = ($checkInHour === 7) ? rand(45, 59) : rand(0, 35);
                        $checkInTimeStr = sprintf('%02d:%02d:00', $checkInHour, $checkInMin);

                        $checkInTimeObj = Carbon::createFromFormat('H:i:s', $checkInTimeStr);
                        $minutesLate = 0;
                        $status = 'present';

                        if ($checkInTimeObj->greaterThan($startTime)) {
                            $minutesLate = $checkInTimeObj->diffInMinutes($startTime);
                            $status = 'late';
                        }

                        // Check-out between 04:00 PM and 05:15 PM
                        $checkOutHour = rand(16, 17);
                        $checkOutMin = ($checkOutHour === 16) ? rand(0, 59) : rand(0, 15);
                        $checkOutTimeStr = sprintf('%02d:%02d:00', $checkOutHour, $checkOutMin);

                        Attendance::create([
                            'user_id' => $pegawai->id,
                            'date' => $currentDate->toDateString(),
                            'check_in' => $checkInTimeStr,
                            'check_out' => $checkOutTimeStr,
                            'ip_address' => '127.0.0.1',
                            'status' => $status,
                            'minutes_late' => $minutesLate,
                            'created_at' => $currentDate->copy()->setTime($checkInHour, $checkInMin),
                            'updated_at' => $currentDate->copy()->setTime($checkOutHour, $checkOutMin)
                        ]);
                    }
                }

                // --- SEED SALES TRANSACTIONS (2 to 5 transactions per day) ---
                $numSales = rand(2, 5);
                for ($j = 0; $j < $numSales; $j++) {
                    $invoiceDate = $currentDate->copy()->setTime(rand(9, 17), rand(0, 59));
                    
                    // Invoice counter formatting
                    $invoiceNumber = 'INV-' . $invoiceDate->format('Ymd') . '-' . str_pad($j + 1, 4, '0', STR_PAD_LEFT);
                    
                    // Pick 1 to 3 random items
                    $numItems = rand(1, 3);
                    $selectedProducts = $products->random($numItems);
                    
                    $totalAmount = 0;
                    $details = [];

                    foreach ($selectedProducts as $prod) {
                        // Check if we use conversions
                        $useConversion = (rand(1, 100) > 60) && $prod->conversions->count() > 0;
                        
                        $unitName = $prod->base_unit;
                        $factor = 1.00;
                        $price = (float)$prod->selling_price;
                        $qty = rand(1, 5); // Quantity sold

                        if ($useConversion) {
                            $conv = $prod->conversions->random();
                            $unitName = $conv->unit_name;
                            $factor = (float)$conv->value_in_base_unit;
                            $price = $prod->selling_price * $factor;
                            $qty = rand(1, 2); // lower quantity for bulk
                        }

                        $subtotal = $qty * $price;
                        $totalAmount += $subtotal;

                        $details[] = new TransactionDetail([
                            'product_id' => $prod->id,
                            'quantity' => $qty,
                            'unit_name' => $unitName,
                            'conversion_factor' => $factor,
                            'price' => $price,
                            'subtotal' => $subtotal,
                            'created_at' => $invoiceDate,
                            'updated_at' => $invoiceDate
                        ]);

                        // Decrement stock
                        $prod->decrement('stock', $qty * $factor);
                    }

                    // Apply small discount (10% chance)
                    $discount = (rand(1, 10) === 1) ? (float)(rand(5, 25) * 1000) : 0.00;
                    $netAmount = $totalAmount - $discount;
                    if ($netAmount < 0) $netAmount = 0;

                    $paymentMethod = ['cash', 'bank_transfer', 'qris'][rand(0, 2)];
                    $paidAmount = $netAmount;
                    $changeAmount = 0;

                    if ($paymentMethod === 'cash') {
                        // paid amount is rounded higher cash
                        $paidAmount = ceil($netAmount / 5000) * 5000;
                        $changeAmount = $paidAmount - $netAmount;
                    }

                    $transaction = Transaction::create([
                        'invoice_number' => $invoiceNumber,
                        'user_id' => [2, 1][rand(0, 1)], // cashier: admin or pegawai
                        'total_amount' => $netAmount,
                        'discount_amount' => $discount,
                        'payment_method' => $paymentMethod,
                        'paid_amount' => $paidAmount,
                        'change_amount' => $changeAmount,
                        'created_at' => $invoiceDate,
                        'updated_at' => $invoiceDate
                    ]);

                    $transaction->details()->saveMany($details);
                }
            }

            // --- SEED KASBONS ---
            // 1. One paid kasbon (completed)
            Kasbon::create([
                'user_id' => $pegawai->id,
                'amount' => 150000.00,
                'reason' => 'Beli obat keluarga sakit.',
                'is_paid' => true,
                'created_at' => Carbon::now()->subDays(25),
                'updated_at' => Carbon::now()->subDays(15)
            ]);

            // 2. One unpaid kasbon (outstanding, will reduce current month salary)
            Kasbon::create([
                'user_id' => $pegawai->id,
                'amount' => 200000.00,
                'reason' => 'Perbaikan sepeda motor.',
                'is_paid' => false,
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(10)
            ]);

            // --- SEED PAYROLL RECORD ---
            // Create an approved payroll for last month
            $lastMonthStr = Carbon::now()->subMonth()->format('Y-m');
            Payroll::create([
                'user_id' => $pegawai->id,
                'month' => $lastMonthStr,
                'basic_salary' => $pegawai->basic_salary,
                'total_allowance' => $pegawai->allowance,
                'kasbon_deduction' => 150000.00,
                'net_salary' => $pegawai->basic_salary + $pegawai->allowance - 150000.00,
                'status' => 'approved',
                'created_at' => Carbon::now()->subMonth()->endOfMonth()
            ]);
        });
    }
}
