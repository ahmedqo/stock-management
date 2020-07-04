<?php
date_default_timezone_set("Africa/Casablanca");
class connection
{
    private $host = "localhost";
    private $db_name = "projectGalini";
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
class user
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }

    public function getAll()
    {
        $query = 'SELECT * FROM users ORDER BY id DESC';
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

    public function get($id)
    {
        $query = 'SELECT * FROM users WHERE id=:id';
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

    public function getUsername($id, $username)
    {
        if ($id) {
            $query = 'SELECT * FROM users WHERE username=:username AND id != :id LIMIT 1';
            $params = array(
                ':id' => $id,
                ':username' => $username
            );
        } else {
            $query = 'SELECT * FROM users WHERE username=:username LIMIT 1';
            $params = array(
                ':username' => $username
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

    public function set($username, $password, $type)
    {
        if ($this->getUsername(null, $username)) {
            return 0;
        }
        $query = 'INSERT INTO users(username,password,type) VALUES(:username,:password,:type)';
        $params = array(
            ':username' => $username,
            ':password' => md5($password),
            ':type' => $type
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function reset($id, $username, $password, $type)
    {
        if ($this->getUsername($id, $username)) {
            return 0;
        }
        if ($type) {
            if (isset($password)) {
                $query = 'UPDATE users SET username = :username, password = :password, type = :type WHERE id = :id';
                $params = array(
                    ':id' => $id,
                    ':username' => $username,
                    ':password' => md5($password),
                    ':type' => $type
                );
            } else {
                $query = 'UPDATE users SET username = :username, type = :type WHERE id = :id';
                $params = array(
                    ':id' => $id,
                    ':username' => $username,
                    ':type' => $type
                );
            }
        } else {
            if (isset($password)) {
                $query = 'UPDATE users SET username = :username, password = :password WHERE id = :id';
                $params = array(
                    ':id' => $id,
                    ':username' => $username,
                    ':password' => md5($password)
                );
            } else {
                $query = 'UPDATE users SET username = :username WHERE id = :id';
                $params = array(
                    ':id' => $id,
                    ':username' => $username
                );
            }
        }
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function status($id, $status)
    {
        $query = 'UPDATE users SET status = :status WHERE id=:id';
        $params = array(
            ':id' => $id,
            ':status' => $status
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function search($label, $status)
    {
        $query = 'SELECT * FROM users WHERE (username LIKE :label OR type LIKE :label) AND status LIKE :status ORDER BY id DESC';
        $params = array(
            ':label' => '%' . $label . '%',
            ':status' => '%' . $status . '%'
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

    public function login($username, $password)
    {
        $query = 'SELECT * FROM users WHERE username = :username limit 1';
        $params = array(
            ':username' => $username
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $row = $stmt->fetch();
            if ($row[2] == md5($password)) {
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

    public function getAll()
    {
        $query = 'SELECT * FROM brands ORDER BY id DESC';
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

    public function get($id)
    {
        $query = 'SELECT * FROM brands WHERE id=:id';
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

    public function getLabel($id, $label)
    {
        if ($id) {
            $query = 'SELECT * FROM brands WHERE label=:label AND id != :id LIMIT 1';
            $params = array(
                ':id' => $id,
                ':label' => $label
            );
        } else {
            $query = 'SELECT * FROM brands WHERE label=:label LIMIT 1';
            $params = array(
                ':label' => $label
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

    public function set($label)
    {
        if ($this->getLabel(null, $label)) {
            return 0;
        }
        $query = 'INSERT INTO brands(label) VALUES(:label)';
        $params = array(
            ':label' => $label
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function reset($id, $label)
    {
        if ($this->getLabel($id, $label)) {
            return 0;
        }
        $query = 'UPDATE brands SET label = :label WHERE id = :id';
        $params = array(
            ':id' => $id,
            ':label' => $label
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function status($id, $status)
    {
        $query = 'UPDATE brands SET status = :status WHERE id=:id';
        $params = array(
            ':id' => $id,
            ':status' => $status
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function search($label, $status)
    {
        $query = 'SELECT * FROM brands WHERE label LIKE :label AND status LIKE :status ORDER BY id DESC';
        $params = array(
            ':label' => '%' . $label . '%',
            ':status' => '%' . $status . '%'
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
class category
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }

    public function getAll()
    {
        $query = 'SELECT * FROM categories ORDER BY id DESC';
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

    public function get($id)
    {
        $query = 'SELECT * FROM categories WHERE id=:id';
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

    public function getLabel($id, $label)
    {
        if ($id) {
            $query = 'SELECT * FROM categories WHERE label=:label AND id != :id LIMIT 1';
            $params = array(
                ':id' => $id,
                ':label' => $label
            );
        } else {
            $query = 'SELECT * FROM categories WHERE label=:label LIMIT 1';
            $params = array(
                ':label' => $label
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

    public function set($label)
    {
        if ($this->getLabel(null, $label)) {
            return 0;
        }
        $query = 'INSERT INTO categories(label) VALUES(:label)';
        $params = array(
            ':label' => $label
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function reset($id, $label)
    {
        if ($this->getLabel($id, $label)) {
            return 0;
        }
        $query = 'UPDATE categories SET label = :label WHERE id = :id';
        $params = array(
            ':id' => $id,
            ':label' => $label
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function status($id, $status)
    {
        $query = 'UPDATE categories SET status = :status WHERE id=:id';
        $params = array(
            ':id' => $id,
            ':status' => $status
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function search($label, $status)
    {
        $query = 'SELECT * FROM categories WHERE label LIKE :label AND status LIKE :status ORDER BY id DESC';
        $params = array(
            ':label' => '%' . $label . '%',
            ':status' => '%' . $status . '%'
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
class supplier
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }

    public function getAll()
    {
        $query = 'SELECT * FROM suppliers ORDER BY id DESC';
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

    public function get($id)
    {
        $query = 'SELECT * FROM suppliers WHERE id=:id';
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
            $query = 'SELECT * FROM suppliers WHERE name=:name AND id != :id LIMIT 1';
            $params = array(
                ':id' => $id,
                ':name' => $name
            );
        } else {
            $query = 'SELECT * FROM suppliers WHERE name=:name LIMIT 1';
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

    public function set($name, $contact, $address)
    {
        if ($this->getName(null, $name)) {
            return 0;
        }
        $query = 'INSERT INTO suppliers(name,contact,address) VALUES(:name,:contact,:address)';
        $params = array(
            ':name' => $name,
            ':contact' => $contact,
            ':address' => $address
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function reset($id, $name, $contact, $address)
    {
        if ($this->getName($id, $name)) {
            return 0;
        }
        $query = 'UPDATE suppliers SET name = :name, contact = :contact, address = :address WHERE id = :id';
        $params = array(
            ':id' => $id,
            ':name' => $name,
            ':contact' => $contact,
            ':address' => $address
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function status($id, $status)
    {
        $query = 'UPDATE suppliers SET status = :status WHERE id=:id';
        $params = array(
            ':id' => $id,
            ':status' => $status
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function search($label, $status)
    {
        $query = 'SELECT * FROM suppliers WHERE (name LIKE :label OR contact LIKE :label OR address LIKE :label) AND status LIKE :status ORDER BY id DESC';
        $params = array(
            ':label' => '%' . $label . '%',
            ':status' => '%' . $status . '%'
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
class product
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }

    public function getAll()
    {
        $query = 'SELECT * FROM products ORDER BY id DESC';
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

    public function get($id)
    {
        $query = 'SELECT * FROM products WHERE id=:id';
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
            $query = 'SELECT * FROM products WHERE title=:title AND id != :id LIMIT 1';
            $params = array(
                ':id' => $id,
                ':title' => $title
            );
        } else {
            $query = 'SELECT * FROM products WHERE title=:title LIMIT 1';
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

    public function setSold($id, $order, $quantity)
    {
        $row = $this->get($id);
        if ($row[8] < $quantity) {
            $quantity = $row[8];
            $item = new item($this->bdd);
            $item->quantity($order, $id, $quantity);
        }
        $query = 'UPDATE products SET stock = stock - :quantity, sold = sold + :quantity WHERE id = :id';
        $params = array(
            ':id' => $id,
            ':quantity' => $quantity,
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function setStock($id, $quantity)
    {
        $query = 'UPDATE products SET stock = stock + :quantity, sold = sold - :quantity WHERE id = :id';
        $params = array(
            ':id' => $id,
            ':quantity' => $quantity,
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function set($title, $brand, $category, $supplier, $cost, $profit, $quantity)
    {
        if ($this->getTitle(null, $title)) {
            return 0;
        }
        $query = 'INSERT INTO products(title,brand,category,supplier,cost,profit,quantity,stock) VALUES(:title,:brand,:category,:supplier,:cost,:profit,:quantity,:stock)';
        $params = array(
            ':title' => $title,
            ':brand' => $brand,
            ':category' => $category,
            ':supplier' => $supplier,
            ':cost' => $cost,
            ':profit' => $profit,
            ':quantity' => $quantity,
            ':stock' => $quantity
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function reset($id, $title, $brand, $category, $supplier, $cost, $profit, $quantity)
    {
        if ($this->getTitle($id, $title)) {
            return 0;
        }
        $query = 'UPDATE products SET brand = :brand, category = :category, supplier = :supplier, title = :title, cost = :cost, profit = :profit, quantity = :quantity, stock = :stock - sold WHERE id = :id';
        $params = array(
            ':id' => $id,
            ':title' => $title,
            ':brand' => $brand,
            ':category' => $category,
            ':supplier' => $supplier,
            ':cost' => $cost,
            ':profit' => $profit,
            ':quantity' => $quantity,
            ':stock' => $quantity
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function status($id, $status)
    {
        $query = 'UPDATE products SET status = :status WHERE id=:id';
        $params = array(
            ':id' => $id,
            ':status' => $status
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function search($label, $status)
    {
        $query = 'SELECT * FROM products WHERE (title LIKE :label OR cost LIKE :label OR profit LIKE :label OR stock LIKE :label OR sold LIKE :label) AND status LIKE :status ORDER BY id DESC';
        $params = array(
            ':label' => '%' . $label . '%',
            ':status' => '%' . $status . '%'
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
class order
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }

    public function getAll()
    {
        $query = 'SELECT * FROM orders ORDER BY id DESC';
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

    public function get($id)
    {
        $query = 'SELECT * FROM orders WHERE id=:id';
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

    public function getMoney($id)
    {
        $query = 'SELECT total,paid FROM orders WHERE id=:id';
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

    public function plusPaid($id, $amount)
    {
        $query = 'UPDATE orders SET paid = paid + :paid WHERE id = :id';
        $params = array(
            ':id' => $id,
            ':paid' => $amount,
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function minusPaid($id, $amount)
    {
        $query = 'UPDATE orders SET paid = paid - :paid WHERE id = :id';
        $params = array(
            ':id' => $id,
            ':paid' => $amount,
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function set($name, $contact, $address, $total, $products, $prices, $quantities)
    {
        $query = 'INSERT INTO orders(name,contact,address,total) VALUES(:name,:contact,:address,:total)';
        $params = array(
            ':name' => $name,
            ':contact' => $contact,
            ':address' => $address,
            ':total' => $total,
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $order = $this->bdd->lastInsertId();
            $item = new item($this->bdd);
            for ($i = 0; $i < count($products); $i++) {
                $item->set($order, $products[$i], $prices[$i], $quantities[$i]);
            }
            return true;
        } else {
            return false;
        }
    }

    public function reset($id, $name, $contact, $address, $total, $products, $prices, $quantities)
    {
        $query = 'UPDATE orders SET name = :name, contact = :contact, address = :address, total = :total WHERE id = :id';
        $params = array(
            ':id' => $id,
            ':name' => $name,
            ':contact' => $contact,
            ':address' => $address,
            ':total' => $total,
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $item = new item($this->bdd);
            $item->clear($id);
            for ($i = 0; $i < count($products); $i++) {
                $item->set($id, $products[$i], $prices[$i], $quantities[$i]);
            }
            return true;
        } else {
            return false;
        }
    }

    public function status($id, $status)
    {
        $query = 'UPDATE orders SET status = :status WHERE id=:id';
        $params = array(
            ':id' => $id,
            ':status' => $status
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $item = new item($this->bdd);
            $item->status($id, $status);
            return true;
        } else {
            return false;
        }
    }

    public function search($label, $status)
    {
        $query = 'SELECT * FROM orders WHERE (name LIKE :label OR contact LIKE :label OR address LIKE :label OR total LIKE :label OR paid LIKE :label) AND status LIKE :status ORDER BY id DESC';
        $params = array(
            ':label' => '%' . $label . '%',
            ':status' => '%' . $status . '%'
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

    public function print($id)
    {
        $query = 'SELECT o.date,o.name, o.contact,o.address,o.total, p.title, i.price, i.quantity, i.total FROM products p,orders o,items i WHERE o.id = i.ordeer AND p.id = i.product AND o.id = :id';
        $params = array(
            ':id' => $id
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $rows = $stmt->fetchAll();
            return $rows;
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

    public function getAll($order)
    {
        $query = 'SELECT * FROM items WHERE ordeer = :order ORDER BY id DESC';
        $params = array(
            ':order' => $order
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

    public function set($order, $product, $price, $quantity)
    {
        $query = 'INSERT INTO items(ordeer,product,price,quantity,total) VALUES(:order,:product,:price,:quantity,:total)';
        $params = array(
            ':order' => $order,
            ':product' => $product,
            ':price' => $price,
            ':quantity' => $quantity,
            ':total' => $quantity * $price
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $Product = new product($this->bdd);
            $Product->setSold($product, $order, $quantity);
            return true;
        } else {
            return false;
        }
    }

    public function status($order, $status)
    {
        $rows = $this->getAll($order);
        $Product = new product($this->bdd);
        for ($i = 0; $i < count($rows); $i++) {
            if ($status === "0") {
                $Product->setStock($rows[$i][2], $rows[$i][4]);
            } else {
                $Product->setSold($rows[$i][2], $order, $rows[$i][4]);
            }
        }
        $query = 'UPDATE items SET status = :status WHERE ordeer=:order';
        $params = array(
            ':order' => $order,
            ':status' => $status
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function quantity($order, $product, $quantity)
    {
        $query = 'UPDATE items SET quantity = :quantity WHERE ordeer=:order AND product=:product';
        $params = array(
            ':order' => $order,
            ':product' => $product,
            ':quantity' => $quantity
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function clear($order)
    {
        $rows = $this->getAll($order);
        $Product = new product($this->bdd);
        for ($i = 0; $i < count($rows); $i++) {
            $Product->setStock($rows[$i][2], $rows[$i][4]);
        }
        $query = 'DELETE FROM items WHERE ordeer = :order';
        $params = array(
            ':order' => $order
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }
}
class payment
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }

    public function getAll($order)
    {
        $query = 'SELECT * FROM payments WHERE ordeer = :order ORDER BY id DESC';
        $params = array(
            ':order' => $order
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

    public function get($id)
    {
        $query = 'SELECT * FROM payments WHERE id=:id';
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

    public function set($order, $amount, $type)
    {
        $Order = new order($this->bdd);
        $row = $Order->getMoney($order);
        if ($row[0] < $row[1] + $amount) {
            return $row[0] - $row[1];
        }
        $query = 'INSERT INTO payments(ordeer,amount,type) VALUES(:order,:amount,:type)';
        $params = array(
            ':order' => $order,
            ':amount' => $amount,
            ':type' => $type
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            $Order->plusPaid($order, $amount);
            return 'true';
        } else {
            return false;
        }
    }

    public function status($id, $order, $status)
    {
        $row = $this->get($id);
        $Order = new order($this->bdd);
        if ($status == "0") {
            $Order->minusPaid($order, $row[2]);
        } else {
            $Order->plusPaid($order, $row[2]);
        }
        $query = 'UPDATE payments SET status = :status WHERE id=:id';
        $params = array(
            ':id' => $id,
            ':status' => $status
        );
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute($params)) {
            return true;
        } else {
            return false;
        }
    }

    public function search($label, $status)
    {
        $query = 'SELECT * FROM payments WHERE (date LIKE :label OR type LIKE :label OR amount LIKE :label) AND status LIKE :status ORDER BY id DESC';
        $params = array(
            ':label' => '%' . $label . '%',
            ':status' => '%' . $status . '%'
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

    public function print($id)
    {
        $query = 'SELECT o.name, o.contact,o.address,o.total,o.paid, p.date, p.type, p.amount FROM payments p,orders o WHERE o.id = p.ordeer AND p.id = :id';
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
}
class report
{
    public $bdd;
    public function __construct($db)
    {
        $this->bdd = $db;
    }

    public function sumMoney()
    {
        $query = 'SELECT SUM(total) FROM orders WHERE status = 1';
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute()) {
            $row = $stmt->fetch();
            return $row;
        } else {
            return false;
        }
    }

    public function paidMoney()
    {
        $query = 'SELECT SUM(paid) FROM orders WHERE status = 1';
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute()) {
            $row = $stmt->fetch();
            return $row;
        } else {
            return false;
        }
    }

    public function currentOrders()
    {
        $query = 'SELECT COUNT(id) FROM orders WHERE status=1';
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute()) {
            $row = $stmt->fetch();
            return $row;
        } else {
            return false;
        }
    }

    public function canceledOrders()
    {
        $query = 'SELECT COUNT(id) FROM orders WHERE status=0';
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute()) {
            $row = $stmt->fetch();
            return $row;
        } else {
            return false;
        }
    }

    public function currentProducts()
    {
        $query = 'SELECT COUNT(id) FROM products';
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute()) {
            $row = $stmt->fetch();
            return $row;
        } else {
            return false;
        }
    }

    public function lowProducts()
    {
        $query = 'SELECT COUNT(id) FROM products WHERE stock <=4';
        $stmt = $this->bdd->prepare($query);
        if ($stmt->execute()) {
            $row = $stmt->fetch();
            return $row;
        } else {
            return false;
        }
    }

    public function performance()
    {
        $query = 'SELECT title,sold,cost,profit FROM products WHERE sold > 0 ORDER BY sold DESC';
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

    public function orders()
    {
        $query = 'SELECT date,name,total,paid,status FROM orders ORDER BY total DESC';
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

    public function products()
    {
        $query = 'SELECT p.title AS title, b.label AS brand, c.label AS category, s.name AS supplier, p.cost AS cost, p.profit AS profit, p.stock AS stock, p.status AS status FROM products p, suppliers s, brands b, categories c WHERE p.brand = b.id AND p.category = c.id AND p.supplier = s.id ORDER BY p.id DESC';
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

    public function suppliers()
    {
        $query = 'SELECT DISTINCT s.name AS name, s.status AS status FROM products p, suppliers s WHERE p.supplier = s.id ORDER BY p.quantity DESC';
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

    public function lowStocks()
    {
        $query = 'SELECT title, stock FROM products WHERE stock <= 4 ORDER BY stock ASC';
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
