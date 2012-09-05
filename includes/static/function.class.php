<?php
/**
 * 静态 function
 */
class static_function {
	
	/**
	 * 获取page URL
	 */
	public static function curPageURL() {
		$pageURL = 'http';

		if (isset($_SERVER["HTTPS"])) {
			if ($_SERVER["HTTPS"] == "on")
				$pageURL .= "s";
		}
		$pageURL .= "://";

		if ($_SERVER["SERVER_PORT"] != "80") {
			$pageURL .= $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"] . $_SERVER["REQUEST_URI"];
		} else {
			$pageURL .= $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
		}
		return $pageURL;
	}

	/**
	 * 获取 URL
	 */
	public static function curURL() {
		$pageURLArr = explode("/", self::curPageURL());
		unset($pageURLArr[count($pageURLArr) - 1]);
		return implode("/", $pageURLArr) . "/";
	}

	/**
	 * 检查文件夹
	 */
	public static function mkdirs($path, $mode = 0777) {
		$dirs = explode('/', $path);
		$pos = strrpos($path, ".");
		if ($pos === false) {
			// note: three equal signs
			// not found, means path ends in a dir not file
			$subamount = 0;
		} else {
			$subamount = 1;
		}

		for ($c = 0; $c < count($dirs) - $subamount; $c++) {
			$thispath = "";
			for ($cc = 0; $cc <= $c; $cc++) {
				$thispath .= $dirs[$cc] . '/';
			}
			// echo $thispath . "<br />";
			if (!file_exists($thispath)) {
				//print "$thispath<br>";
				mkdir($thispath, $mode);
			}
		}
	}
	
	/**
	 * 魔术引号
	 */
	public static function strip_array($var) {
        return is_array($var)? array_map("self::strip_array", $var):addslashes($var);
    }

}
?>