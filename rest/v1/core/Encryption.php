<?php
class Encryption
{
    public function doHash($plainPassword)
    {
        return hash('sha256', $plainPassword);
    }

    public function doPasswordHash($plainPassword)
    {
        return password_hash($plainPassword, PASSWORD_DEFAULT);
    }
}