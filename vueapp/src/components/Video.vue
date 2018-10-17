<template>
  <div class='video-container'>
    <iframe
      src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F351745441591589%2Fvideos%2F249324349090933%2F&show_text=0&width=560"
      width="400"
      height="280"
      style="border:none;overflow:hidden"
      scrolling="no"
      frameborder="0"
      allowTransparency="true"
      allowFullScreen="true"
      autoplay="true">
    </iframe>
  </div>
<!--   <div id="fb-root"></div>
  <script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.5";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));</script>
  <h1>My Video Player</h1>
  <div class="fb-video"
    data-href="https://www.facebook.com/FacebookDevelopers/posts/10151471074398553"
    data-width="500"
    data-allowfullscreen="true"></div> -->
</template>

<style>
.video-container {
  max-width: 100%;
}

iframe {
  max-width: 90%;
}
</style>
