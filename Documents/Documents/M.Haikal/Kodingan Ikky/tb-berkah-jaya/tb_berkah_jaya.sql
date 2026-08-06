-- ============================================================================
-- DATABASE DUMP SCRIPT: SIM-TB BERKAH JAYA CITAPEN
-- System: Sistem Informasi Manajemen & Operasional Toko Bangunan (SIM-TB)
-- Compatible with: MySQL 5.7+ / MySQL 8.0+ / MariaDB / phpMyAdmin / DBeaver
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `tb_berkah_jaya` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `tb_berkah_jaya`;

SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Table structure for `users`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'pegawai',
  `phone` varchar(20) DEFAULT '-',
  `basic_salary` decimal(15,2) NOT NULL DEFAULT 0.00,
  `allowance` decimal(15,2) NOT NULL DEFAULT 0.00,
  `kasbon_limit` decimal(15,2) NOT NULL DEFAULT 1000000.00,
  `photo` varchar(255) DEFAULT NULL,
  `qr_code_token` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_qr_code_token_unique` (`qr_code_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert data for `users`
-- Note: Password for all default accounts below is: password123
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `phone`, `basic_salary`, `allowance`, `kasbon_limit`, `qr_code_token`, `created_at`, `updated_at`) VALUES
(1, 'Owner TB Berkah Jaya', 'admin@tbberkah.com', '$2y$12$NqBqH48v5N0L/W02oO8V/.7C9uGkS1OqM34aG2M4qV.N0X2Gz2w0.', 'admin', '081234567890', 5000000.00, 500000.00, 2000000.00, 'ADMIN-TOKEN-001', NOW(), NOW()),
(2, 'Kasir Utama', 'kasir@tbberkah.com', '$2y$12$NqBqH48v5N0L/W02oO8V/.7C9uGkS1OqM34aG2M4qV.N0X2Gz2w0.', 'kasir', '081298765432', 3000000.00, 200000.00, 1000000.00, 'KASIR-TOKEN-001', NOW(), NOW()),
(3, 'Budi Santoso', 'budi@tbberkah.com', '$2y$12$NqBqH48v5N0L/W02oO8V/.7C9uGkS1OqM34aG2M4qV.N0X2Gz2w0.', 'pegawai', '081311223344', 0.00, 0.00, 1000000.00, 'PEGAWAI-TOKEN-001', NOW(), NOW()),
(4, 'Agus Setiawan', 'agus@tbberkah.com', '$2y$12$NqBqH48v5N0L/W02oO8V/.7C9uGkS1OqM34aG2M4qV.N0X2Gz2w0.', 'pegawai', '081355667788', 0.00, 0.00, 1000000.00, 'PEGAWAI-TOKEN-002', NOW(), NOW());

-- --------------------------------------------------------
-- Table structure for `categories`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`),
  KEY `categories_parent_id_foreign` (`parent_id`),
  CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert data for `categories`
INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `created_at`, `updated_at`) VALUES
(1, 'Cat & Zat Kimia', 'cat-zat-kimia', NULL, NOW(), NOW()),
(2, 'Cat Tembok Interior', 'cat-tembok-interior', 1, NOW(), NOW()),
(3, 'Cat Kayu & Besi', 'cat-kayu-besi', 1, NOW(), NOW()),
(4, 'Thinner & Pelarut', 'thinner-pelarut', 1, NOW(), NOW()),
(5, 'Besi & Baja', 'besi-baja', NULL, NOW(), NOW()),
(6, 'Besi Beton SNI', 'besi-beton-sni', 5, NOW(), NOW()),
(7, 'Baja Ringan & Kanal C', 'baja-ringan-kanal-c', 5, NOW(), NOW()),
(8, 'Semen & Mortar', 'semen-mortar', NULL, NOW(), NOW()),
(9, 'Semen Portland (Gresik/Tiga Roda)', 'semen-portland', 8, NOW(), NOW()),
(10, 'Mortar Instan Acian', 'mortar-instan-acian', 8, NOW(), NOW());

-- --------------------------------------------------------
-- Table structure for `products`
-- (Kode Barang, Nama Barang, Jenis/Kategori, Ukuran/Satuan, Harga Beli, Harga Jual, Stok)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `base_unit` varchar(50) NOT NULL DEFAULT 'Pcs',
  `purchase_price` decimal(15,2) NOT NULL DEFAULT 0.00,
  `selling_price` decimal(15,2) NOT NULL DEFAULT 0.00,
  `stock` decimal(15,2) NOT NULL DEFAULT 0.00,
  `min_stock` decimal(15,2) NOT NULL DEFAULT 5.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_code_unique` (`code`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert data for `products`
INSERT INTO `products` (`id`, `code`, `name`, `category_id`, `base_unit`, `purchase_price`, `selling_price`, `stock`, `min_stock`, `created_at`, `updated_at`) VALUES
(1, 'CAT-001', 'Cat Jotun Interior Putih 5kg', 2, 'Pcs', 120000.00, 150000.00, 50.00, 10.00, NOW(), NOW()),
(2, 'THN-001', 'Thinner Impala 1 Liter', 4, 'Botol', 20000.00, 28000.00, 100.00, 15.00, NOW(), NOW()),
(3, 'BSI-001', 'Besi Beton 10mm SNI Polos (12 Meter)', 6, 'Batang', 65000.00, 78000.00, 350.00, 50.00, NOW(), NOW()),
(4, 'SMN-001', 'Semen Tiga Roda 50kg', 9, 'Sak', 62000.00, 70000.00, 250.00, 30.00, NOW(), NOW()),
(5, 'SCR-001', 'Sekrup SDS Baja Ringan 10x19', 7, 'Pcs', 200.00, 350.00, 5000.00, 500.00, NOW(), NOW()),
(6, 'BSI-002', 'Besi Beton 8mm SNI Polos (12 Meter)', 6, 'Batang', 45000.00, 55000.00, 420.00, 40.00, NOW(), NOW()),
(7, 'MRT-001', 'Mortar MU-380 Perekat Bata Ringan 40kg', 10, 'Sak', 85000.00, 95000.00, 120.00, 20.00, NOW(), NOW()),
(8, 'KNL-001', 'Kanal C Baja Ringan Kencana 0.75mm (6M)', 7, 'Batang', 72000.00, 85000.00, 180.00, 25.00, NOW(), NOW());

-- --------------------------------------------------------
-- Table structure for `product_conversions` (Konversi Multi-Satuan)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `product_conversions`;
CREATE TABLE `product_conversions` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `unit_name` varchar(50) NOT NULL,
  `value_in_base_unit` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_conversions_product_id_foreign` (`product_id`),
  CONSTRAINT `product_conversions_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert data for `product_conversions`
INSERT INTO `product_conversions` (`id`, `product_id`, `unit_name`, `value_in_base_unit`, `created_at`, `updated_at`) VALUES
(1, 5, 'Box (100 Pcs)', 100.00, NOW(), NOW()),
(2, 2, 'Dus (12 Botol)', 12.00, NOW(), NOW());

-- --------------------------------------------------------
-- Table structure for `transactions` (Penjualan Kasir / Struk)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `total_amount` decimal(15,2) NOT NULL,
  `discount_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `paid_amount` decimal(15,2) NOT NULL,
  `change_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `payment_method` enum('cash','qris','bank_transfer') NOT NULL DEFAULT 'cash',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `transactions_invoice_number_unique` (`invoice_number`),
  KEY `transactions_user_id_foreign` (`user_id`),
  CONSTRAINT `transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `transaction_details`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `transaction_details`;
CREATE TABLE `transaction_details` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `transaction_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `unit_name` varchar(50) NOT NULL,
  `quantity` decimal(15,2) NOT NULL,
  `unit_price` decimal(15,2) NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transaction_details_transaction_id_foreign` (`transaction_id`),
  KEY `transaction_details_product_id_foreign` (`product_id`),
  CONSTRAINT `transaction_details_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `transaction_details_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `stock_mutations` (Kartu Stok Barang)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `stock_mutations`;
CREATE TABLE `stock_mutations` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('in','out') NOT NULL,
  `quantity` decimal(15,2) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `reference_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stock_mutations_product_id_foreign` (`product_id`),
  CONSTRAINT `stock_mutations_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `attendances` (Log Absensi Presensi Barcode)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `attendances`;
CREATE TABLE `attendances` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `check_in` time DEFAULT NULL,
  `check_out` time DEFAULT NULL,
  `status` enum('present','late','sick','permit','alpha') NOT NULL DEFAULT 'present',
  `minutes_late` int(11) NOT NULL DEFAULT 0,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attendances_user_id_foreign` (`user_id`),
  CONSTRAINT `attendances_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `kasbons` (Pencatatan Kasbon Pinjaman)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `kasbons`;
CREATE TABLE `kasbons` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `reason` text DEFAULT NULL,
  `is_paid` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kasbons_user_id_foreign` (`user_id`),
  CONSTRAINT `kasbons_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `payrolls` (Payroll Gaji Mingguan & Bulanan)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `payrolls`;
CREATE TABLE `payrolls` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `month` varchar(10) NOT NULL,
  `week_number` int(11) NOT NULL DEFAULT 1,
  `basic_salary` decimal(15,2) NOT NULL DEFAULT 0.00,
  `total_allowance` decimal(15,2) NOT NULL DEFAULT 0.00,
  `kasbon_deduction` decimal(15,2) NOT NULL DEFAULT 0.00,
  `net_salary` decimal(15,2) NOT NULL DEFAULT 0.00,
  `status` enum('pending','approved') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payrolls_user_id_foreign` (`user_id`),
  CONSTRAINT `payrolls_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `pos_cash_drawers` (Kas Awal Laci Shared)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `pos_cash_drawers`;
CREATE TABLE `pos_cash_drawers` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `opening_cash` decimal(15,2) NOT NULL,
  `closing_cash` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pos_cash_drawers_user_id_foreign` (`user_id`),
  CONSTRAINT `pos_cash_drawers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `ip_whitelists` (Lock IP Wi-Fi Toko)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `ip_whitelists`;
CREATE TABLE `ip_whitelists` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(45) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ip_whitelists_ip_address_unique` (`ip_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default IP Whitelists
INSERT INTO `ip_whitelists` (`id`, `ip_address`, `name`, `created_at`, `updated_at`) VALUES
(1, '127.0.0.1', 'Localhost IPv4 Terminal Absensi', NOW(), NOW()),
(2, '::1', 'Localhost IPv6 Terminal Absensi', NOW(), NOW());

SET FOREIGN_KEY_CHECKS = 1;
