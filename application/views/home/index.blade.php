<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Цитабаза - дай своим любимым цитатам возможность напоминать о себе каждый день</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	{{ HTML::style('css/style.css') }}
	{{ HTML::style('css/bootstrap.css') }}
	{{ HTML::style('css/bootstrap-responsive.css') }}
</head>
<body>
	<!-- <div class="container-fluid wrapper"> -->	
	<div class="wrapper container-fluid">
		<div class="row-fluid">
			<header>
				
			</header>
		</div>

		<div class="row-fluid">
			<div class="login-alert alert alert-error h">
			  <a class="close"  href="#">&times;</a>
			  <span>Что то введено не правильно, попробуйте ещё раз</span>
			</div>
			<div role="main" class="main span12">
				<h1>Добро пожаловать в цитабазу!</h1>
				<div class="row-fluid">
					<div class="span3"></div>
					<div class="span6 quote-block">
						<!--Сюда приходит главный шаблон цитат-->
					</div>
					<div class="span3"></div>
				</div>
			</div>
		</div>

		<footer>
			<small>&copy; Цитабаза {{ date('Y') }}</small>
			<br>
			<small><a target="_blank" href="http://www.nickchernobaev.com">Чернобаев Николай.</a> Сделано с любовью.</small>
		</footer>

		<!-- </div> -->
		<script data-main="js/config" src="js/libs/require.js"></script>
		
		<!-- Бутстрап тесты -->
		<script>
			define('bootstrapData', [], function() {
			    return {
			        user: '215',
			        article: '12512'
			    };
			});
		</script>


		<!-- Yandex.Metrika counter -->
		<script type="text/javascript">
		(function (d, w, c) {
		    (w[c] = w[c] || []).push(function() {
		        try {
		            w.yaCounter19412350 = new Ya.Metrika({id:19412350,
		                    webvisor:true,
		                    clickmap:true,
		                    trackLinks:true,
		                    accurateTrackBounce:true,
		                    trackHash:true});
		        } catch(e) { }
		    });

		    var n = d.getElementsByTagName("script")[0],
		        s = d.createElement("script"),
		        f = function () { n.parentNode.insertBefore(s, n); };
		    s.type = "text/javascript";
		    s.async = true;
		    s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

		    if (w.opera == "[object Opera]") {
		        d.addEventListener("DOMContentLoaded", f, false);
		    } else { f(); }
		})(document, window, "yandex_metrika_callbacks");
		</script>
		<noscript><div><img src="//mc.yandex.ru/watch/19412350" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
		<!-- /Yandex.Metrika counter -->

		<!-- Google analytics -->
		<script type="text/javascript">

		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-29131230-1']);
	      _gaq.push(['_setAllowAnchor', true]);
	      _gaq.push(['_setCampMediumKey', true]);
		  _gaq.push(['_trackPageview']);


			var hashChanged = function() {
				//console.log('hashchange!!!');
			    _gaq.push(['_trackPageview',location.pathname + location.search  + location.hash]);

			};

			//на событии hashchange запускать функцию
			window.onhashchange = hashChanged;


		    (function() {
		   	 	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		   	 	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		   	 	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		 	})();

		</script>

	</div>

</body>
</html>
