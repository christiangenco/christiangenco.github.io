$(document).ready(function() {
    $("#emailListSignupForm").submit(function(e) {
      console.log('submitting');
      e.preventDefault();

      var $form = $(this),
        url = $form.attr('action');
      params = {
        name: $form.find('input[name="name"]').val(),
        email: $form.find('input[name="email"]').val(),
        list: $form.data().listId,
        boolean: true
      }

      window.message = function(text, color){
        $("#status").css("color", color).text(text);
      }

      $form.find('input').attr("disabled", "disabled");
      message('signing up...', 'blue');

      $.post(url, params,
        function(data) {
          console.dir(data);
          if (data) {
            $form.find('input').removeAttr("disabled");

            if (data == "Some fields are missing.") {
              message("Please fill in your name and email.", "red");
            } else if (data == "Invalid email address.") {
              message("Uhoh - that doesn't look like an email address. Could you please enter your email again?", "red");
            } else if (data == "Invalid list ID.") {
              message("Oops - something went wrong (I tried to sign you up for an email list that doesn't exist). To get added, send me an email at christian@gen.co instead!", "red");
            } else if (data == "Already subscribed.") {
              message("You're already subscribed!", "green");
            } else {
              $("#status").text("You're subscribed!");
              $("#status").css("color", "green");
              $form.find('input, button').hide();
            }
          } else {
            alert("Sorry, unable to subscribe. Please try again later!");
            message("Oops - something went wrong (my email list server just had an error). To get added, send me an email at christian@gen.co instead!", "red");
          }
        }
      );
    });
});

// analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-36669952-2', 'auto');
ga('send', 'pageview');
