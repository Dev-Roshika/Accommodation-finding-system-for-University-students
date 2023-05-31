-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2023 at 01:49 PM
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
(49, 'Title1', 'Description of title one is this is 1', '35000.00', 'Yes', 'Jaffna', '500m', 12, 0, 'Air conditioner 2 Bedrooms', '', '01111111111', 'coverimage_1685363581644.jpg', '[\"uploadImages-1685363596583-image_1.jpg.jpg\",\"uploadImages-1685363596584-image_2.jpg.jpg\",\"uploadImages-1685363596584-image_3.jpg.jpg\",\"uploadImages-1685363596595-image_4.jpg.jpg\",\"uploadImages-1685363596596-image_5.jpg.jpg\",\"uploadImages-1685363596596-image_6.jpg.jpg\"]'),
(50, 'Title 2', 'Description of title one is this is 2', '40000.00', 'No', 'Mannar', '1Km', 0, 8, 'Air conditioner', '', '0323424141', 'coverimage_1685363713360.jpg', '[\"uploadImages-1685363725353-image_7.jpg.jpg\",\"uploadImages-1685363725354-image_8.jpg.jpg\",\"uploadImages-1685363725358-image_10.jpg.jpg\",\"uploadImages-1685363725359-image_11.jpg.jpg\",\"uploadImages-1685363725360-image_12.jpg.jpg\",\"uploadImages-1685363725397-image_13.jpg.jpg\"]');

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
(5, 'Sinnathurayi Balasuntharam', 'Sinnathurayi ', '0124356987', 'sinnathurayi@gmail.com', 'profileimage-1685447304046-programming-wallpaper - Copy.jpg', '543251380v', 'nidphoto-1685447304046-NID.PNG', '159, Manipay Road, Jaffna', '$2b$10$/O8xWZSMuYnf5zupDsW.Qere14aG6B2zZh7iQj5Hyr29STuxZPy3O');

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
(27, 'Saman De Silva', 'saman', '2019/csc/001', '0124356987', 'profile_image_1685287602108.jpg', 'saman@gmail.com', 'Science', 'CS', '$2b$10$0ZgFh.Hv8ZVOfiodALDAhOp.2JU.iZDr3/zh4GcPk/Rah.msabfcC');

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `owner_info`
--
ALTER TABLE `owner_info`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `student_info`
--
ALTER TABLE `student_info`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
