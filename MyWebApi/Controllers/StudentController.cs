using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/student")]
public class StudentController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] StudentLoginRequest request)
    {
        // Dummy student account (for capstone)
        string validId = "teststudent232";
        string validPassword = "1234";

        if (request.StudentId == validId && request.Password == validPassword)
        {
            return Ok(new
            {
                message = "Login successful"
            });
        }

        return Unauthorized(new
        {
            message = "Invalid ID or password"
        });
    }
}