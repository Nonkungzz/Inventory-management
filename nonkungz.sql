-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2024 at 05:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nonkungz`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `quantity`, `price`, `created_at`) VALUES
(8, 'SSD 1 TB ASUS', 1, 3000.00, '2024-12-09 09:45:44'),
(9, 'Gigabyte 1080ti 8Gb', 10, 29000.00, '2024-12-09 09:46:13'),
(12, 'MAINBOARD (เมนบอร์ด) GIGABYTE X870 AORUS ELITE WIFI7 (REV. 1.1) (AMD SOCKET AM5 DDR5 ATX)', 4, 12200.00, '2024-12-09 11:18:22'),
(13, 'MSI GeForce RTX 4060 Ti GAMING X 8G', 22, 14990.00, '2024-12-09 11:21:20'),
(14, 'ASUS ROG Strix GeForce RTX 4070 Ti OC Edition', 25, 24990.00, '2024-12-09 11:21:28'),
(15, 'Gigabyte Radeon RX 6750 XT GAMING OC 12G', 3, 16990.00, '2024-12-09 11:21:36'),
(16, 'ZOTAC GAMING GeForce RTX 4080 AMP Extreme AIRO', 3, 39990.00, '2024-12-09 11:21:48'),
(17, 'EVGA GeForce RTX 3060 XC Gaming', 25, 12990.00, '2024-12-09 11:22:02'),
(18, 'MSI GeForce RTX 4060 GAMING X 8G', 5, 11990.00, '2024-12-09 11:22:38'),
(19, 'ASUS TUF Gaming GeForce RTX 3080 OC Edition', 3, 25990.00, '2024-12-09 11:22:45'),
(20, 'Gigabyte GeForce GTX 1660 Ti Windforce 6G', 37, 8990.00, '2024-12-09 11:22:51'),
(21, 'EVGA GeForce RTX 4070 Ti FTW3 Ultra Gaming', 15, 29990.00, '2024-12-09 11:22:58'),
(22, 'ZOTAC GAMING GeForce GTX 1650 OC 4GB', 3, 5490.00, '2024-12-09 11:23:04'),
(23, 'Gigabyte Radeon RX 6800 XT GAMING OC 16G', 5, 28990.00, '2024-12-09 11:23:12'),
(24, 'MSI GeForce RTX 3050 VENTUS 2X OC', 3, 8990.00, '2024-12-09 11:23:18'),
(25, 'ASUS ROG Strix GeForce GTX 1660 Ti OC Edition', 2, 10490.00, '2024-12-09 11:23:23'),
(26, 'ZOTAC GAMING GeForce RTX 4060 8GB', 3, 13990.00, '2024-12-09 11:23:38'),
(27, 'MSI GeForce GTX 1650 SUPER VENTUS XS OC', 5, 6290.00, '2024-12-09 11:23:48'),
(28, 'Gigabyte GeForce RTX 4090 AORUS XTREME 24G', 2, 79990.00, '2024-12-09 11:25:19'),
(29, 'ASUS TUF Gaming Radeon RX 6800 16GB', 3, 22990.00, '2024-12-09 11:25:28'),
(30, 'ZOTAC GAMING GeForce RTX 3050 Twin Edge', 3, 6999.00, '2024-12-09 11:25:59'),
(31, 'Ram Corsair Vengeance LPX 16GB (2 x 8GB) DDR4 3200MHz', 3, 2190.00, '2024-12-09 11:27:37'),
(32, 'Ram G.Skill Ripjaws V 16GB (2 x 8GB) DDR4 3600MHz', 5, 2790.00, '2024-12-09 11:27:44'),
(33, 'Ram Kingston FURY Beast 16GB (2 x 8GB) DDR4 3200MHz', 2, 3000.00, '2024-12-09 11:27:51'),
(34, 'Ram Corsair Vengeance RGB Pro 32GB (2 x 16GB) DDR4 3600MHz', 2, 4490.00, '2024-12-09 11:27:58'),
(35, 'Ram ADATA XPG GAMMIX D30 16GB (2 x 8GB) DDR4 3200MHz', 5, 2290.00, '2024-12-09 11:28:05'),
(36, 'Ram TeamGroup T-Force Vulcan Z 16GB (2 x 8GB) DDR4 3200MHz', 35, 2590.00, '2024-12-09 11:28:14'),
(37, 'Ram G.Skill Trident Z Neo 32GB (2 x 16GB) DDR4 3600MHz', 6, 5490.00, '2024-12-09 11:28:23'),
(38, 'Ram Corsair Vengeance LPX 8GB (1 x 8GB) DDR4 3200MHz', 6, 1190.00, '2024-12-09 11:28:42'),
(39, 'Ram HyperX Fury 16GB (2 x 8GB) DDR4 3200MHz', 4, 2690.00, '2024-12-09 11:28:50'),
(40, 'Ram Crucial Ballistix 16GB (2 x 8GB) DDR4 3600MHz', 7, 2890.00, '2024-12-09 11:28:56'),
(41, 'Ram Corsair Vengeance LPX 64GB (4 x 16GB) DDR4 3200MHz', 3, 7490.00, '2024-12-09 11:29:03'),
(43, 'SSD 1 TB ASUS V2', 0, 2590.00, '2024-12-09 16:29:34');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `product_id`, `quantity`, `total_price`, `created_at`) VALUES
(1, 8, 2, 6000.00, '2024-12-09 09:51:41'),
(2, 9, 3, 87000.00, '2024-12-09 09:51:54'),
(3, 8, 8, 24000.00, '2024-12-09 09:52:10'),
(4, 8, 1, 3000.00, '2024-12-09 10:37:58'),
(5, 8, 5, 15000.00, '2024-12-09 10:38:02'),
(6, 8, 3, 9000.00, '2024-12-09 11:03:40'),
(7, 8, 1, 3000.00, '2024-12-09 11:14:19'),
(8, 9, 1, 29000.00, '2024-12-09 11:14:24'),
(9, 16, 2, 79980.00, '2024-12-09 11:24:06'),
(10, 12, 1, 12200.00, '2024-12-09 12:37:14'),
(11, 8, 1, 3000.00, '2024-12-09 13:27:44'),
(12, 43, 22, 56980.00, '2024-12-09 16:30:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
