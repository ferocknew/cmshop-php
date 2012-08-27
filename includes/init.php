<?php
/*!
 * CMShop
 * https://code.google.com/p/cmshop-php/
 *
 * Copyright 2012
 * @author	Jonah.Fu (JianZhe)
 * @author	Wind.Wang
 * @author	doocal
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://code.google.com/p/cmshop-php/
 *
 * Date: Wed Aug 22 16:14:11 2012 +0800
 */

define('IN_CMSHOP', TRUE);
if (!defined('IN_CMSHOP')) {
	die('Hacking attempt');
}

// 取得当前所在的根目录
define('ROOT_PATH', str_replace('includes/init.php', '', str_replace('\\', '/', __FILE__)));

// 服务器环境配置
ini_set('memory_limit', '512M');
require (ROOT_PATH . 'includes/config.php');

/**
 * @author  jonah.fu
 * @date    2012-03-28
 */
include ROOT_PATH . '/includes/base/autoload.class.php';
base_autoloader::init();

// 挂载常量文件
include ROOT_PATH . '/includes/inc_constant.php';

if (DEBUG_MODE) {
	error_reporting(E_ALL ^ E_NOTICE);
} else {
	error_reporting(0);
}
?>