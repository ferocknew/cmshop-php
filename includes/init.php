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
$url = defined('ADMIN_DIR') ? str_replace(ADMIN_DIR . "/", "", static_function::curURL()) : static_function::curURL();
define('ROOT_URL', $url);

// 处理'引号
if (!get_magic_quotes_gpc()) {
	$_GET = static_function::strip_array($_GET);
	$_POST = static_function::strip_array($_POST);
	$_COOKIE = static_function::strip_array($_COOKIE);
}

$templates = defined('ADMIN_DIR') ? ROOT_PATH . ADMIN_DIR . '/templates' : ROOT_PATH . '/templates';
$compiled = defined('ADMIN_DIR') ? ROOT_PATH . 'temp/compiled/' . ADMIN_DIR : ROOT_PATH . 'temp/compiled/';
if (!is_dir($compiled))//用于 SEO 优化
	static_function::mkdirs($compiled);

base_cmshop::smarty() -> template_dir = $templates;
base_cmshop::smarty() -> compile_dir = $compiled;
base_cmshop::smarty() -> assign('root_url', ROOT_URL);
if (DEBUG_MODE) {
	error_reporting(E_ALL ^ E_NOTICE);
} else {
	error_reporting(0);
}
?>