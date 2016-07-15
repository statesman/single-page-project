<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <?php
  // update these fields
  $meta = array(
    "title" => "Single page project | Statesman.com",
    "description" => "Description for single-page-project.",
    "thumbnail" => "http://projects.statesman.com/site_path/assets/share.jpg",
    "shortcut_icon" => "http://media.cmgdigital.com/shared/media/2015-08-28-16-58-55/web/site/www_mystatesman_com/images/favicon.ico",
    "apple_touch_icon" => "http://media.cmgdigital.com/shared/theme-assets/242014/www.statesman.com_fa2d2d6e73614535b997734c7e7d2287.png",
    "url" => "http://projects.statesman.com/news/single-page-project/",
    "twitter" => "aasinteractive",
    "authors" => array(
        array("name" => "John Doe", "twitter" => "john_doe"),
        array("name" => "Don Joe", "twitter" => "don_joe")
    ),
    "publish_date" => "June 23, 2016",
    "related_story" => array(
        "url" => "http://www.mystatesman.com/news/news/local/jobs-schools-bring-growing-asian-population-north/nrk9D/",
        "headline" => "Jobs, schools bring growing Asian population to Austin area"
    )
  );
?>

  <title>Interactive: <?php print $meta['title']; ?> | Austin American-Statesman</title>
  <link rel="shortcut icon" href="<?php print $meta['shortcut_icon']; ?>" />
  <link rel="apple-touch-icon" href="<?php print $meta['apple_touch_icon']; ?>" />

  <link rel="canonical" href="<?php print $meta['url']; ?>" />

  <meta name="description" content="<?php print $meta['description']; ?>">

  <meta property="og:title" content="<?php print $meta['title']; ?>"/>
  <meta property="og:description" content="<?php print $meta['description']; ?>"/>
  <meta property="og:image" content="<?php print $meta['thumbnail']; ?>"/>
  <meta property="og:url" content="<?php print $meta['url']; ?>"/>

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@<?php print $meta['twitter']; ?>" />
  <meta name="twitter:title" content="<?php print $meta['title']; ?>" />
  <meta name="twitter:description" content="<?php print $meta['description']; ?>" />
  <meta name="twitter:image" content="<?php print $meta['thumbnail']; ?>" />
  <meta name="twitter:url" content="<?php print $meta['url']; ?>" />

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="dist/style.css">

  <link href='http://fonts.googleapis.com/css?family=Lusitana:400,700|Merriweather:400,300,300italic,400italic,700,700italic,900,900italic|Merriweather+Sans:400,300,300italic,400italic,700italic,700,800,800italic' rel='stylesheet' type='text/css'>

  <?php /* CMG advertising and analytics */ ?>
  <?php include "includes/advertising.inc"; ?>
  <?php include "includes/metrics-head.inc"; ?>

</head>
<body>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

        <a class="navbar-brand" href="http://www.statesman.com/" target="_blank">
        <img class="visible-xs visible-sm" width="103" height="26" src="assets/logo-short-black.png" />
        <img class="hidden-xs hidden-sm" width="273" height="26" src="assets/logo.png" />
        </a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="./">Home <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>
        <li class="visible-xs small-social"><a target="_blank" href="https://www.facebook.com/sharer.php?u=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-facebook-square"></i></a><a target="_blank" href="https://twitter.com/intent/tweet?url=<?php echo urlencode($meta['url']); ?>&via=<?php print urlencode($meta['twitter']); ?>&text=<?php print urlencode($meta['title']); ?>"><i class="fa fa-twitter"></i></a><a target="_blank" href="https://plus.google.com/share?url=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-google-plus"></i></a></li>
      </ul>
        <ul class="nav navbar-nav navbar-right social hidden-xs">
          <li><a target="_blank" href="https://www.facebook.com/sharer.php?u=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-facebook-square"></i></a></li>
          <li><a target="_blank" href="https://twitter.com/intent/tweet?url=<?php echo urlencode($meta['url']); ?>&via=<?php print urlencode($meta['twitter']); ?>&text=<?php print urlencode($meta['title']); ?>"><i class="fa fa-twitter"></i></a></li>
        </ul>
    </div>
  </div>
</nav>

  <article class="container">

    <div class="row">
      <div class="col-lg-12 interative-header">
      <h1 id="pagetitle">Title</h1>
      <p class="author">By <?php $len = count($meta['authors']) - 1; foreach($meta['authors'] as $i => $row) { print "<a href='http://twitter.com/" . $row['twitter'] . "'>" . $row['name'] . "</a>"; if ($i !== $len) print " and "; }?>
      <br>
      Published <?php print $meta['publish_date']; ?></p>
      <p>Lucas ipsum dolor sit amet boba calrissian amidala sith dooku solo moff organa obi-wan windu. Gamorrean binks wedge darth. Mon darth mon kit ponda solo. Moff watto ackbar mothma moff anakin. Lando skywalker lars fett calrissian lars organa. Organa kenobi wedge darth jawa skywalker anakin. Twi'lek kit darth calamari lando kamino droid. Darth jawa fett grievous maul. Palpatine obi-wan leia tusken raider dagobah. Twi'lek qui-gon boba antilles yoda thrawn. Wampa luuke wampa skywalker. Moff ponda ackbar dagobah kit lobot jinn solo.</p>
      <?php if ($meta['related_story'])
        print "<p class='bold'>Read more: <a href='" . $meta['related_story']['url'] . "' target='_blank'>" . $meta['related_story']['headline'] . " &raquo;</a></p>"
      ?>
      </div>
    </div>


  </article>

    <!-- bottom matter -->
    <?php include "includes/banner-ad.inc";?>
    <?php include "includes/legal.inc";?>
    <?php include "includes/project-metrics.inc"; ?>
    <?php include "includes/metrics.inc"; ?>

    <script src="dist/scripts.js"></script>

  <?php if($_SERVER['SERVER_NAME'] === 'localhost'): ?>
    <script src="//localhost:35729/livereload.js"></script>
  <?php endif; ?>
</body>
</html>
