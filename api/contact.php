<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

function respond(int $status, array $payload): never {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Method not allowed.']);
}

$contentType = strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]));
if ($contentType !== 'application/json') {
    respond(415, ['success' => false, 'message' => 'Unsupported request format.']);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    respond(400, ['success' => false, 'message' => 'Please check the form and try again.']);
}

// A hidden honeypot catches simple automated submissions.
if (trim((string)($data['website'] ?? '')) !== '') {
    respond(200, ['success' => true]);
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$division = trim((string)($data['division'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

$allowedDivisions = [
    'Engineering & Infrastructure',
    'Information & Communication Technology',
    'Trading & International Trade',
    'Consultancy & Advisory',
    'Projects & Partnerships',
    'General enquiry',
];

if ($name === '' || strlen($name) > 120 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254 ||
    strlen($phone) > 60 ||
    !in_array($division, $allowedDivisions, true) ||
    $message === '' || strlen($message) > 8000) {
    respond(422, ['success' => false, 'message' => 'Please check the required fields and try again.']);
}

// Basic session-based rate limit to reduce repeated submissions.
session_start();
$now = time();
if (isset($_SESSION['cmgl_contact_last']) && ($now - (int)$_SESSION['cmgl_contact_last']) < 20) {
    respond(429, ['success' => false, 'message' => 'Please wait a moment before sending another enquiry.']);
}
$_SESSION['cmgl_contact_last'] = $now;
session_write_close();

$recipient = 'info@cmgl-x.com';
$subject = 'CMGL website enquiry - ' . $division;
$body = "A new enquiry was submitted through the CMGL website.\n\n"
    . "Name: {$name}\n"
    . "Email: {$email}\n"
    . "Phone: " . ($phone !== '' ? $phone : 'Not provided') . "\n"
    . "Area of interest: {$division}\n\n"
    . "Message:\n{$message}\n";

$headers = [
    'From: CMGL Website <info@cmgl-x.com>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];

$sent = mail($recipient, $subject, $body, implode("\r\n", $headers));
if (!$sent) {
    error_log('CMGL website contact form: PHP mail() failed.');
    respond(500, ['success' => false, 'message' => 'We could not send your enquiry right now. Please email info@cmgl-x.com directly.']);
}

respond(200, ['success' => true]);
