sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Type note in input field
    User->>Browser: Click "Save" button
    Browser->>Server: POST request with new note (JSON)
    Server-->>Browser: Response with confirmation
    Browser->>User: Update note list dynamically (no page reload)
