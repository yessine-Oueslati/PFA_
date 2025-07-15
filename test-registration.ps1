# Test Registration Script
Write-Host "Testing User Registration..." -ForegroundColor Green

# Test data
$testUser = @{
    firstName = "Test"
    lastName = "User"
    email = "test@example.com"
    password = "password123"
    companyName = "Test Company"
    phoneNumber = "1234567890"
} | ConvertTo-Json

Write-Host "Sending registration request..." -ForegroundColor Yellow
Write-Host "Data: $testUser" -ForegroundColor Cyan

try {
    # Register user
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/auth/register" -Method POST -Body $testUser -ContentType "application/json"
    Write-Host "Registration successful!" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json)" -ForegroundColor Cyan
    
    # Test login with the same user
    Write-Host "`nTesting login..." -ForegroundColor Yellow
    $loginData = @{
        email = "test@example.com"
        password = "password123"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/auth/authenticate" -Method POST -Body $loginData -ContentType "application/json"
    Write-Host "Login successful!" -ForegroundColor Green
    Write-Host "Login Response: $($loginResponse | ConvertTo-Json)" -ForegroundColor Cyan
    
} catch {
    Write-Host "Error occurred: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Response: $($_.Exception.Response)" -ForegroundColor Red
}

Write-Host "`nTest completed. Check your PostgreSQL database for the _user table." -ForegroundColor Green 