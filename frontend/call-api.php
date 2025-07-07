<?php
// call-api.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Get user message from frontend (JS)
$input = json_decode(file_get_contents("php://input"), true);
$userMessage = $input["message"] ?? "Hello";

// ✅ Add your real OpenAI API key below
$apiKey = "sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXX"; // 🔒 Replace this with your API key

// Request payload
$data = [
    "model" => "gpt-3.5-turbo",
    "messages" => [
        ["role" => "user", "content" => $userMessage]
    ],
    "temperature" => 0.7,
    "max_tokens" => 150
];

// CURL setup
$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

// Execute & handle
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Output the API result or error
if ($response === false || $httpCode !== 200) {
    echo json_encode([
        "error" => $error ?: "Invalid response from API.",
        "httpCode" => $httpCode,
        "response" => $response
    ]);
} else {
    echo $response;
}
?>
