-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2023 at 08:23 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.20

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
  `OwnerId` int(11) DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `boarding_house`
--

INSERT INTO `boarding_house` (`Id`, `OwnerId`, `Title`, `Description`, `Price`, `Negotiable`, `Address`, `Distance`, `Boys`, `Girls`, `Facilities`, `Rules`, `ContactNo`, `CoverImage`, `OtherImages`) VALUES
(70, 3, 'Title 01 S', 'Description boarding 01', '35000.00', 'Yes', '159, Manipay Road, Jaffna\r\n', '100 m', 10, 0, '1 Bathroom, 3 Bedrooms', 'No rules', '0773453266', 'coverimage_1687181423969_cover_image1.jpg', '[\"uploadImages-1687181449426-image_3.jpg\",\"uploadImages-1687181449426-image_4.jpg\",\"uploadImages-1687181449426-image_11.jpg\",\"uploadImages-1687181449426-image_12 - Copy.jpg\",\"uploadImages-1687181449426-image_17.jpg\",\"uploadImages-1687181449427-image_19.jpg\"]'),
(71, 3, 'Title post 02', 'Description title 02', '45000.00', 'No', 'Jaffna', '1 km', 0, 11, '2 Bedrooms, 1 Bathroom', 'No alcohol', '0771063266', 'coverimage_1687181574824_cover_image2.jpg', '[\"uploadImages-1687181602162-image_2.jpg\",\"uploadImages-1687181602162-image_3.jpg\",\"uploadImages-1687181602163-image_5.jpg\",\"uploadImages-1687181602163-image_7.jpg\",\"uploadImages-1687181602163-image_13.jpg\",\"uploadImages-1687181602163-image_19.jpg\"]'),
(72, 4, 'Title 01 P', 'Description people 01', '45000.00', 'Yes', 'Mannar', '500 m', 15, 0, '1 Separate toilot, 1 Bathroom, 2 Bedrooms', 'No', '0771063116', 'coverimage_1687181853212_cover_image3.jpg', '[\"uploadImages-1687181870261-image_6.jpg\",\"uploadImages-1687181870262-image_7.jpg\",\"uploadImages-1687181870262-image_8.jpg\",\"uploadImages-1687181870262-image_12 - Copy.jpg\",\"uploadImages-1687181870262-image_15.jpg\",\"uploadImages-1687181870262-image_17.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `boardingid` int(11) NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `student_id`, `boardingid`, `comment`) VALUES
(10, 1, 70, 'ssssssssssssssssssssssxxxxxxxxxxxxxxxxkkkkkkkkkwwwwwww');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `owner_info`
--

INSERT INTO `owner_info` (`Id`, `FullName`, `UserName`, `ContactNo`, `Email`, `ProfileImage`, `NidNo`, `NidPhoto`, `PrivateAddress`, `Password`) VALUES
(3, 'Sinnathurayi Balasuntharam', 'sinnathurayi ', '0764447233', 'sinnathurayi@gmail.com', 'profileimage-1687181139548-contrast.jpg', '543251380v', 'nidphoto-1687181139548-NID.PNG', '159, Manipay Road, Jaffna', '$2b$10$tyeE4LprU9fdMEv5i.qbmedzfonja0EaqwcWpZkgHQPtTmZKtbK7C'),
(4, 'Pasindu Nayanajith ', 'pasindu', '0729736233', 'pasindu@gmail.com', 'profileimage-1687181721557-stock-photo-anonymous.jpg', '9872151380v', 'nidphoto-1687181721489-NID.PNG', 'No :42', '$2b$10$lM2vnUe74LxymMCRMmpEiu09C25l2yG1dxoH4MVKWDu/qH7Q8Y5ei');

-- --------------------------------------------------------

--
-- Table structure for table `student_boarding`
--

CREATE TABLE `student_boarding` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `boarding_id` int(11) NOT NULL,
  `review` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_boarding`
--

INSERT INTO `student_boarding` (`id`, `student_id`, `boarding_id`, `review`) VALUES
(4, 4, 70, 5),
(5, 1, 71, 2),
(7, 1, 70, 3),
(8, 1, 72, 4),
(9, 48, 72, 2),
(10, 48, 70, 5),
(11, 48, 71, 4);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_info`
--

INSERT INTO `student_info` (`Id`, `FullName`, `UserName`, `UnivRegNo`, `ContactNo`, `ProfileImage`, `Email`, `Faculty`, `Dept`, `Password`) VALUES
(1, 'Nuwani rasi', 'nuwani', '2019/CSC/024', '0745623894', 'profileimage_1698694303390_20220414_174436.jpg', 'nuwani@gmail.com', NULL, NULL, '$2b$10$Fqe7xyFCi.dN6/QCqu6wxOmSD60X.RzyS1mlMU8a2aXwfITaKLysm'),
(42, 'Saman De Silva', 'saman', '2019/CSC/001', '0124356987', 'profileimage_1687180865837_photo-1628563694622-5a76957fd09c.jpg', 'saman@gmail.com', 'Science', 'Cs', '$2b$10$SNK/o7MocpgMNkCI9HUuJuHf6S0LotJ4zR.Y0pRZHxJsonQfulxlC'),
(43, 'Dananjan Ferendo', 'danan', '2019/CSC/002', '0768888233', 'profileimage_1687180960184_fashion.jpg', 'danan@gmail.com', 'Art', 'Law', '$2b$10$5dhZxOicNsYis7qaqnigeO9s4SfLL9mdWn7wEWjKICxuAmo/3o42O'),
(48, 'mani', 'maani', '2019/CSC/024', '0710654738', 'profileimage_1695248646810_pexels-pixabay-159020 (2).jpg', 'mani@gmail.com', NULL, NULL, '$2b$10$yzgzYRxb1GSBaL31rN7s2esTRzZ9THzhGIHSnc8owhLgL8etC8N2.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boarding_house`
--
ALTER TABLE `boarding_house`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_OwnerId` (`OwnerId`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `owner_info`
--
ALTER TABLE `owner_info`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `student_boarding`
--
ALTER TABLE `student_boarding`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `owner_info`
--
ALTER TABLE `owner_info`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `student_boarding`
--
ALTER TABLE `student_boarding`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `student_info`
--
ALTER TABLE `student_info`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `boarding_house`
--
ALTER TABLE `boarding_house`
  ADD CONSTRAINT `FK_OwnerId` FOREIGN KEY (`OwnerId`) REFERENCES `owner_info` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
