<?php

Class User{
    public $user_aid;
    public $user_is_active;
    public $user_name;
    public $user_email;
    public $user_password;
    public $user_key;
    public $user_created;
    public $user_datetime;
    public $lastInsertedId;

    public $user_search;

    public $connection;
    public $tblUser;

    public function __construct($db){
        $this->connection = $db;
        $this->tblUser = "user";
    }

    public function create() {
        try {
            $sql = "insert into {$this->tblUser} ";
            $sql .= "( user_name, ";
            $sql .= "user_email, ";
            // $sql .= "user_password, ";
            $sql .= "user_is_active, ";
            $sql .= "user_key, ";
            $sql .= "user_created, ";
            $sql .= "user_datetime ) values ( ";
            $sql .= ":user_name, ";
            $sql .= ":user_email, ";
            // $sql .= ":user_password, ";
            $sql .= ":user_is_active, ";
            $sql .= ":user_key, ";
            $sql .= ":user_created, ";
            $sql .= ":user_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_name" => $this->user_name,
                "user_email" => $this->user_email,
                // "user_password" => $this->user_password,
                "user_is_active" => $this->user_is_active,
                "user_key" => $this->user_key,
                "user_created" => $this->user_created,
                "user_datetime" => $this->user_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) { $query = false; }

        return $query;
    }
public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblUser} ";
            $sql .= "order by user_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) { $query = false; }
        return $query;
    }


    public function delete()
    {
        try {
            $sql = "delete from {$this->tblUser} ";
            $sql .= "where user_aid = :user_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_aid" => $this->user_aid,
            ]);
        } catch (PDOException $ex) { $query = false; }
        return $query;
    }
public function update()
    {
        try {
            $sql = "update {$this->tblUser} set ";
            $sql .= "user_name = :user_name, ";
            $sql .= "user_datetime = :user_datetime ";
            $sql .= "where user_aid  = :user_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_name" => $this->user_name,
                "user_datetime" => $this->user_datetime,
                "user_aid" => $this->user_aid,
            ]);
        } catch (PDOException $ex) { $query = false; }
        return $query;
    }


    public function active()
    {
        try {
            $sql = "update {$this->tblUser} set ";
            $sql .= "user_is_active = :user_is_active, ";
            $sql .= "user_datetime = :user_datetime ";
            $sql .= "where user_aid  = :user_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_is_active" => $this->user_is_active,
                "user_datetime" => $this->user_datetime,
                "user_aid" => $this->user_aid,
            ]);
        } catch (PDOException $ex) { $query = false; }
        return $query;
    }

    // read login
    public function readLogin()
    {
        try {
            $sql = "select user_aid, ";
            $sql .= "user_is_active, ";
            $sql .= "user_name, ";
            $sql .= "user_email, ";
            $sql .= "user_password ";
            $sql .= "from {$this->tblUser} ";
            $sql .= "where user_email like :user_email ";
            $sql .= "and user_is_active = 1 ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_email" => $this->user_email,
            ]);
        } catch (PDOException $ex) { $query = false; }
        return $query;
    }

    // read key
    public function readKey()
    {
        try {
            $sql = "select user_key from {$this->tblUser} ";
            $sql .= "where user_key = :user_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_key" => $this->user_key,
            ]);
        } catch (PDOException $ex) { $query = false; }
        return $query;
    }

    // set password
    public function setPassword()
    {
        try {
            $sql = "update {$this->tblUser} set ";
            $sql .= "user_password = :user_password, ";
            $sql .= "user_key = '', ";
            $sql .= "user_datetime = :user_datetime ";
            $sql .= "where user_key  = :user_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_password" => $this->user_password,
                "user_datetime" => $this->user_datetime,
                "user_key" => $this->user_key,
            ]);
        } catch (PDOException $ex) { $query = false; }
        return $query;
    }

    // reset password
    public function resetPassword()
    {
        try {
            $sql = "update {$this->tblUser} set ";
            $sql .= "user_key = :user_key, ";
            $sql .= "user_datetime = :user_datetime ";
            $sql .= "where user_email  = :user_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_key" => $this->user_key,
                "user_datetime" => $this->user_datetime,
                "user_email" => $this->user_email,
            ]);
        } catch (PDOException $ex) { $query = false; }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblUser} ";
            $sql .= "where user_name like :user_name ";
            $sql .= "order by user_is_active desc, ";
            $sql .= "user_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_name" => "%{$this->user_search}%",
            ]);
        } catch (PDOException $ex) { $query = false; }
        return $query;
    }
}