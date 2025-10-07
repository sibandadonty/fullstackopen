sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Write note in text field
    User->>Browser: Click "Save" button
    Browser->>Server: POST request with note content
    Server-->>Browser: Response with updated note list
    Browser->>User: Update page with new note
