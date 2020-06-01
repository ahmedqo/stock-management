<?php
date_default_timezone_set("Africa/Casablanca");
class connection
{
    private $host = "localhost";
    private $db_name = "stock";
    private $username = "root";
    private $password = "";
    public $conn;
    public function getconnection()
    {
        $this->conn = null;
        try {
            $this->conn =  new PDO("mysql:host={$this->host};dbname={$this->db_name}", $this->username, $this->password);
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
class login
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }
    public function getUser($username, $password)
    {
        $query = 'SELECT * FROM users WHERE pseudo = :username limit 1';
        $params = array(
            ':username' => $username
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row["motdepasse"] == md5($password)) {
                return $row;
            } else {
                return false;
            }
        } else {
            return 0;
        }
    }
}
class brand
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }
    public function getBrands($search, $status)
    {
        $query = 'SELECT * FROM marque WHERE nom_marque LIKE :search AND status_marque LIKE :status ORDER BY id_marque DESC';
        $params = array(
            ':search' => "%" . $search . "%",
            ':status' => "%" . $status . "%"
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $rows = $stmt->fetchAll();
            if (count($rows) > 0) {
                return $rows;
            }
            return true;
        } else {
            return false;
        }
    }

    public function getBrand($id)
    {
        $query = 'SELECT * FROM marque WHERE id_marque=:id';
        $params = array(
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $row = $stmt->fetch();
            return $row;
        } else {
            return false;
        }
    }

    public function getName($id, $name)
    {
        if ($id) {
            $query = 'SELECT * FROM marque WHERE nom_marque=:name AND id_marque != :id LIMIT 1';
            $params = array(
                ':id' => $id,
                ':name' => $name
            );
        } else {
            $query = 'SELECT * FROM marque WHERE nom_marque=:name LIMIT 1';
            $params = array(
                ':name' => $name
            );
        }
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $row = $stmt->fetch();
            if ($row) {
                return true;
            }
            return false;
        }
    }

    public function setBrand($name)
    {
        if ($this->getName(null, $name)) {
            return 0;
        }
        $query = 'INSERT INTO marque(nom_marque,status_marque) VALUES(:name,1)';
        $params = array(
            ':name' => $name
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function resetBrand($id, $name)
    {
        if ($this->getName($id, $name)) {
            return 0;
        }
        $query = 'UPDATE marque SET nom_marque = :name WHERE id_marque = :id';
        $params = array(
            ':id' => $id,
            ':name' => $name
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function statusBrand($status, $id)
    {
        $query = 'UPDATE marque SET status_marque = :status WHERE id_marque=:id';
        $params = array(
            ':status' => $status,
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }
}
class category
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }
    public function getCategories($search, $status)
    {
        $query = 'SELECT * FROM categorie WHERE nom_categorie LIKE :search AND status_categorie LIKE :status ORDER BY id_categorie DESC';
        $params = array(
            ':search' => "%" . $search . "%",
            ':status' => "%" . $status . "%"
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $rows = $stmt->fetchAll();
            if (count($rows) > 0) {
                return $rows;
            }
            return true;
        } else {
            return false;
        }
    }

    public function getCategory($id)
    {
        $query = 'SELECT * FROM categorie WHERE id_categorie=:id';
        $params = array(
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $row = $stmt->fetch();
            return $row;
        } else {
            return false;
        }
    }

    public function getName($id, $name)
    {
        if ($id) {
            $query = 'SELECT * FROM categorie WHERE nom_categorie=:name AND id_categorie != :id LIMIT 1';
            $params = array(
                ':id' => $id,
                ':name' => $name
            );
        } else {
            $query = 'SELECT * FROM categorie WHERE nom_categorie=:name LIMIT 1';
            $params = array(
                ':name' => $name
            );
        }
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $row = $stmt->fetch();
            if ($row) {
                return true;
            }
            return false;
        }
    }

    public function setCategory($name)
    {
        if ($this->getName(null, $name)) {
            return 0;
        }
        $query = 'INSERT INTO categorie(nom_categorie,status_categorie) VALUES(:name,1)';
        $params = array(
            ':name' => $name
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function resetCategory($id, $name)
    {
        if ($this->getName($id, $name)) {
            return 0;
        }
        $query = 'UPDATE categorie SET nom_categorie = :name WHERE id_categorie = :id';
        $params = array(
            ':id' => $id,
            ':name' => $name
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function statusCategory($status, $id)
    {
        $query = 'UPDATE categorie SET status_categorie = :status WHERE id_categorie=:id';
        $params = array(
            ':status' => $status,
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }
}
class product
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }

    public function getProducts($search, $status)
    {
        $query = 'SELECT * FROM produit WHERE (nom_produit LIKE :search OR quantite_produit LIKE :search OR prix_produit LIKE :search) AND status_produit LIKE :status ORDER BY id_produit DESC';
        $params = array(
            ':search' => "%" . $search . "%",
            ':status' => "%" . $status . "%"
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $rows = $stmt->fetchAll();
            if (count($rows) > 0) {
                return $rows;
            }
            return true;
        } else {
            return false;
        }
    }

    public function getProduct($id)
    {
        $query = 'SELECT * FROM produit WHERE id_produit = :id';
        $params = array(
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $row = $stmt->fetch();
            return $row;
        } else {
            return false;
        }
    }

    public function getTitle($id, $title)
    {
        if ($id) {
            $query = 'SELECT * FROM produit WHERE nom_produit = :title AND id_produit != :id LIMIT 1';
            $params = array(
                ':id' => $id,
                ':title' => $title
            );
        } else {
            $query = 'SELECT * FROM produit WHERE nom_produit = :title LIMIT 1';
            $params = array(
                ':title' => $title
            );
        }
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $row = $stmt->fetch();
            if ($row) {
                return true;
            }
            return false;
        }
    }

    public function getImage($id)
    {
        $query = 'SELECT * FROM produit WHERE id_produit = :id LIMIT 1';
        $params = array(
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $row = $stmt->fetch();
            if ($row) {
                return $row['image_produit'];
            } else {
                return 0;
            }
        }
    }

    public function setProduct($title, $image, $brand, $category, $quantity, $price)
    {
        if ($this->getTitle(null, $title)) {
            return 0;
        }
        $type = explode('.', $image['name']);
        $type = $type[count($type) - 1];
        $img = uniqid(rand()) . '.' . $type;
        if (in_array($type, array('gif', 'jpg', 'jpeg', 'png', 'JPG', 'GIF', 'JPEG', 'PNG'))) {
            if (is_uploaded_file($image['tmp_name'])) {
                if (move_uploaded_file($image['tmp_name'], '../assets/image/' . $img)) {
                    $query = 'INSERT INTO produit(nom_produit,image_produit,id_marque,id_categorie,quantite_produit,prix_produit,status_produit) VALUES(:title,:image,:brand,:category,:quantity,:price,1)';
                    $params = array(
                        ':title' => $title,
                        ':image' => $img,
                        ':brand' => $brand,
                        ':category' => $category,
                        ':quantity' => $quantity,
                        ':price' => $price
                    );
                    $stmt = $this->bdd->prepare($query);
                    if ($stmt->execute($params)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function resetProduct($id, $title, $image, $brand, $category, $quantity, $price)
    {
        $img = $move = '';
        if ($image['error'] == 4) {
            $img = $this->getImage($id);
            $move = true;
        } else {
            $type = explode('.', $image['name']);
            $type = $type[count($type) - 1];
            $img = uniqid(rand()) . '.' . $type;
            unlink('../assets/image/' . $this->getImage($id));
            if (in_array($type, array('gif', 'jpg', 'jpeg', 'png', 'JPG', 'GIF', 'JPEG', 'PNG'))) {
                if (is_uploaded_file($image['tmp_name'])) {
                    if (move_uploaded_file($image['tmp_name'], '../assets/image/' . $img)) {
                        $move = true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        if ($move) {
            $query = 'UPDATE  produit SET nom_produit = :title, image_produit = :image, id_marque = :brand, id_categorie = :category,  quantite_produit = :quantity, prix_produit = :price WHERE id_produit = :id';
            $params = array(
                ':title' => $title,
                ':image' => $img,
                ':brand' => $brand,
                ':category' => $category,
                ':quantity' => $quantity,
                ':price' => $price,
                ':id' => $id
            );
            $stmt = $this->bdd->prepare($query);
            if ($stmt->execute($params)) {
                return true;
            } else {
                return false;
            }
        }
    }

    public function statusProduct($status, $id)
    {
        $query = 'UPDATE produit SET status_produit = :status WHERE id_produit=:id';
        $params = array(
            ':status' => $status,
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function plusQte($id, $qte)
    {
        $query = 'UPDATE produit SET quantite_produit = quantite_produit + :qte WHERE id_produit=:id';
        $params = array(
            ':qte' => $qte,
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function minusQte($id, $qte)
    {
        $query = 'UPDATE produit SET quantite_produit = quantite_produit - :qte WHERE id_produit=:id';
        $params = array(
            ':qte' => $qte,
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }
}
class order
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }

    public function getOrders($search, $status)
    {
        $query = 'SELECT * FROM commande WHERE (date_commande LIKE :search OR total_commande LIKE :search OR type_paiement LIKE :search OR nom_client LIKE :search OR tele_client LIKE :search OR adresse_client LIKE :search) AND status_commande LIKE :status ORDER BY id_commande DESC';
        $params = array(
            ':search' => "%" . $search . "%",
            ':status' => "%" . $status . "%"
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $rows = $stmt->fetchAll();
            if (count($rows) > 0) {
                return $rows;
            }
            return true;
        } else {
            return false;
        }
    }

    public function getOrder($id)
    {
        $query = 'SELECT * FROM commande WHERE id_commande = :id';
        $params = array(
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $row = $stmt->fetch();
            return $row;
        } else {
            return false;
        }
    }

    public function setOrder($name, $phone, $address, $total, $payment, $products, $quantities, $prices)
    {
        $query = "INSERT INTO commande(date_commande,nom_client,tele_client,adresse_client,total_commande,type_paiement,status_commande) VALUES(:date,:name,:phone,:address,:total,:payment,1)";
        $params = array(
            ':date' => date('Y-m-d'),
            ':name' => $name,
            ':phone' => $phone,
            ':address' => $address,
            ':total' => $total,
            ':payment' => $payment
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $id = $this->bdd->lastInsertId();
            $items = new item($this->bdd);
            $items->setItem($id, $products, $quantities, $prices);
            return true;
        } else {
            return false;
        }
    }

    public function resetOrder($id, $name, $phone, $address, $total, $payment, $products, $quantities, $prices)
    {
        $items = new item($this->bdd);
        $items->delItem($id);
        $query = "UPDATE commande SET nom_client = :name,tele_client = :phone,adresse_client = :address,total_commande = :total,type_paiement = :payment WHERE id_commande = :id";
        $params = array(
            ':id' => $id,
            ':name' => $name,
            ':phone' => $phone,
            ':address' => $address,
            ':total' => $total,
            ':payment' => $payment
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $items = new item($this->bdd);
            $items->setItem($id, $products, $quantities, $prices);
            return true;
        } else {
            return false;
        }
    }

    public function statusOrder($status, $id)
    {
        $query = 'UPDATE commande SET status_commande = :status WHERE id_commande=:id';
        $params = array(
            ':status' => $status,
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $item = new item($this->bdd);
            $item->statusItem($status, $id);
            return true;
        } else {
            return false;
        }
    }

    public function rapportOrder($start, $end)
    {
        $query = 'SELECT * FROM commande WHERE date_commande >= :start AND date_commande <= :end ORDER BY id_commande DESC';
        $params = array(
            ':start' => $start,
            ':end' => $end
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $rows = $stmt->fetchAll();
            if (count($rows) > 0) {
                return $rows;
            }
            return true;
        } else {
            return false;
        }
    }
}
class item
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }
    public function getItems($id)
    {
        $query = 'SELECT * FROM produit_commander,produit WHERE produit_commander.id_commande = :id AND produit_commander.id_produit = produit.id_produit';
        $params = array(
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $rows = $stmt->fetchAll();
            if (count($rows) > 0) {
                return $rows;
            }
            return true;
        } else {
            return false;
        }
    }
    public function setItem($id, $products, $quantities, $prices)
    {
        for ($i = 0; $i < count($products); $i++) {
            $query = 'INSERT INTO `produit_commander`(id_commande,id_produit,quantite,prix,total,status_produit_commander) VALUES (:id,:product,:quantity,:price,:total,1)';
            $params = array(
                ':id' => $id,
                ':product' => $products[$i],
                ':quantity' => $quantities[$i],
                ':price' => $prices[$i],
                ':total' => $quantities[$i] * $prices[$i]
            );
            $stmt = $this->bdd->prepare($query);
            $stmt->execute($params);
            $product = new product($this->bdd);
            $product->minusQte($products[$i], $quantities[$i]);
        }
        return true;
    }
    public function statusItem($status, $id)
    {
        $rows = $this->getItems($id);
        for ($i = 0; $i < count($rows); $i++) {
            if ($status) {
                $product = new product($this->bdd);
                $product->minusQte($rows[$i]['id_produit'], $rows[$i]['quantite']);
            } else {
                $product = new product($this->bdd);
                $product->plusQte($rows[$i]['id_produit'], $rows[$i]['quantite']);
            }
        }
        $query = 'UPDATE produit_commander SET status_produit_commander = :status WHERE id_commande=:id';
        $params = array(
            ':status' => $status,
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }
    public function delItem($id)
    {
        $rows = $this->getItems($id);
        for ($i = 0; $i < count($rows); $i++) {
            $product = new product($this->bdd);
            $product->plusQte($rows[$i]['id_produit'], $rows[$i]['quantite']);
        }
        $query = 'DELETE FROM produit_commander WHERE id_commande=:id';
        $params = array(
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }
}
class report
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }
    public function performance()
    {
        $query = 'SELECT * ,SUM(pc.quantite) as quantite FROM produit p,produit_commander pc WHERE p.id_produit = pc.id_produit GROUP BY pc.id_produit';
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute()) {
            $rows = $stmt->fetchAll();
            if (count($rows) > 0) {
                return $rows;
            }
            return true;
        } else {
            return false;
        }
    }
    public function prods()
    {
        $query = 'SELECT * FROM produit p,marque m,categorie c WHERE p.id_marque = m.id_marque AND p.id_categorie = c.id_categorie ';
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute()) {
            $rows = $stmt->fetchAll();
            if (count($rows) > 0) {
                return $rows;
            }
            return true;
        } else {
            return false;
        }
    }
}
