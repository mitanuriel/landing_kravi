<?php
// Enable error reporting for development (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type for JSON response
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Check if all required fields are present
$required_fields = ['inquiry-type', 'name', 'email', 'message'];
foreach ($required_fields as $field) {
    if (!isset($_POST[$field]) || empty(trim($_POST[$field]))) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing required field: ' . $field]);
        exit();
    }
}

// Sanitize and validate the inputs
$inquiry_type = htmlspecialchars(trim($_POST['inquiry-type']));
$name = htmlspecialchars(trim($_POST['name']));
$email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
$subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';
$message = htmlspecialchars(trim($_POST['message']));

// Validate email
if (!$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Map inquiry types to subject lines
$subject_mapping = [
    'collaboration' => 'Collaboration Inquiry',
    'demo' => 'Demo Request',
    'thesis' => 'Thesis Opportunity Inquiry',
    'career' => 'Career Inquiry',
    'other' => 'General Inquiry'
];

// Set subject based on inquiry type
$email_subject = $subject_mapping[$inquiry_type] ?? 'Website Contact Form';
if (!empty($subject)) {
    $email_subject .= ' - ' . $subject;
}

// Recipient email address
$to = "info@kravianalytics.com";

// Construct the email body
$email_body = "You have received a new message from the Kravi Analytics website contact form.\n\n";
$email_body .= "=== Contact Details ===\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Inquiry Type: " . ucfirst(str_replace('-', ' ', $inquiry_type)) . "\n";
if (!empty($subject)) {
    $email_body .= "Subject: $subject\n";
}
$email_body .= "Submitted: " . date('Y-m-d H:i:s') . "\n\n";
$email_body .= "=== Message ===\n";
$email_body .= "$message\n\n";
$email_body .= "=== End of Message ===\n";
$email_body .= "This message was sent from the contact form on kravianalytics.com";

// Email headers
$headers = "From: webmaster@kravianalytics.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Return-Path: webmaster@kravianalytics.com\r\n";
$headers .= "Content-type: text/plain; charset=utf-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Send the email
if (mail($to, $email_subject, $email_body, $headers)) {
    // Success response
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you for your message! We\'ll get back to you soon.'
    ]);
} else {
    // Error response
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Sorry, there was an error sending your message. Please try again later.'
    ]);
}
?>