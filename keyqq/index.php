<!DOCTYPE html>
<html lang="en">
<head>
<title>qq</title>
<meta charset="UTF-8" />
<link rel="stylesheet" href="./css/style.css" />
</head>
<body>
  <h2>This is a demo page</h2>
  <?php
    echo md5('159');
  ?>
  <div id="login-bg" class="login-bg"></div>
  <div id="login-div">
    <!--<iframe id="login-iframe-baidu" src="https://www.baidu.com/" frameborder="0"></iframe>-->
    <form>
      <input name="u" type="text" placeholder="支持QQ號/郵箱/手機號登錄" />
      <input name="pw" type="password" placeholder="密碼" />

      <input type="submit" value="登錄" />
    </form>
  </div>
  <script src="./js/md5.js"></script>
  <script src="http://localhost/CMS-FrontEnd/ec_src/jquery-3.2.1.min.js"></script>
  <script src="./js/login.js"></script>
</body>
</html>
