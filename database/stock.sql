-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2020 at 05:19 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stock`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorie`
--

CREATE TABLE `categorie` (
  `id_categorie` int(11) NOT NULL,
  `nom_categorie` varchar(255) NOT NULL,
  `status_categorie` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `commande`
--

CREATE TABLE `commande` (
  `id_commande` int(11) NOT NULL,
  `date_commande` date NOT NULL,
  `nom_client` varchar(255) NOT NULL,
  `tele_client` varchar(255) NOT NULL,
  `adresse_client` text NOT NULL,
  `total_commande` varchar(255) NOT NULL,
  `type_paiement` varchar(255) NOT NULL,
  `status_commande` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `marque`
--

CREATE TABLE `marque` (
  `id_marque` int(11) NOT NULL,
  `nom_marque` varchar(255) NOT NULL,
  `status_marque` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `produit`
--

CREATE TABLE `produit` (
  `id_produit` int(11) NOT NULL,
  `nom_produit` varchar(255) NOT NULL,
  `image_produit` text NOT NULL,
  `id_marque` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `quantite_produit` int(11) NOT NULL,
  `prix_produit` varchar(255) NOT NULL,
  `status_produit` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `produit_commander`
--

CREATE TABLE `produit_commander` (
  `id` int(11) NOT NULL,
  `id_commande` int(11) NOT NULL DEFAULT 0,
  `id_produit` int(11) NOT NULL DEFAULT 0,
  `quantite` int(11) NOT NULL,
  `prix` varchar(255) NOT NULL,
  `total` varchar(255) NOT NULL,
  `status_produit_commander` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_utilisateur` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `motdepasse` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `type` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_utilisateur`, `pseudo`, `motdepasse`, `email`, `type`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'ahmedqo1995@gmail.com', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Indexes for table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id_commande`);

--
-- Indexes for table `marque`
--
ALTER TABLE `marque`
  ADD PRIMARY KEY (`id_marque`);

--
-- Indexes for table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id_produit`);

--
-- Indexes for table `produit_commander`
--
ALTER TABLE `produit_commander`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_utilisateur`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `commande`
--
ALTER TABLE `commande`
  MODIFY `id_commande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `marque`
--
ALTER TABLE `marque`
  MODIFY `id_marque` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `produit`
--
ALTER TABLE `produit`
  MODIFY `id_produit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `produit_commander`
--
ALTER TABLE `produit_commander`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categorie`
--
ALTER TABLE `categorie`
  ADD CONSTRAINT `categorie_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `produit` (`id_produit`);

--
-- Constraints for table `marque`
--
ALTER TABLE `marque`
  ADD CONSTRAINT `marque_ibfk_1` FOREIGN KEY (`id_marque`) REFERENCES `produit` (`id_produit`);

--
-- Constraints for table `produit`
--
ALTER TABLE `produit`
  ADD CONSTRAINT `produit_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produit_commander` (`id`);

--
-- Constraints for table `produit_commander`
--
ALTER TABLE `produit_commander`
  ADD CONSTRAINT `produit_commander_ibfk_1` FOREIGN KEY (`id`) REFERENCES `commande` (`id_commande`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
