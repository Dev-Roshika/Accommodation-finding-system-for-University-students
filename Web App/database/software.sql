-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2023 at 06:35 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `software`
--

-- --------------------------------------------------------

--
-- Table structure for table `boarding_house`
--

CREATE TABLE `boarding_house` (
  `Id` int(11) NOT NULL,
  `Title` text NOT NULL,
  `Description` text NOT NULL,
  `Price` varchar(100) NOT NULL,
  `Negotiable` varchar(10) DEFAULT NULL,
  `Address` text NOT NULL,
  `Distance` varchar(200) NOT NULL,
  `Boys` int(11) DEFAULT NULL,
  `Girls` int(11) DEFAULT NULL,
  `Facilities` text DEFAULT NULL,
  `Rules` text DEFAULT NULL,
  `ContactNo` varchar(20) NOT NULL,
  `CoverImage` text NOT NULL,
  `OtherImages` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `boarding_house`
--

INSERT INTO `boarding_house` (`Id`, `Title`, `Description`, `Price`, `Negotiable`, `Address`, `Distance`, `Boys`, `Girls`, `Facilities`, `Rules`, `ContactNo`, `CoverImage`, `OtherImages`) VALUES
(52, 'Title 01', 'Description of title one is this is 01', '40000.00', 'Yes', 'Jaffna', '450m', 10, 0, 'Air conditioner', 'No rules', '01111111111', 'coverimage_1686061806874_cover_image1.jpg', '[\"uploadImages-1686061859186-image_1.jpg\",\"uploadImages-1686061859186-image_2.jpg\",\"uploadImages-1686061859186-image_3.jpg\",\"uploadImages-1686061859187-image_5.jpg\",\"uploadImages-1686061859187-image_6.jpg\",\"uploadImages-1686061859188-image_12 - Copy.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `owner_info`
--

CREATE TABLE `owner_info` (
  `Id` int(11) NOT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  `UserName` varchar(50) DEFAULT NULL,
  `ContactNo` varchar(20) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `ProfileImage` varchar(100) DEFAULT NULL,
  `NidNo` varchar(50) NOT NULL,
  `NidPhoto` varchar(100) NOT NULL,
  `PrivateAddress` text DEFAULT NULL,
  `Password` varchar(125) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owner_info`
--

INSERT INTO `owner_info` (`Id`, `FullName`, `UserName`, `ContactNo`, `Email`, `ProfileImage`, `NidNo`, `NidPhoto`, `PrivateAddress`, `Password`) VALUES
(59, 'Sinnathurayi Balasuntharam', 'Sinnathurayi ', '0739177233', 'sinnathurayi@gmail.com', 'profileimage-1686060763745-photo-1628563694622-5a76957fd09c.jpg', '543251380v', 'nidphoto-1686060763444-NID.PNG', 'No :42', '$2b$10$quoVeiSPnjcz7TphnKHV4uOCY6De/ebjBkIpoD7y43Y.irpLvjwSK');

-- --------------------------------------------------------

--
-- Table structure for table `student_info`
--

CREATE TABLE `student_info` (
  `Id` int(11) NOT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  `UserName` varchar(50) DEFAULT NULL,
  `UnivRegNo` varchar(20) DEFAULT NULL,
  `ContactNo` varchar(20) DEFAULT NULL,
  `ProfileImage` varchar(200) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Faculty` varchar(100) DEFAULT NULL,
  `Dept` varchar(100) DEFAULT NULL,
  `Password` varchar(125) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_info`
--

INSERT INTO `student_info` (`Id`, `FullName`, `UserName`, `UnivRegNo`, `ContactNo`, `ProfileImage`, `Email`, `Faculty`, `Dept`, `Password`) VALUES
(37, 'Saman De Silva', 'saman', '2019/csc/001', '0764972833', 'profileimage_1686059975134_fashion.jpg', 'saman@gmail.com', NULL, NULL, '$2b$10$iBYSpCfNCUoCeHPYprBVEePeYStUnWvjBpKTUMBJ5DuSwkZPKlVV6');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boarding_house`
--
ALTER TABLE `boarding_house`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `owner_info`
--
ALTER TABLE `owner_info`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `student_info`
--
ALTER TABLE `student_info`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boarding_house`
--
ALTER TABLE `boarding_house`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `owner_info`
--
ALTER TABLE `owner_info`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `student_info`
--
ALTER TABLE `student_info`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
