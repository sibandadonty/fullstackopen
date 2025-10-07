sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Navigate to /spa
    Browser->>Server: HTTP GET request for SPA HTML
    Server-->>Browser: HTML file with embedded JavaScript
    Browser->>Server: HTTP GET request for JSON data (notes)
    Server-->>Browser: JSON response with notes
    Browser->>User: Render notes dynamically using JavaScript
