'''
Basic Structure:

FRONTEND:
-user login(username, password)
-create a new account (username, password, email, dept, phone number, role(admin, intern, employee, manager))

----Main Bar----
-upload file (drag and drop/browse)
-click button to upload file
-Displays key points, summary, graphs, analogy, charts.
-copilot (AI assistant) to answer questions about the uploaded file

----Side Bar----
-Displays previously uploaded files
-Displays how many files have been uploaded
-search bar to search for previously uploaded files

BACKEND:
-User authentication and authorization
-Checks and records file type and size, date uploaded, and user who uploaded the file
-Checks if file is infected
-Opens file
-Parses file and extracts key points, summary, graphs, analogy, charts.
-Checks if data has any sensitive information
-Hides sensitive information from the user
-Reports to admin if highly confidential information is found
-Returns data to frontend for display

DATABASE:
-User table (username, password(encrypted), email, dept, phone number, role(admin, intern, employee, manager), last login date/time)
-File table (file name, file type, file size, date uploaded, user who uploaded the file)
-User activity table (user, activity type, date/time)


'''
