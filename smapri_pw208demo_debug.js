//──────────────────────
//  PW208デモ用サンプルアプリ 開発用
//  PW208 demo sample app - debugger
//──────────────────────


//【開発用：現在のURLを取得】
//Debug: obtain current URL
function current_url() {

	//現在のURLを取得
	//Obtain current URL
	var current_url = location.href;

	//テキストエリアに表示する
	//Display the URL
	document.getElementById('text_area').value = decodeURIComponent(current_url);

}

//【開発用：現在のプラットフォームを取得】
//Debug: obtain platform
function current_platform() {

	//現在のプラットフォームを取得
	//Obtain platform
	var current_platform = "navigator.platform\n" + navigator.platform +
			 "\n\nnavigator.product\n" + navigator.product +
			 "\n\nnavigator.language\n" + navigator.language +
			 "\n\nnavigator.appName\n" + navigator.appName +
			 "\n\nnavigator.appVersion\n" + navigator.appVersion +
			 "\n\nnavigator.userAgent\n" + navigator.userAgent;

			// "\n\nnavigator.battery\n" + navigator.battery +
			// "\n\nnavigator.oscpu\n" + navigator.oscpu +
			// "\n\nnavigator.systemLanguage\n" + navigator.systemLanguage +
			// "\n\nnavigator.userLanguage\n" + navigator.userLanguage +
	

	//テキストエリアに表示する
	//Display the platform
	document.getElementById('text_area').value = decodeURIComponent(current_platform);

}
