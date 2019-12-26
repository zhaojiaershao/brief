<?php

// 1.数据 email 
// 2.验证数据
// 33.发送邮件
// 4.返回结果
// 参数：email
// 返回值：1：邮箱格式问题  2.发送失败  3.发送成功

$userEmail = @$_POST['email'];
$userText = @$_POST['text'];
$userName = @$_POST['name'];
if (!preg_match('/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/', $userEmail)) {
    echo 1;
    exit();
}
include_once '../email/class.phpmailer.php';
include_once '../email/class.smtp.php';

$email = new PHPMailer();  // 定义一个很多对象的邮件变量函数                   new 实例化$eamil类，这个类里面有很多方法   PHPMailer是一个用于发送电子邮件的PHP函数包。

$email->SMTPDebug = false;           //  是否显示发送过程中的信息                     false 是不用返回值 不输出值     TRUE  是会输出文档信息
$email->IsSMTP();
$email->isHTML(true);
$email->SMTPAuth = TRUE;
$email->Host = 'smtp.163.com';                  //需要发送邮件的主机       通常是smtp.xx.com  xx代表qq，163,126；
$email->Username = 'zhaojiaershao123@163.com';      //发送邮箱的账号
$email->Password = 'zhao123456';                    // 授权码 在邮箱里面设置  密码
$email->From = 'zhaojiaershao123@163.com';            //从哪里发送
$email->CharSet = 'utf-8';
$email->AddAddress($userEmail);              //接收邮件的地址

$email->Subject = '验证码';                       //邮件标题
$email->Body = "邮箱为：" . $userEmail . ",姓名：" . $userName . "向你发送了：" . "<b>" . $userText . "</b>";                        //邮件内容                                   //邮件内容             
$bool = @$email->send();
if ($bool) {
    echo 3;
} else {
    echo 2;
}
