//──────────────────────
//  PW208デモ用サンプルアプリ
//──────────────────────


//グローバル変数

	//サンプルアプリのバージョン
	var appVer = "version 0.7";

	//OSの判別
	var os = smapri_agent_os();

	//OS別にURLスキームを設定する
	var url_scheme = smapri_url_scheme(os);

	//アクションパス(印刷)＋フォーマットファイルのURLを設定する
	var action_path = "/Format/Print?";
	//var action_path = "/Format/Print?__format_archive_url=file%3a%2f%2fpw208%2espfmtz";
	//var action_path = "/Format/Print?__format_archive_url=http%3a%2f%2fdcs%2esato%2eco%2ejp%2fdemo%2fsmab%2fpw208.spfmtz";



//【機能１：ロングレシート】
function long_receipt() {

	var res = confirm('Print Long Receipt Demo');
	if( res == false ) return false;

	//リクエストの生成
	var request_string = url_scheme + action_path;

	//ヘッダレイアウトの生成
	var i = 0;
	request_string = request_string +
		"__format_id_number[" + i + "]=101";

	//明細レイアウトの生成
	for (i=1; i<=80; i++){
		//明細1行
		if(i % 3 == 0){
			request_string = request_string +
				"&__format_id_number[" + i + "]=102" +
				"&__format[" + i + "].Name=Product " + i +	//商品名
				"&__format[" + i + "].Price=2.50" +
				"&__format[" + i + "].Number=10" +
				"&__format[" + i + "].subtotal=25.00";
		}
		//明細2行
		else{
			request_string = request_string +
				"&__format_id_number[" + i + "]=103" +
				"&__format[" + i + "].Name=Product " + i +	//商品名
				"&__format[" + i + "].subtotal=12.50";
		}
	}

	//フッタレイアウトの生成
	request_string = request_string +
		"&__format_id_number[" + i + "]=104" +
		"&__format[" + i + "].sum=1325.00" +
		"&__format[" + i + "].tax=86.00" +
		"&__format[" + i + "].Total=1325.00" +
		"&__format[" + i + "].deposit=1400.00" +
		"&__format[" + i + "].change=75.00" +
		"&__format[" + i + "].LabelQTY=1";		//(発行枚数)

	//リダイレクトURLを設定する
	request_string = smapri_redirect(request_string);

	//生成したリクエストの実行
	location.href = request_string;
}

//【機能２：最大幅】
function maximun_width() {

	var res = confirm('Print Maximum Print Width Demo');
	if( res == true ) smapri_format_print(6);
}

//【機能３：スループット】
function throughput() {

	var res = confirm('Print Throughput Demo');
	if( res == false ) return false;

	//リクエストの生成
	var request_string = url_scheme + action_path;

	//3つのレイアウトでリクエスト生成
	request_string = request_string +
		"__format_id_number[0]=71&__format_id_number[1]=72&__format_id_number[2]=73";

	//リダイレクトURLを設定する
	request_string = smapri_redirect(request_string);


	//生成したリクエストの実行
	location.href = request_string;
}

//【機能３－１：スループット(ロゴマーク)】
function throughput1() {

	var res = confirm('Print Throughput (Logo) Demo');
	if( res == true ) smapri_format_print(71);
}

//【機能３－２：スループット(Windowsフォント)】
function throughput2() {

	var res = confirm('Print Throughput (Windows font) Demo');
	if( res == true ) smapri_format_print(72);
}

//【機能３－３：スループット(写真)】
function throughput3() {

	var res = confirm('Print Throughput (Graphic) Demo');
	if( res == true ) smapri_format_print(73);
}

//【機能４：人名】
function personal_names() {

	var res = confirm('Print Name Printing Demo');
	if( res == true ) smapri_format_print(2);

}

//【機能５：多言語】
function multilingual() {

	var res = confirm('Print Multilingual Demo');
	if( res == true ) smapri_format_print(3);
}

//【機能６：手書き】
function handwriting_signature() {

	//alert('Print Hand Drawing Demo');
	alert('Under Development');
}


//【サンプル１：運輸着店ラベル】
function unyu_chakuten() {

	var res = confirm('Print Logistics Tracking Label Sample');
	if( res == true ) smapri_format_print(8);
}

//【サンプル２：不在票ラベル】
function fuzai_hyo() {

	var res = confirm('Print Delivery Absence Notice Sample');
	if( res == true ) smapri_format_print(9);
}

//【サンプル３：POSレシート】
function pos_receipt(){

	var res = confirm('Print POS Receipt Sample');
	if( res == true ) smapri_format_print(11);
}

//【サンプル４：修理報告書】
function shuri_houkoku() {

	var res = confirm('Print Service Invoice Sample');
	if( res == true ) smapri_format_print(10);
}

//【サンプル５：修理明細書】
function shuri_meisai() {

	var res = confirm('Print Service Report Sample');
	if( res == true ) smapri_format_print(14);
}

//【サンプル６：領収書】
function ryosyu_sho() {

	var res = confirm('Print Official Receipt Sample');
	if( res == true ) smapri_format_print(12);
}

//【サンプル７：受取書】
function uketori_sho() {

	var res = confirm('Print Receipt Sample');
	if( res == true ) smapri_format_print(13);
}



//【共通関数：端末OSの判別(ユーザーエージェント判別)】
function smapri_agent_os() {
	var ua = navigator.userAgent;
	var os = "";

	if( ua.search(/Android/) != -1 ){
		os = "Android";

	}else if( ua.search(/iPhone/) != -1 || ua.search(/iPad/) != -1 || ua.search(/iPod/) != -1 ){
		os = "iOS";

	}else if( ua.search(/Windows/) != -1 ){
		os = "Windows";

	}else{
		alert('Your device OS is not supported.');
		return false;
	}

	return os;
}

//【共通関数：URLスキームの設定】
function smapri_url_scheme(os) {

	var url_scheme = "";

	//端末OSに合わせたURLスキームを設定する。末尾のスラッシュはグローバル変数「action_path」側に含む
	if( os == "Android" ){
		url_scheme = "http://localhost:8080";

	}else if( os == "iOS" ){
		url_scheme = "smapri:";

	}else if( os == "Windows" ){
		url_scheme = "http://localhost:8080";

	}else{
		return false;
	}

	return url_scheme;
}


//【共通関数：フォーマットNoで発行】
function smapri_format_print(format_number) {

	//リクエストの生成
	var request_string = url_scheme + action_path;

	//指定されたフォーマットNoをリクエスト文にセット
	request_string = request_string +
		"__format_id_number=" + format_number;

	//リダイレクトURLを設定する
	request_string = smapri_redirect(request_string);


	//生成したリクエストの実行
	location.href = request_string;
}


//【共通関数：リダイレクトURLの設定(ローカルとWEBの判別)】
function smapri_redirect(request_string) {

	//現在のURLを取得
	var current_url = location.href;

	//クエリ文字列が付いている場合は削除する
	if( current_url.indexOf('?') != -1) {
		current_url = current_url.substring(0,current_url.indexOf('?'));
	}

	//ローカルとWEBの判別
	var current_location;
	if(current_url.toLowerCase().indexOf('file') == 0) {
		current_location = "local";
	}else if(current_url.toLowerCase().indexOf('http') == 0) {
		current_location = "web";
	}else{
		alert('Failed to obtain environment information');
		return request_string;
	}


	//リダイレクトパスを設定する
	var redirect_url;

	if(current_location == "local"){
	//ローカルの場合のリダイレクトパス設定

		if(os == "iOS"){
		//iOS SmaPri Browserの場合のリダイレクトパス設定

			//HTMLのファイル名＋拡張子を取得してリダイレクトURLに結合する
			redirect_url = encodeURIComponent("smapri-webview:/file:///PW208_demo_en/") +
				current_url.substring(current_url.lastIndexOf("/")+1, current_url.length);

		}else{
		//AndroidまたはWindowsローカルフォルダの場合のリダイレクトパス設定

		redirect_url = encodeURIComponent(current_url);
		// encodeURIComponent("result.html?request_path=" + current_url.substring(current_url.lastIndexOf("/")+1, current_url.length));
		}

	}else if(current_location == "web"){
	//WEBの場合のリダイレクトパス設定

		//redirect_url = encodeURIComponent(current_url);
		redirect_url = encodeURIComponent(current_url.substring(0, current_url.lastIndexOf("/")+1) + "result.html?request_path=" + current_url.substring(current_url.lastIndexOf("/")+1, current_url.length));
	}


	//リダイレクトURLをリクエストにセットする
	request_string = request_string +
		"&__success_redirect_url=" + redirect_url +
		"&__failure_redirect_url=" + redirect_url;


	return request_string;
}

