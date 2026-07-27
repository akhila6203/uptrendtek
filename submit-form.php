<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| RESPONSE CONFIGURATION
|--------------------------------------------------------------------------
*/

header("Content-Type: application/json; charset=UTF-8");
header("X-Content-Type-Options: nosniff");

/*
|--------------------------------------------------------------------------
| ALLOW ONLY POST REQUEST
|--------------------------------------------------------------------------
*/

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Only POST requests are allowed."
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| EMAIL CONFIGURATION
|--------------------------------------------------------------------------
|
| Ee email ki Contact page and all Service pages data vastundi.
|
*/

$recipientEmail = "hr@uptrendtllc.com";
$websiteName = "UpTrendTek";

/*
|--------------------------------------------------------------------------
| HELPER FUNCTIONS
|--------------------------------------------------------------------------
*/

function cleanInput(?string $value): string
{
    $value = trim((string) $value);
    $value = strip_tags($value);

    return preg_replace('/[\x00-\x1F\x7F]/u', '', $value) ?? "";
}

function cleanMessage(?string $value): string
{
    $value = trim((string) $value);
    $value = strip_tags($value);

    return preg_replace("/\r\n|\r|\n/", PHP_EOL, $value) ?? "";
}

function jsonError(string $message, int $statusCode = 422): void
{
    http_response_code($statusCode);

    echo json_encode([
        "success" => false,
        "message" => $message
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| GET FORM VALUES
|--------------------------------------------------------------------------
*/

$name = cleanInput($_POST["name"] ?? "");
$email = cleanInput($_POST["email"] ?? "");
$phone = cleanInput($_POST["phone"] ?? "");
$subject = cleanInput($_POST["subject"] ?? "");
$service = cleanInput($_POST["service"] ?? "");
$message = cleanMessage($_POST["message"] ?? "");
$pageUrl = cleanInput($_POST["page_url"] ?? "");
$formSource = cleanInput($_POST["form_source"] ?? "");

/*
|--------------------------------------------------------------------------
| HONEYPOT SPAM PROTECTION
|--------------------------------------------------------------------------
|
| Website field normal users ki kanipinchadu.
| Bot fill chesthe submission silently reject chestundi.
|
*/

$website = cleanInput($_POST["website"] ?? "");

if ($website !== "") {
    echo json_encode([
        "success" => true,
        "message" => "Thank you! Your message has been submitted successfully."
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| SERVER-SIDE VALIDATION
|--------------------------------------------------------------------------
*/

if (mb_strlen($name) < 2 || mb_strlen($name) > 100) {
    jsonError("Please enter a valid name.");
}

if (
    $email === "" ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    mb_strlen($email) > 150
) {
    jsonError("Please enter a valid email address.");
}

$phoneDigits = preg_replace("/\D/", "", $phone);

if (
    $phone === "" ||
    !preg_match('/^[+\d\s()\-]+$/', $phone) ||
    strlen((string) $phoneDigits) < 10 ||
    strlen((string) $phoneDigits) > 15
) {
    jsonError("Please enter a valid phone number.");
}

if (mb_strlen($subject) < 3 || mb_strlen($subject) > 180) {
    jsonError("Please enter a valid subject.");
}

if (mb_strlen($message) < 10 || mb_strlen($message) > 5000) {
    jsonError("Please enter a message between 10 and 5000 characters.");
}

if (mb_strlen($service) > 150) {
    jsonError("Invalid service selected.");
}

/*
|--------------------------------------------------------------------------
| DETERMINE FORM SOURCE
|--------------------------------------------------------------------------
*/

if ($formSource === "") {
    $formSource = $service !== ""
        ? "Service Detail Page"
        : "Contact Page";
}

if ($service === "") {
    $service = "General Enquiry";
}

if ($pageUrl === "") {
    $pageUrl = $_SERVER["HTTP_REFERER"] ?? "Not available";
}

/*
|--------------------------------------------------------------------------
| SAFE EMAIL SUBJECT
|--------------------------------------------------------------------------
|
| Header injection avoid cheyadaniki line breaks remove chestunnam.
|
*/

$safeSubject = str_replace(
    ["\r", "\n"],
    "",
    $subject
);

$emailSubject =
    "[UpTrendTek Website] " .
    $safeSubject .
    " - " .
    $service;

/*
|--------------------------------------------------------------------------
| EMAIL BODY
|--------------------------------------------------------------------------
*/

$emailBody = "
A new enquiry has been submitted from the UpTrendTek website.

--------------------------------------------------
FORM DETAILS
--------------------------------------------------

Form Source : {$formSource}
Service     : {$service}
Name        : {$name}
Email       : {$email}
Phone       : {$phone}
Subject     : {$subject}

--------------------------------------------------
MESSAGE
--------------------------------------------------

{$message}

--------------------------------------------------
PAGE INFORMATION
--------------------------------------------------

Submitted Page : {$pageUrl}
Submitted Date : " . date("d M Y, h:i A") . "
IP Address     : " . ($_SERVER["REMOTE_ADDR"] ?? "Unknown") . "

--------------------------------------------------
This message was sent from the UpTrendTek website.
";

/*
|--------------------------------------------------------------------------
| EMAIL HEADERS
|--------------------------------------------------------------------------
|
| From header lo visitor email direct ga use cheyyakandi.
| Hosting domain email ni From ga use chesthe deliverability better.
|
| no-reply@uptrendtllc.com hosting lo create cheyyagaligithe better.
|
*/

$fromEmail = "no-reply@uptrendtllc.com";

$headers = [];

$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "From: {$websiteName} Website <{$fromEmail}>";
$headers[] = "Reply-To: {$name} <{$email}>";
$headers[] = "X-Mailer: PHP/" . phpversion();

/*
|--------------------------------------------------------------------------
| SEND EMAIL
|--------------------------------------------------------------------------
*/

$mailSent = mail(
    $recipientEmail,
    $emailSubject,
    $emailBody,
    implode("\r\n", $headers)
);

if (!$mailSent) {
    error_log(
        "UpTrendTek contact email failed. " .
        "Name: {$name}, Email: {$email}, Service: {$service}"
    );

    jsonError(
        "Unable to send your message right now. Please try again later.",
        500
    );
}

/*
|--------------------------------------------------------------------------
| SUCCESS RESPONSE
|--------------------------------------------------------------------------
*/

echo json_encode([
    "success" => true,
    "message" => "Thank you! Your message has been sent successfully."
]);

exit;