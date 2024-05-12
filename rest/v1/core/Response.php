<?php

class Response
{

    private $_success;
    private $_data;
    private $_statusCode;
    private $_toCache = false;
    private $_responseData = array();

    public function setSuccess($success)
    {
        $this->_success = $success;
    }

    public function setData($data)
    {
        $this->_data = $data;
    }

    public function setStatusCode($statusCode)
    {
        $this->_statusCode = $statusCode;
    }

    public function toCache($toCache)
    {
        $this->_toCache = $toCache;
    }

    public function send()
    {
        header("Content-type:application/json;charset=utf-8");

        if ($this->_toCache == true) {
            header("Cache-Control: max-age=60");
        } else {
            header("Cache-Control: no-cache, no-store");
        }

        if ($this->_success === false) {
            // $this->_responseData['data'] = $this->_data;
            $this->_responseData = $this->_data;
        } else {
            // http_response_code($this->_statusCode);
            // $this->_responseData['data'] = $this->_data;
            $this->_responseData = $this->_data;
        }

        echo json_encode($this->_responseData);
    }
}