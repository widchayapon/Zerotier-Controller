<?php
// Assuming you have XAMPP installed and running with a MySQL database

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$database = "iperf";

// Create a connection
$conn = new mysqli($servername, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Define a method to fetch data from a table
function fetchData($conn) {
    $sql = "SELECT * FROM status"; // Replace 'your_table' with your actual table name
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Output data of each row
        while ($row = $result->fetch_assoc()) {
            echo "Interval: " . $row["Interval"] . " - Transfer: " . $row["Transfer"] . " - Bitrate: " . $row["Bitrate"] . " - Cwnd: " . $row["Cwnd"] . "<br>";
        }
    } else {
        echo "No results found";
    }
}

// Call the method to fetch data
fetchData($conn);

// Close the connection
$conn->close();
?>


