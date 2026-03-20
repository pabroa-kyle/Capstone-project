using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/admin")]
public class AdminLoginController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] AdminLoginRequest request)
    {
        // Hardcoded admin (for capstone)
        string adminUsername = "admin";
        string adminPassword = "1234";

        if (request.Username == adminUsername && request.Password == adminPassword)
        {
            return Ok(new
            {
                message = "Login successful"
            });
        }

        return Unauthorized(new
        {
            message = "Invalid username or password"
        });
    }
}