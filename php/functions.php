<?php

$url="https://pixabay.com/en/editors_choice/" . rand(0,10);

$agent= 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_VERBOSE, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT, $agent);
curl_setopt($ch, CURLOPT_URL,$url);
$result=curl_exec($ch); 

$dom = new DOMDocument;
libxml_use_internal_errors(true);
$dom->loadHTML($result);
$xpath = new DOMXPath($dom);
$els = $xpath->query('//a[@class="fileThumb"]');
$numberOfImages = $xpath->query('//*[@class="fileThumb"]')->length;
$el = $els->item(rand(1, $numberOfImages));
$img_url = 'http:' . $el->getAttribute('href');

$type = pathinfo($img_url, PATHINFO_EXTENSION);
$data = file_get_contents($img_url);
$imgBase64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
$videoBase64 = 'data:video/' . $type . ';base64,' . base64_encode($data);

$imgSrc = '<img src="' . $base64 . '" style="width:100%;height:100%;border:0;margin:0"></img>';
$videoSrc = '<video loop="true" controls="true" autoplay="true" src="' . $videoBase64 . '" style="width:100%;height:100%;border:0;margin:0"></video>';;
$bgImg = '';

// echo $numberOfPages;
// echo 'Videos on page 1: ' . $numberOfImages;

if ($type == "gif") {
    $bgImg = $imgBase64;
}

?>